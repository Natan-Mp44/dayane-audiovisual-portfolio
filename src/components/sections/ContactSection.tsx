import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MessageCircle, Share2 } from 'lucide-react';
import { staggerContainer, fadeUp } from '../../utils/animations';
import Button from '../ui/Button';

const contactItems = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+55 11 94035-8657',
    href: 'https://wa.me/5511940358657',
    ariaLabel: 'Conversar pelo WhatsApp',
    external: true,
  },
  {
    icon: Mail,
    label: 'E-mail',
    value: 'dayaneluzmp@gmail.com',
    href: 'mailto:dayaneluzmp@gmail.com',
    ariaLabel: 'Enviar e-mail para Dayane',
    external: false,
  },
  {
    icon: Phone,
    label: 'Telefone',
    value: '+55 11 94035-8657',
    href: 'tel:+5511940358657',
    ariaLabel: 'Ligar para Dayane',
    external: false,
  },
  {
    icon: Share2,
    label: 'Instagram',
    value: '@dayaneluz',
    href: 'https://instagram.com/dayaneluz',
    ariaLabel: 'Instagram de Dayane Luz',
    external: true,
  },
];

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      id="contato"
      className="relative py-24 px-6"
      aria-labelledby="contact-heading"
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(242,196,206,0.08) 50%, transparent 100%)' }}
        aria-hidden
      />

      <div className="max-w-5xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: heading + duck */}
          <div>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="text-xs tracking-widest uppercase mb-4"
              style={{ color: '#D4879A', fontFamily: 'var(--font-body)' }}
            >
              Contato
            </motion.p>

            <motion.h2
              id="contact-heading"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl leading-tight mb-6"
              style={{ fontFamily: 'var(--font-display)', color: '#2A1F1A', letterSpacing: '-0.02em' }}
            >
              Vamos criar algo suave, claro e belamente editado.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.2 }}
              className="text-base mb-8 leading-relaxed"
              style={{ color: '#8C7B74', fontFamily: 'var(--font-body)', fontWeight: 300 }}
            >
              Estou disponível para projetos de vídeo, fotografia, reels e restauração de imagens. Me chame — adoro começar novas histórias.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.3 }}
            >
              <a
                href="https://wa.me/5511940358657"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir conversa no WhatsApp"
              >
                <Button size="lg">
                  <MessageCircle size={18} />
                  Falar pelo WhatsApp
                </Button>
              </a>
            </motion.div>

            {/* Duck illustration */}
            <motion.p
              animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-12 text-5xl"
              role="img"
              aria-label="Patinho"
            >
              🐣
            </motion.p>
          </div>

          {/* Right: contact links */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col gap-3 mt-16 md:mt-0"
          >
            {contactItems.map(item => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  aria-label={item.ariaLabel}
                  variants={fadeUp}
                  whileHover={{ x: 6 }}
                  className="group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:shadow-md"
                  style={{
                    background: 'rgba(255,252,248,0.8)',
                    border: '1px solid rgba(242,196,206,0.2)',
                    backdropFilter: 'blur(12px)',
                    textDecoration: 'none',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                    style={{ background: 'rgba(242,196,206,0.2)' }}
                  >
                    <Icon size={18} style={{ color: '#D4879A' }} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: '#C4B4AE', fontFamily: 'var(--font-body)' }}>
                      {item.label}
                    </p>
                    <p className="text-sm font-medium" style={{ color: '#5C2D3A', fontFamily: 'var(--font-body)' }}>
                      {item.value}
                    </p>
                  </div>
                  <span
                    className="ml-auto text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: '#D4879A' }}
                    aria-hidden
                  >
                    →
                  </span>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
