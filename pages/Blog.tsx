import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';
import { blogPosts } from '../data/blogPosts';

const CATEGORIES = ['Todos', 'Proptech & IA', 'Mercado', 'Consejos', 'Casos de Éxito'];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filtered =
    activeCategory === 'Todos'
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  return (
    <>
      <SEOHead
        title="Blog — Tendencias, Consejos e IA Inmobiliaria"
        description="Artículos de expertos sobre el mercado inmobiliario de Gandía y La Safor: inteligencia artificial, home staging, Big Data y estrategias de venta con el Método MIA."
        canonical="https://essenciainmobiliaria.com/blog"
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 bg-editorial-black text-white overflow-hidden">
        {/* Texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}
          aria-hidden="true"
        />
        {/* Blue accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-0 w-1/3 h-0.5 bg-brand-blue-500 origin-left"
          aria-hidden="true"
        />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-brand-blue-500 font-black tracking-[0.25em] uppercase text-[10px] mb-6 block"
          >
            Essencia · Blog
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-6xl md:text-8xl font-black tracking-[-0.03em] leading-[0.95] mb-6"
          >
            El{' '}
            <em className="font-serif font-normal italic text-brand-blue-400">Blog</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-xl leading-relaxed"
          >
            Tendencias del mercado, herramientas de IA y estrategias reales de venta en Gandía y La Safor.
          </motion.p>
        </div>
      </section>

      {/* ── Category Filter ───────────────────────────────────── */}
      <section className="sticky top-20 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide py-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-editorial-black text-white shadow-sm'
                    : 'text-gray-500 hover:text-editorial-black hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Post ─────────────────────────────────────── */}
      {featured && (
        <section className="py-16 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            <motion.article
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={`/blog/${featured.slug}`}
                className="group block bg-editorial-black rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-500"
              >
                <div className="p-10 lg:p-16 flex flex-col lg:flex-row gap-10 lg:gap-16">
                  {/* Left */}
                  <div className="flex-1 flex flex-col justify-between gap-8">
                    {/* Badge + meta */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className={`${featured.categoryColor} text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full`}
                      >
                        {featured.category}
                      </span>
                      <span className="text-gray-500 text-xs font-medium">
                        {formatDate(featured.date)}
                      </span>
                      <span className="text-gray-600 text-xs font-medium">
                        · {featured.readMinutes} min de lectura
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h2 className="font-display text-3xl md:text-4xl font-black text-white leading-tight tracking-tight mb-4 group-hover:text-brand-blue-400 transition-colors duration-300">
                        {featured.title}
                      </h2>
                      <p className="text-gray-400 text-base leading-relaxed">{featured.excerpt}</p>
                    </div>

                    {/* Author + CTA */}
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-blue-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm font-black">
                            {featured.author.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-white text-sm font-bold leading-none mb-0.5">
                            {featured.author.name}
                          </p>
                          <p className="text-gray-500 text-xs">{featured.author.role}</p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-2 text-brand-blue-400 text-sm font-black group-hover:gap-3 transition-all duration-200">
                        Leer artículo
                        <span className="material-symbols-outlined text-lg" aria-hidden="true">
                          arrow_forward
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Right — Stats */}
                  {featured.stats && (
                    <div className="lg:w-72 flex-shrink-0 grid grid-cols-2 gap-4 content-start">
                      {featured.stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="bg-white/5 rounded-xl p-5 border border-white/10"
                        >
                          <span className="text-3xl font-black text-brand-blue-400 leading-none block mb-1">
                            {stat.value}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </motion.article>
          </div>
        </section>
      )}

      {/* ── Grid of remaining posts ───────────────────────────── */}
      {rest.length > 0 && (
        <section className="py-8 pb-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post, i) => (
                <motion.article
                  key={post.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={fadeUp}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group flex flex-col h-full bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Card top */}
                    <div className="p-6 flex-1 flex flex-col gap-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`${post.categoryColor} text-white text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full`}
                        >
                          {post.category}
                        </span>
                        <span className="text-gray-400 text-xs">{formatDate(post.date)}</span>
                      </div>

                      <h3 className="font-display text-lg font-black text-editorial-black leading-tight tracking-tight group-hover:text-brand-blue-600 transition-colors duration-200">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed flex-1">{post.excerpt}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5 border border-gray-200 text-gray-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card footer */}
                    <div className="px-6 py-4 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-brand-blue-500 flex items-center justify-center">
                          <span className="text-white text-xs font-black">
                            {post.author.name.charAt(0)}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-editorial-black">{post.author.name}</span>
                      </div>
                      <span className="text-xs text-gray-400 font-medium">
                        {post.readMinutes} min
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <section className="py-32 text-center bg-white">
          <p className="text-gray-400 text-lg font-medium">
            No hay artículos en esta categoría todavía.
          </p>
        </section>
      )}

      {/* ── Newsletter CTA ────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-editorial-black rounded-2xl px-10 py-14 lg:px-20 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-10"
          >
            <div className="max-w-xl text-center lg:text-left">
              <span className="text-brand-blue-500 font-black tracking-[0.2em] uppercase text-[10px] mb-4 block">
                Newsletter
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.05] mb-4">
                Las claves del mercado,{' '}
                <em className="font-serif font-normal italic text-brand-blue-400">en tu bandeja</em>
              </h2>
              <p className="text-gray-400 text-lg font-medium leading-relaxed">
                Tendencias de Gandía y La Safor, herramientas de IA y casos de éxito reales. Sin spam.
              </p>
            </div>
            <Link
              to="/contact"
              className="flex-shrink-0 inline-flex items-center justify-center gap-2 h-14 px-10 rounded-full bg-brand-blue-500 text-white font-black text-[11px] uppercase tracking-[0.15em] hover:bg-brand-blue-600 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(31,192,217,0.35)]"
            >
              Contactar
              <span className="material-symbols-outlined text-lg" aria-hidden="true">
                arrow_forward
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Blog;
