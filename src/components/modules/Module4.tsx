'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Tag, Trophy, Ban,
  CheckCircle, AlertTriangle, Info, Lightbulb,
  Package, Smartphone, Shirt, Wrench, Zap
} from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';
import { SortingGame } from '@/components/Simulators';

interface Props {
  onStartQuiz: () => void;
  onBack: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }),
};

export default function Module4({ onStartQuiz, onBack }: Props) {
  const [activeTab, setActiveTab] = useState<'content' | 'game'>('content');

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
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center shrink-0">
              <Tag size={22} className="text-purple-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#f2994a] uppercase tracking-widest">Module 04</p>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">Quels produits importer</h1>
            </div>
          </div>
          <div className="flex gap-2 mt-5">
            {(['content', 'game'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all min-h-0 ${
                  activeTab === tab ? 'bg-[#f2994a] text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {tab === 'content' ? 'Contenu' : 'Jeu de tri'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'content' ? (
          <motion.div initial="hidden" animate="visible" className="space-y-6">
            <VideoPlayer envKey="NEXT_PUBLIC_VIDEO_MODULE_4" />

            {/* Intro */}
            <motion.div variants={fadeUp} custom={0}>
              <div className="card p-6 shadow-sm">
                <h2 className="text-base font-bold text-[#1a2a4a] mb-3">La clé : choisir les bons produits</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Le choix des produits à importer est l&apos;étape la plus déterminante pour la 
                  rentabilité de votre activité. Un mauvais choix = transport élevé, concurrence 
                  locale forte, marges nulles. Un bon choix = forte demande, faible concurrence, 
                  bonne marge.
                </p>
              </div>
            </motion.div>

            {/* 3 winning categories */}
            <motion.div variants={fadeUp} custom={1}>
              <div className="card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy size={18} className="text-yellow-500" />
                  <h2 className="text-base font-bold text-[#1a2a4a]">Les 3 types de produits gagnants</h2>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      num: '01',
                      icon: Smartphone,
                      color: 'blue',
                      title: 'Produits non fabriqués localement',
                      desc: 'Accessoires tech, gadgets électroniques, articles de mode innovants… Ces produits n\'ont pas de concurrent local, ce qui vous donne une position unique sur le marché.',
                      examples: ['Écouteurs sans fil', 'Chargeurs rapides', 'Coques de téléphone', 'Gadgets de cuisine'],
                    },
                    {
                      num: '02',
                      icon: Package,
                      color: 'green',
                      title: 'Produits légers à forte valeur ajoutée',
                      desc: 'Le fret est calculé au poids/volume. Un produit léger mais avec une bonne marge de revente est idéal pour maximiser votre rentabilité.',
                      examples: ['Bijoux fantaisie', 'Produits cosmétiques', 'Articles de papeterie', 'Jouets éducatifs'],
                    },
                    {
                      num: '03',
                      icon: Shirt,
                      color: 'purple',
                      title: 'Produits à forte demande locale',
                      desc: 'Identifiez les besoins non satisfaits dans votre marché local. Quels produits cherchent vos proches et ne trouvent pas facilement ? C\'est votre opportunité.',
                      examples: ['Articles scolaires', 'Equipements sportifs', 'Décoration intérieure', 'Outillage léger'],
                    },
                  ].map(({ num, icon: Icon, color, title, desc, examples }) => (
                    <div key={num} className={`rounded-xl bg-${color}-50 border border-${color}-200 p-4`}>
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-8 h-8 rounded-lg bg-${color}-600 flex items-center justify-center shrink-0`}>
                          <span className="text-xs font-extrabold text-white">{num}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon size={16} className={`text-${color}-600`} />
                          <p className={`font-bold text-${color}-900 text-sm`}>{title}</p>
                        </div>
                      </div>
                      <p className={`text-xs text-${color}-800 leading-relaxed mb-3`}>{desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {examples.map((ex) => (
                          <span key={ex} className={`text-[10px] px-2 py-0.5 rounded-full bg-white border border-${color}-200 text-${color}-700 font-medium`}>
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Products to avoid / forbidden */}
            <motion.div variants={fadeUp} custom={2}>
              <div className="card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Ban size={18} className="text-red-500" />
                  <h2 className="text-base font-bold text-[#1a2a4a]">Produits à éviter absolument</h2>
                </div>
                <p className="text-gray-500 text-xs mb-4">
                  Basé sur la réglementation douanière du Burkina Faso et zone UEMOA/CEDEAO. 
                  Cette liste est non exhaustive — vérifiez toujours auprès des douanes officielles.
                </p>
                <div className="space-y-2">
                  {[
                    { icon: Ban, title: 'Contrefaçons de marques', desc: 'Risque de saisie douanière + poursuites pénales. Tolérance zéro.', level: 'danger' },
                    { icon: Ban, title: 'Armes, munitions et répliques', desc: 'Strictement interdites à l\'importation sans autorisation ministérielle.', level: 'danger' },
                    { icon: Ban, title: 'Médicaments sans autorisation', desc: 'Nécessite une licence pharmaceutique et l\'accord du Ministère de la Santé.', level: 'danger' },
                    { icon: Ban, title: 'Publications pornographiques', desc: 'Interdites à l\'importation au Burkina Faso.', level: 'danger' },
                    { icon: AlertTriangle, title: 'Alcools titrant > 45°', desc: 'Soumis à des restrictions strictes d\'importation.', level: 'warning' },
                    { icon: AlertTriangle, title: 'Produits alimentaires périssables', desc: 'Réglementations sanitaires strictes, contrôles phytosanitaires obligatoires.', level: 'warning' },
                    { icon: AlertTriangle, title: 'Produits lourds fabriqués localement', desc: 'Ciment, eau, savon local, sucre… La marge sera nulle à cause du poids/transport.', level: 'warning' },
                    { icon: Info, title: 'Batteries au lithium seules', desc: 'Interdites en fret aérien standard. Uniquement intégrées dans les appareils.', level: 'info' },
                  ].map(({ icon: Icon, title, desc, level }) => (
                    <div key={title} className={`flex items-start gap-3 p-3 rounded-xl border ${
                      level === 'danger' ? 'bg-red-50 border-red-200' :
                      level === 'warning' ? 'bg-orange-50 border-orange-200' :
                      'bg-blue-50 border-blue-200'
                    }`}>
                      <Icon size={14} className={`shrink-0 mt-0.5 ${
                        level === 'danger' ? 'text-red-500' :
                        level === 'warning' ? 'text-orange-500' :
                        'text-blue-500'
                      }`} />
                      <div>
                        <p className={`text-xs font-bold ${
                          level === 'danger' ? 'text-red-800' :
                          level === 'warning' ? 'text-orange-800' :
                          'text-blue-800'
                        }`}>{title}</p>
                        <p className={`text-[11px] mt-0.5 leading-relaxed ${
                          level === 'danger' ? 'text-red-700' :
                          level === 'warning' ? 'text-orange-700' :
                          'text-blue-700'
                        }`}>{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Tips */}
            <motion.div variants={fadeUp} custom={3}>
              <div className="tip-box">
                <div className="flex items-start gap-2">
                  <Lightbulb size={15} className="text-[#f2994a] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-[#1a2a4a] mb-1">Méthode de validation d&apos;un produit</p>
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li className="flex items-start gap-1.5"><CheckCircle size={10} className="text-green-600 shrink-0 mt-0.5" /><span>Posez la question : est-ce que mes proches cherchent ce produit ?</span></li>
                      <li className="flex items-start gap-1.5"><CheckCircle size={10} className="text-green-600 shrink-0 mt-0.5" /><span>Vérifiez si le produit est fabriqué ou vendu localement à un prix similaire</span></li>
                      <li className="flex items-start gap-1.5"><CheckCircle size={10} className="text-green-600 shrink-0 mt-0.5" /><span>Calculez votre marge : prix achat + fret + douane vs prix de vente possible</span></li>
                      <li className="flex items-start gap-1.5"><CheckCircle size={10} className="text-green-600 shrink-0 mt-0.5" /><span>Commandez 3-5 pièces test avant d&apos;investir dans un gros stock</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => setActiveTab('game')} className="btn-secondary flex-1">
                <Tag size={17} /> Jeu de tri &quot;Importer ou pas ?&quot;
              </button>
              <button onClick={onStartQuiz} className="btn-primary flex-1">
                Quiz du module <ArrowRight size={17} />
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
            <SortingGame />
            <div className="mt-6">
              <button onClick={onStartQuiz} className="btn-primary w-full">
                <Zap size={17} /> Passer le quiz officiel du module 4 <ArrowRight size={17} />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
