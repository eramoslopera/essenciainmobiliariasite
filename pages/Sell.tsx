import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { fetchProperties } from '../src/utils/xmlParser';
import { Property } from '../src/types/property';
import { fallbackProperties } from '../src/data/fallbackProperties';

import SEOHead from '../components/SEOHead';
import VisualProSection from '../components/VisualProSection';
import ProcessSteps from '../components/ProcessSteps';
import MiaMethodSection from '../components/MiaMethodSection';
import ManagementClosingSection from '../components/ManagementClosingSection';
import ContactForm from '../components/ContactForm';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  }
};

const Sell: React.FC = () => {
  const { t } = useLanguage();
  const [soldProperties, setSoldProperties] = useState<Property[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await fetchProperties();
        const sold = data.filter(p => p.status === 'sold');
        if (sold.length > 0) {
          setSoldProperties(sold);
        } else {
          // Si el XML del CRM viene vacío, usamos los de respaldo filtrados
          setSoldProperties(fallbackProperties.filter(p => p.status === 'sold'));
        }
      } catch (err) {
        console.error('Error loading sold properties:', err);
        setSoldProperties(fallbackProperties.filter(p => p.status === 'sold'));
      }
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

  const logos = [
    { src: '/logo-idealista.png', alt: 'idealista.com', height: 'h-8 md:h-10' },
    { src: '/logo-kyero.png', alt: 'kyero', height: 'h-10 md:h-12' },
    { src: '/logo-pisos.png', alt: 'pisos.com', height: 'h-7 md:h-9' },
    { src: '/logo-habitaclia.jpg', alt: 'habitaclia', height: 'h-10 md:h-12' },
    { src: '/logo-fotocasa.png', alt: 'Fotocasa Sello de Calidad', height: 'h-24 md:h-28' },
    { src: '/logo-caixabank.jpg', alt: 'CaixaBank FaciliteaCasa', height: 'h-10 md:h-12' }
  ];

  return (
    <>
      <SEOHead
        title="Vende tu Propiedad con Marketing Premium"
        description="Vende tu vivienda en Gandia y Valencia con Essencia Inmobiliaria. Home staging profesional, fotografía editorial, recorridos virtuales y alcance internacional."
        canonical="https://essenciainmobiliaria.com/sell"
      />

      {/* ─── 1. HERO ASIMÉTRICO ─── */}
      <section className="relative pt-28 pb-20 min-h-[100dvh] flex items-center justify-center overflow-hidden bg-white">
        {/* Capa de imagen de fondo */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD6CVDb-uj3cAC0Ob6Xoldojbr8fXAlqgRkajY38_fEYtheLsJfhvgNqCXQoidNSph5pxxTIA4A-xhr-pY90ZuV6kh2DC_7KoE4yBIYtDccfKzP1CcdpXDsNXLOROI7cvlTEDUDGK7e7POqLad-y3lLKyfffcbEcwqN9yGejMHM5xKcKUdYutySJ4gKxwHil_TPn5cms3boBRB4bDas5vt7CzfzSedfRnX3LOZiliuJrw2B0gk4vAdiAgkIfndu1DmSEjAfvSQw")',
            }}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Degradado premium difuminado */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/30 md:from-white md:via-white/98 md:to-white/40" />
        </div>

        <div className="relative z-10 max-w-[1240px] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
          
          {/* Columna Izquierda: Copia tipográfica y viñetas */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-block py-1.5 px-4 mb-6 text-[10px] font-black tracking-[0.2em] uppercase bg-editorial-black text-white rounded-full">
                {t('sell.hero.tag') || "EDICIÓN VENDEDORES"}
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-[clamp(2.5rem,5vw,5rem)] font-black leading-[0.95] tracking-[-0.03em] mb-6 text-editorial-black">
              {t('sell.hero.title') || "Tu Estrategia."}<br />
              <span className="text-brand-blue-500 font-extrabold font-serif italic font-normal">
                {t('sell.hero.subtitle') || "Tus Resultados."}
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-700 mb-8 font-medium leading-relaxed max-w-[50ch]">
              {t('sell.hero.desc') || "Orquestamos la venta de tu propiedad con la precisión de un reloj suizo y el alcance de una firma de medios internacional."}
            </motion.p>

            {/* Listado de inclusiones MIA */}
            <motion.ul variants={itemVariants} className="space-y-4 mb-10 text-gray-700 text-sm font-semibold max-w-xl">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-brand-blue-50 border border-brand-blue-200/50 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1fc0d9" strokeWidth="3.5"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <span><strong>Venta rápida verificada:</strong> Media de 45 días por transacción en la comarca de Gandía y Valencia.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-brand-blue-50 border border-brand-blue-200/50 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1fc0d9" strokeWidth="3.5"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <span><strong>Marketing editorial premium:</strong> Home staging profesional, tomas con dron 4K y recorridos en 3D.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-brand-blue-50 border border-brand-blue-200/50 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1fc0d9" strokeWidth="3.5"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <span><strong>Defensa legal y fiscal 360º:</strong> Gestión de plusvalías, trámites de herencia y notaría incluidos.</span>
              </li>
            </motion.ul>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link
                to="/valuation"
                className="h-14 px-10 bg-editorial-black text-white text-[10px] font-black tracking-[0.2em] uppercase rounded-full shadow-diffusion hover:-translate-y-1 transition-all duration-300 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-editorial-black"
              >
                {t('sell.cta.valuation') || "VALORACIÓN GRATUITA"}
              </Link>
              <a
                href="https://wa.me/34647803355?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20asesoramiento%20para%20vender%20mi%20vivienda"
                target="_blank"
                rel="noopener noreferrer"
                className="h-14 px-10 border border-gray-200 hover:border-editorial-black text-editorial-black bg-white/70 backdrop-blur-sm text-[10px] font-black tracking-[0.2em] uppercase rounded-full hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-editorial-black"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-green-500"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.004 5.319 5.322.002 11.838.002c3.158 0 6.128 1.232 8.361 3.466 2.233 2.233 3.465 5.203 3.465 8.361 0 6.518-5.317 11.838-11.838 11.838-2.006 0-3.978-.511-5.727-1.488L0 24zm6.59-4.846c1.6.95 3.197 1.45 4.675 1.45 5.378 0 9.755-4.377 9.755-9.755 0-5.378-4.377-9.755-9.755-9.755-5.38 0-9.757 4.377-9.757 9.755 0 1.636.467 3.238 1.354 4.654L1.73 19.86l4.917-1.291zM17.47 14.397c-.322-.162-1.905-.94-2.2-.108c-.295.342-.76.94-.93 1.134-.175.195-.349.21-.67.049a8.47 8.47 0 0 1-2.482-1.53c-1.927-1.72-3.23-3.846-3.602-4.484c-.372-.64.085-.926.27-.123.164.323.37.77.56 1.109c.19.342.164.64.049.885-.115.244-.94 2.263-1.15 2.766-.206.495-.413.418-.567.418-.147 0-.315-.015-.483-.015a.93.93 0 0 1-.677.315c-.244.259-.93.91-.93 2.217s.95 2.563 1.085 2.748c.135.185 1.87 2.854 4.53 4.004c.633.273 1.125.437 1.512.56.637.203 1.218.175 1.678.105c.513-.075 1.905-.78 2.174-1.53c.27-.75.27-1.395.19-1.53c-.08-.135-.295-.323-.62-.485z"/></svg>
                CONSULTA DE VENTA
              </a>
            </motion.div>
          </motion.div>

          {/* Columna Derecha: Tarjeta de Éxito Flotante */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-blue-500/10 to-transparent rounded-[3rem] blur-3xl pointer-events-none" />
            
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative bg-white rounded-[2.5rem] border border-gray-100 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_20px_50px_rgba(0,0,0,0.06)] max-w-[380px] group overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Contenedor de la Imagen */}
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] mb-6">
                <img
                  src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80"
                  alt="Chalet de lujo vendido en Gandía"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale-[5%]"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-[9px] font-black tracking-widest uppercase bg-editorial-black text-white px-3 py-1.5 rounded-full">
                    VENDIDO · MÉTODO MIA
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="text-[9px] font-bold tracking-wider px-2.5 py-1 rounded bg-white/95 text-gray-700 backdrop-blur-sm shadow-sm">
                    Ref: V-CH-754
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-editorial-black leading-tight mb-4">
                Chalet Moderno con Piscina Privada
              </h3>

              {/* Indicadores de éxito reales */}
              <div className="space-y-2.5 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center text-xs font-bold text-gray-400">
                  <span>PLAZO DE VENTA</span>
                  <span className="text-brand-blue-600 font-extrabold">15 DÍAS</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-gray-400">
                  <span>PRECIO DE CIERRE</span>
                  <span className="text-green-600 font-extrabold">100% SOLICITADO</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-gray-400">
                  <span>IMPACTO TOTAL</span>
                  <span className="text-editorial-black font-extrabold">+2M IMPACTOS</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Indicador de scroll */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Descubre</span>
          <span className="material-symbols-outlined text-gray-400 text-sm">arrow_downward</span>
        </motion.div>
      </section>

      {/* ─── 2. BENTO GRID DE SERVICIOS (Servicio Completo) ─── */}
      <section className="bg-editorial-black text-white py-24 md:py-32 px-6">
        <div className="max-w-[1240px] mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-black tracking-[0.25em] uppercase text-brand-blue-500 text-center mb-4 block"
          >
            EXCELENCIA 360º
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-center mb-6 tracking-tighter max-w-3xl mx-auto leading-tight"
          >
            {t('sell.package.title') || "Servicio Completo"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg text-center max-w-2xl mx-auto mb-16 leading-relaxed"
          >
            {t('sell.package.desc') || "Manejamos la complejidad. Usted disfruta del cierre. Un enfoque integral que cubre cada detalle legal y creativo."}
          </motion.p>

          {/* Bento Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {/* Bento 1: Marketing Editorial (2 columnas) */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.005 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="md:col-span-2 group relative overflow-hidden rounded-[2.5rem] border border-white/10 p-10 hover:border-brand-blue-500/50 hover:bg-white/5 transition-all duration-300 flex flex-col justify-between min-h-[320px] cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 text-brand-blue-400 group-hover:bg-brand-blue-500 group-hover:text-editorial-black transition-colors duration-300">
                  <span className="material-symbols-outlined text-2xl">photo_camera</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-4">{t('sell.card1.title') || "Marketing Editorial de Lujo"}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-[50ch]">
                  Posicionamos tu propiedad como una obra de arte. Reportajes fotográficos y de video con calidad de revista de diseño, tomas con dron 4K y Home Staging virtual para cautivar a compradores exigentes.
                </p>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
                {['Fotografía y video 4K profesional', 'Sindicación premium internacional', 'Campañas hiper-segmentadas'].map((text) => (
                  <li key={text} className="flex items-center gap-2 text-gray-300 text-xs font-semibold">
                    <span className="material-symbols-outlined text-brand-blue-400 text-base">check_circle</span>
                    {text}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Bento 2: Defensa Legal (1 columna) */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.005 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 p-10 hover:border-brand-blue-500/50 hover:bg-white/5 transition-all duration-300 flex flex-col justify-between min-h-[320px] cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 text-brand-blue-400 group-hover:bg-brand-blue-500 group-hover:text-editorial-black transition-colors duration-300">
                  <span className="material-symbols-outlined text-2xl">gavel</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-4">{t('sell.card2.title') || "Defensa Legal Completa"}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Tramitamos todos los documentos necesarios de forma gratuita: certificado energético, cédula de habitabilidad y auditoría urbanística completa para una venta 100% segura.
                </p>
              </div>
              <ul className="space-y-3 relative z-10">
                {['Certificado de Eficiencia Energética', 'Cédula de habitabilidad', 'Verificación registral y de cargas'].map((text) => (
                  <li key={text} className="flex items-center gap-2 text-gray-300 text-xs font-semibold">
                    <span className="material-symbols-outlined text-brand-blue-400 text-base">check_circle</span>
                    {text}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Bento 3: Gestión Fiscal e Impuestos (1 columna) */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.005 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 p-10 hover:border-brand-blue-500/50 hover:bg-white/5 transition-all duration-300 flex flex-col justify-between min-h-[320px] cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 text-brand-blue-400 group-hover:bg-brand-blue-500 group-hover:text-editorial-black transition-colors duration-300">
                  <span className="material-symbols-outlined text-2xl">account_balance</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-4">{t('sell.card3.title') || "Fiscalidad e Impuestos"}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Calculamos de forma exacta y anticipada tu incremento patrimonial y plusvalías. Te guiamos y representamos legalmente en notaría durante la firma final.
                </p>
              </div>
              <ul className="space-y-3 relative z-10">
                {['Cálculo de Plusvalía municipal', 'Estudio fiscal de IRPF y exenciones', 'Acompañamiento y firma ante notario'].map((text) => (
                  <li key={text} className="flex items-center gap-2 text-gray-300 text-xs font-semibold">
                    <span className="material-symbols-outlined text-brand-blue-400 text-base">check_circle</span>
                    {text}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Bento 4: Tecnología y Portales (2 columnas) */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.005 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="md:col-span-2 group relative overflow-hidden rounded-[2.5rem] border border-white/10 p-10 hover:border-brand-blue-500/50 hover:bg-white/5 transition-all duration-300 flex flex-col justify-between min-h-[320px] cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 text-brand-blue-400 group-hover:bg-brand-blue-500 group-hover:text-editorial-black transition-colors duration-300">
                  <span className="material-symbols-outlined text-2xl">insights</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-4">Tecnología de Vanguardia</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-[50ch]">
                  Maximizamos la difusión de tu propiedad. Sincronizamos tus inmuebles en más de 120 portales nacionales e internacionales y cualificamos los prospectos mediante visitas virtuales en 3D antes de organizar visitas presenciales.
                </p>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
                {['Visita virtual 3D interactiva', 'Sincronización en 120+ portales', 'Cualificación previa del comprador'].map((text) => (
                  <li key={text} className="flex items-center gap-2 text-gray-300 text-xs font-semibold">
                    <span className="material-symbols-outlined text-brand-blue-400 text-base">check_circle</span>
                    {text}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex gap-4 justify-center mt-16"
          >
            <Link
              to="/valuation"
              className="h-14 px-10 bg-white text-editorial-black hover:bg-gray-100 font-black tracking-[0.2em] uppercase rounded-full transition-all active:scale-[0.98] flex items-center gap-3 text-[10px]"
            >
              {t('sell.cta.valuation') || "VALORACIÓN GRATUITA"}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── 3. PROCESS STEPS ─── */}
      <ProcessSteps />

      {/* ─── 4. MÉTODO MIA (10 pasos) ─── */}
      <MiaMethodSection />

      {/* ─── 5. VISUAL PRO (fotografía, staging, 3D) ─── */}
      <VisualProSection />

      {/* ─── 6. GESTIÓN + CIERRE ─── */}
      <ManagementClosingSection />

      {/* ─── 8. SOLD PROPERTIES CAROUSEL (CRM / FALLBACK) ─── */}
      {soldProperties.length > 0 && (
        <section className="py-16 md:py-24 bg-white border-b border-gray-100 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-24">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="block text-[10px] font-black tracking-[0.25em] uppercase text-brand-blue-600 mb-3">
                  Prueba de éxito
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-black text-editorial-black tracking-tight leading-tight m-0">
                  {t('home.recent.title') || "Inmuebles vendidos recientemente"}
                </h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => scroll('left')}
                  aria-label="Scroll left"
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2"
                >
                  <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_back</span>
                </button>
                <button
                  onClick={() => scroll('right')}
                  aria-label="Scroll right"
                  className="w-10 h-10 rounded-full bg-editorial-black text-white flex items-center justify-center hover:bg-black transition-colors focus-visible:outline-none focus-visible:ring-2"
                >
                  <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
                </button>
              </div>
            </div>

            <div
              ref={carouselRef}
              className="flex overflow-x-auto gap-8 pb-8 hide-scrollbar snap-x snap-mandatory scroll-smooth"
            >
              {soldProperties.map((property, idx) => {
                const isFallback = typeof property.id === 'string' && property.id.startsWith('fallback-');
                const targetUrl = isFallback
                  ? `https://wa.me/34647803355?text=Hola%2C%20estoy%20interesado%20en%20una%20propiedad%20similar%20a%20la%20referencia%20${property.ref}`
                  : `/property/${property.id}`;
                const Component = isFallback ? 'a' : Link;
                const linkProps = isFallback
                  ? { href: targetUrl, target: '_blank', rel: 'noopener noreferrer' }
                  : { to: targetUrl };

                return (
                  <Component
                    key={property.id}
                    {...(linkProps as any)}
                    className="snap-center shrink-0 w-[85vw] md:w-[400px] bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_-6px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.14)] transition-shadow duration-300 block group border border-gray-100"
                  >
                    <div
                      className="w-full h-64 bg-cover bg-center group-hover:scale-[1.03] transition-transform duration-700 relative"
                      style={{ backgroundImage: `url("${property.image}")` }}
                    >
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-editorial-black text-white font-black uppercase tracking-widest text-[9px] px-3 py-1.5 rounded-full">
                          {t('home.recent.sold') || "VENDIDA"}
                        </span>
                      </div>
                      {property.ref && (
                        <div className="absolute bottom-4 right-4">
                          <span className="text-[9px] font-bold tracking-wider px-2.5 py-1 rounded bg-white/95 text-gray-700 backdrop-blur-sm shadow-sm">
                            Ref: {property.ref}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 relative z-10 bg-white">
                      <div className="mb-4">
                        <p className="text-[11px] font-semibold text-gray-400 mb-1 tracking-wide truncate">
                          {property.location}
                        </p>
                        <h3 className="text-base font-bold text-editorial-black leading-tight group-hover:text-brand-blue-600 transition-colors truncate">
                          {property.title}
                        </h3>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <div className="flex items-baseline">
                          <span className="text-sm font-black text-gray-400 line-through mr-2">{property.price}</span>
                          <span className="text-[10px] font-black text-green-600 uppercase bg-green-50 px-2 py-0.5 rounded border border-green-200/50">
                            Vendido
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                          {property.size && (
                            <span className="flex items-center gap-1">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="1"/></svg>
                              {property.size}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Component>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── 9. VISIBILIDAD EN PORTALES CON LOGOS OFICIALES ─── */}
      <section className="py-20 md:py-24 bg-white overflow-hidden border-t border-gray-100">
        <div className="max-w-[1240px] mx-auto px-6 text-center">
          <p className="text-[10px] font-black tracking-[0.25em] uppercase text-brand-blue-600 mb-12">
            {t('sell.portals.title') || "MÁXIMA DIFUSIÓN DE TU VIVIENDA"}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 lg:gap-20">
            {logos.map((logo, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="flex items-center justify-center shrink-0 cursor-default grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className={`${logo.height} w-auto object-contain select-none`}
                />
              </motion.div>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t border-gray-100 flex flex-wrap justify-center items-center gap-6 md:gap-10 text-gray-400 text-xs font-bold tracking-widest uppercase">
            <span>MIEMBRO DE MLS GANDÍA</span>
            <span className="hidden md:inline text-gray-300 text-base">•</span>
            <span>ASOCIADO ASICVAL</span>
            <span className="hidden md:inline text-gray-300 text-base">•</span>
            <span>SOCIO ESTRATÉGICO DE MARKETING</span>
          </div>
        </div>
      </section>

      {/* ─── 10. FINAL CTA ─── */}
      <section className="py-16 md:py-32 bg-gray-50 relative border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 md:mb-8 text-editorial-black tracking-tighter">
            {t('sell.ready.title') || "¿Estás listo para vender?"}
          </h2>
          <p className="text-lg md:text-xl text-gray-500 mb-10 md:mb-16 font-light max-w-2xl mx-auto">
            {t('sell.ready.subtitle') || "Obtén una valoración real de tu propiedad y diseña la mejor estrategia de mercado."}
          </p>

          <ContactForm theme="light" defaultReason="sell" source="sell_page" className="max-w-2xl mx-auto text-left" />
          <p className="mt-8 md:mt-12 text-[10px] text-gray-400 uppercase tracking-widest text-center">{t('sell.disclaimer')}</p>
        </div>
      </section>
    </>
  );
};

export default Sell;