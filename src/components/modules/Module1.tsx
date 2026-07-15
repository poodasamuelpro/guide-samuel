'use client';

import { motion } from 'framer-motion';
import VideoPlayer from '@/components/VideoPlayer';
import { BudgetSimulator, StarterChecklist } from '@/components/Simulators';

interface Props { onStartQuiz: () => void; onBack: () => void; }

export default function Module1({ onStartQuiz, onBack }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-4 pt-8 pb-14">
        <div className="max-w-lg mx-auto">
          <button onClick={onBack} className="text-blue-200 text-sm mb-4 flex items-center gap-1">
            &larr; Dashboard
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">💳</div>
            <div>
              <p className="text-blue-200 text-xs">Module 1</p>
              <h1 className="font-bold text-xl">Les indispensables pour importer</h1>
            </div>
          </div>
          <p className="text-blue-200 text-sm">Carte bancaire, boite postale, budget -- tout ce qu&apos;il te faut avant ta premiere commande.</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-8 space-y-5">
        <VideoPlayer envKey="NEXT_PUBLIC_VIDEO_MODULE_1" title="Module 1 - resume video" />

        {/* Intro */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-[#1a2a4a] mb-3">🎯 Ce dont tu as besoin</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            Avant de passer ta premiere commande depuis la Chine, assure-toi d&apos;avoir ces 3 elements essentiels :
          </p>
          <div className="space-y-2">
            {[
              "Un telephone Android ou un ordinateur avec internet",
              "Une carte Visa prepayee pour payer en ligne",
              "Une boite postale pour recevoir tes colis"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-[#f2994a] font-bold flex-shrink-0">{i + 1}.</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cartes */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-[#1a2a4a] mb-4">💳 Les cartes prepayees disponibles</h2>

          <div className="space-y-4">
            <div className="border-2 border-[#f2994a] rounded-xl p-4 bg-orange-50">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#f2994a] text-white text-xs font-bold px-2 py-0.5 rounded-full">Recommandee</span>
                <h3 className="font-bold text-[#1a2a4a]">Carte Visa UBA Africard</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-gray-500">Cout</span><p className="font-bold text-[#1a2a4a]">10 000 FCFA</p></div>
                <div><span className="text-gray-500">Recharge min.</span><p className="font-bold text-[#1a2a4a]">1 400 FCFA</p></div>
              </div>
              <p className="text-xs text-gray-600 mt-2">✅ Rechargeable via agence UBA, representants ou <strong>Orange Money</strong>. Acceptee partout sur Visa.</p>
            </div>

            <div className="border border-gray-200 rounded-xl p-4">
              <h3 className="font-bold text-[#1a2a4a] mb-2">Carte Cashxpress Ecobank</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-gray-500">Cout promo</span><p className="font-bold text-[#1a2a4a]">~3 500 FCFA</p></div>
                <div><span className="text-gray-500">Recharge</span><p className="font-bold text-[#1a2a4a]">En agence uniquement</p></div>
              </div>
              <p className="text-xs text-gray-600 mt-2">💡 Prix promotionnel -- verifier le tarif actuel en agence. Moins flexible que la carte UBA.</p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
              <p className="text-xs text-yellow-800">
                <strong>Note :</strong> Les tarifs peuvent evoluer. Confirme le prix exact directement en agence.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Boite postale */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-[#1a2a4a] mb-4">📬 La Boite Postale -- indispensable</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            C&apos;est l&apos;adresse de livraison que tu renseignes sur AliExpress. Tes colis arrivent a La Poste et tu viens les recuperer.
          </p>

          <div className="bg-blue-50 rounded-xl p-4 space-y-2">
            <h3 className="font-semibold text-[#1a2a4a] text-sm">Tarifs a La Poste Burkina Faso</h3>
            {[
              { label: 'Boite postale (annuel)', value: '15 000 FCFA' },
              { label: 'Cle', value: '2 000 FCFA' },
              { label: 'Timbre', value: '200 FCFA' },
              { label: 'Total ouverture', value: '17 200 FCFA', bold: true },
              { label: 'Renouvellement annuel', value: '10 000 FCFA' },
              { label: 'Retrait colis', value: '1 200 FCFA / colis' },
            ].map((r, i) => (
              <div key={i} className={`flex justify-between text-sm ${r.bold ? 'font-bold text-[#1a2a4a] border-t border-blue-200 pt-2' : 'text-gray-600'}`}>
                <span>{r.label}</span>
                <span className={r.bold ? 'text-[#f2994a]' : ''}>{r.value}</span>
              </div>
            ))}
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-3 mt-3">
            <p className="text-xs text-green-800">
              💡 <strong>Astuce Samuel :</strong> Tu peux maintenant souscrire a une boite postale <strong>en ligne</strong> sur <strong>laposte.bf</strong> (abonnement en ligne : 28 800 FCFA tout inclus). Renouvelle avant le 15 octobre.
            </p>
          </div>
        </motion.div>

        {/* Simulateur budget */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <BudgetSimulator />
        </motion.div>

        {/* Checklist */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <StarterChecklist />
        </motion.div>

        {/* CTA Quiz */}
        <motion.button
          onClick={onStartQuiz}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-[#f2994a] to-[#f5af4d] text-white font-bold py-4 rounded-2xl text-base shadow-lg"
        >
          Passer le quiz du Module 1 🎯
        </motion.button>
      </div>
    </div>
  );
}
