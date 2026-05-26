import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/* ─── Data ─────────────────────────────────────────────── */
const casos = [
  {
    id: '01',
    tipo: 'Piso',
    ubicacion: 'Gandía Playa',
    dias: 38,
    precio: '97%',
    precioLabel: 'del precio pedido',
    tags: ['Big Data', 'Home Staging Virtual', 'Método MIA'],
    cita: 'Teníamos el piso parado 6 meses con otra inmobiliaria. Essencia lo valoró con Big Data, aplicaron home staging virtual y en 38 días firmamos al 97% del precio pedido.',
    autor: 'María G.',
    dark: false,
  },
  {
    id: '02',
    tipo: 'Chalet',
    ubicacion: 'Oliva',
    dias: 42,
    precio: '100%',
    precioLabel: 'del precio pedido',
    tags: ['Tour Virtual 360°', 'Marketing Francia', 'Método MIA'],
    cita: 'Pensábamos que tardaría más de un año. En 42 días cerramos con una familia de Lyon al precio pedido gracias al marketing internacional.',
    autor: 'Joaquín M.',
    dark: true,
  },
  {
    id: '03',
    tipo: 'Apartamento',
    ubicacion: 'Dénia',
    dias: 29,
    precio: 'Sin dto.',
    precioLabel: 'sobre el precio',
    tags: ['Valoración con IA', 'Home Staging Físico', 'Método MIA'],
    cita: 'Necesitábamos vender rápido por un cambio de ciudad. Firmamos en 29 días sin descuento gracias a la valoración con IA y el lanzamiento simultáneo en portales.',
    autor: 'Laura P.',
    dark: false,
  },
  {
    id: '04',
    tipo: 'Villa',
    ubicacion: 'Xeraco',
    dias: 51,
    precio: '96%',
    precioLabel: 'del precio pedido',
    tags: ['Big Data 4.0', 'MLS Gandía', 'Método MIA'],
    cita: '8 meses intentando vender por nuestra cuenta. Essencia identificó al comprador ideal con Big Data y en 51 días cerramos con una familia de Valencia capital.',
    autor: 'Roberto T.',
    dark: false,
  },
];

/* ─── Animation variants ───────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─── Component ─────────────────────────────────────────── */
const CasosExitoSection: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden" aria-labelledby="casos-section-heading">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-brand-blue-600 font-black tracking-[0.25em] uppercase text-[10px] mb-3 block"
            >
              Resultados Reales
            </motion.span>
            <motion.h2
              id="casos-section-heading"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl font-black text-editorial-black tracking-tight leading-[0.95]"
            >
              Casos de{' '}
              <em className="font-serif font-normal italic">Éxito</em>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col gap-2 md:text-right max-w-sm"
          >
            <p className="text-gray-500 font-medium text-base leading-relaxed">
              No son promesas — son ventas cerradas en Gandía, Oliva, Dénia y La Safor
              usando IA, Big Data y Marketing de Alto Impacto.
            </p>
            <Link
              to="/exitos"
              className="inline-flex items-center gap-1.5 text-brand-blue-600 font-black text-[11px] uppercase tracking-widest
                hover:gap-3 transition-all duration-200 md:justify-end"
              aria-label="Ver todos los casos de éxito"
            >
              Ver todos los casos
              <span className="material-symbols-outlined text-base" aria-hidden="true">
                arrow_forward
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Grid 2×2 */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden"
          role="list"
        >
          {casos.map((caso, i) => (
            <motion.article
              key={caso.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              role="listitem"
              className={`flex flex-col gap-5 p-8 lg:p-10 relative
                ${caso.dark ? 'bg-editorial-black text-white' : 'bg-white text-editorial-black'}`}
            >
              {/* Número + badge */}
              <div className="flex items-start justify-between">
                <span
                  className={`text-5xl font-black leading-none tracking-tighter select-none
                    ${caso.dark ? 'text-white/8' : 'text-gray-100'}`}
                  aria-hidden="true"
                >
                  {caso.id}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1
                    text-[10px] font-black uppercase tracking-widest
                    ${caso.dark
                      ? 'bg-white/10 text-white'
                      : 'bg-gray-50 text-gray-600 border border-gray-200'}`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-brand-blue-500 flex-shrink-0"
                    aria-hidden="true"
                  />
                  {caso.ubicacion}
                </span>
              </div>

              {/* Métricas */}
              <div className="flex gap-5 flex-wrap">
                {/* Días */}
                <div className="flex flex-col gap-0.5">
                  <span className="text-4xl font-black leading-none text-brand-blue-500 tracking-tight tabular-nums">
                    {caso.dias}
                  </span>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-[0.14em]
                      ${caso.dark ? 'text-white/40' : 'text-gray-400'}`}
                  >
                    Días hasta firma
                  </span>
                </div>

                {/* Precio */}
                <div className="flex flex-col gap-0.5">
                  <span
                    className={`text-4xl font-black leading-none tracking-tight
                      ${caso.dark ? 'text-white' : 'text-editorial-black'}`}
                  >
                    {caso.precio}
                  </span>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-[0.14em]
                      ${caso.dark ? 'text-white/40' : 'text-gray-400'}`}
                  >
                    {caso.precioLabel}
                  </span>
                </div>

                {/* Tipo */}
                <div className="flex flex-col gap-0.5">
                  <span
                    className={`text-4xl font-black leading-none tracking-tight
                      ${caso.dark ? 'text-white' : 'text-editorial-black'}`}
                  >
                    {caso.tipo}
                  </span>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-[0.14em]
                      ${caso.dark ? 'text-white/40' : 'text-gray-400'}`}
                  >
                    Tipo de propiedad
                  </span>
                </div>
              </div>

              {/* Divisor */}
              <div
                className={`h-px w-full ${caso.dark ? 'bg-white/10' : 'bg-gray-100'}`}
                role="separator"
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5" aria-label="Herramientas utilizadas">
                {caso.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-[9px] font-bold uppercase tracking-wider rounded-full px-2.5 py-1 border
                      ${caso.dark
                        ? 'border-white/15 text-white/60'
                        : 'border-gray-200 text-gray-400'}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Cita */}
              <blockquote
                className="border-l-2 border-brand-blue-500 pl-4 flex flex-col gap-1.5"
                itemScope
                itemType="https://schema.org/Review"
              >
                <p
                  className={`text-sm leading-relaxed italic font-medium
                    ${caso.dark ? 'text-white/65' : 'text-gray-500'}`}
                  itemProp="reviewBody"
                >
                  "{caso.cita}"
                </p>
                <cite
                  className={`text-[10px] font-black uppercase tracking-widest not-italic
                    ${caso.dark ? 'text-white/40' : 'text-gray-400'}`}
                  itemProp="author"
                >
                  — {caso.autor}
                </cite>
              </blockquote>
            </motion.article>
          ))}
        </div>

        {/* CTA bajo el grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6
            bg-gray-50 rounded-xl px-8 py-6 border border-gray-100"
        >
          <div>
            <p className="font-black text-editorial-black text-lg leading-snug">
              ¿Quieres ser el próximo caso de éxito?
            </p>
            <p className="text-gray-500 text-sm font-medium mt-1">
              Valoración gratuita con datos reales de mercado en Gandía, Oliva, Dénia y La Safor.
            </p>
          </div>
          <Link
            to="/valuation"
            className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full flex-shrink-0
              bg-editorial-black text-white font-black text-[10px] uppercase tracking-[0.18em]
              hover:bg-brand-blue-600 transition-all duration-300
              hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(31,192,217,0.3)]"
          >
            Valoración gratuita
            <span className="material-symbols-outlined text-base" aria-hidden="true">
              arrow_forward
            </span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default CasosExitoSection;
