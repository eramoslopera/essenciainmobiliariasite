import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const routeLabels: Record<string, string> = {
    '/': 'nav.home',
    '/sell': 'nav.sell',
    '/properties': 'nav.properties',
    '/developments': 'nav.developments',
    '/valuation': 'nav.valuation',
    '/about': 'nav.about',
    '/contact': 'nav.contact',
    '/blog': 'nav.blog',
};

const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const { t } = useLanguage();
    const pathParts = location.pathname.split('/').filter(Boolean);

    if (pathParts.length === 0) return null; // Don't show on home

    const crumbs = [
        { path: '/', label: t('nav.home') || 'Home' },
        ...pathParts.map((part, i) => {
            const path = '/' + pathParts.slice(0, i + 1).join('/');
            const translationKey = routeLabels[path];
            const label = translationKey ? t(translationKey) : part.charAt(0).toUpperCase() + part.slice(1);
            return { path, label };
        })
    ];

    return (
        <nav aria-label="Breadcrumb" className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-24 pb-2">
            <ol className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                {crumbs.map((crumb, i) => (
                    <li key={crumb.path} className="flex items-center gap-2">
                        {i > 0 && (
                            <span className="material-symbols-outlined text-sm text-gray-300">chevron_right</span>
                        )}
                        {i === crumbs.length - 1 ? (
                            <span className="text-editorial-black font-bold" aria-current="page">{crumb.label}</span>
                        ) : (
                            <Link to={crumb.path} className="hover:text-brand-blue-600 transition-colors">
                                {crumb.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
