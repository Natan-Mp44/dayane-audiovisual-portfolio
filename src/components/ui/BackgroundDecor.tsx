import { motion } from 'framer-motion';

interface FloatingElement {
  emoji: string;
  style: React.CSSProperties;
  delay: number;
  duration: number;
  amplitude: number;
}

const elements: FloatingElement[] = [
  { emoji: '✦', style: { top: '8%', left: '5%', fontSize: '10px', color: '#E8A4B8', opacity: 0.6 }, delay: 0, duration: 4, amplitude: 8 },
  { emoji: '✦', style: { top: '15%', right: '8%', fontSize: '8px', color: '#D4B8E0', opacity: 0.5 }, delay: 1.2, duration: 5, amplitude: 10 },
  { emoji: '✦', style: { top: '30%', left: '3%', fontSize: '6px', color: '#E8A4B8', opacity: 0.7 }, delay: 0.6, duration: 3.5, amplitude: 6 },
  { emoji: '✦', style: { top: '60%', right: '4%', fontSize: '9px', color: '#FAB8C4', opacity: 0.5 }, delay: 2, duration: 4.5, amplitude: 9 },
  { emoji: '✦', style: { top: '75%', left: '7%', fontSize: '7px', color: '#D4B8E0', opacity: 0.6 }, delay: 0.8, duration: 3.8, amplitude: 7 },
  { emoji: '✦', style: { top: '88%', right: '9%', fontSize: '6px', color: '#E8A4B8', opacity: 0.5 }, delay: 1.5, duration: 4.2, amplitude: 8 },
  { emoji: '♡', style: { top: '22%', left: '92%', fontSize: '11px', color: '#F2C4CE', opacity: 0.5 }, delay: 0.4, duration: 5.5, amplitude: 12 },
  { emoji: '♡', style: { top: '50%', left: '2%', fontSize: '9px', color: '#F2C4CE', opacity: 0.4 }, delay: 2.2, duration: 4.8, amplitude: 8 },
  { emoji: '♡', style: { top: '80%', right: '3%', fontSize: '8px', color: '#F2C4CE', opacity: 0.5 }, delay: 1, duration: 5, amplitude: 10 },
  { emoji: '🌸', style: { top: '12%', left: '88%', fontSize: '12px', opacity: 0.25 }, delay: 1.8, duration: 6, amplitude: 14 },
  { emoji: '🌸', style: { top: '65%', left: '1%', fontSize: '10px', opacity: 0.2 }, delay: 0.3, duration: 5.5, amplitude: 10 },
  { emoji: '⭐', style: { top: '40%', right: '2%', fontSize: '8px', color: '#F2C4CE', opacity: 0.45 }, delay: 1.6, duration: 4, amplitude: 7 },
  { emoji: '⭐', style: { top: '55%', left: '4%', fontSize: '7px', color: '#EEE5F5', opacity: 0.4 }, delay: 0.9, duration: 3.6, amplitude: 6 },
];

export default function BackgroundDecor() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
      {/* Subtle gradient mesh */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 60% 50% at 20% 20%, rgba(242,196,206,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 80% 80%, rgba(238,229,245,0.1) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 60% 30%, rgba(250,227,217,0.08) 0%, transparent 50%)
          `,
        }}
      />

      {/* Floating decorative elements */}
      {elements.map((el, i) => (
        <motion.span
          key={i}
          style={{ position: 'absolute', ...el.style, userSelect: 'none' }}
          animate={{
            y: [0, -el.amplitude, 0],
            rotate: [0, el.amplitude > 9 ? 12 : 5, 0],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {el.emoji}
        </motion.span>
      ))}

      {/* Paper texture noise */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`,
          opacity: 0.35,
        }}
      />
    </div>
  );
}
