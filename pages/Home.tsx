import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import StatsSection from '../components/StatsSection';
import SEOHead from '../components/SEOHead';
import InteractiveMarketingSection from '../components/InteractiveMarketingSection';
import { Property } from '../src/types/property';
import { fetchProperties } from '../src/utils/xmlParser';

const HERO_IMAGES = [
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6CVDb-uj3cAC0Ob6Xoldojbr8fXAlqgRkajY38_fEYtheLsJfhvgNqCXQoidNSph5pxxTIA4A-xhr-pY90ZuV6kh2DC_7KoE4yBIYtDccfKzP1CcdpXDsNXLOROI7cvlTEDUDGK7e7POqLad-y3lLKyfffcbEcwqN9yGejMHM5xKcKUdYutySJ4gKxwHil_TPn5cms3boBRB4bDas5vt7CzfzSedfRnX3LOZiliuJrw2B0gk4vAdiAgkIfndu1DmSEjAfvSQw',
    position: 'center',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSY-PXU4Aos5QXaijac90faiHIS204YriutHKAaYujVG4SZWwVd-HQk8IKShLRCD2mrH-OIVWer2XgAErCzUC_oChNo4RnkugwMaJ3Y-zSOq4-4jfCFa4ISvMZbRaPTdOFCUDu2OiWp1iS4ocb6Hoi5XneGiWUooX_Q_oi2cHRd5pjRF8ffN10TAKH57NDYH0CIdA-DNBnj73Sz9ReE_PJrBw6i0hkrS7KR1gsgila22DVBrYFBJwsrMLzBagtmE9zU1ZrYHK8',
    position: 'center 30%',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTz0ljfPf17SA1GJ6uA8AFFp69r4QCIx9qAKheWPLsqb3SR9EiRThZW2pQrqT8Xq0ZMQkBXl7TkM-iW4Lv75dvy8PdbK9O30nJ35aX4fCg0S2feJ6JRYQQUGVRE_VdRjOjItcvyPHOCtbhJGoZS93wph_XgdsTjs-JRfjRxvz_Higm4ZVlH2KwIft4FCcypZ5tuZEmBATyNa2qENR5ZQOIjoGYF2i9mkiBN3wOiCJV8sOAVou3Y3J1JWjUk8qVNOGMTPeMEmtA',
    position: 'center 60%',
  },
];

const HomeContactForm: React.FC = () => {
  const { t } = useLanguage();
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [reason, setReason] = React.useState('buy');
  const [message, setMessage] = React.useState('');
  const [sent, setSent] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const waMessage = [
      `¡Hola! Me pongo en contacto desde vuestra web.`,
      ``,
      `*Nombre:* ${name}`,
      email ? `*Email:* ${email}` : '',
      phone ? `*Teléfono:* ${phone}` : '',
      `*Interés:* ${reason}`,
      message ? `\n*Mensaje:*\n${message}` : ''
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/34647803355?text=${encodeURIComponent(waMessage)}`, '_blank', 'noopener,noreferrer');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm">
      {sent ? (
        <div className="flex flex-col items-center justify-center h-full min-h-[320px] gap-4 text-center">
          <span className="material-symbols-outlined text-5xl text-green-400">check_circle</span>
          <p className="text-white font-bold text-lg">¡WhatsApp abierto!</p>
          <p className="text-gray-400 text-sm">Envía el mensaje para que os podamos contactar.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{t('common.name') || 'Nombre'}</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="María García" className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{t('common.phone') || 'Teléfono'}</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+34 600 000 000" className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent transition-all" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{t('common.email') || 'Email'}</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="maria@example.com" className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent transition-all" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{t('home.contact.reason.label')}</label>
            <select value={reason} onChange={e => setReason(e.target.value)} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent transition-all appearance-none">
              <option value="buy" className="bg-gray-900">{t('home.contact.reason.buy')}</option>
              <option value="sell" className="bg-gray-900">{t('home.contact.reason.sell')}</option>
              <option value="valuation" className="bg-gray-900">{t('home.contact.reason.valuation')}</option>
              <option value="invest" className="bg-gray-900">{t('home.contact.reason.invest')}</option>
              <option value="other" className="bg-gray-900">{t('home.contact.reason.other')}</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{t('common.message')}</label>
            <textarea rows={4} value={message} onChange={e => setMessage(e.target.value)} placeholder={t('home.contact.message.placeholder')} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent transition-all resize-none" />
          </div>
          <button type="submit" className="w-full bg-brand-blue-500 hover:bg-brand-blue-600 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm tracking-wide mt-2">
            {t('home.contact.send') || 'Enviar mensaje'}
            <span className="material-symbols-outlined text-sm">send</span>
          </button>
          <p className="text-xs text-center text-gray-500 mt-2">{t('detail.form.privacy') || 'Tu información está protegida. Nunca compartimos tus datos.'}</p>
        </form>
      )}
    </div>
  );
};


const FEATURED_SOLD: Property[] = [
  {
    id: 'sold-1',
    title: "Adosado Reformado",
    location: "Benidoleig, Alicante",
    price: "€140,000",
    beds: 3,
    baths: 2,
    size: "120 m²",
    image: "https://fotos15.apinmo.com/1909/27341402/3-1.jpg",
    type: 'Townhouse',
    dateListed: '2024-01-01',
    lat: 38.7917,
    lng: -0.0278,
    status: 'sold',
    priceFreq: 'sale'
  },
  {
    id: 'sold-2',
    title: "Casa de Pueblo con Encanto",
    location: "Real de Gandía, Valencia",
    price: "€164,900",
    beds: 4,
    baths: 2,
    size: "180 m²",
    image: "https://fotos15.apinmo.com/1909/23491575/15-1.jpg",
    type: 'House',
    dateListed: '2024-02-01',
    lat: 38.949,
    lng: -0.190,
    status: 'sold',
    priceFreq: 'sale'
  },
  {
    id: 'sold-3',
    title: "Apartamento Costero",
    location: "Playa de Bellreguard",
    price: "€170,000",
    beds: 3,
    baths: 2,
    size: "95 m²",
    image: "https://fotos15.apinmo.com/1909/26037790/9-1.jpg",
    type: 'Apartment',
    dateListed: '2024-03-01',
    lat: 38.950,
    lng: -0.150,
    status: 'sold',
    priceFreq: 'sale'
  },
  {
    id: 'sold-4',
    title: "Apartamento Familiar",
    location: "Playa de Gandía",
    price: "€215,000",
    beds: 3,
    baths: 2,
    size: "105 m²",
    image: "https://fotos15.apinmo.com/1909/25828355/10-1.jpg",
    type: 'Apartment',
    dateListed: '2024-02-15',
    lat: 39.000,
    lng: -0.160,
    status: 'sold',
    priceFreq: 'sale'
  }
];

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [recentProperties, setRecentProperties] = useState<Property[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadProperties = async () => {
      let recent = [...FEATURED_SOLD];
      try {
        const fetched = await fetchProperties();
        const apiRecent = fetched.filter(p => p.status === 'sold' || p.status === 'reserved');
        if (apiRecent.length > 0) {
            recent = [...recent, ...apiRecent];
        }
      } catch (err) {
        console.error(err);
      }
      const sorted = recent.sort((a,b) => {
        if (!a.dateListed || !b.dateListed) return 0;
        return new Date(b.dateListed).getTime() - new Date(a.dateListed).getTime();
      });
      setRecentProperties(sorted.slice(0, 8));
    };
    loadProperties();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 450; // slightly less than card width + gap for context
      const currentScroll = carouselRef.current.scrollLeft;
      const targetScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;

      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <SEOHead
        title="Inmobiliaria de Lujo en Gandia y Valencia"
        description="Essencia Inmobiliaria — Compra, vende y valora tu vivienda con la inmobiliaria premium de Gandia y la costa de Valencia. Marketing editorial, valoración gratuita y alcance internacional."
        canonical="https://essenciainmobiliaria.com/"
      />
      {/* ================= HERO SLIDER — Ken Burns ================= */}
      <section className="relative h-screen min-h-[700px] w-full flex items-center justify-center pt-20 overflow-hidden">
        {/* Ken Burns image layers */}
        {HERO_IMAGES.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === heroIndex ? 'opacity-100' : 'opacity-0'}`}
            style={{ zIndex: 0 }}
          >
            <div
              className={`w-full h-full bg-cover transition-transform duration-[8000ms] ease-linear ${
                i === heroIndex ? 'scale-110' : 'scale-100'
              }`}
              style={{
                backgroundImage: `url("${img.src}")`,
                backgroundPosition: img.position,
              }}
            />
          </div>
        ))}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-white/50" style={{ zIndex: 1 }} />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/30 to-white/70" style={{ zIndex: 1 }} />

        {/* Hero content */}
        <div className="relative max-w-5xl mx-auto px-6 text-center flex flex-col items-center" style={{ zIndex: 2 }}>
          <span className="inline-block py-1 px-4 mb-8 text-xs font-bold tracking-[0.2em] uppercase bg-white/90 backdrop-blur-sm text-charcoal border border-gray-200 rounded-full shadow-sm">
            {t('home.hero.tag')}
          </span>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-extrabold text-editorial-black mb-8 leading-[1.1] tracking-tight">
            {t('home.hero.title1')}<br />
            <span className="text-gray-500">{t('home.hero.title2')}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-12 font-medium leading-relaxed">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <Link to="/valuation" className="h-14 px-10 bg-charcoal hover:bg-brand-blue-600 text-white text-sm font-bold tracking-widest uppercase rounded shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 focus-visible:ring-offset-2">
              {t('home.hero.cta.valuation')}
            </Link>
            <Link to="/properties" className="group text-editorial-black font-bold text-sm tracking-wide border-b border-editorial-black pb-1 hover:text-brand-blue-600 hover:border-brand-blue-600 transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500">
              {t('home.hero.cta.sold')}
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>

          {/* Dot indicators */}
          <div className="flex gap-3 mt-12" style={{ zIndex: 2 }}>
            {HERO_IMAGES.map((_, i) => (
              <button
                key={i}
                aria-label={`Ir a imagen ${i + 1}`}
                onClick={() => setHeroIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 ${
                  i === heroIndex ? 'bg-editorial-black scale-125' : 'bg-gray-400 hover:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section — animated counters */}
      <StatsSection />

      {/* Sticky Scroll Interactive Marketing Section */}
      <InteractiveMarketingSection />

      <section className="py-24 bg-editorial-gray overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-24">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">{t('home.recent.title')}</h2>
            <div className="flex gap-2">
              <button onClick={() => scroll('left')} aria-label="Previous property" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500">
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <button onClick={() => scroll('right')} aria-label="Next property" className="w-10 h-10 rounded-full bg-brand-blue-500 text-white flex items-center justify-center hover:bg-brand-blue-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-8 pb-8 hide-scrollbar snap-x snap-mandatory scroll-smooth"
          >
            {recentProperties.map(property => {
              const statusText = property.status === 'sold' ? t('home.recent.sold') : (language === 'es' ? 'Reservado' : 'Reserved');
              const displayImage = property.image || (property.images && property.images.length > 0 ? property.images[0] : '');
              
              return (
              <Link key={property.id} to={`/property/${property.id}`} className="snap-center shrink-0 w-[85vw] md:w-[500px] bg-white rounded-lg overflow-hidden shadow-editorial hover:shadow-xl transition-shadow duration-300 block group">
                <div className="w-full h-64 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url("${displayImage}")` }}>
                  <div className="p-4 flex justify-end">
                    <span className="bg-editorial-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">{statusText}</span>
                  </div>
                </div>
                <div className="p-6 relative z-10 bg-white">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold leading-tight mb-1 group-hover:text-brand-blue-600 transition-colors line-clamp-1 truncate">{property.title}</h3>
                    <p className="text-sm text-gray-500 truncate">{property.location}</p>
                  </div>
                  <div className="space-y-3 bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200 border-dashed">
                      <span className="text-xs font-bold uppercase text-gray-400 tracking-wide">{t('home.recent.sold_price')}</span>
                      <span className="text-sm font-bold text-green-600">{property.price}</span>
                    </div>
                    {property.dateListed && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase text-gray-400 tracking-wide">{language === 'es' ? 'Publicado' : 'Listed'}</span>
                      <span className="text-sm font-bold text-editorial-black">{property.dateListed}</span>
                    </div>
                    )}
                  </div>
                </div>
              </Link>
            )})}
            {recentProperties.length === 0 && (
              <div className="w-full text-center py-12 text-gray-500 font-medium tracking-wide">
                {language === 'es' ? 'No hay transacciones recientes disponibles en el CRM.' : 'No recent transactions available in the CRM.'}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= CONTACT FORM SECTION ================= */}
      <section className="py-24 bg-editorial-black relative overflow-hidden">
        {/* Decorative geometric accent */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-5 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 80% 50%, #2563eb 0%, transparent 70%)' }} />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — copy */}
            <div>
              <span className="text-brand-blue-400 font-bold tracking-widest uppercase text-xs mb-4 block">{t('home.contact.tag')}</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                {t('home.contact.title').split('\n').map((line, i, arr) =>
                  i < arr.length - 1
                    ? <span key={i}>{line}<br /></span>
                    : <span key={i} className="text-brand-blue-400">{line}</span>
                )}
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-10">
                {t('home.contact.subtitle')}
              </p>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-blue-500/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-brand-blue-400 text-base">call</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-0.5">{t('common.phone')}</p>
                    <a href="tel:+34618063000" className="text-white font-semibold hover:text-brand-blue-400 transition-colors">+34 618 063 000</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-blue-500/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-brand-blue-400 text-base">mail</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-0.5">{t('common.email')}</p>
                    <a href="mailto:hola@essenciainmobiliaria.com" className="text-white font-semibold hover:text-brand-blue-400 transition-colors">hola@essenciainmobiliaria.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-blue-500/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-brand-blue-400 text-base">location_on</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-0.5">{t('footer.office') || 'Oficina'}</p>
                    <p className="text-white font-semibold">C/ Sant Vicent Ferrer 24, Gandia, Valencia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <HomeContactForm />
          </div>
        </div>
      </section>

      {/* ================= FREE VALUATION CTA ================= */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-brand-blue-500/5 -skew-x-12 hidden lg:block"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <span className="text-brand-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">{t('home.value.tag')}</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-editorial-black">{t('home.value.title')}</h2>
          <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">{t('home.value.subtitle')}</p>
          <div className="bg-white p-2 rounded shadow-xl border border-gray-100 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
            <div className="relative grow">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined">search</span>
              <input type="text" placeholder={t('home.value.placeholder')} className="w-full h-12 pl-12 pr-4 bg-transparent border-none focus:ring-0 text-editorial-black placeholder-gray-400 rounded" />
            </div>
            <Link to="/valuation" className="h-12 px-8 bg-brand-blue-500 hover:bg-brand-blue-600 text-white font-bold rounded transition-colors whitespace-nowrap flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500">
              {t('home.value.button')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;