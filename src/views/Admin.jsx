import { useMemo, useState } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle2,
  Timer,
  TriangleAlert,
  BarChart3,
  Table2,
  Check,
  X,
  Inbox,
  Download,
  Paperclip,
} from 'lucide-react'

import { Button, Card, EstadoBadge, PageHeader } from '../components/ui'
import { ESTACIONES_CRITICAS, REPORTES_POR_TIPO } from '../data/mock'

const TENDENCIAS = {
  sube: { icono: TrendingUp, texto: 'Sube', clase: 'text-rech-fuerte' },
  baja: { icono: TrendingDown, texto: 'Baja', clase: 'text-apro-fuerte' },
  estable: { icono: Minus, texto: 'Estable', clase: 'text-ink-3' },
}

const COLUMNAS_CSV = [
  ['id', 'Radicado'],
  ['fecha', 'Fecha'],
  ['estacion', 'Estacion'],
  ['tipo', 'Tipo de incidente'],
  ['estado', 'Estado'],
  ['evidencias', 'Evidencias'],
  ['descripcion', 'Descripcion'],
]

// arma el archivo CSV y lo descarga
function exportarCSV(reportes, sufijo) {
  const escapar = (valor) => `"${String(valor ?? '').replace(/"/g, '""')}"`
  const filas = [
    COLUMNAS_CSV.map(([, titulo]) => escapar(titulo)).join(';'),
    ...reportes.map((r) => COLUMNAS_CSV.map(([clave]) => escapar(r[clave] ?? '')).join(';')),
  ]
  // el BOM es para que Excel muestre bien las tildes
  const blob = new Blob([`﻿${filas.join('\r\n')}`], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const enlace = document.createElement('a')
  enlace.href = url
  enlace.download = `reportes-cultura-mio-${sufijo}.csv`
  document.body.appendChild(enlace)
  enlace.click()
  document.body.removeChild(enlace)
  URL.revokeObjectURL(url)
}

const TONO_METRICA = {
  mio: 'bg-mio-suave text-mio-fuerte',
  verde: 'bg-verde-suave text-verde-fuerte',
  rojo: 'bg-rojo-suave text-rojo-fuerte',
}

function TarjetaMetrica({ icono: Icono, etiqueta, valor, nota, tono = 'mio', destacada = false }) {
  return (
    <Card interactiva className={`group p-5 ${destacada ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
      <div className="flex items-center gap-2.5">
        <span
          className={`flex size-9 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${TONO_METRICA[tono]}`}
        >
          <Icono className="size-[18px]" aria-hidden="true" />
        </span>
        <p className="text-sm font-medium text-ink-2">{etiqueta}</p>
      </div>
      <p
        className={`mt-3 font-bold leading-none tracking-tight ${
          destacada ? 'text-5xl text-mio-fuerte' : 'text-3xl text-ink'
        }`}
      >
        {valor}
      </p>
      {nota ? <p className="mt-2 text-xs text-ink-2">{nota}</p> : null}
    </Card>
  )
}

function GraficaPorTipo({ datos }) {
  const [verTabla, setVerTabla] = useState(false)
  const maximo = Math.max(...datos.map((d) => d.valor))
  const total = datos.reduce((suma, d) => suma + d.valor, 0)

  return (
    <Card className="p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-ink">Reportes por tipo de incidente</h2>
          <p className="mt-0.5 text-sm text-ink-2">Últimos 30 días · {total} reportes clasificados</p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => setVerTabla((v) => !v)}>
          {verTabla ? (
            <>
              <BarChart3 className="size-3.5" aria-hidden="true" />
              Ver gráfica
            </>
          ) : (
            <>
              <Table2 className="size-3.5" aria-hidden="true" />
              Ver tabla
            </>
          )}
        </Button>
      </div>

      {verTabla ? (
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">Reportes por tipo de incidente, últimos 30 días</caption>
          <thead>
            <tr className="border-b border-linea text-xs uppercase tracking-wide text-ink-3">
              <th scope="col" className="pb-2 font-semibold">Tipo</th>
              <th scope="col" className="pb-2 text-right font-semibold">Reportes</th>
              <th scope="col" className="pb-2 text-right font-semibold">Participación</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((dato) => (
              <tr
                key={dato.tipo}
                className="border-b border-linea/70 transition-colors duration-300 last:border-0 hover:bg-mio-suave/40"
              >
                <td className="py-2.5 pr-4 text-ink">{dato.tipo}</td>
                <td className="py-2.5 pr-4 text-right font-semibold text-ink tabular-nums">
                  {dato.valor}
                </td>
                <td className="py-2.5 text-right text-ink-2 tabular-nums">
                  {Math.round((dato.valor / total) * 100)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ul className="space-y-3.5">
          {datos.map((dato) => (
            <li key={dato.tipo} className="group relative">
              <div
                tabIndex={0}
                className="grid grid-cols-[1fr] gap-1.5 rounded-lg sm:grid-cols-[210px_1fr] sm:items-center sm:gap-4"
                aria-label={`${dato.tipo}: ${dato.valor} reportes`}
              >
                <p className="truncate text-sm text-ink-2 transition-colors duration-300 group-hover:text-ink">
                  {dato.tipo}
                </p>
                <div className="flex items-center gap-2.5">
                  {/* barra del gráfico */}
                  <div
                    className="h-6 rounded-r-[4px] bg-mio-500 transition-all duration-500 ease-out group-hover:brightness-110 dark:bg-mio-300"
                    style={{ width: `${Math.max((dato.valor / maximo) * 100, 3)}%` }}
                  />
                  <span className="text-sm font-semibold text-ink tabular-nums">{dato.valor}</span>
                </div>
              </div>
              <div
                role="tooltip"
                className="pointer-events-none absolute -top-1 left-0 z-10 -translate-y-full rounded-lg bg-ink px-2.5 py-1.5 text-xs font-medium text-plano opacity-0 shadow-xl transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
              >
                {dato.tipo}: {dato.valor} reportes ({Math.round((dato.valor / total) * 100)}%)
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

function FilaAcciones({ reporte, cambiarEstado, mostrarToast }) {
  const resuelto = reporte.estado !== 'Pendiente'
  const decidir = (estado) => {
    cambiarEstado(reporte.id, estado)
    mostrarToast(
      `Reporte ${reporte.id} ${estado.toLowerCase()}`,
      estado === 'Aprobado'
        ? 'Pasa al plan de intervención de la estación.'
        : 'Se archiva por información insuficiente.',
    )
  }

  if (resuelto) {
    return <span className="text-xs text-ink-3">Gestionado</span>
  }

  return (
    <div className="flex gap-2">
      <Button variant="aprobar" size="sm" onClick={() => decidir('Aprobado')}>
        <Check className="size-3.5" aria-hidden="true" />
        Aprobar
      </Button>
      <Button variant="rechazar" size="sm" onClick={() => decidir('Rechazado')}>
        <X className="size-3.5" aria-hidden="true" />
        Rechazar
      </Button>
    </div>
  )
}

export default function Admin({ reportes, cambiarEstado, mostrarToast }) {
  const [filtro, setFiltro] = useState('Todos')

  const conteos = useMemo(
    () => ({
      Todos: reportes.length,
      Pendiente: reportes.filter((r) => r.estado === 'Pendiente').length,
      Aprobado: reportes.filter((r) => r.estado === 'Aprobado').length,
      Rechazado: reportes.filter((r) => r.estado === 'Rechazado').length,
    }),
    [reportes],
  )

  const visibles = filtro === 'Todos' ? reportes : reportes.filter((r) => r.estado === filtro)

  const descargar = () => {
    const sufijo = filtro === 'Todos' ? 'todos' : filtro.toLowerCase()
    exportarCSV(visibles, sufijo)
    mostrarToast(
      'Exportación lista',
      `${visibles.length} reportes descargados en reportes-cultura-mio-${sufijo}.csv`,
    )
  }

  return (
    <div>
      <PageHeader
        eyebrow="Administración"
        title="Tablero de cultura ciudadana"
        description="Seguimiento de los reportes ciudadanos y del impacto de las campañas en la red del MIO."
        action={
          <Button onClick={descargar}>
            <Download className="size-4" aria-hidden="true" />
            Exportar a CSV
          </Button>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <TarjetaMetrica
          destacada
          icono={Inbox}
          etiqueta="Reportes este mes"
          valor="145"
          nota="+12% frente a septiembre · más participación ciudadana"
        />
        <TarjetaMetrica
          tono="verde"
          icono={CheckCircle2}
          etiqueta="Reportes gestionados"
          valor="128"
          nota="88% del total recibido"
        />
        <TarjetaMetrica
          icono={Timer}
          etiqueta="Tiempo medio de gestión"
          valor="2.4 días"
          nota="Meta institucional: 3 días"
        />
        <TarjetaMetrica
          tono="rojo"
          icono={TriangleAlert}
          etiqueta="Estaciones en alerta"
          valor="7"
          nota="Con más de 10 reportes en el mes"
        />
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        <GraficaPorTipo datos={REPORTES_POR_TIPO} />

        <Card className="p-5 sm:p-6">
          <h2 className="text-base font-semibold text-ink">Estaciones con más reportes</h2>
          <p className="mt-0.5 text-sm text-ink-2">Comparado con el mes anterior.</p>
          <ul className="mt-4 divide-y divide-linea">
            {ESTACIONES_CRITICAS.map((item, indice) => {
              const { icono: Icono, texto, clase } = TENDENCIAS[item.tendencia]
              return (
                <li
                  key={item.estacion}
                  className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-3 transition-colors duration-300 first:pt-0 last:pb-0 hover:bg-mio-suave/40"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-mio-suave text-xs font-bold text-mio-fuerte">
                    {indice + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink">
                    {item.estacion}
                  </span>
                  <span className="text-sm font-semibold text-ink tabular-nums">{item.reportes}</span>
                  <span className={`flex items-center gap-1 text-xs font-medium ${clase}`}>
                    <Icono className="size-3.5" aria-hidden="true" />
                    {texto}
                  </span>
                </li>
              )
            })}
          </ul>
        </Card>
      </section>

      <section className="mt-5">
        <Card className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-linea p-5">
            <div>
              <h2 className="text-base font-semibold text-ink">Últimos reportes recibidos</h2>
              <p className="mt-0.5 text-sm text-ink-2">
                {conteos.Pendiente} pendientes de moderación.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['Todos', 'Pendiente', 'Aprobado', 'Rechazado'].map((opcion) => (
                <button
                  key={opcion}
                  type="button"
                  onClick={() => setFiltro(opcion)}
                  aria-pressed={filtro === opcion}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-300 ${
                    filtro === opcion
                      ? 'bg-mio-500 text-white shadow-md'
                      : 'bg-plano text-ink-2 hover:bg-mio-suave hover:text-mio-fuerte'
                  }`}
                >
                  {opcion} ({conteos[opcion]})
                </button>
              ))}
            </div>
          </div>

          {visibles.length === 0 ? (
            <p className="p-8 text-center text-sm text-ink-2">
              No hay reportes con el estado «{filtro}».
            </p>
          ) : (
            <>
              {/* en escritorio va la tabla y en móvil tarjetas */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                  <thead className="bg-superficie-2">
                    <tr className="text-xs uppercase tracking-wide text-ink-3">
                      <th scope="col" className="px-5 py-3 font-semibold">Radicado</th>
                      <th scope="col" className="px-5 py-3 font-semibold">Fecha</th>
                      <th scope="col" className="px-5 py-3 font-semibold">Estación</th>
                      <th scope="col" className="px-5 py-3 font-semibold">Tipo</th>
                      <th scope="col" className="px-5 py-3 font-semibold">Estado</th>
                      <th scope="col" className="px-5 py-3 font-semibold">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibles.map((reporte) => (
                      <tr
                        key={reporte.id}
                        className="border-t border-linea align-middle transition-colors duration-300 hover:bg-mio-suave/40"
                      >
                        <td className="whitespace-nowrap px-5 py-3 font-mono text-xs font-semibold text-mio-fuerte">
                          {reporte.id}
                        </td>
                        <td className="whitespace-nowrap px-5 py-3 text-ink-2 tabular-nums">
                          {reporte.fecha}
                        </td>
                        <td className="px-5 py-3 text-ink">{reporte.estacion}</td>
                        <td className="max-w-[220px] px-5 py-3 text-ink-2">
                          <span className="flex items-center gap-1.5">
                            {reporte.tipo}
                            {reporte.evidencias > 0 ? (
                              <span
                                className="inline-flex items-center gap-0.5 text-xs text-ink-3"
                                title={`${reporte.evidencias} evidencia(s) adjunta(s)`}
                              >
                                <Paperclip className="size-3" aria-hidden="true" />
                                {reporte.evidencias}
                              </span>
                            ) : null}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <EstadoBadge estado={reporte.estado} />
                        </td>
                        <td className="px-5 py-3">
                          <FilaAcciones
                            reporte={reporte}
                            cambiarEstado={cambiarEstado}
                            mostrarToast={mostrarToast}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ul className="divide-y divide-linea md:hidden">
                {visibles.map((reporte) => (
                  <li key={reporte.id} className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-mono text-xs font-semibold text-mio-fuerte">{reporte.id}</p>
                      <EstadoBadge estado={reporte.estado} />
                    </div>
                    <p className="mt-2 text-sm font-semibold text-ink">{reporte.tipo}</p>
                    <p className="mt-0.5 text-xs text-ink-3">
                      {reporte.estacion} · {reporte.fecha}
                      {reporte.evidencias > 0 ? ` · ${reporte.evidencias} evidencia(s)` : ''}
                    </p>
                    <div className="mt-3">
                      <FilaAcciones
                        reporte={reporte}
                        cambiarEstado={cambiarEstado}
                        mostrarToast={mostrarToast}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Card>
      </section>
    </div>
  )
}
