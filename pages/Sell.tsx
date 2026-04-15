import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { fetchProperties } from '../src/utils/xmlParser';
import { Property } from '../src/types/property';

import SEOHead from '../components/SEOHead';
import VisualProSection from '../components/VisualProSection';
import ProcessSteps from '../components/ProcessSteps';
import MiaMethodSection from '../components/MiaMethodSection';
import ManagementClosingSection from '../components/ManagementClosingSection';
import ContactForm from '../components/ContactForm';


const Sell: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [soldProperties, setSoldProperties] = useState<Property[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadProperties = async () => {
      const data = await fetchProperties();
      const sold = data.filter(p => p.status === 'sold');
      setSoldProperties(sold);
    };
    loadProperties();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      const currentScroll = carouselRef.current.scrollLeft;
      const targetScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;
      carouselRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEOHead
        title="Vende tu Propiedad con Marketing Premium"
        description="Vende tu vivienda en Gandia y Valencia con Essencia Inmobiliaria. Home staging profesional, fotografía editorial, recorridos virtuales y alcance internacional."
        canonical="https://essenciainmobiliaria.com/sell"
      />

      {/* ─── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-20 min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD6CVDb-uj3cAC0Ob6Xoldojbr8fXAlqgRkajY38_fEYtheLsJfhvgNqCXQoidNSph5pxxTIA4A-xhr-pY90ZuV6kh2DC_7KoE4yBIYtDccfKzP1CcdpXDsNXLOROI7cvlTEDUDGK7e7POqLad-y3lLKyfffcbEcwqN9yGejMHM5xKcKUdYutySJ4gKxwHil_TPn5cms3boBRB4bDas5vt7CzfzSedfRnX3LOZiliuJrw2B0gk4vAdiAgkIfndu1DmSEjAfvSQw")',
          }}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/80 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block py-1.5 px-4 mb-8 text-xs font-bold tracking-[0.2em] uppercase border border-editorial-black text-editorial-black"
          >
            {t('sell.hero.tag')}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="text-6xl md:text-8xl font-light leading-[0.95] tracking-tighter mb-8 text-editorial-black"
          >
            {t('sell.hero.title')} <br />
            <span className="text-transparent font-medium bg-clip-text bg-gradient-to-r from-brand-blue-700 to-brand-blue-500">
              {t('sell.hero.subtitle')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            {t('sell.hero.desc')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link
              to="/valuation"
              className="h-14 px-10 bg-brand-blue-700 hover:bg-brand-blue-500 text-white text-xs font-bold tracking-[0.15em] uppercase rounded-full transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-5px_rgba(34,211,238,0.4)] hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500"
            >
              {t('sell.cta.valuation')}
            </Link>
            <Link
              to="/properties"
              className="h-14 px-10 bg-transparent border border-editorial-black hover:bg-editorial-black hover:text-white text-editorial-black text-xs font-bold tracking-[0.15em] uppercase rounded-full transition-all active:scale-[0.98] flex items-center justify-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500"
            >
              {t('nav.properties')}
            </Link>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Scroll</span>
          <span className="material-symbols-outlined text-gray-400 text-base">arrow_downward</span>
        </motion.div>
      </section>

      {/* ─── 2. SERVICE CHOICE CARDS (Servicio Completo) ────────────────────── */}

      <section className="bg-editorial-black text-white py-16 md:py-24 px-4 sm:px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.25em] uppercase text-gray-500 text-center mb-4"
          >
            {t('sell.package.desc')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-center mb-16 tracking-tighter"
          >
            {t('sell.package.title')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Card 1: Editorial Marketing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 p-10 hover:border-brand-blue-500/50 transition-all duration-500 hover:bg-white/5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <span className="material-symbols-outlined text-4xl mb-6 block text-brand-blue-400">photo_camera</span>
                <h3 className="text-2xl font-light tracking-tight mb-6">{t('sell.card1.title')}</h3>
                <ul className="space-y-3">
                  {['sell.card1.list1', 'sell.card1.list2', 'sell.card1.list3'].map(key => (
                    <li key={key} className="flex items-center gap-2 text-gray-400 text-sm">
                      <span className="material-symbols-outlined text-brand-blue-400 text-sm">check_circle</span>
                      {t(key)}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Card 2: Legal Compliance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 p-10 hover:border-brand-blue-500/50 transition-all duration-500 hover:bg-white/5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <span className="material-symbols-outlined text-4xl mb-6 block text-brand-blue-400">gavel</span>
                <h3 className="text-2xl font-light tracking-tight mb-6">{t('sell.card2.title')}</h3>
                <ul className="space-y-3">
                  {['sell.card2.list1', 'sell.card2.list2', 'sell.card2.list3'].map(key => (
                    <li key={key} className="flex items-center gap-2 text-gray-400 text-sm">
                      <span className="material-symbols-outlined text-brand-blue-400 text-sm">check_circle</span>
                      {t(key)}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Card 3: Notary & Tax */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 p-10 hover:border-brand-blue-500/50 transition-all duration-500 hover:bg-white/5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <span className="material-symbols-outlined text-4xl mb-6 block text-brand-blue-400">account_balance</span>
                <h3 className="text-2xl font-light tracking-tight mb-6">{t('sell.card3.title')}</h3>
                <ul className="space-y-3">
                  {['sell.card3.list1', 'sell.card3.list2', 'sell.card3.list3'].map(key => (
                    <li key={key} className="flex items-center gap-2 text-gray-400 text-sm">
                      <span className="material-symbols-outlined text-brand-blue-400 text-sm">check_circle</span>
                      {t(key)}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex gap-4 justify-center mt-16"
          >
            <Link
              to="/valuation"
              className="h-14 px-10 bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] text-editorial-black hover:bg-gray-100 font-bold tracking-[0.15em] uppercase rounded-full transition-all active:scale-[0.98] flex items-center gap-3 text-xs"
            >
              {t('sell.cta.valuation')}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── 3. PROCESS STEPS ────────────────────────────────────────────────── */}
      <ProcessSteps />

      {/* ─── 4. MÉTODO MIA (10 pasos) ───────────────────────────────────────── */}
      <MiaMethodSection />

      {/* ─── 5. VISUAL PRO (fotografía, staging, 3D) ────────────────────────── */}
      <VisualProSection />

      {/* ─── 6. GESTIÓN + CIERRE ─────────────────────────────────────────────── */}
      <ManagementClosingSection />

      {/* ─── 8. SOLD PROPERTIES ─────────────────────────────────────────────── */}
      {soldProperties.length > 0 && (
        <section className="py-16 md:py-24 bg-white border-b border-gray-100 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-24">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold">{t('home.recent.title')}</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => scroll('left')}
                  aria-label="Scroll left"
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500"
                >
                  <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
                </button>
                <button
                  onClick={() => scroll('right')}
                  aria-label="Scroll right"
                  className="w-10 h-10 rounded-full bg-brand-blue-600 text-white flex items-center justify-center hover:bg-brand-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 focus-visible:ring-offset-2"
                >
                  <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                </button>
              </div>
            </div>

            <div
              ref={carouselRef}
              className="flex overflow-x-auto gap-8 pb-8 hide-scrollbar snap-x snap-mandatory scroll-smooth"
            >
              {soldProperties.map((property) => (
                <Link
                  key={property.id}
                  to={`/property/${property.id}`}
                  className="snap-center shrink-0 w-[85vw] md:w-[400px] bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 block group border border-gray-100"
                >
                  <div
                    className="w-full h-64 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 relative"
                    style={{ backgroundImage: `url("${property.image}")` }}
                  >
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    <div className="absolute top-4 right-4">
                      <span className="bg-editorial-black text-white font-black uppercase tracking-widest text-[10px] px-3 py-1 rounded-full">
                        {t('home.recent.sold')}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 relative z-10 bg-white">
                    <div className="mb-6">
                      <h3 className="text-lg font-bold leading-tight mb-1 group-hover:text-brand-blue-600 transition-colors truncate">
                        {property.title}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        {property.location}
                      </p>
                    </div>

                    <div className="space-y-3 bg-gray-50 p-4 rounded-md">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200 border-dashed">
                        <span className="text-xs font-bold uppercase text-gray-400 tracking-wide">{t('home.recent.sold_price')}</span>
                        <span className="text-sm font-bold text-green-600">{property.price}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{property.beds} {t('property.beds')}</span>
                        <span>•</span>
                        <span>{property.baths} {t('property.baths')}</span>
                        <span>•</span>
                        <span>{property.size}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 9. PORTALS VISIBILITY BANNER ───────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-editorial-black text-white border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 text-center">
          <p className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-12">{t('sell.portals.title')}</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-24 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-3xl font-serif font-bold tracking-tighter">idealista</span>
            <span className="text-3xl font-sans font-black tracking-tight text-[#ff5a00] grayscale-0">fotocasa</span>
            <span className="text-3xl font-serif italic font-medium">Kyero</span>
            <span className="text-2xl font-sans font-bold tracking-widest uppercase border-2 border-white px-2 py-1">Habitaclia</span>
            <span className="text-3xl font-serif font-bold text-blue-400 grayscale-0">ThinkSPAIN</span>
            <span className="text-3xl font-sans font-extrabold tracking-tighter text-purple-600 grayscale-0">pisos.com</span>
          </div>
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-center items-center gap-8 text-gray-500 text-sm font-bold tracking-widest uppercase">
            <span>Member of MLS Gandía</span>
            <span className="hidden md:inline">•</span>
            <span>ASICVAL Certified</span>
            <span className="hidden md:inline">•</span>
            <span>Luxury Real Estate Partners</span>
          </div>
        </div>
      </section>

      {/* ─── 10. FINAL CTA ──────────────────────────────────────────────────── */}
      <section className="py-16 md:py-32 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 md:mb-8 text-editorial-black tracking-tighter">{t('sell.ready.title')}</h2>
          <p className="text-lg md:text-xl text-gray-500 mb-10 md:mb-16 font-light max-w-2xl mx-auto">{t('sell.ready.subtitle')}</p>

          <ContactForm theme="light" defaultReason="sell" source="sell_page" className="max-w-2xl mx-auto text-left" />
          <p className="mt-8 md:mt-12 text-xs text-gray-400 uppercase tracking-widest">{t('sell.disclaimer')}</p>
        </div>
      </section>
    </>
  );
};

export default Sell;