import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogPosts';

const BlogTeaser: React.FC = () => {
  const posts = blogPosts.slice(0, 3);
  const featured = posts[0];
  const rest = posts.slice(1);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  if (!featured) return null;

  return (
    <section className="py-24 bg-gray-50" aria-label="Últimas entradas del blog">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* ── Cabecera ── */}
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-brand-blue-500 font-black tracking-[0.25em] uppercase text-[10px] mb-3 block">
              Essencia · Blog
            </span>
            <h2 className="font-display text-5xl md:text-6xl font-black text-editorial-black tracking-[-0.03em] leading-[0.95]">
              Últimas{' '}
              <em className="font-serif font-normal italic text-brand-blue-500">entradas</em>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.12em] text-editorial-black border-b-2 border-brand-blue-500 pb-0.5 hover:text-brand-blue-600 transition-colors duration-200"
            >
              Ver todos los artículos
              <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
            </Link>
          </motion.div>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr] gap-5">

          {/* Card destacada */}
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to={`/blog/${featured.slug}`}
              className="group flex flex-col h-full bg-editorial-black rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-500"
            >
              {/* Body */}
              <div className="p-8 lg:p-10 flex-1 flex flex-col gap-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`${featured.categoryColor} text-white text-[9px] font-black uppercase tracking-[0.18em] px-3 py-1 rounded-full`}>
                    {featured.category}
                  </span>
                  <span className="text-gray-500 text-xs">{formatDate(featured.date)}</span>
                  <span className="text-gray-600 text-xs">· {featured.readMinutes} min</span>
                </div>

                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-black text-white leading-tight tracking-tight mb-3 group-hover:text-brand-blue-400 transition-colors duration-300">
                    {featured.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{featured.excerpt}</p>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-3 mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-blue-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-black">{featured.author.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-white text-xs font-bold leading-none mb-0.5">{featured.author.name}</p>
                      <p className="text-gray-500 text-[10px]">{featured.author.role}</p>
                    </div>
                  </div>
                  <span className="text-brand-blue-400 text-xs font-black group-hover:gap-3 transition-all duration-200 flex items-center gap-2">
                    Leer artículo
                    <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
                  </span>
                </div>
              </div>

              {/* Stats strip */}
              {featured.stats && (
                <div className="grid grid-cols-4 border-t border-white/10 divide-x divide-white/10">
                  {featured.stats.map((stat) => (
                    <div key={stat.label} className="px-4 py-4 text-center">
                      <span className="text-lg font-black text-brand-blue-400 leading-none block mb-0.5">
                        {stat.value}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500 leading-tight">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Link>
          </motion.article>

          {/* Cards secundarias */}
          {rest.length > 0 ? (
            rest.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: (i + 1) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col h-full bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="p-6 flex-1 flex flex-col gap-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`${post.categoryColor} text-white text-[9px] font-black uppercase tracking-[0.18em] px-2.5 py-1 rounded-full`}>
                        {post.category}
                      </span>
                      <span className="text-gray-400 text-xs">{formatDate(post.date)}</span>
                    </div>
                    <h3 className="font-display text-lg font-black text-editorial-black leading-tight tracking-tight group-hover:text-brand-blue-600 transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[9px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5 border border-gray-200 text-gray-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="px-6 py-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-brand-blue-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[10px] font-black">{post.author.name.charAt(0)}</span>
                      </div>
                      <span className="text-xs font-bold text-editorial-black">{post.author.name}</span>
                    </div>
                    <span className="text-xs text-gray-400 font-medium">{post.readMinutes} min</span>
                  </div>
                </Link>
              </motion.article>
            ))
          ) : (
            /* Placeholder cards cuando solo hay 1 artículo */
            [0, 1].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: (i + 1) * 0.1 }}
                className="flex flex-col h-full bg-white border border-dashed border-gray-200 rounded-2xl overflow-hidden"
              >
                <div className="p-6 flex-1 flex flex-col items-center justify-center gap-3 text-center min-h-[200px]">
                  <span className="text-3xl">✍️</span>
                  <p className="text-gray-400 text-sm font-medium">Próximo artículo</p>
                  <p className="text-gray-300 text-xs">En breve</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogTeaser;
