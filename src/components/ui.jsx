import { CheckCircle2, AlertTriangle, Clock3 } from 'lucide-react'

export function Card({
  as: Tag = 'div',
  interactiva = false,
  className = '',
  children,
  ...rest
}) {
  return (
    <Tag
      className={`rounded-2xl border border-linea bg-superficie shadow-lg transition-all duration-300 ${
        interactiva ? 'hover:-translate-y-1 hover:shadow-xl' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function PageHeader({ eyebrow, title, description, children, action }) {
  return (
    <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-mio-fuerte">{eyebrow}</p>
        ) : null}
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-2 sm:text-base">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-4">{children}</div> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  )
}

export function SectionTitle({ title, hint, action }) {
  return (
    <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
      <div>
        <h2 className="text-base font-bold text-ink sm:text-lg">{title}</h2>
        {hint ? <p className="text-sm text-ink-2">{hint}</p> : null}
      </div>
      {action}
    </div>
  )
}

const TONOS = {
  mio: 'bg-mio-suave text-mio-fuerte ring-mio-fuerte/20',
  verde: 'bg-verde-suave text-verde-fuerte ring-verde-fuerte/25',
  rojo: 'bg-rojo-suave text-rojo-fuerte ring-rojo-fuerte/25',
  naranja: 'bg-naranja-suave text-naranja-fuerte ring-naranja-fuerte/25',
  neutro: 'bg-plano text-ink-2 ring-linea',
}

export function Tag({ tono = 'neutro', className = '', children }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${TONOS[tono]} ${className}`}
    >
      {children}
    </span>
  )
}

// cada estado lleva su icono y su texto
const ESTADOS = {
  Pendiente: { icon: Clock3, clase: 'bg-pend-suave text-pend-fuerte ring-pend-borde' },
  Aprobado: { icon: CheckCircle2, clase: 'bg-apro-suave text-apro-fuerte ring-apro-borde' },
  Rechazado: { icon: AlertTriangle, clase: 'bg-rech-suave text-rech-fuerte ring-rech-borde' },
}

export function EstadoBadge({ estado }) {
  const { icon: Icon, clase } = ESTADOS[estado] ?? ESTADOS.Pendiente
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${clase}`}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {estado}
    </span>
  )
}

export function Button({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-300 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 disabled:hover:shadow-none'
  const variants = {
    primary: 'bg-mio-500 text-white shadow-md hover:-translate-y-0.5 hover:bg-mio-600 hover:shadow-lg',
    verde: 'bg-verde-700 text-white shadow-md hover:-translate-y-0.5 hover:bg-verde-800 hover:shadow-lg',
    peligro: 'bg-rojo-500 text-white shadow-md hover:-translate-y-0.5 hover:bg-rojo-600 hover:shadow-lg',
    secondary:
      'bg-superficie text-mio-fuerte shadow-sm ring-1 ring-inset ring-linea hover:-translate-y-0.5 hover:bg-mio-suave hover:shadow-lg',
    ghost: 'text-ink-2 hover:bg-plano hover:text-ink',
    sobreOscuro: 'bg-white text-mio-500 shadow-lg hover:-translate-y-0.5 hover:bg-mio-50 hover:shadow-xl',
    fantasmaClaro:
      'bg-white/10 text-white ring-1 ring-inset ring-white/40 backdrop-blur-sm hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-lg',
    aprobar:
      'bg-superficie text-verde-fuerte ring-1 ring-inset ring-apro-borde hover:bg-verde-suave hover:shadow-md',
    rechazar:
      'bg-superficie text-rojo-fuerte ring-1 ring-inset ring-rech-borde hover:bg-rojo-suave hover:shadow-md',
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-sm sm:text-base',
  }
  return (
    <Tag className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

export function Aviso({ icon: Icon, titulo, children, tono = 'warn' }) {
  const tonos = {
    warn: 'border-pend-borde bg-pend-suave text-pend-fuerte',
    info: 'border-mio-fuerte/20 bg-mio-suave text-mio-fuerte',
    rojo: 'border-rech-borde bg-rojo-suave text-rojo-fuerte',
  }
  return (
    <div className={`flex gap-3 rounded-2xl border p-4 shadow-sm ${tonos[tono]}`}>
      {Icon ? <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" /> : null}
      <div className="text-sm leading-relaxed">
        {titulo ? <p className="font-bold">{titulo}</p> : null}
        <div className={titulo ? 'mt-0.5' : ''}>{children}</div>
      </div>
    </div>
  )
}
