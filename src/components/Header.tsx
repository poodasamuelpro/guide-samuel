'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BookOpen, LayoutDashboard, Home, Info, Mail } from 'lucide-react';
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
    { id: 'dashboard', label: 'Modules', Icon: BookOpen },
    { id: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'header-glass shadow-sm' : 'bg-white/95 backdrop-blur-sm'
      }`}
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
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all min-h-0 ${
                  currentView === id
                    ? 'bg-[#1a2a4a] text-white'
                    : 'text-gray-600 hover:text-[#1a2a4a] hover:bg-gray-100'
                }`}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </nav>

          {/* XP indicator (visible if user started) */}
          <div className="hidden md:flex items-center gap-3">
            {totalXP > 0 && (
              <div className="flex items-center gap-2 bg-[#1a2a4a]/5 rounded-full px-3 py-1.5">
                <div className="w-5 h-5 rounded-full bg-[#f2994a] flex items-center justify-center">
                  <span className="text-[9px] font-bold text-white">XP</span>
                </div>
                <span className="text-sm font-bold text-[#1a2a4a]">{totalXP}</span>
                <span className="text-xs text-gray-500">{modulesCompleted}/5 modules</span>
              </div>
            )}
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-[#1a2a4a] hover:bg-gray-100 min-h-0 min-w-0 w-10 h-10 flex items-center justify-center"
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
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1" aria-label="Navigation mobile">
              {navItems.map(({ id, label, Icon }) => (
                <button
                  key={label}
                  onClick={() => { onNavigate?.(id); setMenuOpen(false); }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left min-h-0 ${
                    currentView === id
                      ? 'bg-[#1a2a4a] text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
              {totalXP > 0 && (
                <div className="flex items-center gap-2 px-4 py-3 bg-[#fef3e8] rounded-xl mt-1">
                  <div className="w-6 h-6 rounded-full bg-[#f2994a] flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">XP</span>
                  </div>
                  <span className="text-sm font-bold text-[#1a2a4a]">{totalXP} XP</span>
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
