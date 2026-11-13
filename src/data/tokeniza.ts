import { BrainCircuit, Fingerprint, Flame, LineChart, Mountain, Route, ShieldCheck, Wheat, Cpu } from 'lucide-react'

/** Contenido del carrusel "Argentina Tokeniza" del Movimiento Nuevo Paradigma */
export const TOKENIZA = {
  kicker: 'Movimiento Nuevo Paradigma presenta',
  headline: ['Argentina tiene activos.', 'El mundo tiene capital.', 'La tecnología puede conectarlos.'],
  message: {
    title: 'Convertir proyectos reales en inversión transparente',
    body: 'Energía, minería, agroindustria, infraestructura y conocimiento: Argentina tiene activos de escala mundial.',
    gap: 'Falta una infraestructura que los haga financiables, auditables y conectados con capital nacional e internacional.',
  },
  sectors: [
    { name: 'Energía', detail: 'Petróleo, gas, LNG, generación y redes', icon: Flame },
    { name: 'Minería', detail: 'Litio, cobre, oro y minerales críticos', icon: Mountain },
    { name: 'Agroindustria', detail: 'Producción, almacenamiento y logística', icon: Wheat },
    { name: 'Infraestructura', detail: 'Ductos, puertos, plantas y transporte', icon: Route },
    { name: 'Economía del conocimiento', detail: 'Propiedad intelectual y flujos verificables', icon: Cpu },
  ],
  goldenRule: {
    title: 'No tokenizar el recurso. Tokenizar, cuando corresponda, el derecho económico válidamente constituido.',
    body: 'Sin criptomonedas especulativas. Con seguridad jurídica, contratos exigibles y trazabilidad.',
  },
  flow: [
    'Activo o proyecto productivo',
    'Titularidad, permisos y contratos',
    'Vehículo jurídico y derechos económicos',
    'Instrumento financiero admisible',
    'Representación digital, si está autorizada',
    'Inversión, administración y seguimiento',
  ],
  regulation: [
    { year: '2025', code: 'RG 1069', detail: 'Régimen inicial de representación digital de valores negociables' },
    { year: '2025', code: 'RG 1081', detail: 'Ampliación del régimen de tokenización' },
    { year: '2026', code: 'RG 1150', detail: 'Nuevas categorías de instrumentos y condiciones' },
  ],
  regulationNote: 'Cada operación requiere análisis jurídico, financiero, tributario y regulatorio individual.',
  scale: {
    title: 'Vaca Muerta e infraestructura: financiar la escala',
    body: 'Producción, tratamiento, almacenamiento, transporte y exportación: cada proyecto se analiza por separado para definir qué activos, contratos o flujos pueden financiarse.',
    reference: 'Referencia 2026: gasoducto aprobado bajo el RIGI, ~480 km, 36 pulgadas, 27 millones m³/día (Tratayén – San Antonio Oeste).',
    caveat: 'Es solo una referencia: no implica que esté tokenizado ni autorizado para emitir instrumentos digitales.',
  },
  trust: [
    { text: 'Trazabilidad de eventos y derechos', icon: LineChart },
    { text: 'Identidad, KYC y prevención de lavado', icon: Fingerprint },
    { text: 'Paneles de seguimiento para inversores', icon: ShieldCheck },
    { text: 'IA para analizar contratos y alertar riesgos', icon: BrainCircuit },
  ],
  trustNote: 'La IA mejora el análisis, pero no reemplaza las decisiones de auditores, asesores ni autoridades.',
  roadmap: [
    { period: '2027', text: 'Diseño institucional, jurídico y tecnológico' },
    { period: '2027-28', text: 'De 2 a 5 pilotos, sujetos a due diligence' },
    { period: '2028-29', text: 'Validación con financieras, custodios y auditores' },
    { period: '2030-32', text: 'Escalamiento nacional' },
    { period: '2032-35', text: 'Evaluación de expansión regional' },
  ],
  disclaimer:
    'Propuesta conceptual y estratégica. No constituye oferta pública de valores negociables, recomendación de inversión ni asesoramiento jurídico, financiero o tributario. No implica respaldo ni participación de la CNV ni de organismo público alguno. No ofrece rendimientos ni garantiza resultados.',
  slides: Array.from({ length: 10 }, (_, i) => `/img/tokeniza-${String(i + 1).padStart(2, '0')}.webp`),
}

export const KIT = {
  title: 'Un kit de emergencia para cada familia',
  kicker: 'Convocatoria Nacional',
  tagline: 'Prevenir también es cuidar a nuestra gente.',
  body: 'Iniciativa nacional sin fines de lucro: donación, armado y distribución gratuita de kits familiares de emergencia.',
  partners: [
    { name: 'Movimiento Nuevo Paradigma', role: 'Coordinación nacional' },
    { name: 'Fundación Cubo Dorado', role: 'Red de más de 500 fundaciones y organizaciones sociales' },
  ],
  image: '/img/kit-emergencia.webp',
}
