import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-editorial-black border-t border-white/10 pt-20 pb-10 px-6 lg:px-24 text-white">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <img src="/Logo_Blanco.svg" alt={t('footer.brand')} className="h-6 w-auto object-contain" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.desc')}
            </p>
          </div>
          <div>
            <h5 className="font-bold text-sm uppercase tracking-widest mb-6 text-white">{t('footer.discover')}</h5>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/properties" className="hover:text-primary transition-colors">{t('nav.properties')}</Link></li>
              <li><Link to="/developments" className="hover:text-primary transition-colors">{t('nav.developments')}</Link></li>
              <li><Link to="/stories" className="hover:text-primary transition-colors">{t('stories.newsletter.title')}</Link></li>
              <li><Link to="/properties" className="hover:text-primary transition-colors">{t('home.recent.sold')}</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-sm uppercase tracking-widest mb-6 text-white">{t('footer.company')}</h5>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-primary transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">{t('about.collective')}</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-sm uppercase tracking-widest mb-6 text-white">{t('footer.contact')}</h5>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                <span dangerouslySetInnerHTML={{ __html: t('footer.address') }}></span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-lg">call</span>
                <a href="tel:+34647803355" className="hover:text-primary transition-colors">+34 647 803 355</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-lg">mail</span>
                <a href="mailto:santitorres@essenciainmobiliaria.com" className="hover:text-primary transition-colors">santitorres@essenciainmobiliaria.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500">
          <p>{t('footer.rights')}</p>
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
            <Link to="/about" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
            <Link to="/about" className="hover:text-white transition-colors">{t('footer.cookies')}</Link>
          </div>
          <div className="flex gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/10 flex items-center justify-center hover:bg-white hover:text-editorial-black transition-colors text-white rounded-none">
              <span className="text-xs font-bold">{t('footer.social.ig')}</span>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/10 flex items-center justify-center hover:bg-white hover:text-editorial-black transition-colors text-white rounded-none">
              <span className="text-xs font-bold">{t('footer.social.fb')}</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/10 flex items-center justify-center hover:bg-white hover:text-editorial-black transition-colors text-white rounded-none">
              <span className="text-xs font-bold">{t('footer.social.li')}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;