import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, fadeUp } from '../../utils/animations';
import type { Skill } from '../../types';

const skills: Skill[] = [
  {
    category: 'Edição de Vídeo',
    icon: '🎬',
    items: ['DaVinci Resolve', 'CapCut', 'Descript', 'Adobe Premiere', 'Color Grading', 'Storytelling'],
  },
  {
    category: 'Inteligência Artificial',
    icon: '✨',
    items: ['Runway ML', 'ElevenLabs', 'Geração de Imagens com IA', 'Geração de Áudio com IA', 'Midjourney'],
  },
  {
    category: 'Habilidades Técnicas',
    icon: '📷',
    items: ['Fotografia', 'Retoque Fotográfico', 'Storyboard', 'Conteúdo para Redes Sociais', 'Restauração de Imagens', 'Lightroom'],
  },
];

export default function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      id="habilidades"
      className="relative py-24 px-6"
      aria-labelledby="skills-heading"
    >
      {/* Soft background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(242,196,206,0.06) 50%, transparent 100%)' }}
        aria-hidden
      />

      <div className="max-w-5xl mx-auto relative">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-xs tracking-widest uppercase mb-4"
          style={{ color: '#D4879A', fontFamily: 'var(--font-body)' }}
        >
          Ferramentas & Habilidades
        </motion.p>

        <motion.h2
          id="skills-heading"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl mb-16 max-w-2xl"
          style={{ fontFamily: 'var(--font-display)', color: '#2A1F1A', letterSpacing: '-0.02em' }}
        >
          O que uso para criar
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-6"
        >
          {skills.map(skill => (
            <motion.div
              key={skill.category}
              variants={fadeUp}
              className="group p-8 rounded-2xl hover:shadow-xl transition-all duration-400"
              style={{
                background: 'rgba(255,252,248,0.8)',
                border: '1px solid rgba(242,196,206,0.2)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl" role="img" aria-hidden>{skill.icon}</span>
                <h3
                  className="font-semibold text-base"
                  style={{ fontFamily: 'var(--font-heading)', color: '#5C2D3A' }}
                >
                  {skill.category}
                </h3>
              </div>

              <ul className="flex flex-wrap gap-2" role="list">
                {skill.items.map(item => (
                  <li key={item}>
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs transition-all duration-200 group-hover:shadow-sm"
                      style={{
                        background: 'rgba(242,196,206,0.18)',
                        color: '#8C7B74',
                        border: '1px solid rgba(232,164,184,0.2)',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
