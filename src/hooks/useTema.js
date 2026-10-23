import { useCallback, useEffect, useState } from 'react'

const CLAVE = 'cultura-mio-tema'

const temaInicial = () => {
  try {
    const guardado = localStorage.getItem(CLAVE)
    if (guardado === 'claro' || guardado === 'oscuro') return guardado
  } catch {
    // si no se puede leer, usamos el tema del sistema
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oscuro' : 'claro'
}

// guarda el tema elegido y lo aplica al html
export default function useTema() {
  const [tema, setTema] = useState(temaInicial)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', tema === 'oscuro')
    try {
      localStorage.setItem(CLAVE, tema)
    } catch {
      // no se pudo guardar el tema
    }
  }, [tema])

  const alternarTema = useCallback(
    () => setTema((previo) => (previo === 'oscuro' ? 'claro' : 'oscuro')),
    [],
  )

  return { tema, alternarTema }
}
