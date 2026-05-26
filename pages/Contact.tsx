import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import ContactForm from '../components/ContactForm';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchParams] = useSearchParams();

  const [initialInterest, setInitialInterest] = useState<string>('buy');
  const initialMessage = searchParams.get('message') || '';

  useEffect(() => {
    const interest = searchParams.get('interest');
    if (interest) {
      setInitialInterest(interest);
    } else {
      setInitialInterest(t('contact.form.buy'));
    }
  }, [t, searchParams]);

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

                {/* Form component */}
                <ContactForm
                  theme="dark"
                  source="contact_page"
                  defaultReason={initialInterest}
                  defaultMessage={initialMessage}
                  className="!p-0 !border-none !bg-transparent !shadow-none"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;