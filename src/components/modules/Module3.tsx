'use client';

import { motion } from 'framer-motion';
import VideoPlayer from '@/components/VideoPlayer';
import { TaxSimulator, LitigeTimeline } from '@/components/Simulators';
import {
  IconPackage,
  IconClock,
  IconShield,
  IconCheck,
  IconCheckCircle,
  IconAlertTriangle,
  IconClipboard,
  IconReceiptText,
  IconInfo,
  IconArrowRight,
} from '@/components/Icons';

interface Props { onStartQuiz: () => void; onBack: () => void; }

export default function Module3({ onStartQuiz, onBack }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="bg-gradient-to-br from-green-600 to-green-800 text-white px-4 pt-8 pb-14">
        <div className="max-w-lg mx-auto">
          <button onClick={onBack} className="text-green-200 text-sm mb-4 hover:text-white transition-colors">&larr; Dashboard</button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <IconPackage size={24} color="white" />
            </div>
            <div>
              <p className="text-green-200 text-xs font-medium">Module 3</p>
              <h1 className="font-bold text-xl text-white">Délais et taxes douanières</h1>
            </div>
          </div>
          <p className="text-green-100 text-sm">Maîtrise les délais, la protection acheteur et la gestion des douanes.</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-8 space-y-5">
        <VideoPlayer envKey="NEXT_PUBLIC_VIDEO_MODULE_3" title="Module 3 — résumé vidéo" />

        {/* Délais */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <IconClock size={18} color="#1a2a4a" />
            <h2 className="font-bold text-[#1a2a4a] text-base">Délais de livraison</h2>
          </div>
          <div className="space-y-3">
            {[
              {
                name: 'DHL / EMS',
                time: '7 à 15 jours',
                price: 'Payant (tarif selon poids)',
                badge: 'Rapide',
                badgeColor: 'bg-green-100 text-green-700',
                desc: "La solution la plus rapide. Idéal pour les commandes urgentes ou les colis de valeur.",
              },
              {
                name: 'AliExpress Standard Shipping',
                time: '20 à 45 jours',
                price: 'Souvent gratuit',
                badge: 'Économique',
                badgeColor: 'bg-blue-100 text-blue-700',
                desc: "Le plus utilisé pour débuter. Gratuit pour la plupart des commandes, délai plus long mais fiable.",
              },
            ].map((m) => (
              <div key={m.name} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-[#1a2a4a] text-sm">{m.name}</h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${m.badgeColor}`}>{m.badge}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                  <div><span className="text-gray-500">Délai</span><p className="font-bold text-[#1a2a4a] text-sm mt-0.5">{m.time}</p></div>
                  <div><span className="text-gray-500">Coût</span><p className="font-bold text-[#1a2a4a] text-sm mt-0.5">{m.price}</p></div>
                </div>
                <p className="text-xs text-gray-600">{m.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mt-3 flex items-start gap-2">
            <IconInfo size={14} color="#92400e" className="flex-shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-800">Les délais varient selon la période (fêtes chinoises, etc.) et la destination exacte.</p>
          </div>
        </motion.div>

        {/* Protection acheteur */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <IconShield size={18} color="#1a2a4a" />
            <h2 className="font-bold text-[#1a2a4a] text-base">Protection acheteur AliExpress</h2>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 mb-4 text-center">
            <p className="text-3xl font-bold text-blue-700">60 jours</p>
            <p className="text-xs text-blue-600 mt-1">Durée de la protection (à vérifier sur le site AliExpress)</p>
          </div>
          <div className="space-y-3">
            {[
              { title: 'Colis non reçu ?', desc: "Ouvre un litige avant la fin des 60 jours. AliExpress t'aide à obtenir un remboursement." },
              { title: 'Produit non conforme ?', desc: "Prends des photos dès l'ouverture. Signale le problème dans le centre de litiges AliExpress." },
              { title: 'Remboursement', desc: "Après résolution du litige : 7 à 15 jours ouvrables pour que le crédit revienne sur ta carte." },
            ].map((t) => (
              <div key={t.title} className="flex gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <IconCheck size={12} color="#16a34a" />
                </div>
                <div>
                  <p className="font-semibold text-[#1a2a4a] text-sm">{t.title}</p>
                  <p className="text-gray-600 text-xs mt-0.5">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Douanes */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-bold text-[#1a2a4a] mb-2 text-base">Les taxes douanières</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            Au Burkina Faso (zone UEMOA), les colis importés peuvent être soumis à des taxes douanières.
          </p>
          <div className="space-y-3">
            {[
              { Icon: IconCheckCircle, iconColor: '#16a34a', bgColor: 'bg-green-50', title: 'Petits colis souvent exonérés', desc: "En pratique : moins de 10 pièces et valeur unitaire modeste => souvent pas de taxe. Mais rien n'est garanti." },
              { Icon: IconAlertTriangle, iconColor: '#dc2626', bgColor: 'bg-red-50', title: 'Colis de valeur => taxation probable', desc: "Un colis de plus de 30 000–50 000 FCFA sera probablement taxé. Prévoir une marge de 15–25%." },
              { Icon: IconClipboard, iconColor: '#2563eb', bgColor: 'bg-blue-50', title: 'Taux variable selon catégorie', desc: "Le taux dépend du type de produit. Renseigne-toi auprès de la douane locale." },
              { Icon: IconReceiptText, iconColor: '#f2994a', bgColor: 'bg-orange-50', title: 'Garde tes factures', desc: "En cas de contrôle, la facture AliExpress prouve la valeur réelle du colis." },
            ].map(({ Icon, iconColor, bgColor, title, desc }) => (
              <div key={title} className="flex gap-3">
                <div className={`w-8 h-8 ${bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon size={16} color={iconColor} />
                </div>
                <div>
                  <p className="font-semibold text-[#1a2a4a] text-sm">{title}</p>
                  <p className="text-gray-600 text-xs mt-0.5">{desc}</p>
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
          className="w-full bg-gradient-to-r from-[#f2994a] to-[#f5af4d] text-white font-bold py-4 rounded-2xl text-base shadow-lg flex items-center justify-center gap-2"
        >
          <span>Passer le quiz du Module 3</span>
          <IconArrowRight size={18} color="white" />
        </motion.button>
      </div>
    </div>
  );
}
