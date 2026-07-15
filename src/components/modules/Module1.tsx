'use client';

import { motion } from 'framer-motion';
import VideoPlayer from '@/components/VideoPlayer';
import { BudgetSimulator, StarterChecklist } from '@/components/Simulators';
import {
  IconCreditCard,
  IconTarget,
  IconCheckCircle,
  IconLightbulb,
  IconMailbox,
  IconArrowRight,
} from '@/components/Icons';

interface Props { onStartQuiz: () => void; onBack: () => void; }

export default function Module1({ onStartQuiz, onBack }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-4 pt-8 pb-14">
        <div className="max-w-lg mx-auto">
          <button onClick={onBack} className="text-blue-200 text-sm mb-4 flex items-center gap-1 hover:text-white transition-colors">
            &larr; Dashboard
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <IconCreditCard size={24} color="white" />
            </div>
            <div>
              <p className="text-blue-200 text-xs font-medium">Module 1</p>
              <h1 className="font-bold text-xl text-white">Les indispensables pour importer</h1>
            </div>
          </div>
          <p className="text-blue-100 text-sm">Carte bancaire, boite postale, budget — tout ce qu&apos;il te faut avant ta premiere commande.</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-8 space-y-5">
        <VideoPlayer envKey="NEXT_PUBLIC_VIDEO_MODULE_1" title="Module 1 — résumé vidéo" />

        {/* Intro */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <IconTarget size={18} color="#1a2a4a" />
            <h2 className="font-bold text-[#1a2a4a] text-base">Ce dont tu as besoin</h2>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            Avant de passer ta premiere commande depuis la Chine, assure-toi d&apos;avoir ces 3 elements essentiels :
          </p>
          <div className="space-y-3">
            {[
              "Un telephone Android ou un ordinateur avec internet",
              "Une carte Visa prepayee pour payer en ligne",
              "Une boite postale pour recevoir tes colis",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="w-6 h-6 bg-[#f2994a] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{i + 1}</span>
                <span className="pt-0.5">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cartes prépayées */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <IconCreditCard size={18} color="#1a2a4a" />
            <h2 className="font-bold text-[#1a2a4a] text-base">Les cartes prépayées disponibles</h2>
          </div>

          <div className="space-y-4">
            <div className="border-2 border-[#f2994a] rounded-xl p-4 bg-orange-50">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#f2994a] text-white text-xs font-bold px-2 py-0.5 rounded-full">Recommandée</span>
                <h3 className="font-bold text-[#1a2a4a] text-sm">Carte Visa UBA Africard</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div><span className="text-gray-500">Coût</span><p className="font-bold text-[#1a2a4a] text-sm mt-0.5">10 000 FCFA</p></div>
                <div><span className="text-gray-500">Recharge min.</span><p className="font-bold text-[#1a2a4a] text-sm mt-0.5">1 400 FCFA</p></div>
              </div>
              <div className="flex items-start gap-2">
                <IconCheckCircle size={14} color="#16a34a" className="flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700">Rechargeable via agence UBA, représentants ou <strong>Orange Money</strong>. Acceptée partout sur Visa.</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-4">
              <h3 className="font-bold text-[#1a2a4a] mb-2 text-sm">Carte Cashxpress Ecobank</h3>
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div><span className="text-gray-500">Coût promo</span><p className="font-bold text-[#1a2a4a] text-sm mt-0.5">~3 500 FCFA</p></div>
                <div><span className="text-gray-500">Recharge</span><p className="font-bold text-[#1a2a4a] text-sm mt-0.5">En agence uniquement</p></div>
              </div>
              <div className="flex items-start gap-2">
                <IconLightbulb size={14} color="#f2994a" className="flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700">Prix promotionnel — vérifier le tarif actuel en agence. Moins flexible que la carte UBA.</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
              <p className="text-xs text-yellow-800">
                <strong>Note :</strong> Les tarifs peuvent évoluer. Confirmez le prix exact directement en agence.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Boite postale */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <IconMailbox size={18} color="#1a2a4a" />
            <h2 className="font-bold text-[#1a2a4a] text-base">La Boîte Postale — indispensable</h2>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            C&apos;est l&apos;adresse de livraison que tu renseignes sur AliExpress. Tes colis arrivent à La Poste et tu viens les récupérer.
          </p>

          <div className="bg-blue-50 rounded-xl p-4 space-y-2">
            <h3 className="font-semibold text-[#1a2a4a] text-sm mb-3">Tarifs à La Poste Burkina Faso</h3>
            {[
              { label: 'Boîte postale (annuel)', value: '15 000 FCFA' },
              { label: 'Clé', value: '2 000 FCFA' },
              { label: 'Timbre', value: '200 FCFA' },
              { label: 'Total ouverture', value: '17 200 FCFA', bold: true },
              { label: 'Renouvellement annuel', value: '10 000 FCFA' },
              { label: 'Retrait colis', value: '1 200 FCFA / colis' },
            ].map((r, i) => (
              <div key={i} className={`flex justify-between text-sm ${r.bold ? 'font-bold text-[#1a2a4a] border-t border-blue-200 pt-2 mt-2' : 'text-gray-700'}`}>
                <span>{r.label}</span>
                <span className={r.bold ? 'text-[#f2994a]' : 'font-semibold text-[#1a2a4a]'}>{r.value}</span>
              </div>
            ))}
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-3 mt-3 flex items-start gap-2">
            <IconLightbulb size={14} color="#16a34a" className="flex-shrink-0 mt-0.5" />
            <p className="text-xs text-green-800">
              <strong>Astuce Samuel :</strong> Tu peux maintenant souscrire à une boîte postale <strong>en ligne</strong> sur <strong>laposte.bf</strong> (abonnement en ligne : 28 800 FCFA tout inclus). Renouvelle avant le 15 octobre.
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
          className="w-full bg-gradient-to-r from-[#f2994a] to-[#f5af4d] text-white font-bold py-4 rounded-2xl text-base shadow-lg flex items-center justify-center gap-2"
        >
          <span>Passer le quiz du Module 1</span>
          <IconArrowRight size={18} color="white" />
        </motion.button>
      </div>
    </div>
  );
}
