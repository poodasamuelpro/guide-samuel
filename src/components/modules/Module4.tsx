'use client';

import { motion } from 'framer-motion';
import VideoPlayer from '@/components/VideoPlayer';
import { SortingGame } from '@/components/Simulators';
import {
  IconTag,
  IconTrophy,
  IconBan,
  IconWeight,
  IconLeaf,
  IconPill,
  IconApple,
  IconFuel,
  IconArrowRight,
} from '@/components/Icons';

interface Props { onStartQuiz: () => void; onBack: () => void; }

export default function Module4({ onStartQuiz, onBack }: Props) {
  const avoidItems = [
    { Icon: IconBan, title: 'Contrefaçons', desc: 'Saisie douanière + poursuites pénales. Jamais.' },
    { Icon: IconWeight, title: 'Produits lourds / volumineux', desc: 'Ciment, carrelage, métal => frais de transport prohibitifs. Marge nulle.' },
    { Icon: IconLeaf, title: 'Produits fabriqués localement', desc: 'Sucre, huile, savon local => déjà moins chers localement. Pas rentable.' },
    { Icon: IconPill, title: 'Médicaments sans autorisation', desc: 'Réglementation très stricte. Interdit sans licence pharmaceutique.' },
    { Icon: IconApple, title: 'Aliments périssables', desc: 'Délais de livraison trop longs depuis la Chine. Risque sanitaire.' },
    { Icon: IconFuel, title: 'Carburant / produits dangereux', desc: 'Produit réglementé — interdit à l\'importation privée.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white px-4 pt-8 pb-14">
        <div className="max-w-lg mx-auto">
          <button onClick={onBack} className="text-purple-200 text-sm mb-4 hover:text-white transition-colors">&larr; Dashboard</button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <IconTag size={24} color="white" />
            </div>
            <div>
              <p className="text-purple-200 text-xs font-medium">Module 4</p>
              <h1 className="font-bold text-xl text-white">Quels produits importer</h1>
            </div>
          </div>
          <p className="text-purple-100 text-sm">Les 3 types de produits gagnants — et les erreurs à éviter.</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-8 space-y-5">
        <VideoPlayer envKey="NEXT_PUBLIC_VIDEO_MODULE_4" title="Module 4 — résumé vidéo" />

        {/* 3 types gagnants */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <IconTrophy size={18} color="#1a2a4a" />
            <h2 className="font-bold text-[#1a2a4a] text-base">Les 3 types de produits gagnants</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                num: '1',
                title: 'Produits non fabriqués localement',
                color: 'bg-blue-500',
                desc: "Gadgets tech, accessoires informatiques — tout ce qu'on ne trouve pas facilement au Burkina. Pas de concurrence locale = meilleur prix de vente.",
                examples: ['Souris et claviers gaming', 'Supports de téléphone', 'Lampes LED spéciales', 'Accessoires de bureau'],
              },
              {
                num: '2',
                title: 'Produits de qualité supérieure',
                color: 'bg-purple-500',
                desc: "Évite les produits 'toc' qui cassent vite. Un client déçu ne revient jamais. Mise sur la qualité pour fidéliser.",
                examples: ["Commande des échantillons", "Lis les avis négatifs", "Préfère les vendeurs avec garantie", "Teste avant de revendre"],
              },
              {
                num: '3',
                title: "Produits autorisés à l'importation",
                color: 'bg-orange-500',
                desc: "Certains produits sont réglementés ou interdits. Vérifie toujours avant de commander.",
                examples: ["Évite les contrefaçons", "Médicaments → très réglementés", "Armes → interdites", "Cosmétiques → vérifier normes"],
              },
            ].map((t) => (
              <div key={t.num} className="border border-gray-100 rounded-xl overflow-hidden">
                <div className={`${t.color} text-white px-4 py-2.5 flex items-center gap-2`}>
                  <span className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center text-xs font-bold">{t.num}</span>
                  <h3 className="font-bold text-sm">{t.title}</h3>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-700 mb-3">{t.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {t.examples.map((e) => (
                      <span key={e} className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full">{e}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* À éviter */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-red-50 border border-red-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <IconBan size={18} color="#dc2626" />
            <h2 className="font-bold text-[#1a2a4a] text-base">Produits à éviter absolument</h2>
          </div>
          <div className="space-y-3">
            {avoidItems.map(({ Icon, title, desc }) => (
              <div key={title} className="flex gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon size={16} color="#dc2626" />
                </div>
                <div>
                  <p className="font-semibold text-red-700 text-sm">{title}</p>
                  <p className="text-gray-600 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Jeu de tri */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <SortingGame />
        </motion.div>

        <motion.button
          onClick={onStartQuiz}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-[#f2994a] to-[#f5af4d] text-white font-bold py-4 rounded-2xl text-base shadow-lg flex items-center justify-center gap-2"
        >
          <span>Passer le quiz du Module 4</span>
          <IconArrowRight size={18} color="white" />
        </motion.button>
      </div>
    </div>
  );
}
