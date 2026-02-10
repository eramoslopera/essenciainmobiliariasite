import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import { useLanguage } from '../context/LanguageContext';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: '', // Initialized in useEffect to respect language change
    message: searchParams.get('message') || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync initial interest or default with language
  useEffect(() => {
    if (!formData.interest) {
      setFormData(prev => ({
        ...prev,
        interest: searchParams.get('interest') || t('contact.form.buy')
      }));
    }
  }, [t, searchParams, formData.interest]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // Name Validation
    if (!formData.firstName.trim()) newErrors.firstName = t('error.required');
    if (!formData.lastName.trim()) newErrors.lastName = t('error.required');

    // Email Validation
    if (!formData.email.trim()) {
      newErrors.email = t('error.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('error.email');
    }

    // Phone Validation
    // Allows international format: +123 456 7890, +1 (123) 456-7890, 00123...
    if (!formData.phone.trim()) {
      newErrors.phone = t('error.required');
    } else if (!/^\+?[0-9\s\-\(\)]{8,20}$/.test(formData.phone)) {
      newErrors.phone = t('error.phone');
    }

    // Message Validation
    if (!formData.message.trim()) newErrors.message = t('error.required');

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          interest: t('contact.form.buy'),
          message: ''
        });

        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      }, 1500);
    }
  };

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Left Column: Info */}
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block">{t('nav.contact')}</span>
            <h1 className="text-5xl md:text-6xl font-black text-editorial-black tracking-tight mb-8">{t('contact.title')}</h1>
            <p className="text-xl text-gray-500 mb-12 font-medium leading-relaxed max-w-md">
              {t('contact.subtitle')}
            </p>

            <div className="space-y-12">
              <div>
                <h4 className="font-bold text-lg mb-2">{t('contact.headquarters')}</h4>
                <p className="text-gray-600">C/ Sant Vicent Ferrer 24</p>
                <p className="text-gray-600">46701 Gandia, València</p>
                <p className="text-gray-600">{t('contact.address.country')}</p>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-2">{t('nav.contact')}</h4>
                <p className="text-gray-600 mb-1"><a href="mailto:santitorres@essenciainmobiliaria.com" className="hover:text-primary transition-colors">santitorres@essenciainmobiliaria.com</a></p>
                <p className="text-gray-600"><a href="tel:+34647803355" className="hover:text-primary transition-colors">+34 647 803 355</a></p>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-2">{t('contact.hours')}</h4>
                <p className="text-gray-600">{t('contact.hours.weekdays')}: 09:00 - 19:00</p>
                <p className="text-gray-600">{t('contact.hours.saturday')}: {t('contact.hours.appointment')}</p>
              </div>
            </div>



            {/* Visual Map Placeholder */}
            <div className="mt-12 h-80 w-full bg-gray-100 rounded border border-gray-200 relative overflow-hidden z-0 shadow-lg">
              <MapContainer center={[38.967, -0.181]} zoom={15} scrollWheelZoom={true} className="h-full w-full">
                <LayersControl position="topright">
                  <LayersControl.BaseLayer checked name="Street Map">
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />
                  </LayersControl.BaseLayer>
                  <LayersControl.BaseLayer name="Satellite">
                    <TileLayer
                      attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />
                  </LayersControl.BaseLayer>
                </LayersControl>

                <Marker position={[38.967, -0.181]}>
                  <Popup className="font-display">
                    <div className="text-center p-2">
                      <strong className="block text-lg mb-1">{t('contact.hq')}</strong>
                      <span className="text-gray-500 text-sm block mb-3">C/ Sant Vicent Ferrer 24, Gandia</span>
                      <a
                        href="https://www.google.com/maps/dir/?api=1&destination=C/ Sant Vicent Ferrer 24, 46701 Gandia, València"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-primary text-white text-xs font-bold uppercase tracking-widest px-3 py-2 rounded hover:bg-black transition-colors"
                      >
                        {t('contact.directions')}
                      </a>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-editorial-gray p-8 md:p-12 rounded-lg">
            <h3 className="text-2xl font-bold mb-8">{t('common.send')}</h3>
            {isSuccess ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded text-center">
                <span className="material-symbols-outlined text-4xl mb-2">check_circle</span>
                <p className="font-bold">Message sent successfully!</p>
                <p className="text-sm">We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">{t('common.name')}</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full bg-white border ${errors.firstName ? 'border-red-500' : 'border-none'} rounded px-4 py-3 focus:ring-2 focus:ring-primary`}
                      placeholder="Jane"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">{t('contact.form.lastname')}</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full bg-white border ${errors.lastName ? 'border-red-500' : 'border-none'} rounded px-4 py-3 focus:ring-2 focus:ring-primary`}
                      placeholder="Doe"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-2">{t('common.email')}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-white border ${errors.email ? 'border-red-500' : 'border-none'} rounded px-4 py-3 focus:ring-2 focus:ring-primary`}
                    placeholder="jane@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-2">{t('common.phone')}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full bg-white border ${errors.phone ? 'border-red-500' : 'border-none'} rounded px-4 py-3 focus:ring-2 focus:ring-primary`}
                    placeholder="+34..."
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-2">{t('contact.form.interest')}</label>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full bg-white border-none rounded px-4 py-3 focus:ring-2 focus:ring-primary"
                  >
                    <option value={t('contact.form.buy')}>{t('contact.form.buy')}</option>
                    <option value={t('contact.form.sell')}>{t('contact.form.sell')}</option>
                    <option value={t('contact.form.valuation')}>{t('contact.form.valuation')}</option>
                    <option value={t('contact.form.other')}>{t('contact.form.other')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-2">{t('common.message')}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full bg-white border ${errors.message ? 'border-red-500' : 'border-none'} rounded px-4 py-3 focus:ring-2 focus:ring-primary`}
                    placeholder="Tell us more about your needs..."
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 bg-editorial-black text-white font-bold uppercase tracking-widest rounded hover:bg-primary transition-colors shadow-lg flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? t('common.loading') : t('common.send')}
                  </button>
                </div>
                <p className="text-xs text-center text-gray-400">
                  {t('contact.recaptcha')}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;