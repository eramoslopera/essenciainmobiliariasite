import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { useLanguage } from '../context/LanguageContext';
import { fetchProperties } from '../src/utils/xmlParser';
import { Property } from '../src/types/property';
import { translateFeature } from '../src/utils/translator';

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage(); // access language to pick description
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      // Optimize: could pass property via state from list to avoid re-fetch, but direct link needs fetch.
      // For now, fetch all because we don't have a backend to fetch single.
      const props = await fetchProperties();
      const found = props.find(p => p.id === parseInt(id));
      if (found) setProperty(found);
      setLoading(false);
    };
    load();
  }, [id]);

  const images = property?.images && property.images.length > 0 ? property.images : (property?.image ? [property.image] : []);

  const nextImage = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (images.length === 0) return;
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (images.length === 0) return;
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDownload = () => {
    alert("Downloading area guide...");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 gap-4">
        <h1 className="text-2xl font-bold">Property not found</h1>
        <Link to="/properties" className="text-primary hover:underline">Return to properties</Link>
      </div>
    );
  }

  // Description logic
  const description = property.description
    ? (language === 'es' ? property.description.es : property.description.en) || property.description.en || property.description.es
    : t('detail.desc.p1'); // Fallback if no desc

  // Split description into paragraphs if it's long
  const descParagraphs = description.split('\n').filter(p => p.trim() !== '');


  return (
    <>
      <main className="pt-28 pb-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                {property.type === 'Villa' && <span className="px-2 py-1 bg-black text-white text-[10px] uppercase font-bold tracking-widest rounded-sm">{t('detail.label.exclusive')}</span>}
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{property.location}</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-light tracking-tighter text-editorial-black leading-[0.95]">
                {property.title}
              </h1>
            </div>
            <div className="flex flex-col items-start lg:items-end">
              <p className="text-4xl lg:text-5xl font-bold tracking-tight text-editorial-black mb-1">{property.price}</p>
              {property.size && <p className="text-sm text-gray-500 font-medium">{parseInt(property.price.replace(/\D/g, '')) / parseInt(property.size) > 0 ? "€" + Math.round(parseInt(property.price.replace(/\D/g, '')) / parseInt(property.size)).toLocaleString() + "/m²" : ""}</p>}
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-24">
          <div className="relative w-full h-[50vh] md:h-[70vh] bg-gray-100 rounded-lg overflow-hidden group mb-4">
            {/* Main Image with Transition */}
            <div className="w-full h-full relative">
              {images.length > 0 ? images.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                  style={{ backgroundImage: `url("${img}")` }}
                />
              )) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400">No images available</div>
              )}
            </div>

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white backdrop-blur-md flex items-center justify-center text-white hover:text-black transition-all transform hover:scale-110 z-20 shadow-lg border border-white/10"
                  aria-label="Previous image"
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white backdrop-blur-md flex items-center justify-center text-white hover:text-black transition-all transform hover:scale-110 z-20 shadow-lg border border-white/10"
                  aria-label="Next image"
                >
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </>
            )}

            {/* Image Counter Badge */}
            {images.length > 0 && (
              <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">photo_library</span>
                {currentImageIndex + 1} / {images.length}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4 overflow-x-auto pb-2 hide-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`relative aspect-[4/3] rounded-lg overflow-hidden transition-all duration-300 group ${currentImageIndex === idx ? 'ring-2 ring-primary ring-offset-2 opacity-100' : 'opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  {currentImageIndex === idx && (
                    <div className="absolute inset-0 bg-primary/10"></div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap gap-8 py-8 border-y border-gray-100 mb-10">
              {property.beds ? (
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-3xl text-gray-400 font-light">bed</span>
                  <div>
                    <p className="text-lg font-bold">{property.beds}</p>
                    <p className="text-xs uppercase text-gray-400 tracking-wider">{t('detail.beds')}</p>
                  </div>
                </div>
              ) : null}
              {property.baths ? (
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-3xl text-gray-400 font-light">bathtub</span>
                  <div>
                    <p className="text-lg font-bold">{property.baths}</p>
                    <p className="text-xs uppercase text-gray-400 tracking-wider">{t('detail.baths')}</p>
                  </div>
                </div>
              ) : null}
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-3xl text-gray-400 font-light">square_foot</span>
                <div>
                  <p className="text-lg font-bold">{property.size}</p>
                  <p className="text-xs uppercase text-gray-400 tracking-wider">{t('detail.interior')}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-3xl text-gray-400 font-light">garage_home</span>
                <div>
                  <p className="text-lg font-bold">Yes</p>
                  <p className="text-xs uppercase text-gray-400 tracking-wider">{t('detail.garage')}</p>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none mb-16">
              <h3 className="text-2xl font-bold mb-6">{t('detail.about_property')} {property.title}</h3>
              {descParagraphs.length > 0 ? (
                descParagraphs.map((p, i) => <p key={i} className="text-gray-600 leading-relaxed mb-6">{p}</p>)
              ) : (
                <p className="text-gray-600 leading-relaxed mb-6">No description available.</p>
              )}
            </div>

            <div className="bg-editorial-gray p-8 rounded-lg mb-12">
              <h4 className="font-bold text-lg mb-6 uppercase tracking-widest">{t('detail.amenities')}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                {property.features && property.features.length > 0 ? (
                  property.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                      <span className="text-sm font-medium">{translateFeature(feature, language as 'es' | 'en' | 'fr' | 'de' | 'va')}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No amenities listed.</p>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 relative">
            <div className="sticky top-24">
              <div className="bg-white border border-gray-200 shadow-2xl shadow-gray-200/50 p-8 rounded-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gray-200 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBeO_psb5EsZUge1Q9z9Z0VTEVDOkjmZqJ0_iWuqs1ZjDjturTC925sUpjY4SLbxjQNJNqlgkcv568Kjd5zvvCEIqbffK35jIWjZbAI_u5r_d_Sj57l_m9A8bJN7LcCmSlWATG8dzcBzvdTPFArI7AAtc--NaEpg0seD4lB3ek7ceC2iRhSFh-4fCJ4WP6rjzsj8Ow9cQB3NTjhprnKxcP9IcaFNAN9hsEGC0TUGR1IfZGlIpMPtAeaP1480Wg3sxZR8HyGCiot")' }}></div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Agent</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Essencia Inmobiliaria</p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{t('detail.book_tour')}</h3>
                <p className="text-sm text-gray-500 mb-6">{t('detail.book_tour_desc')}</p>
                <form className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">{t('common.name')}</label>
                    <input className="w-full bg-editorial-gray border-none rounded px-4 py-3 text-sm focus:ring-2 focus:ring-primary" placeholder="Name" type="text" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">{t('common.email')}</label>
                    <input className="w-full bg-editorial-gray border-none rounded px-4 py-3 text-sm focus:ring-2 focus:ring-primary" placeholder="Email" type="email" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">{t('common.phone')}</label>
                    <input className="w-full bg-editorial-gray border-none rounded px-4 py-3 text-sm focus:ring-2 focus:ring-primary" placeholder="Phone" type="tel" />
                  </div>
                  <button type="button" onClick={() => alert("Request sent!")} className="w-full bg-black text-white font-bold py-4 rounded mt-4 hover:bg-primary transition-colors flex items-center justify-center gap-2">
                    {t('detail.request')}
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                  <p className="text-xs text-center text-gray-400 mt-4">{t('detail.form.privacy')}</p>
                </form>

                <Link
                  to={`/contact?interest=Buying+a+property&message=I+would+like+to+inquire+about+${property.title}+ref+${property.id}`}
                  className="w-full bg-white border border-gray-300 text-editorial-black font-bold py-4 rounded mt-4 hover:border-editorial-black hover:bg-gray-50 transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest"
                >
                  <span className="material-symbols-outlined text-base">person</span>
                  {t('detail.contact_agent')}
                </Link>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center gap-6">
                  <a href="#" className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">call</span> {t('detail.call')}
                  </a>
                  <a href="https://wa.me/34600000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">chat</span> {t('detail.whatsapp')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className="py-20 bg-editorial-gray">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/3">
              <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block">{t('detail.location_insights')}</span>
              <h2 className="text-4xl font-bold mb-6">{property.location}</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {(() => {
                  const loc = property.location.toLowerCase();
                  if (loc.includes('gandia') || loc.includes('gandía')) return t('detail.location_desc.gandia');
                  if (loc.includes('oliva')) return t('detail.location_desc.oliva');
                  if (loc.includes('valencia')) return t('detail.location_desc.valencia');
                  return t('detail.location_desc.default');
                })()}
              </p>
              <button onClick={handleDownload} className="mt-8 text-sm font-bold uppercase tracking-wider border-b-2 border-black pb-1 hover:text-primary hover:border-primary transition-colors">
                {t('detail.location.download')}
              </button>
            </div>
            <div className="w-full md:w-2/3 h-[400px] bg-gray-200 relative rounded-lg overflow-hidden isolate map-container">
              {property.lat && property.lng ? (
                <MapContainer
                  center={[property.lat, property.lng]}
                  zoom={14}
                  scrollWheelZoom={false}
                  className="h-full w-full z-0"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  />
                  <CircleMarker center={[property.lat, property.lng]} radius={8} pathOptions={{ color: '#000', fillColor: '#000', fillOpacity: 1 }}>
                    <Popup>
                      {property.title}
                    </Popup>
                  </CircleMarker>
                </MapContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">Map not available</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyDetail;