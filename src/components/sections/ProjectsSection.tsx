import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { staggerContainer, fadeUp } from '../../utils/animations';
import { projects } from '../../data/projects';

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const navigate = useNavigate();

  return (
    <section
      ref={ref}
      id="projetos"
      className="relative py-24 px-6"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-5xl mx-auto">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-xs tracking-widest uppercase mb-4"
          style={{ color: '#D4879A', fontFamily: 'var(--font-body)' }}
        >
          Portfólio
        </motion.p>

        <motion.h2
          id="projects-heading"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl mb-4 max-w-2xl"
          style={{ fontFamily: 'var(--font-display)', color: '#2A1F1A', letterSpacing: '-0.02em' }}
        >
          Histórias visuais suaves através do vídeo, foto e restauração
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.2 }}
          className="text-base mb-16 max-w-lg"
          style={{ color: '#8C7B74', fontFamily: 'var(--font-body)', fontWeight: 300 }}
        >
          Cada projeto é uma oportunidade de criar algo que ressoa.
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} onOpen={() => navigate(`/projetos/${project.slug}`)} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: import('../../types').Project;
  index: number;
  onOpen: () => void;
}

function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <motion.article
      variants={fadeUp}
      onClick={onOpen}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: 'rgba(255,252,248,0.8)',
        border: '1px solid rgba(242,196,206,0.2)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 24px rgba(212,135,154,0.06)',
        transition: 'box-shadow 0.3s ease',
      }}
      aria-label={`Abrir projeto: ${project.title}`}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onOpen()}
    >
      {/* Cover image */}
      <div className="relative h-48 overflow-hidden" style={{ background: '#F9F0F5' }}>
        <img
          src={project.coverImage}
          alt={`Capa do projeto ${project.title}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          style={{ background: 'rgba(92,45,58,0.25)' }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg"
          >
            <ArrowUpRight size={18} style={{ color: '#5C2D3A' }} />
          </motion.div>
        </div>

        {/* Sparkle on hover */}
        <motion.span
          className="absolute top-3 right-3 text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          style={{ fontSize: '10px' }}
          aria-hidden
        >
          ✦
        </motion.span>
      </div>

      {/* Content */}
      <div className="p-5">
        <span
          className="inline-block mb-2 text-xs tracking-widest uppercase"
          style={{ color: '#D4879A', fontFamily: 'var(--font-body)' }}
        >
          {project.category}
        </span>
        <h3
          className="text-lg font-semibold mb-2 leading-tight"
          style={{ fontFamily: 'var(--font-heading)', color: '#2A1F1A' }}
        >
          {project.title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: '#8C7B74', fontFamily: 'var(--font-body)', fontWeight: 300 }}
        >
          {project.excerpt}
        </p>

        {/* Bottom row */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs" style={{ color: '#C4B4AE', fontFamily: 'var(--font-body)' }}>
            {project.date}
          </span>
          <span
            className="flex items-center gap-1 text-xs font-medium group-hover:gap-2 transition-all duration-200"
            style={{ color: '#D4879A', fontFamily: 'var(--font-body)' }}
          >
            Ver projeto <ArrowUpRight size={12} />
          </span>
        </div>
      </div>

      {/* Glow border on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(232,164,184,0.5), 0 8px 32px rgba(212,135,154,0.15)' }}
        aria-hidden
      />
    </motion.article>
  );
}
