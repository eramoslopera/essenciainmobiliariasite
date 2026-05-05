import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { WhatsappLogo, CaretLeft, CaretRight } from '@phosphor-icons/react';

interface Advisor {
  id: string;
  name: string;
  initials: string;
  role: string;
  specialty: string;
  whatsapp: string;
  message: string;
  featured?: boolean;
  photo?: string;
}

const ADVISORS: Advisor[] = [
  {
    id: 'santi',
    name: 'Santi Torres',
    initials: 'ST',
    role: 'CEO',
    specialty: 'Especialista en inversiones inmobiliarias y estrategia de venta',
    whatsapp: '34600403136',
    message: 'Hola Santi, me gustaría hablar sobre una inversión inmobiliaria',
    featured: true,
    photo: '/santi.jpg',
  },
  {
    id: 'carolina',
    name: 'Carolina González',
    initials: 'CG',
    role: 'Asesora Inmobiliaria',
    specialty: 'Compraventa residencial en Gandía y la costa de Valencia',
    whatsapp: '34647803355',
    message: 'Hola Carolina, me gustaría recibir asesoramiento inmobiliario',
    photo: '/carolina.jpg',
  },
  {
    id: 'juanma',
    name: 'Juanma Menacho',
    initials: 'JM',
    role: 'Coordinador de Oficina',
    specialty: 'Gestión de operaciones y atención al cliente',
    whatsapp: '34603628158',
    message: 'Hola Juanma, me gustaría obtener información sobre vuestros servicios',
    photo: '/juanma.jpg',
  },
  {
    id: 'joseluis',
    name: 'José Luis Puente',
    initials: 'JL',
    role: 'Asesor Inmobiliario',
    specialty: 'Propiedades residenciales y de lujo en la Safor',
    whatsapp: '34637403052',
    message: 'Hola José Luis, me gustaría hablar sobre una propiedad',
    photo: '/joseluis.jpg',
  },
  {
    id: 'oscar',
    name: 'Óscar Puente',
    initials: 'OP',
    role: 'Asesor Inmobiliario',
    specialty: 'Especialista en primera vivienda y asesoramiento hipotecario',
    whatsapp: '34637403050',
    message: 'Hola Óscar, me gustaría hablar sobre una propiedad',
    photo: '/oscar.jpg',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 90, damping: 22, delay: i * 0.08 },
  }),
};

const AdvisorCard: React.FC<{ advisor: Advisor; index: number }> = ({ advisor, index }) => {
  const waHref = `https://wa.me/${advisor.whatsapp}?text=${encodeURIComponent(advisor.message)}`;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      className="group relative flex-shrink-0 w-[260px] sm:w-[290px] flex flex-col bg-white border border-gray-100 rounded-[1.75rem] overflow-hidden snap-start transition-all duration-400 hover:-translate-y-1 hover:border-brand-blue-200 hover:shadow-[0_16px_40px_-12px_rgba(31,192,217,0.18)]"
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* Photo area */}
      <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
        {advisor.photo ? (
          <img
            src={advisor.photo}
            alt={advisor.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-brand-blue-50">
            <span className="text-4xl font-black text-brand-blue-300 tracking-tighter">
              {advisor.initials}
            </span>
          </div>
        )}

        {/* Featured badge */}
        {advisor.featured && (
          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-brand-blue-600 border border-brand-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-500 animate-pulse" />
            CEO
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Role */}
        <span className="text-[9px] font-black uppercase tracking-[0.22em] text-brand-blue-500">
          {advisor.role}
        </span>

        {/* Name + specialty */}
        <div className="flex-1">
          <h3 className="font-black text-editorial-black text-xl tracking-tight leading-tight mb-2">
            {advisor.name}
          </h3>
          <p className="text-[13px] text-gray-500 leading-relaxed">
            {advisor.specialty}
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-100" />

        {/* WhatsApp CTA — brand blue, solid */}
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 font-black uppercase tracking-[0.12em] text-[10px] h-11 rounded-full transition-all duration-300 bg-brand-blue-600 text-white hover:bg-brand-blue-500 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 focus-visible:ring-offset-2"
          aria-label={`Chatear con ${advisor.name} por WhatsApp`}
        >
          <WhatsappLogo weight="fill" className="w-4 h-4" aria-hidden="true" />
          Hablar por WhatsApp
        </a>
      </div>
    </motion.div>
  );
};

export default function AdvisorsSection() {
  const ref = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -310 : 310, behavior: 'smooth' });
  };

  return (
    <section
      ref={ref}
      className="relative bg-[#F6F8FA] py-24 md:py-32 overflow-hidden"
      aria-labelledby="advisors-title"
    >
      {/* Subtle teal glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle at top right, rgba(31,192,217,0.10) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 90, damping: 20 }}
          className="max-w-[1100px] mx-auto px-6 lg:px-8 mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            {/* Left: title */}
            <div>
              <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.25em] uppercase text-brand-blue-600 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-500 animate-pulse" aria-hidden="true" />
                Nuestro Equipo
              </span>
              <h2
                id="advisors-title"
                className="text-4xl md:text-5xl font-black text-editorial-black tracking-tight leading-[1.1]"
              >
                Habla directamente
                <br />
                <span className="text-gray-400 font-black">con tu asesor</span>
              </h2>
            </div>

            {/* Arrow controls — visible on sm+ */}
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-2">
                Desliza
              </span>
              <button
                onClick={() => scroll('left')}
                className="w-11 h-11 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:border-brand-blue-300 hover:text-brand-blue-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-400"
                aria-label="Anterior"
              >
                <CaretLeft weight="bold" className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-11 h-11 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:border-brand-blue-300 hover:text-brand-blue-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-400"
                aria-label="Siguiente"
              >
                <CaretRight weight="bold" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Carousel track */}
        <style>{`.adv-track::-webkit-scrollbar{display:none}`}</style>
        <div className="w-full overflow-hidden">
          <motion.div
            ref={scrollRef}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="adv-track flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory px-6 lg:px-8 pb-10 pt-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {/* Spacer — aligns with max-width container on large screens */}
            <div className="hidden lg:block flex-shrink-0 w-[calc((100vw-1100px)/2-32px)]" aria-hidden="true" />

            {ADVISORS.map((advisor, i) => (
              <AdvisorCard key={advisor.id} advisor={advisor} index={i} />
            ))}

            <div className="flex-shrink-0 w-6 lg:w-[calc((100vw-1100px)/2)]" aria-hidden="true" />
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-[1100px] mx-auto px-6 lg:px-8 flex justify-center sm:justify-end"
        >
          <p className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase">
            Disponibles de lunes a sábado · 9:00 – 19:00h
          </p>
        </motion.div>
      </div>
    </section>
  );
}
