import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Sell from './pages/Sell';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Valuation from './pages/Valuation';

import Contact from './pages/Contact';
import About from './pages/About';
import Landing from './pages/Landing';
import Developments from './pages/Developments';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import Breadcrumbs from './components/Breadcrumbs';
import SchemaMarkup from './components/SchemaMarkup';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

import FloatingWhatsApp from './components/FloatingWhatsApp';
import BackToTop from './components/BackToTop';


const Layout: React.FC = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/landing';

  return (
    <div className="flex flex-col min-h-screen font-display">
      {/* Skip Navigation for Accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-brand-blue-500 focus:text-white focus:px-4 focus:py-2 focus:font-bold focus:text-sm">
        Skip to content
      </a>
      <SchemaMarkup />
      {!isLandingPage && <Header />}
      {!isLandingPage && location.pathname !== '/' && <Breadcrumbs />}
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/valuation" element={<Valuation />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/developments" element={<Developments />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
        </Routes>
      </main>
      {!isLandingPage && <Footer />}
      <FloatingWhatsApp />
      <BackToTop />

    </div>
  );
};

const AppContent: React.FC = () => { // Renamed App to AppContent to use useLanguage hook
  const { language } = useLanguage();

  React.useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <Router>
      <ScrollToTop />
      <Layout />
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent /> {/* Render AppContent inside LanguageProvider */}
    </LanguageProvider>
  );
};

export default App;