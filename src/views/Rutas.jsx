import { useMemo, useState } from 'react'
import {
  Search,
  Info,
  ArrowRight,
  Clock,
  Timer,
  MapPin,
  Flag,
  ExternalLink,
  Bus,
} from 'lucide-react'

import { Aviso, Card, PageHeader, Tag } from '../components/ui'
import { RUTAS } from '../data/mock'

// cada tipo de ruta tiene su color: troncal azul, pretroncal verde y alimentador naranja
const TONO_TIPO = {
  Troncal: 'mio',
  Expreso: 'mio',
  Pretroncal: 'verde',
  Alimentador: 'naranja',
}

// calcula los minutos aproximados hasta cada parada
function minutosHasta(ruta, indice) {
  const total = Number.parseInt(ruta.duracion, 10)
  if (Number.isNaN(total) || ruta.paradas.length < 2) return null
  return Math.round((total / (ruta.paradas.length - 1)) * indice)
}

function Timeline({ ruta }) {
  return (
    <ol className="relative">
      {ruta.paradas.map((parada, indice) => {
        const esOrigen = indice === 0
        const esDestino = indice === ruta.paradas.length - 1
        const extremo = esOrigen || esDestino
        const minutos = minutosHasta(ruta, indice)

        return (
          <li key={parada} className="group relative flex gap-4 pb-6 last:pb-0">
            {/* línea que une los puntos */}
            {!esDestino ? (
              <span
                className="absolute left-[15px] top-8 h-[calc(100%-1rem)] w-0.5 rounded-full bg-gradient-to-b from-mio-400 to-mio-200 dark:from-mio-300 dark:to-mio-600"
                aria-hidden="true"
              />
            ) : null}

            <span
              className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full ring-4 ring-superficie transition-transform duration-300 group-hover:scale-110 ${
                extremo
                  ? 'bg-mio-500 text-white shadow-md dark:bg-mio-400'
                  : 'border-2 border-mio-400 bg-superficie'
              }`}
            >
              {esOrigen ? <MapPin className="size-4" aria-hidden="true" /> : null}
              {esDestino ? <Flag className="size-4" aria-hidden="true" /> : null}
              {!extremo ? (
                <span className="size-2 rounded-full bg-mio-400" aria-hidden="true" />
              ) : null}
            </span>

            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <p
                  className={`text-sm transition-colors duration-300 ${
                    extremo
                      ? 'font-semibold text-ink'
                      : 'text-ink-2 group-hover:text-ink'
                  }`}
                >
                  {parada}
                </p>
                {esOrigen ? <Tag tono="mio">Origen</Tag> : null}
                {esDestino ? <Tag tono="verde">Destino</Tag> : null}
              </div>
              {minutos !== null ? (
                <p className="mt-0.5 text-xs text-ink-3 tabular-nums">
                  {minutos === 0 ? 'Salida' : `≈ ${minutos} min desde el origen`}
                </p>
              ) : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export default function Rutas() {
  const [busqueda, setBusqueda] = useState('')
  const [codigoActivo, setCodigoActivo] = useState(RUTAS[0].codigo)

  const filtradas = useMemo(() => {
    const texto = busqueda.trim().toLowerCase()
    if (!texto) return RUTAS
    return RUTAS.filter((ruta) =>
      [ruta.codigo, ruta.nombre, ruta.origen, ruta.destino, ruta.tipo, ...ruta.paradas]
        .join(' ')
        .toLowerCase()
        .includes(texto),
    )
  }, [busqueda])

  const activa = RUTAS.find((r) => r.codigo === codigoActivo) ?? RUTAS[0]

  return (
    <div>
      <PageHeader
        eyebrow="Información de rutas"
        title="Consulta tu ruta en el MIO"
        description="Origen, destino, horarios y paradas principales de las rutas más consultadas del sistema."
      />

      <div className="mb-5">
        <Aviso icon={Info} titulo="Información estática">
          Para cambios en tiempo real, desvíos y novedades del servicio, visite la web oficial de
          Metro Cali.{' '}
          <a
            className="inline-flex items-center gap-1 font-semibold underline underline-offset-2"
            href="https://www.metrocali.gov.co"
            target="_blank"
            rel="noreferrer"
          >
            metrocali.gov.co
            <ExternalLink className="size-3" aria-hidden="true" />
          </a>
        </Aviso>
      </div>

      <div className="mb-5">
        <label htmlFor="buscar-ruta" className="sr-only">
          Buscar ruta por código, estación o destino
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-3"
            aria-hidden="true"
          />
          <input
            id="buscar-ruta"
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por código (T31, E21), estación o destino…"
            className="w-full rounded-xl border border-linea bg-superficie py-2.5 pl-10 pr-3.5 text-sm text-ink shadow-sm outline-none transition-all duration-300 placeholder:text-ink-3 hover:border-mio-400 focus:border-mio-400 focus:shadow-md"
          />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <div className="space-y-3">
          {filtradas.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-sm font-semibold text-ink">Sin resultados</p>
              <p className="mt-1 text-sm text-ink-2">
                No encontramos rutas para «{busqueda}». Prueba con T31 o Universidades.
              </p>
            </Card>
          ) : (
            filtradas.map((ruta) => {
              const activo = ruta.codigo === activa.codigo
              return (
                <Card
                  as="button"
                  key={ruta.codigo}
                  type="button"
                  interactiva
                  onClick={() => setCodigoActivo(ruta.codigo)}
                  aria-pressed={activo}
                  className={`w-full p-4 text-left ${
                    activo ? 'border-mio-400 shadow-lg ring-2 ring-mio-400/40' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex min-w-[58px] items-center justify-center rounded-lg bg-mio-500 px-2.5 py-1.5 text-sm font-bold tracking-wide text-white shadow-sm">
                      {ruta.codigo}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-ink">
                        {ruta.nombre}
                      </span>
                      <span className="mt-0.5 block text-xs text-ink-3">{ruta.duracion}</span>
                    </span>
                    <Tag tono={TONO_TIPO[ruta.tipo]}>{ruta.tipo}</Tag>
                  </div>
                  <p className="mt-3 flex items-center gap-2 text-xs text-ink-2">
                    <span className="truncate">{ruta.origen}</span>
                    <ArrowRight className="size-3.5 shrink-0 text-ink-3" aria-hidden="true" />
                    <span className="truncate">{ruta.destino}</span>
                  </p>
                </Card>
              )
            })
          )}
        </div>

        <Card className="overflow-hidden shadow-xl lg:sticky lg:top-6">
          <div className="relative flex items-start gap-4 overflow-hidden bg-gradient-to-r from-mio-600 to-mio-500 p-5 text-white sm:p-6">
            <span
              className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-verde-500/30 blur-2xl"
              aria-hidden="true"
            />
            <span className="relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-inset ring-white/20 backdrop-blur-sm">
              <Bus className="size-6" aria-hidden="true" />
            </span>
            <div className="relative min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-white px-2.5 py-1 text-sm font-bold tracking-wide text-mio-500 shadow-sm">
                  {activa.codigo}
                </span>
                <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ring-white/20">
                  {activa.tipo}
                </span>
              </div>
              <h2 className="mt-2 text-lg font-semibold leading-snug">{activa.nombre}</h2>
            </div>
          </div>

          <div className="grid gap-px bg-linea sm:grid-cols-3">
            <div className="bg-superficie p-4 transition-colors duration-300 hover:bg-mio-suave/50">
              <p className="flex items-center gap-1.5 text-xs font-medium text-ink-3">
                <MapPin className="size-3.5" aria-hidden="true" />
                Origen
              </p>
              <p className="mt-1 text-sm font-semibold text-ink">{activa.origen}</p>
            </div>
            <div className="bg-superficie p-4 transition-colors duration-300 hover:bg-mio-suave/50">
              <p className="flex items-center gap-1.5 text-xs font-medium text-ink-3">
                <Flag className="size-3.5" aria-hidden="true" />
                Destino
              </p>
              <p className="mt-1 text-sm font-semibold text-ink">{activa.destino}</p>
            </div>
            <div className="bg-superficie p-4 transition-colors duration-300 hover:bg-mio-suave/50">
              <p className="flex items-center gap-1.5 text-xs font-medium text-ink-3">
                <Timer className="size-3.5" aria-hidden="true" />
                Duración
              </p>
              <p className="mt-1 text-sm font-semibold text-ink">{activa.duracion}</p>
            </div>
          </div>

          <div className="border-t border-linea p-5 sm:p-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
              <Clock className="size-4 text-mio-fuerte" aria-hidden="true" />
              Horarios y frecuencia
            </h3>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[420px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-linea text-xs uppercase tracking-wide text-ink-3">
                    <th scope="col" className="pb-2 font-semibold">Día</th>
                    <th scope="col" className="pb-2 font-semibold">Franja</th>
                    <th scope="col" className="pb-2 font-semibold">Frecuencia</th>
                  </tr>
                </thead>
                <tbody>
                  {activa.horarios.map((h) => (
                    <tr
                      key={h.dia}
                      className="border-b border-linea/70 transition-colors duration-300 last:border-0 hover:bg-mio-suave/40"
                    >
                      <td className="py-2.5 pr-4 font-medium text-ink">{h.dia}</td>
                      <td className="py-2.5 pr-4 text-ink-2 tabular-nums">{h.franja}</td>
                      <td className="py-2.5 text-ink-2 tabular-nums">{h.frecuencia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-t border-linea p-5 sm:p-6">
            <h3 className="text-sm font-semibold text-ink">Paradas principales</h3>
            <p className="mb-4 mt-0.5 text-xs text-ink-3">
              {activa.paradas.length} paradas · tiempos aproximados sobre {activa.duracion}
            </p>
            <Timeline ruta={activa} />
          </div>
        </Card>
      </div>
    </div>
  )
}
