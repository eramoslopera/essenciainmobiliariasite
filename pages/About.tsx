import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <section className="relative pt-32 pb-24 bg-editorial-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-6 block">{t('about.agency')}</span>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-12 max-w-4xl leading-[1.1]">
            {t('about.title')}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-gray-800 pt-12">
            <div>
              <p className="text-xl font-medium leading-relaxed text-gray-200">
                {t('about.intro.p1')}
              </p>
            </div>
            <div>
              <p className="text-gray-400 leading-relaxed mb-6">
                {t('about.intro.p2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <h2 className="text-4xl font-black text-editorial-black mb-4">{t('about.collective')}</h2>
            <p className="text-gray-500">{t('about.experts_intro')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="group">
              <div className="aspect-[3/4] overflow-hidden rounded mb-4 bg-gray-100 grayscale hover:grayscale-0 transition-all duration-500">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeO_psb5EsZUge1Q9z9Z0VTEVDOkjmZqJ0_iWuqs1ZjDjturTC925sUpjY4SLbxjQNJNqlgkcv568Kjd5zvvCEIqbffK35jIWjZbAI_u5r_d_Sj57l_m9A8bJN7LcCmSlWATG8dzcBzvdTPFArI7AAtc--NaEpg0seD4lB3ek7ceC2iRhSFh-4fCJ4WP6rjzsj8Ow9cQB3NTjhprnKxcP9IcaFNAN9hsEGC0TUGR1IfZGlIpMPtAeaP1480Wg3sxZR8HyGCiot" alt="Elena Rossi" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-bold text-editorial-black">Elena Rossi</h3>
              <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">{t('team.elena.role')}</p>
              <p className="text-sm text-gray-500">{t('team.elena.desc')}</p>
            </div>

            {/* Team Member 2 */}
            <div className="group">
              <div className="aspect-[3/4] overflow-hidden rounded mb-4 bg-gray-100 grayscale hover:grayscale-0 transition-all duration-500">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSY-PXU4Aos5QXaijac90faiHIS204YriutHKAaYujVG4SZWwVd-HQk8IKShLRCD2mrH-OIVWer2XgAErCzUC_oChNo4RnkugwMaJ3Y-zSOq4-4jfCFa4ISvMZbRaPTdOFCUDu2OiWp1iS4ocb6Hoi5XneGiWUooX_Q_oi2cHRd5pjRF8ffN10TAKH57NDYH0CIdA-DNBnj73Sz9ReE_PJrBw6i0hkrS7KR1gsgila22DVBrYFBJwsrMLzBagtmE9zU1ZrYHK8" alt="Marc Soler" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-bold text-editorial-black">Marc Soler</h3>
              <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">{t('team.marc.role')}</p>
              <p className="text-sm text-gray-500">{t('team.marc.desc')}</p>
            </div>

            {/* Team Member 3 */}
            <div className="group">
              <div className="aspect-[3/4] overflow-hidden rounded mb-4 bg-gray-100 grayscale hover:grayscale-0 transition-all duration-500">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6CVDb-uj3cAC0Ob6Xoldojbr8fXAlqgRkajY38_fEYtheLsJfhvgNqCXQoidNSph5pxxTIA4A-xhr-pY90ZuV6kh2DC_7KoE4yBIYtDccfKzP1CcdpXDsNXLOROI7cvlTEDUDGK7e7POqLad-y3lLKyfffcbEcwqN9yGejMHM5xKcKUdYutySJ4gKxwHil_TPn5cms3boBRB4bDas5vt7CzfzSedfRnX3LOZiliuJrw2B0gk4vAdiAgkIfndu1DmSEjAfvSQw" alt="Sarah Jenkins" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-bold text-editorial-black">Sarah Jenkins</h3>
              <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">{t('team.sarah.role')}</p>
              <p className="text-sm text-gray-500">{t('team.sarah.desc')}</p>
            </div>

            {/* Team Member 4 */}
            <div className="group">
              <div className="aspect-[3/4] overflow-hidden rounded mb-4 bg-gray-100 grayscale hover:grayscale-0 transition-all duration-500">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjzENM8T9Tfr_TKw_FUCGQblUaSNsWttDPWKmig4d9rqpW7zv9dAOGGDCnnsJIEl5MQvTRQ8cIK2_CGc6dAoRcSDwZ4WpcxPFRn_X334-Qd4g3dWHkVhkRlNZtmaniVcP37BOvuGRyDPLcSDaNFsiizx1qPuvcaAHqTS6PCBb5gLGMGoEyq36HuJdYbiAPcNa8a3cfuAKD48IhYvVkAjJFz5ktXpnbJbc4THNxE0FAqxFU8pw2iZOCwUfrMIV3t9BqPlufMZvj" alt="David Ribera" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-bold text-editorial-black">David Ribera</h3>
              <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">{t('team.david.role')}</p>
              <p className="text-sm text-gray-500">{t('team.david.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-editorial-gray">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-10 rounded shadow-sm border border-gray-100">
              <span className="material-symbols-outlined text-4xl text-primary mb-6">diamond</span>
              <h3 className="text-xl font-bold mb-4">{t('about.values.quality')}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {t('about.values.quality_desc')}
              </p>
            </div>
            <div className="bg-white p-10 rounded shadow-sm border border-gray-100">
              <span className="material-symbols-outlined text-4xl text-primary mb-6">public</span>
              <h3 className="text-xl font-bold mb-4">{t('about.values.network')}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {t('about.values.network_desc')}
              </p>
            </div>
            <div className="bg-white p-10 rounded shadow-sm border border-gray-100">
              <span className="material-symbols-outlined text-4xl text-primary mb-6">lock</span>
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