import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Início', href: '/' },
  { label: 'Projetos', href: '/projetos' },
  { label: 'Contato', href: '/#contato' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleAnchor = (href: string) => {
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 pt-4"
    >
      <nav
        className={`max-w-5xl mx-auto rounded-full px-6 py-3 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? 'glass shadow-lg shadow-pink-100/40'
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Navegação principal"
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          aria-label="Dayane Luz — Página inicial"
        >
          <motion.span
            whileHover={{ rotate: 20 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{ display: 'inline-block', fontSize: '1.1rem' }}
          >
            🎀
          </motion.span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              color: '#5C2D3A',
              letterSpacing: '0.04em',
            }}
          >
            dayane luz
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {links.map(link => {
            const isActive =
              link.href === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(link.href.split('#')[0]) && link.href !== '/';
            return (
              <li key={link.href}>
                {link.href.startsWith('/#') ? (
                  <button
                    onClick={() => handleAnchor(link.href)}
                    className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-[#F9E8EC] text-[#5C2D3A] font-medium'
                        : 'text-[#7A6960] hover:text-[#5C2D3A] hover:bg-[#FDF3F6]'
                    }`}
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    className={`px-4 py-2 rounded-full text-sm transition-all duration-200 block ${
                      isActive
                        ? 'bg-[#F9E8EC] text-[#5C2D3A] font-medium'
                        : 'text-[#7A6960] hover:text-[#5C2D3A] hover:bg-[#FDF3F6]'
                    }`}
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            );
          })}
          <li>
            <a
              href="https://wa.me/5511940358657"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-5 py-2 rounded-full text-sm font-medium text-white transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #E8A4B8, #C87090)',
                fontFamily: 'var(--font-body)',
              }}
            >
              Falar comigo
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-full text-[#5C2D3A] hover:bg-[#FDF3F6] transition-colors"
          onClick={() => setMobileOpen(v => !v)}
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mt-2 max-w-5xl mx-auto rounded-2xl p-4 glass shadow-xl shadow-pink-100/30"
          >
            <ul className="flex flex-col gap-1" role="list">
              {links.map(link => (
                <li key={link.href}>
                  {link.href.startsWith('/#') ? (
                    <button
                      onClick={() => { handleAnchor(link.href); setMobileOpen(false); }}
                      className="w-full text-left px-4 py-3 rounded-xl text-[#5C2D3A] hover:bg-[#FDF3F6] text-sm transition-colors"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      className="block px-4 py-3 rounded-xl text-[#5C2D3A] hover:bg-[#FDF3F6] text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
              <li className="pt-2 border-t border-[#F2C4CE]/30">
                <a
                  href="https://wa.me/5511940358657"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 rounded-xl text-center text-sm font-medium text-white"
                  style={{ background: 'linear-gradient(135deg, #E8A4B8, #C87090)' }}
                >
                  Falar comigo
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
