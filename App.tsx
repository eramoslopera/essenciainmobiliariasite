import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Sell from './pages/Sell';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Valuation from './pages/Valuation';
import Stories from './pages/Stories';
import Contact from './pages/Contact';
import About from './pages/About';
import Landing from './pages/Landing';
import Developments from './pages/Developments';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

import FloatingWhatsApp from './components/FloatingWhatsApp';

const Layout: React.FC = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/landing';

  return (
    <div className="flex flex-col min-h-screen font-display">
      {!isLandingPage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/valuation" element={<Valuation />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/developments" element={<Developments />} />
      </Routes>
      {!isLandingPage && <Footer />}
      <FloatingWhatsApp />
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