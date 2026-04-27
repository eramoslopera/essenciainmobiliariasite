import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { WhatsappLogo } from '@phosphor-icons/react';

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
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const AdvisorCard: React.FC<{ advisor: Advisor; index: number }> = ({ advisor, index: _index }) => {
  const waHref = `https://wa.me/${advisor.whatsapp}?text=${encodeURIComponent(advisor.message)}`;

  return (
    <motion.div
      variants={cardVariants}
      className={`group relative flex flex-col bg-white/[0.03] border border-white/[0.07] rounded-2xl
        overflow-hidden transition-all duration-500 cursor-default
        hover:bg-blue-600/[0.06] hover:border-blue-500/25
        hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-20px_rgba(37,99,235,0.16)]
        ${advisor.featured ? 'md:row-span-2 p-9 md:p-11' : 'p-7'}`}
    >
      {/* Top accent line */}
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Avatar */}
      <div
        className={`relative flex items-center justify-center rounded-full font-black tracking-tight text-white bg-gradient-to-br ${advisor.avatarColor} flex-shrink-0
          ${advisor.featured ? 'w-[72px] h-[72px] text-2xl mb-8' : 'w-14 h-14 text-lg mb-6'}`}
        aria-hidden="true"
      >
        {advisor.initials}
        {advisor.featured && (
          <span className="absolute inset-[-5px] rounded-full border border-blue-500/40 animate-[ping_3s_ease-in-out_infinite]" style={{ animationDuration: '3s' }} />
        )}
      </div>

      {/* Role badge */}
      <span
        className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.22em] mb-2
          ${advisor.featured
            ? 'text-blue-400 bg-blue-600/10 border border-blue-500/20 px-2.5 py-1 rounded-full self-start'
            : 'text-white/40'}`}
      >
        {advisor.featured && (
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
        )}
        {advisor.role}
      </span>

      {/* Name */}
      <h3
        className={`font-black text-white tracking-tight leading-none mb-3
          ${advisor.featured ? 'text-[28px] md:text-[32px]' : 'text-[18px]'}`}
      >
        {advisor.name}
      </h3>

      {/* Specialty */}
      <p
        className={`font-medium leading-relaxed flex-1 mb-7
          ${advisor.featured ? 'text-[15px] text-white/50 max-w-xs' : 'text-[12px] text-white/35'}`}
      >
        {advisor.specialty}
      </p>

      {/* WhatsApp CTA */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 font-black uppercase tracking-[0.18em] rounded-full
          transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
          active:scale-[0.97]
          ${advisor.featured
            ? 'text-[11px] h-12 px-8 bg-blue-600 text-white hover:bg-blue-500 shadow-[0_8px_30px_rgba(37,99,235,0.35)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.50)] self-start'
            : 'text-[10px] h-10 px-6 bg-white/[0.07] text-white/80 border border-white/[0.09] hover:bg-blue-600 hover:text-white hover:border-blue-600'}`}
        aria-label={`Chatear con ${advisor.name} por WhatsApp`}
      >
        <WhatsappLogo weight="fill" className={advisor.featured ? 'w-4 h-4' : 'w-3.5 h-3.5'} aria-hidden="true" />
        Hablar ahora
      </a>
    </motion.div>
  );
}

export default function AdvisorsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const featured = ADVISORS[0];
  const rest = ADVISORS.slice(1);

  return (
    <section
      ref={ref}
      className="relative bg-[#0f0f0f] py-24 md:py-32 overflow-hidden"
      aria-labelledby="advisors-title"
    >
      {/* Glow de fondo */}
      <div
        className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.10) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      {/* Grid pattern decorativo */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.28em] uppercase text-blue-400 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" aria-hidden="true" />
            Nuestro Equipo
          </span>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              id="advisors-title"
              className="text-4xl md:text-5xl lg:text-[52px] font-black text-white tracking-[-0.03em] leading-[1.0] max-w-lg"
            >
              Habla con uno de<br />
              <span className="text-blue-500">nuestros asesores</span>
            </h2>
            <p className="text-[15px] font-medium text-white/40 max-w-xs leading-relaxed md:text-right">
              Equipo local con más de 15 años de experiencia en el mercado inmobiliario de Gandía y Valencia.
            </p>
          </div>
        </motion.div>

        {/* Grid asimétrico */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-4"
        >
          {/* Columna izquierda — asesor destacado */}
          <AdvisorCard advisor={featured} index={0} />

          {/* Columna derecha — los otros 5 en sub-grid */}
          <div className="grid grid-cols-1 gap-4">
            {rest.map((advisor, i) => (
              <AdvisorCard key={advisor.id} advisor={advisor} index={i + 1} />
            ))}
          </div>
        </motion.div>

        {/* Footer bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-white/[0.06]"
        >
          <p className="text-[12px] font-semibold text-white/30 tracking-wide uppercase">
            Disponibles de lunes a sábado · 9:00 – 19:00h
          </p>
          <a
            href="https://wa.me/34647803355?text=Hola%2C%20me%20gustar%C3%ADa%20hablar%20con%20un%20asesor%20de%20Essencia%20Inmobiliaria"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] h-10 px-6 rounded-full bg-white/[0.05] text-white/60 border border-white/[0.08] hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Contactar con la oficina de Essencia Inmobiliaria por WhatsApp"
          >
            <WhatsappLogo weight="fill" className="w-4 h-4" aria-hidden="true" />
            Contactar oficina
          </a>
        </motion.div>
      </div>
    </section>
  );
}
