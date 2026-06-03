import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SEOHead from '../components/SEOHead';
import { blogPosts, BlogSection } from '../data/blogPosts';

/* ── Animation helper ───────────────────────────────────────── */
const FadeIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

/* ── Section Renderer ───────────────────────────────────────── */
const RenderSection: React.FC<{ section: BlogSection; idx: number }> = ({ section, idx }) => {
  const delay = Math.min(idx * 0.04, 0.3);

  /* PARAGRAPH */
  if (section.type === 'paragraph') {
    return (
      <FadeIn delay={delay}>
        <p className="text-[15.5px] leading-[1.85] text-gray-600 font-light">
          {section.text}
        </p>
      </FadeIn>
    );
  }

  /* SECTION LABEL */
  if (section.type === 'seccion') {
    return (
      <FadeIn delay={delay}>
        <p className="text-[10.5px] font-semibold tracking-[0.14em] uppercase text-gray-400 mt-10 mb-4 pt-7 border-t border-gray-100">
          {section.text}
        </p>
      </FadeIn>
    );
  }

  /* MIA GRID — 2-col numbered steps */
  if (section.type === 'mia-grid') {
    return (
      <FadeIn delay={delay}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden my-6">
          {section.items.map((item) => (
            <div
              key={item.num}
              className="bg-white px-4 py-4 flex items-start gap-3 hover:bg-gray-50 transition-colors"
            >
              <span className="text-[11px] font-bold text-gray-400 min-w-[22px] pt-0.5 font-mono">
                {item.num}
              </span>
              <div>
                <p className="text-[13px] font-semibold text-editorial-black leading-snug mb-1">
                  {item.title}
                </p>
                <span className="text-[12.5px] text-gray-500 font-light leading-[1.5]">
                  {item.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    );
  }

  /* PACK VISUAL — bordered box with pill tags */
  if (section.type === 'pack-visual') {
    return (
      <FadeIn delay={delay}>
        <div className="border border-gray-200 rounded-2xl p-5 my-6">
          <p className="text-[14px] font-bold text-editorial-black mb-4 flex items-center gap-2">
            <span className="text-lg" aria-hidden="true">🎬</span>
            {section.title}
          </p>
          <div className="flex flex-wrap gap-2">
            {section.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-editorial-black tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </FadeIn>
    );
  }

  /* BADGE 360 */
  if (section.type === 'badge360') {
    return (
      <FadeIn delay={delay}>
        <div className="my-5">
          <span className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.04em] px-4 py-2 rounded-full border border-brand-blue-400 text-brand-blue-600">
            <span aria-hidden="true">🔄</span>
            {section.text}
          </span>
        </div>
      </FadeIn>
    );
  }

  /* SERVICIOS 360 — 3-col cards */
  if (section.type === 'servicios360') {
    return (
      <FadeIn delay={delay}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-6">
          {section.items.map((item) => (
            <div
              key={item.title}
              className="bg-gray-50 rounded-2xl p-4 flex flex-col gap-2 hover:bg-gray-100 transition-colors"
            >
              <span className="text-[22px]" role="img" aria-hidden="true">{item.icon}</span>
              <span className="text-[13px] font-bold text-editorial-black leading-snug">
                {item.title}
              </span>
              <span className="text-[12.5px] text-gray-500 font-light leading-[1.5]">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </FadeIn>
    );
  }

  /* QUOTE */
  if (section.type === 'quote') {
    return (
      <FadeIn delay={delay}>
        <blockquote className="my-8 px-6 py-5 bg-gray-50 border-l-[3px] border-brand-blue-500 rounded-r-2xl">
          <p className="text-[19px] font-light italic leading-[1.65] text-editorial-black mb-3">
            {section.text}
          </p>
          <span className="text-[11px] font-semibold tracking-[0.09em] uppercase text-gray-400">
            {section.author}
          </span>
        </blockquote>
      </FadeIn>
    );
  }

  /* TEAM — 5-col avatars */
  if (section.type === 'team') {
    return (
      <FadeIn delay={delay}>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 my-6">
          {section.members.map((m) => (
            <div
              key={m.name}
              className="bg-gray-50 rounded-2xl py-4 px-2 flex flex-col items-center gap-2 text-center"
            >
              <div className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[13px] font-bold text-gray-500 shadow-sm">
                {m.initials}
              </div>
              <p className="text-[11.5px] font-bold text-editorial-black leading-tight">{m.name}</p>
              <p className="text-[10px] text-gray-400 leading-tight">{m.role}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    );
  }

  /* PORTALES */
  if (section.type === 'portales') {
    return (
      <FadeIn delay={delay}>
        <div className="flex flex-wrap gap-2 my-4">
          {section.items.map((p) => (
            <span
              key={p}
              className="text-[11px] font-semibold px-3 py-1.5 rounded-full border border-gray-200 text-gray-500"
            >
              {p}
            </span>
          ))}
        </div>
      </FadeIn>
    );
  }

  /* CIERRE — closing box */
  if (section.type === 'cierre') {
    return (
      <FadeIn delay={delay}>
        <div
          className="mt-10 px-5 py-5 bg-gray-50 rounded-2xl text-[14px] text-gray-500 leading-[1.75] font-sans [&_a]:text-editorial-black [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-brand-blue-600 [&_strong]:text-editorial-black [&_strong]:font-semibold"
          dangerouslySetInnerHTML={{ __html: section.html }}
        />
      </FadeIn>
    );
  }

  /* TAGS */
  if (section.type === 'tags') {
    return (
      <FadeIn delay={delay}>
        <div className="flex flex-wrap gap-2 mt-8">
          {section.items.map((tag) => (
            <span
              key={tag}
              className="text-[10.5px] font-semibold tracking-[0.07em] uppercase px-3 py-1.5 rounded-full border border-gray-200 text-gray-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </FadeIn>
    );
  }

  return null;
};

/* ── Main component ─────────────────────────────────────────── */
const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'RealEstateAgent',
      name: 'Essencia Inmobiliaria',
      '@id': 'https://essenciainmobiliaria.com/#realestateagent',
    },
    url: `https://essenciainmobiliaria.com/blog/${post.slug}`,
    keywords: post.tags.join(', '),
  };

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.excerpt}
        canonical={`https://essenciainmobiliaria.com/blog/${post.slug}`}
        ogType="article"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-16 bg-editorial-black text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}
          aria-hidden="true"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-0 w-1/3 h-0.5 bg-brand-blue-500 origin-left"
          aria-hidden="true"
        />

        <div className="max-w-[720px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Back */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="mb-10">
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-brand-blue-400 text-xs font-bold uppercase tracking-widest transition-colors">
              <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_back</span>
              Blog
            </Link>
          </motion.div>

          {/* Eyebrow */}
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="text-[10.5px] font-semibold tracking-[0.16em] uppercase text-gray-500 mb-5">
            {post.eyebrow}
          </motion.p>

          {/* Title */}
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(28px,4vw,42px)] font-black tracking-tight leading-[1.1] mb-6">
            {post.title}
          </motion.h1>

          {/* Meta */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-wrap items-center gap-3 mb-8">
            <span className={`${post.categoryColor} text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full`}>
              {post.category}
            </span>
            <span className="text-gray-500 text-sm">{formatDate(post.date)}</span>
            <span className="text-gray-600 text-sm">· {post.readMinutes} min de lectura</span>
          </motion.div>

          {/* Author */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}
            className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-blue-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-black">{post.author.name.charAt(0)}</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none mb-1">{post.author.name}</p>
              <p className="text-gray-500 text-xs">{post.author.role}{post.author.license ? ` · ${post.author.license}` : ''}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      {post.stats && (
        <section className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {post.stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl p-4 text-center border border-gray-100">
                  <span className="text-[26px] font-black text-editorial-black leading-none tracking-tight block">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-normal text-gray-400 block mt-1.5 leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Intro ────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-[680px] mx-auto px-4 sm:px-6 pt-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[18px] italic font-light leading-[1.75] text-gray-500 pb-7 border-b border-gray-100"
          >
            {post.intro}
          </motion.p>
        </div>
      </section>

      {/* ── Body content ─────────────────────────────────────── */}
      <article className="pb-16 bg-white">
        <div className="max-w-[680px] mx-auto px-4 sm:px-6 pt-7">
          <div className="flex flex-col gap-5">
            {post.content.map((section, i) => (
              <RenderSection key={i} section={section} idx={i} />
            ))}
          </div>
        </div>
      </article>

      {/* ── CTA ──────────────────────────────────────────────── */}
      {post.cta && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-editorial-black rounded-2xl px-10 py-14 lg:px-20 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-10"
            >
              <div className="max-w-2xl text-center lg:text-left">
                <span className="text-brand-blue-500 font-black tracking-[0.2em] uppercase text-[10px] mb-4 block">
                  Próximo paso
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.05] mb-4">
                  ¿Quieres vender tu propiedad en{' '}
                  <em className="font-serif font-normal italic text-brand-blue-400">45 días</em>?
                </h2>
                <p className="text-gray-400 text-lg font-medium leading-relaxed">
                  Valoración gratuita con Big Data, IA y el Método MIA. Sin compromiso.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <Link
                  to={post.cta.href}
                  className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-brand-blue-500 text-white font-black text-[11px] uppercase tracking-[0.15em] hover:bg-brand-blue-600 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(31,192,217,0.35)]"
                >
                  {post.cta.label}
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full border border-white/20 text-white font-black text-[11px] uppercase tracking-[0.15em] hover:border-white/60 transition-all duration-300"
                >
                  Hablar con un asesor
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── More posts ───────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-8">Más artículos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts
              .filter((p) => p.slug !== post.slug)
              .slice(0, 3)
              .map((related, i) => (
                <motion.div key={related.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                  <Link to={`/blog/${related.slug}`} className="group block border border-gray-100 rounded-xl p-6 hover:border-brand-blue-200 hover:shadow-md transition-all duration-300">
                    <span className={`${related.categoryColor} text-white text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full mb-3 inline-block`}>
                      {related.category}
                    </span>
                    <h3 className="font-bold text-editorial-black text-sm leading-snug group-hover:text-brand-blue-600 transition-colors">
                      {related.title}
                    </h3>
                  </Link>
                </motion.div>
              ))}
          </div>
          {blogPosts.filter((p) => p.slug !== post.slug).length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-sm mb-4">Más artículos próximamente.</p>
              <Link to="/blog" className="inline-flex items-center gap-1.5 text-brand-blue-600 text-sm font-bold hover:gap-2 transition-all">
                <span className="material-symbols-outlined text-base">arrow_back</span>
                Volver al blog
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogPost;
