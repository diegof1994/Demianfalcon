/**
 * Datos de campaña. Todo el contenido proviene del documento
 * "Plan Maestro de Gobierno: El Cambio de Raíz" (3 de noviembre de 2026).
 * Los campos marcados como PENDIENTE se completan cuando el equipo los confirme.
 */
export const CAMPAIGN = {
  candidate: 'Demian Borello Falcón',
  candidateFull: 'Demian Gabriel Santamaría Borello Falcón',
  alias: 'El Halcón Falcón',
  movement: 'Movimiento Nuevo Paradigma',
  slogan: 'Por una Argentina unida, libre y soberana.',
  portrait: '/img/demian-retrato.webp',
  role: 'Candidato a Presidente de la Nación',
  planTitle: 'Plan Maestro de Gobierno',
  planName: 'El Cambio de Raíz',
  planDate: '3 de noviembre de 2026',
  inauguration: '10 de diciembre de 2027',
  centralIdea: ['Un argentino es un argentino que trabaja.', 'Un argentino bien alimentado es mejor para su país.'],
  intro:
    'Este plan de gobierno no propone administrar la estructura heredada ni aplicar gradualismos cosméticos. Su objetivo es transformar la raíz institucional, fiscal, judicial y productiva de la Nación.',
  pdfUrl: '/plan-maestro-de-gobierno.pdf',
  pdfName: 'Plan-Maestro-de-Gobierno-El-Cambio-de-Raiz.pdf',
  email: 'MovimientoNuevoParadigma@gmail.com',
  // PENDIENTE: completar X, Facebook y YouTube si existen
  socials: { instagram: 'https://www.instagram.com/gabrieldemianfalcon', x: '', facebook: '', youtube: '' },
  instagramHandle: '@gabrieldemianfalcon',
  hashtags: ['#ArgentinaTokeniza', '#NuevoParadigma', '#Argentina2027', '#ActivosReales'],
} as const

export const NAV_LINKS = [
  { id: 'candidato', label: 'El Candidato' },
  { id: 'plan', label: 'Plan de Gobierno' },
  { id: 'cien-dias', label: '100 Días' },
  { id: 'tokeniza', label: 'Argentina Tokeniza' },
  { id: 'federal', label: 'Federal' },
  { id: 'transparencia', label: 'Transparencia' },
  { id: 'sumate', label: 'Sumate' },
] as const

export const HERO_STATS = [
  { value: '11', label: 'pilares de gobierno' },
  { value: '4', label: 'vías legales simultáneas' },
  { value: '100', label: 'días de ejecución integral' },
] as const

/** Frases del candidato tomadas de las piezas de campaña */
export const QUOTES = [
  'La economía debe estar al servicio de la gente.',
  'Necesitamos urgente un cambio de paradigma: no va más el falso bipartidismo de izquierda o derecha.',
  'Es momento de dar un salto evolutivo entre el libre mercado, la apertura al mundo y medidas con empatía humana.',
  'Nosotros somos este cambio.',
]
