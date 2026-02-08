import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Sell: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');

  const handleStartValuation = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/valuation');
  };

  return (
    <>
      <section className="relative pt-20 min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD6CVDb-uj3cAC0Ob6Xoldojbr8fXAlqgRkajY38_fEYtheLsJfhvgNqCXQoidNSph5pxxTIA4A-xhr-pY90ZuV6kh2DC_7KoE4yBIYtDccfKzP1CcdpXDsNXLOROI7cvlTEDUDGK7e7POqLad-y3lLKyfffcbEcwqN9yGejMHM5xKcKUdYutySJ4gKxwHil_TPn5cms3boBRB4bDas5vt7CzfzSedfRnX3LOZiliuJrw2B0gk4vAdiAgkIfndu1DmSEjAfvSQw")' }}
        ></div>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <span className="inline-block py-1.5 px-4 mb-8 text-xs font-bold tracking-[0.2em] uppercase border border-editorial-black text-editorial-black">
            {t('sell.hero.tag')}
          </span>
          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8 text-editorial-black">
            {t('sell.hero.title')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-gray-800">{t('sell.hero.subtitle')}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            {t('sell.hero.desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/valuation" className="h-14 px-10 bg-editorial-black hover:bg-primary text-white text-base font-bold tracking-widest uppercase rounded-none transition-all shadow-xl flex items-center justify-center gap-3">
              {t('sell.cta.valuation')}
            </Link>
            <Link to="/stories" className="h-14 px-10 bg-transparent border border-editorial-black hover:bg-white text-editorial-black text-base font-bold tracking-widest uppercase rounded-none transition-all flex items-center justify-center gap-3">
              {t('sell.cta.cases')}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-24 bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-16 md:w-1/2">
            <h2 className="text-4xl font-bold tracking-tight mb-4">{t('sell.package.title')}</h2>
            <p className="text-gray-500 text-lg">{t('sell.package.desc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Link to="/contact?interest=Sell+Package:+Marketing" className="group p-10 border border-gray-200 hover:border-editorial-black transition-colors duration-300 bg-white block">
              <span className="material-symbols-outlined text-5xl mb-8 text-primary font-light">campaign</span>
              <h3 className="text-xl font-bold uppercase tracking-wide mb-4">{t('sell.card1.title')}</h3>
              <ul className="space-y-3 text-gray-500">
                <li className="flex items-start gap-3 text-sm">
                  <span className="w-1.5 h-1.5 mt-1.5 bg-gray-300 rounded-full"></span>
                  {t('sell.card1.list1')}
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="w-1.5 h-1.5 mt-1.5 bg-gray-300 rounded-full"></span>
                  {t('sell.card1.list2')}
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="w-1.5 h-1.5 mt-1.5 bg-gray-300 rounded-full"></span>
                  {t('sell.card1.list3')}
                </li>
              </ul>
            </Link>
            {/* Card 2 */}
            <Link to="/contact?interest=Sell+Package:+Legal" className="group p-10 border border-gray-200 hover:border-editorial-black transition-colors duration-300 bg-white block">
              <span className="material-symbols-outlined text-5xl mb-8 text-primary font-light">gavel</span>
              <h3 className="text-xl font-bold uppercase tracking-wide mb-4">{t('sell.card2.title')}</h3>
              <ul className="space-y-3 text-gray-500">
                <li className="flex items-start gap-3 text-sm">
                  <span className="w-1.5 h-1.5 mt-1.5 bg-gray-300 rounded-full"></span>
                  {t('sell.card2.list1')}
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="w-1.5 h-1.5 mt-1.5 bg-gray-300 rounded-full"></span>
                  {t('sell.card2.list2')}
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="w-1.5 h-1.5 mt-1.5 bg-gray-300 rounded-full"></span>
                  {t('sell.card2.list3')}
                </li>
              </ul>
            </Link>
            {/* Card 3 */}
            <Link to="/contact?interest=Sell+Package:+Admin" className="group p-10 border border-gray-200 hover:border-editorial-black transition-colors duration-300 bg-white block">
              <span className="material-symbols-outlined text-5xl mb-8 text-primary font-light">edit_document</span>
              <h3 className="text-xl font-bold uppercase tracking-wide mb-4">{t('sell.card3.title')}</h3>
              <ul className="space-y-3 text-gray-500">
                <li className="flex items-start gap-3 text-sm">
                  <span className="w-1.5 h-1.5 mt-1.5 bg-gray-300 rounded-full"></span>
                  {t('sell.card3.list1')}
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="w-1.5 h-1.5 mt-1.5 bg-gray-300 rounded-full"></span>
                  {t('sell.card3.list2')}
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="w-1.5 h-1.5 mt-1.5 bg-gray-300 rounded-full"></span>
                  {t('sell.card3.list3')}
                </li>
              </ul>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-24 bg-editorial-gray">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block">{t('sell.process.label')}</span>
            <h2 className="text-4xl font-black tracking-tight">{t('sell.process.title')}</h2>
          </div>
          <div className="relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-300 transform md:-translate-x-1/2"></div>
            {/* Step 1 */}
            <div className="relative flex flex-col md:flex-row items-center mb-16 group">
              <div className="md:w-1/2 md:pr-12 md:text-right pl-8 md:pl-0 mb-4 md:mb-0 w-full">
                <h3 className="text-2xl font-bold mb-2 text-editorial-black">{t('sell.step1')}</h3>
                <p className="text-gray-500 text-sm">{t('sell.step1.desc')}</p>
              </div>
              <div className="absolute left-[-5px] md:left-1/2 w-3 h-3 bg-white border-2 border-editorial-black rounded-full transform md:-translate-x-[5px] z-10 group-hover:bg-primary group-hover:border-primary transition-colors"></div>
              <div className="md:w-1/2 md:pl-12 w-full pl-8 md:block hidden">
                <span className="text-6xl font-black text-gray-200">01</span>
              </div>
            </div>
            {/* Step 2 */}
            <div className="relative flex flex-col md:flex-row items-center mb-16 group">
              <div className="md:w-1/2 md:pr-12 md:text-right hidden md:block">
                <span className="text-6xl font-black text-gray-200">02</span>
              </div>
              <div className="absolute left-[-5px] md:left-1/2 w-3 h-3 bg-white border-2 border-editorial-black rounded-full transform md:-translate-x-[5px] z-10 group-hover:bg-primary group-hover:border-primary transition-colors"></div>
              <div className="md:w-1/2 md:pl-12 pl-8 w-full">
                <h3 className="text-2xl font-bold mb-2 text-editorial-black">{t('sell.step2')}</h3>
                <p className="text-gray-500 text-sm">{t('sell.step2.desc')}</p>
              </div>
            </div>
            {/* Step 3 */}
            <div className="relative flex flex-col md:flex-row items-center mb-16 group">
              <div className="md:w-1/2 md:pr-12 md:text-right pl-8 md:pl-0 mb-4 md:mb-0 w-full">
                <h3 className="text-2xl font-bold mb-2 text-editorial-black">{t('sell.step3')}</h3>
                <p className="text-gray-500 text-sm">{t('sell.step3.desc')}</p>
              </div>
              <div className="absolute left-[-5px] md:left-1/2 w-3 h-3 bg-white border-2 border-editorial-black rounded-full transform md:-translate-x-[5px] z-10 group-hover:bg-primary group-hover:border-primary transition-colors"></div>
              <div className="md:w-1/2 md:pl-12 w-full pl-8 md:block hidden">
                <span className="text-6xl font-black text-gray-200">03</span>
              </div>
            </div>
            {/* Step 4 */}
            <div className="relative flex flex-col md:flex-row items-center mb-16 group">
              <div className="md:w-1/2 md:pr-12 md:text-right hidden md:block">
                <span className="text-6xl font-black text-gray-200">04</span>
              </div>
              <div className="absolute left-[-5px] md:left-1/2 w-3 h-3 bg-white border-2 border-editorial-black rounded-full transform md:-translate-x-[5px] z-10 group-hover:bg-primary group-hover:border-primary transition-colors"></div>
              <div className="md:w-1/2 md:pl-12 pl-8 w-full">
                <h3 className="text-2xl font-bold mb-2 text-editorial-black">{t('sell.step4')}</h3>
                <p className="text-gray-500 text-sm">{t('sell.step4.desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-24 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black tracking-tight mb-4">{t('home.marketing.title')}</h2>
              <p className="text-gray-500 max-w-md">{t('home.marketing.subtitle')}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Marketing Card 1 */}
            <Link to="/contact?interest=Marketing+Visuals" className="group relative aspect-[4/5] overflow-hidden bg-gray-100 block">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDSY-PXU4Aos5QXaijac90faiHIS204YriutHKAaYujVG4SZWwVd-HQk8IKShLRCD2mrH-OIVWer2XgAErCzUC_oChNo4RnkugwMaJ3Y-zSOq4-4jfCFa4ISvMZbRaPTdOFCUDu2OiWp1iS4ocb6Hoi5XneGiWUooX_Q_oi2cHRd5pjRF8ffN10TAKH57NDYH0CIdA-DNBnj73Sz9ReE_PJrBw6i0hkrS7KR1gsgila22DVBrYFBJwsrMLzBagtmE9zU1ZrYHK8")' }}
              ></div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2 block">{t('sell.marketing.visuals')}</span>
                <h3 className="text-2xl font-bold text-white">{t('home.marketing.visuals.title')}</h3>
                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                  <p className="text-gray-300 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">{t('home.marketing.visuals.desc')}</p>
                </div>
              </div>
            </Link>
            {/* Marketing Card 2 */}
            <Link to="/contact?interest=3D+Tours" className="group relative aspect-[4/5] overflow-hidden bg-gray-100 lg:translate-y-12 block">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAjzENM8T9Tfr_TKw_FUCGQblUaSNsWttDPWKmig4d9rqpW7zv9dAOGGDCnnsJIEl5MQvTRQ8cIK2_CGc6dAoRcSDwZ4WpcxPFRn_X334-Qd4g3dWHkVhkRlNZtmaniVcP37BOvuGRyDPLcSDaNFsiizx1qPuvcaAHqTS6PCBb5gLGMGoEyq36HuJdYbiAPcNa8a3cfuAKD48IhYvVkAjJFz5ktXpnbJbc4THNxE0FAqxFU8pw2iZOCwUfrMIV3t9BqPlufMZvj")' }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-white/50 flex items-center justify-center backdrop-blur-sm group-hover:bg-white group-hover:text-black text-white transition-all">
                  <span className="material-symbols-outlined text-3xl">3d_rotation</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2 block">{t('sell.marketing.technology')}</span>
                <h3 className="text-2xl font-bold text-white">{t('sell.marketing.3d_tours')}</h3>
                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                  <p className="text-gray-300 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">{t('sell.marketing.3d_desc')}</p>
                </div>
              </div>
            </Link>
            {/* Marketing Card 3 */}
            <Link to="/contact?interest=Syndication" className="group relative aspect-[4/5] overflow-hidden bg-gray-100 block">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBeO_psb5EsZUge1Q9z9Z0VTEVDOkjmZqJ0_iWuqs1ZjDjturTC925sUpjY4SLbxjQNJNqlgkcv568Kjd5zvvCEIqbffK35jIWjZbAI_u5r_d_Sj57l_m9A8bJN7LcCmSlWATG8dzcBzvdTPFArI7AAtc--NaEpg0seD4lB3ek7ceC2iRhSFh-4fCJ4WP6rjzsj8Ow9cQB3NTjhprnKxcP9IcaFNAN9hsEGC0TUGR1IfZGlIpMPtAeaP1480Wg3sxZR8HyGCiot")' }}
              ></div>
              <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2 block">{t('sell.marketing.reach')}</span>
                <h3 className="text-2xl font-bold text-white">{t('home.marketing.syndication.title')}</h3>
                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                  <p className="text-gray-300 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">{t('home.marketing.syndication.desc')}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-32 bg-editorial-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-8">{t('sell.ready.title')}</h2>
          <p className="text-xl text-gray-400 mb-12 font-light max-w-2xl mx-auto">{t('sell.ready.subtitle')}</p>
          <form className="max-w-lg mx-auto flex flex-col sm:flex-row gap-0" onSubmit={handleStartValuation}>
            <input
              className="w-full h-16 px-6 bg-white text-editorial-black placeholder-gray-500 border-none focus:ring-0 text-lg"
              placeholder={t('home.value.placeholder')}
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button type="submit" className="h-16 px-10 bg-primary hover:bg-black text-white text-lg font-bold uppercase tracking-widest whitespace-nowrap transition-colors rounded-none flex items-center justify-center">
              {t('sell.hero.start')}
            </button>
          </form>
          <p className="mt-6 text-sm text-gray-500">{t('sell.disclaimer')}</p>
        </div>
      </section>
    </>
  );
};

export default Sell;