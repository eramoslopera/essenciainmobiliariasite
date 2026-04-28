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
  avatarColor: string;
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
    avatarColor: 'from-blue-600 to-blue-800',
    featured: true,
    photo: '/1.jpeg',
  },
  {
    id: 'carolina',
    name: 'Carolina González',
    initials: 'CG',
    role: 'Asesora Inmobiliaria',
    specialty: 'Compraventa residencial en Gandía y la costa de Valencia',
    whatsapp: '34647803355',
    message: 'Hola Carolina, me gustaría recibir asesoramiento inmobiliario',
    avatarColor: 'from-indigo-500 to-indigo-700',
    photo: '/2.jpeg',
  },
  {
    id: 'juanma',
    name: 'Juanma Menacho',
    initials: 'JM',
    role: 'Coordinador de Oficina',
    specialty: 'Gestión de operaciones y atención al cliente',
    whatsapp: '34603628158',
    message: 'Hola Juanma, me gustaría obtener información sobre vuestros servicios',
    avatarColor: 'from-sky-500 to-sky-700',
  },
  {
    id: 'joseluis',
    name: 'José Luis Puente',
    initials: 'JL',
    role: 'Asesor Inmobiliario',
    specialty: 'Propiedades residenciales y de lujo en la Safor',
    whatsapp: '34637403052',
    message: 'Hola José Luis, me gustaría hablar sobre una propiedad',
    avatarColor: 'from-blue-500 to-blue-700',
  },
  {
    id: 'oscar',
    name: 'Óscar Puente',
    initials: 'OP',
    role: 'Asesor Inmobiliario',
    specialty: 'Especialista en primera vivienda y asesoramiento hipotecario',
    whatsapp: '34637403050',
    message: 'Hola Óscar, me gustaría hablar sobre una propiedad',
    avatarColor: 'from-slate-500 to-slate-700',
  },

];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
};

const AdvisorCard: React.FC<{ advisor: Advisor; index: number }> = ({ advisor }) => {
  const waHref = `https://wa.me/${advisor.whatsapp}?text=${encodeURIComponent(advisor.message)}`;

  return (
    <motion.div
      variants={cardVariants}
      className="group relative flex-shrink-0 w-[280px] sm:w-[320px] flex flex-col bg-editorial-black/80 backdrop-blur-md border border-white/[0.06] rounded-[2rem] p-8 overflow-hidden transition-all duration-500 snap-center sm:snap-start hover:bg-editorial-black hover:border-white/[0.12] hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(34,211,238,0.15)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
    >
      {/* Avatar & Role Badge Row */}
      <div className="flex items-start justify-between mb-8">
        <div
          className={`relative flex items-center justify-center rounded-full font-black tracking-tight text-white bg-gradient-to-br ${advisor.avatarColor} w-16 h-16 text-xl flex-shrink-0 overflow-hidden`}
          aria-hidden="true"
        >
          {advisor.photo ? (
            <img src={advisor.photo} alt={advisor.name} className="w-full h-full object-cover" />
          ) : (
            advisor.initials
          )}
          {advisor.featured && !advisor.photo && (
            <span className="absolute inset-[-4px] rounded-full border border-brand-blue-500/30 animate-[ping_3s_ease-in-out_infinite]" />
          )}
        </div>
        
        <span
          className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full
            ${advisor.featured
              ? 'text-brand-blue-400 bg-brand-blue-500/10 border border-brand-blue-500/20'
              : 'text-white/40 bg-white/[0.03] border border-white/[0.05]'}`}
        >
          {advisor.featured && (
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-400 animate-pulse" />
          )}
          {advisor.role}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col">
        <h3 className="font-black text-white text-2xl tracking-tight mb-2">
          {advisor.name}
        </h3>
        <p className="text-[13px] text-white/50 leading-relaxed mb-8 flex-1">
          {advisor.specialty}
        </p>
      </div>

      {/* CTA */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center gap-2 font-black uppercase tracking-[0.15em] text-[10px] h-12 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 active:scale-[0.98] bg-white/[0.04] text-white hover:bg-brand-blue-600 hover:text-white border border-white/[0.08] hover:border-brand-blue-500 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
        aria-label={`Chatear con ${advisor.name}`}
      >
        <WhatsappLogo weight="fill" className="w-4 h-4" aria-hidden="true" />
        Hablar por WhatsApp
      </a>
    </motion.div>
  );
}

export default function AdvisorsSection() {
  const ref = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={ref}
      className="relative bg-primary py-24 md:py-32 overflow-hidden"
      aria-labelledby="advisors-title"
    >
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      {/* Glow de fondo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none opacity-50"
        style={{ background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.08) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="max-w-[1100px] mx-auto px-6 lg:px-8 mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.25em] uppercase text-brand-blue-400 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-400 animate-pulse" aria-hidden="true" />
                Los Expertos
              </span>
              <h2
                id="advisors-title"
                className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1]"
              >
                Habla directamente<br />
                <span className="text-white/40">con tu asesor</span>
              </h2>
            </div>
            
            {/* Controles del Carrusel (Flechas) */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 mr-4 text-[11px] font-bold text-white/30 uppercase tracking-widest">
                <span>Desliza para ver más</span>
              </div>
              <button 
                onClick={scrollLeft}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/5 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500"
                aria-label="Desplazar a la izquierda"
              >
                <CaretLeft weight="bold" className="w-5 h-5" />
              </button>
              <button 
                onClick={scrollRight}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/5 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500"
                aria-label="Desplazar a la derecha"
              >
                <CaretRight weight="bold" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Carrusel Horizontal (Wide Data Stream) */}
        <div className="w-full overflow-hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory px-6 lg:px-8 pb-12 pt-4 hide-scrollbar"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Espaciador inicial para mantener el offset del container en pantallas grandes */}
            <div className="hidden lg:block flex-shrink-0 w-[calc((100vw-1100px)/2-24px)]" aria-hidden="true" />
            
            {ADVISORS.map((advisor, i) => (
              <AdvisorCard key={advisor.id} advisor={advisor} index={i} />
            ))}
            
            {/* Espaciador final para permitir que la última tarjeta no quede pegada al borde derecho */}
            <div className="flex-shrink-0 w-6 lg:w-[calc((100vw-1100px)/2)]" aria-hidden="true" />
          </motion.div>
        </div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="max-w-[1100px] mx-auto px-6 lg:px-8 flex justify-center md:justify-end"
        >
           <p className="text-[11px] font-semibold text-white/20 tracking-widest uppercase">
            Disponibles de lunes a sábado · 9:00 – 19:00h
          </p>
        </motion.div>
      </div>
    </section>
  );
}
