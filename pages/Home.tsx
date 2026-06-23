import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import StatsSection from '../components/StatsSection';
import SEOHead from '../components/SEOHead';
import MiaMethodTeaser from '../components/MiaMethodTeaser';
import CasosExitoSection from '../components/CasosExitoSection';
import PropiedadesSection from '../components/PropiedadesSection';
import ContactForm from '../components/ContactForm';
import AdvisorsSection from '../components/AdvisorsSection';
import FAQSection from '../components/FAQSection';
import BlogTeaser from '../components/BlogTeaser';
import AISection from '../components/AISection';
import { motion } from 'framer-motion';
import { WhatsappLogo } from '@phosphor-icons/react';


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





const Home: React.FC = () => {
  const { t } = useLanguage();
  const [heroIndex, setHeroIndex] = useState(0);
  const [rgpdOpen, setRgpdOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);


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
            className="inline-block py-1 px-5 mb-8 text-xs font-black tracking-[0.25em] uppercase bg-white/80 backdrop-blur-md text-editorial-black border border-white/40 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5"
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
            className="text-lg md:text-xl text-gray-900 max-w-2xl mb-12 font-medium leading-[1.6] tracking-tight"
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

      {/* Casos de Éxito — prueba social después del método */}
      <CasosExitoSection />

      {/* ── Secciones de propiedades: Tipologías + Rebajados + Recientes ── */}
      <PropiedadesSection />


      {/* ================= ADVISORS SECTION ================= */}
      <AdvisorsSection />

      {/* ================= AI & PORTALS SHOWCASE ================= */}
      <AISection />

      {/* ================= FAQ SECTION ================= */}
      <FAQSection />

      {/* ================= BLOG TEASER ================= */}
      <BlogTeaser />

      {/* ================= CONTACT FORM SECTION ================= */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden border-t border-gray-100">
        {/* Decorative geometric accent */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-5 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 80% 50%, #1fc0d9 0%, transparent 70%)' }} />
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-20 items-start">
            
            {/* Left — Carolina González Profile & GDPR Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              <span className="text-brand-blue-600 font-bold tracking-widest uppercase text-xs mb-6 block">
                Atención Personalizada
              </span>
              
              {/* Profile Card */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                <img
                  src="/carolina.jpg"
                  alt="Carolina González - Asesora Inmobiliaria"
                  className="w-28 h-28 md:w-32 md:h-32 rounded-[2rem] object-cover object-top border border-gray-100 shadow-md shrink-0"
                />
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl font-black text-editorial-black tracking-tight leading-tight">
                    Carolina González
                  </h3>
                  <span className="inline-block text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue-600 mt-1.5">
                    Asesora Inmobiliaria & Marketing
                  </span>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-2 font-semibold">
                    ZONA: GANDÍA & COSTA · IDIOMAS: ES, EN
                  </p>
                </div>
              </div>

              {/* Message block */}
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Hola, soy Carolina González. Estoy a tu disposición para diseñar la mejor estrategia de comercialización para tu propiedad con el <strong>Método MIA</strong>, o para ayudarte a encontrar el hogar ideal en Gandía y la costa de Valencia. Escríbeme directamente o solicita una cita.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={() => {
                    const inputEl = document.getElementById('form-name-home_page');
                    if (inputEl) {
                      inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      inputEl.focus();
                    }
                  }}
                  className="h-12 px-8 bg-editorial-black text-white text-[10px] font-black uppercase tracking-[0.15em] rounded-full hover:bg-gray-900 active:scale-[0.98] transition-all duration-200 shadow-sm"
                >
                  Pide tu cita
                </button>
                
                <a
                  href="https://wa.me/34647803355?text=Hola%20Carolina%2C%20me%20gustar%C3%ADa%20recibir%20asesoramiento%20inmobiliario"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 px-8 border border-gray-200 hover:border-editorial-black text-editorial-black text-[10px] font-black uppercase tracking-[0.15em] rounded-full active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <WhatsappLogo weight="fill" className="w-4 h-4 text-green-500" />
                  WhatsApp directo
                </a>
              </div>

              {/* RGPD Accordion */}
              <div className="border border-gray-100 rounded-2xl p-5 bg-[#F8FAFC]/60 shadow-sm">
                <button
                  onClick={() => setRgpdOpen(!rgpdOpen)}
                  className="w-full flex justify-between items-center text-xs font-bold uppercase tracking-[0.1em] text-gray-700 focus:outline-none"
                  aria-expanded={rgpdOpen}
                >
                  <span>Información básica sobre protección de datos</span>
                  <span 
                    className="material-symbols-outlined text-lg transition-transform duration-300"
                    style={{ transform: rgpdOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                  >
                    expand_more
                  </span>
                </button>
                
                {rgpdOpen && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-5 space-y-3.5 text-[11px] text-gray-600 leading-relaxed border-t border-gray-200/50 pt-5 text-left"
                  >
                    <p><strong>Responsable del tratamiento:</strong> VIVIENDAS DE LA SAFOR SL</p>
                    <p><strong>Dirección del responsable:</strong> Calle Sant Vicent Ferrer 24, CP 46702, GANDIA (Valencia/València)</p>
                    <p><strong>Finalidad:</strong> Sus datos serán usados para poder atender sus solicitudes y prestarle nuestros servicios.</p>
                    <p><strong>Publicidad:</strong> Solo le enviaremos publicidad con su autorización previa, que podrá facilitarnos mediante la casilla correspondiente establecida al efecto.</p>
                    <p><strong>Legitimación:</strong> Únicamente trataremos sus datos con su consentimiento previo, que podrá facilitarnos mediante la casilla correspondiente establecida al efecto.</p>
                    <p><strong>Destinatarios:</strong> Con carácter general, solo el personal de nuestra entidad que esté debidamente autorizado podrá tener conocimiento de la información que le pedimos.</p>
                    <p><strong>Derechos:</strong> Tiene derecho a saber qué información tenemos sobre usted, corregirla y eliminarla, tal y como se explica en la información adicional disponible en nuestra página web.</p>
                    <p><strong>Información adicional:</strong> Más información en el apartado "POLÍTICA DE PRIVACIDAD" de nuestra página web.</p>
                  </motion.div>
                )}
              </div>

            </motion.div>

            {/* Right — Contact Form */}
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