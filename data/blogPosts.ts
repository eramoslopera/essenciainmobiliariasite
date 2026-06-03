// ─── Blog Post Data ───────────────────────────────────────────────────────────
// Add new posts at the top of the array to keep them newest-first.

export interface BlogPost {
  id: string;
  slug: string;
  category: string;
  categoryColor: string;   // Tailwind bg color class
  date: string;            // ISO-8601
  readMinutes: number;
  title: string;
  subtitle: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  heroImage?: string;
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
  | { type: 'lead'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'grid'; columns: 2 | 3; items: { icon: string; title: string; desc: string }[] }
  | { type: 'tags'; label: string; items: string[] }
  | { type: 'quote'; text: string; author: string; role: string }
  | { type: 'cards'; items: { title: string; desc: string }[] }
  | { type: 'divider' };

export const blogPosts: BlogPost[] = [
  {
    id: '001',
    slug: 'herramientas-ia-inmobiliaria-2025',
    category: 'Proptech & IA',
    categoryColor: 'bg-brand-blue-500',
    date: '2025-06-03',
    readMinutes: 7,
    title: 'Herramientas de IA que Todo Asesor Inmobiliario Debería Usar en 2025',
    subtitle: 'De la valoración a la captación: la IA que ya está cambiando el sector',
    excerpt:
      'En Essencia llevamos más de 13 años vendiendo en Gandía y La Safor. Hemos captado más de 2.000 propiedades y cerrado el 95% de las ventas al precio pedido en una media de 45 días. Estas son las herramientas de inteligencia artificial que han transformado nuestra forma de trabajar.',
    author: {
      name: 'Santi Torres',
      role: 'CEO · Essencia Inmobiliaria',
    },
    stats: [
      { value: '+2.000', label: 'Propiedades Captadas' },
      { value: '13M€', label: 'en Ventas 2024' },
      { value: '45 días', label: 'Media de Venta' },
      { value: '95%', label: 'Ratio de Éxito' },
    ],
    content: [
      {
        type: 'lead',
        text: 'En Essencia llevamos más de 13 años vendiendo en Gandía y La Safor. Hemos captado más de 2.000 propiedades y cerrado el 95% de las ventas al precio pedido en una media de 45 días. Y en los últimos dos años, la inteligencia artificial ha sido parte activa de ese proceso.',
      },
      {
        type: 'paragraph',
        text: 'No lo digo para impresionar. Lo digo porque muchos compañeros del sector aún ven la IA como algo lejano, técnico, para "los de Silicon Valley". Pero la realidad es que ya hay herramientas accesibles, prácticas y rentables que cualquier asesor inmobiliario puede usar hoy mismo.',
      },
      {
        type: 'paragraph',
        text: 'Aquí te cuento las que usamos nosotros, para qué sirven y por qué deberías al menos probarlas.',
      },
      {
        type: 'h2',
        text: '🧠 Herramientas de IA por categoría',
      },
      {
        type: 'grid',
        columns: 2,
        items: [
          {
            icon: '📸',
            title: 'Fotografía con IA — Styldod / BoxBrownie',
            desc:
              'Transforman fotos normales en imágenes de alto impacto. El buyer hace scroll rápido: si la primera foto no para el dedo, el inmueble no existe. Con estas herramientas, editas una foto en minutos: eliminas cables, mejoras la iluminación, añades cielo azul o muebles digitales. El resultado parece de fotógrafo profesional sin necesidad de serlo.',
          },
          {
            icon: '🏠',
            title: 'Home Staging Virtual — VirtualStager.com / Homestyler',
            desc:
              'Para pisos vacíos, el home staging virtual es un cambio de juego. Subes la foto del salón vacío y en segundos tienes una versión amueblada y decorada. Hay opciones de estilo (moderno, nórdico, mediterráneo) y puedes generar varias versiones para enseñar al comprador el potencial real del espacio. En Essencia lo usamos en prácticamente todos los inmuebles vacíos. El tiempo en mercado se reduce visiblemente.',
          },
          {
            icon: '📊',
            title: 'Análisis de mercado con Big Data — BRAINSRE / Geovista',
            desc:
              'Antes tardábamos horas en construir un estudio de mercado. Ahora estas plataformas nos dan en segundos: precio medio por zona y tipología, evolución de precios en los últimos 3 años, demanda real de compradores activos, comparables ajustados por m² y estado. Esto nos permite hacer valoraciones más precisas, más rápido y con datos que el vendedor puede ver y entender.',
          },
          {
            icon: '✍️',
            title: 'Marketing Inmobiliario de Alto Impacto — ChatGPT / Claude',
            desc:
              'Los LLMs (large language models) como ChatGPT o Claude son los más conocidos. En inmobiliaria los usamos para redactar descripciones del inmueble con gancho, crear copys para anuncios en portales y redes, preparar emails de captación, generar respuestas rápidas a leads, traducir descripciones al inglés, francés o alemán. No reemplazan el juicio del asesor, pero multiplican la velocidad a la que se producen textos de calidad.',
          },
          {
            icon: '🎬',
            title: 'Vídeo IA — Sora (OpenAI) / Luma AI / Runway',
            desc:
              'Sora (de OpenAI) y Luma AI permiten generar o animar vídeos a partir de imágenes estáticas. Esto está evolucionando muy rápido. Hoy ya podemos crear clips de un inmueble sin necesidad de grabar con dron o cámara. Runway, por ejemplo, permite añadir movimiento a imágenes fijas y crear transiciones cinematográficas. Aún no sustituyen a la producción profesional, pero para redes sociales y contenido rápido, son brutales.',
          },
          {
            icon: '🏗️',
            title: 'Reformas y renders — Planner5D / RoomGPT / AI Render',
            desc:
              'Muchos compradores quieren saber cómo quedaría el piso reformado. Antes eso implicaba contratar a un arquitecto o interiorista. Ahora, con estas herramientas, el propio asesor puede generar renders básicos de cómo podría verse la cocina con la reforma, el baño renovado o el salón redistribuido. Esto acelera la decisión de compra y da confianza al comprador indeciso.',
          },
        ],
      },
      {
        type: 'h2',
        text: '🏷️ Categorizadas también por función',
      },
      {
        type: 'tags',
        label: 'Fotos y visuales',
        items: ['Styldod', 'BoxBrownie', 'Canva IA', 'Adobe Firefly'],
      },
      {
        type: 'tags',
        label: 'Textos y copys',
        items: ['ChatGPT', 'Claude', 'Gemini', 'Copy.ai'],
      },
      {
        type: 'tags',
        label: 'Home Staging Virtual',
        items: ['VirtualStager.com', 'Homestyler', 'RoomGPT'],
      },
      {
        type: 'tags',
        label: 'Análisis de mercado',
        items: ['BrainSRE', 'GeoVista', 'Residelia', 'Idealista Data'],
      },
      {
        type: 'tags',
        label: 'Vídeo IA',
        items: ['Sora', 'Luma AI', 'Runway', 'Synthesia'],
      },
      {
        type: 'h2',
        text: '🛎️ Servicios que ofrecemos en Essencia',
      },
      {
        type: 'cards',
        items: [
          {
            title: 'Servicio Zinc',
            desc: 'Valoración online en 24h basada en datos de mercado real de la zona.',
          },
          {
            title: 'Servicio Plata',
            desc: 'Plan de captación + fotografía profesional + publicación en portales.',
          },
          {
            title: 'Ser su Staging',
            desc: 'Home staging virtual y físico con renders incluidos para el anuncio.',
          },
          {
            title: 'Observación',
            desc: 'Análisis de mercado y posicionamiento competitivo de tu propiedad.',
          },
          {
            title: 'Visuales PRO',
            desc: 'Pack completo: fotografía editorial, vídeo 4K, dron y tour virtual 360°.',
          },
          {
            title: 'Lanzamiento mágico',
            desc: 'Estrategia de lanzamiento en simultáneo en 120+ portales nacionales e internacionales.',
          },
        ],
      },
      {
        type: 'quote',
        text: '"Que una empresa tenga MAL equipo, es responsabilidad del propietario. El fondo en los últimos 5 años de la empresa es que el cliente siempre sale beneficiado desde que lo conocemos hasta los 12 meses."',
        author: 'SANTI TORRES',
        role: 'CEO · ESSENCIA INMOBILIARIA · +34 647 803 355',
      },
      {
        type: 'h2',
        text: '👥 El equipo detrás de los resultados',
      },
      {
        type: 'paragraph',
        text: 'Detrás de cada venta hay un equipo de profesionales especializados que combina tecnología con trato humano. Nuestros asesores no son comerciales genéricos: son expertos en zonas concretas, conocen el mercado local y hablan el idioma de sus compradores, a veces literalmente.',
      },
      {
        type: 'h2',
        text: '📍 ¿Para qué zonas trabajamos?',
      },
      {
        type: 'paragraph',
        text: 'Estamos especializados en Gandía, Oliva, Dénia, Xeraco, Bellreguard y toda la comarca de La Safor. Si tienes una propiedad en esta zona y quieres saber cuánto vale realmente —con datos de mercado actualizados, no estimaciones— contacta con nosotros.',
      },
      {
        type: 'h2',
        text: '¿Quieres saber cómo aplicamos estas herramientas a tu propiedad?',
      },
      {
        type: 'paragraph',
        text: 'En Essencia hacemos una valoración gratuita y sin compromiso usando todas estas herramientas. Te mostramos en tiempo real los datos de mercado, te explicamos el plan de marketing que aplicaríamos y te damos una estimación de precio y tiempo de venta realista.',
      },
    ],
    tags: [
      'Inteligencia Artificial',
      'Proptech',
      'Herramientas IA',
      'Marketing Inmobiliario',
      'Home Staging Virtual',
      'Big Data',
      'Asesores Inmobiliarios',
      'Gandía',
    ],
    cta: {
      text: 'Solicita tu valoración gratuita',
      href: '/valuation',
      label: 'Valoración Gratuita →',
    },
  },
];
