import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBuyOpen, setIsBuyOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();
  const buyRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (buyRef.current && !buyRef.current.contains(e.target as Node)) setIsBuyOpen(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setIsLangOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsBuyOpen(false);
  }, [location.pathname]);

  const linkClasses = (path: string) =>
    `text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 focus-visible:ring-offset-2 rounded-sm px-1 ${isActive(path) ? 'text-editorial-black border-b-2 border-brand-blue-500 pb-0.5' : 'text-gray-500 hover:text-brand-blue-600'}`;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 rounded-sm">
          <img src="/Logo_Negro.svg" alt={t('footer.brand')} className="h-8 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 h-full" role="navigation" aria-label="Main navigation">
          <Link to="/sell" className={linkClasses('/sell')}>
            {t('nav.sell')}
          </Link>

          {/* Buy Dropdown — Click-based for accessibility */}
          <div className="relative h-full flex items-center" ref={buyRef}>
            <button
              onClick={() => setIsBuyOpen(!isBuyOpen)}
              aria-expanded={isBuyOpen}
              aria-haspopup="true"
              className={`flex items-center gap-1 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 focus-visible:ring-offset-2 rounded-sm px-1 ${location.pathname.includes('/properties') || location.pathname.includes('/developments')
                ? 'text-editorial-black border-b-2 border-brand-blue-500 pb-0.5'
                : 'text-gray-500 hover:text-brand-blue-600'
                }`}
            >
              {t('nav.buy')}
              <span className={`material-symbols-outlined text-lg transition-transform duration-200 ${isBuyOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </button>

            {/* Dropdown Content */}
            <div
              className={`absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-56 bg-white shadow-diffusion border border-white/20 rounded-2xl overflow-hidden transition-all duration-200 transform ${isBuyOpen ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-2'
                }`}
              role="menu"
            >
              <div className="p-2 flex flex-col gap-1">
                <Link
                  to="/properties"
                  role="menuitem"
                  className={`block px-4 py-3 text-sm font-bold hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 ${isActive('/properties') ? 'text-brand-blue-600' : 'text-editorial-black'}`}
                >
                  {t('nav.properties')}
                </Link>
                <Link
                  to="/developments"
                  role="menuitem"
                  className={`block px-4 py-3 text-sm font-bold hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 ${isActive('/developments') ? 'text-brand-blue-600' : 'text-editorial-black'}`}
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


        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">

          {/* Language Switcher — Click-based */}
          <div className="hidden sm:block relative" ref={langRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              aria-expanded={isLangOpen}
              aria-haspopup="true"
              aria-label="Select language"
              className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-editorial-black hover:text-brand-blue-600 transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 rounded-sm"
            >
              {language}
              <span className={`material-symbols-outlined text-sm transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
            <div
              className={`absolute top-[calc(100%+8px)] right-0 w-24 bg-white shadow-diffusion border border-white/20 rounded-2xl overflow-hidden transition-all duration-200 transform ${isLangOpen ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-2'
                }`}
              role="menu"
              aria-label="Language options"
            >
              {['en', 'es', 'fr', 'de', 'va'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => { setLanguage(lang); setIsLangOpen(false); }}
                  role="menuitem"
                  className={`block w-full text-left px-4 py-2 text-xs font-bold hover:bg-gray-100 uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 ${language === lang ? 'text-brand-blue-600' : 'text-gray-500'}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <Link
            to="/contact"
            className="hidden sm:flex items-center justify-center h-10 px-6 bg-editorial-black text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-blue-600 transition-all shadow-diffusion hover:shadow-diffusion-hover rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 focus-visible:ring-offset-2"
          >
            {t('nav.contact')}
          </Link>

          <button
            className="md:hidden p-2 text-editorial-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 rounded-sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <span className="material-symbols-outlined text-2xl">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu — Animated */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full h-[calc(100vh-80px)] bg-white border-t border-gray-100 p-8 flex flex-col gap-6 shadow-xl overflow-y-auto pb-20 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col gap-4">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">{t('nav.real_estate')}</span>
          <Link to="/properties" className="text-2xl font-bold text-editorial-black hover:text-brand-blue-600 transition-colors">{t('nav.properties')}</Link>
          <Link to="/developments" className="text-2xl font-bold text-editorial-black hover:text-brand-blue-600 transition-colors">{t('nav.developments')}</Link>
          <Link to="/sell" className="text-2xl font-bold text-editorial-black hover:text-brand-blue-600 transition-colors">{t('nav.sell')}</Link>
          <Link to="/valuation" className="text-2xl font-bold text-brand-blue-600">{t('nav.valuation')}</Link>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">{t('nav.company')}</span>
          <Link to="/about" className="text-xl font-bold text-editorial-black hover:text-brand-blue-600 transition-colors">{t('nav.about')}</Link>

          <Link to="/contact" className="text-xl font-bold text-editorial-black hover:text-brand-blue-600 transition-colors">{t('nav.contact')}</Link>
        </div>

        <div className="flex gap-4 border-t border-gray-100 pt-6">
          {['en', 'es', 'fr', 'de', 'va'].map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`text-lg font-bold uppercase transition-colors ${language === lang ? 'text-brand-blue-600' : 'text-gray-400 hover:text-brand-blue-600'}`}
            >
              {lang}
            </button>
          ))}
        </div>

        <div className="mt-auto pt-8">
          <Link to="/contact" className="flex items-center justify-center w-full h-14 bg-brand-blue-700 text-white font-bold uppercase tracking-widest hover:bg-brand-blue-500 hover:shadow-diffusion-hover rounded-full transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]">
            {t('nav.contact')}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;