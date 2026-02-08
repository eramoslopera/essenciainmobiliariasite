import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  // Helper for link classes
  const linkClasses = (path: string) =>
    `text-sm font-bold transition-colors ${isActive(path) ? 'text-primary' : 'text-gray-500 hover:text-primary'}`;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 z-50">
          <img src="/Logo_Negro.svg" alt={t('footer.brand')} className="h-8 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 h-full">

          <Link to="/sell" className={linkClasses('/sell')}>
            {t('nav.sell')}
          </Link>

          {/* Buy Dropdown */}
          <div className="relative group h-full flex items-center">
            <button className={`flex items-center gap-1 text-sm font-bold transition-colors ${location.pathname.includes('/properties') || location.pathname.includes('/developments') ? 'text-primary' : 'text-gray-500 group-hover:text-primary'}`}>
              {t('nav.buy')}
              <span className="material-symbols-outlined text-lg">expand_more</span>
            </button>

            {/* Dropdown Content */}
            <div className="absolute top-[calc(100%-1px)] left-1/2 -translate-x-1/2 w-56 bg-white shadow-xl border border-gray-100 border-t-2 border-t-primary invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
              <div className="p-2 flex flex-col gap-1">
                <Link
                  to="/properties"
                  className={`block px-4 py-3 text-sm font-bold hover:bg-gray-50 transition-colors ${isActive('/properties') ? 'text-primary' : 'text-editorial-black'}`}
                >
                  {t('nav.properties')}
                </Link>
                <Link
                  to="/developments"
                  className={`block px-4 py-3 text-sm font-bold hover:bg-gray-50 transition-colors ${isActive('/developments') ? 'text-primary' : 'text-editorial-black'}`}
                >
                  {t('nav.developments')}
                </Link>
              </div>
            </div>
          </div>

          <Link to="/valuation" className={linkClasses('/valuation')}>
            {t('nav.valuation')}
          </Link>

          <Link to="/about" className={linkClasses('/about')}>
            {t('nav.about')}
          </Link>

          <Link to="/stories" className={linkClasses('/stories')}>
            {t('nav.stories')}
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">

          {/* Language Switcher */}
          <div className="hidden sm:block relative group">
            <button className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-editorial-black hover:text-primary transition-colors py-2">
              {language}
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
            <div className="absolute top-full right-0 w-24 bg-white shadow-xl border border-gray-100 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
              <button onClick={() => setLanguage('en')} className={`block w-full text-left px-4 py-2 text-xs font-bold hover:bg-gray-50 uppercase ${language === 'en' ? 'text-primary' : 'text-gray-500'}`}>EN</button>
              <button onClick={() => setLanguage('es')} className={`block w-full text-left px-4 py-2 text-xs font-bold hover:bg-gray-50 uppercase ${language === 'es' ? 'text-primary' : 'text-gray-500'}`}>ES</button>
              <button onClick={() => setLanguage('fr')} className={`block w-full text-left px-4 py-2 text-xs font-bold hover:bg-gray-50 uppercase ${language === 'fr' ? 'text-primary' : 'text-gray-500'}`}>FR</button>
              <button onClick={() => setLanguage('de')} className={`block w-full text-left px-4 py-2 text-xs font-bold hover:bg-gray-50 uppercase ${language === 'de' ? 'text-primary' : 'text-gray-500'}`}>DE</button>
              <button onClick={() => setLanguage('va')} className={`block w-full text-left px-4 py-2 text-xs font-bold hover:bg-gray-50 uppercase ${language === 'va' ? 'text-primary' : 'text-gray-500'}`}>VA</button>
            </div>
          </div>

          <Link
            to="/contact"
            className="hidden sm:flex items-center justify-center h-10 px-6 bg-editorial-black text-white text-xs font-bold uppercase tracking-widest hover:bg-primary transition-all shadow-md hover:shadow-lg"
          >
            {t('nav.contact')}
          </Link>

          <button className="md:hidden p-2 text-editorial-black" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="material-symbols-outlined text-2xl">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full h-[calc(100vh-80px)] bg-white border-t border-gray-100 p-8 flex flex-col gap-6 shadow-xl overflow-y-auto pb-20">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">{t('nav.real_estate')}</span>
            <Link to="/properties" className="text-2xl font-bold text-editorial-black" onClick={() => setIsMenuOpen(false)}>{t('nav.properties')}</Link>
            <Link to="/developments" className="text-2xl font-bold text-editorial-black" onClick={() => setIsMenuOpen(false)}>{t('nav.developments')}</Link>
            <Link to="/sell" className="text-2xl font-bold text-editorial-black" onClick={() => setIsMenuOpen(false)}>{t('nav.sell')}</Link>
            <Link to="/valuation" className="text-2xl font-bold text-primary" onClick={() => setIsMenuOpen(false)}>{t('nav.valuation')}</Link>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">{t('nav.company')}</span>
            <Link to="/about" className="text-xl font-bold text-editorial-black" onClick={() => setIsMenuOpen(false)}>{t('nav.about')}</Link>
            <Link to="/stories" className="text-xl font-bold text-editorial-black" onClick={() => setIsMenuOpen(false)}>{t('nav.stories')}</Link>
            <Link to="/contact" className="text-xl font-bold text-editorial-black" onClick={() => setIsMenuOpen(false)}>{t('nav.contact')}</Link>
          </div>

          <div className="flex gap-4 border-t border-gray-100 pt-6">
            <button onClick={() => setLanguage('en')} className={`text-lg font-bold uppercase ${language === 'en' ? 'text-primary' : 'text-gray-400'}`}>EN</button>
            <button onClick={() => setLanguage('es')} className={`text-lg font-bold uppercase ${language === 'es' ? 'text-primary' : 'text-gray-400'}`}>ES</button>
            <button onClick={() => setLanguage('fr')} className={`text-lg font-bold uppercase ${language === 'fr' ? 'text-primary' : 'text-gray-400'}`}>FR</button>
            <button onClick={() => setLanguage('de')} className={`text-lg font-bold uppercase ${language === 'de' ? 'text-primary' : 'text-gray-400'}`}>DE</button>
            <button onClick={() => setLanguage('va')} className={`text-lg font-bold uppercase ${language === 'va' ? 'text-primary' : 'text-gray-400'}`}>VA</button>
          </div>

          <div className="mt-auto pt-8">
            <Link to="/contact" className="flex items-center justify-center w-full h-14 bg-editorial-black text-white font-bold uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;