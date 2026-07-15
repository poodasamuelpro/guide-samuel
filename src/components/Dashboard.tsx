'use client';

import { motion } from 'framer-motion';
import { MODULES } from '@/lib/modules';
import { isModuleUnlocked, allModulesCompleted } from '@/lib/storage';
import { AppState } from '@/types';
import { BADGE_LABELS } from '@/lib/modules';
import VideoPlayer from './VideoPlayer';
import {
  IconCreditCard,
  IconShoppingCart,
  IconPackage,
  IconTag,
  IconDollarSign,
  IconTrophy,
  IconAward,
  IconBook,
  IconLock,
  IconCheck,
  IconDownload,
  IconMapPin,
  IconArrowRight,
} from '@/components/Icons';

interface DashboardProps {
  state: AppState;
  onStartModule: (id: number) => void;
  onDownloadCertificate: () => void;
}

const MODULE_ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string; className?: string }>> = {
  'credit-card': IconCreditCard,
  'shopping-cart': IconShoppingCart,
  'package': IconPackage,
  'tag': IconTag,
  'dollar-sign': IconDollarSign,
};

export default function Dashboard({ state, onStartModule, onDownloadCertificate }: DashboardProps) {
  const completedCount = state.modules.filter((m) => m.quizPassed).length;
  const percent = Math.round((completedCount / 5) * 100);
  const allDone = allModulesCompleted(state);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1a2a4a] to-[#0f1a2e] text-white px-4 pt-10 pb-16">
        <div className="max-w-lg mx-auto">
          <p className="text-[#f2994a] font-semibold text-sm mb-1">Bon retour,</p>
          <h1 className="text-2xl font-bold mb-1 text-white">
            {state.user?.firstName} {state.user?.lastName}
          </h1>
          {state.user?.city && (
            <div className="flex items-center gap-1.5 mt-1">
              <IconMapPin size={13} color="#9ca3af" />
              <p className="text-gray-300 text-sm">{state.user.city}</p>
            </div>
          )}

          {/* XP bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-300 font-medium">Progression globale</span>
              <span className="text-[#f2994a] font-bold">{state.totalXP} XP · {completedCount}/5 modules</span>
            </div>
            <div className="bg-white/20 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="bg-gradient-to-r from-[#f2994a] to-[#f5af4d] h-3 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-8 pb-8">
        {/* Vidéo globale */}
        <VideoPlayer
          envKey="NEXT_PUBLIC_VIDEO_GLOBAL"
          title="Résumé de la formation"
          className="mb-6"
        />

        {/* Certificat si tout complété */}
        {allDone && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-5 mb-6 text-white text-center shadow-lg"
          >
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <IconTrophy size={26} color="white" />
            </div>
            <h2 className="font-bold text-lg mb-1">Formation terminée !</h2>
            <p className="text-sm opacity-90 mb-4">Tu as complété tous les modules. Félicitations !</p>
            <button
              onClick={onDownloadCertificate}
              className="bg-white text-orange-600 font-bold px-6 py-2.5 rounded-xl text-sm shadow flex items-center gap-2 mx-auto"
            >
              <IconDownload size={16} color="#ea580c" />
              Télécharger mon certificat
            </button>
          </motion.div>
        )}

        {/* Badges */}
        {state.badges.length > 0 && (
          <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <IconAward size={18} color="#1a2a4a" />
              <h2 className="font-bold text-[#1a2a4a] text-base">Mes badges</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {state.badges.map((b) => (
                <span key={b} className="bg-orange-50 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full border border-orange-200">
                  {BADGE_LABELS[b] ?? b}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Modules */}
        <div className="flex items-center gap-2 mb-4">
          <IconBook size={20} color="#1a2a4a" />
          <h2 className="font-bold text-[#1a2a4a] text-lg">Tes modules</h2>
        </div>
        <div className="space-y-3">
          {MODULES.map((mod, i) => {
            const progress = state.modules[i];
            const unlocked = isModuleUnlocked(mod.id, state);
            const done = progress?.quizPassed;
            const ModIcon = MODULE_ICON_MAP[mod.icon] ?? IconPackage;

            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white rounded-2xl p-4 shadow-sm border-2 transition-all
                  ${done ? 'border-green-200' : unlocked ? 'border-transparent hover:border-[#f2994a]' : 'border-transparent opacity-60'}
                  ${unlocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                onClick={() => unlocked && onStartModule(mod.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center flex-shrink-0`}>
                    {done ? (
                      <IconCheck size={22} color="white" />
                    ) : unlocked ? (
                      <ModIcon size={22} color="white" />
                    ) : (
                      <IconLock size={20} color="white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-[#1a2a4a] text-sm">{mod.title}</h3>
                      {done && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                          +{progress.xpEarned} XP
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-xs mt-0.5 leading-relaxed line-clamp-2">{mod.description}</p>
                  </div>
                  {unlocked && !done && (
                    <div className="w-8 h-8 bg-[#f2994a] rounded-full flex items-center justify-center flex-shrink-0">
                      <IconArrowRight size={16} color="white" />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
