'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard, ShoppingCart, Package, Tag, TrendingUp,
  Lock, CheckCircle, Trophy, Download, Star, Zap, Award,
  ArrowRight, BookOpen, MapPin
} from 'lucide-react';
import { AppState } from '@/types';
import { MODULES } from '@/lib/modules';
import { isModuleUnlocked, allModulesCompleted } from '@/lib/storage';
import { BrandMark } from './Logo';

interface DashboardProps {
  state: AppState;
  onStartModule: (id: number) => void;
  onDownloadCertificate: () => void;
}

const MODULE_ICONS: Record<string, React.ElementType> = {
  'credit-card': CreditCard,
  'shopping-cart': ShoppingCart,
  'package': Package,
  'tag': Tag,
  'dollar-sign': TrendingUp,
};

const MODULE_COLORS = [
  { bg: '#eff6ff', accent: '#3b82f6', text: '#1d4ed8' },
  { bg: '#fff7ed', accent: '#f97316', text: '#c2410c' },
  { bg: '#f0fdf4', accent: '#10b981', text: '#15803d' },
  { bg: '#f5f3ff', accent: '#8b5cf6', text: '#6d28d9' },
  { bg: '#fef2f2', accent: '#ef4444', text: '#b91c1c' },
];

const BADGE_ICONS: Record<string, React.ElementType> = {
  module_1: CreditCard,
  module_2: ShoppingCart,
  module_3: Package,
  module_4: Tag,
  module_5: TrendingUp,
  champion: Trophy,
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

export default function Dashboard({ state, onStartModule, onDownloadCertificate }: DashboardProps) {
  const completedCount = state.modules.filter((m) => m.quizPassed).length;
  const progressPercent = (completedCount / 5) * 100;
  const allDone = allModulesCompleted(state);
  const firstName = state.user?.firstName || 'Apprenant';

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      {/* ── HERO BANNER ─────────────────────────────────────── */}
      <div className="bg-[#1e3a5f] pt-20 pb-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-[#f6932a] text-sm font-semibold mb-1">
                  Bon retour,
                </p>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {firstName} {state.user?.lastName || ''}
                </h1>
                {state.user?.city && (
                  <p className="text-white/80 text-sm mt-1 flex items-center gap-1">
                    <MapPin size={12} className="text-[#f6932a]" />
                    {state.user.city}
                  </p>
                )}
              </div>
              {/* XP display */}
              <div className="flex items-center gap-3">
                <div className="bg-white/10 rounded-2xl px-5 py-3 border border-white/10 text-center">
                  <p className="text-2xl font-extrabold text-[#f6932a]">{state.totalXP}</p>
                  <p className="text-[10px] text-white/80 uppercase tracking-widest mt-0.5">Points XP</p>
                </div>
                <div className="bg-white/10 rounded-2xl px-5 py-3 border border-white/10 text-center">
                  <p className="text-2xl font-extrabold text-white">{completedCount}<span className="text-white/75 text-lg">/5</span></p>
                  <p className="text-[10px] text-white/80 uppercase tracking-widest mt-0.5">Modules</p>
                </div>
              </div>
            </div>

            {/* Global progress bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white/85">Progression globale</span>
                <span className="text-xs font-bold text-[#f6932a]">{completedCount * 20}%</span>
              </div>
              <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #f6932a, #d97a1a)' }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.3 }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* ── CERTIFICATE ALERT (if all done) ─────────────── */}
          <AnimatePresence>
            {allDone && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 rounded-2xl overflow-hidden"
              >
                <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d4570] p-5 flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#f6932a] flex items-center justify-center shrink-0">
                    <Trophy size={24} className="text-white" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <p className="font-extrabold text-white text-lg">Félicitations, Champion !</p>
                    <p className="text-white/65 text-sm mt-0.5">
                      Vous avez terminé les 5 modules. Votre certificat est prêt.
                    </p>
                  </div>
                  <button
                    onClick={onDownloadCertificate}
                    className="btn-primary px-5 py-3 shrink-0 shadow-xl"
                    aria-label="Télécharger votre certificat PDF"
                  >
                    <Download size={16} />
                    Télécharger le certificat
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── MODULES GRID ────────────────────────────────── */}
          <motion.div variants={fadeUp} className="mb-2">
            <h2 className="text-lg font-extrabold text-[#1e3a5f] flex items-center gap-2">
              <BookOpen size={18} className="text-[#f6932a]" />
              Les modules
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">Complétez chaque module dans l&apos;ordre pour débloquer le suivant.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {MODULES.map((mod, index) => {
              const progress = state.modules.find((m) => m.moduleId === mod.id);
              const unlocked = isModuleUnlocked(mod.id, state);
              const done = progress?.quizPassed ?? false;
              const IconComp = MODULE_ICONS[mod.icon] || Package;
              const colors = MODULE_COLORS[index];

              return (
                <motion.div
                  key={mod.id}
                  variants={fadeUp}
                  custom={index}
                >
                  <div
                    className={`card p-5 h-full flex flex-col transition-all duration-200 ${
                      unlocked && !done
                        ? 'card-interactive cursor-pointer border-2 border-transparent hover:border-[#f6932a]/40'
                        : done
                        ? 'border-2 border-green-200 bg-green-50/30'
                        : 'opacity-60 cursor-not-allowed'
                    }`}
                    onClick={() => unlocked && onStartModule(mod.id)}
                    role={unlocked ? 'button' : undefined}
                    tabIndex={unlocked ? 0 : undefined}
                    onKeyDown={(e) => e.key === 'Enter' && unlocked && onStartModule(mod.id)}
                    aria-label={unlocked ? `Ouvrir le module ${mod.id}: ${mod.title}` : `Module ${mod.id} verrouillé`}
                    aria-disabled={!unlocked}
                  >
                    {/* Module header */}
                    <div className="flex items-start gap-3 mb-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: done ? '#f0fdf4' : colors.bg }}
                      >
                        {done ? (
                          <CheckCircle size={20} className="text-green-600" />
                        ) : unlocked ? (
                          <IconComp size={20} style={{ color: colors.accent }} />
                        ) : (
                          <Lock size={20} className="text-gray-400" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            Module {mod.id}
                          </span>
                          {done && (
                            <span className="badge-green text-[10px]">Terminé</span>
                          )}
                          {!unlocked && (
                            <span className="badge-navy text-[10px]">Verrouillé</span>
                          )}
                        </div>
                        <h3 className="text-sm font-bold text-[#1e3a5f] leading-tight mt-0.5 line-clamp-2">
                          {mod.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 leading-relaxed flex-1 mb-4 line-clamp-2">
                      {mod.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-1.5">
                        <Zap size={12} style={{ color: colors.accent }} />
                        <span className="text-xs font-bold" style={{ color: colors.text }}>
                          {done ? `${mod.xpReward} XP gagnés` : `+${mod.xpReward} XP`}
                        </span>
                      </div>
                      {unlocked && !done ? (
                        <div className="flex items-center gap-1 text-[#f6932a]">
                          <span className="text-xs font-semibold">Commencer</span>
                          <ArrowRight size={13} />
                        </div>
                      ) : done ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <span className="text-xs font-semibold">Revoir</span>
                          <ArrowRight size={13} />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── BADGES ──────────────────────────────────────── */}
          {state.badges.length > 0 && (
            <motion.div variants={fadeUp} className="mb-8">
              <h2 className="text-lg font-extrabold text-[#1e3a5f] flex items-center gap-2 mb-4">
                <Award size={18} className="text-[#f6932a]" />
                Vos badges
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {state.badges.map((badge) => {
                  const BadgeIcon = BADGE_ICONS[badge] || Star;
                  const label = badge === 'champion' ? 'Champion' : `Module ${badge.replace('module_', '')}`;
                  const isChampion = badge === 'champion';
                  return (
                    <motion.div
                      key={badge}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', bounce: 0.5 }}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-center ${
                        isChampion
                          ? 'bg-gradient-to-br from-[#1e3a5f] to-[#2d4570] border-[#f6932a]/40'
                          : 'bg-white border-[#f6932a]/30'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                        isChampion ? 'bg-[#f6932a]' : 'bg-[#fef3e8]'
                      }`}>
                        <BadgeIcon size={16} className={isChampion ? 'text-white' : 'text-[#f6932a]'} />
                      </div>
                      <span className={`text-[10px] font-bold ${isChampion ? 'text-white' : 'text-[#1e3a5f]'}`}>
                        {label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── Certificate download (always visible) ────────── */}
          <motion.div variants={fadeUp}>
            <div className={`rounded-2xl p-5 border-2 flex flex-col sm:flex-row items-center gap-4 ${
              allDone
                ? 'bg-[#fef3e8] border-[#f6932a]/40'
                : 'bg-gray-50 border-dashed border-gray-200'
            }`}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                allDone ? 'bg-[#f6932a]' : 'bg-gray-200'
              }`}>
                <Download size={20} className={allDone ? 'text-white' : 'text-gray-400'} />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className={`font-bold text-sm ${allDone ? 'text-[#1e3a5f]' : 'text-gray-400'}`}>
                  {allDone ? 'Certificat disponible !' : 'Certificat de formation'}
                </p>
                <p className={`text-xs mt-0.5 ${allDone ? 'text-gray-600' : 'text-gray-400'}`}>
                  {allDone
                    ? 'Téléchargez votre certificat PDF personnalisé.'
                    : `Terminez les ${5 - completedCount} modules restants pour débloquer votre certificat.`}
                </p>
              </div>
              {allDone && (
                <button
                  onClick={onDownloadCertificate}
                  className="btn-primary shrink-0"
                  aria-label="Télécharger le certificat PDF"
                >
                  <Download size={15} />
                  Télécharger
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
