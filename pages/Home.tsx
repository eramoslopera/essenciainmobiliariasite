import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import StatsSection from '../components/StatsSection';
import SEOHead from '../components/SEOHead';
import MiaMethodTeaser from '../components/MiaMethodTeaser';
import ContactForm from '../components/ContactForm';
import AdvisorsSection from '../components/AdvisorsSection';
import { motion } from 'framer-motion';
import { WhatsappLogo } from '@phosphor-icons/react';
import { Property } from '../src/types/property';
import { fetchProperties } from '../src/utils/xmlParser';

const HERO_IMAGES = [
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6CVDb-uj3cAC0Ob6Xoldojbr8fXAlqgRkajY38_fEYtheLsJfhvgNqCXQoidNSph5pxxTIA4A-xhr-pY90ZuV6kh2DC_7KoE4yBIYtDccfKzP1CcdpXDsNXLOROI7cvlTEDUDGK7e7POqLad-y3lLKyfffcbEcwqN9yGejMHM5xKcKUdYutySJ4gKxwHil_TPn5cms3boBRB4bDas5vt7CzfzSedfRnX3LOZiliuJrw2B0gk4vAdiAgkIfndu1DmSEjAfvSQw',
    position: 'center',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSY-PXU4Aos5QXaijac90faiHIS204YriutHKAaYujVG4SZWwVd-HQk8IKShLRCD2mrH-OIVWer2XgAErCzUC_oChNo4RnkugwMaJ3Y-zSOq4-4jfCFa4ISvMZbRaPTdOFCUDu2OiWp1iS4ocb6Hoi5XneGiWUooX_Q_oi2cHRd5pjRF8ffN10TAKH57NDYH0CIdA-DNBnj73Sz9ReE_PJrBw6i0hkrS7KR1gsgila22DVBrYFBJwsrMLzBagtmE9zU1ZrYHK8',
    position: 'center 30%',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTz0ljfPf17SA1GJ6uA8AFFp69r4QCIx9qAKheWPLsqb3SR9EiRThZW2pQrqT8Xq0ZMQkBXl7TkM-iW4Lv75dvy8PdbK9O30nJ35aX4fCg0S2feJ6JRYQQUGVRE_VdRjOjItcvyPHOCtbhJGoZS93wph_XgdsTjs-JRfjRxvz_Higm4ZVlH2KwIft4FCcypZ5tuZEmBATyNa2qENR5ZQOIjoGYF2i9mkiBN3wOiCJV8sOAVou3Y3J1JWjUk8qVNOGMTPeMEmtA',
    position: 'center 60%',
  },
];



const FEATURED_SOLD: Property[] = [
  {
    id: 'sold-1',
    title: "Adosado Reformado",
    location: "Benidoleig, Alicante",
    price: "€140,000",
    beds: 3,
    baths: 2,
    size: "120 m²",
    image: "https://fotos15.apinmo.com/1909/27341402/3-1.jpg",
    type: 'Townhouse',
    dateListed: '2024-01-01',
    lat: 38.7917,
    lng: -0.0278,
    status: 'sold',
    priceFreq: 'sale'
  },
  {
    id: 'sold-2',
    title: "Casa de Pueblo con Encanto",
    location: "Real de Gandía, Valencia",
    price: "€164,900",
    beds: 4,
    baths: 2,
    size: "180 m²",
    image: "https://fotos15.apinmo.com/1909/23491575/15-1.jpg",
    type: 'House',
    dateListed: '2024-02-01',
    lat: 38.949,
    lng: -0.190,
    status: 'sold',
    priceFreq: 'sale'
  },
  {
    id: 'sold-3',
    title: "Apartamento Costero",
    location: "Playa de Bellreguard",
    price: "€170,000",
    beds: 3,
    baths: 2,
    size: "95 m²",
    image: "https://fotos15.apinmo.com/1909/26037790/9-1.jpg",
    type: 'Apartment',
    dateListed: '2024-03-01',
    lat: 38.950,
    lng: -0.150,
    status: 'sold',
    priceFreq: 'sale'
  },
  {
    id: 'sold-4',
    title: "Apartamento Familiar",
    location: "Playa de Gandía",
    price: "€215,000",
    beds: 3,
    baths: 2,
    size: "105 m²",
    image: "https://fotos15.apinmo.com/1909/25828355/10-1.jpg",
    type: 'Apartment',
    dateListed: '2024-02-15',
    lat: 39.000,
    lng: -0.160,
    status: 'sold',
    priceFreq: 'sale'
  }
];

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [recentProperties, setRecentProperties] = useState<Property[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadProperties = async () => {
      let recent = [...FEATURED_SOLD];
      try {
        const fetched = await fetchProperties();
        const apiRecent = fetched.filter(p => p.status === 'sold' || p.status === 'reserved');
        if (apiRecent.length > 0) {
            recent = [...recent, ...apiRecent];
        }
      } catch (err) {
        console.error(err);
      }
      const sorted = recent.sort((a,b) => {
        if (!a.dateListed || !b.dateListed) return 0;
        return new Date(b.dateListed).getTime() - new Date(a.dateListed).getTime();
      });
      setRecentProperties(sorted.slice(0, 8));
    };
    loadProperties();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 450; // slightly less than card width + gap for context
      const currentScroll = carouselRef.current.scrollLeft;
      const targetScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;

      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <SEOHead
        title="Inmobiliaria de Lujo en Gandia y Valencia"
        description="Essencia Inmobiliaria — Compra, vende y valora tu vivienda con la inmobiliaria premium de Gandia y la costa de Valencia. Marketing editorial, valoración gratuita y alcance internacional."
        canonical="https://essenciainmobiliaria.com/"
      />
      {/* ================= HERO SLIDER — Ken Burns ================= */}
      <section className="relative min-h-[100dvh] w-full flex items-center justify-center pt-20 overflow-hidden">
        {/* Ken Burns image layers */}
        {HERO_IMAGES.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === heroIndex ? 'opacity-100' : 'opacity-0'}`}
            style={{ zIndex: 0 }}
          >
            <div
              className={`w-full h-full bg-cover transition-transform duration-[8000ms] ease-linear ${
                i === heroIndex ? 'scale-110' : 'scale-100'
              }`}
              style={{
                backgroundImage: `url("${img.src}")`,
                backgroundPosition: img.position,
              }}
            />
          </div>
        ))}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-white/40" style={{ zIndex: 1 }} />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-white/60" style={{ zIndex: 1 }} />

        {/* Hero content */}
        <div className="relative max-w-5xl mx-auto px-6 text-center flex flex-col items-center" style={{ zIndex: 2 }}>
          <motion.span 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block py-1 px-5 mb-8 text-[10px] font-black tracking-[0.25em] uppercase bg-white/80 backdrop-blur-md text-editorial-black border border-white/40 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5"
          >
            {t('home.hero.tag')}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl sm:text-7xl lg:text-8xl md:leading-[0.95] font-black text-editorial-black mb-6 tracking-[-0.03em] drop-shadow-sm"
          >
            {t('home.hero.title1')}<br />
            <span className="text-brand-blue-500 font-extrabold">{t('home.hero.title2')}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-gray-800/90 max-w-2xl mb-12 font-medium leading-[1.6] tracking-tight"
          >
            {t('home.hero.subtitle')}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <a
              href="https://wa.me/34647803355?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20vuestros%20servicios%20inmobiliarios"
              target="_blank"
              rel="noopener noreferrer"
              className="h-14 px-10 bg-editorial-black text-white text-[11px] font-black tracking-[0.2em] uppercase rounded-full shadow-diffusion hover:shadow-diffusion-hover hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-editorial-black focus-visible:ring-offset-2"
            >
              <WhatsappLogo weight="fill" className="w-5 h-5" aria-hidden="true" />
              Consulta gratuita
            </a>
            <a
              href="https://essenciainmobiliarialandingpage.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="h-14 px-10 group text-editorial-black font-black text-[11px] uppercase tracking-[0.2em] bg-white/70 backdrop-blur-md border border-white/50 rounded-full hover:bg-white hover:border-white hover:shadow-diffusion-hover active:scale-[0.98] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-editorial-black"
            >
              {t('home.hero.cta.sold')}
              <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </motion.div>

          {/* Dot indicators */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
            className="flex gap-4 mt-16" style={{ zIndex: 2 }}
          >
            {HERO_IMAGES.map((_, i) => (
              <button
                key={i}
                aria-label={`Ir a imagen ${i + 1}`}
                onClick={() => setHeroIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 ${
                  i === heroIndex ? 'bg-editorial-black scale-150' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section — animated counters */}
      <StatsSection />

      {/* MÍA Method Teaser */}
      <MiaMethodTeaser />

      <section className="py-16 md:py-24 bg-editorial-gray overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center justify-between mb-12 px-6 lg:px-24">
            <h2 className="text-3xl font-bold">{t('home.recent.title')}</h2>
            <div className="flex gap-2">
              <button onClick={() => scroll('left')} aria-label={language === 'es' ? 'Propiedad anterior' : 'Previous property'} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500">
                <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
              </button>
              <button onClick={() => scroll('right')} aria-label={language === 'es' ? 'Siguiente propiedad' : 'Next property'} className="w-10 h-10 rounded-full bg-brand-blue-500 text-white flex items-center justify-center hover:bg-brand-blue-600 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500">
                <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
              </button>
            </div>
          </div>
          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-6 lg:gap-8 px-6 lg:px-24 pb-12 hide-scrollbar snap-x snap-mandatory scroll-smooth"
          >
            {recentProperties.map((property, index) => {
              const statusText = property.status === 'sold' ? t('home.recent.sold') : (language === 'es' ? 'Reservado' : 'Reserved');
              const displayImage = property.image || (property.images && property.images.length > 0 ? property.images[0] : '');
              
              return (
              <motion.div 
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01, y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="snap-center shrink-0 w-[85vw] md:w-[500px]"
              >
              <Link to={`/property/${property.id}`} className="bg-white rounded-lg overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] transition-shadow duration-300 block group h-full">
                <div className="w-full h-64 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url("${displayImage}")` }}>
                  <div className="p-4 flex justify-end">
                    <span className="bg-editorial-black text-white font-black uppercase tracking-widest text-[10px] px-3 py-1 rounded-full">{statusText}</span>
                  </div>
                </div>
                <div className="p-6 relative z-10 bg-white">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold leading-tight mb-1 group-hover:text-brand-blue-600 transition-colors line-clamp-1 truncate">{property.title}</h3>
                    <p className="text-sm text-gray-500 truncate">{property.location}</p>
                  </div>
                  <div className="space-y-3 bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200 border-dashed">
                      <span className="text-xs font-bold uppercase text-gray-400 tracking-wide">{t('home.recent.sold_price')}</span>
                      <span className="text-sm font-bold text-green-600">{property.price}</span>
                    </div>
                    {property.dateListed && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase text-gray-400 tracking-wide">{language === 'es' ? 'Publicado' : 'Listed'}</span>
                      <span className="text-sm font-bold text-editorial-black">{property.dateListed}</span>
                    </div>
                    )}
                  </div>
                </div>
              </Link>
              </motion.div>
            )})}
            {recentProperties.length === 0 && (
              <div className="w-full text-center py-12 text-gray-500 font-medium tracking-wide lg:col-span-3">
                {language === 'es' ? 'No hay transacciones recientes disponibles en el CRM.' : 'No recent transactions available in the CRM.'}
              </div>
            )}
            
            {/* Fake element to allow scrolling to the end with proper padding */}
            {recentProperties.length > 0 && (
              <div className="shrink-0 w-[1px] snap-end"></div>
            )}
          </div>
        </div>
      </section>

      {/* ================= ADVISORS SECTION ================= */}
      <AdvisorsSection />

      {/* ================= CONTACT FORM SECTION ================= */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        {/* Decorative geometric accent */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-5 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 80% 50%, #2563eb 0%, transparent 70%)' }} />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-brand-blue-600 font-bold tracking-widest uppercase text-xs mb-4 block">{t('home.contact.tag')}</span>
              <h2 className="text-4xl md:text-5xl font-black text-editorial-black mb-6 leading-tight">
                {t('home.contact.title').split('\n').map((line, i, arr) =>
                  i < arr.length - 1
                    ? <span key={i}>{line}<br /></span>
                    : <span key={i} className="text-brand-blue-600">{line}</span>
                )}
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-10">
                {t('home.contact.subtitle')}
              </p>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-blue-50 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-brand-blue-600 text-base">call</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-0.5">{t('common.phone')}</p>
                    <a href="tel:+34618063000" className="text-editorial-black font-semibold hover:text-brand-blue-600 transition-colors">+34 618 063 000</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-blue-50 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-brand-blue-600 text-base">mail</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-0.5">{t('common.email')}</p>
                    <a href="mailto:hola@essenciainmobiliaria.com" className="text-editorial-black font-semibold hover:text-brand-blue-600 transition-colors">hola@essenciainmobiliaria.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-blue-50 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-brand-blue-600 text-base">location_on</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-0.5">{t('footer.office') || 'Oficina'}</p>
                    <p className="text-editorial-black font-semibold">C/ Sant Vicent Ferrer 24, Gandia, Valencia</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <ContactForm theme="light" />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;