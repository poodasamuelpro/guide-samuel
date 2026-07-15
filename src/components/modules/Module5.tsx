'use client';

import { motion } from 'framer-motion';
import VideoPlayer from '@/components/VideoPlayer';
import { MarginSimulator } from '@/components/Simulators';

interface Props { onStartQuiz: () => void; onBack: () => void; }

export default function Module5({ onStartQuiz, onBack }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="bg-gradient-to-br from-red-500 to-red-700 text-white px-4 pt-8 pb-14">
        <div className="max-w-lg mx-auto">
          <button onClick={onBack} className="text-red-200 text-sm mb-4">&larr; Dashboard</button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">💰</div>
            <div>
              <p className="text-red-200 text-xs">Module 5</p>
              <h1 className="font-bold text-xl">Comment vendre vos produits</h1>
            </div>
          </div>
          <p className="text-red-200 text-sm">Grossiste ou detaillant ? Facebook, WhatsApp, Jumia -- trouve ta strategie.</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-8 space-y-5">
        <VideoPlayer envKey="NEXT_PUBLIC_VIDEO_MODULE_5" title="Module 5 - resume video" />

        {/* 2 methodes */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-[#1a2a4a] mb-4">📊 2 methodes pour vendre</h2>
          <div className="space-y-4">
            <div className="border-2 border-[#f2994a] rounded-xl p-4 bg-orange-50">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#f2994a] text-white text-xs font-bold px-2 py-0.5 rounded-full">Methode 1</span>
                <h3 className="font-bold text-[#1a2a4a]">Etre Grossiste</h3>
              </div>
              <p className="text-sm text-gray-700 mb-3">Tu vends en volume a des commercants detaillants qui revendent eux-memes au client final.</p>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Exemple de marge grossiste :</p>
                <div className="flex items-center gap-2 text-sm font-bold flex-wrap">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">Achete : 500 FCFA</span>
                  <span>→</span>
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded">Vend : 800 FCFA</span>
                  <span>→</span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded">+300 FCFA</span>
                </div>
              </div>
              <div className="mt-3 space-y-1 text-xs text-gray-600">
                <p>✅ Ventes en volume = revenus reguliers</p>
                <p>✅ Moins de gestion clientele individuelle</p>
                <p>⚠️ Marge par unite plus faible</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#1a2a4a] text-white text-xs font-bold px-2 py-0.5 rounded-full">Methode 2</span>
                <h3 className="font-bold text-[#1a2a4a]">Etre Detaillant</h3>
              </div>
              <p className="text-sm text-gray-700 mb-3">Tu vends directement au consommateur final. Marge plus grande par unite.</p>
              <div className="bg-white border border-gray-100 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Exemple de marge detaillant :</p>
                <div className="flex items-center gap-2 text-sm font-bold flex-wrap">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">Achete : 500 FCFA</span>
                  <span>→</span>
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded">Vend : 1 500 FCFA</span>
                  <span>→</span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded">+1 000 FCFA</span>
                </div>
              </div>
              <div className="mt-3 space-y-1 text-xs text-gray-600">
                <p>✅ Marge par unite bien plus elevee</p>
                <p>✅ Relation directe avec le client</p>
                <p>⚠️ Demande plus d&apos;effort marketing</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Canaux de vente */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-[#1a2a4a] mb-4">📱 Ou vendre en Afrique de l&apos;Ouest (2025)</h2>
          <div className="space-y-3">
            {[
              {
                icon: '📘',
                name: 'Facebook Marketplace',
                score: 5,
                desc: "La plateforme n°1 en Afrique de l'Ouest. Publie des annonces, rejoins des groupes de vente locaux.",
                tips: "Photos de qualite + description claire + prix affiche = ventes rapides",
              },
              {
                icon: '💬',
                name: 'WhatsApp Business',
                score: 5,
                desc: "Cree ton catalogue produit, partage avec ton reseau, gere les commandes par message.",
                tips: "Statuts WhatsApp + groupes = publicite gratuite et efficace",
              },
              {
                icon: '🛒',
                name: 'Jumia',
                score: 3,
                desc: "Disponible en Cote d'Ivoire, Senegal, Nigeria. Bonne visibilite mais commission a prevoir.",
                tips: "Surtout interessant pour les vendeurs en Cote d'Ivoire / Senegal",
              },
              {
                icon: '🏪',
                name: 'Boutique physique',
                score: 4,
                desc: "Marche, kiosque ou boutique en ville. La confiance du client en face-a-face reste forte.",
                tips: "Combine physique + numerique pour maximiser les ventes",
              },
            ].map((c) => (
              <div key={c.name} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="text-2xl flex-shrink-0">{c.icon}</span>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-bold text-[#1a2a4a] text-sm">{c.name}</p>
                    <div className="flex">{Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={`text-xs ${i < c.score ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                    ))}</div>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{c.desc}</p>
                  <p className="text-xs text-[#f2994a] font-semibold">💡 {c.tips}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Conseils */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-[#1a2a4a] mb-4">🚀 Conseils pour vendre vite</h2>
          <div className="space-y-3">
            {[
              { icon: '📸', tip: "Fais de belles photos de tes produits (fond blanc ou propre, bonne lumiere)" },
              { icon: '💬', tip: "Reponds rapidement aux messages -- les clients n'attendent pas" },
              { icon: '🚴', tip: "Propose la livraison a domicile via un service local (Yango, moto-taxi)" },
              { icon: '⭐', tip: "Collecte des avis clients -- ils rassurent les futurs acheteurs" },
              { icon: '🔄', tip: "Reinvestis une partie de tes benefices pour agrandir ton stock progressivement" },
              { icon: '📊', tip: "Teste differents produits en petites quantites pour identifier les meilleures ventes" },
            ].map((c, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-lg flex-shrink-0">{c.icon}</span>
                <p className="text-sm text-gray-700">{c.tip}</p>
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
          className="w-full bg-gradient-to-r from-[#f2994a] to-[#f5af4d] text-white font-bold py-4 rounded-2xl text-base shadow-lg"
        >
          Passer le quiz du Module 5 🎯
        </motion.button>
      </div>
    </div>
  );
}
