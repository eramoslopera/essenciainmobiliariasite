'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { WhatsappLogo } from '@phosphor-icons/react';

interface Advisor {
  id: string;
  name: string;
  firstName: string;
  initials: string;
  role: string;
  specialty: string;
  whatsapp: string;
  message: string;
  photo?: string;
  stats: { experiencia: string; zona: string };
}

const ADVISORS: Advisor[] = [
  {
    id: 'santi',
    name: 'Santi Torres',
    firstName: 'Santi',
    initials: 'ST',
    role: 'CEO & Fundador',
    specialty: 'Especialista en inversiones inmobiliarias y estrategia de venta',
    whatsapp: '34600403136',
    message: 'Hola Santi, me gustaría hablar sobre una inversión inmobiliaria',
    photo: '/santi.jpg',
    stats: { experiencia: '+12 años', zona: 'Valencia & Safor' },
  },
  {
    id: 'carolina',
    name: 'Carolina González',
    firstName: 'Carolina',
    initials: 'CG',
    role: 'Asesora Inmobiliaria',
    specialty: 'Compraventa residencial en Gandía y la costa de Valencia',
    whatsapp: '34647803355',
    message: 'Hola Carolina, me gustaría recibir asesoramiento inmobiliario',
    photo: '/carolina.jpg',
    stats: { experiencia: '+6 años', zona: 'Gandía & Costa' },
  },
  {
    id: 'juanma',
    name: 'Juanma Menacho',
    firstName: 'Juanma',
    initials: 'JM',
    role: 'Coordinador de Oficina',
    specialty: 'Gestión de operaciones y atención al cliente',
    whatsapp: '34603628158',
    message: 'Hola Juanma, me gustaría obtener información sobre vuestros servicios',
    photo: '/juanma.jpg',
    stats: { experiencia: '+4 años', zona: 'Gandía' },
  },
  {
    id: 'joseluis',
    name: 'José Luis Puente',
    firstName: 'José Luis',
    initials: 'JL',
    role: 'Asesor Inmobiliario',
    specialty: 'Propiedades residenciales y de lujo en la Safor',
    whatsapp: '34637403052',
    message: 'Hola José Luis, me gustaría hablar sobre una propiedad',
    photo: '/joseluis.jpg',
    stats: { experiencia: '+8 años', zona: 'La Safor' },
  },
  {
    id: 'oscar',
    name: 'Óscar Puente',
    firstName: 'Óscar',
    initials: 'OP',
    role: 'Asesor Inmobiliario',
    specialty: 'Primera vivienda y asesoramiento hipotecario',
    whatsapp: '34637403050',
    message: 'Hola Óscar, me gustaría hablar sobre una propiedad',
    photo: '/oscar.jpg',
    stats: { experiencia: '+5 años', zona: 'Gandía & Safor' },
  },
];

const waHref = (a: Advisor) =>
  `https://wa.me/${a.whatsapp}?text=${encodeURIComponent(a.message)}`;

/* ─── Spring config ─── */
const SPRING = { type: 'spring' as const, stiffness: 260, damping: 32 };
const FADE = { duration: 0.22, ease: [0.4, 0, 0.2, 1] as number[] };

/* ─── Photo placeholder ─── */
const PhotoPlaceholder: React.FC<{ initials: string; large?: boolean }> = ({ initials, large }) => (
  <div className="w-full h-full flex items-center justify-center bg-[#e8f9fc]">
    <span
      className={`font-black text-[#1fc0d9]/30 tracking-tighter ${large ? 'text-6xl' : 'text-3xl'}`}
    >
      {initials}
    </span>
  </div>
);

/* ════════════════════════════════════════
   FEATURED CARD (large left column)
   Cross-dissolves on advisor change
════════════════════════════════════════ */
const FeaturedCard: React.FC<{ advisor: Advisor }> = ({ advisor }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={advisor.id}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={SPRING}
      className="bg-white border border-[#1fc0d9]/20 rounded-[2rem] overflow-hidden flex flex-col
                 shadow-[0_20px_48px_-12px_rgba(31,192,217,0.10)] h-full"
    >
      {/* Photo — tall 3:4 for hero feel */}
      <div className="relative w-full flex-shrink-0 overflow-hidden" style={{ aspectRatio: '3/4' }}>
        {advisor.photo ? (
          <img
            src={advisor.photo}
            alt={`Foto de ${advisor.name}`}
            className="w-full h-full object-cover object-top"
            style={{ display: 'block' }}
          />
        ) : (
          <PhotoPlaceholder initials={advisor.initials} large />
        )}

        {/* Bottom gradient for readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 40%)' }}
          aria-hidden="true"
        />

        {/* Role badge */}
        <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 text-[9px] font-black
                         uppercase tracking-[0.22em] px-3 py-1.5 rounded-full
                         bg-white/90 backdrop-blur-sm text-[#1fc0d9] border border-[#1fc0d9]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1fc0d9] animate-pulse" aria-hidden="true" />
          {advisor.role}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-7 gap-5">
        <div className="flex-1">
          <h3 className="font-black text-[#222222] text-2xl tracking-tight leading-tight mb-2">
            {advisor.name}
          </h3>
          <p className="text-[13.5px] text-gray-500 leading-relaxed">{advisor.specialty}</p>
        </div>

        {/* Stats */}
        <div className="flex gap-5 border-t border-gray-100 pt-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-0.5">
              Experiencia
            </p>
            <p className="text-sm font-black text-[#222222]">{advisor.stats.experiencia}</p>
          </div>
          <div className="w-px bg-gray-100" aria-hidden="true" />
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-0.5">
              Zona
            </p>
            <p className="text-sm font-black text-[#222222]">{advisor.stats.zona}</p>
          </div>
        </div>

        {/* CTA */}
        <a
          href={waHref(advisor)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2.5 font-black uppercase
                     tracking-[0.12em] text-[10px] h-12 rounded-full
                     bg-[#1fc0d9] text-white hover:bg-[#18adc4] active:scale-[0.98]
                     transition-colors duration-200
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1fc0d9] focus-visible:ring-offset-2"
          aria-label={`Chatear con ${advisor.firstName} por WhatsApp`}
        >
          <WhatsappLogo weight="fill" className="w-[18px] h-[18px]" aria-hidden="true" />
          Hablar con {advisor.firstName}
        </a>
      </div>
    </motion.div>
  </AnimatePresence>
);

/* ════════════════════════════════════════
   SECONDARY CARD (2×2 grid)
   Stagger-fade in when grid reorders
════════════════════════════════════════ */
const SecondaryCard: React.FC<{
  advisor: Advisor;
  index: number;
  onClick: () => void;
}> = ({ advisor, index, onClick }) => (
  <motion.div
    key={advisor.id}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ ...FADE, delay: index * 0.055 }}
    onClick={onClick}
    className="group bg-white border border-gray-100 rounded-[1.5rem] overflow-hidden flex flex-col
               cursor-pointer select-none
               hover:border-[#1fc0d9]/30 hover:shadow-[0_12px_32px_-8px_rgba(31,192,217,0.13)]
               transition-shadow duration-300"
    title={`Ver a ${advisor.name} como asesor principal`}
  >
    {/* Photo — landscape 4:3 */}
    <div className="relative w-full flex-shrink-0 overflow-hidden" style={{ aspectRatio: '4/3' }}>
      {advisor.photo ? (
        <img
          src={advisor.photo}
          alt={`Foto de ${advisor.name}`}
          className="w-full h-full object-cover object-top
                     transition-transform duration-500 group-hover:scale-[1.04]"
          style={{ display: 'block' }}
        />
      ) : (
        <PhotoPlaceholder initials={advisor.initials} />
      )}

      {/* Hover overlay hint */}
      <div className="absolute inset-0 bg-[#1fc0d9]/0 group-hover:bg-[#1fc0d9]/8
                      transition-colors duration-300 pointer-events-none" />
      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase
                       tracking-[0.2em] text-white bg-[#222222]/70 backdrop-blur-sm
                       px-2.5 py-1 rounded-full
                       opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0
                       transition-all duration-250 whitespace-nowrap pointer-events-none">
        Ver como principal
      </span>
    </div>

    {/* Body */}
    <div className="flex flex-col flex-1 p-5 gap-3">
      <div className="flex-1">
        <span className="block text-[8.5px] font-black uppercase tracking-[0.22em] text-[#1fc0d9] mb-1.5">
          {advisor.role}
        </span>
        <h3 className="font-black text-[#222222] text-base tracking-tight leading-tight mb-1">
          {advisor.name}
        </h3>
        <p className="text-[11.5px] text-gray-400 leading-relaxed">{advisor.specialty}</p>
      </div>

      <div className="w-full h-px bg-gray-100" aria-hidden="true" />

      <a
        href={waHref(advisor)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="w-full inline-flex items-center justify-center gap-2 font-black uppercase
                   tracking-[0.1em] text-[9px] h-9 rounded-full
                   bg-[#1fc0d9] text-white hover:bg-[#18adc4] active:scale-[0.98]
                   transition-colors duration-200
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1fc0d9] focus-visible:ring-offset-1"
        aria-label={`Chatear con ${advisor.firstName} por WhatsApp`}
      >
        <WhatsappLogo weight="fill" className="w-3.5 h-3.5" aria-hidden="true" />
        Hablar con {advisor.firstName}
      </a>
    </div>
  </motion.div>
);

/* ════════════════════════════════════════
   MOBILE CAROUSEL CARD
════════════════════════════════════════ */
const CarouselCard: React.FC<{ advisor: Advisor; index: number }> = ({ advisor, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ ...FADE, delay: index * 0.05 }}
    className="group relative flex-shrink-0 w-[260px] flex flex-col bg-white border border-gray-100
               rounded-[1.75rem] overflow-hidden snap-start"
    style={{ scrollSnapAlign: 'start' }}
  >
    <div className="relative w-full flex-shrink-0 overflow-hidden" style={{ aspectRatio: '4/3' }}>
      {advisor.photo ? (
        <img
          src={advisor.photo}
          alt={`Foto de ${advisor.name}`}
          className="w-full h-full object-cover object-top"
          style={{ display: 'block' }}
        />
      ) : (
        <PhotoPlaceholder initials={advisor.initials} />
      )}
    </div>
    <div className="flex flex-col flex-1 p-5 gap-3">
      <span className="text-[8.5px] font-black uppercase tracking-[0.22em] text-[#1fc0d9]">
        {advisor.role}
      </span>
      <div className="flex-1">
        <h3 className="font-black text-[#222222] text-lg tracking-tight leading-tight mb-1">
          {advisor.name}
        </h3>
        <p className="text-[12px] text-gray-400 leading-relaxed">{advisor.specialty}</p>
      </div>
      <div className="w-full h-px bg-gray-100" aria-hidden="true" />
      <a
        href={waHref(advisor)}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center gap-2 font-black uppercase
                   tracking-[0.1em] text-[9px] h-10 rounded-full
                   bg-[#1fc0d9] text-white hover:bg-[#18adc4] active:scale-[0.98]
                   transition-colors duration-200
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1fc0d9] focus-visible:ring-offset-1"
        aria-label={`Chatear con ${advisor.firstName} por WhatsApp`}
      >
        <WhatsappLogo weight="fill" className="w-3.5 h-3.5" aria-hidden="true" />
        Hablar con {advisor.firstName}
      </a>
    </div>
  </motion.div>
);

/* ════════════════════════════════════════
   MAIN SECTION
════════════════════════════════════════ */
export default function AdvisorsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [featuredId, setFeaturedId] = useState<string>('santi');

  const featured = ADVISORS.find((a) => a.id === featuredId)!;
  const secondary = ADVISORS.filter((a) => a.id !== featuredId);

  return (
    <section
      ref={ref}
      className="relative bg-[#F6F8FA] py-20 md:py-28 overflow-hidden"
      aria-labelledby="advisors-title"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top right, rgba(31,192,217,0.07) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1140px] mx-auto px-5 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={SPRING}
          className="mb-10 md:mb-14"
        >
          <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.28em]
                           uppercase text-[#1fc0d9] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1fc0d9] animate-pulse" aria-hidden="true" />
            Nuestro Equipo
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              id="advisors-title"
              className="text-4xl md:text-5xl font-black text-[#222222] tracking-tight leading-[1.08]"
            >
              Habla directamente
              <br />
              <span className="text-gray-300 font-black">con tu asesor</span>
            </h2>
            <p className="text-[11px] font-semibold text-gray-400 tracking-widest uppercase sm:text-right">
              Disponibles lun–sáb
              <br />
              09:00 – 19:00h
            </p>
          </div>
        </motion.div>

        {/* ── DESKTOP: Bento asimétrico ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="hidden lg:grid grid-cols-[2fr_3fr] gap-5 items-start"
        >
          {/* Featured — cross-dissolve on change */}
          <FeaturedCard advisor={featured} />

          {/* 2×2 — stagger-fade on reorder */}
          <div className="grid grid-cols-2 gap-5">
            <AnimatePresence mode="popLayout">
              {secondary.map((advisor, i) => (
                <SecondaryCard
                  key={advisor.id}
                  advisor={advisor}
                  index={i}
                  onClick={() => setFeaturedId(advisor.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── MOBILE: Carousel ── */}
        <div className="lg:hidden -mx-5">
          <style>{`.adv-scroll::-webkit-scrollbar{display:none}`}</style>
          <div
            className="adv-scroll flex gap-4 overflow-x-auto snap-x snap-mandatory px-5 pb-6 pt-1"
            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
          >
            {ADVISORS.map((advisor, i) => (
              <CarouselCard key={advisor.id} advisor={advisor} index={i} />
            ))}
            <div className="flex-shrink-0 w-1" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
