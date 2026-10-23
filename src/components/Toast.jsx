import { useEffect } from 'react'
import { CheckCircle2, Trophy, X } from 'lucide-react'

const VARIANTES = {
  exito: {
    icono: CheckCircle2,
    marco: 'border-apro-borde',
    chip: 'bg-apro-suave text-apro-fuerte',
  },
  logro: {
    icono: Trophy,
    marco: 'border-oro-400',
    chip: 'bg-gradient-to-br from-oro-400 to-oro-600 text-white',
  },
}

// mensaje de aviso que sale en una esquina
export default function Toast({ mensaje, detalle, variante = 'exito', onClose }) {
  useEffect(() => {
    if (!mensaje) return undefined
    const id = setTimeout(onClose, variante === 'logro' ? 7000 : 5000)
    return () => clearTimeout(id)
  }, [mensaje, variante, onClose])

  if (!mensaje) return null

  const { icono: Icono, marco, chip } = VARIANTES[variante] ?? VARIANTES.exito

  return (
    <div
      role="status"
      aria-live="polite"
      className={`animate-toast-in fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-md items-start gap-3 rounded-2xl border bg-superficie p-4 shadow-xl sm:left-auto sm:right-6 sm:mx-0 ${marco}`}
    >
      <span className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full ${chip}`}>
        <Icono className="size-5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-ink">{mensaje}</p>
        {detalle ? <p className="mt-0.5 text-sm text-ink-2">{detalle}</p> : null}
      </div>
      <button
        type="button"
        onClick={onClose}
        className="rounded-lg p-1 text-ink-3 transition-colors hover:bg-plano hover:text-ink"
        aria-label="Cerrar aviso"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </div>
  )
}
