import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Property } from '../src/types/property';
import { fetchProperties } from '../src/utils/xmlParser';

// ─── TIPOLOGÍAS ───────────────────────────────────────────────
const TIPOS = [
  {
    label: 'Pisos',
    type: 'Apartment' as const,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <line x1="9" y1="3" x2="9" y2="21"/>
        <line x1="15" y1="3" x2="15" y2="21"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="3" y1="15" x2="21" y2="15"/>
      </svg>
    ),
  },
  {
    label: 'Casas',
    type: 'House' as const,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V21H3V9.5z"/>
        <rect x="9" y="14" width="6" height="7"/>
      </svg>
    ),
  },
  {
    label: 'Chalets',
    type: 'Villa' as const,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12L12 2l10 10"/>
        <path d="M4 10v10h16V10"/>
        <path d="M10 22v-6h4v6"/>
        <path d="M15 10h2v4h-2z"/>
      </svg>
    ),
  },
  {
    label: 'Adosados',
    type: 'Townhouse' as const,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 11l5-5 4 4 4-4 5 5"/>
        <rect x="1" y="11" width="8" height="10"/>
        <rect x="9" y="11" width="6" height="10"/>
        <rect x="15" y="11" width="8" height="10"/>
      </svg>
    ),
  },
  {
    label: 'Locales',
    type: 'Commercial' as const,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="1"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="17"/>
        <line x1="9.5" y1="14.5" x2="14.5" y2="14.5"/>
      </svg>
    ),
  },
  {
    label: 'Fincas',
    type: 'Estate' as const,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21V9l9-6 9 6v12"/>
        <path d="M9 21v-6h6v6"/>
        <path d="M3 9h18"/>
        <line x1="7" y1="13" x2="7" y2="13.5"/>
        <line x1="17" y1="13" x2="17" y2="13.5"/>
      </svg>
    ),
  },
  {
    label: 'Proyectos',
    type: 'Project' as const,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    label: 'Ver todo',
    type: null,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
];

// ─── PROPERTY CARD ────────────────────────────────────────────
const PropertyCard: React.FC<{
  property: Property;
  badge?: string;
  badgeStyle?: 'dark' | 'amber';
  index?: number;
}> = ({ property, badge, badgeStyle = 'dark', index = 0 }) => {
  const img = property.image || (property.images?.[0] ?? '');
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
    >
      <Link
        to={`/property/${property.id}`}
        className="group block bg-white rounded-xl overflow-hidden shadow-[0_4px_24px_-6px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.14)] transition-shadow duration-300 h-full"
      >
        {/* Imagen */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
          {img ? (
            <div
              className="w-full h-full bg-cover bg-center group-hover:scale-[1.04] transition-transform duration-700"
              style={{ backgroundImage: `url("${img}")` }}
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
          )}
          {badge && (
            <div className="absolute top-3 left-3">
              <span
                className={`text-[9px] font-black tracking-[0.16em] uppercase px-3 py-1.5 rounded-full ${
                  badgeStyle === 'amber'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-editorial-black text-white'
                }`}
              >
                {badge}
              </span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-5">
          <p className="text-[11px] font-semibold text-gray-400 mb-1 tracking-wide truncate">
            {property.location}
          </p>
          <h3 className="text-[15px] font-bold text-editorial-black leading-snug mb-3 line-clamp-2 group-hover:text-brand-blue-600 transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-[17px] font-black text-editorial-black tracking-tight">
              {property.price}
            </span>
            <div className="flex items-center gap-3 text-[11px] font-semibold text-gray-500">
              {property.beds != null && property.beds > 0 && (
                <span className="flex items-center gap-1">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 7v13M22 7v13M2 14h20M6 14V7a4 4 0 018 0v7"/></svg>
                  {property.beds}
                </span>
              )}
              {property.baths != null && property.baths > 0 && (
                <span className="flex items-center gap-1">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1z"/><path d="M6 12V5a2 2 0 014 0v1"/></svg>
                  {property.baths}
                </span>
              )}
              {property.size && (
                <span className="flex items-center gap-1">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="1"/></svg>
                  {property.size}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────
const PropiedadesSection: React.FC = () => {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [selectedTipo, setSelectedTipo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [visitedProperties, setVisitedProperties] = useState<Property[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProperties()
      .then((data) => setAllProperties(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (allProperties.length === 0) return;
    try {
      const KEY = 'ei_recently_viewed';
      const storedIds: number[] = JSON.parse(localStorage.getItem(KEY) || '[]');
      const visited = storedIds
        .map((id) => allProperties.find((p) => p.id === id))
        .filter((p): p is Property => p !== undefined && p.status === 'available');
      setVisitedProperties(visited.slice(0, 8));
    } catch {
      // ignore
    }
  }, [allProperties]);

  // Contar propiedades por tipo
  const countByType = (type: string) =>
    allProperties.filter((p) => p.type === type && p.status === 'available').length;

  // Propiedades disponibles filtradas por tipo
  const availableFiltered = allProperties.filter(
    (p) =>
      p.status === 'available' &&
      (selectedTipo === null || p.type === selectedTipo)
  );

  // Rebajadas: tomamos las 6 primeras disponibles como demo
  // (en producción Houzez las marca con un campo specific)
  const rebajadas = allProperties
    .filter((p) => p.status === 'available')
    .slice(0, 6);

  // Últimas propiedades añadidas (como fallback)
  const recentProperties = [...allProperties]
    .filter((p) => p.status === 'available')
    .sort((a, b) => {
      if (!a.dateListed || !b.dateListed) return 0;
      return new Date(b.dateListed).getTime() - new Date(a.dateListed).getTime();
    })
    .slice(0, 8);

  const displayProperties = visitedProperties.length > 0 ? visitedProperties : recentProperties;
  const isShowingVisited = visitedProperties.length > 0;

  const scrollCarousel = (dir: 'left' | 'right') => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          1. BÚSQUEDA POR TIPOLOGÍAS
      ════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white" aria-labelledby="tipologias-title">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
          >
            <div>
              <span className="block text-[10px] font-black tracking-[0.25em] uppercase text-brand-blue-600 mb-3">
                Explora el catálogo
              </span>
              <h2
                id="tipologias-title"
                className="font-display text-4xl md:text-5xl font-black text-editorial-black leading-[0.95] tracking-[-0.03em] m-0"
              >
                Busca por<br />
                <em className="font-serif font-normal italic">tipología</em>
              </h2>
            </div>
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.1em] uppercase text-brand-blue-600 hover:text-brand-blue-700 hover:gap-3 transition-all duration-200"
            >
              Ver todas las propiedades
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </Link>
          </motion.div>

          {/* Grid de tipologías */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 border border-gray-200 rounded-2xl overflow-hidden divide-x divide-y divide-gray-200">
            {TIPOS.map((tipo, i) => {
              const count = tipo.type ? countByType(tipo.type) : allProperties.filter(p => p.status === 'available').length;
              const isActive = selectedTipo === tipo.type;
              return (
                <motion.button
                  key={tipo.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onClick={() => setSelectedTipo(tipo.type === null ? null : (isActive ? null : tipo.type))}
                  className={`group flex flex-col items-start gap-2 p-7 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-blue-600 ${
                    isActive
                      ? 'bg-editorial-black text-white'
                      : 'bg-white hover:bg-gray-50'
                  }`}
                  aria-pressed={isActive}
                >
                  <span className={`transition-colors ${isActive ? 'text-brand-blue-500' : 'text-brand-blue-600 group-hover:text-brand-blue-700'}`}>
                    {tipo.icon}
                  </span>
                  <span className={`text-[13px] font-bold leading-tight ${isActive ? 'text-white' : 'text-editorial-black'}`}>
                    {tipo.label}
                  </span>
                  {count > 0 && (
                    <span className={`text-[11px] font-medium ${isActive ? 'text-white/60' : 'text-gray-400'}`}>
                      {count} {count === 1 ? 'propiedad' : 'propiedades'}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Resultados del filtro */}
          {(selectedTipo !== null) && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10"
            >
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="rounded-xl bg-gray-100 animate-pulse" style={{ height: 300 }} />
                  ))}
                </div>
              ) : availableFiltered.length > 0 ? (
                <>
                  <p className="text-sm text-gray-500 font-medium mb-6">
                    {availableFiltered.length} {availableFiltered.length === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableFiltered.slice(0, 6).map((p, i) => (
                      <PropertyCard key={p.id} property={p} index={i} />
                    ))}
                  </div>
                  {availableFiltered.length > 6 && (
                    <div className="flex justify-center mt-8">
                      <Link
                        to={`/properties?type=${selectedTipo}`}
                        className="h-12 px-8 bg-editorial-black text-white text-[11px] font-black tracking-[0.18em] uppercase rounded-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                      >
                        Ver los {availableFiltered.length} resultados
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 text-gray-400 font-medium">
                  No hay propiedades disponibles de este tipo en este momento.
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          2. INMUEBLES REBAJADOS DESTACADOS
      ════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-100" aria-labelledby="rebajados-title">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
          >
            <div>
              <span className="block text-[10px] font-black tracking-[0.25em] uppercase text-brand-blue-600 mb-3">
                Oportunidades
              </span>
              <h2
                id="rebajados-title"
                className="font-display text-4xl md:text-5xl font-black text-editorial-black leading-[0.95] tracking-[-0.03em] m-0"
              >
                Inmuebles<br />
                <em className="font-serif font-normal italic">rebajados</em>
              </h2>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2">
              <p className="text-sm text-gray-500 font-medium max-w-xs text-left md:text-right">
                Precios reducidos en propiedades seleccionadas. Oportunidades limitadas.
              </p>
              <Link
                to="/properties"
                className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.1em] uppercase text-brand-blue-600 hover:text-brand-blue-700 hover:gap-3 transition-all duration-200"
              >
                Ver todo el catálogo
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </Link>
            </div>
          </motion.div>

          {/* Grid 3 cols */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="rounded-xl bg-gray-200 animate-pulse" style={{ height: 300 }} />
              ))}
            </div>
          ) : rebajadas.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rebajadas.map((p, i) => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  badge="Precio reducido"
                  badgeStyle="amber"
                  index={i}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400 font-medium">
              No hay inmuebles rebajados disponibles en este momento.
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. ÚLTIMAS PROPIEDADES VISITADAS / RECIENTES
      ════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100" aria-labelledby="recientes-title">
        <div className="max-w-[1440px] mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-end justify-between mb-10 px-6 lg:px-24"
          >
            <div>
              <span className="block text-[10px] font-black tracking-[0.25em] uppercase text-brand-blue-600 mb-3">
                {isShowingVisited ? 'Vistas recientemente' : 'Novedades'}
              </span>
              <h2
                id="recientes-title"
                className="font-display text-4xl md:text-5xl font-black text-editorial-black leading-[0.95] tracking-[-0.03em] m-0"
              >
                {isShowingVisited ? (
                  <>
                    Últimas<br />
                    <em className="font-serif font-normal italic text-brand-blue-600">visitadas</em>
                  </>
                ) : (
                  <>
                    Últimas<br />
                    <em className="font-serif font-normal italic text-brand-blue-600">propiedades</em>
                  </>
                )}
              </h2>
            </div>
            {/* Controles del carrusel */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollCarousel('left')}
                aria-label="Propiedad anterior"
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-600"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                aria-label="Siguiente propiedad"
                className="w-10 h-10 rounded-full bg-editorial-black text-white flex items-center justify-center hover:bg-black active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-600"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </motion.div>

          {/* Carrusel horizontal */}
          {loading ? (
            <div className="flex gap-6 px-6 lg:px-24 overflow-hidden">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="shrink-0 w-[320px] rounded-xl bg-gray-100 animate-pulse" style={{ height: 340 }} />
              ))}
            </div>
          ) : (
            <div
              ref={carouselRef}
              className="flex overflow-x-auto gap-6 px-6 lg:px-24 pb-4 hide-scrollbar snap-x snap-mandatory scroll-smooth"
            >
              {displayProperties.map((p, i) => (
                <div key={p.id} className="snap-start shrink-0 w-[85vw] sm:w-[360px]">
                  <PropertyCard property={p} index={i} />
                </div>
              ))}
              {displayProperties.length > 0 && (
                <div className="shrink-0 w-px snap-end" />
              )}
              {displayProperties.length === 0 && (
                <div className="w-full text-center py-12 text-gray-400 font-medium">
                  {isShowingVisited ? 'No has visitado ninguna propiedad todavía.' : 'No hay propiedades disponibles.'}
                </div>
              )}
            </div>
          )}

          {/* Link ver todas */}
          <div className="flex justify-center mt-10 px-6">
            <Link
              to="/properties"
              className="h-12 px-8 border border-gray-200 text-editorial-black text-[11px] font-black tracking-[0.18em] uppercase rounded-full hover:border-editorial-black hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
            >
              Ver todas las propiedades
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default PropiedadesSection;
