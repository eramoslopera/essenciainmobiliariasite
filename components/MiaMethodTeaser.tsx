import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendUp } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const MiaMethodTeaser: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section className="py-24 lg:py-32 bg-editorial-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue-600/30 blur-[120px] rounded-full mix-blend-screen" />
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
                            <span className="text-[10px] font-black tracking-[0.25em] uppercase text-brand-blue-400">
                                {t('landing.mia.exclusive') || 'NUESTRO MÉTODO EXCLUSIVO'}
                            </span>
                        </motion.div>
                        
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[1.05] mb-6"
                        >
                            {t('landing.mia.id') || 'Método MÍA'}
                        </motion.h2>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-gray-400 leading-relaxed font-medium max-w-xl mb-12"
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
                              className="group relative inline-flex items-center gap-6 bg-white text-editorial-black hover:bg-brand-blue-600 hover:text-white h-16 pl-8 pr-2 rounded-full transition-all duration-500 shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] overflow-hidden"
                            >
                              <span className="text-xs font-bold tracking-[0.2em] relative z-10 whitespace-nowrap uppercase">
                                {t('home.link.sell') || 'Descubre el Método'}
                              </span>
                              <div className="w-12 h-12 rounded-full bg-editorial-black/5 flex items-center justify-center group-hover:scale-105 group-hover:bg-white/20 transition-all duration-300 relative z-10">
                                 <ArrowRight size={20} weight="bold" className="text-current" />
                              </div>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right: Abstract Graphic / Teaser Visual */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-[4/3] w-full max-w-md mx-auto lg:max-w-none flex items-center justify-center rounded-[2rem] overflow-hidden bg-editorial-gray/5 border border-white/10"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue-900/20 to-transparent pointer-events-none" />
                            
                            {/* "10 Steps" Badge focus */}
                            <div className="relative z-10 flex flex-col items-center justify-center">
                                <motion.div 
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-24 h-24 rounded-full bg-brand-blue-600/20 backdrop-blur-xl border border-brand-blue-400/30 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(37,99,235,0.2)]"
                                >
                                    <TrendUp size={48} weight="fill" className="text-brand-blue-400" />
                                </motion.div>
                                
                                <div className="text-center">
                                    <span className="block text-4xl font-black text-white tracking-tighter mb-2">10</span>
                                    <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-brand-blue-400">
                                        Pasos probados
                                    </span>
                                </div>
                            </div>
                            
                            {/* Decorative Grid Lines */}
                            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default MiaMethodTeaser;
