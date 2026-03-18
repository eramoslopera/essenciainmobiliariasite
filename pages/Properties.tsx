import React, { useState, useEffect, useRef } from 'react';
import { fetchProperties } from '../src/utils/xmlParser';
import { Property, Badge } from '../src/types/property';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import PropertySkeleton from '../components/PropertySkeleton';
import SEOHead from '../components/SEOHead';
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl } from 'react-leaflet';
import L from 'leaflet';

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
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{t('properties.filters.zone')}</label>
                <select
                  value={filterZone}
                  onChange={(e) => setFilterZone(e.target.value)}
                  className="bg-transparent border-b border-gray-200 py-2 pr-8 pl-0 text-sm font-bold text-editorial-black focus:ring-0 focus:border-brand-blue-500 cursor-pointer min-w-[140px]"
                >
                  <option>{t('prop.filters.all_zones')}</option>
                  <option>{t('properties.location.gandia')}</option>
                  <option>{t('properties.location.valencia')}</option>
                  <option>{t('properties.location.oliva')}</option>
                </select>
              </div>
              <div className="group relative">
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{t('properties.filters.type')}</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-transparent border-b border-gray-200 py-2 pr-8 pl-0 text-sm font-bold text-editorial-black focus:ring-0 focus:border-brand-blue-500 cursor-pointer min-w-[140px]"
                >
                  <option>{t('prop.filters.all_types')}</option>
                  <option>{t('prop.filters.villas')}</option>
                  <option>{t('prop.filters.apartments')}</option>
                  <option value="Penthouses">{t('properties.filter.penthouses')}</option>
                </select>
              </div>
              <div className="group relative">
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{t('properties.filters.price')}</label>
                <select
                  value={filterPrice}
                  onChange={(e) => setFilterPrice(e.target.value)}
                  className="bg-transparent border-b border-gray-200 py-2 pr-8 pl-0 text-sm font-bold text-editorial-black focus:ring-0 focus:border-brand-blue-500 cursor-pointer min-w-[140px]"
                >
                  <option>{t('prop.filters.any_price')}</option>
                  <option>{t('properties.price.range1')}</option>
                  <option>{t('properties.price.range2')}</option>
                  <option>{t('properties.price.range3')}</option>
                </select>
              </div>
              <div className="group relative">
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{t('properties.sort.label')}</label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-transparent border-b border-gray-200 py-2 pr-8 pl-0 text-sm font-bold text-editorial-black focus:ring-0 focus:border-brand-blue-500 cursor-pointer min-w-[140px]"
                >
                  <option value="newest">{t('properties.sort.newest')}</option>
                  <option value="price_asc">{t('properties.sort.price_low')}</option>
                  <option value="price_desc">{t('properties.sort.price_high')}</option>
                  <option value="beds">{t('properties.sort.beds')}</option>
                </select>
              </div>
              <button className="ml-auto lg:ml-4 h-10 px-6 bg-editorial-black hover:bg-brand-blue-600 text-white font-bold text-sm tracking-wide rounded transition-colors flex items-center gap-2">
                {t('common.search')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow max-w-[1440px] mx-auto w-full px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative items-start">

          {/* List Column */}
          <div className="lg:col-span-6 pb-20">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                <PropertySkeleton count={6} />
              </div>
            ) : sortedProperties.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <span className="material-symbols-outlined text-4xl mb-2">filter_alt_off</span>
                <p className="font-bold">{t('properties.no_results')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-8">

                {sortedProperties.map((property, index) => {
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
                        className={`rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${activePropertyId === property.id ? 'ring-2 ring-brand-blue-500 ring-offset-4 scale-[1.02] shadow-xl' : ''}`}
                      >
                        <Link to={`/property/${property.id}`} className="group cursor-pointer block">
                          <div className="relative aspect-[3/2] overflow-hidden rounded bg-gray-100 mb-3">
                            {/* Image */}
                            <div
                              className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 ${property.isComingSoon ? 'grayscale hover:grayscale-0' : ''}`}
                              style={{ backgroundImage: `url("${property.image}")` }}
                            ></div>

                            {/* Save Button */}
                            <button
                              onClick={(e) => toggleSave(e, property.id)}
                              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                              aria-label={savedProperties.has(property.id) ? "Unsave property" : "Save property"}
                            >
                              <span
                                className={`material-symbols-outlined text-xl transition-colors ${savedProperties.has(property.id) ? 'text-red-500' : 'text-gray-600'}`}
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
                              const bgClass = badge.variant === 'primary' ? 'bg-brand-blue-600' : (badge.variant === 'white' ? 'bg-white' : (badge.variant === 'black' ? 'bg-editorial-black' : 'bg-gray-100'));
                              const textClass = badge.variant === 'primary' ? 'text-white' : (badge.variant === 'white' ? 'text-editorial-black' : (badge.variant === 'black' ? 'text-white' : 'text-gray-800'));

                              // Check if it is the recently sold badge to apply animation
                              const isSoldBadge = badge.variant === 'black' && badge.text === t('properties.badges.sold');

                              return (
                                <div key={i} className={`absolute top-4 left-4 ${bgClass} ${textClass} px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-sm shadow-sm ${i > 0 ? 'mt-8' : ''} ${isSoldBadge ? 'animate-badge-in' : ''}`}>
                                  {badge.text}
                                </div>
                              );
                            })}
                          </div>

                          {/* Info */}
                          <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="text-base font-bold text-editorial-black leading-tight group-hover:text-brand-blue-600 transition-colors">{property.title}</h3>
                                <p className="text-xs text-gray-500 font-medium">{property.location}</p>
                              </div>
                              <span className={`text-base font-bold ${property.price === 'On Request' ? 'text-gray-400' : 'text-brand-blue-600'}`}>{property.price}</span>
                          </div>

                          {/* Features */}
                          <div className="flex items-center gap-5 text-xs font-bold text-gray-400 uppercase tracking-wide border-t border-gray-100 pt-3 mt-1">
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

                          {/* Contact Agent Button */}
                          <a
                            href={`https://wa.me/34618063000?text=${encodeURIComponent(`Hola, me interesa la propiedad ${property.title} en ${property.location}. ¿Podéis darme más información?`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-full mt-3 py-2 border border-gray-200 hover:border-[#25D366] text-editorial-black hover:text-[#25D366] text-xs font-bold uppercase tracking-widest hover:bg-[#25D366]/5 transition-colors rounded flex items-center justify-center gap-2"
                          >
                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="" className="w-3.5 h-3.5" />
                            {t('detail.contact_agent')}
                          </a>
                        </Link>
                      </div>

                      {/* Inject Market Banner after second item */}
                      {index === 1 && (
                        <div className="md:col-span-2 bg-editorial-gray rounded p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-100 relative overflow-hidden">
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

            <div className="mt-20 flex justify-center gap-2 pb-10">
              <button onClick={handleScrollTop} className="w-10 h-10 flex items-center justify-center border border-editorial-black bg-editorial-black text-white rounded font-bold">1</button>
              <button onClick={handleScrollTop} className="w-10 h-10 flex items-center justify-center border border-gray-200 hover:border-editorial-black rounded font-bold transition-colors">2</button>
              <button onClick={handleScrollTop} className="w-10 h-10 flex items-center justify-center border border-gray-200 hover:border-editorial-black rounded font-bold transition-colors">3</button>
              <span className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
              <button onClick={handleScrollTop} className="w-10 h-10 flex items-center justify-center border border-gray-200 hover:border-editorial-black rounded font-bold transition-colors">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Map Column (Sticky) */}
          <div className="hidden lg:block lg:col-span-6 h-[calc(100vh-10rem)] sticky top-[10.5rem]">
            <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl border border-gray-200 relative">
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