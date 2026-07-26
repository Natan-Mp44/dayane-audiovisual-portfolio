import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronLeft, Calendar, Tag, Wrench } from 'lucide-react';
import { projects } from '../data/projects';
import { fadeUp, staggerContainer } from '../utils/animations';
import Button from '../components/ui/Button';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const projectIndex = projects.findIndex(p => p.slug === slug);
  const project = projects[projectIndex];
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-32 px-6">
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', color: '#F2C4CE' }}>404</p>
        <p className="mb-6" style={{ color: '#8C7B74', fontFamily: 'var(--font-body)' }}>Projeto não encontrado</p>
        <Button onClick={() => navigate('/projetos')}>Voltar aos Projetos</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Large cover */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full overflow-hidden"
        style={{ height: 'clamp(280px, 50vw, 560px)', background: '#F9F0F5' }}
      >
        <img
          src={project.coverImage}
          alt={`Capa do projeto ${project.title}`}
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(42,31,26,0.1) 0%, rgba(42,31,26,0.55) 100%)' }}
          aria-hidden
        />
        {/* Category + Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-10">
          <div className="max-w-5xl mx-auto">
            <span
              className="inline-block mb-3 text-xs tracking-widest uppercase px-3 py-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', fontFamily: 'var(--font-body)' }}
            >
              {project.category}
            </span>
            <h1
              className="text-3xl md:text-6xl text-white"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
            >
              {project.title}
            </h1>
          </div>
        </div>
      </motion.div>

      {/* Back button */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 pt-8">
        <Link
          to="/projetos"
          className="inline-flex items-center gap-2 text-sm transition-colors hover:text-[#D4879A]"
          style={{ color: '#A89890', fontFamily: 'var(--font-body)' }}
          aria-label="Voltar à lista de projetos"
        >
          <ChevronLeft size={16} />
          Voltar aos Projetos
        </Link>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Main content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="md:col-span-2"
          >
            {/* Description */}
            <motion.div variants={fadeUp} className="mb-10">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ fontFamily: 'var(--font-heading)', color: '#5C2D3A' }}
              >
                Sobre o Projeto
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: '#7A6960', fontFamily: 'var(--font-body)', fontWeight: 300 }}
              >
                {project.description}
              </p>
            </motion.div>

            {/* Gallery */}
            {project.gallery.length > 0 && (
              <motion.div variants={fadeUp} className="mb-10">
                <h2
                  className="text-xl font-semibold mb-4"
                  style={{ fontFamily: 'var(--font-heading)', color: '#5C2D3A' }}
                >
                  Galeria
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {project.gallery.map((img, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      className="rounded-xl overflow-hidden"
                      style={{ aspectRatio: '4/3', background: '#F9F0F5' }}
                    >
                      <img
                        src={img}
                        alt={`${project.title} — imagem ${i + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Video */}
            {project.videoUrl && (
              <motion.div variants={fadeUp} className="mb-10">
                <h2
                  className="text-xl font-semibold mb-4"
                  style={{ fontFamily: 'var(--font-heading)', color: '#5C2D3A' }}
                >
                  Vídeo
                </h2>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ aspectRatio: '16/9', background: '#F9F0F5', border: '1px solid rgba(242,196,206,0.25)' }}
                >
                  <iframe
                    src={project.videoUrl}
                    title={`Vídeo do projeto ${project.title}`}
                    className="w-full h-full"
                    allowFullScreen
                    loading="lazy"
                    style={{ border: 'none' }}
                  />
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.aside
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
            aria-label="Detalhes do projeto"
          >
            {/* Role */}
            <motion.div
              variants={fadeUp}
              className="p-5 rounded-2xl"
              style={{ background: 'rgba(255,252,248,0.8)', border: '1px solid rgba(242,196,206,0.2)', backdropFilter: 'blur(12px)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Wrench size={14} style={{ color: '#D4879A' }} />
                <span className="text-xs uppercase tracking-widest" style={{ color: '#C4B4AE', fontFamily: 'var(--font-body)' }}>Meu papel</span>
              </div>
              <p className="text-sm font-medium" style={{ color: '#5C2D3A', fontFamily: 'var(--font-body)' }}>{project.role}</p>
            </motion.div>

            {/* Date */}
            <motion.div
              variants={fadeUp}
              className="p-5 rounded-2xl"
              style={{ background: 'rgba(255,252,248,0.8)', border: '1px solid rgba(242,196,206,0.2)', backdropFilter: 'blur(12px)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={14} style={{ color: '#D4879A' }} />
                <span className="text-xs uppercase tracking-widest" style={{ color: '#C4B4AE', fontFamily: 'var(--font-body)' }}>Data</span>
              </div>
              <p className="text-sm font-medium" style={{ color: '#5C2D3A', fontFamily: 'var(--font-body)' }}>{project.date}</p>
            </motion.div>

            {/* Tools */}
            <motion.div
              variants={fadeUp}
              className="p-5 rounded-2xl"
              style={{ background: 'rgba(255,252,248,0.8)', border: '1px solid rgba(242,196,206,0.2)', backdropFilter: 'blur(12px)' }}
            >
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#C4B4AE', fontFamily: 'var(--font-body)' }}>Ferramentas</p>
              <div className="flex flex-wrap gap-2">
                {project.tools.map(tool => (
                  <span
                    key={tool}
                    className="px-3 py-1 rounded-full text-xs"
                    style={{ background: 'rgba(242,196,206,0.2)', color: '#8C7B74', border: '1px solid rgba(232,164,184,0.2)', fontFamily: 'var(--font-body)' }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div
              variants={fadeUp}
              className="p-5 rounded-2xl"
              style={{ background: 'rgba(255,252,248,0.8)', border: '1px solid rgba(242,196,206,0.2)', backdropFilter: 'blur(12px)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Tag size={14} style={{ color: '#D4879A' }} />
                <span className="text-xs uppercase tracking-widest" style={{ color: '#C4B4AE', fontFamily: 'var(--font-body)' }}>Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full text-xs"
                    style={{ background: 'rgba(238,229,245,0.4)', color: '#8C7B74', fontFamily: 'var(--font-body)' }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Contact CTA */}
            <motion.div variants={fadeUp}>
              <a
                href="https://wa.me/5511940358657"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Solicitar projeto similar via WhatsApp"
              >
                <Button className="w-full justify-center">
                  Solicitar projeto similar
                </Button>
              </a>
            </motion.div>
          </motion.aside>
        </div>

        {/* Prev / Next navigation */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          className="mt-16 pt-8 border-t flex justify-between gap-4"
          style={{ borderColor: 'rgba(242,196,206,0.2)' }}
        >
          {prevProject ? (
            <Link
              to={`/projetos/${prevProject.slug}`}
              className="group flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 hover:shadow-md flex-1"
              style={{ background: 'rgba(255,252,248,0.8)', border: '1px solid rgba(242,196,206,0.2)', backdropFilter: 'blur(12px)', textDecoration: 'none' }}
              aria-label={`Projeto anterior: ${prevProject.title}`}
            >
              <ArrowLeft size={18} style={{ color: '#D4879A' }} className="flex-shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: '#C4B4AE', fontFamily: 'var(--font-body)' }}>Anterior</p>
                <p className="text-sm font-medium" style={{ color: '#5C2D3A', fontFamily: 'var(--font-body)' }}>{prevProject.title}</p>
              </div>
            </Link>
          ) : <div className="flex-1" />}

          {nextProject ? (
            <Link
              to={`/projetos/${nextProject.slug}`}
              className="group flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 hover:shadow-md flex-1 justify-end text-right"
              style={{ background: 'rgba(255,252,248,0.8)', border: '1px solid rgba(242,196,206,0.2)', backdropFilter: 'blur(12px)', textDecoration: 'none' }}
              aria-label={`Próximo projeto: ${nextProject.title}`}
            >
              <div>
                <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: '#C4B4AE', fontFamily: 'var(--font-body)' }}>Próximo</p>
                <p className="text-sm font-medium" style={{ color: '#5C2D3A', fontFamily: 'var(--font-body)' }}>{nextProject.title}</p>
              </div>
              <ArrowRight size={18} style={{ color: '#D4879A' }} className="flex-shrink-0" />
            </Link>
          ) : <div className="flex-1" />}
        </motion.div>
      </div>
    </div>
  );
}
