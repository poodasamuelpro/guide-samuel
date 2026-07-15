'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, TrendingUp, ShoppingCart, Store,
  Smartphone, MessageCircle, Users, Camera, Package, Truck,
  Star, BarChart, CheckCircle, AlertTriangle, Info, Lightbulb, Zap
} from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';
import { MarginSimulator } from '@/components/Simulators';

interface Props {
  onStartQuiz: () => void;
  onBack: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }),
};

export default function Module5({ onStartQuiz, onBack }: Props) {
  const [activeTab, setActiveTab] = useState<'content' | 'simulator'>('content');

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <div className="bg-[#1a2a4a] pt-6 pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-5 transition-colors min-h-0 p-0 bg-transparent border-none"
          >
            <ArrowLeft size={15} /> Retour
          </button>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center shrink-0">
              <TrendingUp size={22} className="text-red-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#f2994a] uppercase tracking-widest">Module 05</p>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">Comment vendre vos produits</h1>
            </div>
          </div>
          <div className="flex gap-2 mt-5">
            {(['content', 'simulator'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all min-h-0 ${
                  activeTab === tab ? 'bg-[#f2994a] text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {tab === 'content' ? 'Contenu' : 'Simulateur de marge'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'content' ? (
          <motion.div initial="hidden" animate="visible" className="space-y-6">
            <VideoPlayer envKey="NEXT_PUBLIC_VIDEO_MODULE_5" />

            {/* Intro */}
            <motion.div variants={fadeUp} custom={0}>
              <div className="card p-6 shadow-sm">
                <h2 className="text-base font-bold text-[#1a2a4a] mb-3">Grossiste ou Détaillant — Choisir sa stratégie</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Une fois vos produits reçus, vous avez deux grandes stratégies de vente : 
                  vendre en gros (grossiste) ou directement au consommateur final (détaillant). 
                  Chaque approche a ses avantages selon votre situation et votre stock.
                </p>
              </div>
            </motion.div>

            {/* Wholesale vs Retail */}
            <motion.div variants={fadeUp} custom={1}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="card p-5 border-2 border-blue-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Users size={18} className="text-blue-600" />
                    <p className="font-bold text-[#1a2a4a] text-sm">Grossiste</p>
                  </div>
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                    Vous vendez en volume à des détaillants qui revendent à leurs clients.
                  </p>
                  <div className="rounded-lg bg-blue-50 p-3 mb-3 text-xs">
                    <p className="font-bold text-blue-800 mb-1">Exemple concret :</p>
                    <p className="text-blue-700">Achat : 500 FCFA/pièce → Vente aux détaillants : 800 FCFA → Ils revendent à 1 200 FCFA</p>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    {[
                      ['check', 'Écoulement rapide des stocks'],
                      ['check', 'Moins de temps de vente'],
                      ['warn', 'Marge unitaire plus faible'],
                      ['warn', 'Dépendant de quelques gros clients'],
                    ].map(([type, text]) => (
                      <li key={text} className="flex items-start gap-2">
                        {type === 'check'
                          ? <CheckCircle size={11} className="text-green-600 shrink-0 mt-0.5" />
                          : <AlertTriangle size={11} className="text-orange-500 shrink-0 mt-0.5" />}
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card p-5 border-2 border-green-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Store size={18} className="text-green-600" />
                    <p className="font-bold text-[#1a2a4a] text-sm">Détaillant direct</p>
                  </div>
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                    Vous vendez directement au consommateur final, souvent via les réseaux sociaux.
                  </p>
                  <div className="rounded-lg bg-green-50 p-3 mb-3 text-xs">
                    <p className="font-bold text-green-800 mb-1">Exemple concret :</p>
                    <p className="text-green-700">Achat : 500 FCFA/pièce → Vente directe : 1 500 FCFA → Marge 3x supérieure au grossiste</p>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    {[
                      ['check', 'Marge maximale par produit'],
                      ['check', 'Relation directe avec les clients'],
                      ['warn', 'Plus de temps en vente/SAV'],
                      ['warn', 'Écoulement plus lent du stock'],
                    ].map(([type, text]) => (
                      <li key={text} className="flex items-start gap-2">
                        {type === 'check'
                          ? <CheckCircle size={11} className="text-green-600 shrink-0 mt-0.5" />
                          : <AlertTriangle size={11} className="text-orange-500 shrink-0 mt-0.5" />}
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Selling channels */}
            <motion.div variants={fadeUp} custom={2}>
              <div className="card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart size={18} className="text-[#f2994a]" />
                  <h2 className="text-base font-bold text-[#1a2a4a]">Les canaux de vente en Afrique de l&apos;Ouest (2025)</h2>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      icon: Smartphone,
                      name: 'Facebook Marketplace',
                      reach: 'Très forte',
                      cost: 'Gratuit',
                      bestFor: 'Tout type de produit, large audience',
                      color: 'blue',
                      recommended: true,
                    },
                    {
                      icon: MessageCircle,
                      name: 'WhatsApp Business',
                      reach: 'Forte (réseau personnel)',
                      cost: 'Gratuit',
                      bestFor: 'Vente via bouche-à-oreille, clients fidèles',
                      color: 'green',
                      recommended: true,
                    },
                    {
                      icon: ShoppingCart,
                      name: 'Jumia Burkina Faso',
                      reach: 'Modérée',
                      cost: 'Commission sur vente',
                      bestFor: 'Produits tech, mode — présence croissante',
                      color: 'orange',
                      recommended: false,
                    },
                    {
                      icon: Store,
                      name: 'Boutique physique / marché',
                      reach: 'Locale',
                      cost: 'Loyer ou emplacement',
                      bestFor: 'Produits qui nécessitent de voir/essayer',
                      color: 'gray',
                      recommended: false,
                    },
                    {
                      icon: Smartphone,
                      name: 'TikTok Shop / Instagram',
                      reach: 'Variable',
                      cost: 'Gratuit (temps de création)',
                      bestFor: 'Produits visuels, audience jeune',
                      color: 'purple',
                      recommended: false,
                    },
                  ].map(({ icon: Icon, name, reach, cost, bestFor, color, recommended }) => (
                    <div key={name} className={`flex items-start gap-3 p-3 rounded-xl border ${
                      recommended ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-100'
                    }`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-${color}-100`}>
                        <Icon size={15} className={`text-${color}-600`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-xs font-bold text-[#1a2a4a]">{name}</p>
                          {recommended && <span className="badge-green text-[10px]">Recommandé</span>}
                        </div>
                        <div className="flex gap-3 mt-1 flex-wrap">
                          <span className="text-[10px] text-gray-500">Portée : {reach}</span>
                          <span className="text-[10px] text-gray-500">Coût : {cost}</span>
                        </div>
                        <p className="text-[11px] text-gray-600 mt-0.5">{bestFor}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Tips for selling */}
            <motion.div variants={fadeUp} custom={3}>
              <div className="card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb size={18} className="text-[#f2994a]" />
                  <h2 className="text-base font-bold text-[#1a2a4a]">Les 6 clés pour vendre rapidement</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { icon: Camera, text: 'Photos de qualité : fond blanc ou neutre, plusieurs angles, produit en contexte' },
                    { icon: MessageCircle, text: 'Description honnête et complète : matière, dimensions, couleurs disponibles, délai de livraison' },
                    { icon: Package, text: 'Proposez la livraison locale : un gros différenciateur par rapport aux vendeurs sans livraison' },
                    { icon: Star, text: 'Demandez les avis clients : le bouche-à-oreille en ligne multiplie vos ventes gratuitement' },
                    { icon: TrendingUp, text: 'Analysez ce qui marche : quels produits se vendent le mieux ? Doublez la commande sur ces articles' },
                    { icon: Users, text: 'Créez un réseau de revendeurs : donnez une commission à des personnes qui vendent pour vous' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="w-7 h-7 rounded-lg bg-[#1a2a4a] flex items-center justify-center shrink-0">
                        <Icon size={13} className="text-[#f2994a]" />
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Pricing formula */}
            <motion.div variants={fadeUp} custom={4}>
              <div className="card p-6 shadow-sm border-2 border-[#f2994a]/30">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart size={18} className="text-[#f2994a]" />
                  <h2 className="text-base font-bold text-[#1a2a4a]">La formule de prix de vente</h2>
                </div>
                <div className="rounded-xl bg-[#1a2a4a] p-4 text-white text-center mb-4">
                  <p className="text-sm font-bold text-white/70 mb-2">Prix de vente recommandé</p>
                  <p className="text-base font-extrabold text-[#f2994a]">
                    (Prix achat + Frais transit + Taxes) × 2 à 3
                  </p>
                </div>
                <div className="text-xs text-gray-600 leading-relaxed">
                  <p className="mb-2"><strong>Exemple :</strong></p>
                  <ul className="space-y-1">
                    <li>• Achat sur AliExpress : 2 000 FCFA/pièce</li>
                    <li>• Fret aérien : 1 500 FCFA/pièce (estimatif)</li>
                    <li>• Douane : 0 FCFA (petite quantité)</li>
                    <li>• <strong>Prix de revient total : 3 500 FCFA</strong></li>
                    <li>• <strong>Prix de vente conseillé : 7 000 à 10 500 FCFA</strong></li>
                    <li>• <strong>Marge nette : 3 500 à 7 000 FCFA/pièce</strong></li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={5} className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => setActiveTab('simulator')} className="btn-secondary flex-1">
                <BarChart size={17} /> Simulateur de marge
              </button>
              <button onClick={onStartQuiz} className="btn-primary flex-1">
                Quiz du module 5 <ArrowRight size={17} />
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="mb-4">
              <button onClick={() => setActiveTab('content')} className="text-sm text-gray-500 hover:text-[#1a2a4a] flex items-center gap-1 min-h-0 p-0 bg-transparent border-none">
                <ArrowLeft size={13} /> Retour au contenu
              </button>
            </div>
            <MarginSimulator />
            <div className="mt-6">
              <button onClick={onStartQuiz} className="btn-primary w-full">
                <Zap size={17} /> Passer le quiz officiel du module 5 <ArrowRight size={17} />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
