import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { useLanguage } from '../context/LanguageContext';
import { fetchProperties } from '../src/utils/xmlParser';
import { Property } from '../src/types/property';
import { translateFeature } from '../src/utils/translator';
import SEOHead from '../components/SEOHead';
import { motion, AnimatePresence } from 'framer-motion';
import { WhatsappLogo } from '@phosphor-icons/react';

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const statItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 22 } },
};

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage(); // access language to pick description
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      // Optimize: could pass property via state from list to avoid re-fetch, but direct link needs fetch.
      // For now, fetch all because we don't have a backend to fetch single.
      const props = await fetchProperties();
      const found = props.find(p => p.id === parseInt(id));
      if (found) {
        setProperty(found);
        // ── Track "recently viewed" in localStorage ──────────────
        try {
          const KEY = 'ei_recently_viewed';
          const stored: number[] = JSON.parse(localStorage.getItem(KEY) || '[]');
          const numId = parseInt(id);
          const updated = [numId, ...stored.filter(x => x !== numId)].slice(0, 20);
          localStorage.setItem(KEY, JSON.stringify(updated));
        } catch { /* ignore storage errors */ }
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const images = property?.images && property.images.length > 0 ? property.images : (property?.image ? [property.image] : []);

  const nextImage = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (images.length === 0) return;
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (images.length === 0) return;
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDownload = () => {
    alert("Downloading area guide...");
  };

  // Derive useful flags from CRM data
  const hasGarage = property?.features?.some(f => f.toLowerCase().includes('garage')) ?? false;

  if (loading) {
    return (
      <div className="min-h-[100dvh] pt-24 pb-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Title skeleton */}
          <div className="animate-pulse mb-8">
            <div className="h-4 w-32 bg-gray-200 rounded mb-4" />
            <div className="h-14 w-3/4 bg-gray-200 rounded mb-3" />
            <div className="h-10 w-1/3 bg-gray-200 rounded" />
          </div>
          {/* Hero image skeleton */}
          <div className="w-full h-[50vh] md:h-[65vh] bg-gray-200 animate-pulse rounded-sm mb-6" />
          {/* Thumbnails skeleton */}
          <div className="grid grid-cols-6 gap-3 mb-20">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-gray-200 animate-pulse rounded" />
            ))}
          </div>
          {/* Body skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 animate-pulse space-y-4">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="h-4 w-4/6 bg-gray-200 rounded" />
            </div>
            <div className="lg:col-span-4">
              <div className="h-72 bg-gray-200 animate-pulse rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 gap-4">
        <h1 className="text-2xl font-bold">Property not found</h1>
        <Link to="/properties" className="text-brand-blue-600 hover:underline">{t('detail.return')}</Link>
      </div>
    );
  }

  // Description logic
  const description = property.description
    ? (language === 'es' ? property.description.es : property.description.en) || property.description.en || property.description.es
    : t('detail.desc.p1'); // Fallback if no desc

  // Split description into paragraphs if it's long
  const descParagraphs = description.split('\n').filter(p => p.trim() !== '');


  return (
    <>
      <SEOHead
        title={`${property.title} — ${property.location}`}
        description={`${property.type} en ${property.location}. ${property.beds ? property.beds + ' habitaciones, ' : ''}${property.baths ? property.baths + ' baños, ' : ''}${property.size ? property.size + '. ' : ''}${property.price ? property.price + '.' : ''}`}
        canonical={`https://essenciainmobiliaria.com/property/${property.id}`}
        ogImage={property.images?.[0]}
      />
      <main className="pt-24 pb-16 overflow-hidden">
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate="visible"
          className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {/* Status badge */}
                {property.status === 'sold' && (
                  <span className="px-2 py-1 bg-red-600 text-white font-black uppercase tracking-widest text-[10px] rounded-full">Vendida</span>
                )}
                {property.status === 'reserved' && (
                  <span className="px-2 py-1 bg-amber-500 text-white font-black uppercase tracking-widest text-[10px] rounded-full">Reservada</span>
                )}
                {/* priceFreq badge */}
                {property.priceFreq === 'rent' && (
                  <span className="px-2 py-1 bg-brand-blue-700 text-white font-black uppercase tracking-widest text-[10px] rounded-full">Alquiler</span>
                )}
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{property.location}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tighter text-editorial-black leading-[0.95]">
                {property.title}
              </h1>
              {property.ref && (
                <p className="mt-4 text-xs text-brand-blue-600 font-bold tracking-widest uppercase">Ref. {property.ref}</p>
              )}
            </div>
            <div className="flex flex-col items-start lg:items-end mt-6 lg:mt-0">
              <p className="text-4xl lg:text-6xl font-light tracking-tighter tabular-nums text-editorial-black mb-1">
                {property.price}
                {property.priceFreq === 'rent' && <span className="text-xl font-medium tracking-normal text-gray-400 ml-2">/mes</span>}
              </p>
              {property.size && parseInt(property.size) > 0 && (
                <p className="text-sm text-gray-500 font-bold tracking-widest uppercase mt-1">
                  {`€${Math.round(parseInt(property.price.replace(/\D/g, '')) / parseInt(property.size)).toLocaleString()}/m²`}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate="visible"
          className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 mb-20"
        >
          {/* Main gallery with AnimatePresence crossfade */}
          <div className="relative w-full h-[50vh] md:h-[68vh] bg-gray-100 rounded-sm overflow-hidden mb-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]">
            <AnimatePresence mode="wait">
              {images.length > 0 ? (
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url("${images[currentImageIndex]}")` }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400">Sin imágenes disponibles</div>
              )}
            </AnimatePresence>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Virtual tour badge */}
            {property.virtualTourUrl && (
              <a
                href={property.virtualTourUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-white backdrop-blur-md text-gray-900 text-xs font-bold px-3 py-2 rounded-full hover:bg-gray-100 transition-all shadow-md"
              >
                <span className="material-symbols-outlined text-sm">360</span>
                Tour Virtual
              </a>
            )}

            {/* Nav arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white backdrop-blur-md flex items-center justify-center text-white hover:text-black transition-all active:scale-95 z-20 shadow-lg border border-white/10"
                  aria-label="Imagen anterior"
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white backdrop-blur-md flex items-center justify-center text-white hover:text-black transition-all active:scale-95 z-20 shadow-lg border border-white/10"
                  aria-label="Imagen siguiente"
                >
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </>
            )}

            {images.length > 0 && (
              <div className="absolute bottom-5 right-5 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold tracking-widest border border-white/10 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">photo_library</span>
                {currentImageIndex + 1} / {images.length}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {images.map((img, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`relative aspect-[4/3] rounded overflow-hidden ${
                    currentImageIndex === idx
                      ? 'ring-2 ring-brand-blue-500 ring-offset-2 opacity-100'
                      : 'opacity-55 hover:opacity-100'
                  } transition-opacity duration-200`}
                >
                  <img src={img} alt={`Vista ${idx + 1}`} className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate="visible"
          className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20"
        >
          <div className="lg:col-span-8">
            {/* Property stats — staggered spring entrance */}
            {/* Property stats — staggered spring entrance */}
            <h2 className="sr-only">Atributos principales</h2>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-6 py-8 border-y border-gray-200/60 mb-12"
            >
              {property.beds ? (
                <motion.div variants={statItem} className="flex flex-col gap-1 border-l pl-4 border-gray-200">
                  <p className="text-xs uppercase text-gray-400 tracking-widest font-bold">{t('detail.beds')}</p>
                  <p className="text-3xl font-light text-editorial-black tabular-nums tracking-tight">{property.beds}</p>
                </motion.div>
              ) : null}
              {property.baths ? (
                <motion.div variants={statItem} className="flex flex-col gap-1 border-l pl-4 border-gray-200">
                  <p className="text-xs uppercase text-gray-400 tracking-widest font-bold">{t('detail.baths')}</p>
                  <p className="text-3xl font-light text-editorial-black tabular-nums tracking-tight">{property.baths}</p>
                </motion.div>
              ) : null}
              {property.size && (
                <motion.div variants={statItem} className="flex flex-col gap-1 border-l pl-4 border-gray-200">
                  <p className="text-xs uppercase text-gray-400 tracking-widest font-bold">{t('detail.interior')}</p>
                  <p className="text-3xl font-light text-editorial-black tabular-nums tracking-tight">{property.size}</p>
                </motion.div>
              )}
              {property.plot && (
                <motion.div variants={statItem} className="flex flex-col gap-1 border-l pl-4 border-gray-200">
                  <p className="text-xs uppercase text-gray-400 tracking-widest font-bold">Parcela</p>
                  <p className="text-3xl font-light text-editorial-black tabular-nums tracking-tight">{property.plot}</p>
                </motion.div>
              )}
              {hasGarage && (
                <motion.div variants={statItem} className="flex flex-col gap-1 border-l pl-4 border-gray-200">
                  <p className="text-xs uppercase text-gray-400 tracking-widest font-bold">{t('detail.garage')}</p>
                  <p className="text-3xl font-light text-editorial-black tracking-tight">Sí</p>
                </motion.div>
              )}
              {property.pool && (
                <motion.div variants={statItem} className="flex flex-col gap-1 border-l pl-4 border-gray-200">
                  <p className="text-xs uppercase text-gray-400 tracking-widest font-bold">Piscina</p>
                  <p className="text-3xl font-light text-editorial-black tracking-tight">Sí</p>
                </motion.div>
              )}
            </motion.div>

            <div className="prose prose-lg max-w-none mb-16">
              <h2 className="text-3xl font-bold mb-6 tracking-tight text-editorial-black">{t('detail.about_property')}</h2>
              {descParagraphs.length > 0 ? (
                descParagraphs.map((p, i) => <p key={i} className="text-gray-600 leading-[1.8] font-medium mb-6">{p}</p>)
              ) : (
                <p className="text-gray-600 leading-[1.8] font-medium mb-6">No description available.</p>
              )}
            </div>

            <div className="bg-editorial-gray p-8 sm:p-10 rounded-sm mb-12 border border-gray-100">
              <h3 className="text-sm font-bold mb-8 uppercase tracking-[0.2em] text-editorial-black">{t('detail.amenities')}</h3>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12"
              >
                {property.features && property.features.length > 0 ? (
                  property.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      variants={statItem}
                      className="flex items-center gap-4 py-3 border-b border-gray-200/50"
                    >
                      <span className="material-symbols-outlined text-brand-blue-500 text-lg font-light">check</span>
                      <span className="text-[15px] font-medium text-gray-800">{translateFeature(feature, language as 'es' | 'en' | 'fr' | 'de' | 'va')}</span>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-500 col-span-2 text-sm italic">Sin características listadas.</p>
                )}
              </motion.div>
            </div>

            {/* Video CTA */}
            {property.videoUrl && (
              <a
                href={property.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-bold text-gray-700 hover:text-brand-blue-600 transition-colors mb-12 group"
              >
                <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">play_circle</span>
                Ver vídeo de la propiedad
              </a>
            )}
          </div>

          <div className="lg:col-span-4 relative">
            <div className="sticky top-24">
              <div className="bg-white border border-gray-200 shadow-md p-8 rounded-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-full bg-brand-blue-100 flex items-center justify-center shrink-0"
                  >
                    <span className="material-symbols-outlined text-brand-blue-600">person</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Essencia Inmobiliaria</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Gandía, Valencia</p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{t('detail.book_tour')}</h3>
                <p className="text-sm text-gray-500 mb-6">{t('detail.book_tour_desc')}</p>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="tour-name" className="block text-xs font-bold uppercase text-gray-400 mb-1">{t('common.name')}</label>
                    <input id="tour-name" className="w-full bg-transparent border-b border-gray-200 rounded-none px-0 py-3 text-sm focus:outline-none focus:border-editorial-black focus-visible:ring-2 focus-visible:ring-brand-blue-500 transition-colors" placeholder="Name" type="text" />
                  </div>
                  <div>
                    <label htmlFor="tour-email" className="block text-xs font-bold uppercase text-gray-400 mb-1">{t('common.email')}</label>
                    <input id="tour-email" className="w-full bg-transparent border-b border-gray-200 rounded-none px-0 py-3 text-sm focus:outline-none focus:border-editorial-black focus-visible:ring-2 focus-visible:ring-brand-blue-500 transition-colors" placeholder="Email" type="email" />
                  </div>
                  <div>
                    <label htmlFor="tour-phone" className="block text-xs font-bold uppercase text-gray-400 mb-1">{t('common.phone')}</label>
                    <input id="tour-phone" className="w-full bg-transparent border-b border-gray-200 rounded-none px-0 py-3 text-sm focus:outline-none focus:border-editorial-black focus-visible:ring-2 focus-visible:ring-brand-blue-500 transition-colors" placeholder="Phone" type="tel" />
                  </div>
                  <button type="button" onClick={() => alert("Request sent!")} className="w-full bg-brand-blue-700 text-white font-bold text-xs uppercase tracking-[0.15em] py-4 rounded-sm mt-4 hover:bg-brand-blue-500 hover:shadow-[0_8px_24px_rgba(34,211,238,0.4)] hover:-translate-y-0.5 shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-blue-500">
                    {t('detail.request')}
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
                  </button>
                  <p className="text-xs text-center text-gray-400 mt-4">{t('detail.form.privacy')}</p>
                </form>

                <Link
                  to={`/contact?interest=Buying+a+property&message=I+would+like+to+inquire+about+${property.title}+ref+${property.id}`}
                  className="w-full bg-white border border-gray-300 text-editorial-black font-bold py-4 rounded-sm mt-4 hover:border-brand-blue-400 hover:bg-brand-blue-50 hover:text-brand-blue-700 hover:shadow-[0_6px_16px_rgba(34,211,238,0.15)] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 uppercase text-xs tracking-[0.15em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500"
                >
                  <span className="material-symbols-outlined text-base" aria-hidden="true">person</span>
                  {t('detail.contact_agent')}
                </Link>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center gap-6">
                  <a href="tel:+34647803355" className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-brand-blue-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 rounded-sm">
                    <span className="material-symbols-outlined text-lg" aria-hidden="true">call</span> {t('detail.call')}
                  </a>
                  <a href="https://wa.me/34647803355" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-brand-blue-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 rounded-sm">
                    <WhatsappLogo weight="fill" className="w-5 h-5 text-[#25D366]" aria-hidden="true" /> {t('detail.whatsapp')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="py-20 bg-editorial-gray">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/3">
              <span className="text-brand-blue-600 font-bold tracking-widest uppercase text-xs mb-3 block">{t('detail.location_insights')}</span>
              <h2 className="text-4xl font-bold mb-6">{property.location}</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {(() => {
                  const loc = property.location.toLowerCase();
                  if (loc.includes('gandia') || loc.includes('gandía')) return t('detail.location_desc.gandia');
                  if (loc.includes('oliva')) return t('detail.location_desc.oliva');
                  if (loc.includes('valencia')) return t('detail.location_desc.valencia');
                  return t('detail.location_desc.default');
                })()}
              </p>
              <button onClick={handleDownload} className="mt-8 text-sm font-bold uppercase tracking-wider border-b-2 border-black pb-1 hover:text-brand-blue-600 hover:border-brand-blue-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 rounded-sm">
                {t('detail.location.download')}
              </button>
            </div>
            <div className="w-full md:w-2/3 h-[400px] bg-gray-200 relative rounded-sm overflow-hidden isolate map-container">
              {property.lat && property.lng ? (
                <MapContainer
                  center={[property.lat, property.lng]}
                  zoom={14}
                  scrollWheelZoom={false}
                  className="h-full w-full z-0"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  />
                  <CircleMarker center={[property.lat, property.lng]} radius={8} pathOptions={{ color: '#000', fillColor: '#000', fillOpacity: 1 }}>
                    <Popup>
                      {property.title}
                    </Popup>
                  </CircleMarker>
                </MapContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">Map not available</div>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* WhatsApp Floating Action Button — número real 34647803355 */}
      <motion.a
        href={`https://wa.me/34647803355?text=${encodeURIComponent(`Hola, estoy interesado/a en la propiedad: ${property.title}${property.ref ? ' (ref. ' + property.ref + ')' : ''}. ¿Podríais darme más información?`)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.8 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 pl-4 pr-5 py-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold rounded-full shadow-2xl transition-colors group"
        style={{ boxShadow: '0 4px 32px 0 rgba(37,211,102,0.35)' }}
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" />
        <WhatsappLogo weight="fill" className="w-6 h-6 shrink-0 relative z-10 text-white" />
        <span className="text-sm tracking-wide relative z-10 hidden sm:block">WhatsApp</span>
      </motion.a>
    </>
  );
};

export default PropertyDetail;