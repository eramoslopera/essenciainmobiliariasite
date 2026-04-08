import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';

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

      // Build WhatsApp message with all form data
      const waMessage = [
        `¡Hola! Me pongo en contacto desde vuestra web.`,
        ``,
        `*Nombre:* ${formData.firstName} ${formData.lastName}`,
        `*Email:* ${formData.email}`,
        `*Teléfono:* ${formData.phone}`,
        `*Interés:* ${formData.interest}`,
        ``,
        `*Mensaje:*`,
        formData.message
      ].join('\n');

      const waUrl = `https://wa.me/34647803355?text=${encodeURIComponent(waMessage)}`;

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

        // Open WhatsApp in new tab
        window.open(waUrl, '_blank', 'noopener,noreferrer');

        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      }, 800);
    }
  };

  return (
    <>
    <SEOHead
      title="Contacto — Hablemos de tu Propiedad"
      description="Contacta con Essencia Inmobiliaria en Gandia. Visítanos en C/ Sant Vicent Ferrer 24, llama al +34 647 803 355 o escríbenos. Estamos aquí para ayudarte."
      canonical="https://essenciainmobiliaria.com/contact"
    />
    <div className="pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Left Column: Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <span className="text-brand-blue-600 font-bold tracking-widest uppercase text-xs mb-3 block">{t('nav.contact')}</span>
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
                <p className="text-gray-600 mb-1"><a href="mailto:santitorres@essenciainmobiliaria.com" className="hover:text-brand-blue-600 transition-colors">santitorres@essenciainmobiliaria.com</a></p>
                <p className="text-gray-600"><a href="tel:+34647803355" className="hover:text-brand-blue-600 transition-colors">+34 647 803 355</a></p>
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
                        className="inline-block bg-brand-blue-700 text-white text-xs font-bold uppercase tracking-[0.15em] px-4 py-3 rounded-sm hover:bg-brand-blue-500 hover:shadow-[0_6px_16px_rgba(34,211,238,0.35)] transition-all duration-300 active:scale-[0.98]"
                      >
                        {t('contact.directions')}
                      </a>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="bg-editorial-black backdrop-blur-md shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] border border-white/5 text-white p-8 md:p-12 rounded-sm ring-1 ring-editorial-black/5">
            <h3 className="text-2xl font-bold mb-8">{t('common.send')}</h3>
            {isSuccess ? (
              <div className="bg-white/10 border border-white/20 text-white p-6 rounded-sm text-center">
                <span className="material-symbols-outlined text-4xl mb-2">check_circle</span>
                <p className="font-bold">{t('contact.success.title')}</p>
                <p className="text-sm opacity-80">{t('contact.success.subtitle')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{t('common.name')}</label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full bg-transparent border-b ${errors.firstName ? 'border-red-500' : 'border-white/20'} rounded-none px-0 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors`}
                      placeholder="Juan"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{t('contact.form.lastname')}</label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full bg-transparent border-b ${errors.lastName ? 'border-red-500' : 'border-white/20'} rounded-none px-0 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors`}
                      placeholder="García"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{t('common.email')}</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-white/20'} rounded-none px-0 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors`}
                    placeholder="juan@ejemplo.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{t('common.phone')}</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-b ${errors.phone ? 'border-red-500' : 'border-white/20'} rounded-none px-0 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors`}
                    placeholder="+34..."
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="interest" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{t('contact.form.interest')}</label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 rounded-none px-0 py-3 text-white focus:outline-none focus:border-white transition-colors appearance-none"
                    aria-label={t('contact.form.interest')}
                  >
                    <option className="bg-editorial-black" value={t('contact.form.buy')}>{t('contact.form.buy')}</option>
                    <option className="bg-editorial-black" value={t('contact.form.sell')}>{t('contact.form.sell')}</option>
                    <option className="bg-editorial-black" value={t('contact.form.valuation')}>{t('contact.form.valuation')}</option>
                    <option className="bg-editorial-black" value={t('contact.form.other')}>{t('contact.form.other')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{t('common.message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full bg-transparent border-b ${errors.message ? 'border-red-500' : 'border-white/20'} rounded-none px-0 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors resize-none`}
                    placeholder={t('contact.form.message_placeholder')}
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 bg-white text-editorial-black text-xs font-bold uppercase tracking-[0.15em] rounded-sm hover:bg-gray-100 active:scale-[0.98] transition-all shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? t('common.loading') : t('common.send')}
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
                <p className="text-xs text-center text-gray-400">
                  {t('contact.recaptcha')}
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;