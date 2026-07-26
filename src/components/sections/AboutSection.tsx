import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, fadeUp, slideLeft } from '../../utils/animations';

const focuses = [
  {
    number: '01',
    title: 'Edição de Vídeo',
    description: 'Cada corte é uma decisão consciente. Trabalho com DaVinci Resolve e CapCut para criar narrativas visuais que emocionam, com color grading preciso e trilha sonora que amplifica cada cena.',
  },
  {
    number: '02',
    title: 'Fotografia & Restauração',
    description: 'Retratos, paisagens e eventos capturados com sensibilidade. Restauro fotografias antigas com paciência e respeito pela memória — devolvendo histórias ao presente.',
  },
  {
    number: '03',
    title: 'Inteligência Artificial',
    description: 'Integro ferramentas de IA como Runway ML e ElevenLabs ao meu processo criativo, ampliando possibilidades sem perder a essência humana do olhar criativo.',
  },
];

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      id="sobre"
      className="relative py-24 px-6"
      aria-labelledby="about-heading"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-xs tracking-widest uppercase mb-4"
          style={{ color: '#D4879A', fontFamily: 'var(--font-body)' }}
        >
          Sobre mim
        </motion.p>

        {/* Heading */}
        <motion.h2
          id="about-heading"
          variants={slideLeft}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl lg:text-6xl leading-tight mb-16 max-w-3xl"
          style={{ fontFamily: 'var(--font-display)', color: '#2A1F1A', letterSpacing: '-0.02em' }}
        >
          Um olhar criativo que une ritmo, sensibilidade e narrativa visual
        </motion.h2>

        {/* Focus items */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {focuses.map(f => (
            <motion.article
              key={f.number}
              variants={fadeUp}
              className="group p-6 rounded-2xl transition-all duration-300 hover:shadow-lg"
              style={{
                background: 'rgba(255,252,248,0.7)',
                border: '1px solid rgba(242,196,206,0.25)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <span
                className="block mb-3 text-4xl font-light"
                style={{ fontFamily: 'var(--font-display)', color: 'rgba(232,164,184,0.4)' }}
              >
                {f.number}
              </span>
              <h3
                className="mb-3 text-base font-semibold"
                style={{ fontFamily: 'var(--font-heading)', color: '#5C2D3A' }}
              >
                {f.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: '#8C7B74', fontFamily: 'var(--font-body)', fontWeight: 300 }}
              >
                {f.description}
              </p>
            </motion.article>
          ))}
        </motion.div>

        {/* Closer + credential */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pt-8 border-t"
          style={{ borderColor: 'rgba(242,196,206,0.2)' }}
        >
          <p
            className="text-lg md:text-2xl max-w-xl leading-relaxed italic"
            style={{ fontFamily: 'var(--font-display)', color: '#7A6960' }}
          >
            "Edição cuidadosa, ritmo envolvente e histórias que despertam emoções."
          </p>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest" style={{ color: '#C4B4AE', fontFamily: 'var(--font-body)' }}>
              Formação
            </p>
            <p className="text-sm font-medium mt-1" style={{ color: '#8C7B74', fontFamily: 'var(--font-body)' }}>
              Audiovisual · UFMS
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
