'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { href: '#about', label: 'About' },
  { href: '#toolbox', label: 'Toolbox' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
] as const;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    /** Order matters when regions overlap (e.g. #about sits inside #hero). */
    const sections = ['experience', 'projects', 'toolbox', 'about', 'hero'] as const;

    const onScroll = () => {
      const pos = window.scrollY + 120;
      let current: (typeof sections)[number] = 'hero';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (pos >= top && pos < bottom) {
            current = id;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setIsMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F9F9F7]/95 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 py-3.5 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => handleNavClick('#hero')}
          className="text-left text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-neutral-600 hover:text-neutral-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B5CCC] focus-visible:rounded"
        >
          Jessica Zhou <span className="text-neutral-400">—</span> Portfolio <span className="text-neutral-400">·</span>{' '}
          <span className="text-neutral-500">2026</span>
        </button>

        <div className="hidden lg:flex flex-1 items-center justify-center gap-7">
          {NAV_ITEMS.map((item) => {
            const id = item.href.replace('#', '');
            const isActive = activeSection === id;
            return (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNavClick(item.href)}
                className={`text-[10px] tracking-[0.16em] uppercase transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B5CCC] focus-visible:rounded ${
                  isActive ? 'text-neutral-950' : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase text-neutral-600 max-w-[min(22rem,32vw)] text-right leading-snug shrink-0">
          <span className="relative flex h-2 w-2 mt-0.5 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" aria-hidden />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" aria-hidden />
          </span>
          <span>Open to new-grad SWE roles · Spring 2026</span>
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[9px] tracking-[0.12em] uppercase text-neutral-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 shrink-0" aria-hidden />
          </div>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md text-neutral-700 hover:bg-neutral-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B5CCC]"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X size={22} strokeWidth={1.5} />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu size={22} strokeWidth={1.5} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden bg-[#F9F9F7]"
          >
            <nav className="px-5 py-3 flex flex-col gap-1">
              {NAV_ITEMS.map((item, index) => {
                const id = item.href.replace('#', '');
                const isActive = activeSection === id;
                return (
                  <motion.button
                    key={item.href}
                    type="button"
                    initial={{ x: -8, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => handleNavClick(item.href)}
                    className={`text-left text-xs tracking-[0.14em] uppercase py-2.5 ${
                      isActive ? 'text-neutral-950' : 'text-neutral-600'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
              <p className="text-[10px] tracking-[0.12em] uppercase text-neutral-500 pt-2">
                Open to new-grad SWE roles · Spring 2026
              </p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
