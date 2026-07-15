'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, CreditCard, Mailbox, Calculator,
  CheckCircle, AlertTriangle, Info, Lightbulb, Target, Zap,
  Smartphone, Package, BadgeCheck, Star, Lock, ChevronDown
} from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';
import { BudgetSimulator } from '@/components/Simulators';

interface Props {
  onStartQuiz: () => void;
  onBack: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  }),
};

// Suitcase items for the animated checklist
const SUITCASE_ITEMS = [
  {
    id: 'carte',
    icon: CreditCard,
    emoji: '💳',
    label: 'Carte bancaire internationale',
    sublabel: 'VISA / Mastercard — UBA Africard ou Orange',
    color: 'blue',
    delay: 0,
  },
  {
    id: 'telephone',
    icon: Smartphone,
    emoji: '📱',
    label: 'Smartphone & connexion internet',
    sublabel: 'Pour naviguer sur AliExpress, gérer vos commandes',
    color: 'purple',
    delay: 0.4,
  },
  {
    id: 'boite',
    icon: Mailbox,
    emoji: '📦',
    label: 'Boîte postale La Poste',
    sublabel: 'Votre adresse de livraison en Afrique de l\'Ouest',
    color: 'green',
    delay: 0.8,
  },
];

function SuitcaseAnimation() {
  const [revealed, setRevealed] = useState<number>(0);
  const [completed, setCompleted] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const handleRevealNext = () => {
    if (revealed < SUITCASE_ITEMS.length) {
      setRevealed(prev => {
        const next = prev + 1;
        if (next === SUITCASE_ITEMS.length) setCompleted(true);
        return next;
      });
    }
  };

  const handleReset = () => {
    setRevealed(0);
    setCompleted(false);
  };

  return (
    <div ref={ref} className="card p-6 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 mb-2">
        <Target size={18} className="text-[#f2994a]" />
        <h2 className="text-base font-bold text-[#1a2a4a]">Ta valise d&apos;importateur</h2>
      </div>
      <p className="text-xs text-gray-500 mb-5">
        Clique sur chaque article pour l&apos;ajouter à ta valise — ces 3 éléments sont obligatoires avant ta première commande !
      </p>

      {/* Suitcase visual */}
      <div className="relative mb-6">
        {/* Suitcase body */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl border-4 border-[#1a2a4a] bg-[#1a2a4a] p-4 min-h-[140px] overflow-hidden"
        >
          {/* Suitcase handle */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full border-4 border-[#1a2a4a] bg-transparent" />

          {/* Fill indicator */}
          <motion.div
            className="absolute inset-0 bg-[#f2994a]/10 origin-bottom"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: revealed / SUITCASE_ITEMS.length }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          />

          {/* Items inside suitcase */}
          <div className="relative z-10 flex flex-wrap gap-3 justify-center items-center min-h-[100px]">
            <AnimatePresence>
              {SUITCASE_ITEMS.slice(0, revealed).map(({ id, emoji, label }) => (
                <motion.div
                  key={id}
                  initial={{ scale: 0, rotate: -15, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl shadow-lg">
                    {emoji}
                  </div>
                  <span className="text-[9px] text-white/80 font-medium text-center max-w-[60px] leading-tight">{label.split(' ')[0]}</span>
                </motion.div>
              ))}
            </AnimatePresence>

            {revealed === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white/40 text-sm text-center"
              >
                Valise vide — commence !
              </motion.p>
            )}
          </div>

          {/* Completion star */}
          <AnimatePresence>
            {completed && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                className="absolute top-2 right-2"
              >
                <div className="w-8 h-8 rounded-full bg-[#f2994a] flex items-center justify-center">
                  <BadgeCheck size={18} className="text-white" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-3">
          {SUITCASE_ITEMS.map((_, i) => (
            <motion.div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${i < revealed ? 'w-8 bg-[#f2994a]' : 'w-4 bg-gray-200'}`}
            />
          ))}
        </div>
      </div>

      {/* Clickable item cards */}
      <div className="space-y-3">
        {SUITCASE_ITEMS.map(({ id, icon: Icon, label, sublabel, color }, index) => {
          const isRevealed = index < revealed;
          const isNext = index === revealed;
          return (
            <motion.button
              key={id}
              onClick={isNext ? handleRevealNext : undefined}
              disabled={!isNext && !isRevealed}
              whileHover={isNext ? { scale: 1.02 } : {}}
              whileTap={isNext ? { scale: 0.98 } : {}}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                isRevealed
                  ? 'border-green-200 bg-green-50 cursor-default'
                  : isNext
                  ? 'border-[#f2994a] bg-[#fef3e8] cursor-pointer hover:shadow-md'
                  : 'border-gray-100 bg-gray-50 opacity-40 cursor-not-allowed'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                isRevealed ? 'bg-green-100' : isNext ? 'bg-[#f2994a]/20' : 'bg-gray-100'
              }`}>
                {isRevealed
                  ? <CheckCircle size={20} className="text-green-600" />
                  : isNext
                  ? <Icon size={20} className="text-[#f2994a]" />
                  : <Lock size={20} className="text-gray-400" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold ${isRevealed ? 'text-green-800' : 'text-[#1a2a4a]'}`}>{label}</p>
                <p className={`text-xs mt-0.5 ${isRevealed ? 'text-green-600' : 'text-gray-500'}`}>{sublabel}</p>
              </div>
              {isNext && (
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="shrink-0"
                >
                  <ChevronDown size={18} className="text-[#f2994a] rotate-[-90deg]" />
                </motion.div>
              )}
              {isRevealed && (
                <Star size={16} className="text-[#f2994a] shrink-0" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Completion message */}
      <AnimatePresence>
        {completed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-4 p-4 rounded-xl bg-green-50 border border-green-200 text-center"
          >
            <p className="text-sm font-bold text-green-800">Valise complète ! Tu es prêt(e) à importer</p>
            <p className="text-xs text-green-600 mt-1">Tu connais maintenant les 3 indispensables</p>
            <button
              onClick={handleReset}
              className="mt-3 text-xs text-green-700 underline hover:no-underline"
            >
              Recommencer l&apos;animation
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Section with scroll-triggered animation
function ScrollSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
    >
      {children}
    </motion.div>
  );
}

export default function Module1({ onStartQuiz, onBack }: Props) {
  const [activeTab, setActiveTab] = useState<'content' | 'simulator'>('content');

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      {/* Module header */}
      <div className="bg-[#1a2a4a] pt-6 pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm mb-5 transition-colors min-h-0 p-0 bg-transparent border-none"
            aria-label="Retour au dashboard"
          >
            <ArrowLeft size={15} /> Retour
          </button>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center shrink-0">
              <CreditCard size={22} className="text-blue-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#f2994a] uppercase tracking-widest">Module 01</p>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                Les indispensables pour importer
              </h1>
            </div>
          </motion.div>
          {/* Tabs */}
          <div className="flex gap-2 mt-5">
            {(['content', 'simulator'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all min-h-0 ${
                  activeTab === tab
                    ? 'bg-[#f2994a] text-white'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
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
          <div className="space-y-6">

            {/* Video */}
            <ScrollSection>
              <VideoPlayer envKey="NEXT_PUBLIC_VIDEO_MODULE_1" />
            </ScrollSection>

            {/* SUITCASE ANIMATION — star of module 1 */}
            <ScrollSection delay={0.1}>
              <SuitcaseAnimation />
            </ScrollSection>

            {/* Section 1: Carte bancaire */}
            <ScrollSection delay={0.05}>
              <div className="card p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center"
                  >
                    <CreditCard size={20} className="text-blue-600" />
                  </motion.div>
                  <div>
                    <h2 className="text-base font-bold text-[#1a2a4a]">1. La carte bancaire internationale</h2>
                    <p className="text-xs text-gray-500">Indispensable pour payer sur AliExpress / Alibaba</p>
                  </div>
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
                    <div className="mt-2 text-[10px] text-gray-400 italic flex items-center gap-1">
                      <AlertTriangle size={10} className="text-orange-400 shrink-0" />
                      Tarifs indicatifs — vérifiez auprès de votre agence UBA la plus proche.
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
            </ScrollSection>

            {/* Section 2: Boîte postale */}
            <ScrollSection delay={0.05}>
              <div className="card p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    whileHover={{ rotate: -10, scale: 1.1 }}
                    className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center"
                  >
                    <Mailbox size={20} className="text-green-600" />
                  </motion.div>
                  <div>
                    <h2 className="text-base font-bold text-[#1a2a4a]">2. La boîte postale</h2>
                    <p className="text-xs text-gray-500">Votre adresse fixe pour recevoir vos colis</p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  La boîte postale est indispensable car la plupart des livreurs internationaux 
                  ne font pas de livraison à domicile en Afrique de l&apos;Ouest. Elle vous donne 
                  une adresse fixe et sécurisée pour recevoir vos colis.
                </p>

                {/* Steps */}
                <div className="space-y-3 mb-4">
                  {[
                    { step: '1', text: 'Rendez-vous à un bureau de La Poste du Burkina Faso à Ouagadougou' },
                    { step: '2', text: 'Présentez votre pièce d\'identité (CNI ou passeport) et choisissez votre numéro de boîte' },
                    { step: '3', text: 'Payez l\'abonnement annuel (~15 000 FCFA/an — à vérifier sur laposte.bf)' },
                    { step: '4', text: 'Utilisez l\'adresse : La Poste Ouagadougou + N° de votre boîte + code postal 01 BP XXXX' },
                  ].map(({ step, text }) => (
                    <div key={step} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#1a2a4a] flex items-center justify-center shrink-0 text-xs font-extrabold text-[#f2994a]">
                        {step}
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed pt-1">{text}</p>
                    </div>
                  ))}
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
            </ScrollSection>

            {/* Section 3: Budget animé */}
            <ScrollSection delay={0.05}>
              <div className="card p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center"
                  >
                    <Calculator size={20} className="text-orange-500" />
                  </motion.div>
                  <div>
                    <h2 className="text-base font-bold text-[#1a2a4a]">3. Budget de départ minimal</h2>
                    <p className="text-xs text-gray-500">Ce qu&apos;il faut prévoir pour commencer</p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Voici une estimation du budget minimal pour démarrer votre activité d&apos;importation :
                </p>

                <BudgetTable />

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
            </ScrollSection>

            {/* Tips box */}
            <ScrollSection delay={0.05}>
              <div className="tip-box">
                <div className="flex items-start gap-2">
                  <Lightbulb size={15} className="text-[#f2994a] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-[#1a2a4a] mb-2">Les erreurs à éviter au démarrage</p>
                    <ul className="space-y-1.5 text-xs text-gray-700">
                      {[
                        'Ne pas commander trop en première commande — commencez par 3 à 10 pièces pour tester',
                        'Ne pas utiliser votre carte principale — utilisez une carte dédiée à rechargement',
                        'Toujours vérifier les délais de livraison avant de promettre des produits à vos clients',
                        'Conserver tous vos reçus de commande et numéros de suivi',
                      ].map((tip, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle size={10} className="text-green-600 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollSection>

            {/* CTA */}
            <ScrollSection delay={0.05}>
              <div className="flex flex-col sm:flex-row gap-3">
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
              </div>
            </ScrollSection>
          </div>
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

function BudgetTable() {
  const rows = [
    { item: 'Carte VISA UBA prépayée', cost: '~10 000', note: 'Frais fixes d\'acquisition' },
    { item: 'Boîte postale La Poste (1 an)', cost: '~15 000', note: 'Abonnement annuel' },
    { item: 'Frais de timbre', cost: '~200', note: 'Symboliques' },
    { item: 'Première commande test', cost: 'à partir de 5 000', note: 'À adapter selon le produit' },
  ];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="rounded-xl overflow-hidden border border-gray-100">
      <table className="w-full text-sm" role="table">
        <thead>
          <tr className="bg-[#1a2a4a] text-white">
            <th className="text-left px-4 py-2.5 text-xs font-semibold">Élément</th>
            <th className="text-right px-4 py-2.5 text-xs font-semibold">Coût (FCFA)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map(({ item, cost }, index) => (
            <motion.tr
              key={item}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.12, duration: 0.4 }}
              className="hover:bg-gray-50"
            >
              <td className="px-4 py-2.5 text-gray-700 text-xs">{item}</td>
              <td className="px-4 py-2.5 text-right font-bold text-[#1a2a4a] text-xs">{cost}</td>
            </motion.tr>
          ))}
          <motion.tr
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="bg-[#fef3e8]"
          >
            <td className="px-4 py-2.5 font-bold text-[#1a2a4a] text-xs">Total minimal</td>
            <td className="px-4 py-2.5 text-right font-extrabold text-[#f2994a] text-sm">~30 200 FCFA</td>
          </motion.tr>
        </tbody>
      </table>
    </div>
  );
}
