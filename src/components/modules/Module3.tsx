'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Package, Plane, Ship, Clock,
  Shield, CheckCircle, AlertTriangle, Info, Calculator,
  MapPin, TrendingDown, FileText, Zap, ChevronRight
} from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';
import { TaxSimulator, LitigeTimeline, CBMCalculator } from '@/components/Simulators';
import { DualIllustration } from '@/components/IllustrationBanner';

interface Props {
  onStartQuiz: () => void;
  onBack: () => void;
}

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

// ─── SHIPMENT ANIMATED TIMELINE ───────────────────────────────────────────────
const ROUTE_STEPS = [
  { id: 'factory', label: 'Usine Chine', sublabel: 'Guangzhou / Shenzhen', emoji: '🏭' },
  { id: 'transit', label: 'En transit', sublabel: 'Aérien 5-10j / Maritime 30-60j', emoji: '🌊' },
  { id: 'port', label: 'Port Abidjan', sublabel: 'Ou Lomé / Cotonou', emoji: '⚓' },
  { id: 'road', label: 'Route terrestre', sublabel: 'Vers Ouagadougou', emoji: '🚚' },
  { id: 'customs', label: 'Douane', sublabel: 'Contrôle & taxes', emoji: '📋' },
  { id: 'poste', label: 'La Poste BF', sublabel: 'Votre boîte postale', emoji: '📦' },
];

function ShipmentTimeline() {
  const [mode, setMode] = useState<'air' | 'sea'>('air');
  const [activeStep, setActiveStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAnimation = () => {
    setActiveStep(0);
    setPlaying(true);
    let step = 0;
    intervalRef.current = setInterval(() => {
      step += 1;
      setActiveStep(step);
      if (step >= ROUTE_STEPS.length - 1) {
        clearInterval(intervalRef.current!);
        setPlaying(false);
      }
    }, 800);
  };

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActiveStep(0);
    setPlaying(false);
  };

  const airInfo = { days: '5 à 10 jours', cost: '9 000–13 000 FCFA/kg', color: 'blue', icon: Plane };
  const seaInfo = { days: '45 à 90 jours', cost: 'Moins cher/CBM', color: 'green', icon: Ship };
  const info = mode === 'air' ? airInfo : seaInfo;
  const ModeIcon = info.icon;

  return (
    <div ref={ref} className="card p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <Plane size={18} className="text-[#f6932a]" />
        <h2 className="text-base font-bold text-[#1e3a5f]">Itinéraire de ta marchandise</h2>
      </div>
      <p className="text-xs text-gray-500 mb-5">
        Lance l&apos;animation pour voir le trajet de ta commande depuis la Chine jusqu&apos;au Burkina Faso
      </p>

      {/* Mode toggle */}
      <div className="flex gap-2 mb-5">
        {(['air', 'sea'] as const).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); reset(); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
              mode === m
                ? m === 'air' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-green-600 border-green-600 text-white'
                : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            {m === 'air' ? <Plane size={15} /> : <Ship size={15} />}
            {m === 'air' ? 'Fret aérien' : 'Fret maritime'}
          </button>
        ))}
      </div>

      {/* Route visualization */}
      <div className="relative mb-5">
        {/* Progress bar */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-gray-100 rounded-full mx-6">
          <motion.div
            className={`h-full rounded-full ${mode === 'air' ? 'bg-blue-500' : 'bg-green-500'}`}
            initial={{ width: '0%' }}
            animate={{ width: `${(activeStep / (ROUTE_STEPS.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Moving vehicle */}
        <AnimatePresence>
          {playing && (
            <motion.div
              className="absolute top-2 z-10"
              initial={{ left: '4%' }}
              animate={{ left: `${(activeStep / (ROUTE_STEPS.length - 1)) * 88 + 4}%` }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${mode === 'air' ? 'bg-blue-500' : 'bg-green-500'} shadow-lg`}>
                <ModeIcon size={14} className="text-white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step dots */}
        <div className="flex justify-between pt-8 px-2">
          {ROUTE_STEPS.map(({ id, label, sublabel, emoji }, i) => {
            const done = i <= activeStep;
            return (
              <div key={id} className="flex flex-col items-center gap-1 flex-1">
                <motion.div
                  animate={{
                    scale: i === activeStep && playing ? [1, 1.3, 1] : 1,
                    backgroundColor: done ? (mode === 'air' ? '#3b82f6' : '#16a34a') : '#e5e7eb',
                  }}
                  transition={{ duration: 0.5 }}
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {done && <CheckCircle size={12} className="text-white" />}
                </motion.div>
                <span className="text-[9px] text-center text-gray-600 leading-tight hidden sm:block">{label}</span>
                <span className="text-lg">{emoji}</span>
                <span className="text-[8px] text-center text-gray-400 leading-tight hidden sm:block">{sublabel}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info banner */}
      <motion.div
        animate={{ opacity: 1 }}
        className={`flex items-center gap-3 p-3 rounded-xl mb-4 ${mode === 'air' ? 'bg-blue-50 border border-blue-200' : 'bg-green-50 border border-green-200'}`}
      >
        <ModeIcon size={20} className={mode === 'air' ? 'text-blue-600' : 'text-green-600'} />
        <div>
          <p className={`text-xs font-bold ${mode === 'air' ? 'text-blue-900' : 'text-green-900'}`}>
            Durée estimée : {info.days}
          </p>
          <p className={`text-[11px] ${mode === 'air' ? 'text-blue-700' : 'text-green-700'}`}>
            Coût estimatif : {info.cost}
          </p>
        </div>
      </motion.div>

      {/* Play button */}
      <button
        onClick={playing ? reset : startAnimation}
        className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
          playing
            ? 'bg-red-100 text-red-600 hover:bg-red-200'
            : mode === 'air'
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-green-600 text-white hover:bg-green-700'
        }`}
      >
        {playing ? (
          <>Arrêter</>
        ) : (
          <><ModeIcon size={16} /> Animer le trajet {mode === 'air' ? 'aérien' : 'maritime'}</>
        )}
      </button>
    </div>
  );
}

// ─── ANIMATED DELIVERY TABLE ───────────────────────────────────────────────────
function DeliveryTable() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const rows = [
    { mode: 'DHL / FedEx / EMS Express', delay: '7 à 15 jours', cost: 'Élevé (15–30 $/kg)', icon: Plane, recommended: false, color: 'blue' },
    { mode: 'AliExpress Standard Shipping', delay: '20 à 45 jours', cost: 'Gratuit ou très faible', icon: Package, recommended: true, color: 'green' },
    { mode: 'ePacket (selon disponibilité)', delay: '15 à 30 jours', cost: 'Faible (1–5 $)', icon: Package, recommended: false, color: 'orange' },
    { mode: 'China Post', delay: '30 à 60 jours', cost: 'Très faible ou gratuit', icon: Package, recommended: false, color: 'gray' },
  ];
  return (
    <div ref={ref} className="space-y-3">
      {rows.map(({ mode, delay, cost, icon: Icon, recommended }, i) => (
        <motion.div
          key={mode}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          whileHover={{ x: 4 }}
          className={`flex items-start gap-3 p-4 rounded-xl border cursor-default ${
            recommended ? 'border-green-200 bg-green-50' : 'border-gray-100 bg-gray-50'
          }`}
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${recommended ? 'bg-green-200' : 'bg-gray-200'}`}>
            <Icon size={15} className={recommended ? 'text-green-700' : 'text-gray-600'} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-bold text-[#1e3a5f]">{mode}</p>
              {recommended && <span className="badge-green text-[10px]">Conseillé débutant</span>}
            </div>
            <div className="flex gap-4 mt-1 flex-wrap">
              <span className="text-[11px] text-gray-500 flex items-center gap-1"><Clock size={10} />{delay}</span>
              <span className="text-[11px] text-gray-500 flex items-center gap-1"><TrendingDown size={10} />{cost}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Module3({ onStartQuiz, onBack }: Props) {
  const [activeTab, setActiveTab] = useState<'content' | 'tax' | 'cbm' | 'litige'>('content');

  const tabs = [
    { id: 'content' as const, label: 'Contenu' },
    { id: 'tax' as const, label: 'Simulateur taxes' },
    { id: 'cbm' as const, label: 'Calculateur CBM' },
    { id: 'litige' as const, label: 'Chronologie litige' },
  ];

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <div className="bg-[#1e3a5f] pt-6 pb-8">
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
            <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center shrink-0">
              <Package size={22} className="text-green-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#f6932a] uppercase tracking-widest">Module 03</p>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">Délais, transit et douane</h1>
            </div>
          </motion.div>
          <div className="flex gap-2 mt-5 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all min-h-0 ${
                  activeTab === tab.id ? 'bg-[#f6932a] text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'content' ? (
          <div className="space-y-6">
            <ScrollSection>
              <VideoPlayer envKey="NEXT_PUBLIC_VIDEO_MODULE_3" />
            </ScrollSection>

            {/* Illustrations réelles — avion + bateau */}
            <ScrollSection delay={0.02}>
              <DualIllustration left="mod3_air" right="mod3_sea" />
            </ScrollSection>

            {/* ANIMATED TIMELINE — star */}
            <ScrollSection delay={0.05}>
              <ShipmentTimeline />
            </ScrollSection>

            {/* Delivery modes */}
            <ScrollSection delay={0.05}>
              <div className="card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={18} className="text-green-600" />
                  <h2 className="text-base font-bold text-[#1e3a5f]">Modes de livraison depuis la Chine</h2>
                </div>
                <DeliveryTable />
              </div>
            </ScrollSection>

            {/* Air vs Sea */}
            <ScrollSection delay={0.05}>
              <div className="card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Plane size={18} className="text-[#f6932a]" />
                  <h2 className="text-base font-bold text-[#1e3a5f]">Transitaire — Pour les grosses commandes</h2>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Pour les gros volumes (plusieurs kg à des centaines de kg), passer par 
                  un <strong>transitaire local</strong> est souvent plus économique. Il gère 
                  l&apos;acheminement complet depuis la Chine jusqu&apos;à Ouagadougou.
                </p>

                {/* Route */}
                <div className="rounded-xl bg-[#fef3e8] border border-[#f6932a]/30 p-4 mb-5">
                  <p className="text-xs font-bold text-[#1e3a5f] mb-2 flex items-center gap-1.5">
                    <MapPin size={13} className="text-[#f6932a]" /> Route typique : Chine → Burkina Faso
                  </p>
                  <div className="flex items-center gap-2 flex-wrap text-xs text-gray-600">
                    {['Guangzhou / Shenzhen', '→', 'Port Abidjan ou Lomé', '→', 'Ouagadougou (route)'].map((step, i) => (
                      <span key={i} className={step === '→' ? 'text-[#f6932a] font-bold' : 'bg-white rounded-lg px-2 py-1 border border-gray-100'}>
                        {step}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Plane size={16} className="text-blue-600" />
                      <p className="font-bold text-blue-900 text-sm">Fret Aérien</p>
                    </div>
                    <ul className="space-y-1.5 text-xs text-gray-700">
                      <li className="flex items-start gap-1.5"><CheckCircle size={11} className="text-blue-500 shrink-0 mt-0.5" /><span>Délai : <strong>5 à 10 jours</strong></span></li>
                      <li className="flex items-start gap-1.5"><CheckCircle size={11} className="text-blue-500 shrink-0 mt-0.5" /><span>Facturé au <strong>poids (kg)</strong></span></li>
                      <li className="flex items-start gap-1.5"><AlertTriangle size={11} className="text-orange-500 shrink-0 mt-0.5" /><span>~9 000 à 13 000 FCFA/kg*</span></li>
                      <li className="flex items-start gap-1.5"><CheckCircle size={11} className="text-blue-500 shrink-0 mt-0.5" /><span>Idéal petits colis haute valeur</span></li>
                    </ul>
                  </div>
                  <div className="rounded-xl bg-green-50 border border-green-200 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Ship size={16} className="text-green-600" />
                      <p className="font-bold text-green-900 text-sm">Fret Maritime / Groupage</p>
                    </div>
                    <ul className="space-y-1.5 text-xs text-gray-700">
                      <li className="flex items-start gap-1.5"><CheckCircle size={11} className="text-green-500 shrink-0 mt-0.5" /><span>Délai : <strong>45 à 90 jours</strong></span></li>
                      <li className="flex items-start gap-1.5"><CheckCircle size={11} className="text-green-500 shrink-0 mt-0.5" /><span>Facturé au <strong>volume (CBM)</strong></span></li>
                      <li className="flex items-start gap-1.5"><CheckCircle size={11} className="text-green-500 shrink-0 mt-0.5" /><span>Nettement plus économique gros volumes</span></li>
                      <li className="flex items-start gap-1.5"><Info size={11} className="text-blue-500 shrink-0 mt-0.5" /><span>Idéal marchandises lourdes / volumineuses</span></li>
                    </ul>
                  </div>
                </div>

                <div className="warning-box">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={14} className="text-orange-500 shrink-0 mt-0.5" />
                    <div className="text-xs text-orange-800 leading-relaxed">
                      <p className="font-bold mb-1">Interdictions en fret aérien</p>
                      <p>Les colis contenant <strong>batteries au lithium</strong>, <strong>liquides</strong>, <strong>huiles</strong> ou <strong>poudres</strong> sont interdits ou fortement restreints. Vérifiez toujours avec votre transitaire.</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollSection>

            {/* CBM Explain */}
            <ScrollSection delay={0.05}>
              <div className="card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Calculator size={18} className="text-purple-600" />
                  <h2 className="text-base font-bold text-[#1e3a5f]">Le CBM — Volume facturable en fret maritime</h2>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  En fret maritime, on facture au <strong>CBM (Cubic Meter)</strong> — le volume occupé par votre colis en m³.
                </p>

                <div className="rounded-xl bg-purple-50 border border-purple-200 p-4 mb-4">
                  <p className="text-sm font-bold text-purple-900 mb-3">Formule :</p>
                  <motion.div
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="text-center py-3"
                  >
                    <p className="text-base font-extrabold text-purple-700">
                      CBM = Longueur × Largeur × Hauteur (en mètres)
                    </p>
                  </motion.div>
                  <p className="text-xs text-purple-700 text-center mt-2">
                    Exemple : 0.5m × 0.4m × 0.3m = <strong>0.06 CBM</strong>
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('cbm')}
                  className="btn-secondary w-full flex items-center justify-center gap-2"
                >
                  <Calculator size={17} />
                  Ouvrir le calculateur CBM interactif
                  <ChevronRight size={15} />
                </button>
              </div>
            </ScrollSection>

            {/* Customs */}
            <ScrollSection delay={0.05}>
              <div className="card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <FileText size={18} className="text-[#1e3a5f]" />
                  <h2 className="text-base font-bold text-[#1e3a5f]">Douane et taxes — Zone UEMOA</h2>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Les marchandises importées sont soumises au tarif extérieur commun (TEC) de la CEDEAO.
                </p>
                <div className="space-y-2 mb-4">
                  {[
                    { cat: 'Biens essentiels (médicaments, équipements agricoles)', rate: '0%', color: 'green' },
                    { cat: 'Matières premières, biens d\'équipement', rate: '5%', color: 'blue' },
                    { cat: 'Produits intermédiaires', rate: '10%', color: 'orange' },
                    { cat: 'Produits de consommation courante', rate: '20%', color: 'red' },
                  ].map(({ cat, rate, color }, i) => (
                    <motion.div
                      key={cat}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100"
                    >
                      <p className="text-xs text-gray-700 flex-1">{cat}</p>
                      <span className={`badge-${color === 'green' ? 'green' : color === 'blue' ? 'navy' : 'orange'} shrink-0 ml-2 font-bold`}>
                        {rate}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div className="info-box">
                  <div className="flex items-start gap-2">
                    <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-800 leading-relaxed">
                      <strong>En pratique pour les petits colis :</strong> Les colis personnels de faible valeur 
                      sont souvent laissés sans taxation. Mais pour des envois importants, 
                      contactez la douane du Burkina ou votre transitaire.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollSection>

            <ScrollSection delay={0.05}>
              <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                <button onClick={() => setActiveTab('tax')} className="btn-secondary flex-1">
                  <FileText size={17} /> Simulateur taxes
                </button>
                <button onClick={() => setActiveTab('cbm')} className="btn-secondary flex-1">
                  <Calculator size={17} /> Calculateur CBM
                </button>
                <button onClick={onStartQuiz} className="btn-primary flex-1">
                  Quiz du module <ArrowRight size={17} />
                </button>
              </div>
            </ScrollSection>
          </div>
        ) : activeTab === 'tax' ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="mb-4">
              <button onClick={() => setActiveTab('content')} className="text-sm text-gray-500 hover:text-[#1e3a5f] flex items-center gap-1 min-h-0 p-0 bg-transparent border-none">
                <ArrowLeft size={13} /> Retour au contenu
              </button>
            </div>
            <TaxSimulator />
            <div className="mt-6">
              <button onClick={onStartQuiz} className="btn-primary w-full">
                <Zap size={17} /> Passer le quiz officiel du module 3 <ArrowRight size={17} />
              </button>
            </div>
          </motion.div>
        ) : activeTab === 'cbm' ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="mb-4">
              <button onClick={() => setActiveTab('content')} className="text-sm text-gray-500 hover:text-[#1e3a5f] flex items-center gap-1 min-h-0 p-0 bg-transparent border-none">
                <ArrowLeft size={13} /> Retour au contenu
              </button>
            </div>
            <CBMCalculator />
            <div className="mt-6">
              <button onClick={onStartQuiz} className="btn-primary w-full">
                <Zap size={17} /> Passer le quiz officiel du module 3 <ArrowRight size={17} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="mb-4">
              <button onClick={() => setActiveTab('content')} className="text-sm text-gray-500 hover:text-[#1e3a5f] flex items-center gap-1 min-h-0 p-0 bg-transparent border-none">
                <ArrowLeft size={13} /> Retour au contenu
              </button>
            </div>
            <LitigeTimeline />
            <div className="mt-6">
              <button onClick={onStartQuiz} className="btn-primary w-full">
                <Zap size={17} /> Passer le quiz officiel du module 3 <ArrowRight size={17} />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
