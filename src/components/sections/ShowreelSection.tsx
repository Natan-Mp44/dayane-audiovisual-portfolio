import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play } from 'lucide-react';
import { fadeUp } from '../../utils/animations';

export default function ShowreelSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      id="showreel"
      className="relative py-24 px-6"
      aria-labelledby="showreel-heading"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(238,229,245,0.08) 0%, rgba(250,227,217,0.08) 100%)' }}
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
          Showreel
        </motion.p>

        <motion.h2
          id="showreel-heading"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl mb-10"
          style={{ fontFamily: 'var(--font-display)', color: '#2A1F1A', letterSpacing: '-0.02em' }}
        >
          Um espaço para o próximo corte perfeito
        </motion.h2>

        {/* Video placeholder / embed area */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #FDF3F6, #F5EFE6)',
            border: '1px solid rgba(242,196,206,0.3)',
            aspectRatio: '16/9',
            boxShadow: '0 24px 80px rgba(212,135,154,0.12)',
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            {/* Play button */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer shadow-xl"
              style={{ background: 'linear-gradient(135deg, #E8A4B8, #C87090)' }}
              role="button"
              aria-label="Reproduzir showreel"
              tabIndex={0}
            >
              <Play size={32} fill="white" stroke="none" className="ml-1" />
            </motion.div>

            {/* Cat illustration */}
            <motion.p
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-5xl"
              role="img"
              aria-label="Gatinho"
            >
              🐱
            </motion.p>

            <p
              className="text-sm mt-2"
              style={{ color: '#A89890', fontFamily: 'var(--font-body)', fontStyle: 'italic' }}
            >
              Demo reel em breve · Incorporação de YouTube ou Vimeo
            </p>
          </div>

          {/* Decorative sparkles */}
          {[
            { x: '10%', y: '15%', size: 12 },
            { x: '88%', y: '20%', size: 8 },
            { x: '5%', y: '75%', size: 10 },
            { x: '92%', y: '70%', size: 12 },
          ].map((pos, i) => (
            <motion.span
              key={i}
              animate={{ rotate: [0, 360], scale: [1, 1.3, 1] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'linear', delay: i * 0.8 }}
              style={{
                position: 'absolute',
                left: pos.x,
                top: pos.y,
                fontSize: pos.size,
                color: '#E8A4B8',
                opacity: 0.4,
              }}
              aria-hidden
            >
              ✦
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
