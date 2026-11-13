import {
  Building,
  CloudLightning,
  Coins,
  Cpu,
  Gavel,
  Home,
  Landmark,
  Map,
  Network,
  Scale,
  ScrollText,
  Search,
  Sprout,
  Users,
  Vote,
  Wheat,
  Briefcase,
  Shrink,
} from 'lucide-react'
import type { Block, Pillar, TimelineStage, Via } from '../types'

export const IDEAS_FUERZA = [
  {
    title: 'El poder vuelve al ciudadano',
    text: 'Participación directa, presupuesto transparente y control en tiempo real mediante tecnología sin intermediarios.',
    icon: Vote,
  },
  {
    title: 'Estado mínimo e inteligente',
    text: 'Gestión optimizada con Inteligencia Artificial, eliminación drástica de la burocracia y supresión de partidas corruptas.',
    icon: Cpu,
  },
  {
    title: 'Premio total a la generación de empleo',
    text: 'Impuesto cero a quien genera trabajo registrado hasta alcanzar el pleno empleo.',
    icon: Briefcase,
  },
  {
    title: 'Protección y dignidad universal',
    text: 'Garantía de alimentación saludable, solución habitacional y respuesta planificada ante contingencias climáticas.',
    icon: Home,
  },
  {
    title: 'República Federal de Estados',
    text: 'Descentralización efectiva, provincias transformadas en Estados autosuficientes y traslado de la Capital Federal a Ushuaia para afianzar el país bicontinental.',
    icon: Map,
  },
]

export const BLOCKS: Block[] = [
  {
    id: 'instituciones',
    label: 'Instituciones y Transparencia',
    short: 'Instituciones',
    description: 'Nueva Constitución, Estado digital auditable, revisión patrimonial, justicia democrática y Cámara Única.',
    icon: Landmark,
  },
  {
    id: 'economia',
    label: 'Economía y Desarrollo',
    short: 'Economía',
    description: 'Impuesto cero al trabajo, Estado mínimo e inteligente y Fondo Nacional Digital sin emisión ni deuda.',
    icon: Coins,
  },
  {
    id: 'sociedad',
    label: 'Sociedad, Salud y Territorio',
    short: 'Sociedad y Territorio',
    description: 'Vivienda propia, Hambre Cero, emergencia climática y una República Federal de Estados.',
    icon: Users,
  },
]

export const PILLARS: Pillar[] = [
  {
    number: 1,
    block: 'instituciones',
    title: 'Nueva Constitución y Estado Digital Transparente',
    icon: ScrollText,
    promise:
      'Cambiar la Constitución para fundar una ontocracia transparente. Una plataforma de gestión con Inteligencia Artificial para auditar toda la función pública y permitir que los ciudadanos voten en línea el presupuesto y la administración de los recursos, sin intermediarios.',
    actions: [
      { vias: ['C'], text: 'Envío al Congreso de la declaración de necesidad de reforma con el temario integral.' },
      { vias: ['A', 'D'], text: 'Puesta en marcha de la versión 1.0 de la Plataforma de Participación Ciudadana para decidir el destino de partidas presupuestarias ejecutivas seleccionadas.' },
      { vias: ['A'], text: 'Publicación del Tablero Público de Gestión y Auditoría con IA: todo contrato, licitación y gasto estatal auditable en tiempo real.' },
    ],
    notes: [
      { title: 'Requisito legal', text: 'La reforma exige la aprobación de 2/3 del Congreso (art. 30 CN). Se contempla una Consulta Popular (art. 40 CN) para convalidar el apoyo social ante resistencias parlamentarias.' },
      { title: 'Seguridad informática', text: 'Biometría descentralizada e infraestructura crítica contra ciberataques, con auditoría externa continua del código fuente de la plataforma.' },
      { title: 'Control de sesgo', text: 'La IA actúa como sistema de alerta preventiva y ordenamiento; la decisión legal final recae siempre en funcionarios humanos individualizables.' },
    ],
    keywords: ['constitución', 'reforma', 'inteligencia artificial', 'ia', 'presupuesto participativo', 'transparencia', 'plataforma', 'digital', 'ontocracia'],
  },
  {
    number: 2,
    block: 'instituciones',
    title: 'Revisión de Gestiones Anteriores y Enriquecimiento Ilícito',
    icon: Search,
    promise:
      'Revisión patrimonial exhaustiva del enriquecimiento de todos los funcionarios públicos que hayan ejercido cargos desde el año 2001 hasta el presente.',
    actions: [
      { vias: ['A'], text: 'Constitución de la Comisión Nacional de Revisión Patrimonial: profesionales independientes, auditores forenses, contadores, UIF, Oficina Anticorrupción, ARCA y Procuración del Tesoro.' },
      { vias: ['A'], text: 'Publicación del protocolo de auditoría estandarizado, aplicable objetivamente a todos los períodos de gobierno desde 2001.' },
      { vias: ['A', 'B'], text: 'Cruce masivo de declaraciones juradas, inmuebles, sociedades, cuentas bancarias y participación en licitaciones, con envío periódico de causas fundamentadas al Poder Judicial.' },
    ],
    notes: [
      { title: 'División de poderes', text: 'El Poder Ejecutivo investiga administrativa y técnicamente; la condena penal y el decomiso son competencia exclusiva de la Justicia (art. 268 inc. 2 del Código Penal).' },
      { title: 'Imparcialidad', text: 'Para evitar acusaciones de persecución política, se audita con la misma vara a funcionarios de gestiones previas, aliados políticos y a las nuevas autoridades desde el Día 1.' },
    ],
    keywords: ['corrupción', 'enriquecimiento ilícito', 'auditoría', 'funcionarios', 'patrimonio', 'justicia', '2001'],
  },
  {
    number: 3,
    block: 'instituciones',
    title: 'Democratización de la Justicia',
    icon: Scale,
    promise:
      'Fin de los privilegios y arreglos corporativos en los juzgados. Transición hacia un sistema judicial democrático, donde jueces y fiscales tengan control de gestión y mecanismos de selección participativos.',
    actions: [
      { vias: ['C'], text: 'Inclusión en la Reforma Constitucional de nuevos métodos de elección y remoción de magistrados.' },
      { vias: ['B'], text: 'Proyecto de Ley de Concursos Públicos Transparentes para las vacantes actuales, con audiencias públicas obligatorias y monitoreo ciudadano.' },
      { vias: ['A'], text: 'Creación del Portal de Trazabilidad Judicial Público con plazos, demoras y tasas de resolución de cada juzgado.' },
    ],
    notes: [
      { title: 'Marco constitucional', text: 'Las modificaciones profundas al Consejo de la Magistratura y a la Corte Suprema requieren rango constitucional.' },
      { title: 'Definición del modelo', text: 'Ternas por concurso técnico con validación y votación ciudadana final, para evitar la politización partidaria de la justicia.' },
    ],
    keywords: ['justicia', 'jueces', 'fiscales', 'concursos', 'magistratura', 'corte suprema'],
  },
  {
    number: 4,
    block: 'economia',
    title: 'Impuesto Cero al Trabajo',
    icon: Briefcase,
    promise:
      'Eliminación de la carga impositiva sobre la generación de empleo. Exención total de impuestos directos al trabajo formal para empresas y PyMEs hasta alcanzar el pleno empleo.',
    actions: [
      { vias: ['B'], text: 'Proyecto de Ley "Impuesto Cero al Empleo": alícuota 0 en cargas patronales y contribuciones para todo nuevo puesto de trabajo registrado.' },
      { vias: ['A'], text: 'Mesa Federal de Adhesión Tributaria para que Provincias/Estados e intendencias eximan de Ingresos Brutos y tasas locales a las contrataciones netas.' },
      { vias: ['A'], text: 'Indicador oficial de "Pleno Empleo" (desempleo estructural por debajo del 3%) con seguimiento mensual publicado.' },
    ],
    notes: [
      { title: 'Competencia tributaria', text: 'Los tributos locales requieren adhesión voluntaria por ley provincial y ordenanza municipal. La Nación compensará mediante incentivos directos.' },
      { title: 'Sostenibilidad fiscal', text: 'Las bajas recaudatorias temporales se compensan con la reducción del gasto del Pilar 7 y la ampliación de la base tributaria por el blanqueo de la actividad económica.' },
    ],
    keywords: ['impuestos', 'empleo', 'trabajo', 'pymes', 'cargas patronales', 'pleno empleo', 'ingresos brutos'],
  },
  {
    number: 5,
    block: 'sociedad',
    title: 'Vivienda Propia',
    icon: Home,
    promise:
      'Programa nacional de crédito para la vivienda propia en articulación con el sistema bancario, con cuotas equivalentes al valor estándar de un alquiler.',
    actions: [
      { vias: ['B', 'A'], text: 'Ley del Sistema Hipotecario Social e instrucción a la banca pública para lanzar líneas directas a 20-30 años.' },
      { vias: ['A'], text: 'Fideicomiso Nacional de Tierras Fiscales: terrenos del Estado para desarrollos habitacionales a costo de infraestructura.' },
      { vias: ['A'], text: 'Registro Único de Demanda Habitacional y primera licitación de obras industrializadas prioritarias.' },
    ],
    notes: [
      { title: 'Mecanismo financiero', text: 'La equivalencia "cuota = alquiler" se logra con unidades de valor ajustables combinadas con subsidio diferido a la tasa de interés inicial.' },
      { title: 'Efectividad', text: 'Entregas organizadas en fases verificables por trimestre, sin desfasajes presupuestarios.' },
    ],
    keywords: ['vivienda', 'crédito hipotecario', 'alquiler', 'casa propia', 'tierras fiscales', 'bancos'],
  },
  {
    number: 6,
    block: 'instituciones',
    title: 'Cámara Única con Representación Sectorial',
    icon: Building,
    promise:
      'Reemplazo del sistema bicameral por una Unicameralidad eficiente y reducida, con representación equilibrada de cada Estado federado y de los sectores clave de la producción, el trabajo y la sociedad.',
    actions: [
      { vias: ['C'], text: 'Inclusión del Parlamento Unicameral Sectorial en el temario de la Ley de Necesidad de Reforma Constitucional.' },
      { vias: ['A'], text: 'Consejo Técnico para la Reforma Legislativa: criterios de representación para gremios, cámaras empresariales, sectores académicos, jubilados y comunidades.' },
      { vias: ['A'], text: 'Presentación pública del esquema organizativo para el debate nacional.' },
    ],
    notes: [
      { title: 'Criterios de sectorización', text: 'La reglamentación establecerá un padrón electoral sectorial interno para evitar designaciones corporativas arbitrarias y mantener la legitimidad democrática.' },
      { title: 'Eficiencia presupuestaria', text: 'Una sola cámara recorta drásticamente el gasto en asesores, estructuras redundantes y logística del Poder Legislativo.' },
    ],
    keywords: ['congreso', 'unicameral', 'senado', 'diputados', 'cámara única', 'legislativo'],
  },
  {
    number: 7,
    block: 'economia',
    title: 'Estado Mínimo, Estado Inteligente',
    icon: Shrink,
    promise:
      'Reducción drástica de la burocracia estatal. Sustitución de dependencias obsoletas por sistemas de automatización con Inteligencia Artificial y optimización de recursos y servicios.',
    actions: [
      { vias: ['A'], text: 'Auditoría organizacional masiva de ministerios, secretarías, entes autárquicos y organismos descentralizados.' },
      { vias: ['A'], text: 'Eliminación y fusión inmediata de reparticiones que dupliquen funciones.' },
      { vias: ['A'], text: 'Digitalización prioritaria, con plazo de resolución automática, de los 50 trámites más demandados.' },
      { vias: ['A'], text: 'Programa Nacional de Reconversión del Empleo Público hacia áreas críticas: Seguridad, Salud y Educación.' },
    ],
    notes: [
      { title: 'Delimitación del Estado', text: 'Funciones no negociables de la administración central: Defensa, Seguridad, Justicia, Salud Primaria, Educación Universal y Relaciones Exteriores.' },
      { title: 'Protección legal', text: 'Las reestructuraciones respetan la estabilidad del empleo público, con capacitación intensiva para prevenir litigios laborales masivos.' },
    ],
    keywords: ['burocracia', 'gasto público', 'trámites', 'empleo público', 'inteligencia artificial', 'ia', 'eficiencia'],
  },
  {
    number: 8,
    block: 'sociedad',
    title: 'Hambre Cero y Alimentación Saludable Universal',
    icon: Wheat,
    promise:
      'Nutrición universal a través del Plan Hambre Cero. Producción a gran escala de alimentos mediante granjas verticales hidropónicas sostenidas por proyectos de energía de alta eficiencia.',
    actions: [
      { vias: ['A'], text: 'Programa Hambre Cero: unificación de los planes de asistencia alimentaria en una tarjeta y padrón único, sin intermediarios.' },
      { vias: ['A'], text: 'Primer complejo piloto de producción hidropónica/vertical junto al INTA, universidades y empresas privadas.' },
      { vias: ['A'], text: 'Comité de Verificación Científica para el análisis técnico, la viabilidad energética y el escalamiento del plan productivo.' },
    ],
    notes: [
      { title: 'Fase operativa inmediata', text: 'La cobertura del hambre se atiende desde el Día 1 con recursos reasignados del Plan de Eficiencia, mientras se montan las infraestructuras hidropónicas.' },
      { title: 'Validación tecnológica', text: 'Los componentes de vanguardia se comunican con métricas auditables y respaldo de informes técnicos independientes.' },
    ],
    keywords: ['hambre', 'alimentación', 'comedores', 'escuelas', 'hidroponía', 'granjas verticales', 'planes sociales', 'inta'],
  },
  {
    number: 9,
    block: 'sociedad',
    title: 'Emergencia Climática y Fondo de Contingencia',
    icon: CloudLightning,
    promise:
      'Ley de Emergencia Climática integral con un Fondo de Contingencia permanente para responder de inmediato a desastres naturales extremos, como los derivados de El Niño y sequías severas.',
    actions: [
      { vias: ['B'], text: 'Proyecto de Ley de Emergencia Climática y creación del Fondo Nacional de Contingencia.' },
      { vias: ['A'], text: 'Mapa Nacional de Riesgo y Vulnerabilidad Climática junto al Servicio Meteorológico Nacional y Defensa Civil.' },
      { vias: ['A'], text: 'Plan de Prevención Infraestructural: licitación rápida de obras hídricas y acopio de reservas operativas de emergencia.' },
    ],
    notes: [
      { title: 'Transparencia del Fondo', text: 'El Fondo de Contingencia está sujeto a auditoría pública digital inmediata para evitar desvíos durante las emergencias declaradas.' },
      { title: 'Criterio técnico', text: 'El mapa de riesgo se basa en datos históricos e informes oceanográficos y atmosféricos oficiales.' },
    ],
    keywords: ['clima', 'inundaciones', 'sequía', 'el niño', 'emergencia', 'campo', 'obras hídricas'],
  },
  {
    number: 10,
    block: 'economia',
    title: 'Fondo Nacional Digital',
    icon: Network,
    promise:
      'Fondo Nacional Digital mediante la tokenización de ingresos futuros de los recursos naturales: capacidad financiera sin emitir moneda sin respaldo ni contraer deuda soberana tradicional.',
    actions: [
      { vias: ['A'], text: 'Comisión Técnica y Financiera del Fondo Digital: CNV, economistas, ingenieros de sistemas, especialistas en activos digitales y representantes provinciales.' },
      { vias: ['A', 'B'], text: 'Marco regulatorio que certifique que la propiedad soberana de los bienes no se aliena.' },
      { vias: ['B'], text: 'Proyecto de ley para autorizar instrumentos digitales respaldados en cánones de explotación e ingresos por recursos.' },
    ],
    notes: [
      { title: 'Dominio originario', text: 'Según el art. 124 CN, el dominio de los recursos naturales es de las provincias: el Fondo funciona mediante acuerdos de adhesión y coparticipación de beneficios.' },
      { title: 'Naturaleza del instrumento', text: 'No se venden tierras ni reservas: se titularizan digitalmente los flujos monetarios de la explotación futura.' },
    ],
    keywords: ['tokenización', 'cripto', 'activos digitales', 'recursos naturales', 'deuda', 'emisión', 'inversión', 'litio', 'energía'],
  },
  {
    number: 11,
    block: 'sociedad',
    title: 'República Federal de Estados y Capital en Ushuaia',
    icon: Map,
    promise:
      'Las provincias pasan a ser Estados descentralizados con plena capacidad de gestión y recaudación. La Capital Federal se traslada a Ushuaia, en el marco de la Argentina Bicontinental, y Buenos Aires pasa a ser la Capital Financiera.',
    actions: [
      { vias: ['C'], text: 'Inclusión en el temario constitucional del modelo de República de Estados federados y de la nueva Capital Federal.' },
      { vias: ['B'], text: 'Ley de Traslado de la Capital Federal a Ushuaia, con cesión de terrenos coordinada con Tierra del Fuego (art. 3 CN).' },
      { vias: ['B'], text: 'Nuevo Régimen Fiscal Federal: cada Estado recauda sus impuestos y transfiere una cuota equitativa a la Nación.' },
      { vias: ['A'], text: 'Decreto de Federalización Operativa: traslado de organismos descentralizados según la vocación económica regional.' },
      { vias: ['A'], text: 'Mesa Interministerial para la planificación urbana, de conectividad y energética de Ushuaia.' },
    ],
    notes: [
      { title: 'Modelo federal real', text: 'Cada jurisdicción gana autonomía para fijar sus políticas de desarrollo, con un Fondo de Nivelación Federal que evita desequilibrios regionales.' },
      { title: 'Estrategia bicontinental', text: 'Ushuaia proyecta a la Argentina sobre el Atlántico Sur y el sector antártico, respetando el Tratado Antártico.' },
      { title: 'Fases de traslado', text: 'La mudanza se hace por módulos: primero los ministerios prioritarios, luego conectividad y sedes institucionales.' },
    ],
    keywords: ['federalismo', 'provincias', 'estados', 'ushuaia', 'capital', 'coparticipación', 'tierra del fuego', 'antártida'],
  },
]

export const VIAS: Via[] = [
  {
    id: 'A',
    name: 'Ejecutivo',
    instrument: 'Decretos del Poder Ejecutivo y resoluciones ministeriales (art. 99 incs. 1 y 2 CN)',
    scope: 'Reorganización de la administración pública, programas directos, transparencia, auditorías y convenios.',
    start: 'Día 1 (inmediato)',
    icon: ScrollText,
  },
  {
    id: 'B',
    name: 'Leyes',
    instrument: 'Proyectos de ley con tratamiento extraordinario (art. 99 inc. 9 CN) y delegación acotada (art. 76 CN)',
    scope: 'Reformas impositivas, crédito hipotecario, régimen fiscal federal, emergencia climática, Fondo Digital y traslado de la capital.',
    start: 'Semanas 1 a 4',
    icon: Gavel,
  },
  {
    id: 'C',
    name: 'Constitución',
    instrument: 'Ley de Declaración de Necesidad de Reforma Constitucional (art. 30 CN)',
    scope: 'Unicameralidad sectorial, provincias como Estados y nuevo sistema de selección de jueces y fiscales.',
    start: 'Convocatoria el Día 1',
    icon: Landmark,
  },
  {
    id: 'D',
    name: 'Ciudadanía',
    instrument: 'Plataforma Digital, Iniciativa Popular (art. 39 CN) y Consulta Popular (art. 40 CN)',
    scope: 'Presupuesto participativo, validación de legitimidad y respaldo ciudadano a las reformas en el Congreso.',
    start: 'Día 1 (continuo)',
    icon: Users,
  },
]

export const DAY_ONE_DECREES = [
  { title: 'Transparencia Total', text: 'Declaraciones juradas abiertas de todo el gabinete, agendas públicas y licitaciones en tiempo real.' },
  { title: 'Plataforma Ciudadana', text: 'Habilitación del Presupuesto Participativo Digital en partidas ejecutivas.' },
  { title: 'Comisión Nacional de Revisión Patrimonial', text: 'OA, UIF, ARCA, Procuración del Tesoro y auditores forenses independientes.' },
  { title: 'Plan de Eficiencia Administrativa', text: 'Auditoría integral de cargos, estructuras sobrantes y digitalización acelerada de trámites.' },
  { title: 'Programa Hambre Cero', text: 'Padrón único centralizado y red nacional de provisión nutricional escolar y comunitaria.' },
  { title: 'Validación Técnica e Hidroponía', text: 'Convenios con INTA, CONICET y universidades: granjas verticales piloto y auditoría técnica del Plan de Energía Libre.' },
  { title: 'Federalización de Sedes', text: 'Inicio del traslado de organismos descentralizados hacia las economías regionales afines.' },
  { title: 'Prevención de Riesgo Climático', text: 'Alerta temprana y mapa de riesgo nacional.' },
]

export const DAY_ONE_LAWS = [
  'Ley "Impuesto Cero al Empleo Registrado"',
  'Ley Nacional de Vivienda Propia y Sistema Hipotecario Social',
  'Ley de Emergencia Climática y Fondo Nacional de Contingencia',
  'Ley del Fondo Nacional Digital (tokenización de ingresos por recursos)',
  'Ley del Nuevo Régimen Fiscal Federal y Coparticipación Directa',
  'Ley de Traslado de la Capital Federal a Ushuaia',
  'Ley de Ética Pública y Ficha Limpia Generalizada',
]

export const CONGRESS_SENDS = [
  { title: 'Necesidad de Reforma Constitucional (art. 30 CN)', text: 'Temario: Unicameralidad Sectorial, República de Estados y Democratización de la Justicia.' },
  { title: 'Delegación de facultades acotadas (art. 76 CN)', text: 'Exclusivamente en materias operativas de administración y respuesta a emergencias.' },
  { title: 'Convocatoria a sesiones extraordinarias', text: 'Apertura inmediata de los debates parlamentarios.' },
]

export const CONSTITUTIONAL_NOTE =
  'De acuerdo con el artículo 99 inciso 3 de la Constitución Nacional, el Poder Ejecutivo no emitirá Decretos de Necesidad y Urgencia (DNU) en materia tributaria, penal, electoral o de régimen de partidos políticos. Esas materias irán estrictamente por las Vías B o C.'

export const TIMELINE: TimelineStage[] = [
  {
    range: 'Días 1 – 10',
    headline: 'Paquete "Día Uno": decretos, envío de leyes y plataforma abierta',
    byVia: {
      A: 'Cadena nacional. Firma de los 8 decretos iniciales. Lanzamiento del Tablero IA y de la Comisión de Revisión Patrimonial.',
      B: 'Envío formal del paquete legislativo completo y pedido de delegación acotada.',
      C: 'Presentación de la Ley de Necesidad de Reforma (art. 30 CN).',
      D: 'Apertura de la Plataforma Digital. Inicio de la votación consultiva del Presupuesto.',
    },
  },
  {
    range: 'Días 11 – 30',
    headline: 'Sesiones extraordinarias, Tablero IA y primeras medidas Hambre Cero',
    byVia: {
      A: 'Integración del Padrón Único Hambre Cero. Auditoría de dependencias públicas. Convenios con INTA y universidades.',
      B: 'Inicio de comisiones en extraordinarias. Tratamiento prioritario de "Impuesto Cero" y "Emergencia Climática".',
      C: 'Presentación del temario constitucional en la Cumbre de Gobernadores / Estados.',
      D: 'Recolección de firmas por Iniciativa Popular (art. 39 CN) en apoyo al paquete.',
    },
  },
  {
    range: 'Días 31 – 60',
    headline: 'Proyectos en comisión, pilotos de hidroponía y debate de la reforma',
    byVia: {
      A: 'Montaje de granjas verticales piloto. Publicación del mapa de trámites digitalizados y reducciones burocráticas.',
      B: 'Dictámenes y votaciones en las Cámaras para Impuesto Cero y Vivienda Propia.',
      C: 'Campaña federal informativa sobre la Unicameralidad Sectorial y el modelo de Estados.',
      D: 'Segunda fase de votaciones presupuestarias en la Plataforma. Evaluación de resultados.',
    },
  },
  {
    range: 'Días 61 – 100',
    headline: 'Primeras leyes sancionadas, concursos y Semáforo Público',
    byVia: {
      A: 'Descentralización de los primeros organismos a los Estados provinciales. Primeros informes patrimoniales remitidos a la Justicia.',
      B: 'Votación del Nuevo Régimen Fiscal, del Fondo Digital y de la Ley de Capitalidad en Ushuaia.',
      C: 'Votación de la Declaración de Necesidad de Reforma Constitucional.',
      D: 'Presentación del Semáforo Público de Cumplimiento de los 100 Días.',
    },
  },
]

export const KPIS = [
  { title: 'Empleo', text: 'Nuevos puestos de trabajo registrados bajo la alícuota de Impuesto Cero.', icon: Briefcase },
  { title: 'Hambre Cero', text: 'Porcentaje de la población vulnerable incorporada al Padrón Único de Nutrición.', icon: Sprout },
  { title: 'Eficiencia estatal', text: 'Reducción porcentual de cargos políticos innecesarios y trámites simplificados.', icon: Shrink },
  { title: 'Trazabilidad patrimonial', text: 'Expedientes auditados desde 2001 e información derivada a los juzgados competentes.', icon: Search },
  { title: 'Vivienda', text: 'Créditos hipotecarios sociales estructurados y obras iniciadas.', icon: Home },
  { title: 'Transparencia digital', text: 'Porcentaje de contratos estatales monitoreados en tiempo real por el sistema de IA.', icon: Cpu },
]

export const RISKS = [
  {
    risk: 'Resistencia parlamentaria a la reforma',
    cause: 'Falta de mayoría de 2/3 para la reforma constitucional.',
    response: 'Consulta Popular (Vía D) para trasladar la presión de la opinión pública al Congreso, más negociación en el Pacto de Estados.',
  },
  {
    risk: 'Litigiosidad laboral en el empleo público',
    cause: 'Reestructuración y supresión de organismos estatales.',
    response: 'Reubicación asistida y reconversión hacia Seguridad, Salud y Educación, sin vulnerar la estabilidad de los trabajadores de planta.',
  },
  {
    risk: 'Impugnación de decretos',
    cause: 'Acusaciones de exceso de facultades ejecutivas.',
    response: 'Control jurídico previo de cada norma. Ningún decreto regula tributos, penas ni materia electoral (art. 99 incs. 1 y 2).',
  },
  {
    risk: 'Ciberseguridad de la Plataforma',
    cause: 'Intentos de hackeo o alteración del voto ciudadano.',
    response: 'Encriptación de nivel bancario, arquitectura descentralizada y auditorías constantes de universidades nacionales y firmas externas.',
  },
  {
    risk: 'Desequilibrios fiscales provinciales',
    cause: 'Resistencia a la modificación de la Coparticipación.',
    response: 'Implementación progresiva del Fondo de Nivelación y retención de la recaudación local condicionada al cumplimiento.',
  },
]
