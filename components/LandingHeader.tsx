import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const LandingHeader: React.FC = () => {
    const { t, language, setLanguage } = useLanguage();
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    const navLinks = [
        { id: 'mia-method', label: 'MIA' },
        { id: 'recent-sales', label: t('landing.hero.sales') },
        { id: 'faq', label: 'FAQ' },
        { id: 'start-valuation', label: t('nav.contact') },
    ];

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-[#101922]/70 backdrop-blur-xl border-b border-white/50 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Logo acts as reset/refresh rather than navigation */}
                    <a href="/" className="flex items-center gap-3">
                        <img src="/Logo_Negro.svg" alt="Essencia Inmobiliaria" className="h-12 w-auto object-contain dark:invert" />
                    </a>
                </div>

                <div className="flex items-center gap-8">
                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6 mr-4">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => scrollToSection(link.id)}
                                className="text-xs font-bold uppercase tracking-[0.15em] hover:text-gray-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 rounded-sm px-2 py-1"
                            >
                                {link.label}
                            </button>
                        ))}
                    </nav>

                    {/* Language Switcher */}
                    <div className="hidden lg:flex items-center gap-3 text-xs font-bold tracking-[0.1em] text-gray-400">
                        <button onClick={() => setLanguage('es')} aria-label="Español" className={`cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 rounded-sm px-1 ${language === 'es' ? 'text-editorial-black dark:text-white border-b border-editorial-black dark:border-white' : 'hover:text-editorial-black dark:hover:text-white'}`}>ES</button>
                        <button onClick={() => setLanguage('en')} aria-label="English" className={`cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 rounded-sm px-1 ${language === 'en' ? 'text-editorial-black dark:text-white border-b border-editorial-black dark:border-white' : 'hover:text-editorial-black dark:hover:text-white'}`}>EN</button>
                        <button onClick={() => setLanguage('fr')} aria-label="Français" className={`cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 rounded-sm px-1 ${language === 'fr' ? 'text-editorial-black dark:text-white border-b border-editorial-black dark:border-white' : 'hover:text-editorial-black dark:hover:text-white'}`}>FR</button>
                        <button onClick={() => setLanguage('de')} aria-label="Deutsch" className={`cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 rounded-sm px-1 ${language === 'de' ? 'text-editorial-black dark:text-white border-b border-editorial-black dark:border-white' : 'hover:text-editorial-black dark:hover:text-white'}`}>DE</button>
                        <button onClick={() => setLanguage('va')} aria-label="Valenciano" className={`cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 rounded-sm px-1 ${language === 'va' ? 'text-editorial-black dark:text-white border-b border-editorial-black dark:border-white' : 'hover:text-editorial-black dark:hover:text-white'}`}>VA</button>
                    </div>

                    <a href="tel:+34647803355" className="hidden sm:flex h-10 px-6 items-center justify-center bg-brand-blue-700 text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-brand-blue-500 hover:shadow-[0_6px_16px_rgba(34,211,238,0.35)] transition-all duration-300 active:scale-[0.98]">
                        +34 647 803 355
                    </a>

                    <button className="lg:hidden p-2 text-editorial-black dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 rounded-sm" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMenuOpen}>
                        <span className="material-symbols-outlined" aria-hidden="true">{isMenuOpen ? 'close' : 'menu'}</span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-20 left-0 w-full bg-white dark:bg-background-dark border-b border-gray-100 dark:border-gray-800 p-6 shadow-xl flex flex-col gap-6 animate-in slide-in-from-top-2">
                    <nav className="flex flex-col gap-4 text-center">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => scrollToSection(link.id)}
                                className="text-sm font-bold uppercase tracking-[0.15em] py-2 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 rounded-sm"
                            >
                                {link.label}
                            </button>
                        ))}
                    </nav>
                    <div className="flex gap-4 justify-center border-t border-gray-100 dark:border-gray-800 pt-6">
                        <button onClick={() => setLanguage('es')} aria-label="Español" className={`text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 rounded-sm px-1 ${language === 'es' ? 'text-brand-blue-500' : 'text-gray-400'}`}>ES</button>
                        <button onClick={() => setLanguage('en')} aria-label="English" className={`text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 rounded-sm px-1 ${language === 'en' ? 'text-brand-blue-500' : 'text-gray-400'}`}>EN</button>
                        <button onClick={() => setLanguage('fr')} aria-label="Français" className={`text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 rounded-sm px-1 ${language === 'fr' ? 'text-brand-blue-500' : 'text-gray-400'}`}>FR</button>
                        <button onClick={() => setLanguage('de')} aria-label="Deutsch" className={`text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 rounded-sm px-1 ${language === 'de' ? 'text-brand-blue-500' : 'text-gray-400'}`}>DE</button>
                        <button onClick={() => setLanguage('va')} aria-label="Valenciano" className={`text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 rounded-sm px-1 ${language === 'va' ? 'text-brand-blue-500' : 'text-gray-400'}`}>VA</button>
                    </div>
                    <a href="tel:+34647803355" className="w-full h-12 flex items-center justify-center bg-editorial-black text-white font-bold uppercase tracking-[0.15em]">
                        +34 647 803 355
                    </a>
                </div>
            )}
        </header>
    );
};

export default LandingHeader;
