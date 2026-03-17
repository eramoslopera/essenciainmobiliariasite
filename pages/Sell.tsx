import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { fetchProperties } from '../src/utils/xmlParser';
import { Property } from '../src/types/property';
import VisualProSection from '../components/VisualProSection';
import SalesProcessSection from '../components/SalesProcessSection';
import SEOHead from '../components/SEOHead';

const Sell: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [soldProperties, setSoldProperties] = useState<Property[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadProperties = async () => {
      const data = await fetchProperties();
      // Filter for sold properties. 
      // Note: Real feed might not have many 'sold' items publicly visible if they are removed. 
      // For demo/dev purposes, if no sold properties are found, we might want to show some available ones 
      // or Mock them, but user asked for "Real Data". 
      // I will filter strict 'sold' first.
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
      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const handleStartValuation = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/valuation');
  };

  return (
    <>
      <SEOHead
        title="Vende tu Propiedad con Marketing Premium"
        description="Vende tu vivienda en Gandia y Valencia con Essencia Inmobiliaria. Home staging profesional, fotografía editorial, recorridos virtuales y alcance internacional."
        canonical="https://essenciainmobiliaria.com/sell"
      />
      <section className="relative pt-20 min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD6CVDb-uj3cAC0Ob6Xoldojbr8fXAlqgRkajY38_fEYtheLsJfhvgNqCXQoidNSph5pxxTIA4A-xhr-pY90ZuV6kh2DC_7KoE4yBIYtDccfKzP1CcdpXDsNXLOROI7cvlTEDUDGK7e7POqLad-y3lLKyfffcbEcwqN9yGejMHM5xKcKUdYutySJ4gKxwHil_TPn5cms3boBRB4bDas5vt7CzfzSedfRnX3LOZiliuJrw2B0gk4vAdiAgkIfndu1DmSEjAfvSQw")' }}
        ></div>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <span className="inline-block py-1.5 px-4 mb-8 text-xs font-bold tracking-[0.2em] uppercase border border-editorial-black text-editorial-black">
            {t('sell.hero.tag')}
          </span>
          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8 text-editorial-black">
            {t('sell.hero.title')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-700 to-brand-blue-500">{t('sell.hero.subtitle')}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            {t('sell.hero.desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/valuation" className="h-14 px-10 bg-editorial-black hover:bg-brand-blue-600 text-white text-base font-bold tracking-widest uppercase rounded-none transition-all shadow-xl flex items-center justify-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500">
              {t('sell.cta.valuation')}
            </Link>
            <Link to="/properties" className="h-14 px-10 bg-transparent border border-editorial-black hover:bg-brand-blue-50 hover:border-brand-blue-500 text-editorial-black text-base font-bold tracking-widest uppercase rounded-none transition-all flex items-center justify-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500">
              {t('nav.properties')}
            </Link>
          </div>
        </div>
      </section>

      <VisualProSection />

      <SalesProcessSection />




      {soldProperties.length > 0 && (
        <section className="py-24 bg-white border-b border-gray-100 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-24">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold">{t('home.recent.title')}</h2>
              <div className="flex gap-2">
                <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white transition-colors">
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full bg-brand-blue-600 text-white flex items-center justify-center hover:bg-brand-blue-700 transition-colors">
                  <span className="material-symbols-outlined">arrow_forward</span>
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
                  className="snap-center shrink-0 w-[85vw] md:w-[400px] bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block group border border-gray-100"
                >
                  <div className="w-full h-64 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 relative" style={{ backgroundImage: `url("${property.image}")` }}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-editorial-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">
                        {t('home.recent.sold')}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 relative z-10 bg-white">
                    <div className="mb-6">
                      <h3 className="text-lg font-bold leading-tight mb-1 group-hover:text-brand-blue-600 transition-colors truncate">{property.title}</h3>
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
                        <span>{property.beds} Beds</span>
                        <span>•</span>
                        <span>{property.baths} Baths</span>
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

      {/* Portals Visibility Section */}
      <section className="py-20 bg-editorial-black text-white border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 text-center">
          <p className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-12">{t('sell.portals.title')}</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Text-based logos using high-end typography since SVGs are missing */}
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

      {/* Finalization Process Carousel */}
      <section className="py-32 bg-editorial-gray overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-editorial-black mb-6">{t('sell.finalization.title')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('sell.finalization.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1: Reserva */}
            <div className="bg-white p-8 rounded shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-editorial-black text-white rounded-full flex items-center justify-center text-xl font-bold mb-6 group-hover:bg-brand-blue-600 transition-colors">1</div>
              <h3 className="text-xl font-bold mb-4">{t('sell.step.reserva')}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{t('sell.step.reserva.desc')}</p>
            </div>

            {/* Step 2: Arras */}
            <div className="bg-white p-8 rounded shadow-sm hover:shadow-xl transition-all duration-300 group md:translate-y-8">
              <div className="w-12 h-12 bg-editorial-black text-white rounded-full flex items-center justify-center text-xl font-bold mb-6 group-hover:bg-brand-blue-600 transition-colors">2</div>
              <h3 className="text-xl font-bold mb-4">{t('sell.step.arras')}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{t('sell.step.arras.desc')}</p>
            </div>

            {/* Step 3: Notaria */}
            <div className="bg-white p-8 rounded shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-editorial-black text-white rounded-full flex items-center justify-center text-xl font-bold mb-6 group-hover:bg-brand-blue-600 transition-colors">3</div>
              <h3 className="text-xl font-bold mb-4">{t('sell.step.notaria')}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{t('sell.step.notaria.desc')}</p>
            </div>

            {/* Step 4: Postventa */}
            <div className="bg-white p-8 rounded shadow-sm hover:shadow-xl transition-all duration-300 group md:translate-y-8">
              <div className="w-12 h-12 bg-editorial-black text-white rounded-full flex items-center justify-center text-xl font-bold mb-6 group-hover:bg-brand-blue-600 transition-colors">4</div>
              <h3 className="text-xl font-bold mb-4">{t('sell.step.postventa')}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{t('sell.step.postventa.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white relative">
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-8 text-editorial-black tracking-tighter">{t('sell.ready.title')}</h2>
          <p className="text-xl text-gray-500 mb-16 font-light max-w-2xl mx-auto">{t('sell.ready.subtitle')}</p>

          <form className="max-w-2xl mx-auto" onSubmit={handleStartValuation}>
            <div className="relative group">
              <input
                className="w-full h-20 px-0 bg-transparent text-editorial-black placeholder-gray-300 border-b-2 border-gray-200 focus:border-editorial-black focus:ring-0 text-3xl md:text-4xl font-bold tracking-tight text-center transition-all duration-300 outline-none"
                placeholder={t('home.value.placeholder') + '...'}
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-editorial-black transition-all duration-500 group-hover:w-full"></div>
            </div>

            <div className="mt-12">
              <button type="submit" className="h-16 px-12 bg-editorial-black hover:bg-brand-blue-600 text-white text-lg font-bold uppercase tracking-widest whitespace-nowrap transition-all rounded-none shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                {t('sell.hero.start')}
              </button>
            </div>
          </form>
          <p className="mt-12 text-xs text-gray-400 uppercase tracking-widest">{t('sell.disclaimer')}</p>
        </div>
      </section>
    </>
  );
};

export default Sell;