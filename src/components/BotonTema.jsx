import { Moon, Sun } from 'lucide-react'

const OPCIONES = [
  { id: 'claro', icono: Sun, etiqueta: 'Claro' },
  { id: 'oscuro', icono: Moon, etiqueta: 'Oscuro' },
]

// botón para cambiar entre modo claro y oscuro
export default function BotonTema({ tema, alternarTema, compacto = false, sobreAzul = false }) {
  if (compacto) {
    const oscuro = tema === 'oscuro'
    const Icono = oscuro ? Sun : Moon
    return (
      <button
        type="button"
        onClick={alternarTema}
        aria-label={oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        className={`flex size-10 items-center justify-center rounded-xl transition-all duration-300 ${
          sobreAzul
            ? 'text-white ring-1 ring-inset ring-white/40 hover:bg-white/15'
            : 'text-ink-2 ring-1 ring-inset ring-linea hover:bg-mio-suave hover:text-mio-fuerte hover:shadow-md'
        }`}
      >
        <Icono className="size-[18px]" aria-hidden="true" />
      </button>
    )
  }

  return (
    <div
      role="radiogroup"
      aria-label="Tema de la interfaz"
      className={`flex gap-1 rounded-xl p-1 ${
        sobreAzul ? 'bg-white/10 ring-1 ring-inset ring-white/25' : 'bg-plano ring-1 ring-inset ring-linea'
      }`}
    >
      {OPCIONES.map((opcion) => {
        const Icono = opcion.icono
        const activo = tema === opcion.id
        const estiloActivo = sobreAzul ? 'bg-white text-mio-500' : 'bg-superficie text-ink shadow-sm'
        const estiloInactivo = sobreAzul ? 'text-white/80 hover:text-white' : 'text-ink-2 hover:text-ink'
        return (
          <button
            key={opcion.id}
            type="button"
            role="radio"
            aria-checked={activo}
            onClick={() => {
              if (!activo) alternarTema()
            }}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all duration-300 ${
              activo ? estiloActivo : estiloInactivo
            }`}
          >
            <Icono className="size-3.5" aria-hidden="true" />
            {opcion.etiqueta}
          </button>
        )
      })}
    </div>
  )
}
