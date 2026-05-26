import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';
import { ADVISORS } from '../components/AdvisorsSection';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <SEOHead
        title="Sobre Nosotros — La Inmobiliaria con Alma"
        description="Conoce a Essencia Inmobiliaria: la agencia inmobiliaria premium de Gandia centrada en marketing editorial, atención personalizada y resultados excepcionales."
        canonical="https://essenciainmobiliaria.com/about"
      />
      <section className="relative pt-40 pb-32 bg-editorial-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-end justify-between gap-12">
          
          <div className="flex-1 max-w-4xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-white/60 font-black tracking-[0.25em] uppercase text-[10px] mb-6 block"
            >
              {t('about.agency')}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="font-display text-6xl md:text-8xl font-black tracking-[-0.03em] leading-[0.95]"
            >
              {t('about.title')}
            </motion.h1>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="lg:w-1/3 flex flex-col gap-6 text-gray-400 text-lg leading-relaxed font-medium"
          >
            <p className="text-white/90 text-xl font-bold">{t('about.intro.p1')}</p>
            <p>{t('about.intro.p2')}</p>
          </motion.div>
        </div>
      </section>


      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="mb-16">
            <h2 className="text-4xl font-black text-editorial-black mb-4">{t('about.collective')}</h2>
            <p className="text-gray-500">{t('about.experts_intro')}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {ADVISORS.map((advisor) => (
              <div key={advisor.id} className="group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[calc(20%-1.6rem)]">
                <div className="aspect-[3/4] overflow-hidden rounded-sm mb-4 bg-gray-100 grayscale hover:grayscale-0 transition-all duration-500 relative">
                  {advisor.photo ? (
                    <img src={advisor.photo} alt={advisor.name} className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#e8f9fc]">
                      <span className="font-black text-[#1fc0d9]/30 tracking-tighter text-3xl">{advisor.initials}</span>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-editorial-black">{advisor.name}</h3>
                <p className="text-xs uppercase tracking-widest text-brand-blue-500 font-bold mb-2">{advisor.role}</p>
                <p className="text-sm text-gray-500">{advisor.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-editorial-gray">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-10 rounded-sm shadow-sm border border-gray-100">
              <span className="material-symbols-outlined text-4xl text-brand-blue-500 mb-6" aria-hidden="true">diamond</span>
              <h3 className="text-xl font-bold mb-4">{t('about.values.quality')}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {t('about.values.quality_desc')}
              </p>
            </div>
            <div className="bg-white p-10 rounded-sm shadow-sm border border-gray-100">
              <span className="material-symbols-outlined text-4xl text-brand-blue-500 mb-6" aria-hidden="true">public</span>
              <h3 className="text-xl font-bold mb-4">{t('about.values.network')}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {t('about.values.network_desc')}
              </p>
            </div>
            <div className="bg-white p-10 rounded-sm shadow-sm border border-gray-100">
              <span className="material-symbols-outlined text-4xl text-brand-blue-500 mb-6" aria-hidden="true">lock</span>
              <h3 className="text-xl font-bold mb-4">{t('about.values.discretion')}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {t('about.values.discretion_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;