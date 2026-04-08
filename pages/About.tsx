import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="group">
              <div className="aspect-[3/4] overflow-hidden rounded-sm mb-4 bg-gray-100 grayscale hover:grayscale-0 transition-all duration-500">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeO_psb5EsZUge1Q9z9Z0VTEVDOkjmZqJ0_iWuqs1ZjDjturTC925sUpjY4SLbxjQNJNqlgkcv568Kjd5zvvCEIqbffK35jIWjZbAI_u5r_d_Sj57l_m9A8bJN7LcCmSlWATG8dzcBzvdTPFArI7AAtc--NaEpg0seD4lB3ek7ceC2iRhSFh-4fCJ4WP6rjzsj8Ow9cQB3NTjhprnKxcP9IcaFNAN9hsEGC0TUGR1IfZGlIpMPtAeaP1480Wg3sxZR8HyGCiot" alt="Elena Rossi" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-bold text-editorial-black">Elena Rossi</h3>
              <p className="text-xs uppercase tracking-widest text-brand-blue-500 font-bold mb-2">{t('team.elena.role')}</p>
              <p className="text-sm text-gray-500">{t('team.elena.desc')}</p>
            </div>

            {/* Team Member 2 */}
            <div className="group">
              <div className="aspect-[3/4] overflow-hidden rounded-sm mb-4 bg-gray-100 grayscale hover:grayscale-0 transition-all duration-500">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSY-PXU4Aos5QXaijac90faiHIS204YriutHKAaYujVG4SZWwVd-HQk8IKShLRCD2mrH-OIVWer2XgAErCzUC_oChNo4RnkugwMaJ3Y-zSOq4-4jfCFa4ISvMZbRaPTdOFCUDu2OiWp1iS4ocb6Hoi5XneGiWUooX_Q_oi2cHRd5pjRF8ffN10TAKH57NDYH0CIdA-DNBnj73Sz9ReE_PJrBw6i0hkrS7KR1gsgila22DVBrYFBJwsrMLzBagtmE9zU1ZrYHK8" alt="Marc Soler" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-bold text-editorial-black">Marc Soler</h3>
              <p className="text-xs uppercase tracking-widest text-brand-blue-500 font-bold mb-2">{t('team.marc.role')}</p>
              <p className="text-sm text-gray-500">{t('team.marc.desc')}</p>
            </div>

            {/* Team Member 3 */}
            <div className="group">
              <div className="aspect-[3/4] overflow-hidden rounded-sm mb-4 bg-gray-100 grayscale hover:grayscale-0 transition-all duration-500">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6CVDb-uj3cAC0Ob6Xoldojbr8fXAlqgRkajY38_fEYtheLsJfhvgNqCXQoidNSph5pxxTIA4A-xhr-pY90ZuV6kh2DC_7KoE4yBIYtDccfKzP1CcdpXDsNXLOROI7cvlTEDUDGK7e7POqLad-y3lLKyfffcbEcwqN9yGejMHM5xKcKUdYutySJ4gKxwHil_TPn5cms3boBRB4bDas5vt7CzfzSedfRnX3LOZiliuJrw2B0gk4vAdiAgkIfndu1DmSEjAfvSQw" alt="Sarah Jenkins" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-bold text-editorial-black">Sarah Jenkins</h3>
              <p className="text-xs uppercase tracking-widest text-brand-blue-500 font-bold mb-2">{t('team.sarah.role')}</p>
              <p className="text-sm text-gray-500">{t('team.sarah.desc')}</p>
            </div>

            {/* Team Member 4 */}
            <div className="group">
              <div className="aspect-[3/4] overflow-hidden rounded-sm mb-4 bg-gray-100 grayscale hover:grayscale-0 transition-all duration-500">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjzENM8T9Tfr_TKw_FUCGQblUaSNsWttDPWKmig4d9rqpW7zv9dAOGGDCnnsJIEl5MQvTRQ8cIK2_CGc6dAoRcSDwZ4WpcxPFRn_X334-Qd4g3dWHkVhkRlNZtmaniVcP37BOvuGRyDPLcSDaNFsiizx1qPuvcaAHqTS6PCBb5gLGMGoEyq36HuJdYbiAPcNa8a3cfuAKD48IhYvVkAjJFz5ktXpnbJbc4THNxE0FAqxFU8pw2iZOCwUfrMIV3t9BqPlufMZvj" alt="David Ribera" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-bold text-editorial-black">David Ribera</h3>
              <p className="text-xs uppercase tracking-widest text-brand-blue-500 font-bold mb-2">{t('team.david.role')}</p>
              <p className="text-sm text-gray-500">{t('team.david.desc')}</p>
            </div>
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