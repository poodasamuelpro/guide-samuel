'use client';

import { motion } from 'framer-motion';
import VideoPlayer from '@/components/VideoPlayer';

interface Props { onStartQuiz: () => void; onBack: () => void; }

export default function Module2({ onStartQuiz, onBack }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="bg-gradient-to-br from-orange-500 to-orange-700 text-white px-4 pt-8 pb-14">
        <div className="max-w-lg mx-auto">
          <button onClick={onBack} className="text-orange-200 text-sm mb-4">&larr; Dashboard</button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">🛒</div>
            <div>
              <p className="text-orange-200 text-xs">Module 2</p>
              <h1 className="font-bold text-xl">Sur quels sites acheter</h1>
            </div>
          </div>
          <p className="text-orange-200 text-sm">AliExpress vs Alibaba -- comprends les differences pour faire le bon choix.</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-8 space-y-5">
        <VideoPlayer envKey="NEXT_PUBLIC_VIDEO_MODULE_2" title="Module 2 - resume video" />

        {/* Comparatif */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-[#1a2a4a] mb-4">🆚 AliExpress vs Alibaba</h2>

          <div className="space-y-4">
            {/* AliExpress */}
            <div className="border-2 border-orange-400 rounded-xl p-4 bg-orange-50">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🛍️</span>
                <div>
                  <h3 className="font-bold text-[#1a2a4a]">AliExpress</h3>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Recommande pour debuter</span>
                </div>
              </div>
              <div className="space-y-1.5 text-sm">
                {[
                  ['👤 Profil', "Detaillants, acheteurs particuliers"],
                  ['📦 Quantite', "A l'unite ou en petites quantites"],
                  ['🚚 Livraison', "Geree par le vendeur jusqu'a toi"],
                  ['🛡️ Protection', "Protection acheteur 60 jours integree"],
                  ['💬 Negociation', "Pas necessaire -- prix fixes"],
                  ['🎓 Niveau', "Debutant"],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-2">
                    <span className="text-gray-500 flex-shrink-0 w-28">{k}</span>
                    <span className="text-gray-700">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alibaba */}
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🏭</span>
                <div>
                  <h3 className="font-bold text-[#1a2a4a]">Alibaba</h3>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">Pour grossistes experimentes</span>
                </div>
              </div>
              <div className="space-y-1.5 text-sm">
                {[
                  ['👤 Profil', "Grossistes, revendeurs, entreprises"],
                  ['📦 Quantite', "Grosses commandes (MOQ eleve)"],
                  ['🚚 Livraison', "A negocier directement avec le fabricant"],
                  ['🛡️ Protection', "Trade Assurance (moins accessible aux debutants)"],
                  ['💬 Negociation', "Oui -- prix, delais, conditions a negocier"],
                  ['🎓 Niveau', "Intermediaire / Avance"],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-2">
                    <span className="text-gray-500 flex-shrink-0 w-28">{k}</span>
                    <span className="text-gray-700">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Conseils AliExpress */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-[#1a2a4a] mb-4">✅ Conseils pour bien acheter sur AliExpress</h2>
          <div className="space-y-3">
            {[
              { icon: '⭐', title: 'Choisis des vendeurs bien notes', desc: 'Minimum 4,5 etoiles avec plus de 100 avis. Lis les commentaires recents.' },
              { icon: '📸', title: 'Regarde les photos des acheteurs', desc: 'Les vraies photos sont souvent plus honnetes que celles du vendeur.' },
              { icon: '💬', title: 'Contacte le vendeur avant d\'acheter', desc: 'Pose tes questions sur la qualite, le delai. Un bon vendeur repond vite.' },
              { icon: '📦', title: 'Commence par petites quantites', desc: 'Commande 1 ou 2 pieces pour tester la qualite avant une grosse commande.' },
              { icon: '🛡️', title: 'Protection 60 jours', desc: 'Si ton colis n\'arrive pas dans les 60 jours, ouvre un litige pour etre rembourse.' },
            ].map((tip) => (
              <div key={tip.title} className="flex gap-3">
                <span className="text-xl flex-shrink-0">{tip.icon}</span>
                <div>
                  <p className="font-semibold text-[#1a2a4a] text-sm">{tip.title}</p>
                  <p className="text-gray-600 text-xs">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scenarios */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
          <h3 className="font-bold text-[#1a2a4a] mb-3">🎯 AliExpress ou Alibaba -- choix rapide</h3>
          <div className="space-y-3">
            {[
              { scenario: "Tu debutes, tu veux tester 3 articles differents", answer: "AliExpress", why: "Petites quantites, protection acheteur, pas de negociation" },
              { scenario: "Tu veux commander 500 paires de chaussures pour ta boutique", answer: "Alibaba", why: "Grosses quantites, negociation directe avec le fabricant" },
              { scenario: "Tu veux un remboursement si le colis n'arrive pas", answer: "AliExpress", why: "Protection acheteur 60 jours facile a activer" },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-xl p-3">
                <p className="text-sm text-gray-700 mb-1"><strong>Situation :</strong> {s.scenario}</p>
                <p className="text-sm"><span className="text-[#f2994a] font-bold">→ {s.answer}</span> <span className="text-gray-500 text-xs">-- {s.why}</span></p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.button
          onClick={onStartQuiz}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-[#f2994a] to-[#f5af4d] text-white font-bold py-4 rounded-2xl text-base shadow-lg"
        >
          Passer le quiz du Module 2 🎯
        </motion.button>
      </div>
    </div>
  );
}
