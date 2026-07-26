import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 600);
    }, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'linear-gradient(145deg, #FFFEF9 0%, #FDF3F6 50%, #F9F0F8 100%)' }}
        >
          {/* Background sparkles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.7, 0],
                scale: [0, 1, 0],
                y: [0, -20, -40],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.15,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
              style={{
                position: 'absolute',
                left: `${10 + (i * 8) % 80}%`,
                top: `${15 + (i * 11) % 70}%`,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 10 10">
                <path d="M5 0 L5.5 4.5 L10 5 L5.5 5.5 L5 10 L4.5 5.5 L0 5 L4.5 4.5 Z" fill="#E8A4B8" />
              </svg>
            </motion.div>
          ))}

          {/* Animated Bow */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="mb-6"
          >
            <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Left loop */}
              <ellipse cx="22" cy="30" rx="20" ry="14" fill="#F2C4CE" stroke="#E8A4B8" strokeWidth="1.5" transform="rotate(-15 22 30)" />
              <ellipse cx="22" cy="30" rx="12" ry="8" fill="#FAE3D9" transform="rotate(-15 22 30)" />
              {/* Right loop */}
              <ellipse cx="58" cy="30" rx="20" ry="14" fill="#F2C4CE" stroke="#E8A4B8" strokeWidth="1.5" transform="rotate(15 58 30)" />
              <ellipse cx="58" cy="30" rx="12" ry="8" fill="#FAE3D9" transform="rotate(15 58 30)" />
              {/* Center knot */}
              <ellipse cx="40" cy="30" rx="8" ry="6" fill="#E8A4B8" stroke="#D4879A" strokeWidth="1" />
              {/* Left tail */}
              <path d="M32 34 Q20 50 10 55 Q16 48 24 38 Z" fill="#F2C4CE" stroke="#E8A4B8" strokeWidth="1" />
              {/* Right tail */}
              <path d="M48 34 Q60 50 70 55 Q64 48 56 38 Z" fill="#F2C4CE" stroke="#E8A4B8" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* Name */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#5C2D3A', letterSpacing: '0.12em' }}
          >
            dayane luz
          </motion.p>

          {/* Loading dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-4 flex gap-1.5"
          >
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 0.9, delay: i * 0.2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#E8A4B8' }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
