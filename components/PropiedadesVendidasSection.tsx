import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Property } from '../src/types/property';
import { fetchProperties } from '../src/utils/xmlParser';
import { fallbackProperties } from '../src/data/fallbackProperties';

// ─── TARJETA DE PROPIEDAD VENDIDA/RESERVADA ──────────────────
const SoldPropertyCard: React.FC<{
  property: Property;
  index: number;
}> = ({ property, index }) => {
  const isFallback = typeof property.id === 'string' && property.id.startsWith('fallback-');
  const img = property.image || (property.images?.[0] ?? '');
  
  // Enlace inteligente: si es real va al detalle, si es de respaldo va a un lead de WhatsApp
  const targetUrl = isFallback
    ? `https://wa.me/34647803355?text=Hola%2C%20estoy%20interesado%20en%20una%20propiedad%20similar%20a%20la%20referencia%20${property.ref}`
    : `/property/${property.id}`;

  const linkProps = isFallback
    ? { href: targetUrl, target: '_blank', rel: 'noopener noreferrer' }
    : { to: targetUrl };

  const Component = isFallback ? 'a' : Link;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
    >
      <Component
        {...(linkProps as any)}
        className="group block bg-white rounded-xl overflow-hidden shadow-[0_4px_24px_-6px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.14)] transition-shadow duration-300 h-full"
      >
        {/* Imagen */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
          {img ? (
            <div
              className="w-full h-full bg-cover bg-center group-hover:scale-[1.04] transition-transform duration-700 filter grayscale-[20%]"
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
          
          {/* Overlay de estado */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />

          {/* Badge de Estado */}
          <div className="absolute top-3 left-3">
            {property.status === 'sold' ? (
              <span className="text-[10px] font-black tracking-[0.16em] uppercase px-3 py-1.5 rounded-full bg-editorial-black text-white border border-transparent">
                VENDIDA
              </span>
            ) : (
              <span className="text-[10px] font-black tracking-[0.16em] uppercase px-3 py-1.5 rounded-full bg-brand-blue-50 text-brand-blue-600 border border-brand-blue-200/50">
                RESERVADA
              </span>
            )}
          </div>

          {/* Badge de Referencia */}
          {property.ref && (
            <div className="absolute bottom-3 right-3">
              <span className="text-[9px] font-bold tracking-wider px-2.5 py-1 rounded bg-white/95 text-gray-700 backdrop-blur-sm shadow-sm">
                Ref: {property.ref}
              </span>
            </div>
          )}
        </div>

        {/* Cuerpo de la tarjeta */}
        <div className="p-5">
          <p className="text-[11px] font-semibold text-gray-400 mb-1 tracking-wide truncate">
            {property.location}
          </p>
          <h3 className="text-[15px] font-bold text-editorial-black leading-snug mb-3 line-clamp-2 group-hover:text-brand-blue-600 transition-colors">
            {property.title}
          </h3>
          
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-baseline">
              {property.status === 'sold' ? (
                <>
                  <span className="text-[15px] font-black text-gray-400 line-through mr-2">
                    {property.price}
                  </span>
                  <span className="text-[11px] font-black text-editorial-black tracking-[0.05em] uppercase bg-gray-100 px-2 py-0.5 rounded">
                    Vendido
                  </span>
                </>
              ) : (
                <span className="text-[17px] font-black text-editorial-black tracking-tight">
                  {property.price}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-500">
              {property.size && (
                <span className="flex items-center gap-1">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="1"/></svg>
                  {property.size}
                </span>
              )}
            </div>
          </div>
        </div>
      </Component>
    </motion.div>
  );
};

// ─── SECCIÓN PRINCIPAL ───────────────────────────────────────
const PropiedadesVendidasSection: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'sold' | 'reserved'>('all');
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchProperties();
        // Filtramos solo vendidas y reservadas
        const filtered = data.filter(p => p.status === 'sold' || p.status === 'reserved');
        
        if (filtered.length > 0) {
          setProperties(filtered);
        } else {
          // Si el feed no tiene propiedades con estos estados, cargamos el fallback
          setProperties(fallbackProperties);
        }
      } catch (err) {
        console.error('Error loading sold/reserved properties:', err);
        setProperties(fallbackProperties);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Filtrar según la pestaña activa
  const displayProperties = properties.filter(p => {
    if (activeTab === 'all') return true;
    return p.status === activeTab;
  });

  const scrollCarousel = (dir: 'left' | 'right') => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-100 overflow-hidden" aria-labelledby="vendidas-title">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 px-6 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block text-[10px] font-black tracking-[0.25em] uppercase text-brand-blue-600 mb-3">
              Garantía de éxito
            </span>
            <h2
              id="vendidas-title"
              className="font-display text-4xl md:text-5xl font-black text-editorial-black leading-[0.95] tracking-[-0.03em] m-0"
            >
              Vendidas y<br />
              <em className="font-serif font-normal italic text-brand-blue-600">reservadas</em>
            </h2>
          </motion.div>

          {/* Filtros de Pestañas */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'Ver todas' },
              { id: 'sold', label: 'Vendidas' },
              { id: 'reserved', label: 'Reservadas' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-editorial-black text-white shadow-sm'
                    : 'bg-white hover:bg-gray-100 text-gray-600 border border-gray-200/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Controles de Carrusel */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => scrollCarousel('left')}
              aria-label="Anterior propiedad"
              className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              aria-label="Siguiente propiedad"
              className="w-10 h-10 rounded-full bg-editorial-black text-white flex items-center justify-center hover:bg-black active:scale-95 transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>

        {/* Carrusel / Contenedor de Propiedades */}
        {loading ? (
          <div className="flex gap-6 px-6 lg:px-24 overflow-hidden">
            {[1, 2, 3].map((n) => (
              <div key={n} className="shrink-0 w-[320px] rounded-xl bg-gray-200 animate-pulse" style={{ height: 320 }} />
            ))}
          </div>
        ) : displayProperties.length > 0 ? (
          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-6 px-6 lg:px-24 pb-6 hide-scrollbar snap-x snap-mandatory scroll-smooth"
          >
            {displayProperties.map((property, idx) => (
              <div key={property.id} className="snap-start shrink-0 w-[85vw] sm:w-[360px]">
                <SoldPropertyCard property={property} index={idx} />
              </div>
            ))}
            <div className="shrink-0 w-px snap-end" />
          </div>
        ) : (
          <div className="text-center py-16 px-6 bg-white border border-gray-100 rounded-2xl max-w-[1240px] mx-auto text-gray-400 font-medium">
            No hay propiedades en este estado en este momento.
          </div>
        )}

        {/* CTA Link to Landing / WhatsApp */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 px-6">
          <a
            href="https://wa.me/34647803355?text=Hola%2C%20quiero%20vender%20mi%20propiedad%20con%20vuestro%20m%C3%A9todo%20exitoso"
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-8 bg-editorial-black text-white text-[11px] font-black tracking-[0.18em] uppercase rounded-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            Quiero vender mi casa
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PropiedadesVendidasSection;
