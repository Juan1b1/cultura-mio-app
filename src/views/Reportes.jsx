import { useEffect, useRef, useState } from 'react'
import {
  Send,
  Loader2,
  ShieldCheck,
  EyeOff,
  ListChecks,
  AlertCircle,
  Phone,
  Calendar,
  MapPin,
  MapPinned,
  Tags,
  UploadCloud,
  ImagePlus,
  X,
  Paperclip,
} from 'lucide-react'

import { Aviso, Button, Card, EstadoBadge, PageHeader } from '../components/ui'
import { ESTACIONES, TIPOS_INCIDENTE } from '../data/mock'

// la fecha de hoy en hora local, porque toISOString devuelve UTC
const fechaLocalISO = () => {
  const ahora = new Date()
  ahora.setMinutes(ahora.getMinutes() - ahora.getTimezoneOffset())
  return ahora.toISOString().slice(0, 10)
}
const HOY = fechaLocalISO()
const MAX_DESCRIPCION = 400
const MAX_ARCHIVOS = 3
const MAX_MB = 5
const FORM_VACIO = { fecha: HOY, estacion: '', tipo: '', descripcion: '' }

const PASOS = [
  { icono: EyeOff, texto: 'No pedimos nombre, cédula ni teléfono: el reporte viaja anónimo.' },
  { icono: ListChecks, texto: 'El equipo de cultura ciudadana valida y clasifica cada caso.' },
  { icono: ShieldCheck, texto: 'Las estaciones con más reportes entran al plan de intervención.' },
]

const claseCampo = (error) =>
  `w-full rounded-xl border bg-superficie px-3.5 py-2.5 text-sm text-ink outline-none transition-all duration-300 placeholder:text-ink-3 ${
    error
      ? 'border-rech-fuerte bg-rech-suave'
      : 'border-linea hover:border-mio-400 focus:border-mio-400 focus:shadow-md'
  }`

function Etiqueta({ htmlFor, icono: Icono, children, requerido = true }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-ink">
      <Icono className="size-3.5 text-ink-3" aria-hidden="true" />
      {children}
      {requerido ? <span className="text-rech-fuerte">*</span> : null}
    </label>
  )
}

function MensajeError({ id, children }) {
  if (!children) return null
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rech-fuerte">
      <AlertCircle className="size-3.5" aria-hidden="true" />
      {children}
    </p>
  )
}

const formatoPeso = (bytes) =>
  bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`

export default function Reportes({ agregarReporte, mostrarToast, reportes }) {
  const [form, setForm] = useState(FORM_VACIO)
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [misIds, setMisIds] = useState([])
  const [ubicando, setUbicando] = useState(false)
  const [ubicacion, setUbicacion] = useState(null)
  const [archivos, setArchivos] = useState([])
  const [arrastrando, setArrastrando] = useState(false)
  const [avisoArchivo, setAvisoArchivo] = useState('')
  const consecutivo = useRef(2452)
  const entradaArchivos = useRef(null)

  // libera las miniaturas al salir de la vista
  const archivosRef = useRef(archivos)
  useEffect(() => {
    archivosRef.current = archivos
  }, [archivos])
  useEffect(() => () => archivosRef.current.forEach((a) => URL.revokeObjectURL(a.url)), [])

  const actualizar = (campo) => (evento) => {
    setForm((previo) => ({ ...previo, [campo]: evento.target.value }))
    setErrores((previos) => ({ ...previos, [campo]: undefined }))
  }

  // busca la estación más cercana y la pone en el select
  const detectarUbicacion = () => {
    setUbicando(true)
    setUbicacion(null)
    setTimeout(() => {
      const cercana = ESTACIONES[Math.floor(Math.random() * ESTACIONES.length)]
      setForm((previo) => ({ ...previo, estacion: cercana }))
      setErrores((previos) => ({ ...previos, estacion: undefined }))
      setUbicacion(cercana)
      setUbicando(false)
    }, 1200)
  }

  const limpiarArchivos = () => {
    archivos.forEach((archivo) => URL.revokeObjectURL(archivo.url))
    setArchivos([])
  }

  const agregarArchivos = (lista) => {
    const candidatos = Array.from(lista)
    const imagenes = candidatos.filter((f) => f.type.startsWith('image/'))
    const livianas = imagenes.filter((f) => f.size <= MAX_MB * 1024 * 1024)
    const espacio = Math.max(MAX_ARCHIVOS - archivos.length, 0)
    const aceptadas = livianas.slice(0, espacio)

    const avisos = []
    if (imagenes.length < candidatos.length) avisos.push('solo se aceptan imágenes')
    if (livianas.length < imagenes.length) avisos.push(`cada archivo debe pesar menos de ${MAX_MB} MB`)
    if (aceptadas.length < livianas.length) avisos.push(`máximo ${MAX_ARCHIVOS} imágenes`)

    if (aceptadas.length > 0) {
      const nuevas = aceptadas.map((archivo) => ({
        id: `${archivo.name}-${archivo.lastModified}-${Math.random().toString(36).slice(2, 7)}`,
        nombre: archivo.name,
        peso: archivo.size,
        url: URL.createObjectURL(archivo),
      }))
      setArchivos((previos) => [...previos, ...nuevas])
    }
    setAvisoArchivo(avisos.length > 0 ? `No se adjuntó todo: ${avisos.join(', ')}.` : '')
  }

  const quitarArchivo = (id) =>
    setArchivos((previos) => {
      const objetivo = previos.find((a) => a.id === id)
      if (objetivo) URL.revokeObjectURL(objetivo.url)
      return previos.filter((a) => a.id !== id)
    })

  const alSoltar = (evento) => {
    evento.preventDefault()
    setArrastrando(false)
    if (evento.dataTransfer.files?.length) agregarArchivos(evento.dataTransfer.files)
  }

  const validar = () => {
    const nuevos = {}
    if (!form.fecha) nuevos.fecha = 'Indica la fecha del incidente.'
    else if (form.fecha > HOY) nuevos.fecha = 'La fecha no puede estar en el futuro.'
    if (!form.estacion) nuevos.estacion = 'Selecciona la estación donde ocurrió.'
    if (!form.tipo) nuevos.tipo = 'Selecciona el tipo de incidente.'
    if (form.descripcion.trim().length < 15)
      nuevos.descripcion = 'Describe lo ocurrido con al menos 15 caracteres.'
    return nuevos
  }

  const reiniciarFormulario = () => {
    setForm({ ...FORM_VACIO })
    setErrores({})
    setUbicacion(null)
    setAvisoArchivo('')
    limpiarArchivos()
    if (entradaArchivos.current) entradaArchivos.current.value = ''
  }

  const enviar = (evento) => {
    evento.preventDefault()
    const nuevos = validar()
    setErrores(nuevos)
    if (Object.keys(nuevos).length > 0) return

    setEnviando(true)
    // guarda el reporte después de un momento de espera
    const totalEvidencias = archivos.length
    setTimeout(() => {
      const id = `RPT-${consecutivo.current++}`
      agregarReporte({
        id,
        fecha: form.fecha,
        estacion: form.estacion,
        tipo: form.tipo,
        descripcion: form.descripcion.trim(),
        estado: 'Pendiente',
        evidencias: totalEvidencias,
      })
      setMisIds((previos) => [id, ...previos])
      reiniciarFormulario()
      setEnviando(false)
      mostrarToast(
        'Reporte enviado anónimamente',
        `Radicado ${id}${
          totalEvidencias > 0 ? ` con ${totalEvidencias} imagen(es) de evidencia` : ''
        }. Queda en revisión del equipo de cultura ciudadana.`,
      )
    }, 700)
  }

  // los toma del estado general para ver el estado actualizado
  const misReportes = misIds.map((id) => reportes.find((r) => r.id === id)).filter(Boolean)
  const pendientesTotales = reportes.filter((r) => r.estado === 'Pendiente').length

  return (
    <div>
      <PageHeader
        eyebrow="Reportes ciudadanos"
        title="Reporta un incidente en el sistema"
        description="Cuéntanos qué pasó, dónde y cuándo. Tu reporte es anónimo y alimenta el tablero de seguimiento de cultura ciudadana."
      />

      <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <Card className="p-5 sm:p-6">
          <form onSubmit={enviar} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:order-1">
                <Etiqueta htmlFor="fecha" icono={Calendar}>
                  Fecha del incidente
                </Etiqueta>
                <input
                  id="fecha"
                  type="date"
                  max={HOY}
                  value={form.fecha}
                  onChange={actualizar('fecha')}
                  className={claseCampo(errores.fecha)}
                  aria-invalid={Boolean(errores.fecha)}
                  aria-describedby={errores.fecha ? 'error-fecha' : undefined}
                />
                <MensajeError id="error-fecha">{errores.fecha}</MensajeError>
              </div>

              <div className="sm:col-span-2 sm:order-3">
                <Etiqueta htmlFor="estacion" icono={MapPin}>
                  Estación
                </Etiqueta>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <select
                    id="estacion"
                    value={form.estacion}
                    onChange={actualizar('estacion')}
                    className={`${claseCampo(errores.estacion)} min-w-0 flex-1`}
                    aria-invalid={Boolean(errores.estacion)}
                    aria-describedby={errores.estacion ? 'error-estacion' : 'ayuda-ubicacion'}
                  >
                    <option value="">Selecciona una estación…</option>
                    {ESTACIONES.map((estacion) => (
                      <option key={estacion} value={estacion}>
                        {estacion}
                      </option>
                    ))}
                  </select>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={detectarUbicacion}
                    disabled={ubicando}
                    className="shrink-0 sm:px-3"
                    title="Usar mi ubicación actual"
                  >
                    {ubicando ? (
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    ) : (
                      <MapPinned className="size-4" aria-hidden="true" />
                    )}
                    {ubicando ? 'Ubicando…' : 'Usar mi ubicación actual'}
                  </Button>
                </div>
                <MensajeError id="error-estacion">{errores.estacion}</MensajeError>
                {!errores.estacion ? (
                  <p id="ayuda-ubicacion" className="mt-1.5 text-xs text-ink-3">
                    {ubicacion
                      ? `Estación más cercana detectada: ${ubicacion}.`
                      : 'O deja que detectemos la estación más cercana.'}
                  </p>
                ) : null}
              </div>

              <div className="sm:order-2">
                <Etiqueta htmlFor="tipo" icono={Tags}>
                  Tipo de incidente
                </Etiqueta>
                <select
                  id="tipo"
                  value={form.tipo}
                  onChange={actualizar('tipo')}
                  className={claseCampo(errores.tipo)}
                  aria-invalid={Boolean(errores.tipo)}
                  aria-describedby={errores.tipo ? 'error-tipo' : undefined}
                >
                  <option value="">Selecciona el tipo…</option>
                  {TIPOS_INCIDENTE.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
                <MensajeError id="error-tipo">{errores.tipo}</MensajeError>
              </div>

              <div className="sm:col-span-2 sm:order-4">
                <Etiqueta htmlFor="descripcion" icono={ListChecks}>
                  Descripción
                </Etiqueta>
                <textarea
                  id="descripcion"
                  rows={5}
                  maxLength={MAX_DESCRIPCION}
                  value={form.descripcion}
                  onChange={actualizar('descripcion')}
                  placeholder="Describe lo que ocurrió: hora aproximada, plataforma o ruta, y qué sucedió. Evita incluir datos personales de terceros."
                  className={`${claseCampo(errores.descripcion)} resize-y leading-relaxed`}
                  aria-invalid={Boolean(errores.descripcion)}
                  aria-describedby={errores.descripcion ? 'error-descripcion' : 'contador-descripcion'}
                />
                <div className="mt-1.5 flex items-start justify-between gap-3">
                  <MensajeError id="error-descripcion">{errores.descripcion}</MensajeError>
                  <p id="contador-descripcion" className="ml-auto shrink-0 text-xs text-ink-3">
                    {form.descripcion.length}/{MAX_DESCRIPCION}
                  </p>
                </div>
              </div>

              {/* zona para arrastrar las fotos */}
              <div className="sm:col-span-2 sm:order-5">
                <p className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-ink">
                  <ImagePlus className="size-3.5 text-ink-3" aria-hidden="true" />
                  Subir evidencia fotográfica
                  <span className="font-normal text-ink-3">(opcional)</span>
                </p>
                <label
                  htmlFor="evidencia"
                  onDragOver={(e) => {
                    e.preventDefault()
                    setArrastrando(true)
                  }}
                  onDragLeave={() => setArrastrando(false)}
                  onDrop={alSoltar}
                  className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-all duration-300 focus-within:ring-2 focus-within:ring-mio-400 ${
                    arrastrando
                      ? 'scale-[1.01] border-verde-500 bg-verde-suave shadow-lg'
                      : 'border-linea bg-superficie-2 hover:border-mio-400 hover:bg-mio-suave/60 hover:shadow-md'
                  }`}
                >
                  <span
                    className={`flex size-11 items-center justify-center rounded-full transition-transform duration-300 ${
                      arrastrando ? 'scale-110 bg-verde-600 text-white' : 'bg-mio-suave text-mio-fuerte'
                    }`}
                  >
                    <UploadCloud className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-ink">
                    {arrastrando ? 'Suelta aquí tus imágenes' : 'Arrastra y suelta tus fotos aquí'}
                  </span>
                  <span className="text-xs text-ink-3">
                    o haz clic para buscarlas · JPG o PNG · hasta {MAX_ARCHIVOS} imágenes de{' '}
                    {MAX_MB} MB
                  </span>
                  <input
                    id="evidencia"
                    ref={entradaArchivos}
                    type="file"
                    accept="image/*"
                    multiple
                    className="sr-only"
                    onChange={(e) => {
                      if (e.target.files?.length) agregarArchivos(e.target.files)
                      e.target.value = ''
                    }}
                  />
                </label>

                {avisoArchivo ? (
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-pend-fuerte">
                    <AlertCircle className="size-3.5" aria-hidden="true" />
                    {avisoArchivo}
                  </p>
                ) : null}

                {archivos.length > 0 ? (
                  <ul className="mt-3 grid gap-3 sm:grid-cols-3">
                    {archivos.map((archivo) => (
                      <li
                        key={archivo.id}
                        className="animate-fade-up group relative overflow-hidden rounded-xl border border-linea bg-superficie shadow-sm transition-all duration-300 hover:shadow-lg"
                      >
                        <img
                          src={archivo.url}
                          alt={`Evidencia adjunta: ${archivo.nombre}`}
                          className="h-24 w-full object-cover"
                        />
                        <div className="p-2">
                          <p className="truncate text-xs font-medium text-ink">{archivo.nombre}</p>
                          <p className="text-[11px] text-ink-3">{formatoPeso(archivo.peso)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => quitarArchivo(archivo.id)}
                          className="absolute right-1.5 top-1.5 rounded-lg bg-black/60 p-1 text-white opacity-0 transition-opacity duration-300 hover:bg-black/80 focus-visible:opacity-100 group-hover:opacity-100"
                          aria-label={`Quitar ${archivo.nombre}`}
                        >
                          <X className="size-3.5" aria-hidden="true" />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>

            <div className="mt-5 flex flex-col-reverse gap-3 border-t border-linea pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-1.5 text-xs text-ink-3">
                <EyeOff className="size-3.5" aria-hidden="true" />
                No se registra tu identidad ni tu dispositivo.
              </p>
              <div className="flex gap-2">
                <Button type="button" variant="ghost" onClick={reiniciarFormulario} disabled={enviando}>
                  Limpiar
                </Button>
                <Button type="submit" disabled={enviando}>
                  {enviando ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                      Enviando…
                    </>
                  ) : (
                    <>
                      <Send className="size-4" aria-hidden="true" />
                      Enviar reporte
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="text-sm font-semibold text-ink">¿Qué pasa con tu reporte?</h2>
            <ol className="mt-3 space-y-3">
              {PASOS.map((paso, indice) => {
                const Icono = paso.icono
                return (
                  <li key={paso.texto} className="flex gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-mio-suave text-mio-fuerte">
                      <Icono className="size-4" aria-hidden="true" />
                    </span>
                    <p className="text-sm leading-relaxed text-ink-2">
                      <span className="font-semibold text-ink">{indice + 1}. </span>
                      {paso.texto}
                    </p>
                  </li>
                )
              })}
            </ol>
            <p className="mt-4 border-t border-linea pt-3 text-xs text-ink-3">
              {pendientesTotales} reportes en revisión actualmente.
            </p>
          </Card>

          <Aviso icon={Phone} tono="rojo" titulo="¿Es una emergencia?">
            Si hay riesgo para la vida o la integridad de alguien, no uses este formulario: comunícate
            con la línea <strong>123</strong> o con el personal de la estación.
          </Aviso>
        </div>
      </div>

      {misReportes.length > 0 ? (
        <section className="mt-8">
          <h2 className="mb-3 text-base font-semibold text-ink">Reportes enviados en esta sesión</h2>
          <div className="space-y-3">
            {misReportes.map((reporte) => (
              <Card key={reporte.id} interactiva className="animate-fade-up p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-mono text-xs font-semibold text-mio-fuerte">{reporte.id}</p>
                  <EstadoBadge estado={reporte.estado} />
                </div>
                <p className="mt-2 text-sm font-semibold text-ink">{reporte.tipo}</p>
                <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-ink-3">
                  <span>
                    {reporte.estacion} · {reporte.fecha}
                  </span>
                  {reporte.evidencias > 0 ? (
                    <span className="inline-flex items-center gap-1">
                      <Paperclip className="size-3" aria-hidden="true" />
                      {reporte.evidencias} evidencia(s)
                    </span>
                  ) : null}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{reporte.descripcion}</p>
              </Card>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
