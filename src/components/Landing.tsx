'use client';

import { motion } from 'framer-motion';
import VideoPlayer from '@/components/VideoPlayer';
import {
  IconCreditCard,
  IconShoppingCart,
  IconPackage,
  IconTag,
  IconDollarSign,
  IconGamepad,
  IconTrophy,
  IconFileText,
  IconLock,
  IconGlobe,
  IconArrowRight,
} from '@/components/Icons';

interface LandingProps {
  onStart: () => void;
}

const MODULE_ICONS = [
  { Icon: IconCreditCard, title: 'Les indispensables', desc: 'Carte bancaire et boîte postale' },
  { Icon: IconShoppingCart, title: 'Où acheter', desc: 'AliExpress vs Alibaba' },
  { Icon: IconPackage, title: 'Délais et douanes', desc: 'Livraison et taxes' },
  { Icon: IconTag, title: 'Quoi importer', desc: 'Produits gagnants' },
  { Icon: IconDollarSign, title: 'Comment vendre', desc: 'Stratégies de vente' },
];

const FEATURES = [
  { Icon: IconGamepad, label: 'Simulateurs interactifs' },
  { Icon: IconTrophy, label: 'Badges et XP' },
  { Icon: IconFileText, label: 'Certificat PDF' },
  { Icon: IconLock, label: 'Données privées' },
];

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2a4a] to-[#0f1a2e]">
      {/* Hero */}
      <div className="px-4 pt-12 pb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-[#f2994a] to-[#f5af4d] rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <IconGlobe size={44} color="white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 leading-tight">
            Le Guide de Samuel
          </h1>
          <p className="text-[#f2994a] font-semibold text-base mb-4">
            Commander et Vendre depuis la Chine
          </p>
          <p className="text-gray-300 text-sm max-w-xs mx-auto leading-relaxed">
            La formation complète pour importer depuis la Chine et vendre en Afrique de l&apos;Ouest — par un ami qui l&apos;a fait avant toi.
          </p>
        </motion.div>
      </div>

      {/* Vidéo globale */}
      <div className="max-w-lg mx-auto px-4 mb-8">
        <VideoPlayer
          envKey="NEXT_PUBLIC_VIDEO_GLOBAL"
          title="Présentation de la formation"
        />
      </div>

      {/* Stats */}
      <div className="max-w-lg mx-auto px-4 mb-8">
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: '5', label: 'Modules' },
            { value: '15', label: 'Quiz et jeux' },
            { value: '100%', label: 'Pratique' },
          ].map((s) => (
            <div key={s.label} className="bg-white/10 rounded-2xl p-3 text-center">
              <p className="text-2xl font-bold text-[#f2994a]">{s.value}</p>
              <p className="text-gray-300 text-xs font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modules preview */}
      <div className="max-w-lg mx-auto px-4 mb-8">
        <h2 className="text-white font-bold mb-4 text-center text-base">Ce que tu vas apprendre</h2>
        <div className="space-y-2">
          {MODULE_ICONS.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white/10 rounded-xl p-3 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon size={20} color="#f2994a" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Module {i + 1} — {title}</p>
                <p className="text-gray-400 text-xs">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-lg mx-auto px-4 mb-10">
        <div className="grid grid-cols-2 gap-3">
          {FEATURES.map(({ Icon, label }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3">
              <Icon size={18} color="#f2994a" />
              <span className="text-gray-200 text-xs font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-lg mx-auto px-4 pb-12">
        <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-[#f2994a] to-[#f5af4d] text-white font-bold py-5 rounded-2xl text-lg shadow-2xl flex items-center justify-center gap-3"
        >
          <span>Commencer le guide</span>
          <IconArrowRight size={22} color="white" />
        </motion.button>
        <p className="text-center text-gray-500 text-xs mt-4">
          Gratuit · Mobile-first · Aucune inscription requise
        </p>
      </div>
    </div>
  );
}
