import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/* ─── Google Reviews ─────────────────────────────────────── */
const googleReviews = [
  {
    name: 'Noelia Medina',
    time: 'Hace 15 semanas',
    initials: 'NM',
    text: 'Muy buena experiencia con la inmobiliaria. Óscar nos ha acompañado durante todo el proceso de compra, siempre disponible para resolver dudas y facilitando cada paso. Su trato cercano y profesional ha hecho que todo fuese mucho más sencillo. Sin duda lo recomendaríamos.',
  },
  {
    name: 'Ramón Batet',
    time: 'Hace 18 semanas',
    initials: 'RB',
    text: 'Excelente profesional. Juanma nos acompañó durante todo el proceso de venta con total transparencia, cercanía y eficacia. Siempre disponible para resolver dudas, muy claro en la información y con una gestión impecable hasta el cierre de la operación. Totalmente recomendable.',
  },
  {
    name: 'Luis Alfonso Díez',
    time: 'Hace 24 semanas',
    initials: 'LD',
    text: 'Todo ha ido correctamente, no hemos tenido ningún problema. Con Essencia todo han sido facilidades en todos los trámites y el trato ha sido exquisito. Muchas gracias especialmente a José Luis, que es la persona con quien más contacto he tenido.',
  },
  {
    name: 'Alex M.',
    time: 'Hace 32 semanas',
    initials: 'AM',
    text: 'Compré un piso a través de Essencia y estoy muy contento con la atención recibida. El trabajo de Óscar ha sido de 10, siendo en todo momento muy claro, muy atento y resolutivo. Se ha involucrado mucho para poder llevar todo el proceso a buen puerto. Mi experiencia con esta inmobiliaria ha sido muy buena y no puedo más que recomendarla. Tiene un muy buen equipo humano detrás y eso marca la diferencia.',
  },
  {
    name: 'Vasyl Zhabchyk',
    time: 'Hace 36 semanas',
    initials: 'VZ',
    text: 'Queremos agradecer mucho a Oscar Puente por acompañarnos en la compra de nuestra casa. Es un gran profesional que nos ayudó en todo momento. Estamos muy satisfechos con su trabajo y encantados de conocerle. Es una persona responsable y agradable. ¡Muchas gracias por todo!',
  },
];


/* ─── Data casos ─────────────────────────────────────────── */
const casos = [
  {
    id: '01',
    tipo: 'Piso',
    ubicacion: 'Gandía Centro',
    dias: 15,
    precio: '97%',
    precioLabel: 'del precio pedido',
    tags: ['Big Data', 'Home Staging Virtual', 'Método MIA'],
    // 📸 Sube la foto a WordPress Medios → copia URL → pégala aquí:
    image: '', // ej: 'https://essenciainmobiliaria.com/wp-content/uploads/2026/06/caso-gandia.jpg'
    cita: 'Estábamos buscando la mejor opción para vender nuestro piso en Gandía y no hemos podido elegir mejor. Han sido rapidísimos en encontrar comprador y gestionar todos los trámites, haciéndolo todo facilísimo y sin estrés.',
    autor: 'Maria Pascual',
    dark: false,
  },
  {
    id: '02',
    tipo: 'Piso',
    ubicacion: 'Gandía',
    dias: 7,
    precio: '100%',
    precioLabel: 'del precio pedido',
    tags: ['Negociación Experta', 'Gestión Integral', 'Método MIA'],
    image: '', // 📸 URL imagen WordPress
    cita: 'Tuvimos una negociación bastante difícil durante el proceso, pero Juanma la solventó con una profesionalidad, paciencia y eficacia asombrosas, logrando cerrar la venta con éxito. Se encargaron de todo el papeleo.',
    autor: 'Laura Ruiz',
    dark: true,
  },
  {
    id: '03',
    tipo: 'Ático',
    ubicacion: 'Gandía',
    dias: 15,
    precio: '100%',
    precioLabel: 'del precio pedido',
    tags: ['Asesoramiento de Mercado', 'Gestión Legal', 'Método MIA'],
    image: '', // 📸 URL imagen WordPress
    cita: 'La rapidez en gestionar mi venta ha sido sorprendente, puntualidad en cada cita, información legal detallada junto con asesoramiento de la situación del mercado. ¡Sin duda os recomendaré!',
    autor: 'Yorya Fuentes',
    dark: false,
  },
  {
    id: '04',
    tipo: 'Piso',
    ubicacion: 'Gandía',
    dias: 90,
    precio: '96%',
    precioLabel: 'del precio pedido',
    tags: ['Equipo Profesional', 'MLS Gandía', 'Método MIA'],
    image: '', // 📸 URL imagen WordPress
    cita: 'Santi y Oscar son unos profesionales en toda regla, tanto ellos como todo su equipo. Un placer haber trabajado juntos.',
    autor: 'Genadi Yankov',
    dark: false,
  },
];

/* ─── Helpers ────────────────────────────────────────────── */
const GoogleIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="flex-shrink-0">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const Stars: React.FC<{ size?: number }> = ({ size = 13 }) => (
  <div className="flex gap-0.5" aria-label="5 estrellas">
    {[1,2,3,4,5].map(s => (
      <svg key={s} width={size} height={size} viewBox="0 0 24 24" fill="#FBBC05" aria-hidden="true">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      </svg>
    ))}
  </div>
);

const ImagePlaceholder: React.FC = () => (
  <div
    className="w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0"
    style={{ aspectRatio: '16/9' }}
    aria-hidden="true"
  >
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  </div>
);

/* ─── Animation variants ───────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─── Review Card ────────────────────────────────────────── */
type ReviewType = typeof googleReviews[0];
const ReviewCard: React.FC<{ review: ReviewType; cardWidth: number }> = ({ review, cardWidth }) => {
  return (
    <div
      className="flex-shrink-0 bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col
        shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 select-none p-5"
      style={{ width: cardWidth > 0 ? `${cardWidth}px` : '320px' }}
    >
      <div className="flex flex-col gap-3.5 flex-1">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-brand-blue-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[11px] font-black">{review.initials}</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-black text-editorial-black truncate">{review.name}</p>
            <p className="text-[10px] text-gray-400 font-medium">{review.time}</p>
          </div>
          <GoogleIcon size={15} />
        </div>

        <Stars />

        <p className="text-sm text-gray-600 leading-relaxed line-clamp-5 flex-1">
          "{review.text}"
        </p>
      </div>
    </div>
  );
};


/* ─── Reviews Carousel ───────────────────────────────────── */
const ReviewsCarousel: React.FC = () => {
  const total = googleReviews.length;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardW, setCardW] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragDelta = useRef(0);
  const isDragging = useRef(false);
  const AUTO_MS = 5000;

  const getVisible = useCallback((): number => {
    const w = outerRef.current?.offsetWidth ?? window.innerWidth;
    if (w <= 560) return 1;
    if (w <= 900) return 2;
    return 3;
  }, []);

  const getPages = useCallback(() => Math.ceil(total / getVisible()), [getVisible, total]);

  const computeCardW = useCallback((): number => {
    const w = outerRef.current?.offsetWidth ?? 0;
    const vis = getVisible();
    const gap = 16;
    return (w - gap * (vis - 1)) / vis;
  }, [getVisible]);

  const getOffset = useCallback((idx: number): number => {
    const cw = computeCardW();
    const gap = 16;
    return idx * (cw + gap);
  }, [computeCardW]);

  const applyTransform = useCallback((idx: number, instant = false) => {
    if (!trackRef.current) return;
    if (instant) trackRef.current.style.transition = 'none';
    else trackRef.current.style.transition = 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)';
    trackRef.current.style.transform = `translateX(-${getOffset(idx)}px)`;
  }, [getOffset]);

  const goTo = useCallback((idx: number) => {
    const vis = getVisible();
    const maxIdx = Math.min(idx, (getPages() - 1) * vis);
    const safeIdx = Math.max(0, maxIdx);
    setCurrentIdx(safeIdx);
    applyTransform(safeIdx);
  }, [getVisible, getPages, applyTransform]);

  /* Recalculate on resize */
  useEffect(() => {
    const update = () => {
      setCardW(computeCardW());
      applyTransform(0, true);
      setCurrentIdx(0);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [computeCardW, applyTransform]);

  /* Auto-play */
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIdx(prev => {
        const vis = getVisible();
        const next = prev + vis;
        const safe = next >= total ? 0 : next;
        applyTransform(safe);
        return safe;
      });
    }, AUTO_MS);
    return () => clearInterval(timer);
  }, [isPaused, getVisible, total, applyTransform]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragDelta.current = 0;
    if (trackRef.current) trackRef.current.style.transition = 'none';
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    dragDelta.current = e.clientX - dragStartX.current;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${getOffset(currentIdx) - dragDelta.current}px)`;
    }
  };
  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const vis = getVisible();
    if (dragDelta.current < -60) {
      const next = currentIdx + vis;
      goTo(next >= total ? 0 : next);
    } else if (dragDelta.current > 60) {
      goTo(Math.max(0, currentIdx - vis));
    } else {
      goTo(currentIdx);
    }
    dragDelta.current = 0;
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
    dragDelta.current = 0;
    if (trackRef.current) trackRef.current.style.transition = 'none';
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    dragDelta.current = e.touches[0].clientX - dragStartX.current;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${getOffset(currentIdx) - dragDelta.current}px)`;
    }
  };
  const handleTouchEnd = () => {
    if (trackRef.current) trackRef.current.style.transition = '';
    const vis = getVisible();
    if (dragDelta.current < -60) {
      const next = currentIdx + vis;
      goTo(next >= total ? 0 : next);
    } else if (dragDelta.current > 60) {
      goTo(Math.max(0, currentIdx - vis));
    } else {
      goTo(currentIdx);
    }
    dragDelta.current = 0;
  };

  const vis = getVisible();
  const pages = getPages();
  const currentPage = Math.floor(currentIdx / vis);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div ref={outerRef} className="overflow-hidden rounded-2xl">
        <div
          ref={trackRef}
          className="flex gap-4 cursor-grab active:cursor-grabbing"
          style={{ willChange: 'transform' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="list"
          aria-label="Reseñas de clientes"
        >
          {googleReviews.map(review => (
            <ReviewCard key={review.name} review={review} cardWidth={cardW} />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          onClick={() => { goTo(Math.max(0, currentIdx - vis)); setIsPaused(false); }}
          disabled={currentIdx === 0}
          aria-label="Reseña anterior"
          className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center
            text-editorial-black transition-all duration-200
            hover:bg-editorial-black hover:border-editorial-black hover:text-white hover:scale-105
            disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div className="flex gap-1.5 items-center" role="tablist" aria-label="Páginas del carrusel">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === currentPage}
              aria-label={`Página ${i + 1}`}
              onClick={() => { goTo(i * vis); setIsPaused(false); }}
              className={`rounded-full border-none cursor-pointer transition-all duration-250 outline-none
                ${i === currentPage
                  ? 'bg-editorial-black h-1.5 w-5 rounded-sm'
                  : 'bg-gray-200 w-1.5 h-1.5 hover:bg-gray-400'}`}
            />
          ))}
        </div>

        <button
          onClick={() => { const next = currentIdx + vis; goTo(next >= total ? 0 : next); setIsPaused(false); }}
          disabled={currentIdx >= total - vis}
          aria-label="Reseña siguiente"
          className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center
            text-editorial-black transition-all duration-200
            hover:bg-editorial-black hover:border-editorial-black hover:text-white hover:scale-105
            disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </div>
  );
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
              <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
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
              className={`flex flex-col relative overflow-hidden
                ${caso.dark ? 'bg-editorial-black text-white' : 'bg-white text-editorial-black'}`}
            >
              {/* ── Imagen de la propiedad ── */}
              {caso.image ? (
                <img
                  src={caso.image}
                  alt={`Propiedad vendida en ${caso.ubicacion}`}
                  className="w-full object-cover flex-shrink-0"
                  style={{ aspectRatio: '16/9' }}
                  loading="lazy"
                />
              ) : (
                <div
                  className={`w-full flex items-center justify-center flex-shrink-0
                    ${caso.dark ? 'bg-white/5' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}
                  style={{ aspectRatio: '16/9' }}
                  aria-hidden="true"
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                    stroke={caso.dark ? 'rgba(255,255,255,0.15)' : '#9ca3af'} strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
              )}

              {/* ── Contenido ── */}
              <div className="flex flex-col gap-5 p-8 lg:p-10 flex-1">

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
                    ${caso.dark ? 'bg-white/10 text-white' : 'bg-gray-50 text-gray-600 border border-gray-200'}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-500 flex-shrink-0" aria-hidden="true"/>
                  {caso.ubicacion}
                </span>
              </div>

              <div className="flex gap-5 flex-wrap">
                <div className="flex flex-col gap-0.5">
                  <span className="text-4xl font-black leading-none text-brand-blue-500 tracking-tight tabular-nums">{caso.dias}</span>
                  <span className={`text-[9px] font-bold uppercase tracking-[0.14em] ${caso.dark ? 'text-white/40' : 'text-gray-400'}`}>Días hasta firma</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className={`text-4xl font-black leading-none tracking-tight ${caso.dark ? 'text-white' : 'text-editorial-black'}`}>{caso.precio}</span>
                  <span className={`text-[9px] font-bold uppercase tracking-[0.14em] ${caso.dark ? 'text-white/40' : 'text-gray-400'}`}>{caso.precioLabel}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className={`text-4xl font-black leading-none tracking-tight ${caso.dark ? 'text-white' : 'text-editorial-black'}`}>{caso.tipo}</span>
                  <span className={`text-[9px] font-bold uppercase tracking-[0.14em] ${caso.dark ? 'text-white/40' : 'text-gray-400'}`}>Tipo de propiedad</span>
                </div>
              </div>

              <div className={`h-px w-full ${caso.dark ? 'bg-white/10' : 'bg-gray-100'}`} role="separator"/>

              <div className="flex flex-wrap gap-1.5" aria-label="Herramientas utilizadas">
                {caso.tags.map(tag => (
                  <span
                    key={tag}
                    className={`text-[9px] font-bold uppercase tracking-wider rounded-full px-2.5 py-1 border
                      ${caso.dark ? 'border-white/15 text-white/60' : 'border-gray-200 text-gray-400'}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <blockquote
                className="border-l-2 border-brand-blue-500 pl-4 flex flex-col gap-1.5"
                itemScope
                itemType="https://schema.org/Review"
              >
                <p
                  className={`text-sm leading-relaxed italic font-medium ${caso.dark ? 'text-white/65' : 'text-gray-500'}`}
                  itemProp="reviewBody"
                >
                  "{caso.cita}"
                </p>
                <cite
                  className={`text-[10px] font-black uppercase tracking-widest not-italic ${caso.dark ? 'text-white/40' : 'text-gray-400'}`}
                  itemProp="author"
                >
                  — {caso.autor}
                </cite>
              </blockquote>
              </div>{/* /contenido */}
            </motion.article>

          ))}
        </div>

        {/* ── Google Reviews carousel ─────────────────────── */}
        <motion.div
          className="mt-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <GoogleIcon size={20} />
              <div>
                <div className="flex items-center gap-1">
                  <Stars size={14} />
                  <span className="text-[11px] font-black text-editorial-black ml-1">5.0</span>
                </div>
                <p className="text-[10px] text-gray-400 font-medium">Reseñas en Google</p>
              </div>
            </div>
            <a
              href="https://www.google.com/search?q=reseñas+essencia+inmobiliaria"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-black uppercase tracking-widest text-brand-blue-600 hover:underline flex items-center gap-1"
            >
              Ver en Google
              <span className="material-symbols-outlined text-sm" aria-hidden="true">open_in_new</span>
            </a>
          </div>

          <ReviewsCarousel />
        </motion.div>

        {/* CTA */}
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
          <a
            href="https://wa.me/34647803355?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20una%20valoraci%C3%B3n%20gratuita%20de%20mi%20propiedad."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full flex-shrink-0
              bg-editorial-black text-white font-black text-[10px] uppercase tracking-[0.18em]
              hover:bg-brand-blue-600 transition-all duration-300
              hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(31,192,217,0.3)]"
          >
            Valoración gratuita
            <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default CasosExitoSection;
