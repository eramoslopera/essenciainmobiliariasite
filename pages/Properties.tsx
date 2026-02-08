import React, { useState, useEffect, useRef } from 'react';
import { fetchProperties } from '../src/utils/xmlParser';
import { Property, Badge } from '../src/types/property';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
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



// Helper to get properties with current translations
const getProperties = (t: (key: string) => string): Property[] => [
  {
    id: 1,
    title: "Villa Mar Blau",
    location: t('properties.location.oliva') + ", Valencia",
    price: "€1,250,000",
    beds: 4,
    baths: 3,
    size: "450 m²",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCYCoLLGH8m6STpxs2Ok3leDZaZBOdic-RRxvSn3L6SKrp2cUA-O4x0Pu9ufIundVGAsD17DY5fkQxdKGMzKcy4xR0ut31MsMWW5BP3Je_Zf7d8cDI3Z1Bh87chviHz1rJNMgCZD3plwoi1hL7PJjPywPwiCKnlCv2YoNCI4SOeUKrfQdePCHjaTr6aGz-Qi3QhIUGYns-9fd75ddyqDSPSlRpFU9j1mppa5sdr5oHdFOSEP7TLBQR3YMUSIlm9f_83E9pcr9G",
    type: 'Villa',
    badges: [
      { text: t('properties.badges.exclusive'), type: 'standard', variant: 'white' },
      { text: "12", type: 'photo' }
    ],
    dateListed: '2024-01-15',
    lat: 38.9216,
    lng: -0.1206,
    status: 'available',
    priceFreq: 'sale'
  },
  {
    id: 2,
    title: "Skyline Penthouse",
    location: t('properties.location.gandia') + ", Valencia",
    price: "€680,000",
    beds: 3,
    baths: 2,
    size: "180 m²",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjzENM8T9Tfr_TKw_FUCGQblUaSNsWttDPWKmig4d9rqpW7zv9dAOGGDCnnsJIEl5MQvTRQ8cIK2_CGc6dAoRcSDwZ4WpcxPFRn_X334-Qd4g3dWHkVhkRlNZtmaniVcP37BOvuGRyDPLcSDaNFsiizx1qPuvcaAHqTS6PCBb5gLGMGoEyq36HuJdYbiAPcNa8a3cfuAKD48IhYvVkAjJFz5ktXpnbJbc4THNxE0FAqxFU8pw2iZOCwUfrMIV3t9BqPlufMZvj",
    type: 'Apartment',
    dateListed: '2024-03-10',
    lat: 38.9667,
    lng: -0.1805,
    status: 'available',
    priceFreq: 'sale'
  },
  {
    id: 3,
    title: "Casa de la Luz",
    location: "Daimús Beach, Valencia",
    price: "€890,000",
    beds: 5,
    baths: 4,
    size: "320 m²",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuApVdluFbbEXPQangUFFxfb62P34yITGii4BnFZ8ma20PBBscwMxMTw-vA8QDC6aQ4M_y6-isvnvMGpYRD_XkqxNa2R9dNr33SSMTQswINCNprUf-n1_K738buWnMtmuo_rhenflL3xSr166iAnDHJQgkfuyBhnxhnvZHmqHsCFNXbZEbavBOHLj41bX9xqIIVeJx_Hog8UAkDxRdzzIdOowQCNSP1gCaxMv2Xr43VakqvPdaQim68ffuyC6Gzjpvd5zjM3AClx",
    type: 'Villa',
    badges: [
      { text: t('properties.badges.new'), type: 'standard', variant: 'primary' }
    ],
    dateListed: '2024-05-20',
    lat: 38.9722,
    lng: -0.1542,
    status: 'available',
    priceFreq: 'sale'
  },
  {
    id: 4,
    title: "Modern Loft",
    location: "Ruzafa, " + t('properties.location.valencia'),
    price: "€425,000",
    beds: 2,
    baths: 2,
    size: "120 m²",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSY-PXU4Aos5QXaijac90faiHIS204YriutHKAaYujVG4SZWwVd-HQk8IKShLRCD2mrH-OIVWer2XgAErCzUC_oChNo4RnkugwMaJ3Y-zSOq4-4jfCFa4ISvMZbRaPTdOFCUDu2OiWp1iS4ocb6Hoi5XneGiWUooX_Q_oi2cHRd5pjRF8ffN10TAKH57NDYH0CIdA-DNBnj73Sz9ReE_PJrBw6i0hkrS7KR1gsgila22DVBrYFBJwsrMLzBagtmE9zU1ZrYHK8",
    type: 'Apartment',
    dateListed: '2024-02-05',
    dateSold: new Date().toISOString().split('T')[0], // Recently Sold
    lat: 39.4616,
    lng: -0.3751,
    status: 'sold',
    priceFreq: 'sale'
  },
  {
    id: 5,
    title: "The Edge Project",
    location: "Cullera, Valencia",
    price: t('properties.price.on_request'),
    size: "800 m²",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeO_psb5EsZUge1Q9z9Z0VTEVDOkjmZqJ0_iWuqs1ZjDjturTC925sUpjY4SLbxjQNJNqlgkcv568Kjd5zvvCEIqbffK35jIWjZbAI_u5r_d_Sj57l_m9A8bJN7LcCmSlWATG8dzcBzvdTPFArI7AAtc--NaEpg0seD4lB3ek7ceC2iRhSFh-4fCJ4WP6rjzsj8Ow9cQB3NTjhprnKxcP9IcaFNAN9hsEGC0TUGR1IfZGlIpMPtAeaP1480Wg3sxZR8HyGCiot",
    type: 'Project',
    isComingSoon: true,
    badges: [
      { text: t('properties.badges.coming'), type: 'coming-soon' }
    ],
    dateListed: '2024-06-01',
    lat: 39.1670,
    lng: -0.2520,
    status: 'available',
    priceFreq: 'sale'
  },

  {
    id: 6,
    title: "Historic Estate",
    location: "Xàtiva, Valencia",
    price: "€1,500,000",
    beds: 8,
    baths: 6,
    size: "900 m²",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTz0ljfPf17SA1GJ6uA8AFFp69r4QCIx9qAKheWPLsqb3SR9EiRThZW2pQrqT8Xq0ZMQkBXl7TkM-iW4Lv75dvy8PdbK9O30nJ35aX4fCg0S2feJ6JRYQQUGVRE_VdRjOjItcvyPHOCtbhJGoZS93wph_XgdsTjs-JRfjRxvz_Higm4ZVlH2KwIft4FCcypZ5tuZEmBATyNa2qENR5ZQOIjoGYF2i9mkiBN3wOiCJV8sOAVou3Y3J1JWjUk8qVNOGMTPeMEmtA",
    type: 'Estate',
    dateListed: '2023-11-12',
    lat: 38.9890,
    lng: -0.5180,
    status: 'available',
    priceFreq: 'sale'
  },
  // Featured Sold Properties
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
    title: "Casa de Pueblo",
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
    title: "Apt. Costero",
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
    title: "Apt. Familiar",
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
      const hardcoded = getProperties(t);
      const soldProperties = hardcoded.filter(p => p.status === 'sold');

      if (fetched.length > 0) {
        // Merge fetched properties with the special sold ones
        const combined = [...fetched, ...soldProperties];
        // Remove duplicates if any (based on ID, though IDs are likely different)
        const unique = Array.from(new Map(combined.map(item => [item.id, item])).values());
        setProperties(unique);
      } else {
        setProperties(hardcoded);
      }
      setIsLoading(false);
    };
    loadProperties();
  }, [t]); // Re-fetch if language changes? Ideally translate static text but data comes from feed. Feed might have languages.

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
    <div className="pt-20 h-screen flex flex-col">
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
                  className="bg-transparent border-b border-gray-200 py-2 pr-8 pl-0 text-sm font-bold text-editorial-black focus:ring-0 focus:border-primary cursor-pointer min-w-[140px]"
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
                  className="bg-transparent border-b border-gray-200 py-2 pr-8 pl-0 text-sm font-bold text-editorial-black focus:ring-0 focus:border-primary cursor-pointer min-w-[140px]"
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
                  className="bg-transparent border-b border-gray-200 py-2 pr-8 pl-0 text-sm font-bold text-editorial-black focus:ring-0 focus:border-primary cursor-pointer min-w-[140px]"
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
                  className="bg-transparent border-b border-gray-200 py-2 pr-8 pl-0 text-sm font-bold text-editorial-black focus:ring-0 focus:border-primary cursor-pointer min-w-[140px]"
                >
                  <option value="newest">{t('properties.sort.newest')}</option>
                  <option value="price_asc">{t('properties.sort.price_low')}</option>
                  <option value="price_desc">{t('properties.sort.price_high')}</option>
                  <option value="beds">{t('properties.sort.beds')}</option>
                </select>
              </div>
              <button className="ml-auto lg:ml-4 h-10 px-6 bg-editorial-black hover:bg-primary text-white font-bold text-sm tracking-wide rounded transition-colors flex items-center gap-2">
                {t('common.search')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow max-w-[1440px] mx-auto w-full px-6 lg:px-12 py-8 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">

          {/* List Column */}
          <div className="lg:col-span-7 xl:col-span-8 h-full overflow-y-auto pr-2 pb-20 hide-scrollbar">
            {sortedProperties.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <span className="material-symbols-outlined text-4xl mb-2">filter_alt_off</span>
                <p className="font-bold">{t('properties.no_results')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">

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
                        className={`rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${activePropertyId === property.id ? 'ring-2 ring-primary ring-offset-4 scale-[1.02] shadow-xl' : ''}`}
                      >
                        <Link to={`/property/${property.id}`} className="group cursor-pointer block">
                          <div className="relative aspect-[4/3] overflow-hidden rounded bg-gray-100 mb-4">
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
                              const bgClass = badge.variant === 'primary' ? 'bg-primary' : (badge.variant === 'white' ? 'bg-white' : (badge.variant === 'black' ? 'bg-editorial-black' : 'bg-gray-100'));
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
                              <h3 className="text-xl font-bold text-editorial-black leading-tight group-hover:text-primary transition-colors">{property.title}</h3>
                              <p className="text-sm text-gray-500 font-medium">{property.location}</p>
                            </div>
                            <span className={`text-xl font-bold ${property.price === 'On Request' ? 'text-gray-400' : 'text-primary'}`}>{property.price}</span>
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
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              navigate(`/contact?interest=Buying+a+property&message=${encodeURIComponent(`I would like to inquire about ${property.title} in ${property.location}.`)}`);
                            }}
                            className="w-full mt-4 py-2 border border-gray-200 hover:border-editorial-black text-editorial-black text-xs font-bold uppercase tracking-widest hover:bg-editorial-black hover:text-white transition-colors rounded flex items-center justify-center gap-2"
                          >
                            <span className="material-symbols-outlined text-sm">mail</span>
                            {t('detail.contact_agent')}
                          </button>
                        </Link>
                      </div>

                      {/* Inject Market Banner after second item */}
                      {index === 1 && (
                        <div className="md:col-span-2 bg-editorial-gray rounded p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-100 relative overflow-hidden">
                          <div className="absolute -right-10 -top-10 text-gray-200 opacity-20 rotate-12">
                            <span className="material-symbols-outlined text-[150px]">trending_up</span>
                          </div>
                          <div className="flex-1 relative z-10">
                            <div className="flex items-center gap-2 mb-3 text-primary">
                              <span className="text-xs font-bold uppercase tracking-widest bg-white px-2 py-1 rounded">{t('properties.market_insight')}</span>
                            </div>
                            <h3 className="text-2xl font-black mb-2 leading-tight">{t('properties.market_insight_title')}</h3>
                            <p className="text-sm text-gray-500">{t('properties.market_insight_desc')}</p>
                          </div>
                          <Link to="/stories" className="shrink-0 font-bold text-sm border-b-2 border-editorial-black pb-0.5 hover:text-primary hover:border-primary transition-colors relative z-10">{t('stories.read_report')}</Link>
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
          <div className="hidden lg:block lg:col-span-5 xl:col-span-4 h-[calc(100vh-140px)] sticky top-36">
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
                          <p className="font-bold text-primary">{property.price}</p>
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
  );
};

export default Properties;