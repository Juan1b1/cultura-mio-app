import { useEffect } from 'react'
import { Bus, Menu, X } from 'lucide-react'

import BotonTema from './BotonTema'

function Marca({ compacto = false, sobreAzul = true }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`flex size-9 items-center justify-center rounded-xl shadow-sm ${
          sobreAzul ? 'bg-white text-mio-500' : 'bg-mio-500 text-white'
        }`}
      >
        <Bus className="size-5" aria-hidden="true" />
      </span>
      <span className="leading-tight">
        <span className={`block text-[15px] font-bold tracking-tight ${sobreAzul ? 'text-white' : 'text-ink'}`}>
          Cultura MIO
        </span>
        {!compacto ? (
          <span className={`block text-[11px] font-medium ${sobreAzul ? 'text-white/70' : 'text-ink-3'}`}>
            Santiago de Cali
          </span>
        ) : null}
      </span>
    </div>
  )
}

function NavLista({ vistas, actual, onNavegar }) {
  return (
    <nav aria-label="Navegación principal" className="flex flex-col gap-1">
      {vistas.map((vista) => {
        const activo = vista.id === actual
        const Icono = vista.icono
        return (
          <button
            key={vista.id}
            type="button"
            onClick={() => onNavegar(vista.id)}
            aria-current={activo ? 'page' : undefined}
            className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-300 ${
              activo
                ? 'bg-white font-bold text-mio-500 shadow-md'
                : 'font-medium text-white/80 hover:translate-x-0.5 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Icono className="size-[18px] shrink-0" aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate">{vista.nombre}</span>
            {vista.badge ? (
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                  activo ? 'bg-mio-50 text-mio-600' : 'bg-white/20 text-white'
                }`}
              >
                {vista.badge}
              </span>
            ) : null}
          </button>
        )
      })}
    </nav>
  )
}

function PieMenu({ tema, alternarTema }) {
  return (
    <div className="space-y-3">
      <BotonTema tema={tema} alternarTema={alternarTema} sobreAzul />
      <div className="rounded-xl bg-white/10 p-3">
        <p className="text-xs font-bold text-white">Cultura MIO</p>
        <p className="mt-1 text-[11px] leading-relaxed text-white/70">
          © 2026 Cultura MIO · Santiago de Cali
        </p>
      </div>
    </div>
  )
}

export function Sidebar({ vistas, actual, onNavegar, tema, alternarTema }) {
  return (
    <aside className="menu-institucional fixed inset-y-0 left-0 hidden w-72 flex-col bg-mio-500 px-4 py-5 shadow-xl dark:bg-mio-800 lg:flex">
      <div className="px-2">
        <Marca />
      </div>
      <div className="mt-7 flex-1 overflow-y-auto">
        <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/60">
          Menú
        </p>
        <NavLista vistas={vistas} actual={actual} onNavegar={onNavegar} />
      </div>
      <PieMenu tema={tema} alternarTema={alternarTema} />
    </aside>
  )
}

export function BarraMovil({
  vistas,
  actual,
  onNavegar,
  abierto,
  setAbierto,
  tema,
  alternarTema,
}) {
  // bloquea el scroll del fondo con el menú abierto
  useEffect(() => {
    document.body.style.overflow = abierto ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [abierto])

  useEffect(() => {
    if (!abierto) return undefined
    const alPresionar = (e) => e.key === 'Escape' && setAbierto(false)
    window.addEventListener('keydown', alPresionar)
    return () => window.removeEventListener('keydown', alPresionar)
  }, [abierto, setAbierto])

  return (
    <>
      <header className="menu-institucional sticky top-0 z-30 flex items-center justify-between gap-2 bg-mio-500 px-4 py-3 shadow-lg dark:bg-mio-800 lg:hidden">
        <Marca compacto />
        <div className="flex items-center gap-2">
          <BotonTema tema={tema} alternarTema={alternarTema} compacto sobreAzul />
          <button
            type="button"
            onClick={() => setAbierto(true)}
            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-white ring-1 ring-inset ring-white/40 transition-all duration-300 hover:bg-white/15"
            aria-expanded={abierto}
            aria-label="Abrir menú de navegación"
          >
            <Menu className="size-4" aria-hidden="true" />
            Menú
          </button>
        </div>
      </header>

      {abierto ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-mio-900/60 backdrop-blur-sm"
            onClick={() => setAbierto(false)}
            aria-label="Cerrar menú de navegación"
            tabIndex={-1}
          />
          <div className="menu-institucional animate-fade-up absolute inset-y-0 left-0 flex w-[82%] max-w-xs flex-col bg-mio-500 px-4 py-5 shadow-xl dark:bg-mio-800">
            <div className="flex items-center justify-between">
              <Marca />
              <button
                type="button"
                onClick={() => setAbierto(false)}
                className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Cerrar menú"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flex-1 overflow-y-auto">
              <NavLista vistas={vistas} actual={actual} onNavegar={onNavegar} />
            </div>
            <PieMenu tema={tema} alternarTema={alternarTema} />
          </div>
        </div>
      ) : null}
    </>
  )
}
