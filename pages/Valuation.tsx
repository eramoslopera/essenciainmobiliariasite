import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useLanguage } from '../context/LanguageContext';

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
    <main className="flex-grow pt-28 pb-20 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="mb-10">
            <div className="flex justify-between items-end mb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">{t('valuation.process.step1_of_4')}</span>
              <span className="text-xs font-semibold text-gray-400">{t('valuation.process.completed')}</span>
            </div>
            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-1/4 rounded-full"></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-editorial p-8 md:p-12 border border-gray-100">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-editorial-black leading-[1.1]">
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
                      <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">search</span>
                    </div>
                    <input
                      className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-lg text-lg font-medium text-editorial-black placeholder-gray-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                      id="address"
                      placeholder={t('valuation.placeholder')}
                      type="text"
                    />
                  </div>
                </div>

                {/* Interactive Map Section */}
                <div className="rounded-xl overflow-hidden border border-gray-200 relative h-64 md:h-96 w-full z-0 shadow-inner">
                  <MapContainer center={[38.967, -0.181]} zoom={13} scrollWheelZoom={false} className="h-full w-full">
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />
                    <LocationMarker />
                  </MapContainer>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm shadow-md z-[1000] pointer-events-none">
                    {t('valuation.map.pin')}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide" htmlFor="floor">
                      {t('valuation.form.floor')}
                    </label>
                    <input className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-base focus:ring-1 focus:ring-primary focus:border-primary" id="floor" placeholder="e.g. 4" type="text" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide" htmlFor="door">
                      {t('valuation.form.door')}
                    </label>
                    <input className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-base focus:ring-1 focus:ring-primary focus:border-primary" id="door" placeholder="e.g. B" type="text" />
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                  <Link to="/" className="text-sm font-bold text-gray-500 hover:text-editorial-black transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    {t('valuation.back')}
                  </Link>
                  <button className="px-8 py-4 bg-primary hover:bg-black text-white text-base font-bold rounded-lg shadow-lg shadow-gray-500/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2" type="submit">
                    {t('valuation.continue')}
                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <p className="mt-6 text-center text-xs text-gray-400 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-base">lock</span>
            {t('valuation.secure')}
          </p>
        </div>
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-8 lg:pt-16">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-primary">timer</span>
            </div>
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 bg-gray-50 text-primary rounded-full flex items-center justify-center flex-shrink-0">
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
              <p className="text-3xl font-black text-editorial-black">98%</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">{t('valuation.accuracy')}</p>
            </div>
            <div>
              <p className="text-3xl font-black text-editorial-black">€250M+</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">{t('valuation.valued_ytd')}</p>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-editorial-black">{t('valuation.help.title')}</p>
              <p className="text-xs text-gray-500">{t('valuation.help.subtitle')}</p>
            </div>
            <Link to="/contact" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors shadow-sm">
              <span className="material-symbols-outlined">call</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Valuation;