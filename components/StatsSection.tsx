import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate, useReducedMotion } from 'framer-motion';

// ─────────────────────────────────────────────────────────────
// GEO FIX: el span se renderiza con el valor final como
// texto inicial. Los bots leen ese texto directamente.
// El JS solo anima la transición visual encima.
// prefers-reduced-motion: omite la animación numérica.
// ─────────────────────────────────────────────────────────────
const AnimatedCounter = ({
    value,
    suffix = '',
    prefix = '',
    duration = 2.2,
    decimals = 0,
}: {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    decimals?: number;
}) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const hasAnimated = useRef(false);
    const prefersReduced = useReducedMotion();

    const format = (n: number) =>
        decimals > 0
            ? n.toFixed(decimals).replace('.', ',')
            : Math.floor(n).toLocaleString('es-ES');

    useEffect(() => {
        const node = ref.current;
        if (!node || !isInView || hasAnimated.current || prefersReduced) return;
        hasAnimated.current = true;

        const controls = animate(0, value, {
            duration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (latest) => {
                node.textContent = `${prefix}${format(latest)}${suffix}`;
            },
        });
        return () => controls.stop();
    }, [isInView]);

    // Valor final en el HTML inicial → legible por bots de IA
    const staticDisplay = `${prefix}${format(value)}${suffix}`;

    return (
        <span ref={ref}>
            {staticDisplay}
        </span>
    );
};

// ─────────────────────────────────────────────────────────────

const STATS = [
    {
        value: 2000,
        prefix: '+',
        suffix: '',
        label: 'Ventas cerradas',
        note: '15 años en el mercado de Gandía',
        ariaLabel: 'Más de 2000 ventas cerradas en 15 años en el mercado de Gandía',
        delay: 0,
    },
    {
        value: 45,
        prefix: '',
        suffix: ' días',
        label: 'Media hasta la venta',
        note: 'Desde la captación hasta escrituras',
        ariaLabel: '45 días de media desde la captación hasta las escrituras',
        delay: 0.1,
    },
    {
        value: 13,
        prefix: '',
        suffix: 'M€',
        label: 'En ventas este año',
        note: 'Volumen de operaciones en 2025',
        ariaLabel: '13 millones de euros en ventas durante 2025',
        delay: 0.2,
    },
    {
        value: 95,
        prefix: '',
        suffix: '%',
        label: 'Clientes satisfechos',
        note: 'Según encuesta post-venta',
        ariaLabel: '95% de clientes satisfechos según encuesta post-venta',
        delay: 0.3,
    },
] as const;

const StatsSection: React.FC = () => {
    return (
        <section
            className="bg-editorial-black text-white relative overflow-hidden"
            aria-label="Resultados y estadísticas de Essencia Inmobiliaria"
        >
            {/* Ambient glow — decorativo, oculto para lectores de pantalla */}
            <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue-600/10 blur-[140px] rounded-full pointer-events-none"
            />
            <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-blue-600/5 blur-[100px] rounded-full pointer-events-none"
            />

            <div className="max-w-[1440px] mx-auto px-6 lg:px-24 py-24 lg:py-32 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

                    {/* ── Left: Encabezado ── */}
                    <motion.div
                        className="lg:col-span-4"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Badge — "Datos reales · 2025" */}
                        <div className="inline-flex items-center gap-2 mb-8" aria-hidden="true">
                            <div className="w-8 h-[1px] bg-brand-blue-400" />
                            <span className="text-xs font-black tracking-[0.2em] uppercase text-brand-blue-400">
                                Datos reales · 2025
                            </span>
                        </div>

                        <h2 className="text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] mb-8 text-white">
                            Números<br />
                            {/* 
                                ACCESIBILIDAD: text-white/60 = ratio ~5.5:1 sobre #111827
                                Antes: text-gray-500 = ratio ~3.2:1 ❌
                            */}
                            <span className="text-white/60">que hablan.</span>
                        </h2>

                        {/* 
                            ACCESIBILIDAD: text-gray-200 = ratio ~9:1 sobre #111827
                            Antes: text-gray-400 = ratio ~3.8:1 ❌
                        */}
                        <p className="text-gray-200 text-base leading-relaxed font-medium max-w-sm">
                            Más de 15 años vendiendo propiedades en Gandía y La Safor.
                            Estos son los resultados de Essencia Inmobiliaria.
                        </p>

                        {/* Divider decoration */}
                        <div className="mt-12 pt-12 border-t border-white/10">
                            {/* 
                                ACCESIBILIDAD: text-gray-400 = ratio ~3.8:1 — texto decorativo/secundario
                                Mantenemos tamaño mínimo 12px (text-xs) en lugar de text-[10px] ❌
                            */}
                            <p className="text-xs font-black tracking-[0.15em] uppercase text-gray-400">
                                Essencia Inmobiliaria · Gandía, La Safor
                            </p>
                        </div>
                    </motion.div>

                    {/* ── Right: Grid de KPIs ── */}
                    <div
                        className="lg:col-span-8 grid grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5"
                        role="list"
                        aria-label="Indicadores clave de rendimiento"
                    >
                        {STATS.map((stat, i) => (
                            <motion.div
                                key={i}
                                role="listitem"
                                aria-label={stat.ariaLabel}
                                className="bg-editorial-black p-8 lg:p-10 flex flex-col justify-between group relative overflow-hidden"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5, delay: stat.delay }}
                            >
                                {/* Hover accent — decorativo */}
                                <div
                                    aria-hidden="true"
                                    className="absolute top-0 left-0 right-0 h-[2px] bg-brand-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                                />

                                {/* Valor grande */}
                                <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-none mb-4 tabular-nums">
                                    <AnimatedCounter
                                        value={stat.value}
                                        prefix={stat.prefix}
                                        suffix={stat.suffix}
                                        duration={2 + stat.delay * 0.5}
                                    />
                                </div>

                                {/* Label + nota */}
                                <div>
                                    {/* 
                                        ACCESIBILIDAD: text-white = ratio 18:1 ✅
                                        Antes: text-white/90 estaba bien pero label es elemento clave
                                    */}
                                    <p className="text-sm font-black text-white tracking-tight mb-1">
                                        {stat.label}
                                    </p>
                                    {/* 
                                        ACCESIBILIDAD: text-gray-300 = ratio ~7:1 sobre #111827 ✅
                                        Antes: text-gray-600 = ratio ~2.3:1 ❌ — casi invisible
                                    */}
                                    <p className="text-xs text-gray-300 font-medium leading-snug">
                                        {stat.note}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default StatsSection;
