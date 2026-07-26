import { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  life: number;
}

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHover, setIsHover] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);
  const sparkleId = useRef(0);
  const lastSparkle = useRef(0);

  const springX = useSpring(pos.x, { stiffness: 200, damping: 28, mass: 0.5 });
  const springY = useSpring(pos.y, { stiffness: 200, damping: 28, mass: 0.5 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      springX.set(e.clientX);
      springY.set(e.clientY);

      const now = Date.now();
      if (now - lastSparkle.current > 80) {
        lastSparkle.current = now;
        const id = ++sparkleId.current;
        setSparkles(prev => [
          ...prev.slice(-8),
          {
            id,
            x: e.clientX + (Math.random() - 0.5) * 18,
            y: e.clientY + (Math.random() - 0.5) * 18,
            size: Math.random() * 5 + 3,
            life: 0,
          },
        ]);
        setTimeout(() => {
          setSparkles(prev => prev.filter(s => s.id !== id));
        }, 700);
      }
    };

    const checkHover = (e: MouseEvent) => {
      const target = e.target as Element;
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]');
      setIsHover(!!interactive);
    };

    const down = () => setIsClick(true);
    const up = () => setIsClick(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mousemove', checkHover);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousemove', checkHover);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, [springX, springY]);

  return (
    <>
      {/* Sparkle trail */}
      {sparkles.map(s => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0.9, scale: 1 }}
          animate={{ opacity: 0, scale: 0, y: -12 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            pointerEvents: 'none',
            zIndex: 9998,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" width={s.size} height={s.size}>
            <path d="M5 0 L5.5 4.5 L10 5 L5.5 5.5 L5 10 L4.5 5.5 L0 5 L4.5 4.5 Z" fill="#E8A4B8" />
          </svg>
        </motion.div>
      ))}

      {/* Main cursor dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: springX,
          top: springY,
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'normal',
        }}
      >
        {/* Outer ring */}
        <motion.div
          animate={{
            width: isClick ? 28 : isHover ? 44 : 36,
            height: isClick ? 28 : isHover ? 44 : 36,
            opacity: isClick ? 0.6 : 0.35,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            border: '1.5px solid #E8A4B8',
            background: 'transparent',
          }}
        />
        {/* Inner dot */}
        <motion.div
          animate={{
            width: isClick ? 6 : isHover ? 8 : 6,
            height: isClick ? 6 : isHover ? 8 : 6,
            background: isHover ? '#D4879A' : '#E8A4B8',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
          }}
        />
      </motion.div>
    </>
  );
}
