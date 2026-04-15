import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';
import { saveContact } from '../src/lib/saveContact';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: '',
    message: searchParams.get('message') || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!formData.interest) {
      setFormData((prev) => ({
        ...prev,
        interest: searchParams.get('interest') || t('contact.form.buy'),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, searchParams]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = t('error.required');
    if (!formData.lastName.trim()) newErrors.lastName = t('error.required');
    if (!formData.email.trim()) {
      newErrors.email = t('error.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('error.email');
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t('error.required');
    } else if (!/^\+?[0-9\s\-\(\)]{8,20}$/.test(formData.phone)) {
      newErrors.phone = t('error.phone');
    }
    if (!formData.message.trim()) newErrors.message = t('error.required');
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);

    // Persist to Supabase
    await saveContact({
      first_name: formData.firstName,
      last_name: formData.lastName || undefined,
      email: formData.email,
      phone: formData.phone || undefined,
      interest: formData.interest,
      message: formData.message,
      source: 'contact_page',
    });

    const waMessage = [
      `¡Hola! Me pongo en contacto desde vuestra web.`,
      ``,
      `*Nombre:* ${formData.firstName} ${formData.lastName}`,
      `*Email:* ${formData.email}`,
      `*Teléfono:* ${formData.phone}`,
      `*Interés:* ${formData.interest}`,
      ``,
      `*Mensaje:*`,
      formData.message,
    ].join('\n');

    const waUrl = `https://wa.me/34647803355?text=${encodeURIComponent(waMessage)}`;

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      interest: t('contact.form.buy'),
      message: '',
    });

    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const inputBase =
    'w-full bg-transparent border-b rounded-none px-0 py-3 text-white placeholder-white/30 focus:outline-none transition-colors text-sm';

  const contactInfo = [
    {
      icon: 'location_on',
      label: t('contact.headquarters'),
      lines: ['C/ Sant Vicent Ferrer 24', '46701 Gandia, València', t('contact.address.country')],
    },
    {
      icon: 'mail',
      label: t('nav.contact') + ' — Email',
      lines: ['santitorres@essenciainmobiliaria.com'],
      href: 'mailto:santitorres@essenciainmobiliaria.com',
    },
    {
      icon: 'call',
      label: t('nav.contact') + ' — Tel',
      lines: ['+34 647 803 355'],
      href: 'tel:+34647803355',
    },
    {
      icon: 'schedule',
      label: t('contact.hours'),
      lines: [
        `${t('contact.hours.weekdays')}: 09:00 – 19:00`,
        `${t('contact.hours.saturday')}: ${t('contact.hours.appointment')}`,
      ],
    },
  ];

  return (
    <>
      <SEOHead
        title="Contacto — Hablemos de tu Propiedad"
        description="Contacta con Essencia Inmobiliaria en Gandia. Visítanos en C/ Sant Vicent Ferrer 24, llama al +34 647 803 355 o escríbenos. Estamos aquí para ayudarte."
        canonical="https://essenciainmobiliaria.com/contact"
      />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-editorial-black text-white overflow-hidden">
        {/* Subtle texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}
        />

        {/* Radial accent */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 80% 30%, rgba(34,211,238,0.12) 0%, transparent 70%)' }}
        />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16">
            {/* Left — heading */}
            <div className="flex-1 max-w-2xl">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-white/50 font-black tracking-[0.25em] uppercase text-[10px] mb-6 block"
              >
                {t('nav.contact')}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] leading-[0.95]"
              >
                {t('contact.title')}
              </motion.h1>
            </div>

            {/* Right — tagline */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:w-1/3 text-white/60 text-base md:text-lg leading-relaxed font-medium"
            >
              <p>{t('contact.subtitle')}</p>

              {/* Quick contact pills — visible on mobile below tagline */}
              <div className="flex flex-wrap gap-3 mt-6 lg:mt-8">
                <a
                  href="tel:+34647803355"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full transition-all duration-200 active:scale-95"
                >
                  <span className="material-symbols-outlined text-base">call</span>
                  +34 647 803 355
                </a>
                <a
                  href="https://wa.me/34647803355"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-300 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full transition-all duration-200 active:scale-95"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* ── LEFT: Info + Map ──────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Contact info items */}
              <div className="space-y-6 mb-10">
                {contactInfo.map((item) => (
                  <div key={item.icon} className="flex items-start gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-brand-blue-600 text-base md:text-lg">
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-0.5">
                        {item.label}
                      </p>
                      {item.lines.map((line, i) =>
                        item.href && i === 0 ? (
                          <a
                            key={i}
                            href={item.href}
                            className="block text-sm font-semibold text-editorial-black hover:text-brand-blue-600 transition-colors"
                          >
                            {line}
                          </a>
                        ) : (
                          <p key={i} className="text-sm font-semibold text-editorial-black">
                            {line}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map — hidden on mobile in favour of the pills in hero; shown md+ */}
              <div className="hidden md:block rounded-2xl lg:rounded-3xl overflow-hidden border border-gray-100 shadow-diffusion relative h-72 lg:h-80 w-full z-0">
                <MapContainer
                  center={[38.967, -0.181]}
                  zoom={15}
                  scrollWheelZoom={false}
                  className="h-full w-full"
                >
                  <LayersControl position="topright">
                    <LayersControl.BaseLayer checked name={language === 'es' ? 'Mapa' : 'Map'}>
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                      />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Satélite">
                      <TileLayer
                        attribution="Tiles &copy; Esri"
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                      />
                    </LayersControl.BaseLayer>
                  </LayersControl>

                  <Marker position={[38.967, -0.181]}>
                    <Popup className="font-display">
                      <div className="text-center p-2">
                        <strong className="block text-base mb-1">{t('contact.hq')}</strong>
                        <span className="text-gray-500 text-xs block mb-3">
                          C/ Sant Vicent Ferrer 24, Gandia
                        </span>
                        <a
                          href="https://www.google.com/maps/dir/?api=1&destination=C/ Sant Vicent Ferrer 24, 46701 Gandia, València"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-brand-blue-700 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full hover:bg-brand-blue-500 transition-colors active:scale-95"
                        >
                          {t('contact.directions')}
                        </a>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>

              {/* Mobile: compact map link instead of full map */}
              <div className="md:hidden">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=C/ Sant Vicent Ferrer 24, 46701 Gandia, València"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-editorial-gray border border-gray-200 rounded-2xl p-4 text-sm font-bold text-editorial-black hover:border-brand-blue-400 hover:bg-brand-blue-50 transition-all duration-200 active:scale-[0.98] group"
                >
                  <div className="w-10 h-10 bg-brand-blue-50 group-hover:bg-brand-blue-100 rounded-full flex items-center justify-center shrink-0 transition-colors">
                    <span className="material-symbols-outlined text-brand-blue-600">map</span>
                  </div>
                  <div>
                    <p className="font-bold text-editorial-black">
                      {t('contact.directions')}
                    </p>
                    <p className="text-xs text-gray-500 font-normal mt-0.5">
                      C/ Sant Vicent Ferrer 24, Gandia
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-brand-blue-500 ml-auto">
                    open_in_new
                  </span>
                </a>
              </div>
            </motion.div>

            {/* ── RIGHT: Form ───────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="bg-editorial-black text-white rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] border border-white/5 ring-1 ring-white/5">
                {/* Form header */}
                <div className="mb-8">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 block mb-2">
                    {language === 'es' ? 'Formulario de contacto' : 'Contact form'}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight">
                    {t('common.send')}
                  </h2>
                </div>

                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-500/10 border border-green-500/20 text-white p-6 rounded-2xl text-center"
                  >
                    <span className="material-symbols-outlined text-5xl text-green-400 mb-3 block">
                      check_circle
                    </span>
                    <p className="font-bold text-lg mb-1">{t('contact.success.title')}</p>
                    <p className="text-sm text-white/60">{t('contact.success.subtitle')}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {/* Name row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="contact-firstName"
                          className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1"
                        >
                          {t('common.name')}
                        </label>
                        <input
                          id="contact-firstName"
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="María"
                          className={`${inputBase} ${
                            errors.firstName ? 'border-red-500' : 'border-white/15 focus:border-white/60'
                          }`}
                        />
                        {errors.firstName && (
                          <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="contact-lastName"
                          className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1"
                        >
                          {t('contact.form.lastname')}
                        </label>
                        <input
                          id="contact-lastName"
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="García"
                          className={`${inputBase} ${
                            errors.lastName ? 'border-red-500' : 'border-white/15 focus:border-white/60'
                          }`}
                        />
                        {errors.lastName && (
                          <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1"
                      >
                        {t('common.email')}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="maria@ejemplo.com"
                        className={`${inputBase} ${
                          errors.email ? 'border-red-500' : 'border-white/15 focus:border-white/60'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1"
                      >
                        {t('common.phone')}
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+34 600 000 000"
                        className={`${inputBase} ${
                          errors.phone ? 'border-red-500' : 'border-white/15 focus:border-white/60'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* Interest + Message side by side on wide, stacked on mobile */}
                    <div>
                      <label
                        htmlFor="contact-interest"
                        className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1"
                      >
                        {t('contact.form.interest')}
                      </label>
                      <select
                        id="contact-interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-white/15 rounded-none px-0 py-3 text-white focus:outline-none focus:border-white/60 transition-colors appearance-none text-sm"
                        aria-label={t('contact.form.interest')}
                      >
                        <option className="bg-editorial-black" value={t('contact.form.buy')}>
                          {t('contact.form.buy')}
                        </option>
                        <option className="bg-editorial-black" value={t('contact.form.sell')}>
                          {t('contact.form.sell')}
                        </option>
                        <option className="bg-editorial-black" value={t('contact.form.valuation')}>
                          {t('contact.form.valuation')}
                        </option>
                        <option className="bg-editorial-black" value={t('contact.form.other')}>
                          {t('contact.form.other')}
                        </option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1"
                      >
                        {t('common.message')}
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder={t('contact.form.message_placeholder')}
                        className={`${inputBase} resize-none ${
                          errors.message ? 'border-red-500' : 'border-white/15 focus:border-white/60'
                        }`}
                      />
                      {errors.message && (
                        <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-4 bg-white text-editorial-black text-xs font-bold uppercase tracking-[0.18em] rounded-full hover:bg-gray-50 active:scale-[0.98] transition-all shadow-[0_12px_30px_-8px_rgba(0,0,0,0.25)] hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.35)] flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-editorial-black focus-visible:ring-white ${
                          isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="inline-block w-4 h-4 border-2 border-editorial-black border-t-transparent rounded-full animate-spin" />
                            {t('common.loading') || 'Enviando…'}
                          </>
                        ) : (
                          <>
                            {t('common.send')}
                            <span className="material-symbols-outlined text-sm">
                              arrow_forward
                            </span>
                          </>
                        )}
                      </button>

                      <p className="text-xs text-center text-white/30 mt-3">
                        {t('contact.recaptcha')}
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;