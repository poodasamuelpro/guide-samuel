'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LayoutDashboard, Home } from 'lucide-react';
import { BrandMark } from './Logo';

interface HeaderProps {
  currentView?: string;
  totalXP?: number;
  modulesCompleted?: number;
  onNavigate?: (view: string) => void;
}

export default function Header({ currentView, totalXP = 0, modulesCompleted = 0, onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navItems = [
    { id: 'landing', label: 'Accueil', Icon: Home },
    { id: 'dashboard', label: 'Ma progression', Icon: LayoutDashboard },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'header-glass shadow-sm' : ''
      }`}
      style={!scrolled ? { background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(7,59,76,0.08)' } : undefined}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <button
            onClick={() => onNavigate?.('landing')}
            className="flex items-center min-h-0 p-0 bg-transparent border-none"
            aria-label="Accueil — Le Guide de Samuel"
          >
            <BrandMark size="sm" variant="dark" />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navigation principale">
            {navItems.map(({ id, label, Icon }) => (
              <button
                key={label}
                onClick={() => onNavigate?.(id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all min-h-0"
                style={
                  currentView === id
                    ? { background: 'var(--brand-deep)', color: '#ffffff' }
                    : { color: '#374151' }
                }
                onMouseEnter={e => {
                  if (currentView !== id) {
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--brand-deep)';
                    (e.currentTarget as HTMLButtonElement).style.background = '#f3f4f6';
                  }
                }}
                onMouseLeave={e => {
                  if (currentView !== id) {
                    (e.currentTarget as HTMLButtonElement).style.color = '#374151';
                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  }
                }}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </nav>

          {/* XP indicator (visible if user started) */}
          <div className="hidden md:flex items-center gap-3">
            {totalXP > 0 && (
              <div className="flex items-center gap-2 rounded-full px-3 py-1.5" style={{ background: 'rgba(7,59,76,0.06)' }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'var(--brand-accent)' }}>
                  <span className="text-[9px] font-bold" style={{ color: 'var(--brand-deep)' }}>XP</span>
                </div>
                <span className="text-sm font-bold" style={{ color: 'var(--brand-deep)' }}>{totalXP}</span>
                <span className="text-xs text-gray-500">{modulesCompleted}/5 modules</span>
              </div>
            )}
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg min-h-0 min-w-0 w-10 h-10 flex items-center justify-center transition-colors"
            style={{ color: 'var(--brand-deep)' }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#f3f4f6'}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'transparent'}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
            style={{ background: '#ffffff', borderTop: '1px solid rgba(7,59,76,0.08)' }}
          >
            <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1" aria-label="Navigation mobile">
              {navItems.map(({ id, label, Icon }) => (
                <button
                  key={label}
                  onClick={() => { onNavigate?.(id); setMenuOpen(false); }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left min-h-0"
                  style={
                    currentView === id
                      ? { background: 'var(--brand-deep)', color: '#ffffff' }
                      : { color: '#1f2937' }
                  }
                  onMouseEnter={e => {
                    if (currentView !== id) (e.currentTarget as HTMLButtonElement).style.background = '#f9fafb';
                  }}
                  onMouseLeave={e => {
                    if (currentView !== id) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  }}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
              {totalXP > 0 && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl mt-1" style={{ background: 'var(--brand-accent-light)' }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'var(--brand-accent)' }}>
                    <span className="text-[10px] font-bold" style={{ color: 'var(--brand-deep)' }}>XP</span>
                  </div>
                  <span className="text-sm font-bold" style={{ color: 'var(--brand-deep)' }}>{totalXP} XP</span>
                  <span className="text-xs text-gray-500">· {modulesCompleted}/5 modules</span>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
