'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, ShoppingCart, Building2, Users,
  Package, Truck, Shield, Star, Camera, MessageCircle,
  CheckCircle, AlertTriangle, Info, Lightbulb, Zap,
  RefreshCw, ChevronLeft, ChevronRight
} from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';
import { AlibabaAliexpressQuiz } from '@/components/Simulators';

interface Props {
  onStartQuiz: () => void;
  onBack: () => void;
}

// ScrollSection helper
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

// ─── FLIP CARD ────────────────────────────────────────────────────────────────
const PLATFORMS = [
  {
    id: 'aliexpress',
    name: 'AliExpress',
    subtitle: 'Pour les débutants',
    color: 'orange',
    bgClass: 'bg-orange-500',
    borderClass: 'border-orange-300',
    lightBg: 'bg-orange-50',
    icon: ShoppingCart,
    badge: 'Idéal pour débuter',
    badgeClass: 'bg-green-100 text-green-800',
    pros: [
      'Commandes à l\'unité (1 pièce minimum)',
      'Protection acheteur 60 jours intégrée',
      'Livraison gérée par le vendeur',
      'Remboursement facilité en cas de problème',
      'Interface en français disponible',
    ],
    cons: [
      'Prix légèrement plus élevé qu\'Alibaba',
      'Moins de personnalisation produit',
    ],
    frontEmoji: '🛒',
    ideal: 'Débutants · Petites quantités · Tests produit',
    backColor: 'bg-orange-500',
  },
  {
    id: 'alibaba',
    name: 'Alibaba',
    subtitle: 'Pour les grossistes',
    color: 'blue',
    bgClass: 'bg-blue-600',
    borderClass: 'border-blue-300',
    lightBg: 'bg-blue-50',
    icon: Building2,
    badge: 'Pour volumes élevés',
    badgeClass: 'bg-blue-100 text-blue-800',
    pros: [
      'Prix de gros nettement inférieurs',
      'Fabricants directs — produits personnalisables',
      'Étiquetage, emballage sur mesure (OEM)',
      'Idéal pour grosses commandes (CBM)',
    ],
    cons: [
      'Minimum de commande (MOQ) 50-500 pièces',
      'Transport à gérer soi-même (transitaire)',
      'Plus risqué sans expérience',
    ],
    frontEmoji: '🏭',
    ideal: 'Grossistes · Gros volumes · Entrepreneurs expérimentés',
    backColor: 'bg-blue-600',
  },
];

function VersusFlipCards() {
  const [flipped, setFlipped] = useState<string | null>(null);
  const [vsMode, setVsMode] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="card p-6 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-base font-bold text-[#1a2a4a]">AliExpress vs Alibaba — Le duel</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setVsMode(!vsMode)}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-[#1a2a4a] text-[#1a2a4a] hover:bg-[#1a2a4a] hover:text-white transition-all"
        >
          <RefreshCw size={12} />
          {vsMode ? 'Vue cartes' : 'Vue comparaison'}
        </motion.button>
      </div>
      <p className="text-xs text-gray-500 mb-5">
        Clique sur chaque carte pour la retourner et découvrir les détails
      </p>

      <AnimatePresence mode="wait">
        {!vsMode ? (
          /* FLIP CARDS MODE */
          <motion.div
            key="cards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {PLATFORMS.map(({ id, name, subtitle, icon: Icon, frontEmoji, pros, cons, badge, badgeClass, lightBg, ideal, backColor }, idx) => {
              const isFlipped = flipped === id;
              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                  className="cursor-pointer"
                  style={{ perspective: 1000 }}
                  onClick={() => setFlipped(isFlipped ? null : id)}
                >
                  <motion.div
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    className="relative h-64"
                  >
                    {/* FRONT */}
                    <div
                      className={`absolute inset-0 rounded-2xl ${backColor} flex flex-col items-center justify-center p-5 text-white`}
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="text-5xl mb-3">{frontEmoji}</div>
                      <p className="text-xl font-extrabold mb-1">{name}</p>
                      <p className="text-xs text-white/80 mb-4">{subtitle}</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${badgeClass}`}>{badge}</span>
                      <p className="text-[10px] text-white/60 mt-4 flex items-center gap-1">
                        <ChevronRight size={10} /> Clique pour voir les détails
                      </p>
                    </div>

                    {/* BACK */}
                    <div
                      className={`absolute inset-0 rounded-2xl ${lightBg} border-2 border-gray-200 p-4 overflow-y-auto`}
                      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Icon size={16} className="text-gray-700" />
                        <p className="font-bold text-[#1a2a4a] text-sm">{name}</p>
                      </div>
                      <div className="space-y-1.5 mb-3">
                        {pros.map((p, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <CheckCircle size={10} className="text-green-600 shrink-0 mt-0.5" />
                            <span className="text-[11px] text-gray-700">{p}</span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-1.5 mb-3">
                        {cons.map((c, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <AlertTriangle size={10} className="text-orange-500 shrink-0 mt-0.5" />
                            <span className="text-[11px] text-gray-700">{c}</span>
                          </div>
                        ))}
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-gray-100 mt-auto">
                        <p className="text-[10px] font-bold text-gray-600 mb-0.5">Idéal pour :</p>
                        <p className="text-[10px] text-gray-500">{ideal}</p>
                      </div>
                      <p className="text-[9px] text-gray-400 text-center mt-2 flex items-center justify-center gap-1">
                        <ChevronLeft size={9} /> Cliquer pour retourner
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          /* VERSUS TABLE MODE */
          <motion.div
            key="versus"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="rounded-xl overflow-hidden border border-gray-100">
              <div className="grid grid-cols-3 bg-[#1a2a4a]">
                <div className="px-3 py-2 text-xs font-bold text-white/70">Critère</div>
                <div className="px-3 py-2 text-xs font-bold text-orange-300 text-center">🛒 AliExpress</div>
                <div className="px-3 py-2 text-xs font-bold text-blue-300 text-center">🏭 Alibaba</div>
              </div>
              {[
                { crit: 'Quantité min.', ali: '1 pièce', alib: '50 à 500 pièces' },
                { crit: 'Prix unitaire', ali: 'Détail (+ élevé)', alib: 'Gros (− élevé)' },
                { crit: 'Protection', ali: '60 jours intégrée', alib: 'À négocier' },
                { crit: 'Livraison', ali: 'Gérée vendeur', alib: 'Transitaire requis' },
                { crit: 'Langue', ali: 'FR/EN', alib: 'EN principalement' },
                { crit: 'Personnalisation', ali: 'Limitée', alib: 'OEM complet' },
                { crit: 'Niveau requis', ali: 'Débutant', alib: 'Intermédiaire+' },
              ].map(({ crit, ali, alib }, i) => (
                <motion.div
                  key={crit}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-100`}
                >
                  <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">{crit}</div>
                  <div className="px-3 py-2.5 text-xs text-center text-gray-700">{ali}</div>
                  <div className="px-3 py-2.5 text-xs text-center text-gray-700">{alib}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Module2({ onStartQuiz, onBack }: Props) {
  const [activeTab, setActiveTab] = useState<'content' | 'simulator'>('content');

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <div className="bg-[#1a2a4a] pt-6 pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm mb-5 transition-colors min-h-0 p-0 bg-transparent border-none"
          >
            <ArrowLeft size={15} /> Retour
          </button>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center shrink-0">
              <ShoppingCart size={22} className="text-orange-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#f2994a] uppercase tracking-widest">Module 02</p>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">Sur quels sites acheter</h1>
            </div>
          </motion.div>
          <div className="flex gap-2 mt-5">
            {(['content', 'simulator'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all min-h-0 ${
                  activeTab === tab ? 'bg-[#f2994a] text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'
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
          <div className="space-y-6">

            <ScrollSection>
              <VideoPlayer envKey="NEXT_PUBLIC_VIDEO_MODULE_2" />
            </ScrollSection>

            {/* VERSUS FLIP CARDS — animation phare */}
            <ScrollSection delay={0.05}>
              <VersusFlipCards />
            </ScrollSection>

            {/* AliExpress protection */}
            <ScrollSection delay={0.05}>
              <div className="card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <motion.div whileHover={{ scale: 1.15, rotate: 5 }}>
                    <Shield size={18} className="text-blue-600" />
                  </motion.div>
                  <h2 className="text-base font-bold text-[#1a2a4a]">Protection Acheteur AliExpress (2025)</h2>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  La protection acheteur est l&apos;un des grands avantages d&apos;AliExpress. 
                  Voici comment elle fonctionne en pratique :
                </p>

                {/* Timeline steps */}
                <div className="space-y-3 mb-4">
                  {[
                    { step: 1, icon: ShoppingCart, title: 'Commande passée', text: 'La protection démarre dès le paiement validé', color: 'blue' },
                    { step: 2, icon: Truck, title: '60 à 75 jours de couverture', text: 'Délai à compter de l\'expédition — selon la commande', color: 'green' },
                    { step: 3, icon: Package, title: 'Réception du colis', text: 'Inspectez avant de confirmer ! Après confirmation, 15 jours pour ouvrir un litige', color: 'orange' },
                    { step: 4, icon: CheckCircle, title: 'Remboursement rapide', text: '1 à 10 jours ouvrés selon le mode de paiement', color: 'green' },
                  ].map(({ step, icon: Icon, title, text, color }, i) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className={`w-8 h-8 rounded-full bg-${color}-100 flex items-center justify-center shrink-0 border-2 border-${color}-300`}>
                        <Icon size={14} className={`text-${color}-600`} />
                      </div>
                      <div className="flex-1 pb-3 border-b border-gray-100 last:border-0">
                        <p className="text-xs font-bold text-[#1a2a4a]">{title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="warning-box">
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
            </ScrollSection>

            {/* Buying tips */}
            <ScrollSection delay={0.05}>
              <div className="card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb size={18} className="text-[#f2994a]" />
                  <h2 className="text-base font-bold text-[#1a2a4a]">6 conseils pour bien acheter sur AliExpress</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { icon: Star, title: 'Vendeurs notés 4,5/5 min', desc: 'Minimum 100 commandes passées, étoiles vérifiées' },
                    { icon: Camera, title: 'Avis avec photos', desc: 'Les avis avec photos de vrais clients sont les plus fiables' },
                    { icon: MessageCircle, title: 'Contactez avant d\'acheter', desc: 'Demandez des photos réelles, confirmez les spécifications' },
                    { icon: Package, title: 'Commandez un échantillon', desc: 'Testez avec 1-3 pièces avant une grosse commande' },
                    { icon: Truck, title: 'AliExpress Standard Shipping', desc: 'Meilleur rapport qualité/délai pour le Burkina Faso' },
                    { icon: Users, title: 'Boutiques officielles', desc: 'Préférez les boutiques officielles aux vendeurs particuliers' },
                  ].map(({ icon: Icon, title, desc }) => (
                    <motion.div
                      key={title}
                      whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
                      transition={{ duration: 0.2 }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#1a2a4a] flex items-center justify-center shrink-0">
                        <Icon size={13} className="text-[#f2994a]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#1a2a4a]">{title}</p>
                        <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollSection>

            {/* Récapitulatif */}
            <ScrollSection delay={0.05}>
              <div className="rounded-xl bg-[#1a2a4a] p-5 text-white">
                <p className="text-xs font-bold text-[#f2994a] uppercase tracking-widest mb-3">Récapitulatif</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/10 p-3">
                    <p className="text-sm font-bold text-white mb-1">Tu débutes ? → AliExpress</p>
                    <p className="text-xs text-white/70">Commande à l&apos;unité, protection intégrée, livraison simple</p>
                  </div>
                  <div className="rounded-xl bg-white/10 p-3">
                    <p className="text-sm font-bold text-white mb-1">Tu grossis ? → Alibaba</p>
                    <p className="text-xs text-white/70">Gros volumes, prix bas, personnalisation produit</p>
                  </div>
                </div>
                <div className="mt-3 flex items-start gap-2">
                  <Info size={13} className="text-[#f2994a] shrink-0 mt-0.5" />
                  <p className="text-xs text-white/70">Les deux plateformes appartiennent au groupe Alibaba. Commencez toujours par AliExpress pour vous faire la main.</p>
                </div>
              </div>
            </ScrollSection>

            <ScrollSection delay={0.05}>
              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => setActiveTab('simulator')} className="btn-secondary flex-1">
                  <ShoppingCart size={17} /> Quiz mise en situation
                </button>
                <button onClick={onStartQuiz} className="btn-primary flex-1">
                  Passer le quiz officiel <ArrowRight size={17} />
                </button>
              </div>
            </ScrollSection>
          </div>
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
