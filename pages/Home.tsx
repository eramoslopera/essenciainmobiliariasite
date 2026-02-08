import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 450; // slightly less than card width + gap for context
      const currentScroll = carouselRef.current.scrollLeft;
      const targetScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;

      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <section className="relative h-screen min-h-[700px] w-full flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt={t('home.alt.interior')}
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6CVDb-uj3cAC0Ob6Xoldojbr8fXAlqgRkajY38_fEYtheLsJfhvgNqCXQoidNSph5pxxTIA4A-xhr-pY90ZuV6kh2DC_7KoE4yBIYtDccfKzP1CcdpXDsNXLOROI7cvlTEDUDGK7e7POqLad-y3lLKyfffcbEcwqN9yGejMHM5xKcKUdYutySJ4gKxwHil_TPn5cms3boBRB4bDas5vt7CzfzSedfRnX3LOZiliuJrw2B0gk4vAdiAgkIfndu1DmSEjAfvSQw"
          />
          <div className="absolute inset-0 bg-white/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/30 to-white/70"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          <span className="inline-block py-1 px-4 mb-8 text-xs font-bold tracking-[0.2em] uppercase bg-white/90 backdrop-blur-sm text-charcoal border border-gray-200 rounded-full shadow-sm">
            {t('home.hero.tag')}
          </span>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-extrabold text-editorial-black mb-8 leading-[1.1] tracking-tight">
            {t('home.hero.title1')}<br />
            <span className="text-gray-500">{t('home.hero.title2')}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-12 font-medium leading-relaxed">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <Link to="/valuation" className="h-14 px-10 bg-charcoal hover:bg-black text-white text-sm font-bold tracking-widest uppercase rounded shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center">
              {t('home.hero.cta.valuation')}
            </Link>
            <Link to="/properties" className="group text-editorial-black font-bold text-sm tracking-wide border-b border-editorial-black pb-1 hover:text-primary hover:border-primary transition-all flex items-center gap-2">
              {t('home.hero.cta.sold')}
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-24 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-200 pb-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">{t('home.marketing.title')}</h2>
              <p className="text-gray-500 max-w-md">{t('home.marketing.subtitle')}</p>
            </div>
            <Link to="/sell" className="hidden md:flex items-center gap-2 font-bold hover:text-primary transition-colors mt-6 md:mt-0">
              {t('home.marketing.link')} <span className="material-symbols-outlined">arrow_right_alt</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]">
            <Link to="/sell" className="md:col-span-7 relative group overflow-hidden rounded bg-gray-100 block">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDSY-PXU4Aos5QXaijac90faiHIS204YriutHKAaYujVG4SZWwVd-HQk8IKShLRCD2mrH-OIVWer2XgAErCzUC_oChNo4RnkugwMaJ3Y-zSOq4-4jfCFa4ISvMZbRaPTdOFCUDu2OiWp1iS4ocb6Hoi5XneGiWUooX_Q_oi2cHRd5pjRF8ffN10TAKH57NDYH0CIdA-DNBnj73Sz9ReE_PJrBw6i0hkrS7KR1gsgila22DVBrYFBJwsrMLzBagtmE9zU1ZrYHK8")' }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <span className="material-symbols-outlined text-4xl mb-4 text-primary">chair</span>
                <h3 className="text-2xl font-bold mb-2">{t('home.marketing.staging.title')}</h3>
                <p className="text-gray-300 text-sm max-w-sm">{t('home.marketing.staging.desc')}</p>
              </div>
            </Link>
            <Link to="/sell" className="md:col-span-5 row-span-2 relative group overflow-hidden rounded bg-gray-100 block">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBeO_psb5EsZUge1Q9z9Z0VTEVDOkjmZqJ0_iWuqs1ZjDjturTC925sUpjY4SLbxjQNJNqlgkcv568Kjd5zvvCEIqbffK35jIWjZbAI_u5r_d_Sj57l_m9A8bJN7LcCmSlWATG8dzcBzvdTPFArI7AAtc--NaEpg0seD4lB3ek7ceC2iRhSFh-4fCJ4WP6rjzsj8Ow9cQB3NTjhprnKxcP9IcaFNAN9hsEGC0TUGR1IfZGlIpMPtAeaP1480Wg3sxZR8HyGCiot")' }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <span className="material-symbols-outlined text-4xl mb-4 text-primary">public</span>
                <h3 className="text-2xl font-bold mb-2">{t('home.marketing.syndication.title')}</h3>
                <p className="text-gray-300 text-sm max-w-sm">{t('home.marketing.syndication.desc')}</p>
              </div>
            </Link>
            <Link to="/sell" className="md:col-span-4 bg-editorial-black text-white p-8 flex flex-col justify-between rounded group block transition-colors hover:bg-gray-900">
              <div>
                <span className="material-symbols-outlined text-4xl mb-6 text-primary">camera_alt</span>
                <h3 className="text-xl font-bold mb-4">{t('home.marketing.visuals.title')}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t('home.marketing.visuals.desc')}
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">{t('home.marketing.readmore')}</span>
                  <span className="material-symbols-outlined text-primary">add_circle</span>
                </div>
              </div>
            </Link>
            <Link to="/sell" className="md:col-span-3 relative group overflow-hidden rounded bg-gray-100 block">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 grayscale"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBTz0ljfPf17SA1GJ6uA8AFFp69r4QCIx9qAKheWPLsqb3SR9EiRThZW2pQrqT8Xq0ZMQkBXl7TkM-iW4Lv75dvy8PdbK9O30nJ35aX4fCg0S2feJ6JRYQQUGVRE_VdRjOjItcvyPHOCtbhJGoZS93wph_XgdsTjs-JRfjRxvz_Higm4ZVlH2KwIft4FCcypZ5tuZEmBATyNa2qENR5ZQOIjoGYF2i9mkiBN3wOiCJV8sOAVou3Y3J1JWjUk8qVNOGMTPeMEmtA")' }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-colors">
                <span className="text-white font-bold text-lg border border-white px-4 py-2">{t('home.marketing.details')}</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-editorial-gray overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-24">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">{t('home.recent.title')}</h2>
            <div className="flex gap-2">
              <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-black transition-colors">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-8 pb-8 hide-scrollbar snap-x snap-mandatory scroll-smooth"
          >
            {/* Card 1 */}
            <Link to="/properties" className="snap-center shrink-0 w-[85vw] md:w-[500px] bg-white rounded-lg overflow-hidden shadow-editorial hover:shadow-xl transition-shadow duration-300 block group">
              <div className="w-full h-64 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCCYCoLLGH8m6STpxs2Ok3leDZaZBOdic-RRxvSn3L6SKrp2cUA-O4x0Pu9ufIundVGAsD17DY5fkQxdKGMzKcy4xR0ut31MsMWW5BP3Je_Zf7d8cDI3Z1Bh87chviHz1rJNMgCZD3plwoi1hL7PJjPywPwiCKnlCv2YoNCI4SOeUKrfQdePCHjaTr6aGz-Qi3QhIUGYns-9fd75ddyqDSPSlRpFU9j1mppa5sdr5oHdFOSEP7TLBQR3YMUSIlm9f_83E9pcr9G")' }}>
                <div className="p-4 flex justify-end">
                  <span className="bg-editorial-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">{t('home.recent.sold')}</span>
                </div>
              </div>
              <div className="p-6 relative z-10 bg-white">
                <div className="mb-6">
                  <h3 className="text-xl font-bold leading-tight mb-1 group-hover:text-primary transition-colors">{t('home.recent.card1.title')}</h3>
                  <p className="text-sm text-gray-500">{t('home.location.velazquez')}</p>
                </div>
                <div className="space-y-3 bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 border-dashed">
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-wide">{t('home.recent.listed')}</span>
                    <span className="text-sm font-semibold line-through decoration-red-500 text-gray-400">€1.2M</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 border-dashed">
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-wide">{t('home.recent.sold_price')}</span>
                    <span className="text-sm font-bold text-green-600">€1.15M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-wide">{t('home.recent.time')}</span>
                    <span className="text-sm font-bold text-editorial-black">14 {t('home.recent.days')}</span>
                  </div>
                </div>
              </div>
            </Link>
            {/* Card 2 */}
            <Link to="/properties" className="snap-center shrink-0 w-[85vw] md:w-[500px] bg-white rounded-lg overflow-hidden shadow-editorial hover:shadow-xl transition-shadow duration-300 block group">
              <div className="w-full h-64 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAjzENM8T9Tfr_TKw_FUCGQblUaSNsWttDPWKmig4d9rqpW7zv9dAOGGDCnnsJIEl5MQvTRQ8cIK2_CGc6dAoRcSDwZ4WpcxPFRn_X334-Qd4g3dWHkVhkRlNZtmaniVcP37BOvuGRyDPLcSDaNFsiizx1qPuvcaAHqTS6PCBb5gLGMGoEyq36HuJdYbiAPcNa8a3cfuAKD48IhYvVkAjJFz5ktXpnbJbc4THNxE0FAqxFU8pw2iZOCwUfrMIV3t9BqPlufMZvj")' }}>
                <div className="p-4 flex justify-end">
                  <span className="bg-editorial-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">{t('home.recent.sold')}</span>
                </div>
              </div>
              <div className="p-6 relative z-10 bg-white">
                <div className="mb-6">
                  <h3 className="text-xl font-bold leading-tight mb-1 group-hover:text-primary transition-colors">{t('home.recent.card2.title')}</h3>
                  <p className="text-sm text-gray-500">{t('home.location.germanies')}</p>
                </div>
                <div className="space-y-3 bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 border-dashed">
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-wide">{t('home.recent.listed')}</span>
                    <span className="text-sm font-semibold text-gray-400">€450k</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 border-dashed">
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-wide">{t('home.recent.sold_price')}</span>
                    <span className="text-sm font-bold text-green-600">€465k</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-wide">{t('home.recent.time')}</span>
                    <span className="text-sm font-bold text-editorial-black">3 {t('home.recent.days')}</span>
                  </div>
                </div>
              </div>
            </Link>
            {/* Card 3 */}
            <Link to="/properties" className="snap-center shrink-0 w-[85vw] md:w-[500px] bg-white rounded-lg overflow-hidden shadow-editorial hover:shadow-xl transition-shadow duration-300 block group">
              <div className="w-full h-64 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuApVdluFbbEXPQangUFFxfb62P34yITGii4BnFZ8ma20PBBscwMxMTw-vA8QDC6aQ4M_y6-isvnvMGpYRD_XkqxNa2R9dNr33SSMTQswINCNprUf-n1_K738buWnMtmuo_rhenflL3xSr166iAnDHJQgkfuyBhnxhnvZHmqHsCFNXbZEbavBOHLj41bX9xqIIVeJx_Hog8UAkDxRdzzIdOowQCNSP1gCaxMv2Xr43VakqvPdaQim68ffuyC6Gzjpvd5zjM3AClx")' }}>
                <div className="p-4 flex justify-end">
                  <span className="bg-editorial-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">{t('home.recent.sold')}</span>
                </div>
              </div>
              <div className="p-6 relative z-10 bg-white">
                <div className="mb-6">
                  <h3 className="text-xl font-bold leading-tight mb-1 group-hover:text-primary transition-colors">{t('home.recent.card3.title')}</h3>
                  <p className="text-sm text-gray-500">{t('home.location.daimus')}</p>
                </div>
                <div className="space-y-3 bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 border-dashed">
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-wide">{t('home.recent.listed')}</span>
                    <span className="text-sm font-semibold text-gray-400">€890k</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 border-dashed">
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-wide">{t('home.recent.sold_price')}</span>
                    <span className="text-sm font-bold text-green-600">€880k</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-wide">{t('home.recent.time')}</span>
                    <span className="text-sm font-bold text-editorial-black">21 {t('home.recent.days')}</span>
                  </div>
                </div>
              </div>
            </Link>
            {/* Card 4 */}
            <Link to="/properties" className="snap-center shrink-0 w-[85vw] md:w-[500px] bg-white rounded-lg overflow-hidden shadow-editorial hover:shadow-xl transition-shadow duration-300 block group">
              <div className="w-full h-64 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBTz0ljfPf17SA1GJ6uA8AFFp69r4QCIx9qAKheWPLsqb3SR9EiRThZW2pQrqT8Xq0ZMQkBXl7TkM-iW4Lv75dvy8PdbK9O30nJ35aX4fCg0S2feJ6JRYQQUGVRE_VdRjOjItcvyPHOCtbhJGoZS93wph_XgdsTjs-JRfjRxvz_Higm4ZVlH2KwIft4FCcypZ5tuZEmBATyNa2qENR5ZQOIjoGYF2i9mkiBN3wOiCJV8sOAVou3Y3J1JWjUk8qVNOGMTPeMEmtA")' }}>
                <div className="p-4 flex justify-end">
                  <span className="bg-editorial-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">{t('home.recent.sold')}</span>
                </div>
              </div>
              <div className="p-6 relative z-10 bg-white">
                <div className="mb-6">
                  <h3 className="text-xl font-bold leading-tight mb-1 group-hover:text-primary transition-colors">{t('home.recent.card4.title')}</h3>
                  <p className="text-sm text-gray-500">{t('home.location.camino')}</p>
                </div>
                <div className="space-y-3 bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 border-dashed">
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-wide">{t('home.recent.listed')}</span>
                    <span className="text-sm font-semibold text-gray-400">€2.1M</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 border-dashed">
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-wide">{t('home.recent.sold_price')}</span>
                    <span className="text-sm font-bold text-green-600">€2.0M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-wide">{t('home.recent.time')}</span>
                    <span className="text-sm font-bold text-editorial-black">45 {t('home.recent.days')}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-primary/5 -skew-x-12 hidden lg:block"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">{t('home.value.tag')}</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-editorial-black">{t('home.value.title')}</h2>
          <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">{t('home.value.subtitle')}</p>
          <div className="bg-white p-2 rounded shadow-xl border border-gray-100 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
            <div className="relative grow">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined">search</span>
              <input type="text" placeholder={t('home.value.placeholder')} className="w-full h-12 pl-12 pr-4 bg-transparent border-none focus:ring-0 text-editorial-black placeholder-gray-400 rounded" />
            </div>
            <Link to="/valuation" className="h-12 px-8 bg-primary hover:bg-black text-white font-bold rounded transition-colors whitespace-nowrap flex items-center justify-center">
              {t('home.value.button')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;