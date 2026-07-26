import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';
import { staggerContainer, fadeUp } from '../utils/animations';
import type { Project } from '../types';

const categories = ['Todos', ...Array.from(new Set(projects.map(p => p.category)))];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const navigate = useNavigate();

  const filtered = activeCategory === 'Todos'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div ref={ref} className="mb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-widest uppercase mb-4"
            style={{ color: '#D4879A', fontFamily: 'var(--font-body)' }}
          >
            Portfólio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-7xl mb-6"
            style={{ fontFamily: 'var(--font-display)', color: '#2A1F1A', letterSpacing: '-0.03em' }}
          >
            Todos os Projetos
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base max-w-xl"
            style={{ color: '#8C7B74', fontFamily: 'var(--font-body)', fontWeight: 300 }}
          >
            Uma coleção de histórias visuais em vídeo, foto e restauração.
          </motion.p>
        </div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-12"
          role="group"
          aria-label="Filtrar por categoria"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-1.5 rounded-full text-xs transition-all duration-200"
              style={{
                background: activeCategory === cat ? 'linear-gradient(135deg, #E8A4B8, #C87090)' : 'rgba(255,252,248,0.8)',
                color: activeCategory === cat ? 'white' : '#8C7B74',
                border: activeCategory === cat ? 'none' : '1px solid rgba(242,196,206,0.3)',
                fontFamily: 'var(--font-body)',
              }}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={() => navigate(`/projetos/${project.slug}`)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.article
      variants={fadeUp}
      onClick={onOpen}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: 'rgba(255,252,248,0.85)',
        border: '1px solid rgba(242,196,206,0.2)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 24px rgba(212,135,154,0.06)',
      }}
      role="button"
      tabIndex={0}
      aria-label={`Abrir projeto: ${project.title}`}
      onKeyDown={e => e.key === 'Enter' && onOpen()}
    >
      <div className="relative h-52 overflow-hidden" style={{ background: '#F9F0F5' }}>
        <img
          src={project.coverImage}
          alt={`Capa do projeto ${project.title}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          style={{ background: 'rgba(92,45,58,0.25)' }}
        >
          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <ArrowUpRight size={18} style={{ color: '#5C2D3A' }} />
          </div>
        </div>
      </div>
      <div className="p-5">
        <span className="text-xs tracking-widest uppercase mb-2 block" style={{ color: '#D4879A', fontFamily: 'var(--font-body)' }}>
          {project.category}
        </span>
        <h2 className="text-lg font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)', color: '#2A1F1A' }}>
          {project.title}
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: '#8C7B74', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
          {project.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs" style={{ color: '#C4B4AE', fontFamily: 'var(--font-body)' }}>{project.date}</span>
          <span className="flex items-center gap-1 text-xs font-medium" style={{ color: '#D4879A', fontFamily: 'var(--font-body)' }}>
            Ver projeto <ArrowUpRight size={12} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
