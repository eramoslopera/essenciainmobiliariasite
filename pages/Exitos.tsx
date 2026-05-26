import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SEOHead from '../components/SEOHead';

/* ─── Data ─────────────────────────────────────────────── */
const casos = [
  {
    id: '01',
    tipo: 'Piso',
    ubicacion: 'Gandía Playa',
    dias: 38,
    precio: '97%',
    precioLabel: 'del precio pedido',
    tags: ['Big Data', 'Home Staging Virtual', 'Portales Internacionales', 'Método MIA'],
    cita:
      'Teníamos el piso parado 6 meses con otra inmobiliaria. Essencia lo valoró con Big Data, aplicaron home staging virtual y en 38 días firmamos. Conseguimos el 97% del precio de salida.',
    autor: 'María G.',
    fecha: '2024-11-15',
    highlight: false,
  },
  {
    id: '02',
    tipo: 'Chalet',
    ubicacion: 'Oliva',
    dias: 42,
    precio: '100%',
    precioLabel: 'del precio pedido',
    tags: ['Fotografía con Dron', 'Tour Virtual 360°', 'Marketing Francia', 'Método MIA'],
    cita:
      'Pensábamos que tardaría más de un año. Essencia orientó la campaña a compradores franceses con tour 360° y dron. En 42 días cerramos con una familia de Lyon al precio pedido.',
    autor: 'Joaquín M.',
    fecha: '2024-09-08',
    highlight: true,
  },
  {
    id: '03',
    tipo: 'Apartamento',
    ubicacion: 'Dénia',
    dias: 29,
    precio: 'Sin dto.',
    precioLabel: 'sobre el precio',
    tags: ['Valoración con IA', 'Home Staging Físico', 'Lanzamiento Simultáneo', 'Método MIA'],
    cita:
      'Necesitábamos vender rápido. La valoración con IA fue muy precisa, hicieron home staging y lanzaron en todos los portales a la vez. Firmamos en 29 días y sin descuento.',
    autor: 'Laura P.',
    fecha: '2025-01-22',
    highlight: false,
  },
  {
    id: '04',
    tipo: 'Villa',
    ubicacion: 'Xeraco',
    dias: 51,
    precio: '96%',
    precioLabel: 'del precio pedido',
    tags: ['Big Data 4.0', 'Segmentación de Buyer', 'MLS Gandía', 'Método MIA'],
    cita:
      '8 meses intentando vender por nuestra cuenta. Essencia usó Big Data para identificar que el comprador ideal era familia valenciana. En 51 días cerramos con una familia de Valencia capital.',
    autor: 'Roberto T.',
    fecha: '2024-07-30',
    highlight: false,
  },
];

/* ─── Schema JSON-LD ───────────────────────────────────── */
const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Casos de Éxito — Essencia Inmobiliaria Gandía',
  description:
    'Historias reales de clientes que vendieron su propiedad en Gandía y La Safor con el Método MIA de Essencia Inmobiliaria usando IA, Big Data y Marketing de Alto Impacto.',
  url: 'https://essenciainmobiliaria.com/exitos/',
  numberOfItems: casos.length,
  itemListElement: casos.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Review',
      name: `${c.tipo} en ${c.ubicacion} vendido en ${c.dias} días`,
      reviewBody: c.cita,
      datePublished: c.fecha,
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      author: { '@type': 'Person', name: c.autor },
      itemReviewed: {
        '@type': 'Service',
        name: `Venta de ${c.tipo.toLowerCase()} en ${c.ubicacion} con Método MIA`,
        provider: {
          '@type': 'RealEstateAgent',
          '@id': 'https://essenciainmobiliaria.com/#realestateagent',
        },
      },
    },
  })),
};

/* ─── Animation variants ───────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─── Component ─────────────────────────────────────────── */
const Exitos: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Casos de Éxito — Resultados Reales en Gandía y La Safor"
        description="100+ ventas cerradas en 2024. Propiedades vendidas en Gandía, Oliva, Dénia y Xeraco en una media de 45 días usando IA, Big Data y Home Staging. Ver casos reales."
        canonical="https://essenciainmobiliaria.com/exitos"
      />

      {/* JSON-LD Schema para GEO */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* ── Hero oscuro ─────────────────────────────────── */}
      <section className="relative pt-40 pb-32 bg-editorial-black text-white overflow-hidden">
        {/* Textura sutil */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}
          aria-hidden="true"
        />

        {/* Acento azul decorativo */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-0 w-1/3 h-0.5 bg-brand-blue-500 origin-left"
          aria-hidden="true"
        />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-12">

            {/* Título */}
            <div className="flex-1 max-w-3xl">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-brand-blue-500 font-black tracking-[0.25em] uppercase text-[10px] mb-6 block"
              >
                Resultados Reales · Método MIA
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-6xl md:text-8xl font-black tracking-[-0.03em] leading-[0.95]"
              >
                Casos de{' '}
                <em className="font-serif font-normal italic text-brand-blue-400">Éxito</em>
              </motion.h1>
            </div>

            {/* Bajada */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:w-[36%] flex flex-col gap-4"
            >
              <p className="text-white/90 text-xl font-bold leading-snug">
                No son promesas — son ventas cerradas.
              </p>
              <p className="text-gray-400 text-base font-medium leading-relaxed">
                Propiedades en Gandía, Oliva, Dénia y La Safor vendidas con Inteligencia Artificial,
                Big Data y Marketing de Alto Impacto. Media de venta: <strong className="text-white">45 días</strong>.
              </p>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-8"
          >
            {[
              { val: '100+', label: 'Ventas en 2024' },
              { val: '45 días', label: 'Media de venta' },
              { val: '97%', label: 'Del precio pedido' },
              { val: '4.5 ★', label: '253 reseñas Google' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="text-4xl font-black tracking-tight text-brand-blue-400 leading-none">
                  {s.val}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Grid de casos ───────────────────────────────── */}
      <section className="py-24 bg-white" aria-labelledby="casos-heading">
        <h2 id="casos-heading" className="sr-only">Casos de éxito de ventas inmobiliarias</h2>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100 border border-gray-100 rounded-xl overflow-hidden">
            {casos.map((caso, i) => (
              <motion.article
                key={caso.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
                className={`relative flex flex-col gap-6 p-8 lg:p-10 group
                  ${caso.highlight ? 'bg-editorial-black text-white' : 'bg-white'}`}
              >
                {/* Número + badge ubicación */}
                <div className="flex items-start justify-between">
                  <span
                    className={`text-6xl font-black leading-none tracking-tight select-none
                      ${caso.highlight ? 'text-white/10' : 'text-gray-100'}`}
                    aria-hidden="true"
                  >
                    {caso.id}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest
                      ${caso.highlight ? 'bg-white/10 text-white' : 'bg-gray-50 text-gray-700 border border-gray-200'}`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-brand-blue-500 flex-shrink-0"
                      aria-hidden="true"
                    />
                    {caso.ubicacion}
                  </span>
                </div>

                {/* Métricas */}
                <div className="flex gap-6 flex-wrap">
                  {/* Días */}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-4xl font-black leading-none text-brand-blue-500 tracking-tight">
                      {caso.dias}
                    </span>
                    <span
                      className={`text-[9px] font-bold uppercase tracking-widest
                        ${caso.highlight ? 'text-white/40' : 'text-gray-400'}`}
                    >
                      Días hasta firma
                    </span>
                  </div>
                  {/* Precio */}
                  <div className="flex flex-col gap-0.5">
                    <span
                      className={`text-4xl font-black leading-none tracking-tight
                        ${caso.highlight ? 'text-white' : 'text-editorial-black'}`}
                    >
                      {caso.precio}
                    </span>
                    <span
                      className={`text-[9px] font-bold uppercase tracking-widest
                        ${caso.highlight ? 'text-white/40' : 'text-gray-400'}`}
                    >
                      {caso.precioLabel}
                    </span>
                  </div>
                  {/* Tipo */}
                  <div className="flex flex-col gap-0.5">
                    <span
                      className={`text-4xl font-black leading-none tracking-tight
                        ${caso.highlight ? 'text-white' : 'text-editorial-black'}`}
                    >
                      {caso.tipo}
                    </span>
                    <span
                      className={`text-[9px] font-bold uppercase tracking-widest
                        ${caso.highlight ? 'text-white/40' : 'text-gray-400'}`}
                    >
                      Tipo de propiedad
                    </span>
                  </div>
                </div>

                {/* Divisor */}
                <div
                  className={`h-px w-full ${caso.highlight ? 'bg-white/10' : 'bg-gray-100'}`}
                  role="separator"
                />

                {/* Tags de método */}
                <div className="flex flex-wrap gap-1.5" aria-label="Herramientas utilizadas">
                  {caso.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[10px] font-bold uppercase tracking-wider rounded-full px-2.5 py-1 border
                        ${caso.highlight
                          ? 'border-white/20 text-white/70'
                          : 'border-gray-200 text-gray-500'}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Cita cliente */}
                <blockquote
                  className={`border-l-2 border-brand-blue-500 pl-4 flex flex-col gap-2`}
                  itemScope
                  itemType="https://schema.org/Review"
                >
                  <p
                    className={`text-sm leading-relaxed italic font-medium
                      ${caso.highlight ? 'text-white/70' : 'text-gray-500'}`}
                    itemProp="reviewBody"
                  >
                    "{caso.cita}"
                  </p>
                  <cite
                    className={`text-[10px] font-black uppercase tracking-widest not-italic
                      ${caso.highlight ? 'text-white/50' : 'text-gray-400'}`}
                    itemProp="author"
                  >
                    — {caso.autor}
                  </cite>
                </blockquote>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-editorial-black rounded-2xl px-10 py-14 lg:px-20 lg:py-20
              flex flex-col lg:flex-row items-center justify-between gap-10"
          >
            <div className="max-w-2xl text-center lg:text-left">
              <span className="text-brand-blue-500 font-black tracking-[0.2em] uppercase text-[10px] mb-4 block">
                Próximo éxito
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.05] mb-4">
                ¿Quieres ser el próximo<br />
                <em className="font-serif font-normal italic text-brand-blue-400">caso de éxito</em>?
              </h2>
              <p className="text-gray-400 text-lg font-medium leading-relaxed">
                Valoración gratuita de tu propiedad en Gandía, Oliva, Dénia o La Safor.
                Sin compromiso, con datos reales de mercado.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link
                to="/valuation"
                className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full
                  bg-brand-blue-500 text-white font-black text-[11px] uppercase tracking-[0.15em]
                  hover:bg-brand-blue-600 transition-all duration-300
                  hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(31,192,217,0.35)]"
              >
                Valoración gratuita
                <span className="material-symbols-outlined text-lg" aria-hidden="true">
                  arrow_forward
                </span>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full
                  border border-white/20 text-white font-black text-[11px] uppercase tracking-[0.15em]
                  hover:border-white/60 transition-all duration-300"
              >
                Hablar con un asesor
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Exitos;
