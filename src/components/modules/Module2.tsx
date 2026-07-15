'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, ShoppingCart, Building2, Users,
  Package, Truck, Shield, Star, Camera, MessageCircle,
  CheckCircle, AlertTriangle, Info, Lightbulb, Zap
} from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';
import { AlibabaAliexpressQuiz } from '@/components/Simulators';

interface Props {
  onStartQuiz: () => void;
  onBack: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }),
};

export default function Module2({ onStartQuiz, onBack }: Props) {
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
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center shrink-0">
              <ShoppingCart size={22} className="text-orange-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#f2994a] uppercase tracking-widest">Module 02</p>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">Sur quels sites acheter</h1>
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
                {tab === 'content' ? 'Contenu' : 'Quiz mise en situation'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'content' ? (
          <motion.div initial="hidden" animate="visible" className="space-y-6">

            <VideoPlayer envKey="NEXT_PUBLIC_VIDEO_MODULE_2" />

            {/* Intro comparison */}
            <motion.div variants={fadeUp} custom={0}>
              <div className="card p-6 shadow-sm">
                <h2 className="text-base font-bold text-[#1a2a4a] mb-3">AliExpress ou Alibaba ? Comprendre la différence</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Ces deux plateformes appartiennent au groupe Alibaba, mais s&apos;adressent à des profils 
                  très différents. Le choix de la bonne plateforme est crucial pour démarrer dans les 
                  meilleures conditions.
                </p>
              </div>
            </motion.div>

            {/* Comparison cards */}
            <motion.div variants={fadeUp} custom={1}>
              <div className="grid sm:grid-cols-2 gap-4">
                {/* AliExpress */}
                <div className="card p-5 border-2 border-orange-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                      <ShoppingCart size={18} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="font-extrabold text-[#1a2a4a] text-sm">AliExpress</p>
                      <span className="badge-green text-[10px]">Idéal pour débuter</span>
                    </div>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-600">
                    {[
                      'Commandes à l\'unité (1 pièce minimum)',
                      'Protection acheteur intégrée (60 jours)',
                      'Livraison gérée par le vendeur',
                      'Prix légèrement plus élevé qu\'Alibaba',
                      'Pas de négociation nécessaire',
                      'Remboursement facilité en cas de problème',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle size={11} className="text-green-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 p-3 bg-orange-50 rounded-xl">
                    <p className="text-[11px] font-bold text-orange-700">Idéal pour :</p>
                    <p className="text-[11px] text-orange-600 mt-0.5">Débutants · Petites quantités · Tests produit · Budgets limités</p>
                  </div>
                </div>

                {/* Alibaba */}
                <div className="card p-5 border-2 border-blue-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Building2 size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-extrabold text-[#1a2a4a] text-sm">Alibaba</p>
                      <span className="badge-navy text-[10px]">Pour les grossistes</span>
                    </div>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-600">
                    {[
                      'Minimum de commande (MOQ) souvent 50-500 pièces',
                      'Prix de gros nettement plus bas',
                      'Fabricants directs — produits personnalisables',
                      'Transport à gérer soi-même (transitaire)',
                      'Négociation prix, délais, emballage',
                      'Plus risqué sans expérience',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Info size={11} className="text-blue-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 p-3 bg-blue-50 rounded-xl">
                    <p className="text-[11px] font-bold text-blue-700">Idéal pour :</p>
                    <p className="text-[11px] text-blue-600 mt-0.5">Grossistes · Gros volumes · Entrepreneurs expérimentés</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AliExpress protection */}
            <motion.div variants={fadeUp} custom={2}>
              <div className="card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Shield size={18} className="text-blue-600" />
                  <h2 className="text-base font-bold text-[#1a2a4a]">Protection Acheteur AliExpress (2025)</h2>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  La protection acheteur est l&apos;un des grands avantages d&apos;AliExpress. 
                  Voici comment elle fonctionne en pratique :
                </p>
                <div className="space-y-3">
                  {[
                    { color: 'green', icon: CheckCircle, text: 'Durée de protection : 60 à 75 jours à compter de l\'expédition (varie selon la commande)', iconClass: 'text-green-600' },
                    { color: 'green', icon: CheckCircle, text: 'Après confirmation de réception : 15 jours pour ouvrir un litige (délai strict)', iconClass: 'text-green-600' },
                    { color: 'orange', icon: AlertTriangle, text: 'Remboursement sous 1 à 10 jours ouvrés selon le mode de paiement', iconClass: 'text-orange-500' },
                    { color: 'blue', icon: Info, text: 'Vous pouvez prolonger la protection acheteur depuis votre commande si la livraison approche', iconClass: 'text-blue-500' },
                  ].map(({ color, icon: Icon, text, iconClass }) => (
                    <div key={text} className={`flex items-start gap-2.5 p-3 rounded-xl bg-${color}-50 border border-${color}-100`}>
                      <Icon size={13} className={`${iconClass} shrink-0 mt-0.5`} />
                      <p className="text-xs text-gray-700 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
                <div className="warning-box mt-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={14} className="text-orange-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-orange-800 leading-relaxed">
                      <strong>Important :</strong> Ne confirmez jamais la réception d&apos;un colis 
                      que vous n&apos;avez pas encore reçu ou inspecté ! Une fois confirmé, la protection 
                      du vendeur s&apos;active et votre fenêtre de litige est limitée à 15 jours.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tips for buying well */}
            <motion.div variants={fadeUp} custom={3}>
              <div className="card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb size={18} className="text-[#f2994a]" />
                  <h2 className="text-base font-bold text-[#1a2a4a]">Conseils pour bien acheter sur AliExpress</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { icon: Star, title: 'Choisissez des vendeurs notés', desc: 'Minimum 4,5/5 étoiles, plus de 100 commandes passées' },
                    { icon: Camera, title: 'Lisez les avis avec photos', desc: 'Les avis avec photos de vrais clients sont les plus fiables' },
                    { icon: MessageCircle, title: 'Contactez le vendeur avant', desc: 'Demandez des photos réelles, confirmez les spécifications' },
                    { icon: Package, title: 'Commandez un échantillon', desc: 'Testez avec 1-3 pièces avant de faire une grosse commande' },
                    { icon: Truck, title: 'Comparez les modes de livraison', desc: 'AliExpress Standard Shipping est souvent le meilleur rapport qualité/délai' },
                    { icon: Users, title: 'Vérifiez le type de vendeur', desc: 'Préférez les boutiques officielles aux vendeurs particuliers' },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="w-7 h-7 rounded-lg bg-[#1a2a4a] flex items-center justify-center shrink-0">
                        <Icon size={13} className="text-[#f2994a]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#1a2a4a]">{title}</p>
                        <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => setActiveTab('simulator')} className="btn-secondary flex-1">
                <ShoppingCart size={17} /> Quiz mise en situation
              </button>
              <button onClick={onStartQuiz} className="btn-primary flex-1">
                Passer le quiz officiel <ArrowRight size={17} />
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
            <AlibabaAliexpressQuiz />
            <div className="mt-6">
              <button onClick={onStartQuiz} className="btn-primary w-full">
                <Zap size={17} /> Passer le quiz officiel du module 2 <ArrowRight size={17} />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
