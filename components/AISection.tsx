import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Eye, Target, MagnifyingGlass, Video, ShareNetwork } from '@phosphor-icons/react';

interface PortalInfo {
  id: string;
  name: string;
  role: string;
  color: string;
  hoverBg: string;
  logo: React.ReactNode;
}

export default function AISection() {
  const portals: PortalInfo[] = [
    {
      id: 'idealista',
      name: 'idealista',
      role: 'Portal Inmobiliario Nº1 en España · Alcance masivo nacional',
      color: 'hover:text-[#DE4B59]',
      hoverBg: 'hover:bg-[#DE4B59]/5 hover:border-[#DE4B59]/30',
      logo: (
        <div className="flex items-center gap-1.5 font-display select-none">
          <span className="text-3xl font-black tracking-tighter text-current">idealista</span>
          <span className="text-sm font-semibold opacity-60">.com</span>
        </div>
      ),
    },
    {
      id: 'kyero',
      name: 'Kyero',
      role: 'Líder en compradores internacionales · Audiencia de Reino Unido, Alemania y Norte de Europa',
      color: 'hover:text-[#DA1A32]',
      hoverBg: 'hover:bg-[#DA1A32]/5 hover:border-[#DA1A32]/30',
      logo: (
        <div className="flex items-center gap-2 select-none">
          {/* Kyero Arrow/House Logo */}
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M12 2L2 12h3v8h14v-8h3L12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
          </svg>
          <span className="text-2xl font-black tracking-tight text-current">kyero</span>
        </div>
      ),
    },
    {
      id: 'pisos',
      name: 'pisos.com',
      role: 'Máxima difusión nacional · Foco en segundas residencias',
      color: 'hover:text-[#18A0FB]',
      hoverBg: 'hover:bg-[#18A0FB]/5 hover:border-[#18A0FB]/30',
      logo: (
        <div className="flex items-center gap-1 select-none font-display">
          <span className="text-2xl font-black text-current tracking-tighter">pisos</span>
          <span className="text-xl font-light text-current opacity-85">.com</span>
        </div>
      ),
    },
    {
      id: 'habitaclia',
      name: 'habitaclia',
      role: 'Especialista en el arco mediterráneo · Alta penetración local',
      color: 'hover:text-[#FF6B00]',
      hoverBg: 'hover:bg-[#FF6B00]/5 hover:border-[#FF6B00]/30',
      logo: (
        <div className="flex items-center gap-1 select-none font-display">
          <span className="text-2xl font-black tracking-tight text-current">habitaclia</span>
        </div>
      ),
    },
    {
      id: 'fotocasa',
      name: 'Sello de Calidad Fotocasa',
      role: 'Inmobiliaria Certificada y de Confianza 2026 · Sello de Calidad Fotocasa',
      color: 'hover:text-[#104CF5]',
      hoverBg: 'hover:bg-[#104CF5]/5 hover:border-[#104CF5]/30',
      logo: (
        <div className="flex items-center gap-2 select-none">
          <div className="w-8 h-8 rounded-full bg-[#104CF5] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
            FC
          </div>
          <div className="text-left">
            <span className="block text-[11px] font-black tracking-[0.1em] uppercase text-current">SELLO DE CALIDAD</span>
            <span className="block text-xs font-black tracking-tight text-[#104CF5] group-hover:text-current">FOTOCASA 2026</span>
          </div>
        </div>
      ),
    },
    {
      id: 'caixabank',
      name: 'CaixaBank Facilitea',
      role: 'Financiación pre-aprobada para compradores · Sello Facilitea Casa',
      color: 'hover:text-[#009AD9]',
      hoverBg: 'hover:bg-[#009AD9]/5 hover:border-[#009AD9]/30',
      logo: (
        <div className="flex items-center gap-2.5 select-none text-left">
          <div className="flex flex-col">
            <span className="text-[13px] font-black tracking-widest uppercase text-current leading-none">FaciliteaCasa</span>
            <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-widest mt-0.5">CaixaBank</span>
          </div>
          {/* CaixaBank Star Icon */}
          <div className="w-6 h-6 rounded-full bg-[#009AD9] flex items-center justify-center text-white shrink-0">
            <span className="text-[10px] font-bold">★</span>
          </div>
        </div>
      ),
    },
  ];

  const features = [
    {
      icon: <Cpu className="w-5 h-5" />,
      title: "Renders fotorrealistas con IA",
      desc: "Amueblamos y reformamos virtualmente espacios vacíos o antiguos para enamorar en segundos."
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Segmentación de alta precisión",
      desc: "Dirigimos tu vivienda a compradores cualificados nacionales y extranjeros listos para comprar."
    },
    {
      icon: <Eye className="w-5 h-5" />,
      title: "Visita inmersiva 3D",
      desc: "Los compradores recorren la propiedad en alta definición e interactúan con cada espacio antes de visitarla."
    }
  ];

  return (
    <section className="relative py-20 md:py-28 bg-[#F8FAFC] border-t border-gray-100 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute left-10 top-1/4 w-[350px] h-[350px] bg-brand-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute right-10 bottom-1/4 w-[450px] h-[450px] bg-blue-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        
        {/* Header grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-start mb-16">
          
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-black tracking-[0.25em] uppercase text-brand-blue-600 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-600 animate-pulse" />
              Tecnología de Vanguardia
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-editorial-black mb-6 tracking-tight leading-[1.05]">
              Expertos en IA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-600 to-blue-500">
                (Inteligencia Artificial)
              </span>
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed max-w-xl">
              <strong>Acelera la venta de tu casa x10.</strong> Invertimos más de 4.000€ mensuales en marketing activo. Aplicamos inteligencia artificial y herramientas visuales premium para que los compradores puedan realizar visitas, consultar planos interactivos y reservar desde la comodidad de su hogar.
            </p>
          </div>

          {/* AI Features Grid */}
          <div className="grid grid-cols-1 gap-5 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-diffusion">
            <span className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1 block">¿Cómo lo logramos?</span>
            {features.map((feat, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-brand-blue-50 flex items-center justify-center text-brand-blue-600 shrink-0">
                  {feat.icon}
                </div>
                <div>
                  <h4 className="font-bold text-editorial-black text-sm mb-1">{feat.title}</h4>
                  <p className="text-gray-600 text-xs leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Portal Logos Showcase */}
        <div className="border-t border-gray-200/60 pt-16">
          <div className="text-center mb-10">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 block mb-2">Presencia en Canales Clave</span>
            <p className="text-sm text-gray-600">Multiplicamos la visibilidad de tu propiedad indexándola en las plataformas de mayor impacto</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portals.map((portal) => (
              <div
                key={portal.id}
                className={`group bg-white border border-gray-100 rounded-2xl p-6 flex flex-col justify-between min-h-[170px] transition-all duration-300 shadow-sm ${portal.hoverBg} ${portal.color} hover:shadow-md hover:-translate-y-1`}
              >
                {/* Logo wrapper */}
                <div className="text-gray-400 group-hover:text-current transition-colors duration-300 flex items-center h-12">
                  {portal.logo}
                </div>
                
                {/* Details */}
                <div className="mt-4 pt-4 border-t border-gray-100/80 group-hover:border-current/10 transition-colors">
                  <p className="text-xs text-gray-600 group-hover:text-gray-800 leading-relaxed font-medium transition-colors">
                    {portal.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
