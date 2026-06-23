import React from 'react';
import { Cpu, Eye, Target } from '@phosphor-icons/react';

export default function AISection() {
  const features = [
    {
      icon: <Cpu className="w-5 h-5 text-brand-blue-600" />,
      title: "Renders fotorrealistas con IA",
      desc: "Amueblamos y reformamos virtualmente espacios vacíos o antiguos para enamorar en segundos."
    },
    {
      icon: <Target className="w-5 h-5 text-brand-blue-600" />,
      title: "Segmentación de alta precisión",
      desc: "Dirigimos tu vivienda a compradores cualificados nacionales y extranjeros listos para comprar."
    },
    {
      icon: <Eye className="w-5 h-5 text-brand-blue-600" />,
      title: "Visita inmersiva 3D",
      desc: "Los compradores recorren la propiedad en alta definición e interactúan con cada espacio antes de visitarla."
    }
  ];

  return (
    <div className="w-full flex flex-col">
      {/* ─── PARTE A: EXPERTOS EN IA (Fondo Claro) ─── */}
      <section className="relative py-20 md:py-28 bg-[#F8FAFC] overflow-hidden">
        {/* Background decoration */}
        <div className="absolute left-10 top-1/4 w-[350px] h-[350px] bg-brand-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute right-10 bottom-1/4 w-[450px] h-[450px] bg-brand-blue-400/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
            
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-black tracking-[0.25em] uppercase text-brand-blue-600 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-600 animate-pulse" />
                Tecnología de Vanguardia
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-editorial-black mb-6 tracking-tight leading-[1.05]">
                Expertos en IA <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-600 to-brand-blue-400">
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
        </div>
      </section>

      {/* ─── PARTE B: DÓNDE SE VERÁ TU PROPIEDAD (Fondo Oscuro) ─── */}
      <section className="py-14 md:py-20 bg-editorial-black text-white border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 text-center">
          <p className="text-[11px] font-black tracking-[0.25em] uppercase text-gray-400 mb-12">
            Dónde se verá tu propiedad
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-90 grayscale hover:grayscale-0 transition-all duration-500">
            {/* idealista */}
            <span className="text-3xl font-serif font-bold tracking-tighter hover:text-white transition-colors cursor-default">
              idealista
            </span>
            
            {/* fotocasa */}
            <span className="text-3xl font-sans font-black tracking-tight text-[#ff5a00] hover:opacity-100 transition-opacity cursor-default">
              fotocasa
            </span>
            
            {/* Kyero */}
            <span className="text-3xl font-serif italic font-medium hover:text-white transition-colors cursor-default">
              Kyero
            </span>
            
            {/* HABITACLIA */}
            <span className="text-2xl font-sans font-bold tracking-widest uppercase border-2 border-white px-3 py-1 hover:bg-white hover:text-editorial-black transition-all cursor-default">
              Habitaclia
            </span>
            
            {/* ThinkSPAIN */}
            <span className="text-3xl font-serif font-bold text-[#1fc0d9] hover:opacity-100 transition-opacity cursor-default">
              ThinkSPAIN
            </span>
            
            {/* pisos.com */}
            <span className="text-3xl font-sans font-extrabold tracking-tighter text-[#1fc0d9] hover:opacity-100 transition-opacity cursor-default">
              pisos.com
            </span>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-gray-500 text-[10px] font-black tracking-[0.2em] uppercase">
            <span>Member of MLS Gandía</span>
            <span className="hidden md:inline text-gray-700">•</span>
            <span>ASICVAL Certified</span>
            <span className="hidden md:inline text-gray-700">•</span>
            <span>Luxury Real Estate Partners</span>
          </div>
        </div>
      </section>
    </div>
  );
}
