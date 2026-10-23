// datos que usa la aplicación

export const ESTACIONES = [
  'Terminal Menga',
  'Terminal Paso del Comercio',
  'Terminal Andrés Sanín',
  'Terminal Calipso',
  'Terminal Aguablanca',
  'Universidades',
  'Unidad Deportiva',
  'Chiminangos',
  'Salomia',
  'Popular',
  'Flora Industrial',
  'Torre de Cali',
  'San Nicolás',
  'San Bosco',
  'Plaza de Caicedo',
  'Manzana del Saber',
  'Capri',
  'Buitrera',
  'Sameco',
  'Petecuy',
]

export const TIPOS_INCIDENTE = [
  'Evasión del pago',
  'No respetar la fila',
  'Comportamiento irrespetuoso',
  'Acoso o conducta indebida',
  'Vandalismo o daño al mobiliario',
  'Basuras y aseo de la estación',
  'Venta ambulante dentro del sistema',
  'Acceso preferencial obstruido',
  'Otro',
]

export const CAMPANAS = [
  {
    id: 'asiento',
    titulo: 'Cede el asiento',
    resumen:
      'Las sillas azules son para personas mayores, con movilidad reducida, en embarazo o con niños en brazos.',
    etiqueta: 'Campaña activa',
    icono: 'Armchair',
    tono: 'mio',
    meta: '68% de pasajeros la reconoce',
  },
  {
    id: 'fila',
    titulo: 'Respeta la fila',
    resumen:
      'Una fila ordenada hace que todos subamos más rápido. Colarse no adelanta el bus, solo genera conflicto.',
    etiqueta: 'Campaña activa',
    icono: 'Users',
    tono: 'verde',
    meta: 'Estaciones piloto: 12',
  },
  {
    id: 'salida',
    titulo: 'Deja salir antes de entrar',
    resumen:
      'Ubícate a los costados de la puerta y permite que bajen los pasajeros. El abordaje toma la mitad del tiempo.',
    etiqueta: 'Campaña activa',
    icono: 'DoorOpen',
    tono: 'naranja',
    meta: '-40 s por estación',
  },
  {
    id: 'pago',
    titulo: 'Paga tu pasaje',
    resumen:
      'Cada viaje evadido se traduce en menos buses en circulación. Recarga tu tarjeta antes de llegar al torniquete.',
    etiqueta: 'Siempre vigente',
    icono: 'CreditCard',
    tono: 'mio',
    meta: 'Recarga en 340 puntos',
  },
  {
    id: 'cuidado',
    titulo: 'Cuida tu estación',
    resumen:
      'Rayar vidrios, forzar puertas o dañar sillas encarece el sistema para todos. Reporta lo que veas.',
    etiqueta: 'Campaña activa',
    icono: 'ShieldCheck',
    tono: 'verde',
    meta: 'Reportes ciudadanos: 145',
  },
  {
    id: 'volumen',
    titulo: 'Baja el volumen',
    resumen:
      'Usa audífonos y mantén un tono de voz moderado. El viaje de al lado también cuenta.',
    etiqueta: 'Nueva',
    icono: 'Headphones',
    tono: 'naranja',
    meta: 'Lanzada este mes',
  },
]

export const MANUAL = [
  {
    id: 'espera',
    titulo: 'Mientras esperas',
    descripcion: 'Lo que pasa en el andén define cómo arranca el viaje.',
    icono: 'Clock',
    normas: [
      {
        id: 'espera-1',
        titulo: 'Haz la fila detrás de la línea amarilla',
        detalle:
          'La línea marca la zona segura. Esperar sobre el borde no hace llegar antes el bus y bloquea las puertas.',
      },
      {
        id: 'espera-2',
        titulo: 'Ten tu tarjeta lista antes del torniquete',
        detalle:
          'Buscar la tarjeta en la fila detiene a todos los que vienen detrás. Recárgala con anticipación.',
      },
      {
        id: 'espera-3',
        titulo: 'Deja libre el acceso preferencial',
        detalle:
          'Las rampas y puertas anchas son el único paso posible para sillas de ruedas y coches de bebé.',
      },
    ],
  },
  {
    id: 'abordaje',
    titulo: 'Al abordar',
    descripcion: 'Treinta segundos bien usados en la puerta aceleran toda la ruta.',
    icono: 'DoorOpen',
    normas: [
      {
        id: 'abordaje-1',
        titulo: 'Primero bajan, después subimos',
        detalle:
          'Ubícate a los costados de la puerta. Cuando se bloquea la salida, el bus tarda el doble en la estación.',
      },
      {
        id: 'abordaje-2',
        titulo: 'Avanza hacia el fondo del bus',
        detalle:
          'Quedarse junto a la puerta deja espacio vacío atrás y hace parecer lleno un bus que no lo está.',
      },
      {
        id: 'abordaje-3',
        titulo: 'Quítate el morral y llévalo en la mano',
        detalle:
          'Un morral en la espalda ocupa el lugar de otra persona y golpea sin que te des cuenta.',
      },
    ],
  },
  {
    id: 'viaje',
    titulo: 'Durante el viaje',
    descripcion: 'Compartir el espacio es la parte más larga del recorrido.',
    icono: 'Bus',
    normas: [
      {
        id: 'viaje-1',
        titulo: 'Cede las sillas azules',
        detalle:
          'Son prioritarias para personas mayores, en embarazo, con movilidad reducida o con niños en brazos. No hay que pedirlas: se ofrecen.',
      },
      {
        id: 'viaje-2',
        titulo: 'Usa audífonos',
        detalle:
          'Música o videos en altavoz convierten un viaje compartido en el viaje de una sola persona.',
      },
      {
        id: 'viaje-3',
        titulo: 'No comas ni bebas dentro del bus',
        detalle:
          'Un derrame en un piso en movimiento es una caída esperando ocurrir, además del olor y la basura.',
      },
      {
        id: 'viaje-4',
        titulo: 'Sujétate y respeta el espacio ajeno',
        detalle:
          'Usa pasamanos y agarraderas. Cualquier contacto innecesario puede reportarse de inmediato.',
      },
    ],
  },
  {
    id: 'descenso',
    titulo: 'Al descender',
    descripcion: 'Bajar bien es tan importante como subir bien.',
    icono: 'LogOut',
    normas: [
      {
        id: 'descenso-1',
        titulo: 'Anticipa tu salida una estación antes',
        detalle:
          'Acércate a la puerta con tiempo, sin empujar. Avisar "permiso, voy a bajar" basta casi siempre.',
      },
      {
        id: 'descenso-2',
        titulo: 'Revisa que no dejas nada',
        detalle:
          'Celulares y maletas olvidadas son el objeto perdido más frecuente del sistema.',
      },
    ],
  },
  {
    id: 'convivencia',
    titulo: 'Convivencia y respeto',
    descripcion: 'Las normas que no están pintadas en el piso.',
    icono: 'HeartHandshake',
    normas: [
      {
        id: 'convivencia-1',
        titulo: 'Cero tolerancia al acoso',
        detalle:
          'Si lo vives o lo presencias, repórtalo. Puedes hacerlo de forma anónima desde esta plataforma.',
      },
      {
        id: 'convivencia-2',
        titulo: 'Trata con respeto al personal del sistema',
        detalle:
          'Conductores, auxiliares y personal de estación trabajan para que el viaje funcione.',
      },
      {
        id: 'convivencia-3',
        titulo: 'La basura va en la caneca',
        detalle:
          'Hay puntos de recolección en todas las estaciones. Lo que se deja en el piso lo paga el sistema.',
      },
    ],
  },
]

export const RUTAS = [
  {
    codigo: 'T31',
    tipo: 'Troncal',
    nombre: 'Menga — Universidades',
    origen: 'Terminal Menga',
    destino: 'Universidades',
    horario: 'Lun a Vie 4:30 a.m. – 11:00 p.m.',
    horarios: [
      { dia: 'Lunes a viernes', franja: '4:30 a.m. – 11:00 p.m.', frecuencia: '4 – 7 min' },
      { dia: 'Sábados', franja: '5:00 a.m. – 11:00 p.m.', frecuencia: '8 – 12 min' },
      { dia: 'Domingos y festivos', franja: '5:30 a.m. – 10:00 p.m.', frecuencia: '12 – 18 min' },
    ],
    frecuencia: '4 – 7 min',
    duracion: '48 min aprox.',
    paradas: [
      'Terminal Menga',
      'Sameco',
      'Salomia',
      'Popular',
      'Torre de Cali',
      'San Bosco',
      'Unidad Deportiva',
      'Universidades',
    ],
  },
  {
    codigo: 'E21',
    tipo: 'Expreso',
    nombre: 'Paso del Comercio — Universidades',
    origen: 'Terminal Paso del Comercio',
    destino: 'Universidades',
    horario: 'Lun a Vie 5:00 a.m. – 9:00 p.m.',
    horarios: [
      { dia: 'Lunes a viernes', franja: '5:00 a.m. – 9:00 p.m.', frecuencia: '6 – 10 min' },
      { dia: 'Sábados', franja: '6:00 a.m. – 8:00 p.m.', frecuencia: '12 – 15 min' },
      { dia: 'Domingos y festivos', franja: 'Sin servicio', frecuencia: '—' },
    ],
    frecuencia: '6 – 10 min',
    duracion: '35 min aprox.',
    paradas: [
      'Terminal Paso del Comercio',
      'Petecuy',
      'Chiminangos',
      'Flora Industrial',
      'Torre de Cali',
      'Universidades',
    ],
  },
  {
    codigo: 'P21A',
    tipo: 'Pretroncal',
    nombre: 'Andrés Sanín — Centro',
    origen: 'Terminal Andrés Sanín',
    destino: 'Plaza de Caicedo',
    horario: 'Lun a Sáb 4:45 a.m. – 10:30 p.m.',
    horarios: [
      { dia: 'Lunes a viernes', franja: '4:45 a.m. – 10:30 p.m.', frecuencia: '7 – 12 min' },
      { dia: 'Sábados', franja: '5:30 a.m. – 10:00 p.m.', frecuencia: '12 – 18 min' },
      { dia: 'Domingos y festivos', franja: '6:00 a.m. – 8:00 p.m.', frecuencia: '20 min' },
    ],
    frecuencia: '7 – 12 min',
    duracion: '41 min aprox.',
    paradas: [
      'Terminal Andrés Sanín',
      'Capri',
      'San Nicolás',
      'Manzana del Saber',
      'Plaza de Caicedo',
    ],
  },
  {
    codigo: 'A17A',
    tipo: 'Alimentador',
    nombre: 'Calipso — Barrios del oriente',
    origen: 'Terminal Calipso',
    destino: 'Terminal Aguablanca',
    horario: 'Todos los días 5:00 a.m. – 10:00 p.m.',
    horarios: [
      { dia: 'Lunes a viernes', franja: '5:00 a.m. – 10:00 p.m.', frecuencia: '10 – 15 min' },
      { dia: 'Sábados', franja: '5:30 a.m. – 10:00 p.m.', frecuencia: '15 min' },
      { dia: 'Domingos y festivos', franja: '6:00 a.m. – 9:00 p.m.', frecuencia: '20 – 25 min' },
    ],
    frecuencia: '10 – 15 min',
    duracion: '28 min aprox.',
    paradas: [
      'Terminal Calipso',
      'Buitrera',
      'Unidad Deportiva',
      'Terminal Aguablanca',
    ],
  },
]

export const REPORTES_INICIALES = [
  {
    id: 'RPT-2451',
    fecha: '2026-10-21',
    estacion: 'Unidad Deportiva',
    tipo: 'No respetar la fila',
    descripcion:
      'Tres personas se saltaron la fila de abordaje en la plataforma norte durante la hora pico.',
    estado: 'Pendiente',
  },
  {
    id: 'RPT-2450',
    fecha: '2026-10-21',
    estacion: 'Torre de Cali',
    tipo: 'Basuras y aseo de la estación',
    descripcion: 'Canecas desbordadas en el acceso sur desde temprano en la mañana.',
    estado: 'Pendiente',
  },
  {
    id: 'RPT-2449',
    fecha: '2026-10-20',
    estacion: 'Terminal Menga',
    tipo: 'Evasión del pago',
    descripcion: 'Dos pasajeros saltaron el torniquete de entrada sin validar la tarjeta.',
    estado: 'Aprobado',
  },
  {
    id: 'RPT-2448',
    fecha: '2026-10-20',
    estacion: 'Universidades',
    tipo: 'Vandalismo o daño al mobiliario',
    descripcion: 'Vidrio rayado en la puerta de acceso oriental de la estación.',
    estado: 'Pendiente',
  },
  {
    id: 'RPT-2447',
    fecha: '2026-10-19',
    estacion: 'Plaza de Caicedo',
    tipo: 'Venta ambulante dentro del sistema',
    descripcion: 'Venta de productos dentro del bus articulado en el trayecto al centro.',
    estado: 'Rechazado',
  },
  {
    id: 'RPT-2446',
    fecha: '2026-10-19',
    estacion: 'Chiminangos',
    tipo: 'Acceso preferencial obstruido',
    descripcion: 'Rampa de acceso bloqueada por carga de un pasajero durante 15 minutos.',
    estado: 'Pendiente',
  },
]

// reportes del mes agrupados por tipo
export const REPORTES_POR_TIPO = [
  { tipo: 'Evasión del pago', valor: 38 },
  { tipo: 'No respetar la fila', valor: 29 },
  { tipo: 'Comportamiento irrespetuoso', valor: 24 },
  { tipo: 'Basuras y aseo', valor: 18 },
  { tipo: 'Vandalismo', valor: 14 },
  { tipo: 'Venta ambulante', valor: 12 },
  { tipo: 'Otros', valor: 10 },
]

export const ESTACIONES_CRITICAS = [
  { estacion: 'Unidad Deportiva', reportes: 23, tendencia: 'sube' },
  { estacion: 'Torre de Cali', reportes: 19, tendencia: 'baja' },
  { estacion: 'Terminal Menga', reportes: 16, tendencia: 'sube' },
  { estacion: 'Universidades', reportes: 14, tendencia: 'estable' },
]
