import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Sell: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [activeStep, setActiveStep] = useState(1);

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

      {/* Pack Visual PRO Section (Instagram Inspired) */}
      <section className="bg-editorial-black text-white py-24 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-xs font-medium tracking-widest uppercase mb-4">{t('sell.visual.title')}</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">{t('sell.visual.subtitle')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Professional Photography */}
            <div className="group relative aspect-[4/3] overflow-hidden bg-gray-900">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2664&auto=format&fit=crop")' }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <span className="material-symbols-outlined text-4xl mb-3 text-white/90">photo_camera</span>
                <h3 className="text-xl font-bold mb-1">{t('sell.visual.photo')}</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">{t('sell.visual.photo_desc')}</p>
              </div>
            </div>

            {/* 2. Cinematic Video */}
            <div className="group relative aspect-[4/3] overflow-hidden bg-gray-900">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1512403754473-27835f7b9984?q=80&w=2670&auto=format&fit=crop")' }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md bg-white/10 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <span className="material-symbols-outlined text-2xl">play_arrow</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <span className="material-symbols-outlined text-4xl mb-3 text-white/90">videocam</span>
                <h3 className="text-xl font-bold mb-1">{t('sell.visual.video')}</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">{t('sell.visual.video_desc')}</p>
              </div>
            </div>

            {/* 3. Drone Cinematography */}
            <div className="group relative aspect-[4/3] overflow-hidden bg-gray-900">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2670&auto=format&fit=crop")' }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <span className="material-symbols-outlined text-4xl mb-3 text-white/90">flight</span>
                <h3 className="text-xl font-bold mb-1">{t('sell.visual.drone')}</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">{t('sell.visual.drone_desc')}</p>
              </div>
            </div>

            {/* 4. Virtual Tour */}
            <div className="group relative aspect-[4/3] overflow-hidden bg-gray-900">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop")' }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md bg-white/10 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <span className="material-symbols-outlined text-2xl">360</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <span className="material-symbols-outlined text-4xl mb-3 text-white/90">view_in_ar</span>
                <h3 className="text-xl font-bold mb-1">{t('sell.visual.tour')}</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">{t('sell.visual.tour_desc')}</p>
              </div>
            </div>

            {/* 5. 3D Floor Plan */}
            <div className="group relative aspect-[4/3] overflow-hidden bg-gray-900">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1599809275372-b7c5950a7c4a?q=80&w=2670&auto=format&fit=crop")' }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <span className="material-symbols-outlined text-4xl mb-3 text-white/90">floor</span>
                <h3 className="text-xl font-bold mb-1">{t('sell.visual.plan')}</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">{t('sell.visual.plan_desc')}</p>
              </div>
            </div>

            {/* 6. AI Rendering */}
            <div className="group relative aspect-[4/3] overflow-hidden bg-gray-900">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                style={{ backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1680100256127-e73d3f1f3376?q=80&w=2544&auto=format&fit=crop")' }}
              ></div>
              <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded tracking-widest uppercase">
                AI Enhanced
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <span className="material-symbols-outlined text-4xl mb-3 text-white/90">auto_awesome</span>
                <h3 className="text-xl font-bold mb-1">{t('sell.visual.render')}</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">{t('sell.visual.render_desc')}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-32 px-6 lg:px-24 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <div className="md:w-1/2">
              <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block">{t('sell.process.label')}</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">{t('sell.process.title')}</h2>
            </div>
            <div className="md:w-1/2 md:text-right hidden md:block">
              <p className="text-gray-400 text-lg max-w-md ml-auto">
                A refined journey from valuation to closing.
              </p>
            </div>
          </div>

          {/* Horizontal Process Slider */}
          <div className="relative">
            {/* Progress Bar Line */}
            <div className="absolute top-[24px] left-0 right-0 h-px bg-gray-200 hidden md:block"></div>

            {/* Navigation Steps */}
            <div className="flex justify-between items-start relative z-10 mb-16 overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
              {[1, 2, 3, 4, 5].map((step) => (
                <button
                  key={step}
                  onClick={() => setActiveStep(step)}
                  className={`flex flex-col items-center group min-w-[100px] md:min-w-0 transition-all duration-300 ${activeStep === step ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                >
                  <div className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold border-2 transition-all duration-300 mb-6 bg-white 
                    ${activeStep === step ? 'border-editorial-black text-editorial-black scale-110 shadow-lg' : 'border-gray-200 text-gray-400 group-hover:border-gray-400'}`}>
                    0{step}
                  </div>
                  <span className={`text-sm font-bold uppercase tracking-widest text-center max-w-[150px] hidden md:block transition-colors duration-300 ${activeStep === step ? 'text-editorial-black' : 'text-gray-400'}`}>
                    {t(`sell.step${step}`)}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Content Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center bg-editorial-gray p-8 md:p-16 rounded-sm transition-all duration-500 min-h-[400px]">
              <div className="order-2 md:order-1">
                <span className="text-9xl font-black text-white/50 block leading-none -ml-2 mb-6 select-none">0{activeStep}</span>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-editorial-black">{t(`sell.step${activeStep}`)}</h3>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">{t(`sell.step${activeStep}.desc`)}</p>
              </div>
              <div className="order-1 md:order-2 h-full min-h-[300px] bg-white border border-gray-100 p-8 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <span className="material-symbols-outlined text-9xl">
                    {activeStep === 1 ? 'analytics' :
                      activeStep === 2 ? 'camera_indoor' :
                        activeStep === 3 ? 'rocket_launch' :
                          activeStep === 4 ? 'handshake' : 'verified'}
                  </span>
                </div>
                <div className="relative z-10 text-center">
                  <span className="material-symbols-outlined text-6xl mb-6 text-editorial-black">
                    {activeStep === 1 ? 'analytics' :
                      activeStep === 2 ? 'camera_indoor' :
                        activeStep === 3 ? 'rocket_launch' :
                          activeStep === 4 ? 'handshake' : 'verified'}
                  </span>
                  <p className="text-sm uppercase tracking-widest text-gray-400 font-bold">Essencia Standard</p>
                </div>
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

      <section className="py-32 bg-white relative">
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-8 text-editorial-black tracking-tighter">{t('sell.ready.title')}</h2>
          <p className="text-xl text-gray-500 mb-16 font-light max-w-2xl mx-auto">{t('sell.ready.subtitle')}</p>

          <form className="max-w-2xl mx-auto" onSubmit={handleStartValuation}>
            <div className="relative group">
              <input
                className="w-full h-20 px-0 bg-transparent text-editorial-black placeholder-gray-300 border-b-2 border-gray-200 focus:border-editorial-black focus:ring-0 text-3xl md:text-4xl font-bold tracking-tight text-center transition-all duration-300 outline-none"
                placeholder={t('home.value.placeholder') + '...'}
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-editorial-black transition-all duration-500 group-hover:w-full"></div>
            </div>

            <div className="mt-12">
              <button type="submit" className="h-16 px-12 bg-editorial-black hover:bg-primary text-white text-lg font-bold uppercase tracking-widest whitespace-nowrap transition-all rounded-none shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                {t('sell.hero.start')}
              </button>
            </div>
          </form>
          <p className="mt-12 text-xs text-gray-400 uppercase tracking-widest">{t('sell.disclaimer')}</p>
        </div>
      </section>
    </>
  );
};

export default Sell;