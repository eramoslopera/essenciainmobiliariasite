import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SEOHead from '../components/SEOHead';
import { blogPosts, BlogSection } from '../data/blogPosts';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Section renderer ───────────────────────────────────────── */
const RenderSection: React.FC<{ section: BlogSection; index: number }> = ({ section, index }) => {
  const delay = Math.min(index * 0.05, 0.4);
  const wrap = (children: React.ReactNode) => (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );

  if (section.type === 'lead') {
    return wrap(
      <p className="text-xl font-semibold leading-relaxed text-editorial-black border-l-4 border-brand-blue-500 pl-5 py-1">
        {section.text}
      </p>
    );
  }

  if (section.type === 'h2') {
    return wrap(
      <h2 className="text-2xl md:text-3xl font-black text-editorial-black tracking-tight mt-4">
        {section.text}
      </h2>
    );
  }

  if (section.type === 'h3') {
    return wrap(
      <h3 className="text-xl font-black text-editorial-black tracking-tight">{section.text}</h3>
    );
  }

  if (section.type === 'paragraph') {
    return wrap(
      <p className="text-gray-600 leading-relaxed text-[17px]">{section.text}</p>
    );
  }

  if (section.type === 'divider') {
    return <hr className="border-gray-100 my-2" />;
  }

  if (section.type === 'grid') {
    const cols =
      section.columns === 3
        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        : 'grid-cols-1 md:grid-cols-2';
    return wrap(
      <div className={`grid ${cols} gap-5`}>
        {section.items.map((item, i) => (
          <div
            key={i}
            className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col gap-3 hover:border-brand-blue-200 hover:shadow-sm transition-all duration-200"
          >
            <span className="text-2xl" role="img" aria-hidden="true">
              {item.icon}
            </span>
            <h4 className="text-sm font-black text-editorial-black leading-tight">{item.title}</h4>
            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    );
  }

  if (section.type === 'tags') {
    return wrap(
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-black uppercase tracking-widest text-gray-400 mr-2">
          {section.label}:
        </span>
        {section.items.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-bold uppercase tracking-wider rounded-full px-3 py-1 bg-brand-blue-50 text-brand-blue-700 border border-brand-blue-100"
          >
            {tag}
          </span>
        ))}
      </div>
    );
  }

  if (section.type === 'quote') {
    return wrap(
      <blockquote className="relative bg-editorial-black rounded-2xl p-8 md:p-10 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-1 h-full bg-brand-blue-500 rounded-l-2xl"
          aria-hidden="true"
        />
        <p className="text-white/90 text-lg md:text-xl font-medium leading-relaxed italic mb-6">
          {section.text}
        </p>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-brand-blue-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-black">{section.author.charAt(0)}</span>
          </div>
          <div>
            <p className="text-white text-sm font-black leading-none mb-0.5">{section.author}</p>
            <p className="text-gray-500 text-xs">{section.role}</p>
          </div>
        </div>
      </blockquote>
    );
  }

  if (section.type === 'cards') {
    return wrap(
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {section.items.map((card, i) => (
          <div
            key={i}
            className="border border-gray-100 rounded-xl p-5 flex flex-col gap-2 hover:border-brand-blue-200 hover:shadow-sm transition-all duration-200"
          >
            <h4 className="text-sm font-black text-editorial-black">{card.title}</h4>
            <p className="text-gray-500 text-xs leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
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
    new Date(iso).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

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
      <section className="relative pt-40 pb-20 bg-editorial-black text-white overflow-hidden">
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

        <div className="max-w-[860px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-gray-500 hover:text-brand-blue-400 text-xs font-bold uppercase tracking-widest transition-colors"
            >
              <span className="material-symbols-outlined text-base" aria-hidden="true">
                arrow_back
              </span>
              Blog
            </Link>
          </motion.div>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3 mb-8"
          >
            <span
              className={`${post.categoryColor} text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full`}
            >
              {post.category}
            </span>
            <span className="text-gray-500 text-sm">{formatDate(post.date)}</span>
            <span className="text-gray-600 text-sm">· {post.readMinutes} min de lectura</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6"
          >
            {post.title}
          </motion.h1>

          {/* Subtitle */}
          {post.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400 text-xl leading-relaxed mb-10"
            >
              {post.subtitle}
            </motion.p>
          )}

          {/* Author */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-brand-blue-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-base font-black">{post.author.name.charAt(0)}</span>
            </div>
            <div>
              <p className="text-white font-bold leading-none mb-1">{post.author.name}</p>
              <p className="text-gray-500 text-sm">{post.author.role}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────── */}
      {post.stats && (
        <section className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-[860px] mx-auto px-4 sm:px-6 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {post.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="text-3xl font-black text-brand-blue-500 leading-none tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Content ──────────────────────────────────────────── */}
      <article className="py-16 bg-white">
        <div className="max-w-[860px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col gap-8">
            {post.content.map((section, i) => (
              <RenderSection key={i} section={section} index={i} />
            ))}
          </div>

          {/* Tags */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-16 pt-10 border-t border-gray-100"
          >
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">
              Temas relacionados
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-bold uppercase tracking-wider rounded-full px-4 py-1.5 border border-gray-200 text-gray-500 hover:border-brand-blue-300 hover:text-brand-blue-600 transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
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
                  Valoración gratuita usando Big Data, IA y el Método MIA. Sin compromiso.
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

      {/* ── Related posts ─────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-8">
            Más artículos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts
              .filter((p) => p.slug !== post.slug)
              .slice(0, 3)
              .map((related, i) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Link
                    to={`/blog/${related.slug}`}
                    className="group block border border-gray-100 rounded-xl p-6 hover:border-brand-blue-200 hover:shadow-md transition-all duration-300"
                  >
                    <span
                      className={`${related.categoryColor} text-white text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full mb-3 inline-block`}
                    >
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
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-brand-blue-600 text-sm font-bold hover:gap-2 transition-all"
              >
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
