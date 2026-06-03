// ─── Blog Post Data ───────────────────────────────────────────────────────────
// Add new posts at the top of the array to keep them newest-first.

export interface BlogPost {
  id: string;
  slug: string;
  category: string;
  categoryColor: string;
  date: string;
  readMinutes: number;
  title: string;
  eyebrow: string;
  intro: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
    license?: string;
  };
  stats?: { value: string; label: string }[];
  content: BlogSection[];
  tags: string[];
  cta?: {
    text: string;
    href: string;
    label: string;
  };
}

export type BlogSection =
  | { type: 'paragraph'; text: string }
  | { type: 'seccion'; text: string }                               // section label (uppercase small)
  | { type: 'mia-grid'; items: { num: string; title: string; desc: string }[] }
  | { type: 'pack-visual'; title: string; tags: string[] }
  | { type: 'badge360'; text: string }
  | { type: 'servicios360'; items: { icon: string; title: string; desc: string }[] }
  | { type: 'quote'; text: string; author: string }
  | { type: 'team'; members: { initials: string; name: string; role: string }[] }
  | { type: 'portales'; items: string[] }
  | { type: 'cierre'; html: string }
  | { type: 'tags'; items: string[] };

export const blogPosts: BlogPost[] = [
  {
    id: '001',
    slug: 'metodo-mia-servicio-360-essencia',
    category: 'Método MIA',
    categoryColor: 'bg-brand-blue-500',
    date: '2025-06-03',
    readMinutes: 6,
    eyebrow: 'Essencia Inmobiliaria · Gandía — Método MIA · Servicio 360º',
    title: 'Cuando la inteligencia artificial vende tu casa antes de que nadie la visite',
    intro:
      'En Essencia llevamos más de 15 años vendiendo propiedades en Gandía y La Safor. Lo que ha cambiado es la potencia de las herramientas. El Método MIA no es un nombre de marketing: es la forma en que hoy convertimos cada inmueble en un evento de alta visibilidad, con un equipo especializado y un servicio integral 360º que cubre cada fase de la operación.',
    excerpt:
      'El Método MIA —Marketing, Inteligencia Artificial y Asesoramiento— es el proceso con el que Essencia convierte cada inmueble en un evento de alta visibilidad. Más de 2.000 ventas desde 2010, 13M€ en ventas en 2025 y una media de 45 días hasta el cierre.',
    author: {
      name: 'Santi Torres',
      role: 'CEO · Essencia Inmobiliaria',
      license: 'RAICV 0773',
    },
    stats: [
      { value: '+2.000', label: 'ventas cerradas desde 2010' },
      { value: '13M€', label: 'en ventas en 2025' },
      { value: '45 días', label: 'media hasta la venta' },
      { value: '95%', label: 'clientes satisfechos' },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'El mercado inmobiliario de la costa de Gandía ha cambiado más en los últimos tres años que en la década anterior. El comprador de hoy —nacional o internacional— toma decisiones desde la pantalla. Decide si una propiedad le interesa antes de pisarla, y muchas veces antes de hablar con nadie. Lo que ve en esos primeros segundos —la calidad de las imágenes, la fluidez del tour virtual, la precisión del precio— lo es casi todo.',
      },
      {
        type: 'paragraph',
        text: 'Adaptarse a esa realidad no es opcional. En Essencia lo sistematizamos en el Método MIA: Marketing, Inteligencia Artificial y Asesoramiento. Tres pilares que operan de forma coordinada desde el momento en que un propietario nos encarga su venta.',
      },
      {
        type: 'seccion',
        text: 'El Método MIA: diez pasos, ninguno prescindible',
      },
      {
        type: 'paragraph',
        text: 'No listamos casas. Diseñamos ventas. El Método MIA es un proceso secuencial en el que la tecnología no sustituye al asesor sino que multiplica su impacto.',
      },
      {
        type: 'mia-grid',
        items: [
          { num: '01', title: 'Plan de Comunicación', desc: 'Estrategia personalizada con el vendedor antes de publicar nada' },
          { num: '02', title: 'Marketing de Alto Impacto', desc: 'Más de 4.000€ mensuales en inversión publicitaria activa' },
          { num: '03', title: 'Inteligencia Artificial', desc: 'IA aplicada a valoración, renders, descripciones y segmentación de compradores' },
          { num: '04', title: 'Red de +450 Inmobiliarias', desc: 'MLS Gandía (25 agencias) y MLS ASICVAL (450 agencias en la C. Valenciana)' },
          { num: '05', title: 'Gestión Integral de Compra', desc: 'Coordinación de todo el proceso: visitas, ofertas, negociación y firma' },
          { num: '06', title: 'Videos Profesionales con Dron', desc: 'Grabación aérea 4K que contextualiza el inmueble en su entorno y costa' },
          { num: '07', title: 'Pack Visual Pro', desc: 'Fotografía editorial, planos 3D, tour virtual 360º y renders con IA' },
          { num: '08', title: 'Portales Nacionales e Internacionales', desc: 'Idealista, Fotocasa, Habitaclia, Kyero, Pisos.com y portales internacionales' },
          { num: '09', title: 'Pack Essencia Legal · Fiscal · Tasación', desc: 'Servicio jurídico, fiscal y de tasación integrado en cada operación' },
          { num: '10', title: 'Acompañamiento Firma y Post-Venta', desc: 'Presencia hasta escrituras y soporte posterior al cierre' },
        ],
      },
      {
        type: 'seccion',
        text: 'Pack Visual Pro: tu propiedad como un evento mediático',
      },
      {
        type: 'paragraph',
        text: 'La primera visita ya no ocurre en el inmueble. Ocurre en el móvil, a las once de la noche, mientras el comprador compara opciones en Idealista. El Pack Visual Pro de Essencia convierte cada inmueble en un «portal digital»: una experiencia inmersiva que el comprador recorre y explora antes de decidir si merece una visita presencial, reduciendo drásticamente el tiempo hasta la primera oferta seria.',
      },
      {
        type: 'pack-visual',
        title: 'Pack Visual Pro — contenidos incluidos',
        tags: [
          'Fotos y vídeo con dron',
          'Render con IA',
          'Fotografía editorial',
          'Vídeo profesional 4K',
          'Planos en 3D',
          'Tour Virtual 360º',
          'Vídeo vertical estilo cine',
        ],
      },
      {
        type: 'seccion',
        text: 'Servicio integral 360º: fácil, rápido y seguro',
      },
      {
        type: 'paragraph',
        text: 'Vender o comprar una propiedad implica decisiones legales, fiscales y financieras que van mucho más allá de encontrar comprador o vendedor. Essencia ha construido un ecosistema de servicios especializados para que el cliente nunca tenga que salir a buscar lo que necesita: todo está bajo el mismo techo, coordinado por el mismo equipo.',
      },
      {
        type: 'badge360',
        text: 'Servicio 360º — todo incluido',
      },
      {
        type: 'servicios360',
        items: [
          { icon: '⚖️', title: 'Servicio Jurídico', desc: 'Asesoramiento legal en cada fase: contratos, arras, escrituras y resolución de incidencias' },
          { icon: '🧾', title: 'Servicio Fiscal', desc: 'Optimización tributaria de la operación: plusvalías, IRPF, IBI y costes asociados a la transmisión' },
          { icon: '🏠', title: 'Home Staging', desc: 'Preparación profesional del inmueble para maximizar el impacto visual y acortar el tiempo de venta' },
          { icon: '💰', title: 'Financiación', desc: 'Gestión hipotecaria propia con acceso a las mejores condiciones del mercado para el comprador' },
          { icon: '📋', title: 'Tasaciones', desc: 'Valoraciones oficiales y de mercado para fijar el precio correcto desde el primer día' },
          { icon: '🏗️', title: 'Gestión Integral', desc: 'Coordinación de todos los servicios bajo un único interlocutor, de principio a fin' },
        ],
      },
      {
        type: 'quote',
        text: '"Que una operación sea fácil, rápida y segura no es casualidad. Es el resultado de tener bajo el mismo techo todo lo que el cliente necesita, con un equipo que conoce este mercado desde hace más de 15 años."',
        author: 'Santi Torres — CEO, Essencia Inmobiliaria · RAICV 0773',
      },
      {
        type: 'seccion',
        text: 'El equipo: cinco especialistas, un solo objetivo',
      },
      {
        type: 'paragraph',
        text: 'Detrás del Método MIA y del servicio 360º hay personas. Cinco profesionales con conocimiento profundo del mercado de Gandía y La Safor, que saben qué se ha vendido, a qué precio real y a qué tipo de comprador. Ese conocimiento acumulado —junto con las herramientas tecnológicas más avanzadas del sector— es lo que explica los 13 millones de euros en ventas en 2025 y una media de cierre de 45 días.',
      },
      {
        type: 'team',
        members: [
          { initials: 'ST', name: 'Santi Torres', role: 'CEO · Asesor de inversiones' },
          { initials: 'CG', name: 'Carolina González', role: 'Asesora · Marketing y comunicación' },
          { initials: 'JM', name: 'Juanma Menacho', role: 'Asesor inmobiliario' },
          { initials: 'JLP', name: 'Jose Luis Puente', role: 'Asesor inmobiliario' },
          { initials: 'OP', name: 'Oscar Puente', role: 'Asesor inmobiliario' },
        ],
      },
      {
        type: 'seccion',
        text: 'Distribución: presencia donde está el comprador',
      },
      {
        type: 'paragraph',
        text: 'El Método MIA contempla distribución simultánea en los principales portales nacionales e internacionales, activación en redes sociales y acceso a la red de compradores activos de más de 450 agencias colaboradoras. El comprador internacional —cada vez más relevante en la costa de Gandía— accede a través de portales especializados como Kyero, con audiencias directas de Reino Unido, Alemania y los países nórdicos.',
      },
      {
        type: 'portales',
        items: ['Idealista', 'Fotocasa', 'Habitaclia', 'Kyero', 'Pisos.com', 'Facilitea', 'RRSS', 'MLS Gandía', 'MLS ASICVAL'],
      },
      {
        type: 'cierre',
        html: '¿Quieres saber a qué precio real se vende tu propiedad hoy en Gandía o La Safor? Solicita tu <a href="/valuation">valoración gratuita online</a> o habla directamente con el equipo: <strong>647 803 355</strong> · Sant Vicent Ferrer 24, Gandía.',
      },
      {
        type: 'tags',
        items: ['Método MIA', 'Inteligencia Artificial', 'Servicio 360º', 'Pack Visual Pro', 'Home Staging', 'Gandía', 'La Safor', 'Desde 2010'],
      },
    ],
    tags: ['Método MIA', 'Inteligencia Artificial', 'Servicio 360º', 'Pack Visual Pro', 'Home Staging', 'Gandía', 'La Safor'],
    cta: {
      text: 'Solicita tu valoración gratuita',
      href: '/valuation',
      label: 'Valoración Gratuita →',
    },
  },
];
