'use client';

import { motion } from 'framer-motion';
import VideoPlayer from '@/components/VideoPlayer';
import {
  IconShoppingCart,
  IconShoppingBag,
  IconBuilding,
  IconUsers,
  IconPackage,
  IconTruck,
  IconShield,
  IconMessageCircle,
  IconGraduationCap,
  IconStar,
  IconCamera,
  IconCheckCircle,
  IconTarget,
  IconArrowRight,
} from '@/components/Icons';

interface Props { onStartQuiz: () => void; onBack: () => void; }

export default function Module2({ onStartQuiz, onBack }: Props) {
  const aliFeatures = [
    { Icon: IconUsers, label: 'Profil', value: 'Détaillants, acheteurs particuliers' },
    { Icon: IconPackage, label: 'Quantité', value: "À l'unité ou en petites quantités" },
    { Icon: IconTruck, label: 'Livraison', value: "Gérée par le vendeur jusqu'à toi" },
    { Icon: IconShield, label: 'Protection', value: 'Protection acheteur 60 jours intégrée' },
    { Icon: IconMessageCircle, label: 'Négociation', value: 'Pas nécessaire — prix fixes' },
    { Icon: IconGraduationCap, label: 'Niveau', value: 'Débutant' },
  ];

  const alibabaFeatures = [
    { Icon: IconUsers, label: 'Profil', value: 'Grossistes, revendeurs, entreprises' },
    { Icon: IconPackage, label: 'Quantité', value: 'Grosses commandes (MOQ élevé)' },
    { Icon: IconTruck, label: 'Livraison', value: 'À négocier directement avec le fabricant' },
    { Icon: IconShield, label: 'Protection', value: 'Trade Assurance (moins accessible aux débutants)' },
    { Icon: IconMessageCircle, label: 'Négociation', value: 'Oui — prix, délais, conditions à négocier' },
    { Icon: IconGraduationCap, label: 'Niveau', value: 'Intermédiaire / Avancé' },
  ];

  const tips = [
    { Icon: IconStar, title: 'Choisis des vendeurs bien notés', desc: 'Minimum 4,5 étoiles avec plus de 100 avis. Lis les commentaires récents.' },
    { Icon: IconCamera, title: 'Regarde les photos des acheteurs', desc: 'Les vraies photos sont souvent plus honnêtes que celles du vendeur.' },
    { Icon: IconMessageCircle, title: 'Contacte le vendeur avant d\'acheter', desc: 'Pose tes questions sur la qualité, le délai. Un bon vendeur répond vite.' },
    { Icon: IconPackage, title: 'Commence par petites quantités', desc: 'Commande 1 ou 2 pièces pour tester la qualité avant une grosse commande.' },
    { Icon: IconShield, title: 'Protection 60 jours', desc: "Si ton colis n'arrive pas dans les 60 jours, ouvre un litige pour être remboursé." },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="bg-gradient-to-br from-orange-500 to-orange-700 text-white px-4 pt-8 pb-14">
        <div className="max-w-lg mx-auto">
          <button onClick={onBack} className="text-orange-200 text-sm mb-4 hover:text-white transition-colors">&larr; Dashboard</button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <IconShoppingCart size={24} color="white" />
            </div>
            <div>
              <p className="text-orange-200 text-xs font-medium">Module 2</p>
              <h1 className="font-bold text-xl text-white">Sur quels sites acheter</h1>
            </div>
          </div>
          <p className="text-orange-100 text-sm">AliExpress vs Alibaba — comprends les différences pour faire le bon choix.</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-8 space-y-5">
        <VideoPlayer envKey="NEXT_PUBLIC_VIDEO_MODULE_2" title="Module 2 — résumé vidéo" />

        {/* Comparatif */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-bold text-[#1a2a4a] mb-4 text-base">AliExpress vs Alibaba</h2>

          <div className="space-y-4">
            {/* AliExpress */}
            <div className="border-2 border-orange-400 rounded-xl p-4 bg-orange-50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-orange-400 rounded-lg flex items-center justify-center">
                  <IconShoppingBag size={20} color="white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1a2a4a] text-sm">AliExpress</h3>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Recommandé pour débuter</span>
                </div>
              </div>
              <div className="space-y-2">
                {aliFeatures.map(({ Icon, label, value }) => (
                  <div key={label} className="flex gap-2 text-sm">
                    <div className="flex items-center gap-1.5 w-32 flex-shrink-0">
                      <Icon size={13} color="#9ca3af" />
                      <span className="text-gray-500 text-xs">{label}</span>
                    </div>
                    <span className="text-gray-800 text-xs">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alibaba */}
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <IconBuilding size={20} color="white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1a2a4a] text-sm">Alibaba</h3>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">Pour grossistes expérimentés</span>
                </div>
              </div>
              <div className="space-y-2">
                {alibabaFeatures.map(({ Icon, label, value }) => (
                  <div key={label} className="flex gap-2 text-sm">
                    <div className="flex items-center gap-1.5 w-32 flex-shrink-0">
                      <Icon size={13} color="#9ca3af" />
                      <span className="text-gray-500 text-xs">{label}</span>
                    </div>
                    <span className="text-gray-800 text-xs">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Conseils AliExpress */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <IconCheckCircle size={18} color="#1a2a4a" />
            <h2 className="font-bold text-[#1a2a4a] text-base">Conseils pour bien acheter sur AliExpress</h2>
          </div>
          <div className="space-y-4">
            {tips.map(({ Icon, title, desc }) => (
              <div key={title} className="flex gap-3">
                <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon size={16} color="#f2994a" />
                </div>
                <div>
                  <p className="font-semibold text-[#1a2a4a] text-sm">{title}</p>
                  <p className="text-gray-600 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scénarios */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <IconTarget size={18} color="#1a2a4a" />
            <h3 className="font-bold text-[#1a2a4a] text-base">AliExpress ou Alibaba — choix rapide</h3>
          </div>
          <div className="space-y-3">
            {[
              { scenario: "Tu débutes, tu veux tester 3 articles différents", answer: "AliExpress", why: "Petites quantités, protection acheteur, pas de négociation" },
              { scenario: "Tu veux commander 500 paires de chaussures pour ta boutique", answer: "Alibaba", why: "Grosses quantités, négociation directe avec le fabricant" },
              { scenario: "Tu veux un remboursement si le colis n'arrive pas", answer: "AliExpress", why: "Protection acheteur 60 jours facile à activer" },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-xl p-3 border border-orange-100">
                <p className="text-sm text-gray-700 mb-1.5"><strong>Situation :</strong> {s.scenario}</p>
                <div className="flex items-center gap-1.5">
                  <IconArrowRight size={14} color="#f2994a" />
                  <span className="text-[#f2994a] font-bold text-sm">{s.answer}</span>
                  <span className="text-gray-500 text-xs">— {s.why}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.button
          onClick={onStartQuiz}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-[#f2994a] to-[#f5af4d] text-white font-bold py-4 rounded-2xl text-base shadow-lg flex items-center justify-center gap-2"
        >
          <span>Passer le quiz du Module 2</span>
          <IconArrowRight size={18} color="white" />
        </motion.button>
      </div>
    </div>
  );
}
