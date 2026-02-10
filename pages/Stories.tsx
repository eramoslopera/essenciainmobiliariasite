import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Stories: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 pb-8 border-b border-gray-200">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block">{t('stories.journal')}</span>
            <h1 className="text-5xl md:text-7xl font-black text-editorial-black tracking-tight">Essencia Inmobiliaria <span className="font-serif italic font-normal">{t('stories.title')}</span></h1>
          </div>
          <nav className="flex gap-6 mt-8 md:mt-0">
            <button className="text-editorial-black font-bold text-sm border-b-2 border-editorial-black pb-1">{t('stories.nav.all')}</button>
            <button className="text-gray-400 font-bold text-sm hover:text-editorial-black transition-colors">{t('stories.nav.market')}</button>
            <button className="text-gray-400 font-bold text-sm hover:text-editorial-black transition-colors">{t('stories.nav.lifestyle')}</button>
            <button className="text-gray-400 font-bold text-sm hover:text-editorial-black transition-colors">{t('stories.nav.architecture')}</button>
          </nav>
        </div>

        {/* Featured Story */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <Link to="/contact?interest=Report:Valencia+Luxury+Market" className="lg:col-span-8 relative aspect-[16/9] lg:aspect-auto lg:h-[600px] overflow-hidden rounded group cursor-pointer block">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBeO_psb5EsZUge1Q9z9Z0VTEVDOkjmZqJ0_iWuqs1ZjDjturTC925sUpjY4SLbxjQNJNqlgkcv568Kjd5zvvCEIqbffK35jIWjZbAI_u5r_d_Sj57l_m9A8bJN7LcCmSlWATG8dzcBzvdTPFArI7AAtc--NaEpg0seD4lB3ek7ceC2iRhSFh-4fCJ4WP6rjzsj8Ow9cQB3NTjhprnKxcP9IcaFNAN9hsEGC0TUGR1IfZGlIpMPtAeaP1480Wg3sxZR8HyGCiot")' }}
              ></div>
              <div className="absolute top-6 left-6 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm">{t('stories.label.market_report')}</div>
            </Link>
            <div className="lg:col-span-4 flex flex-col justify-center">
              <span className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-4">{t('stories.feat.date')}</span>
              <h2 className="text-3xl md:text-4xl font-black text-editorial-black mb-6 leading-tight">{t('stories.feat.title')}</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                {t('stories.feat.desc')}
              </p>
              <Link to="/contact?interest=Report:Valencia+Luxury+Market" className="flex items-center gap-2 font-bold text-editorial-black hover:text-primary transition-colors uppercase text-xs tracking-widest">
                {t('stories.read_report')} <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Grid Stories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {/* Story 1 */}
          <Link to="/contact?interest=Story:Brutalist+Villas" className="group cursor-pointer block">
            <div className="relative aspect-[3/2] overflow-hidden rounded mb-6">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD6CVDb-uj3cAC0Ob6Xoldojbr8fXAlqgRkajY38_fEYtheLsJfhvgNqCXQoidNSph5pxxTIA4A-xhr-pY90ZuV6kh2DC_7KoE4yBIYtDccfKzP1CcdpXDsNXLOROI7cvlTEDUDGK7e7POqLad-y3lLKyfffcbEcwqN9yGejMHM5xKcKUdYutySJ4gKxwHil_TPn5cms3boBRB4bDas5vt7CzfzSedfRnX3LOZiliuJrw2B0gk4vAdiAgkIfndu1DmSEjAfvSQw")' }}
              ></div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <span className="text-primary font-bold text-xs uppercase tracking-widest">{t('stories.nav.architecture')}</span>
                <span className="text-gray-400 text-xs font-bold">5 {t('stories.read_time')}</span>
              </div>
              <h3 className="text-xl font-bold text-editorial-black mb-3 group-hover:text-primary transition-colors">{t('stories.s1.title')}</h3>
              <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                {t('stories.s1.desc')}
              </p>
            </div>
          </Link>

          {/* Story 2 */}
          <Link to="/contact?interest=Story:Oliva+Nova" className="group cursor-pointer block">
            <div className="relative aspect-[3/2] overflow-hidden rounded mb-6">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDSY-PXU4Aos5QXaijac90faiHIS204YriutHKAaYujVG4SZWwVd-HQk8IKShLRCD2mrH-OIVWer2XgAErCzUC_oChNo4RnkugwMaJ3Y-zSOq4-4jfCFa4ISvMZbRaPTdOFCUDu2OiWp1iS4ocb6Hoi5XneGiWUooX_Q_oi2cHRd5pjRF8ffN10TAKH57NDYH0CIdA-DNBnj73Sz9ReE_PJrBw6i0hkrS7KR1gsgila22DVBrYFBJwsrMLzBagtmE9zU1ZrYHK8")' }}
              ></div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <span className="text-primary font-bold text-xs uppercase tracking-widest">{t('stories.nav.lifestyle')}</span>
                <span className="text-gray-400 text-xs font-bold">3 {t('stories.read_time')}</span>
              </div>
              <h3 className="text-xl font-bold text-editorial-black mb-3 group-hover:text-primary transition-colors">{t('stories.s2.title')}</h3>
              <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                {t('stories.s2.desc')}
              </p>
            </div>
          </Link>

          {/* Story 3 */}
          <Link to="/contact?interest=Story:Natural+Light" className="group cursor-pointer block">
            <div className="relative aspect-[3/2] overflow-hidden rounded mb-6">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAjzENM8T9Tfr_TKw_FUCGQblUaSNsWttDPWKmig4d9rqpW7zv9dAOGGDCnnsJIEl5MQvTRQ8cIK2_CGc6dAoRcSDwZ4WpcxPFRn_X334-Qd4g3dWHkVhkRlNZtmaniVcP37BOvuGRyDPLcSDaNFsiizx1qPuvcaAHqTS6PCBb5gLGMGoEyq36HuJdYbiAPcNa8a3cfuAKD48IhYvVkAjJFz5ktXpnbJbc4THNxE0FAqxFU8pw2iZOCwUfrMIV3t9BqPlufMZvj")' }}
              ></div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <span className="text-primary font-bold text-xs uppercase tracking-widest">{t('stories.nav.interior')}</span>
                <span className="text-gray-400 text-xs font-bold">7 {t('stories.read_time')}</span>
              </div>
              <h3 className="text-xl font-bold text-editorial-black mb-3 group-hover:text-primary transition-colors">{t('stories.s3.title')}</h3>
              <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                {t('stories.s3.desc')}
              </p>
            </div>
          </Link>

          {/* Story 4 */}
          <Link to="/contact?interest=Story:Market+Trends" className="group cursor-pointer block">
            <div className="relative aspect-[3/2] overflow-hidden rounded mb-6">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBTz0ljfPf17SA1GJ6uA8AFFp69r4QCIx9qAKheWPLsqb3SR9EiRThZW2pQrqT8Xq0ZMQkBXl7TkM-iW4Lv75dvy8PdbK9O30nJ35aX4fCg0S2feJ6JRYQQUGVRE_VdRjOjItcvyPHOCtbhJGoZS93wph_XgdsTjs-JRfjRxvz_Higm4ZVlH2KwIft4FCcypZ5tuZEmBATyNa2qENR5ZQOIjoGYF2i9mkiBN3wOiCJV8sOAVou3Y3J1JWjUk8qVNOGMTPeMEmtA")' }}
              ></div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <span className="text-primary font-bold text-xs uppercase tracking-widest">{t('stories.nav.market')}</span>
                <span className="text-gray-400 text-xs font-bold">4 {t('stories.read_time')}</span>
              </div>
              <h3 className="text-xl font-bold text-editorial-black mb-3 group-hover:text-primary transition-colors">{t('stories.s4.title')}</h3>
              <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                {t('stories.s4.desc')}
              </p>
            </div>
          </Link>

          {/* Story 5 */}
          <Link to="/contact?interest=Story:Borgia+Legacy" className="group cursor-pointer block">
            <div className="relative aspect-[3/2] overflow-hidden rounded mb-6">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCCYCoLLGH8m6STpxs2Ok3leDZaZBOdic-RRxvSn3L6SKrp2cUA-O4x0Pu9ufIundVGAsD17DY5fkQxdKGMzKcy4xR0ut31MsMWW5BP3Je_Zf7d8cDI3Z1Bh87chviHz1rJNMgCZD3plwoi1hL7PJjPywPwiCKnlCv2YoNCI4SOeUKrfQdePCHjaTr6aGz-Qi3QhIUGYns-9fd75ddyqDSPSlRpFU9j1mppa5sdr5oHdFOSEP7TLBQR3YMUSIlm9f_83E9pcr9G")' }}
              ></div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <span className="text-primary font-bold text-xs uppercase tracking-widest">{t('stories.nav.culture')}</span>
                <span className="text-gray-400 text-xs font-bold">6 {t('stories.read_time')}</span>
              </div>
              <h3 className="text-xl font-bold text-editorial-black mb-3 group-hover:text-primary transition-colors">{t('stories.s5.title')}</h3>
              <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                {t('stories.s5.desc')}
              </p>
            </div>
          </Link>

          {/* Story 6 */}
          <Link to="/contact?interest=Story:Summer+Gala" className="group cursor-pointer block">
            <div className="relative aspect-[3/2] overflow-hidden rounded mb-6">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuApVdluFbbEXPQangUFFxfb62P34yITGii4BnFZ8ma20PBBscwMxMTw-vA8QDC6aQ4M_y6-isvnvMGpYRD_XkqxNa2R9dNr33SSMTQswINCNprUf-n1_K738buWnMtmuo_rhenflL3xSr166iAnDHJQgkfuyBhnxhnvZHmqHsCFNXbZEbavBOHLj41bX9xqIIVeJx_Hog8UAkDxRdzzIdOowQCNSP1gCaxMv2Xr43VakqvPdaQim68ffuyC6Gzjpvd5zjM3AClx")' }}
              ></div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <span className="text-primary font-bold text-xs uppercase tracking-widest">{t('stories.nav.events')}</span>
                <span className="text-gray-400 text-xs font-bold">2 {t('stories.read_time')}</span>
              </div>
              <h3 className="text-xl font-bold text-editorial-black mb-3 group-hover:text-primary transition-colors">{t('stories.s6.title')}</h3>
              <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                {t('stories.s6.desc')}
              </p>
            </div>
          </Link>
        </div>

        {/* Newsletter */}
        <div className="mt-24 bg-editorial-black text-white p-12 lg:p-24 text-center rounded">
          <span className="material-symbols-outlined text-5xl text-primary mb-6">mark_email_read</span>
          <h3 className="text-4xl font-black mb-4">{t('stories.newsletter.title')}</h3>
          <p className="text-gray-400 max-w-xl mx-auto mb-10 text-lg">
            {t('stories.newsletter.desc')}
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder={t('common.email')}
              className="flex-grow bg-white/10 border-white/20 text-white placeholder-gray-500 rounded focus:ring-primary focus:border-primary"
            />
            <button className="px-6 py-3 bg-white text-editorial-black font-bold uppercase tracking-wider rounded hover:bg-primary hover:text-white transition-colors">
              {t('common.subscribe')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stories;