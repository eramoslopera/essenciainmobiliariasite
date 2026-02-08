import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Developments: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-16">
        <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block">{t('dev.label.future_living')}</span>
        <h1 className="text-5xl md:text-7xl font-black text-editorial-black tracking-tight mb-8">{t('dev.title')}</h1>
        <p className="text-xl text-gray-500 max-w-2xl font-medium leading-relaxed">
          {t('dev.subtitle')}
        </p>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-24">

        {/* Project 1 */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-7/12 relative aspect-[16/9] overflow-hidden rounded-lg group">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBTz0ljfPf17SA1GJ6uA8AFFp69r4QCIx9qAKheWPLsqb3SR9EiRThZW2pQrqT8Xq0ZMQkBXl7TkM-iW4Lv75dvy8PdbK9O30nJ35aX4fCg0S2feJ6JRYQQUGVRE_VdRjOjItcvyPHOCtbhJGoZS93wph_XgdsTjs-JRfjRxvz_Higm4ZVlH2KwIft4FCcypZ5tuZEmBATyNa2qENR5ZQOIjoGYF2i9mkiBN3wOiCJV8sOAVou3Y3J1JWjUk8qVNOGMTPeMEmtA")' }}
            ></div>
            <div className="absolute top-6 left-6 bg-editorial-black text-white px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-sm">
              {t('dev.status.construction')}
            </div>
          </div>
          <div className="lg:w-5/12">
            <h2 className="text-3xl font-bold mb-4">{t('dev.p1.title')}</h2>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">{t('dev.info.cullera')}</p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {t('dev.p1.desc')}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="border-l-2 border-primary pl-4">
                <span className="block text-2xl font-bold">€1.2M</span>
                <span className="text-xs text-gray-500">{t('dev.start_price')}</span>
              </div>
              <div className="border-l-2 border-gray-200 pl-4">
                <span className="block text-2xl font-bold">4 - 6</span>
                <span className="text-xs text-gray-500">{t('detail.beds')}</span>
              </div>
            </div>
            <Link to="/contact?interest=Azure+Heights+Brochure" className="inline-flex items-center justify-center h-12 px-8 border border-editorial-black hover:bg-editorial-black hover:text-white font-bold uppercase tracking-widest text-sm transition-colors rounded-none">
              {t('dev.download')}
            </Link>
          </div>
        </div>

        {/* Project 2 */}
        <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
          <div className="lg:w-7/12 relative aspect-[16/9] overflow-hidden rounded-lg group">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBeO_psb5EsZUge1Q9z9Z0VTEVDOkjmZqJ0_iWuqs1ZjDjturTC925sUpjY4SLbxjQNJNqlgkcv568Kjd5zvvCEIqbffK35jIWjZbAI_u5r_d_Sj57l_m9A8bJN7LcCmSlWATG8dzcBzvdTPFArI7AAtc--NaEpg0seD4lB3ek7ceC2iRhSFh-4fCJ4WP6rjzsj8Ow9cQB3NTjhprnKxcP9IcaFNAN9hsEGC0TUGR1IfZGlIpMPtAeaP1480Wg3sxZR8HyGCiot")' }}
            ></div>
            <div className="absolute top-6 right-6 bg-primary text-white px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-sm">
              {t('dev.status.launching')}
            </div>
          </div>
          <div className="lg:w-5/12">
            <h2 className="text-3xl font-bold mb-4">{t('dev.p2.title')}</h2>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">{t('dev.info.valencia')}</p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {t('dev.p2.desc')}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="border-l-2 border-primary pl-4">
                <span className="block text-2xl font-bold">€350k</span>
                <span className="text-xs text-gray-500">{t('dev.start_price')}</span>
              </div>
              <div className="border-l-2 border-gray-200 pl-4">
                <span className="block text-2xl font-bold">85 - 140m²</span>
                <span className="text-xs text-gray-500">{t('dev.label.sizes')}</span>
              </div>
            </div>
            <Link to="/contact?interest=The+Silk+District+Registration" className="inline-flex items-center justify-center h-12 px-8 bg-editorial-black text-white hover:bg-primary font-bold uppercase tracking-widest text-sm transition-colors rounded-none">
              {t('dev.register')}
            </Link>
          </div>
        </div>

        {/* Project 3 */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-7/12 relative aspect-[16/9] overflow-hidden rounded-lg group">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAjzENM8T9Tfr_TKw_FUCGQblUaSNsWttDPWKmig4d9rqpW7zv9dAOGGDCnnsJIEl5MQvTRQ8cIK2_CGc6dAoRcSDwZ4WpcxPFRn_X334-Qd4g3dWHkVhkRlNZtmaniVcP37BOvuGRyDPLcSDaNFsiizx1qPuvcaAHqTS6PCBb5gLGMGoEyq36HuJdYbiAPcNa8a3cfuAKD48IhYvVkAjJFz5ktXpnbJbc4THNxE0FAqxFU8pw2iZOCwUfrMIV3t9BqPlufMZvj")' }}
            ></div>
            <div className="absolute top-6 left-6 bg-gray-500 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-sm">
              {t('dev.status.last_units')}
            </div>
          </div>
          <div className="lg:w-5/12">
            <h2 className="text-3xl font-bold mb-4">{t('dev.p3.title')}</h2>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">{t('dev.info.oliva')}</p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {t('dev.p3.desc')}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="border-l-2 border-primary pl-4">
                <span className="block text-2xl font-bold">€590k</span>
                <span className="text-xs text-gray-500">{t('dev.start_price')}</span>
              </div>
              <div className="border-l-2 border-gray-200 pl-4">
                <span className="block text-2xl font-bold">2 {t('dev.units')}</span>
                <span className="text-xs text-gray-500">{t('dev.label.remaining')}</span>
              </div>
            </div>
            <Link to="/contact?interest=Duna+Beach+Floorplans" className="inline-flex items-center justify-center h-12 px-8 border border-editorial-black hover:bg-editorial-black hover:text-white font-bold uppercase tracking-widest text-sm transition-colors rounded-none">
              {t('dev.view_floorplans')}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Developments;