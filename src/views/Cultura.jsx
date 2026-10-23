import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Clock,
  DoorOpen,
  Bus,
  LogOut,
  HeartHandshake,
  ChevronDown,
  Check,
  BookOpenCheck,
  RotateCcw,
  Trophy,
  Lock,
} from 'lucide-react'

import { Button, Card, PageHeader, Tag } from '../components/ui'
import { MANUAL } from '../data/mock'

const ICONOS = { Clock, DoorOpen, Bus, LogOut, HeartHandshake }

const INSIGNIAS = [
  { id: 'bronce', nombre: 'Bronce', emoji: '🥉', meta: 5, clase: 'from-[#d8a06a] to-[#a9683a]' },
  { id: 'plata', nombre: 'Plata', emoji: '🥈', meta: 10, clase: 'from-[#cfd6e0] to-[#8f9aab]' },
  { id: 'oro', nombre: 'Oro', emoji: '🏆', meta: 15, clase: 'from-oro-400 to-oro-600' },
]

export default function Cultura({ navegar, mostrarToast }) {
  const [abiertas, setAbiertas] = useState(() => new Set([MANUAL[0].id]))
  const [cumplidas, setCumplidas] = useState(() => new Set())
  const oroAnunciado = useRef(false)

  const totalNormas = useMemo(
    () => MANUAL.reduce((suma, seccion) => suma + seccion.normas.length, 0),
    [],
  )
  const progreso = Math.round((cumplidas.size / totalNormas) * 100)
  const oroDesbloqueado = cumplidas.size === totalNormas

  // muestra el aviso una sola vez al completar las normas
  useEffect(() => {
    if (oroDesbloqueado && !oroAnunciado.current) {
      oroAnunciado.current = true
      mostrarToast(
        '🏆 ¡Insignia Pasajero Cívico Oro desbloqueada!',
        'Marcaste las 15 normas del manual. Ahora el reto es sostenerlas en cada viaje.',
        'logro',
      )
    }
    if (!oroDesbloqueado) oroAnunciado.current = false
  }, [oroDesbloqueado, mostrarToast])

  const alternarSeccion = (id) =>
    setAbiertas((previas) => {
      const copia = new Set(previas)
      if (copia.has(id)) copia.delete(id)
      else copia.add(id)
      return copia
    })

  const alternarNorma = (id) =>
    setCumplidas((previas) => {
      const copia = new Set(previas)
      if (copia.has(id)) copia.delete(id)
      else copia.add(id)
      return copia
    })

  const todasAbiertas = abiertas.size === MANUAL.length

  return (
    <div>
      <PageHeader
        eyebrow="Cultura ciudadana"
        title="Manual del Buen Pasajero"
        description="Quince acuerdos sencillos que hacen el viaje más corto, más seguro y más amable. Marca los que ya cumples y desbloquea tus insignias de pasajero cívico."
      />

      {oroDesbloqueado ? (
        <div className="animate-fade-up mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-oro-400 via-[#e0a62f] to-oro-600 p-[2px] shadow-xl">
          <div className="flex flex-col items-start gap-4 rounded-[14px] bg-superficie p-6 sm:flex-row sm:items-center">
            <span className="animate-brillo-oro flex size-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-oro-400 to-oro-600 text-3xl shadow-lg">
              🏆
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-oro-600">
                Insignia desbloqueada
              </p>
              <h2 className="mt-1 text-xl font-bold tracking-tight text-ink">
                Pasajero Cívico Oro
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-ink-2">
                ¡Felicitaciones! Completaste las {totalNormas} normas del manual. Compartir estos
                acuerdos con quien viaja a tu lado vale tanto como cumplirlos.
              </p>
            </div>
            <Button variant="secondary" onClick={() => navegar('reportes')} className="shrink-0">
              Seguir aportando
            </Button>
          </div>
        </div>
      ) : null}

      <Card className="mb-6 p-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-ink">
              <BookOpenCheck className="size-4 text-mio-fuerte" aria-hidden="true" />
              Tu compromiso como pasajero
            </p>
            <p className="mt-1 text-sm text-ink-2">
              Has marcado <span className="font-semibold text-ink">{cumplidas.size}</span> de{' '}
              {totalNormas} normas.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-2xl font-bold tracking-tight text-verde-fuerte">{progreso}%</p>
            {cumplidas.size > 0 ? (
              <Button variant="ghost" size="sm" onClick={() => setCumplidas(new Set())}>
                <RotateCcw className="size-3.5" aria-hidden="true" />
                Reiniciar
              </Button>
            ) : null}
          </div>
        </div>

        {/* barra de progreso */}
        <div
          className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-linea"
          role="progressbar"
          aria-valuenow={progreso}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progreso del manual del buen pasajero"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-verde-500 to-verde-600 transition-[width] duration-500 ease-out"
            style={{ width: `${progreso}%` }}
          />
        </div>

        <ul className="mt-4 grid gap-2 sm:grid-cols-3">
          {INSIGNIAS.map((insignia) => {
            const lograda = cumplidas.size >= insignia.meta
            return (
              <li
                key={insignia.id}
                className={`flex items-center gap-3 rounded-xl border p-3 transition-all duration-300 ${
                  lograda
                    ? 'border-linea bg-superficie-2 shadow-sm'
                    : 'border-dashed border-linea opacity-60'
                }`}
              >
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full text-base ${
                    lograda ? `bg-gradient-to-br ${insignia.clase}` : 'bg-plano'
                  }`}
                >
                  {lograda ? (
                    insignia.emoji
                  ) : (
                    <Lock className="size-4 text-ink-3" aria-hidden="true" />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-ink">
                    Pasajero Cívico {insignia.nombre}
                  </span>
                  <span className="block text-xs text-ink-3">
                    {lograda ? 'Desbloqueada' : `${insignia.meta} normas marcadas`}
                  </span>
                </span>
              </li>
            )
          })}
        </ul>
      </Card>

      <div className="mb-3 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            setAbiertas(todasAbiertas ? new Set() : new Set(MANUAL.map((s) => s.id)))
          }
        >
          {todasAbiertas ? 'Contraer todo' : 'Expandir todo'}
        </Button>
      </div>

      <div className="space-y-3">
        {MANUAL.map((seccion) => {
          const Icono = ICONOS[seccion.icono] ?? HeartHandshake
          const abierta = abiertas.has(seccion.id)
          const marcadas = seccion.normas.filter((n) => cumplidas.has(n.id)).length
          const completa = marcadas === seccion.normas.length
          const panelId = `panel-${seccion.id}`

          return (
            <Card key={seccion.id} className="overflow-hidden hover:shadow-xl">
              <h2>
                <button
                  type="button"
                  onClick={() => alternarSeccion(seccion.id)}
                  aria-expanded={abierta}
                  aria-controls={panelId}
                  className="group flex w-full items-center gap-4 p-5 text-left transition-colors duration-300 hover:bg-mio-suave/50"
                >
                  <span
                    className={`flex size-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${
                      completa
                        ? 'bg-verde-suave text-verde-fuerte'
                        : 'bg-mio-suave text-mio-fuerte'
                    }`}
                  >
                    <Icono className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-semibold text-ink">{seccion.titulo}</span>
                    <span className="mt-0.5 block text-sm text-ink-2">{seccion.descripcion}</span>
                  </span>
                  <span className="hidden sm:block">
                    <Tag tono={completa ? 'verde' : 'neutro'}>
                      {marcadas}/{seccion.normas.length}
                    </Tag>
                  </span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-ink-3 transition-transform duration-300 ${
                      abierta ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </h2>

              {abierta ? (
                <div id={panelId} className="border-t border-linea px-5 pb-5 pt-4">
                  <ul className="space-y-2.5">
                    {seccion.normas.map((norma) => {
                      const cumplida = cumplidas.has(norma.id)
                      return (
                        <li key={norma.id}>
                          <button
                            type="button"
                            onClick={() => alternarNorma(norma.id)}
                            aria-pressed={cumplida}
                            className={`flex w-full gap-3 rounded-xl border p-4 text-left transition-all duration-300 ${
                              cumplida
                                ? 'border-verde-fuerte/30 bg-verde-suave'
                                : 'border-linea bg-superficie hover:-translate-y-0.5 hover:border-mio-fuerte/30 hover:shadow-md'
                            }`}
                          >
                            <span
                              className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors duration-300 ${
                                cumplida
                                  ? 'border-verde-500 bg-verde-500 text-white'
                                  : 'border-ink-3/50 bg-superficie'
                              }`}
                            >
                              {cumplida ? <Check className="size-3.5" aria-hidden="true" /> : null}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-semibold text-ink">
                                {norma.titulo}
                              </span>
                              <span className="mt-1 block text-sm leading-relaxed text-ink-2">
                                {norma.detalle}
                              </span>
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ) : null}
            </Card>
          )
        })}
      </div>

      <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl bg-gradient-to-r from-mio-600 to-mio-500 p-6 text-white shadow-xl sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-base font-semibold">
            <Trophy className="size-5" aria-hidden="true" />
            ¿Viste algo que rompe estos acuerdos?
          </p>
          <p className="mt-1 text-sm text-white/80">
            Repórtalo de forma anónima. Toma menos de un minuto y ayuda a priorizar las estaciones.
          </p>
        </div>
        <Button
          size="lg"
          variant="sobreOscuro"
          onClick={() => navegar('reportes')}
          className="shrink-0"
        >
          Hacer un reporte
        </Button>
      </div>
    </div>
  )
}
