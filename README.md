# Cultura MIO

Aplicación web (SPA) para promover la cultura ciudadana en el transporte masivo
de Cali. Construida con **React 19 + Vite + Tailwind CSS v4** e iconografía
**Lucide React**.

> Los contenidos se sirven desde `src/data/` mientras se conecta el backend.

## Cómo levantarlo

```bash
cd prototipo-cultura-mio
npm install     # solo la primera vez
npm run dev     # abre http://localhost:5173
```

Otros comandos:

```bash
npm run build     # build de producción en dist/
npm run preview   # sirve el build de producción
npm run lint      # oxlint
```

## Identidad visual

| Rol | Color | Uso |
|---|---|---|
| Azul institucional | `#00529b` | menú lateral, header, botones principales, barras del tablero |
| Verde biodiversidad | `#70b72a` | acentos, medidor de progreso, estados de éxito, campañas ambientales |
| Rojo MIO | `#d8222a` | alertas, rechazos y avisos urgentes |
| Celeste claro | `#f0f4f8` | fondo general de la aplicación |

Los tonos viven en `src/index.css` como tokens de Tailwind (`mio-*`, `verde-*`,
`rojo-*`, `naranja-*`) más un juego de tokens semánticos que cambian con el tema.
Dos ajustes de legibilidad sobre la paleta base: los botones verdes con texto
blanco usan `verde-700` (#4c7d1b, mismo tono, paso más oscuro) porque el verde
oficial sobre blanco queda en 2.5:1, y el verde oficial se reserva para rellenos
y acentos donde no hay texto encima.

## Modo claro / oscuro

El botón del menú (interruptor segmentado en escritorio, icono de luna/sol en la
barra móvil) alterna el tema. La preferencia se guarda en `localStorage` y un
script en `index.html` aplica la clase antes del primer pintado, así no hay
destello blanco al recargar. El sistema de color vive en tokens semánticos
(`bg-superficie`, `text-ink`, `bg-mio-suave`…) definidos con `@theme inline`,
de modo que cada componente conmuta sin escribir `dark:` en cada clase.

## Vistas

| Ruta | Vista | Qué hace |
|---|---|---|
| `#/inicio` | Inicio | Bienvenida, accesos rápidos y seis campañas cívicas. |
| `#/cultura` | Cultura Ciudadana | Manual del Buen Pasajero: 15 normas en secciones desplegables, marcables, con medidor de progreso. |
| `#/reportes` | Reportes Ciudadanos | Formulario validado (fecha, estación, tipo, descripción); el envío es simulado, limpia el formulario y muestra el aviso de éxito. |
| `#/rutas` | Información de Rutas | Buscador y detalle de rutas (T31, E21, P21A, A17A) con origen, destino, horarios y paradas. |
| `#/admin` | Administración | Métricas, distribución de reportes por tipo y tabla de moderación con Aprobar / Rechazar. |

La navegación es SPA: cambia la vista por `hash` sin recargar la página, así que
los botones atrás/adelante del navegador siguen funcionando.

## Estado compartido

Los reportes viven en `App.jsx` y se pasan a las vistas. Un reporte enviado en
**Reportes Ciudadanos** aparece de inmediato en la tabla de **Administración**, y
al aprobarlo o rechazarlo el cambio se refleja también en la vista del ciudadano.

## Estructura

```
prototipo-cultura-mio/
├── index.html
├── vite.config.js            # React + plugin de Tailwind v4
└── src/
    ├── main.jsx
    ├── index.css             # tokens de diseño (@theme) y utilidades
    ├── App.jsx               # layout, navegación por hash y estado compartido
    ├── components/
    │   ├── Nav.jsx           # sidebar de escritorio y menú lateral móvil
    │   ├── BotonTema.jsx     # interruptor claro / oscuro
    │   ├── Toast.jsx         # avisos de éxito y de logro desbloqueado
    │   └── ui.jsx            # Card, Button, Tag, EstadoBadge, Aviso…
    ├── hooks/useTema.js      # tema persistido en localStorage
    ├── data/mock.js          # estaciones, campañas, manual, rutas, reportes
    └── views/                # Inicio, Cultura, Reportes, Rutas, Admin
```

## Notas de diseño

- **Mobile-first**: una columna hasta `sm`, rejillas a partir de ahí; el menú es
  un panel lateral en móvil y una barra fija desde `lg`.
- **Profundidad y micro-interacciones**: las tarjetas usan `shadow-lg`
  (amplia y suave), bordes `rounded-2xl` y elevación al pasar el mouse
  (`hover:-translate-y-1 transition-all duration-300`); los botones suben
  `0.5`. Las sombras son tokens que cambian de valor en modo oscuro. Con
  `prefers-reduced-motion` se anulan los desplazamientos.
- **Menú institucional**: fondo azul `#00529b` en escritorio y móvil, enlaces
  inactivos en blanco translúcido y el activo en pastilla blanca con texto azul.
- **Color sobre fondo oscuro**: los botones que van sobre los degradados usan las
  variantes `sobreOscuro` y `fantasmaClaro` en vez de sobrescribir clases —
  entre dos utilidades del mismo tipo gana el orden del CSS, no el del atributo.
- **Color de datos**: la gráfica del tablero usa un único azul validado contra
  fondo blanco (contraste ≥ 3:1). Los colores de estado (pendiente / aprobado /
  rechazado) nunca viajan solos: siempre llevan icono y etiqueta.
- **Accesibilidad**: `aria-expanded` en los desplegables, `aria-pressed` en los
  elementos marcables, errores de formulario asociados con `aria-describedby`,
  foco visible y alternativa en tabla para la gráfica. El contraste de los
  botones se verificó en ambos temas (todos por encima de 4.5:1).
