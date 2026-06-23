import React from 'react';
import { motion } from 'framer-motion';

export default function AISection() {
  const logos = [
    { src: '/logo-idealista.png', alt: 'idealista.com', height: 'h-8 md:h-10' },
    { src: '/logo-kyero.png', alt: 'kyero', height: 'h-10 md:h-12' },
    { src: '/logo-pisos.png', alt: 'pisos.com', height: 'h-7 md:h-9' },
    { src: '/logo-habitaclia.jpg', alt: 'habitaclia', height: 'h-10 md:h-12' },
    { src: '/logo-fotocasa.png', alt: 'Fotocasa Sello de Calidad', height: 'h-24 md:h-28' },
    { src: '/logo-caixabank.jpg', alt: 'CaixaBank FaciliteaCasa', height: 'h-10 md:h-12' }
  ];

  return (
    <section className="py-20 md:py-24 bg-white overflow-hidden border-t border-gray-100">
      <div className="max-w-[1240px] mx-auto px-6 text-center">
        
        {/* Title */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-black text-editorial-black tracking-tight leading-tight mb-8"
        >
          EXPERTOS EN IA<br />
          <span className="text-brand-blue-500">(INTELIGENCIA ARTIFICIAL)</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-700 text-sm md:text-base font-semibold max-w-4xl mx-auto leading-relaxed mb-16"
        >
          <span className="text-brand-blue-600 font-extrabold">ACELERA LA VENTA DE TU CASA X10.</span> Invertimos +4.000€ mensuales en marketing. Portales inmobiliarios, videollamadas, tours virtuales, planos, vídeos y hasta que el cliente pueda realizar la visita y la reserva desde el sillón de su casa.
        </motion.p>

        {/* Divider */}
        <div className="w-full h-px bg-gray-100 mb-12" />

        {/* Logos Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-10 md:gap-16 lg:gap-20"
        >
          {logos.map((logo, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex items-center justify-center shrink-0 cursor-default"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className={`${logo.height} w-auto object-contain select-none`}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
