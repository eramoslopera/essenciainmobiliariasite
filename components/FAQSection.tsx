import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ_DATA = [
  {
    id: '01',
    question: '¿Cuánto tardáis en vender una propiedad?',
    answer: 'Gracias a nuestro Método MIA y el alcance de las campañas de marketing avanzadas, el promedio de venta es de menos de 45 días. Preparamos tu casa para que brille en el mercado desde el minuto cero.'
  },
  {
    id: '02',
    question: '¿Qué diferencia al Método MIA de lo tradicional?',
    answer: 'No subimos un anuncio y esperamos a que llamen. Invertimos activamente en publicidad digital, inteligencia artificial y producción audiovisual (drones, 3D, vídeo cine) para convertir tu casa en un evento mediático.'
  },
  {
    id: '03',
    question: '¿Tengo que pagar algo por adelantado?',
    answer: 'En absoluto. Nosotros asumimos toda la inversión inicial del marketing, reportajes y posicionamiento. Solo ganamos si tú vendes. Alineamos nuestros objetivos al 100% con los tuyos.'
  },
  {
    id: '04',
    question: '¿Qué abarca la Gestión Integral del Pack Essencia?',
    answer: 'Desde la primera tasación hasta la firma en notaría. Nos encargamos del papeleo legal, certificados energéticos, filtrado financiero de compradores y asesoramiento fiscal para que no tengas que preocuparte de nada.'
  },
  {
    id: '05',
    question: '¿Trabajáis con compradores internacionales?',
    answer: 'Sí. Colaboramos con una red de más de 400 inmobiliarias nacionales e internacionales y lanzamos campañas segmentadas en portales extranjeros, atrayendo a compradores de toda Europa que buscan invertir en Gandía.'
  }
];

const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="py-24 px-6 bg-white overflow-hidden selection:bg-brand-blue-500 selection:text-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-16">
          <span className="inline-block text-[11px] font-black uppercase tracking-[0.2em] text-brand-blue-600 mb-4">
            Transparencia Total
          </span>
          <h2 className="text-[clamp(3rem,7vw,5.5rem)] font-black text-editorial-black leading-[0.95] tracking-[-0.04em]">
            Dudas<br />Resueltas.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-24 items-start">
          {/* Columna Izquierda: Lista de Preguntas */}
          <div className="flex flex-col">
            {FAQ_DATA.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <div 
                  key={item.id} 
                  className={`border-b border-gray-100 relative ${index === 0 ? 'border-t' : ''}`}
                >
                  <button
                    onClick={() => setActiveIndex(isActive && isMobile ? -1 : index)}
                    className="w-full text-left py-10 flex gap-6 items-start group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 rounded-lg -ml-4 pl-4 pr-4 transition-colors"
                  >
                    <span className={`text-sm font-black tabular-nums mt-1.5 transition-colors duration-300 ${isActive && !isMobile ? 'text-brand-blue-600' : 'text-gray-400'}`}>
                      {item.id}
                    </span>
                    <div className="flex-1">
                      <h3 className={`text-[clamp(1.25rem,3vw,1.75rem)] font-black leading-[1.2] tracking-[-0.02em] transition-colors duration-300 ${isActive && !isMobile ? 'text-brand-blue-600' : 'text-editorial-black group-hover:opacity-70'}`}>
                        {item.question}
                      </h3>
                      
                      {/* Acordeón Móvil (Solo visible en pantallas < 1024px) */}
                      <AnimatePresence>
                        {isMobile && isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="pt-6 text-gray-600 text-lg leading-relaxed">
                              {item.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Icono animado para móvil */}
                    <div className="lg:hidden mt-2 relative w-5 h-5 flex-shrink-0">
                      <motion.div 
                        animate={{ rotate: isActive ? 180 : 0 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className={`w-full h-[2px] rounded-full transition-colors ${isActive ? 'bg-brand-blue-600' : 'bg-editorial-black'}`} />
                        <div className={`absolute h-full w-[2px] rounded-full transition-transform duration-300 ${isActive ? 'bg-brand-blue-600 rotate-90 scale-0' : 'bg-editorial-black'}`} />
                      </motion.div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Columna Derecha: Panel Sticky (Solo visible en Desktop) */}
          <div className="hidden lg:block sticky top-32">
            <div className="bg-gray-50 rounded-[2.5rem] p-16 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="w-14 h-14 rounded-full bg-brand-blue-50 flex items-center justify-center mb-8">
                <svg className="w-6 h-6 text-brand-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-xl text-gray-600 leading-[1.7] font-medium">
                    {FAQ_DATA[activeIndex]?.answer}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
