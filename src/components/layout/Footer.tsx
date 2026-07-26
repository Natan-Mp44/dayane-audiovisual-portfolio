import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const footerLinks = [
  { label: 'Início', href: '/' },
  { label: 'Projetos', href: '/projetos' },
  { label: 'Contato', href: '/#contato' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative mt-20 border-t"
      style={{ borderColor: 'rgba(242,196,206,0.2)', background: 'linear-gradient(to bottom, #FFFEF9, #FDF3F6)' }}
      role="contentinfo"
    >
      {/* Decorative stars row */}
      <div className="flex justify-center gap-3 pt-8 pb-2" aria-hidden>
        {['✦', '♡', '✦', '⭐', '✦', '♡', '✦'].map((s, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -4, 0], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2.5 + i * 0.3, delay: i * 0.2, repeat: Infinity }}
            style={{ fontSize: i % 2 === 1 ? '10px' : '8px', color: '#E8A4B8' }}
          >
            {s}
          </motion.span>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col items-center gap-8">
          {/* Brand */}
          <div className="text-center">
            <span
              style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#5C2D3A', letterSpacing: '0.06em' }}
            >
              dayane luz
            </span>
            <p className="mt-2 text-sm" style={{ color: '#A89890', fontFamily: 'var(--font-body)' }}>
              Edição Criativa de Vídeo · Fotografia · Narrativas Visuais
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Navegação rodapé">
            <ul className="flex flex-wrap justify-center gap-6" role="list">
              {footerLinks.map(l => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-sm transition-colors hover:text-[#D4879A]"
                    style={{ color: '#8C7B74', fontFamily: 'var(--font-body)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact row */}
          <div className="flex flex-wrap justify-center gap-4 text-sm" style={{ color: '#A89890' }}>
            <a
              href="https://wa.me/5511940358657"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4879A] transition-colors"
              aria-label="WhatsApp de Dayane Luz"
            >
              WhatsApp
            </a>
            <span aria-hidden>·</span>
            <a
              href="mailto:dayaneluzmp@gmail.com"
              className="hover:text-[#D4879A] transition-colors"
              aria-label="Email de Dayane Luz"
            >
              dayaneluzmp@gmail.com
            </a>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-1.5 text-xs" style={{ color: '#C4B4AE' }}>
            <span>© {year} Dayane Luz · Feito com</span>
            <Heart size={10} fill="#E8A4B8" stroke="none" aria-label="amor" />
            <span>no Brasil</span>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(to right, transparent, #F2C4CE, transparent)' }}
        aria-hidden
      />
    </footer>
  );
}
