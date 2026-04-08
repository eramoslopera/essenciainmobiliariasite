import React, { useState, useEffect, useRef } from 'react';
import { fetchProperties } from '../src/utils/xmlParser';
import { Property, Badge } from '../src/types/property';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import PropertySkeleton from '../components/PropertySkeleton';
import SEOHead from '../components/SEOHead';
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import { WhatsappLogo } from '@phosphor-icons/react';

// Fix for default Leaflet marker icons in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom Icon for Active State
const activeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'marker-pulse'
});

const defaultIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const soldIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});



// Component to handle map interactions based on props
const MapController: React.FC<{ activeId: number | null; properties: Property[] }> = ({ activeId, properties }) => {
  const map = useMap();

  useEffect(() => {
    if (activeId) {
      const activeProp = properties.find(p => p.id === activeId);
      // Validate lat/lng to prevent Leaflet errors
      if (activeProp && typeof activeProp.lat === 'number' && typeof activeProp.lng === 'number' && !isNaN(activeProp.lat) && !isNaN(activeProp.lng)) {
        map.flyTo([activeProp.lat, activeProp.lng], 13, {
          duration: 1.5
        });
      }
    }
  }, [activeId, map, properties]);

  return null;
};

const Properties: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activePropertyId, setActivePropertyId] = useState<number | null>(null);
  const propertyRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Filters State
  const [filterZone, setFilterZone] = useState('All Zones');
  const [filterType, setFilterType] = useState('All Types');
  const [filterPrice, setFilterPrice] = useState('Any Price');
  const [sortOption, setSortOption] = useState('newest');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const handleFilterChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value);
    setCurrentPage(1);
  };

  // State for properties
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProperties = async () => {
      setIsLoading(true);
      const fetched = await fetchProperties();
      setProperties(fetched);
      setIsLoading(false);
    };
    loadProperties();
  }, [t]);

  // Use state properties instead of constant
  const PROPERTIES = properties;

  // Initialize state from localStorage
  const [savedProperties, setSavedProperties] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem('saved_properties');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch (e) {
      console.error("Failed to load saved properties:", e);
      return new Set();
    }
  });

  const toggleSave = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();

    setSavedProperties((prev) => {
      const newSaved = new Set(prev);
      if (newSaved.has(id)) {
        newSaved.delete(id);
      } else {
        newSaved.add(id);
      }
      try {
        localStorage.setItem('saved_properties', JSON.stringify(Array.from(newSaved)));
      } catch (e) {
        console.error("Failed to save properties:", e);
      }
      return newSaved;
    });
  };

  const parsePrice = (priceStr: string): number => {
    // Check if price is a number or contains digits
    const numericPart = priceStr.replace(/[^0-9]/g, '');
    if (!numericPart) return 999999999; // Treat "On Request" (no digits) as high price
    return parseInt(numericPart, 10);
  }

  const isRecentlySold = (dateSold?: string) => {
    if (!dateSold) return false;
    const soldDate = new Date(dateSold);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - soldDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  const matchesFilters = (property: Property) => {
    // Zone Filter
    if (filterZone !== 'All Zones') {
      if (filterZone === 'Gandia') {
        if (!property.location.includes('Gandia') && !property.location.includes('Daimús')) return false;
      } else if (filterZone === 'Valencia City') {
        if (!property.location.includes('Ruzafa') && property.location !== 'Valencia City, Valencia') return false;
      } else if (filterZone === 'Oliva Nova') {
        if (!property.location.includes('Oliva Nova')) return false;
      }
    }

    // Type Filter
    if (filterType !== 'All Types') {
      if (filterType === 'Villas' && property.type !== 'Villa') return false;
      if (filterType === 'Apartments' && property.type !== 'Apartment') return false;
      if (filterType === 'Penthouses' && !property.title.includes('Penthouse')) return false;
    }

    // Price Filter
    if (filterPrice !== 'Any Price') {
      const price = parsePrice(property.price);
      if (filterPrice === '€250k - €500k' && (price < 250000 || price > 500000)) return false;
      if (filterPrice === '€500k - €1M' && (price < 500000 || price > 1000000)) return false;
      if (filterPrice === '€1M+' && price < 1000000) return false;
    }

    return true;
  };

  const getFilteredAndSortedProperties = () => {
    let result = PROPERTIES.filter(matchesFilters);

    result.sort((a, b) => {
      if (sortOption === 'newest') {
        return new Date(b.dateListed).getTime() - new Date(a.dateListed).getTime();
      }
      if (sortOption === 'price_asc') {
        return parsePrice(a.price) - parsePrice(b.price);
      }
      if (sortOption === 'price_desc') {
        return parsePrice(b.price) - parsePrice(a.price);
      }
      if (sortOption === 'beds') {
        return (b.beds || 0) - (a.beds || 0);
      }
      return 0;
    });
    return result;
  };

  const sortedProperties = getFilteredAndSortedProperties();
  const totalPages = Math.ceil(sortedProperties.length / ITEMS_PER_PAGE);
  const paginatedProperties = sortedProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  // Handle marker click: scroll list to item
  const handleMarkerClick = (id: number) => {
    setActivePropertyId(id);
    const element = propertyRefs.current.get(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
    <SEOHead
      title="Propiedades Exclusivas en Venta"
      description="Explora propiedades de lujo en Gandia, Oliva, Denia y la costa de Valencia. Villas, chalets, áticos y pisos en ubicaciones privilegiadas."
      canonical="https://essenciainmobiliaria.com/properties"
    />
    <div className="pt-20 flex flex-col min-h-screen">
      {/* Header Filters */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-colors shrink-0">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
            <div>
              <h1 className="text-3xl font-black tracking-tight uppercase text-editorial-black">{t('properties.title')}</h1>
              <p className="text-sm text-gray-500 mt-1 font-medium">{sortedProperties.length} {t('properties.subtitle')}</p>
            </div>
            <div className="w-full lg:w-auto flex flex-wrap gap-4 lg:gap-8 items-center">
              <div className="group relative">
                <label htmlFor="filter-zone" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{t('properties.filters.zone')}</label>
                <select
                  id="filter-zone"
                  value={filterZone}
                  onChange={(e) => handleFilterChange(setFilterZone, e.target.value)}
                  className="bg-transparent appearance-none border-b border-gray-200 rounded-none py-2 pr-8 pl-0 text-sm font-bold text-editorial-black focus:outline-none focus:border-editorial-black focus-visible:ring-2 focus-visible:ring-brand-blue-500 cursor-pointer min-w-[140px]"
                >
                  <option>{t('prop.filters.all_zones')}</option>
                  <option>{t('properties.location.gandia')}</option>
                  <option>{t('properties.location.valencia')}</option>
                  <option>{t('properties.location.oliva')}</option>
                </select>
              </div>
              <div className="group relative">
                <label htmlFor="filter-type" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{t('properties.filters.type')}</label>
                <select
                  id="filter-type"
                  value={filterType}
                  onChange={(e) => handleFilterChange(setFilterType, e.target.value)}
                  className="bg-transparent appearance-none border-b border-gray-200 rounded-none py-2 pr-8 pl-0 text-sm font-bold text-editorial-black focus:outline-none focus:border-editorial-black focus-visible:ring-2 focus-visible:ring-brand-blue-500 cursor-pointer min-w-[140px]"
                >
                  <option>{t('prop.filters.all_types')}</option>
                  <option>{t('prop.filters.villas')}</option>
                  <option>{t('prop.filters.apartments')}</option>
                  <option value="Penthouses">{t('properties.filter.penthouses')}</option>
                </select>
              </div>
              <div className="group relative">
                <label htmlFor="filter-price" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{t('properties.filters.price')}</label>
                <select
                  id="filter-price"
                  value={filterPrice}
                  onChange={(e) => handleFilterChange(setFilterPrice, e.target.value)}
                  className="bg-transparent appearance-none border-b border-gray-200 rounded-none py-2 pr-8 pl-0 text-sm font-bold text-editorial-black focus:outline-none focus:border-editorial-black focus-visible:ring-2 focus-visible:ring-brand-blue-500 cursor-pointer min-w-[140px]"
                >
                  <option>{t('prop.filters.any_price')}</option>
                  <option>{t('properties.price.range1')}</option>
                  <option>{t('properties.price.range2')}</option>
                  <option>{t('properties.price.range3')}</option>
                </select>
              </div>
              <div className="group relative">
                <label htmlFor="filter-sort" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{t('properties.sort.label')}</label>
                <select
                  id="filter-sort"
                  value={sortOption}
                  onChange={(e) => handleFilterChange(setSortOption, e.target.value)}
                  className="bg-transparent appearance-none border-b border-gray-200 rounded-none py-2 pr-8 pl-0 text-sm font-bold text-editorial-black focus:outline-none focus:border-editorial-black focus-visible:ring-2 focus-visible:ring-brand-blue-500 cursor-pointer min-w-[140px]"
                >
                  <option value="newest">{t('properties.sort.newest')}</option>
                  <option value="price_asc">{t('properties.sort.price_low')}</option>
                  <option value="price_desc">{t('properties.sort.price_high')}</option>
                  <option value="beds">{t('properties.sort.beds')}</option>
                </select>
              </div>
              <button type="button" className="ml-auto lg:ml-4 h-10 px-6 bg-editorial-black hover:bg-gray-800 text-white font-bold text-xs tracking-[0.15em] uppercase rounded-sm transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-blue-500">
                {t('common.search')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow max-w-[1440px] mx-auto w-full px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative items-start">

          {/* List Column */}
          <div className="lg:col-span-4 pb-20">
            {isLoading ? (
              <div className="grid grid-cols-1 gap-y-8">
                <PropertySkeleton count={6} />
              </div>
            ) : sortedProperties.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400" role="status">
                <span className="material-symbols-outlined text-4xl mb-2" aria-hidden="true">filter_alt_off</span>
                <p className="font-bold">{t('properties.no_results')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-y-8">

                {paginatedProperties.map((property, index) => {
                  const badges: Badge[] = [...(property.badges || [])];
                  if (isRecentlySold(property.dateSold)) {
                    badges.unshift({ text: t('properties.badges.sold'), type: 'standard', variant: 'black' });
                  }

                  return (
                    <React.Fragment key={property.id}>
                      <div
                        ref={(el) => { if (el) propertyRefs.current.set(property.id, el); }}
                        onMouseEnter={() => setActivePropertyId(property.id)}
                        onMouseLeave={() => setActivePropertyId(null)}
                        className={`group relative flex flex-col p-3 rounded-3xl transition-all duration-500 ease-out bg-white ${activePropertyId === property.id ? 'shadow-diffusion-hover -translate-y-1 ring-1 ring-black/5' : 'hover:shadow-diffusion-hover hover:-translate-y-1 hover:ring-1 hover:ring-black/5 border border-transparent'}`}
                      >
                        <Link to={`/property/${property.id}`} className="group cursor-pointer block">
                            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-gray-100 mb-4">
                              {/* Image */}
                              <div
                                className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-105 ${property.isComingSoon ? 'grayscale hover:grayscale-0' : ''}`}
                                style={{ backgroundImage: `url("${property.image}")` }}
                              ></div>

                            {/* Save Button */}
                            <button
                              onClick={(e) => toggleSave(e, property.id)}
                              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/70 backdrop-blur-md border border-white/50 flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500"
                              aria-label={savedProperties.has(property.id) ? "Unsave property" : "Save property"}
                            >
                              <span
                                className={`material-symbols-outlined text-xl transition-colors ${savedProperties.has(property.id) ? 'text-red-500' : 'text-gray-600'}`}
                                aria-hidden="true"
                                style={savedProperties.has(property.id) ? { fontVariationSettings: "'FILL' 1" } : {}}
                              >
                                favorite
                              </span>
                            </button>

                            {/* Badges */}
                            {badges.map((badge, i) => {
                              if (badge.type === 'coming-soon') {
                                return (
                                  <div key={i} className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                    <span className="bg-white/90 backdrop-blur-sm text-black px-4 py-2 font-bold uppercase tracking-widest text-xs rounded-sm shadow-lg">{badge.text}</span>
                                  </div>
                                );
                              }
                              if (badge.type === 'photo') {
                                return (
                                  <div key={i} className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 text-white text-xs font-bold rounded-sm">
                                    <span className="material-symbols-outlined text-sm align-middle mr-1">photo_camera</span> {badge.text}
                                  </div>
                                );
                              }
                              // Standard badges
                              const isSoldBadge = badge.variant === 'black' && badge.text === t('properties.badges.sold');
                              const glassClass = isSoldBadge ? 'bg-editorial-black/80 text-white border border-white/10' : 'bg-white/70 text-editorial-black border border-white/50';

                              return (
                                <div key={i} className={`absolute top-4 left-4 ${glassClass} backdrop-blur-md px-3 py-1.5 text-[10px] font-black tracking-[0.2em] uppercase rounded-full shadow-sm ${i > 0 ? 'mt-10' : ''} ${isSoldBadge ? 'animate-badge-in' : ''}`}>
                                  {badge.text}
                                </div>
                              );
                            })}
                          </div>

                          {/* Info */}
                          <div className="flex flex-col gap-1 px-1 mb-3">
                              <div className="flex justify-between items-start">
                                <h3 className="text-lg font-black text-editorial-black leading-tight group-hover:text-brand-blue-600 transition-colors pr-2 line-clamp-1">{property.title}</h3>
                                <span className={`text-lg font-black whitespace-nowrap ${property.price === 'On Request' ? 'text-gray-400' : 'text-brand-blue-600'}`}>{property.price}</span>
                              </div>
                              <p className="text-sm text-gray-500 font-medium">{property.location}</p>
                          </div>

                          {/* Features */}
                          <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-t border-gray-100 pt-3 px-1">
                            {property.beds && (
                              <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-base">bed</span> {property.beds} {t('properties.card.beds')}</span>
                            )}
                            {property.baths && (
                              <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-base">shower</span> {property.baths} {t('properties.card.baths')}</span>
                            )}
                            <span className="flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-base">{property.type === 'Project' ? 'apartment' : 'square_foot'}</span>
                              {property.type === 'Project' ? t('properties.type.project') : property.size}
                            </span>
                          </div>

                        </Link>

                        {/* Contact Agent Button */}
                        <a
                          href={`https://wa.me/34647803355?text=${encodeURIComponent(`Hola, me interesa la propiedad ${property.title} en ${property.location}. ¿Podéis darme más información?`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-full mt-4 py-2.5 border border-gray-200 text-editorial-black hover:!text-[#25D366] hover:!border-[#25D366] group-hover:border-editorial-black group-hover:text-editorial-black text-[11px] font-black uppercase tracking-[0.2em] transition-colors rounded-full flex items-center justify-center gap-2"
                        >
                          <WhatsappLogo weight="fill" className="w-5 h-5 transition-transform group-hover:scale-110" aria-hidden="true" />
                          {t('detail.contact_agent')}
                        </a>
                      </div>

                      {/* Inject Market Banner after second item on first page */}
                      {index === 1 && currentPage === 1 && (
                        <div className="bg-editorial-gray rounded p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-100 relative overflow-hidden">
                          <div className="absolute -right-10 -top-10 text-gray-200 opacity-20 rotate-12">
                            <span className="material-symbols-outlined text-[150px]">trending_up</span>
                          </div>
                          <div className="flex-1 relative z-10">
                            <div className="flex items-center gap-2 mb-3 text-brand-blue-600">
                              <span className="text-xs font-bold uppercase tracking-widest bg-white px-2 py-1 rounded">{t('properties.market_insight')}</span>
                            </div>
                            <h3 className="text-2xl font-black mb-2 leading-tight">{t('properties.market_insight_title')}</h3>
                            <p className="text-sm text-gray-500">{t('properties.market_insight_desc')}</p>
                          </div>
                          <Link to={`/property/${property.id}`} className="shrink-0 font-bold text-sm border-b-2 border-editorial-black pb-0.5 hover:text-brand-blue-600 hover:border-brand-blue-500 transition-colors relative z-10">{t('detail.view')}</Link>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}

              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-20 flex justify-center items-center gap-1.5 pb-16 text-xs font-bold tracking-[0.1em]">
                {/* Previous Button */}
                <button 
                  onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); handleScrollTop(); }}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-sm text-editorial-black hover:bg-gray-100 transition-all active:scale-[0.98] disabled:opacity-30 disabled:hover:bg-transparent disabled:active:scale-100 border border-transparent hover:border-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500"
                  aria-label="Previous page"
                >
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_back</span>
                </button>
                
                {/* Pages */}
                {getPageNumbers().map((page, i) => (
                  typeof page === 'number' ? (
                    <button 
                      key={i}
                      onClick={() => { setCurrentPage(page); handleScrollTop(); }} 
                      className={`w-10 h-10 flex items-center justify-center rounded-sm transition-all active:scale-[0.98] ${
                        currentPage === page 
                          ? 'bg-editorial-black text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] ring-1 ring-editorial-black ring-offset-2' 
                          : 'text-gray-500 hover:text-editorial-black hover:bg-gray-100 hover:border hover:border-gray-200 border border-transparent'
                      }`}
                    >
                      {page}
                    </button>
                  ) : (
                    <span key={i} className="w-8 h-10 flex items-center justify-center text-gray-300 pointer-events-none">
                      {page}
                    </span>
                  )
                ))}
                
                {/* Next Button */}
                <button 
                  onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); handleScrollTop(); }}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-sm text-editorial-black hover:bg-gray-100 transition-all active:scale-[0.98] disabled:opacity-30 disabled:hover:bg-transparent disabled:active:scale-100 border border-transparent hover:border-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500"
                  aria-label="Next page"
                >
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
                </button>
              </div>
            )}
          </div>

          {/* Map Column (Sticky) */}
          <div className="hidden lg:block lg:col-span-8 h-[calc(100vh-10rem)] sticky top-[10.5rem]">
            <div className="w-full h-full rounded-sm overflow-hidden shadow-md border border-gray-200 relative">
              <MapContainer
                center={[39.1, -0.3]}
                zoom={9}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
                className="z-0"
              >
                <MapController activeId={activePropertyId} properties={PROPERTIES} />

                <LayersControl position="topright">
                  <LayersControl.BaseLayer checked name="Light Map">
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                      url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />
                  </LayersControl.BaseLayer>
                  <LayersControl.BaseLayer name="Dark Map">
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                      url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />
                  </LayersControl.BaseLayer>
                  <LayersControl.BaseLayer name="Satellite">
                    <TileLayer
                      attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />
                  </LayersControl.BaseLayer>
                </LayersControl>

                {PROPERTIES.map(property => {
                  const isVisible = matchesFilters(property);
                  if (typeof property.lat !== 'number' || typeof property.lng !== 'number' || isNaN(property.lat) || isNaN(property.lng)) {
                    return null;
                  }
                  return (
                    <Marker
                      key={property.id}
                      position={[property.lat, property.lng]}
                      icon={activePropertyId === property.id ? activeIcon : (property.status === 'sold' ? soldIcon : defaultIcon)}
                      opacity={isVisible ? 1 : 0}
                      interactive={isVisible}
                      zIndexOffset={activePropertyId === property.id ? 1000 : 0}
                      eventHandlers={{
                        click: () => handleMarkerClick(property.id),
                        mouseover: () => setActivePropertyId(property.id),
                        mouseout: () => setActivePropertyId(null),
                      }}
                    >
                      <Popup className="font-display">
                        <div className="w-48">
                          <div className="aspect-video bg-gray-100 rounded-sm mb-2 bg-cover bg-center" style={{ backgroundImage: `url(${property.image})` }}></div>
                          <h3 className="font-bold text-sm mb-1">{property.title}</h3>
                          <p className="text-xs text-gray-500 mb-1">{property.location}</p>
                          <p className="font-bold text-brand-blue-600">{property.price}</p>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>

              {/* Map overlay controls could go here */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-sm shadow-md z-[1000] text-xs font-bold uppercase tracking-wider pointer-events-none">
                {t('properties.map.interactive')}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  );
};

export default Properties;