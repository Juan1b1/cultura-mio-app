import {
  Armchair,
  Users,
  DoorOpen,
  CreditCard,
  ShieldCheck,
  Headphones,
  ArrowRight,
  MessageSquareWarning,
  BookOpenCheck,
  Route as RouteIcon,
  Leaf,
  TrendingUp,
  Bus,
} from 'lucide-react'

import { Button, Card, SectionTitle, Tag } from '../components/ui'
import { CAMPANAS } from '../data/mock'

const ICONOS = { Armchair, Users, DoorOpen, CreditCard, ShieldCheck, Headphones }

const ACCESOS = [
  {
    id: 'reportes',
    titulo: 'Reportar un incidente',
    texto: 'Anónimo y en menos de un minuto.',
    icono: MessageSquareWarning,
    tono: 'bg-rojo-suave text-rojo-fuerte',
  },
  {
    id: 'cultura',
    titulo: 'Manual del buen pasajero',
    texto: '15 normas de convivencia.',
    icono: BookOpenCheck,
    tono: 'bg-verde-suave text-verde-fuerte',
  },
  {
    id: 'rutas',
    titulo: 'Consultar rutas',
    texto: 'Horarios y paradas principales.',
    icono: RouteIcon,
    tono: 'bg-mio-suave text-mio-fuerte',
  },
]

const CIFRAS = [
  { valor: '1.2 M', etiqueta: 'viajes al día en el sistema' },
  { valor: '145', etiqueta: 'reportes ciudadanos este mes' },
  { valor: '12', etiqueta: 'estaciones con campaña piloto' },
]

const BORDES = {
  mio: 'border-t-mio-500',
  verde: 'border-t-verde-500',
  naranja: 'border-t-naranja-500',
}

const CHIPS = {
  mio: 'bg-mio-suave text-mio-fuerte',
  verde: 'bg-verde-suave text-verde-fuerte',
  naranja: 'bg-naranja-suave text-naranja-fuerte',
}

export default function Inicio({ navegar }) {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-mio-500 to-verde-500 shadow-xl">
        {/* oscurece el lado del texto para que el blanco se lea sobre el verde */}
        <span
          className="absolute inset-0 bg-gradient-to-r from-mio-900/75 via-mio-900/45 to-mio-900/5"
          aria-hidden="true"
        />
        <Bus
          className="pointer-events-none absolute -right-6 -top-6 size-48 text-white/10 sm:size-64"
          aria-hidden="true"
        />
        <div className="relative max-w-2xl px-6 py-8 text-white sm:px-10 sm:py-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold ring-1 ring-inset ring-white/30 backdrop-blur-sm">
            <Leaf className="size-3.5" aria-hidden="true" />
            Cali es Biodiversa. #CaliEsMIO
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            El sistema funciona mejor cuando todos aportamos.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/90 sm:text-base">
            Cultura MIO reúne las campañas cívicas, el manual del buen pasajero y un canal de
            reportes anónimos para mejorar la convivencia en cada estación y cada bus de Cali.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" variant="sobreOscuro" onClick={() => navegar('reportes')}>
              <MessageSquareWarning className="size-4" aria-hidden="true" />
              Reportar un incidente
            </Button>
            <Button size="lg" variant="fantasmaClaro" onClick={() => navegar('cultura')}>
              Ver el manual
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle title="Accesos rápidos" hint="Lo que más consultan los pasajeros." />
        <div className="grid gap-3 sm:grid-cols-3">
          {ACCESOS.map((acceso) => {
            const Icono = acceso.icono
            return (
              <Card
                as="button"
                key={acceso.id}
                type="button"
                interactiva
                onClick={() => navegar(acceso.id)}
                className="group flex w-full items-center gap-3 p-4 text-left"
              >
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${acceso.tono}`}
                >
                  <Icono className="size-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-ink">{acceso.titulo}</span>
                  <span className="block text-xs text-ink-2">{acceso.texto}</span>
                </span>
                <ArrowRight
                  className="size-4 shrink-0 text-ink-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-mio-fuerte"
                  aria-hidden="true"
                />
              </Card>
            )
          })}
        </div>
      </section>

      <section>
        <SectionTitle
          title="Campañas cívicas"
          hint="Mensajes que hoy circulan en estaciones y buses."
          action={
            <Button variant="ghost" size="sm" onClick={() => navegar('cultura')}>
              Ver todas las normas
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Button>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAMPANAS.map((campana) => {
            const Icono = ICONOS[campana.icono] ?? ShieldCheck
            return (
              <Card
                key={campana.id}
                interactiva
                className={`group flex flex-col border-t-4 p-5 ${BORDES[campana.tono]}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`flex size-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${CHIPS[campana.tono]}`}
                  >
                    <Icono className="size-5" aria-hidden="true" />
                  </span>
                  <Tag tono={campana.tono}>{campana.etiqueta}</Tag>
                </div>
                <h3 className="mt-4 text-base font-bold text-ink">{campana.titulo}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-2">{campana.resumen}</p>
                <p className="mt-4 flex items-center gap-1.5 border-t border-linea pt-3 text-xs font-medium text-ink-3">
                  <TrendingUp className="size-3.5" aria-hidden="true" />
                  {campana.meta}
                </p>
              </Card>
            )
          })}
        </div>
      </section>

      <section>
        <Card className="grid gap-5 p-6 sm:grid-cols-3">
          {CIFRAS.map((cifra) => (
            <div key={cifra.etiqueta} className="text-center sm:text-left">
              <p className="text-2xl font-bold tracking-tight text-mio-fuerte">{cifra.valor}</p>
              <p className="mt-0.5 text-sm text-ink-2">{cifra.etiqueta}</p>
            </div>
          ))}
        </Card>
      </section>
    </div>
  )
}
