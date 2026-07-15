'use client';

import { motion } from 'framer-motion';
import VideoPlayer from '@/components/VideoPlayer';
import { MarginSimulator } from '@/components/Simulators';
import {
  IconDollarSign,
  IconBarChart,
  IconSmartphone,
  IconStore,
  IconMessageCircle,
  IconShoppingCart,
  IconCheckCircle,
  IconAlertTriangle,
  IconCamera,
  IconTruck,
  IconStar,
  IconTrendingUp,
  IconArrowRight,
  IconLightbulb,
} from '@/components/Icons';

interface Props { onStartQuiz: () => void; onBack: () => void; }

const CHANNELS = [
  {
    Icon: IconSmartphone,
    name: 'Facebook Marketplace',
    score: 5,
    desc: "La plateforme n°1 en Afrique de l'Ouest. Publie des annonces, rejoins des groupes de vente locaux.",
    tips: "Photos de qualité + description claire + prix affiché = ventes rapides",
  },
  {
    Icon: IconMessageCircle,
    name: 'WhatsApp Business',
    score: 5,
    desc: "Crée ton catalogue produit, partage avec ton réseau, gère les commandes par message.",
    tips: "Statuts WhatsApp + groupes = publicité gratuite et efficace",
  },
  {
    Icon: IconShoppingCart,
    name: 'Jumia',
    score: 3,
    desc: "Disponible en Côte d'Ivoire, Sénégal, Nigeria. Bonne visibilité mais commission à prévoir.",
    tips: "Surtout intéressant pour les vendeurs en Côte d'Ivoire / Sénégal",
  },
  {
    Icon: IconStore,
    name: 'Boutique physique',
    score: 4,
    desc: "Marché, kiosque ou boutique en ville. La confiance du client en face-à-face reste forte.",
    tips: "Combine physique + numérique pour maximiser les ventes",
  },
];

const SELLING_TIPS = [
  { Icon: IconCamera, tip: "Fais de belles photos de tes produits (fond blanc ou propre, bonne lumière)" },
  { Icon: IconMessageCircle, tip: "Réponds rapidement aux messages — les clients n'attendent pas" },
  { Icon: IconTruck, tip: "Propose la livraison à domicile via un service local (Yango, moto-taxi)" },
  { Icon: IconStar, tip: "Collecte des avis clients — ils rassurent les futurs acheteurs" },
  { Icon: IconTrendingUp, tip: "Réinvestis une partie de tes bénéfices pour agrandir ton stock progressivement" },
  { Icon: IconBarChart, tip: "Teste différents produits en petites quantités pour identifier les meilleures ventes" },
];

export default function Module5({ onStartQuiz, onBack }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="bg-gradient-to-br from-red-500 to-red-700 text-white px-4 pt-8 pb-14">
        <div className="max-w-lg mx-auto">
          <button onClick={onBack} className="text-red-200 text-sm mb-4 hover:text-white transition-colors">&larr; Dashboard</button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <IconDollarSign size={24} color="white" />
            </div>
            <div>
              <p className="text-red-200 text-xs font-medium">Module 5</p>
              <h1 className="font-bold text-xl text-white">Comment vendre vos produits</h1>
            </div>
          </div>
          <p className="text-red-100 text-sm">Grossiste ou détaillant ? Facebook, WhatsApp, Jumia — trouve ta stratégie.</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-8 space-y-5">
        <VideoPlayer envKey="NEXT_PUBLIC_VIDEO_MODULE_5" title="Module 5 — résumé vidéo" />

        {/* 2 méthodes */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <IconBarChart size={18} color="#1a2a4a" />
            <h2 className="font-bold text-[#1a2a4a] text-base">2 méthodes pour vendre</h2>
          </div>
          <div className="space-y-4">
            {/* Grossiste */}
            <div className="border-2 border-[#f2994a] rounded-xl p-4 bg-orange-50">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#f2994a] text-white text-xs font-bold px-2 py-0.5 rounded-full">Méthode 1</span>
                <h3 className="font-bold text-[#1a2a4a] text-sm">Être Grossiste</h3>
              </div>
              <p className="text-sm text-gray-700 mb-3">Tu vends en volume à des commerçants détaillants qui revendent eux-mêmes au client final.</p>
              <div className="bg-white rounded-lg p-3 border border-orange-100 mb-3">
                <p className="text-xs text-gray-500 mb-2">Exemple de marge grossiste :</p>
                <div className="flex items-center gap-2 text-xs font-bold flex-wrap">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">Acheté : 500 FCFA</span>
                  <IconArrowRight size={12} color="#9ca3af" />
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded">Vendu : 800 FCFA</span>
                  <IconArrowRight size={12} color="#9ca3af" />
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded">+300 FCFA</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <IconCheckCircle size={13} color="#16a34a" />
                  <span>Ventes en volume = revenus réguliers</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <IconCheckCircle size={13} color="#16a34a" />
                  <span>Moins de gestion clientèle individuelle</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <IconAlertTriangle size={13} color="#d97706" />
                  <span>Marge par unité plus faible</span>
                </div>
              </div>
            </div>

            {/* Détaillant */}
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#1a2a4a] text-white text-xs font-bold px-2 py-0.5 rounded-full">Méthode 2</span>
                <h3 className="font-bold text-[#1a2a4a] text-sm">Être Détaillant</h3>
              </div>
              <p className="text-sm text-gray-700 mb-3">Tu vends directement au consommateur final. Marge plus grande par unité.</p>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 mb-3">
                <p className="text-xs text-gray-500 mb-2">Exemple de marge détaillant :</p>
                <div className="flex items-center gap-2 text-xs font-bold flex-wrap">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">Acheté : 500 FCFA</span>
                  <IconArrowRight size={12} color="#9ca3af" />
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded">Vendu : 1 500 FCFA</span>
                  <IconArrowRight size={12} color="#9ca3af" />
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded">+1 000 FCFA</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <IconCheckCircle size={13} color="#16a34a" />
                  <span>Marge par unité bien plus élevée</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <IconCheckCircle size={13} color="#16a34a" />
                  <span>Relation directe avec le client</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <IconAlertTriangle size={13} color="#d97706" />
                  <span>Demande plus d&apos;effort marketing</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Canaux de vente */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <IconSmartphone size={18} color="#1a2a4a" />
            <h2 className="font-bold text-[#1a2a4a] text-base">Où vendre en Afrique de l&apos;Ouest (2025)</h2>
          </div>
          <div className="space-y-3">
            {CHANNELS.map(({ Icon, name, score, desc, tips }) => (
              <div key={name} className="flex gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-200">
                  <Icon size={20} color="#1a2a4a" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <p className="font-bold text-[#1a2a4a] text-sm">{name}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <IconStar key={i} size={10} color={i < score ? '#fbbf24' : '#d1d5db'} className={i < score ? 'fill-yellow-400' : ''} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{desc}</p>
                  <div className="flex items-center gap-1">
                    <IconLightbulb size={11} color="#f2994a" />
                    <p className="text-xs text-[#f2994a] font-semibold">{tips}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Conseils */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <IconTrendingUp size={18} color="#1a2a4a" />
            <h2 className="font-bold text-[#1a2a4a] text-base">Conseils pour vendre vite</h2>
          </div>
          <div className="space-y-3">
            {SELLING_TIPS.map(({ Icon, tip }, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon size={16} color="#f2994a" />
                </div>
                <p className="text-sm text-gray-700 pt-1">{tip}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Simulateur marge */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <MarginSimulator />
        </motion.div>

        <motion.button
          onClick={onStartQuiz}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-[#f2994a] to-[#f5af4d] text-white font-bold py-4 rounded-2xl text-base shadow-lg flex items-center justify-center gap-2"
        >
          <span>Passer le quiz du Module 5</span>
          <IconArrowRight size={18} color="white" />
        </motion.button>
      </div>
    </div>
  );
}
