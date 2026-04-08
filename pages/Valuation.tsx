import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';

// Fix icon issue (same as in Properties)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle clicks
const LocationMarker = () => {
  const { t } = useLanguage();
  const [position, setPosition] = React.useState<[number, number] | null>(null);
  const map = useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>{t('valuation.selected_location')}</Popup>
    </Marker>
  );
}

const Valuation: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/contact?interest=Valuation+Result');
  };

  return (
    <>
    <SEOHead
      title="Valoración Gratuita de tu Vivienda"
      description="¿Cuánto vale tu vivienda? Solicita una valoración gratuita y profesional de tu propiedad en Gandia, Oliva, Denia o la costa de Valencia con Essencia Inmobiliaria."
      canonical="https://essenciainmobiliaria.com/valuation"
    />
    <main className="flex-grow pt-28 pb-20 px-4 sm:px-6 lg:px-12 overflow-hidden">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
          className="lg:col-span-7 xl:col-span-8"
        >
          <div className="mb-10">
            <div className="flex justify-between items-end mb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-blue-600">{t('valuation.process.step1_of_4')}</span>
              <span className="text-xs font-semibold text-gray-400">{t('valuation.process.completed')}</span>
            </div>
            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-brand-blue-500 w-1/4 rounded-full"></div>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100">
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter mb-4 text-editorial-black leading-[1.1]">
              1. {t('valuation.step1')}
            </h2>
            <p className="text-gray-500 mb-10 text-lg">
              {t('valuation.step1.desc')}
            </p>
            <form onSubmit={handleContinue}>
              <div className="space-y-8">
                <div className="relative group">
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide" htmlFor="address">
                    {t('valuation.form.address_label')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-gray-400 group-focus-within:text-brand-blue-500 transition-colors">search</span>
                    </div>
                    <input
                      className="block w-full pl-12 pr-4 py-4 bg-transparent border-b-2 border-gray-200 rounded-none text-xl md:text-2xl font-bold text-editorial-black placeholder-gray-400 focus:outline-none focus:border-editorial-black transition-colors focus-visible:ring-2 focus-visible:ring-brand-blue-500 focus-visible:border-transparent"
                      id="address"
                      placeholder={t('valuation.placeholder')}
                      type="text"
                    />
                  </div>
                </div>

                {/* Interactive Map Section */}
                <div className="rounded-2xl overflow-hidden border border-gray-200 relative h-64 md:h-96 w-full z-0 shadow-inner">
                  <MapContainer center={[38.967, -0.181]} zoom={13} scrollWheelZoom={false} className="h-full w-full">
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />
                    <LocationMarker />
                  </MapContainer>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-md z-[1000] pointer-events-none">
                    {t('valuation.map.pin')}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-[0.15em]" htmlFor="floor">
                      {t('valuation.form.floor')}
                    </label>
                    <input className="block w-full px-0 py-3 bg-transparent border-b border-gray-200 rounded-none text-base focus:outline-none focus:border-editorial-black focus-visible:ring-2 focus-visible:ring-brand-blue-500 transition-colors placeholder-gray-400" id="floor" placeholder="e.g. 4" type="text" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-[0.15em]" htmlFor="door">
                      {t('valuation.form.door')}
                    </label>
                    <input className="block w-full px-0 py-3 bg-transparent border-b border-gray-200 rounded-none text-base focus:outline-none focus:border-editorial-black focus-visible:ring-2 focus-visible:ring-brand-blue-500 transition-colors placeholder-gray-400" id="door" placeholder="e.g. B" type="text" />
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                  <Link to="/" className="text-sm font-bold text-gray-500 hover:text-editorial-black transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 rounded-full">
                    <span className="material-symbols-outlined text-lg" aria-hidden="true">arrow_back</span>
                    {t('valuation.back')}
                  </Link>
                  <button className="px-8 py-4 bg-brand-blue-700 hover:bg-brand-blue-500 text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-5px_rgba(34,211,238,0.4)] hover:-translate-y-1 transition-all duration-300 active:scale-[0.98] flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-blue-500" type="submit">
                    {t('valuation.continue')}
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <p className="mt-6 text-center text-xs text-gray-400 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-base">lock</span>
            {t('valuation.secure')}
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 30 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} 
          className="lg:col-span-5 xl:col-span-4 flex flex-col gap-8 lg:pt-16"
        >
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-brand-blue-500">timer</span>
            </div>
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 bg-brand-blue-50 text-brand-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-2xl">bolt</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-editorial-black mb-1">{t('valuation.sla')}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {t('valuation.sla_desc')}
                </p>
              </div>
            </div>
          </div>
          <div className="relative p-8">
            <span className="absolute top-0 left-0 text-6xl text-gray-200 font-serif leading-none">"</span>
            <blockquote className="relative z-10">
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-editorial-black mb-6">
                {t('valuation.testimonial.text')}
              </p>
              <footer className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDSY-PXU4Aos5QXaijac90faiHIS204YriutHKAaYujVG4SZWwVd-HQk8IKShLRCD2mrH-OIVWer2XgAErCzUC_oChNo4RnkugwMaJ3Y-zSOq4-4jfCFa4ISvMZbRaPTdOFCUDu2OiWp1iS4ocb6Hoi5XneGiWUooX_Q_oi2cHRd5pjRF8ffN10TAKH57NDYH0CIdA-DNBnj73Sz9ReE_PJrBw6i0hkrS7KR1gsgila22DVBrYFBJwsrMLzBagtmE9zU1ZrYHK8")' }}></div>
                <div>
                  <cite className="not-italic font-bold text-sm block text-editorial-black">Elena & Marc R.</cite>
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">{t('valuation.sold_in')} {t('valuation.testimonial.location')}</span>
                </div>
              </footer>
            </blockquote>
          </div>
          <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-8">
            <div>
              <p className="text-3xl font-light tabular-nums text-editorial-black">98%</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">{t('valuation.accuracy')}</p>
            </div>
            <div>
              <p className="text-3xl font-light tabular-nums text-editorial-black">€250M+</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">{t('valuation.valued_ytd')}</p>
            </div>
          </div>
          <div className="bg-gray-translate-y-50 rounded-2xl p-5 border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-editorial-black">{t('valuation.help.title')}</p>
              <p className="text-xs text-gray-500">{t('valuation.help.subtitle')}</p>
            </div>
            <Link to="/contact" aria-label="Contact Support" className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-editorial-black hover:text-white transition-all active:scale-[0.98] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500">
              <span className="material-symbols-outlined" aria-hidden="true">call</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
    </>
  );
};

export default Valuation;