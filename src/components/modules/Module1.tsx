'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, CreditCard, Mailbox, Calculator,
  CheckCircle, AlertTriangle, Info, Lightbulb, Target, Zap
} from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';
import { BudgetSimulator } from '@/components/Simulators';

interface Props {
  onStartQuiz: () => void;
  onBack: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }),
};

export default function Module1({ onStartQuiz, onBack }: Props) {
  const [activeTab, setActiveTab] = useState<'content' | 'simulator'>('content');

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      {/* Module header */}
      <div className="bg-[#1a2a4a] pt-6 pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-5 transition-colors min-h-0 p-0 bg-transparent border-none"
            aria-label="Retour au dashboard"
          >
            <ArrowLeft size={15} /> Retour
          </button>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center shrink-0">
              <CreditCard size={22} className="text-blue-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#f2994a] uppercase tracking-widest">Module 01</p>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                Les indispensables pour importer
              </h1>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex gap-2 mt-5">
            {(['content', 'simulator'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all min-h-0 ${
                  activeTab === tab
                    ? 'bg-[#f2994a] text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {tab === 'content' ? 'Contenu' : 'Simulateur'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'content' ? (
          <motion.div initial="hidden" animate="visible" className="space-y-6">

            {/* Video */}
            <VideoPlayer envKey="NEXT_PUBLIC_VIDEO_MODULE_1" />

            {/* Intro */}
            <motion.div variants={fadeUp} custom={0}>
              <div className="card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Target size={18} className="text-blue-500" />
                  <h2 className="text-base font-bold text-[#1a2a4a]">Ce que vous allez apprendre</h2>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Avant de passer votre première commande sur AliExpress, trois éléments sont 
                  absolument indispensables : une <strong>carte bancaire internationale</strong>, 
                  une <strong>boîte postale</strong> pour recevoir vos colis, et un <strong>budget 
                  de départ</strong> réaliste. Ce module vous guide pas à pas.
                </p>
              </div>
            </motion.div>

            {/* Section 1: Carte bancaire */}
            <motion.div variants={fadeUp} custom={1}>
              <div className="card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                    <CreditCard size={18} className="text-blue-600" />
                  </div>
                  <h2 className="text-base font-bold text-[#1a2a4a]">1. La carte bancaire internationale</h2>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Pour acheter sur AliExpress ou Alibaba, vous avez besoin d&apos;une <strong>carte VISA 
                  ou Mastercard</strong> acceptée pour les paiements en ligne internationaux. Voici les 
                  solutions disponibles au Burkina Faso :
                </p>

                <div className="space-y-3">
                  {/* UBA Africard */}
                  <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="font-bold text-[#1a2a4a] text-sm">Carte VISA Prépayée UBA (Africard)</p>
                      <span className="badge-green shrink-0">Recommandée</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle size={12} className="text-green-600 shrink-0 mt-0.5" />
                        <span>Coût d&apos;acquisition : <strong>environ 10 000 FCFA</strong> (frais de souscription ~3 500 FCFA min. ou 2,5% + personnalisation)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={12} className="text-green-600 shrink-0 mt-0.5" />
                        <span>Rechargeable via agences UBA ou Orange Money</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={12} className="text-green-600 shrink-0 mt-0.5" />
                        <span>Plafond : jusqu&apos;à 2 000 000 FCFA / mois</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={12} className="text-green-600 shrink-0 mt-0.5" />
                        <span>Frais de gestion mensuels : ~500 FCFA</span>
                      </li>
                    </ul>
                    <div className="mt-2 text-[10px] text-gray-400 italic">
                      ⚠️ Tarifs indicatifs — vérifiez auprès de votre agence UBA la plus proche.
                    </div>
                  </div>

                  {/* VISA Orange Money */}
                  <div className="rounded-xl bg-orange-50 border border-orange-100 p-4">
                    <p className="font-bold text-[#1a2a4a] text-sm mb-2">Carte VISA Orange Money</p>
                    <ul className="space-y-1.5 text-xs text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle size={12} className="text-green-600 shrink-0 mt-0.5" />
                        <span>Liée directement à votre compte Orange Money</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={12} className="text-green-600 shrink-0 mt-0.5" />
                        <span>Pratique si vous utilisez déjà Orange Money activement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle size={12} className="text-orange-500 shrink-0 mt-0.5" />
                        <span>Disponibilité et conditions : à vérifier auprès d&apos;Orange Burkina Faso</span>
                      </li>
                    </ul>
                  </div>

                  {/* Ecobank */}
                  <div className="rounded-xl bg-green-50 border border-green-100 p-4">
                    <p className="font-bold text-[#1a2a4a] text-sm mb-2">Ecobank CashXpress / Carte prépayée</p>
                    <ul className="space-y-1.5 text-xs text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle size={12} className="text-green-600 shrink-0 mt-0.5" />
                        <span>Alternative viable disponible dans les agences Ecobank</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Info size={12} className="text-blue-500 shrink-0 mt-0.5" />
                        <span>Consultez votre agence Ecobank pour les tarifs exacts et conditions actuelles</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="tip-box mt-4">
                  <div className="flex items-start gap-2">
                    <Lightbulb size={15} className="text-[#f2994a] shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-700 leading-relaxed">
                      <strong>Conseil :</strong> Pour votre premier achat, rechargez uniquement le montant 
                      de votre commande + 10% de marge. Évitez de garder un solde élevé inutilement.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Section 2: Boîte postale */}
            <motion.div variants={fadeUp} custom={2}>
              <div className="card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
                    <Mailbox size={18} className="text-green-600" />
                  </div>
                  <h2 className="text-base font-bold text-[#1a2a4a]">2. La boîte postale — votre adresse de livraison</h2>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  La boîte postale est indispensable car la plupart des livreurs internationaux 
                  ne font pas de livraison à domicile en Afrique de l&apos;Ouest. Elle vous donne 
                  une adresse fixe et sécurisée pour recevoir vos colis.
                </p>

                <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 mb-4">
                  <p className="font-bold text-[#1a2a4a] text-sm mb-3">La Poste du Burkina Faso</p>
                  <ul className="space-y-2 text-xs text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={12} className="text-green-600 shrink-0 mt-0.5" />
                      <span>Abonnement annuel : <strong>environ 15 000 FCFA/an</strong> (particuliers) — à vérifier sur <a href="https://laposte.bf" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">laposte.bf</a></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={12} className="text-green-600 shrink-0 mt-0.5" />
                      <span>Disponible dans les bureaux de La Poste à Ouagadougou et autres villes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={12} className="text-green-600 shrink-0 mt-0.5" />
                      <span>Pièce d&apos;identité requise à l&apos;ouverture</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Info size={12} className="text-blue-500 shrink-0 mt-0.5" />
                      <span>Frais de timbre annuels : ~200 FCFA (symboliques)</span>
                    </li>
                  </ul>
                </div>

                <div className="info-box">
                  <div className="flex items-start gap-2">
                    <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-800 leading-relaxed">
                      <strong>Comment ça marche :</strong> Quand vous commandez sur AliExpress, 
                      vous entrez l&apos;adresse de La Poste + votre numéro de boîte. Quand le colis arrive, 
                      La Poste vous informe (par SMS ou avis de passage) et vous venez le retirer.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Section 3: Budget */}
            <motion.div variants={fadeUp} custom={3}>
              <div className="card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
                    <Calculator size={18} className="text-orange-500" />
                  </div>
                  <h2 className="text-base font-bold text-[#1a2a4a]">3. Budget de départ minimal</h2>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Voici une estimation du budget minimal pour démarrer votre activité d&apos;importation :
                </p>

                <div className="rounded-xl overflow-hidden border border-gray-100">
                  <table className="w-full text-sm" role="table">
                    <thead>
                      <tr className="bg-[#1a2a4a] text-white">
                        <th className="text-left px-4 py-2.5 text-xs font-semibold">Élément</th>
                        <th className="text-right px-4 py-2.5 text-xs font-semibold">Coût (FCFA)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        ['Carte VISA UBA prépayée', '~10 000'],
                        ['Boîte postale La Poste (1 an)', '~15 000'],
                        ['Frais de timbre', '~200'],
                        ['Première commande test', 'à partir de 5 000'],
                      ].map(([item, cost]) => (
                        <tr key={item} className="hover:bg-gray-50">
                          <td className="px-4 py-2.5 text-gray-700 text-xs">{item}</td>
                          <td className="px-4 py-2.5 text-right font-bold text-[#1a2a4a] text-xs">{cost}</td>
                        </tr>
                      ))}
                      <tr className="bg-[#fef3e8]">
                        <td className="px-4 py-2.5 font-bold text-[#1a2a4a] text-xs">Total minimal</td>
                        <td className="px-4 py-2.5 text-right font-extrabold text-[#f2994a] text-sm">~30 200 FCFA</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="warning-box mt-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={14} className="text-orange-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-orange-800 leading-relaxed">
                      Ces montants sont des estimations basées sur les tarifs publics disponibles. 
                      Les frais peuvent varier selon les banques et La Poste. Vérifiez toujours 
                      les tarifs actuels directement auprès des prestataires.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} custom={4} className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setActiveTab('simulator')}
                className="btn-secondary flex-1"
              >
                <Calculator size={17} />
                Simulateur de budget
              </button>
              <button onClick={onStartQuiz} className="btn-primary flex-1">
                Passer le quiz du module
                <ArrowRight size={17} />
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-4 flex items-center gap-2">
              <button
                onClick={() => setActiveTab('content')}
                className="text-sm text-gray-500 hover:text-[#1a2a4a] flex items-center gap-1 min-h-0 p-0 bg-transparent border-none transition-colors"
              >
                <ArrowLeft size={13} /> Retour au contenu
              </button>
            </div>
            <BudgetSimulator />
            <div className="mt-6">
              <button onClick={onStartQuiz} className="btn-primary w-full">
                <Zap size={17} />
                Passer le quiz du module 1
                <ArrowRight size={17} />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
