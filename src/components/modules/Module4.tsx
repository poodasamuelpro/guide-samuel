'use client';

import { motion } from 'framer-motion';
import VideoPlayer from '@/components/VideoPlayer';
import { SortingGame } from '@/components/Simulators';

interface Props { onStartQuiz: () => void; onBack: () => void; }

export default function Module4({ onStartQuiz, onBack }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white px-4 pt-8 pb-14">
        <div className="max-w-lg mx-auto">
          <button onClick={onBack} className="text-purple-200 text-sm mb-4">&larr; Dashboard</button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">🏷️</div>
            <div>
              <p className="text-purple-200 text-xs">Module 4</p>
              <h1 className="font-bold text-xl">Quels produits importer</h1>
            </div>
          </div>
          <p className="text-purple-200 text-sm">Les 3 types de produits gagnants -- et les erreurs a eviter.</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-8 space-y-5">
        <VideoPlayer envKey="NEXT_PUBLIC_VIDEO_MODULE_4" title="Module 4 - resume video" />

        {/* 3 types gagnants */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-[#1a2a4a] mb-4">🏆 Les 3 types de produits gagnants</h2>
          <div className="space-y-4">
            {[
              {
                num: '1',
                title: "Produits non fabriques localement",
                color: 'bg-blue-500',
                desc: "Gadgets tech, accessoires informatiques -- tout ce qu'on ne trouve pas facilement au Burkina. Pas de concurrence locale = meilleur prix de vente.",
                examples: ["Souris et claviers gaming", "Supports de telephone", "Lampes LED speciales", "Accessoires de bureau"],
              },
              {
                num: '2',
                title: "Produits de qualite superieure",
                color: 'bg-purple-500',
                desc: "Evite les produits 'toc' qui cassent vite. Un client decu ne revient jamais. Mise sur la qualite pour fideliser.",
                examples: ["Commande des echantillons", "Lis les avis negatifs", "Prefere les vendeurs avec garantie", "Teste avant de revendre"],
              },
              {
                num: '3',
                title: "Produits autorises a l'importation",
                color: 'bg-orange-500',
                desc: "Certains produits sont reglementes ou interdits. Verifie toujours avant de commander.",
                examples: ["Evite les contrefacons", "Medicaments -> tres reglementes", "Armes -> interdites", "Cosmetiques -> verifier normes"],
              },
            ].map((t) => (
              <div key={t.num} className="border border-gray-100 rounded-xl overflow-hidden">
                <div className={`${t.color} text-white px-4 py-2 flex items-center gap-2`}>
                  <span className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center text-xs font-bold">{t.num}</span>
                  <h3 className="font-bold text-sm">{t.title}</h3>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-700 mb-3">{t.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {t.examples.map((e) => (
                      <span key={e} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{e}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* A eviter */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-red-50 border border-red-200 rounded-2xl p-5">
          <h2 className="font-bold text-[#1a2a4a] mb-4">🚫 Produits a eviter absolument</h2>
          <div className="space-y-3">
            {[
              { icon: '⛔', title: "Contrefacons", desc: "Saisie douaniere + poursuites penales. Jamais." },
              { icon: '🏗️', title: "Produits lourds/volumineux", desc: "Ciment, carrelage, metal => frais de transport prohibitifs. Marge nulle." },
              { icon: '🌾', title: "Produits fabriques localement", desc: "Sucre, huile, savon local => deja moins chers localement. Pas rentable." },
              { icon: '💊', title: "Medicaments sans autorisation", desc: "Reglementation tres stricte. Interdit sans licence pharmaceutique." },
              { icon: '🍏', title: "Aliments perissables", desc: "Delais de livraison trop longs depuis la Chine. Risque sanitaire." },
            ].map((t) => (
              <div key={t.title} className="flex gap-3">
                <span className="text-lg flex-shrink-0">{t.icon}</span>
                <div>
                  <p className="font-semibold text-red-700 text-sm">{t.title}</p>
                  <p className="text-gray-600 text-xs">{t.desc}</p>
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
          className="w-full bg-gradient-to-r from-[#f2994a] to-[#f5af4d] text-white font-bold py-4 rounded-2xl text-base shadow-lg"
        >
          Passer le quiz du Module 4 🎯
        </motion.button>
      </div>
    </div>
  );
}
