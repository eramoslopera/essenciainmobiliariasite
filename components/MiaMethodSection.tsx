import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const MiaMethodSection: React.FC = () => {
    const { t } = useLanguage();
    const [activeId, setActiveId] = useState(1);

    const steps = [
        { id: 1, pro: true, icon: "chat" },
        { id: 2, pro: false, icon: "campaign" },
        { id: 3, pro: false, icon: "smart_toy" },
        { id: 4, pro: false, icon: "handshake" },
        { id: 5, pro: false, icon: "verified" },
        { id: 6, pro: true, icon: "flight" },
        { id: 7, pro: false, icon: "photo_camera" },
        { id: 8, pro: false, icon: "public" },
        { id: 9, pro: true, icon: "star" },
        { id: 10, pro: false, icon: "signature" }
    ];

    const activeStep = steps.find(s => s.id === activeId) || steps[0];

    return (
        <section id="mia-method" className="py-24 px-6 lg:px-12 bg-white dark:bg-background-dark relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                <span className="text-[200px] md:text-[300px] font-black text-editorial-black dark:text-white leading-none">MIA</span>
            </div>
            
            <div className="max-w-[1440px] mx-auto relative z-10">
                <div className="flex flex-col xl:flex-row gap-12 lg:gap-20 items-start">
                    
                    {/* Left Column: Context & Interactive Grid */}
                    <div className="w-full xl:w-1/2 flex flex-col gap-10 lg:gap-16">
                        {/* Title Section */}
                        <div>
                            <span className="text-xs lg:text-sm font-black uppercase tracking-[0.2em] text-brand-blue-600 mb-4 block">
                                {t('landing.mia.exclusive')}
                            </span>
                            <h2 className="text-5xl lg:text-7xl font-black text-editorial-black dark:text-white tracking-tighter mb-4">
                                {t('landing.mia.id')}
                            </h2>
                            <p className="text-lg lg:text-xl font-bold text-gray-500 tracking-widest uppercase">
                                {t('landing.mia.subtitle')}
                            </p>
                            <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-xl text-sm lg:text-base leading-relaxed">
                                {t('landing.mia.fundamental')}
                            </p>
                        </div>

                        {/* Interactive Grid Setup (10 Steps -> 2 rows of 5) */}
                        <div className="grid grid-cols-5 gap-2 md:gap-4 relative z-20">
                            {steps.map(step => (
                                <button
                                    key={step.id}
                                    onClick={() => setActiveId(step.id)}
                                    className={`relative flex flex-col gap-2 items-center justify-center aspect-square rounded-2xl transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 focus-visible:ring-offset-2 hover:-translate-y-1 ${
                                        activeId === step.id 
                                        ? 'bg-editorial-black text-white border-editorial-black shadow-[0_15px_30px_-10px_rgba(0,0,0,0.3)] ring-1 ring-editorial-black/5' 
                                        : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:text-editorial-black'
                                    }`}
                                    aria-label={`Paso ${step.id}`}
                                    aria-current={activeId === step.id ? 'step' : undefined}
                                >
                                    <span className="material-symbols-outlined text-2xl md:text-3xl transition-transform duration-300">
                                        {step.icon}
                                    </span>
                                    <span className={`text-[9px] md:text-[11px] font-black uppercase tracking-widest transition-colors ${activeId === step.id ? 'text-gray-300' : 'text-gray-400'}`}>
                                        Paso {step.id}
                                    </span>
                                    {step.pro && (
                                        <div className={`absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-white shadow-sm transition-colors ${activeId === step.id ? 'bg-white' : 'bg-brand-blue-500'}`} />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Display Card */}
                    <div className="w-full xl:w-1/2 min-h-[400px] h-full relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep.id}
                                initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="w-full h-full bg-gray-50 dark:bg-gray-800 rounded-[2rem] p-8 md:p-12 lg:p-16 relative overflow-hidden border border-gray-100 flex flex-col justify-center"
                            >
                                {/* Massive background number */}
                                <div className="absolute -bottom-10 -right-4 text-[250px] font-black text-white dark:text-gray-700 drop-shadow-sm opacity-50 select-none pointer-events-none leading-none tracking-tighter">
                                    {activeStep.id}
                                </div>
                                {/* Soft glow back-drop for pro ones */}
                                {activeStep.pro && (
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
                                )}

                                <div className="relative z-10 flex-1 flex flex-col">
                                    <div className="flex items-start justify-between mb-8 gap-4">
                                        <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-3xl text-brand-blue-600">
                                                {activeStep.icon}
                                            </span>
                                        </div>
                                        {activeStep.pro && (
                                            <span className="bg-editorial-black text-white font-black uppercase tracking-widest text-[10px] px-3 py-1.5 rounded-full shrink-0">
                                                Essencia Pro
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className="mb-4">
                                        <span className="text-[10px] md:text-xs font-black text-brand-blue-600 uppercase tracking-[0.2em] mb-3 block">
                                            {t(`landing.mia.step${activeStep.id}.subtitle`)}
                                        </span>
                                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-editorial-black dark:text-white leading-[1.1] tracking-tighter">
                                            {t(`landing.mia.step${activeStep.id}.title`)}
                                        </h3>
                                    </div>

                                    <div className="w-12 h-1 bg-editorial-black my-6 bg-opacity-20"></div>

                                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                                        {t(`landing.mia.step${activeStep.id}.long_desc`) || t(`landing.mia.step${activeStep.id}.subtitle`)}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default MiaMethodSection;
