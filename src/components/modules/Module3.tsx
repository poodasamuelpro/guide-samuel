'use client';

import { motion } from 'framer-motion';
import VideoPlayer from '@/components/VideoPlayer';
import { TaxSimulator, LitigeTimeline } from '@/components/Simulators';

interface Props { onStartQuiz: () => void; onBack: () => void; }

export default function Module3({ onStartQuiz, onBack }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="bg-gradient-to-br from-green-600 to-green-800 text-white px-4 pt-8 pb-14">
        <div className="max-w-lg mx-auto">
          <button onClick={onBack} className="text-green-200 text-sm mb-4">&larr; Dashboard</button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">📦</div>
            <div>
              <p className="text-green-200 text-xs">Module 3</p>
              <h1 className="font-bold text-xl">Delais et taxes douanieres</h1>
            </div>
          </div>
          <p className="text-green-200 text-sm">Maitrise les delais, la protection acheteur et la gestion des douanes.</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-8 space-y-5">
        <VideoPlayer envKey="NEXT_PUBLIC_VIDEO_MODULE_3" title="Module 3 - resume video" />

        {/* Delais */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-[#1a2a4a] mb-4">⏱️ Delais de livraison</h2>
          <div className="space-y-3">
            {[
              {
                name: 'DHL / EMS',
                time: '7 a 15 jours',
                price: 'Payant (tarif selon poids)',
                badge: 'Rapide',
                color: 'bg-green-100 text-green-700',
                desc: "La solution la plus rapide. Ideal pour les commandes urgentes ou les colis de valeur.",
              },
              {
                name: 'AliExpress Standard Shipping',
                time: '20 a 45 jours',
                price: 'Souvent gratuit',
                badge: 'Economique',
                color: 'bg-blue-100 text-blue-700',
                desc: "Le plus utilise pour debuter. Gratuit pour la plupart des commandes, delai plus long mais fiable.",
              },
            ].map((m) => (
              <div key={m.name} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-[#1a2a4a] text-sm">{m.name}</h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${m.color}`}>{m.badge}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                  <div><span className="text-gray-500">Delai</span><p className="font-bold text-[#1a2a4a]">{m.time}</p></div>
                  <div><span className="text-gray-500">Cout</span><p className="font-bold text-[#1a2a4a]">{m.price}</p></div>
                </div>
                <p className="text-xs text-gray-600">{m.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mt-3">
            <p className="text-xs text-yellow-800">📌 Les delais varient selon la periode (fetes chinoises, etc.) et la destination exacte.</p>
          </div>
        </motion.div>

        {/* Protection acheteur */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-[#1a2a4a] mb-4">🛡️ Protection acheteur AliExpress</h2>
          <div className="bg-blue-50 rounded-xl p-4 mb-4">
            <p className="text-3xl font-bold text-blue-700 text-center">60 jours</p>
            <p className="text-xs text-blue-600 text-center mt-1">Duree de la protection (a verifier sur le site AliExpress)</p>
          </div>
          <div className="space-y-3">
            {[
              { title: 'Colis non recu ?', desc: "Ouvre un litige avant la fin des 60 jours. AliExpress t'aide a obtenir un remboursement." },
              { title: 'Produit non conforme ?', desc: "Prends des photos des l'ouverture. Signale le probleme dans le centre de litiges AliExpress." },
              { title: 'Remboursement', desc: "Apres resolution du litige : 7 a 15 jours ouvrables pour que le credit revienne sur ta carte." },
            ].map((t) => (
              <div key={t.title} className="flex gap-3">
                <span className="text-green-500 text-lg">✓</span>
                <div>
                  <p className="font-semibold text-[#1a2a4a] text-sm">{t.title}</p>
                  <p className="text-gray-600 text-xs">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Douanes */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-[#1a2a4a] mb-4">🏛️ Les taxes douanieres</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            Au Burkina Faso (zone UEMOA), les colis importes peuvent etre soumis a des taxes douanieres.
          </p>
          <div className="space-y-3">
            {[
              { icon: '✅', title: 'Petits colis souvent exoneres', desc: "En pratique : moins de 10 pieces et valeur unitaire modeste => souvent pas de taxe. Mais rien n'est garanti." },
              { icon: '⚠️', title: 'Colis de valeur => taxation probable', desc: "Un colis de plus de 30 000-50 000 FCFA sera probablement taxe. Prevoir une marge de 15-25%." },
              { icon: '📋', title: 'Taux variable selon categorie', desc: "Le taux depend du type de produit. Renseigne-toi aupres de la douane locale." },
              { icon: '🧾', title: 'Garde tes factures', desc: "En cas de controle, la facture AliExpress prouve la valeur reelle du colis." },
            ].map((t) => (
              <div key={t.title} className="flex gap-3">
                <span className="text-lg flex-shrink-0">{t.icon}</span>
                <div>
                  <p className="font-semibold text-[#1a2a4a] text-sm">{t.title}</p>
                  <p className="text-gray-600 text-xs">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Simulateur taxes */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <TaxSimulator />
        </motion.div>

        {/* Chronologie */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <LitigeTimeline />
        </motion.div>

        <motion.button
          onClick={onStartQuiz}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-[#f2994a] to-[#f5af4d] text-white font-bold py-4 rounded-2xl text-base shadow-lg"
        >
          Passer le quiz du Module 3 🎯
        </motion.button>
      </div>
    </div>
  );
}
