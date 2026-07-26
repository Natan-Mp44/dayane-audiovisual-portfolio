import { forwardRef, useState, type ButtonHTMLAttributes } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

interface SparkleItem {
  id: number;
  x: number;
  y: number;
  angle: number;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', className = '', onClick, ...props }, ref) => {
    const [sparkles, setSparkles] = useState<SparkleItem[]>([]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newSparkles = Array.from({ length: 6 }).map((_, i) => ({
        id: Date.now() + i,
        x,
        y,
        angle: (i / 6) * 360,
      }));
      setSparkles(newSparkles);
      setTimeout(() => setSparkles([]), 700);
      onClick?.(e);
    };

    const baseStyles = 'relative inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all overflow-hidden select-none';

    const sizeStyles = {
      sm: 'px-5 py-2 text-sm',
      md: 'px-7 py-3 text-sm',
      lg: 'px-9 py-4 text-base',
    };

    const variantStyles = {
      primary: 'text-white shadow-lg hover:shadow-xl active:scale-95',
      secondary: 'bg-white text-[#5C2D3A] border border-[#F2C4CE] hover:bg-[#FDF3F6] shadow-sm hover:shadow active:scale-95',
      ghost: 'text-[#5C2D3A] hover:bg-[#FDF3F6] active:scale-95',
      outline: 'border border-[#E8A4B8] text-[#5C2D3A] hover:bg-[#FDF3F6] active:scale-95',
    };

    const primaryGradient = variant === 'primary'
      ? 'bg-gradient-to-r from-[#E8A4B8] via-[#D4879A] to-[#C87090]'
      : '';

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${primaryGradient} ${className}`}
        onClick={handleClick}
        {...(props as object)}
      >
        {children}

        {/* Click sparkle burst */}
        <AnimatePresence>
          {sparkles.map(s => (
            <motion.div
              key={s.id}
              initial={{ x: s.x - 5, y: s.y - 5, opacity: 1, scale: 1 }}
              animate={{
                x: s.x - 5 + Math.cos((s.angle * Math.PI) / 180) * 24,
                y: s.y - 5 + Math.sin((s.angle * Math.PI) / 180) * 24,
                opacity: 0,
                scale: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                width: 6,
                height: 6,
                pointerEvents: 'none',
                zIndex: 10,
              }}
            >
              <svg viewBox="0 0 10 10" width="6" height="6">
                <path d="M5 0 L5.5 4.5 L10 5 L5.5 5.5 L5 10 L4.5 5.5 L0 5 L4.5 4.5 Z" fill="white" />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Hover glow overlay */}
        <span
          className="absolute inset-0 rounded-full opacity-0 hover:opacity-20 transition-opacity duration-300"
          style={{ background: 'radial-gradient(circle at center, white 0%, transparent 70%)' }}
          aria-hidden
        />
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
