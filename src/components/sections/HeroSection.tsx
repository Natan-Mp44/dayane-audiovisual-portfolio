import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  const scrollToContact = () => {
    const el = document.getElementById('contato');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden"
      aria-label="Apresentação"
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium tracking-widest uppercase"
          style={{
            background: 'rgba(242,196,206,0.2)',
            borderColor: 'rgba(232,164,184,0.4)',
            color: '#D4879A',
            fontFamily: 'var(--font-body)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span>✦</span>
          <span>Estúdio Criativo</span>
          <span>✦</span>
        </motion.div>

        {/* Giant display name */}
        <div className="relative mb-4">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4.5rem, 18vw, 13rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              color: '#2A1F1A',
              userSelect: 'none',
            }}
          >
            DAYANE
          </motion.h1>

          {/* Floating star near heading */}
          <motion.span
            animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              top: '10%',
              right: '-4%',
              fontSize: '1.4rem',
              color: '#E8A4B8',
              opacity: 0.7,
            }}
            aria-hidden
          >
            ✦
          </motion.span>
        </div>

        {/* Subtitle strip */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base md:text-lg tracking-[0.25em] uppercase font-light mb-6"
          style={{ color: '#A89890', fontFamily: 'var(--font-body)' }}
        >
          Edição Criativa de Vídeo · Fotografia · Narrativas Visuais
        </motion.p>

        {/* Role description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="text-base md:text-xl max-w-xl leading-relaxed mb-10"
          style={{ color: '#7A6960', fontFamily: 'var(--font-body)', fontWeight: 300 }}
        >
          Editora de vídeo e assistente de produção audiovisual que transforma momentos em memórias eternas com ritmo, sensibilidade e narrativa visual.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button size="lg" onClick={scrollToContact}>
            Entre em contato
          </Button>
          <Button variant="secondary" size="lg" onClick={() => navigate('/projetos')}>
            Ver projetos
          </Button>
        </motion.div>

        {/* Tags row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {['Projetos em Vídeo', 'Fotografia', 'Reels & Shorts', 'Restauração'].map(tag => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs"
              style={{
                background: 'rgba(242,196,206,0.15)',
                color: '#A89890',
                border: '1px solid rgba(232,164,184,0.2)',
                fontFamily: 'var(--font-body)',
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
          style={{ color: '#C4B4AE' }}
        >
          <span className="text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-body)' }}>rolar</span>
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
