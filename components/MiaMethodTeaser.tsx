import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const MiaMethodTeaser: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section className="py-24 lg:py-32 bg-[#F3F4F6] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue-600 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-[1440px] mx-auto px-6 lg:px-24 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
                    
                    {/* Left: Text & CTA */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-3 mb-6"
                        >
                            <div className="w-8 h-[1px] bg-brand-blue-400" />
                            <span className="text-xs font-black tracking-[0.25em] uppercase text-brand-blue-600">
                                {t('landing.mia.exclusive') || 'NUESTRO MÉTODO EXCLUSIVO'}
                            </span>
                        </motion.div>
                        
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-black text-editorial-black tracking-tighter leading-[1.05] mb-6"
                        >
                            {t('landing.mia.id') || 'Método MÍA'}
                        </motion.h2>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-gray-800 leading-relaxed font-medium max-w-xl mb-12"
                        >
                            {t('home.marketing.subtitle') || 'Nuestro enfoque combina arte con algoritmos. Preparamos, fotografiamos y distribuimos su propiedad como un evento mediático global.'}
                        </motion.p>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <Link 
                              to="/sell" 
                              className="group relative inline-flex items-center gap-6 bg-editorial-black text-white hover:bg-brand-blue-600 h-16 pl-8 pr-2 rounded-full transition-all duration-500 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] overflow-hidden"
                            >
                              <span className="text-xs font-bold tracking-[0.2em] relative z-10 whitespace-nowrap uppercase">
                                {t('home.link.sell') || 'Descubre el Método'}
                              </span>
                              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-105 group-hover:bg-white transition-all duration-300 relative z-10">
                                 <ArrowRight size={20} weight="bold" className="text-white group-hover:text-brand-blue-600" />
                              </div>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right: Steps List */}
                    <div className="w-full lg:w-1/2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                                    className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:border-brand-blue-200 transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-full bg-editorial-gray/30 flex items-center justify-center text-editorial-black font-black text-sm shrink-0">
                                        {step.toString().padStart(2, '0')}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-[0.15em] text-brand-blue-600 font-black mb-0.5">
                                            {t(`landing.mia.step${step}.subtitle`) || `Paso ${step}`}
                                        </span>
                                        <span className="text-sm font-bold text-editorial-black leading-tight">
                                            {t(`landing.mia.step${step}.title`) || 'Descripción del Paso'}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default MiaMethodTeaser;
