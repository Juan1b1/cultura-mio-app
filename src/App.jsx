import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Home as HomeIcon,
  HeartHandshake,
  MessageSquareWarning,
  Route as RouteIcon,
  LayoutDashboard,
} from 'lucide-react'

import { BarraMovil, Sidebar } from './components/Nav'
import useTema from './hooks/useTema'
import Toast from './components/Toast'
import { REPORTES_INICIALES } from './data/mock'

import Inicio from './views/Inicio'
import Cultura from './views/Cultura'
import Reportes from './views/Reportes'
import Rutas from './views/Rutas'
import Admin from './views/Admin'

const VISTAS = [
  { id: 'inicio', nombre: 'Inicio', icono: HomeIcon, componente: Inicio },
  { id: 'cultura', nombre: 'Cultura Ciudadana', icono: HeartHandshake, componente: Cultura },
  { id: 'reportes', nombre: 'Reportes Ciudadanos', icono: MessageSquareWarning, componente: Reportes },
  { id: 'rutas', nombre: 'Información de Rutas', icono: RouteIcon, componente: Rutas },
  { id: 'admin', nombre: 'Administración', icono: LayoutDashboard, componente: Admin },
]

const ID_VALIDO = (id) => VISTAS.some((v) => v.id === id)
const vistaDesdeHash = () => {
  const id = window.location.hash.replace('#/', '')
  return ID_VALIDO(id) ? id : 'inicio'
}

export default function App() {
  const [vistaActual, setVistaActual] = useState(vistaDesdeHash)
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [reportes, setReportes] = useState(REPORTES_INICIALES)
  const [toast, setToast] = useState(null)
  const { tema, alternarTema } = useTema()

  // cambia de vista con el hash para que sirva el botón atrás
  useEffect(() => {
    const alCambiarHash = () => setVistaActual(vistaDesdeHash())
    window.addEventListener('hashchange', alCambiarHash)
    return () => window.removeEventListener('hashchange', alCambiarHash)
  }, [])

  const navegar = useCallback((id) => {
    window.location.hash = `#/${id}`
    setVistaActual(id)
    setMenuAbierto(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const agregarReporte = useCallback((reporte) => {
    setReportes((previos) => [reporte, ...previos])
  }, [])

  const cambiarEstado = useCallback((id, estado) => {
    setReportes((previos) => previos.map((r) => (r.id === id ? { ...r, estado } : r)))
  }, [])

  const mostrarToast = useCallback(
    (mensaje, detalle, variante = 'exito') => setToast({ mensaje, detalle, variante }),
    [],
  )

  const vistasConBadge = useMemo(() => {
    const pendientes = reportes.filter((r) => r.estado === 'Pendiente').length
    return VISTAS.map((v) => (v.id === 'admin' ? { ...v, badge: pendientes || undefined } : v))
  }, [reportes])

  const Vista = (VISTAS.find((v) => v.id === vistaActual) ?? VISTAS[0]).componente

  return (
    <div className="min-h-screen bg-plano">
      <Sidebar
        vistas={vistasConBadge}
        actual={vistaActual}
        onNavegar={navegar}
        tema={tema}
        alternarTema={alternarTema}
      />
      <BarraMovil
        vistas={vistasConBadge}
        actual={vistaActual}
        onNavegar={navegar}
        abierto={menuAbierto}
        setAbierto={setMenuAbierto}
        tema={tema}
        alternarTema={alternarTema}
      />

      <main className="lg:pl-72">
        <div key={vistaActual} className="animate-fade-up mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
          <Vista
            navegar={navegar}
            reportes={reportes}
            agregarReporte={agregarReporte}
            cambiarEstado={cambiarEstado}
            mostrarToast={mostrarToast}
          />
        </div>
        <footer className="mx-auto max-w-6xl px-4 pb-10 text-xs text-ink-3 sm:px-6 lg:px-10">
          © 2026 Cultura MIO - Santiago de Cali
        </footer>
      </main>

      <Toast
        mensaje={toast?.mensaje}
        detalle={toast?.detalle}
        variante={toast?.variante}
        onClose={() => setToast(null)}
      />
    </div>
  )
}
