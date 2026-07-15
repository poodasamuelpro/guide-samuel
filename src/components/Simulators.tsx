'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator, CheckCircle, AlertTriangle, Info, RefreshCw,
  TrendingUp, Package, Clock, ShoppingCart, Building2,
  Check, RotateCcw, ArrowRight, Tag, Ship, Plane
} from 'lucide-react';

/* ─────────────────────────────────────────────────────── */
/*  1. BUDGET SIMULATOR (Module 1)                         */
/* ─────────────────────────────────────────────────────── */
export function BudgetSimulator() {
  const [card, setCard] = useState<'uba' | 'orange' | 'ecobank'>('uba');
  const [includePoBox, setIncludePoBox] = useState(true);
  const [firstOrder, setFirstOrder] = useState(15000);

  const cardCosts = {
    uba: { name: 'Carte VISA UBA (Africard)', acquisition: 10000, monthly: 500 },
    orange: { name: 'Carte VISA Orange Money', acquisition: 6000, monthly: 300 },
    ecobank: { name: 'Carte Ecobank prépayée', acquisition: 8000, monthly: 400 },
  };

  const poBoxCost = includePoBox ? 15200 : 0;
  const selectedCard = cardCosts[card];
  const total = selectedCard.acquisition + poBoxCost + Math.max(0, firstOrder);

  return (
    <div className="card p-6 shadow-md">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
          <Calculator size={18} className="text-blue-600" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#1e3a5f]">Simulateur de budget de départ</h3>
          <p className="text-[11px] text-gray-500">Estimez votre investissement initial</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Card choice */}
        <div>
          <label className="block text-xs font-semibold text-[#1e3a5f] mb-2">Votre carte bancaire</label>
          <div className="space-y-2">
            {Object.entries(cardCosts).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setCard(key as typeof card)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border-2 text-left transition-all min-h-0 ${
                  card === key
                    ? 'border-[#f6932a] bg-[#fef3e8]'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <span className="text-xs font-medium text-gray-700">{val.name}</span>
                <div className="flex items-center gap-2 text-right">
                  <span className="text-xs font-bold text-[#1e3a5f]">{val.acquisition.toLocaleString()} FCFA</span>
                  {card === key && <Check size={13} className="text-[#f6932a]" />}
                </div>
              </button>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-1 italic">* Tarifs indicatifs — vérifiez auprès de votre banque</p>
        </div>

        {/* PO Box */}
        <div>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-xs font-semibold text-[#1e3a5f]">Boîte postale La Poste</p>
              <p className="text-[11px] text-gray-500">~15 000 FCFA/an + 200 FCFA timbre</p>
            </div>
            <div
              onClick={() => setIncludePoBox(!includePoBox)}
              className={`w-11 h-6 rounded-full relative transition-colors cursor-pointer ${includePoBox ? 'bg-[#f6932a]' : 'bg-gray-200'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${includePoBox ? 'translate-x-5.5 left-0.5' : 'left-0.5'}`} />
            </div>
          </label>
        </div>

        {/* First order */}
        <div>
          <label className="block text-xs font-semibold text-[#1e3a5f] mb-2">
            Montant de votre première commande test
          </label>
          <input
            type="number"
            value={firstOrder}
            onChange={(e) => setFirstOrder(Math.max(0, parseInt(e.target.value) || 0))}
            min={0}
            step={1000}
            className="sim-input"
            aria-label="Montant première commande en FCFA"
          />
          <p className="text-[10px] text-gray-400 mt-1">Conseil : commencer avec 5 000 à 20 000 FCFA pour un test</p>
        </div>
      </div>

      {/* Result */}
      <div className="mt-5 rounded-xl bg-[#1e3a5f] p-4">
        <p className="text-xs text-white/85 mb-2">Budget total estimé</p>
        <p className="text-3xl font-extrabold text-[#f6932a]">{total.toLocaleString()} FCFA</p>
        <div className="mt-3 space-y-1.5 text-xs text-white/70">
          <div className="flex justify-between">
            <span>Carte bancaire</span>
            <span className="font-semibold">{cardCosts[card].acquisition.toLocaleString()} FCFA</span>
          </div>
          {includePoBox && (
            <div className="flex justify-between">
              <span>Boîte postale</span>
              <span className="font-semibold">15 200 FCFA</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Première commande</span>
            <span className="font-semibold">{firstOrder.toLocaleString()} FCFA</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────── */
/*  2. ALIEXPRESS VS ALIBABA QUIZ (Module 2)               */
/* ─────────────────────────────────────────────────────── */
const SCENARIOS = [
  {
    id: 1,
    scenario: 'Tu veux tester 3 paires de chaussures pour voir si elles se vendent',
    correct: 'aliexpress',
    explanation: 'AliExpress permet les petites quantités, idéal pour tester un produit sans risque.',
  },
  {
    id: 2,
    scenario: 'Tu veux commander 500 pièces d\'un même article pour remplir ton stock',
    correct: 'alibaba',
    explanation: 'Alibaba offre des prix de gros pour les grosses commandes avec des fabricants directs.',
  },
  {
    id: 3,
    scenario: 'C\'est ta première commande et tu veux être protégé en cas de problème',
    correct: 'aliexpress',
    explanation: 'AliExpress intègre une protection acheteur de 60 jours automatiquement.',
  },
  {
    id: 4,
    scenario: 'Tu veux faire fabriquer un produit avec ton propre logo',
    correct: 'alibaba',
    explanation: 'Alibaba connecte avec des fabricants qui acceptent la personnalisation et le logo.',
  },
  {
    id: 5,
    scenario: 'Budget limité à 20 000 FCFA pour 10 articles différents',
    correct: 'aliexpress',
    explanation: 'AliExpress permet d\'acheter différents articles en petites quantités sans MOQ.',
  },
];

export function AlibabaAliexpressQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'aliexpress' | 'alibaba'>>({});
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const q = SCENARIOS[current];
  const answer = answers[q.id];
  const isCorrect = answer === q.correct;
  const correctCount = Object.entries(answers).filter(([id, a]) => SCENARIOS.find(s => s.id === parseInt(id))?.correct === a).length;

  const handleAnswer = (choice: 'aliexpress' | 'alibaba') => {
    if (answers[q.id]) return;
    setAnswers({ ...answers, [q.id]: choice });
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (current < SCENARIOS.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setCurrent(0);
    setAnswers({});
    setShowResult(false);
    setShowExplanation(false);
  };

  if (showResult) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card p-6 shadow-md text-center">
        <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${correctCount >= 4 ? 'bg-green-100' : 'bg-orange-100'}`}>
          {correctCount >= 4 ? <CheckCircle size={30} className="text-green-600" /> : <AlertTriangle size={30} className="text-orange-500" />}
        </div>
        <h3 className="text-lg font-extrabold text-[#1e3a5f] mb-1">Quiz terminé !</h3>
        <p className="text-3xl font-extrabold text-[#f6932a] my-3">{correctCount}/{SCENARIOS.length}</p>
        <p className="text-sm text-gray-500 mb-5">{correctCount >= 4 ? 'Excellent ! Vous maîtrisez la différence.' : 'Relisez le module pour améliorer votre score.'}</p>
        <button onClick={handleReset} className="btn-secondary mx-auto">
          <RotateCcw size={15} /> Rejouer
        </button>
      </motion.div>
    );
  }

  return (
    <div className="card p-6 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
          <ShoppingCart size={18} className="text-orange-500" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#1e3a5f]">Mise en situation : AliExpress ou Alibaba ?</h3>
          <p className="text-[11px] text-gray-500">Scénario {current + 1}/{SCENARIOS.length}</p>
        </div>
      </div>

      <div className="h-1.5 bg-gray-100 rounded-full mb-5">
        <div className="h-full bg-[#f6932a] rounded-full transition-all" style={{ width: `${((current + 1) / SCENARIOS.length) * 100}%` }} />
      </div>

      <div className="rounded-xl bg-[#1e3a5f]/5 border border-[#1e3a5f]/10 p-4 mb-5">
        <p className="text-sm font-semibold text-[#1e3a5f] leading-relaxed">{q.scenario}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { key: 'aliexpress' as const, label: 'AliExpress', icon: ShoppingCart, baseClass: 'border-orange-200 bg-orange-50 hover:border-orange-400', iconColor: 'text-orange-500' },
          { key: 'alibaba' as const, label: 'Alibaba', icon: Building2, baseClass: 'border-blue-200 bg-blue-50 hover:border-blue-400', iconColor: 'text-blue-500' },
        ].map(({ key, label, icon: Icon, baseClass, iconColor }) => {
          const selected = answer === key;
          const correct = q.correct === key;
          let btnClass = `flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer min-h-0`;
          if (answer) {
            if (correct) btnClass += ' border-green-400 bg-green-50';
            else if (selected && !correct) btnClass += ' border-red-400 bg-red-50';
            else btnClass += ' border-gray-200 bg-gray-50 opacity-60';
          } else {
            btnClass += ` ${baseClass}`;
          }

          return (
            <button key={key} onClick={() => handleAnswer(key)} disabled={!!answer} className={btnClass}>
              <Icon size={22} className={answer ? (correct ? 'text-green-600' : selected ? 'text-red-500' : 'text-gray-400') : iconColor} />
              <span className={`text-sm font-bold ${answer ? (correct ? 'text-green-700' : selected ? 'text-red-600' : 'text-gray-400') : 'text-[#1e3a5f]'}`}>{label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl p-3 mb-4 border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}
          >
            <p className={`text-xs font-bold mb-1 ${isCorrect ? 'text-green-700' : 'text-orange-700'}`}>
              {isCorrect ? <Check size={12} className="mr-1" /> : <AlertTriangle size={12} className="mr-1" />}{isCorrect ? 'Bonne réponse !'  : 'Pas cette fois…'}
            </p>
            <p className={`text-xs leading-relaxed ${isCorrect ? 'text-green-800' : 'text-orange-800'}`}>{q.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {showExplanation && (
        <button onClick={handleNext} className="btn-primary w-full">
          {current < SCENARIOS.length - 1 ? (
            <><span>Scénario suivant</span><ArrowRight size={15} /></>
          ) : (
            <><span>Voir les résultats</span><CheckCircle size={15} /></>
          )}
        </button>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────── */
/*  3. TAX SIMULATOR (Module 3)                            */
/* ─────────────────────────────────────────────────────── */
const TAX_CATEGORIES = [
  { id: 'essential', label: 'Biens essentiels (médicaments, équipements agricoles)', rate: 0 },
  { id: 'equipment', label: 'Matières premières / Équipements', rate: 0.05 },
  { id: 'intermediate', label: 'Produits intermédiaires', rate: 0.10 },
  { id: 'consumer', label: 'Produits de consommation courante', rate: 0.20 },
];

export function TaxSimulator() {
  const [value, setValue] = useState(50000);
  const [category, setCategory] = useState('consumer');
  const [quantity, setQuantity] = useState(10);

  const cat = TAX_CATEGORIES.find(c => c.id === category)!;
  const customs = value * cat.rate;
  const tva = (value + customs) * 0.18; // TVA standard UEMOA
  const total = value + customs + tva;
  const perUnit = total / Math.max(1, quantity);

  const Icon = customs === 0 ? CheckCircle : customs < value * 0.1 ? Info : AlertTriangle;
  const iconColor = customs === 0 ? 'text-green-500' : customs < value * 0.1 ? 'text-blue-500' : 'text-orange-500';

  return (
    <div className="card p-6 shadow-md">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
          <Calculator size={18} className="text-green-600" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#1e3a5f]">Simulateur de taxes douanières</h3>
          <p className="text-[11px] text-gray-500">Estimation basée sur le TEC CEDEAO</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#1e3a5f] mb-1.5">Valeur de la marchandise (FCFA)</label>
          <input type="number" value={value} onChange={e => setValue(Math.max(0, parseInt(e.target.value) || 0))} step={5000} min={0} className="sim-input" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1e3a5f] mb-1.5">Nombre de pièces</label>
          <input type="number" value={quantity} onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} min={1} className="sim-input" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1e3a5f] mb-1.5">Catégorie du produit</label>
          <div className="space-y-2">
            {TAX_CATEGORIES.map(c => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border-2 text-left transition-all min-h-0 ${
                  category === c.id ? 'border-[#f6932a] bg-[#fef3e8]' : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <span className="text-xs text-gray-700">{c.label}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${c.rate === 0 ? 'text-green-600' : c.rate <= 0.1 ? 'text-blue-600' : 'text-orange-600'}`}>
                    {(c.rate * 100).toFixed(0)}%
                  </span>
                  {category === c.id && <Check size={12} className="text-[#f6932a]" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="mt-5 rounded-xl bg-[#1e3a5f] p-4">
        <div className="flex items-start gap-2 mb-3">
          <Icon size={15} className={`${iconColor} shrink-0 mt-0.5`} />
          <p className="text-xs text-white/70 leading-relaxed">
            Estimation indicative — les douanes peuvent appliquer des règles différentes pour les petits colis personnels.
          </p>
        </div>
        <div className="space-y-2 text-xs text-white/70 mb-3">
          <div className="flex justify-between"><span>Valeur de la marchandise</span><span className="font-semibold text-white">{value.toLocaleString()} FCFA</span></div>
          <div className="flex justify-between"><span>Droits de douane ({(cat.rate*100).toFixed(0)}%)</span><span className="font-semibold text-white">{Math.round(customs).toLocaleString()} FCFA</span></div>
          <div className="flex justify-between"><span>TVA (18% — indicatif)</span><span className="font-semibold text-white">{Math.round(tva).toLocaleString()} FCFA</span></div>
          <div className="h-px bg-white/20 my-2" />
          <div className="flex justify-between text-sm"><span className="font-bold text-white">Total estimé</span><span className="font-extrabold text-[#f6932a]">{Math.round(total).toLocaleString()} FCFA</span></div>
          <div className="flex justify-between"><span>Coût par pièce</span><span className="font-bold text-white">{Math.round(perUnit).toLocaleString()} FCFA</span></div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────── */
/*  4. CBM CALCULATOR (Module 3)                           */
/* ─────────────────────────────────────────────────────── */
export function CBMCalculator() {
  const [length, setLength] = useState(50);
  const [width, setWidth] = useState(40);
  const [height, setHeight] = useState(30);
  const [ratePerCBM, setRatePerCBM] = useState(150000);

  const cbm = (length / 100) * (width / 100) * (height / 100);
  const cost = cbm * ratePerCBM;

  return (
    <div className="card p-6 shadow-md">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">
          <Package size={18} className="text-purple-600" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#1e3a5f]">Calculateur CBM (fret maritime)</h3>
          <p className="text-[11px] text-gray-500">CBM = Longueur × Largeur × Hauteur en mètres</p>
        </div>
      </div>

      <div className="cbm-grid mb-4">
        {[
          { label: 'Longueur (cm)', value: length, setter: setLength },
          { label: 'Largeur (cm)', value: width, setter: setWidth },
          { label: 'Hauteur (cm)', value: height, setter: setHeight },
        ].map(({ label, value, setter }) => (
          <div key={label}>
            <label className="block text-xs font-semibold text-[#1e3a5f] mb-1.5">{label}</label>
            <input
              type="number"
              value={value}
              onChange={e => setter(Math.max(1, parseInt(e.target.value) || 1))}
              min={1}
              className="sim-input"
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#1e3a5f] mb-1.5">
          Tarif maritime estimatif (FCFA/CBM)
          <span className="text-[10px] text-gray-400 ml-1 font-normal">— à demander à votre transitaire</span>
        </label>
        <input
          type="number"
          value={ratePerCBM}
          onChange={e => setRatePerCBM(Math.max(0, parseInt(e.target.value) || 0))}
          step={10000}
          min={0}
          className="sim-input"
        />
      </div>

      <div className="mt-5 rounded-xl bg-[#1e3a5f] p-4 text-center">
        <p className="text-xs text-white/85 mb-1">Volume calculé</p>
        <p className="text-3xl font-extrabold text-[#f6932a]">{cbm.toFixed(4)} CBM</p>
        <p className="text-lg font-bold text-white mt-2">≈ {Math.round(cost).toLocaleString()} FCFA</p>
        <p className="text-[11px] text-white/80 mt-1">
          {length}cm × {width}cm × {height}cm = {(length/100).toFixed(2)}m × {(width/100).toFixed(2)}m × {(height/100).toFixed(2)}m
        </p>
      </div>

      <div className="warning-box mt-4">
        <div className="flex items-start gap-2">
          <AlertTriangle size={13} className="text-orange-500 shrink-0 mt-0.5" />
          <p className="text-xs text-orange-800 leading-relaxed">
            Estimation uniquement. Le tarif réel dépend du transitaire, du port de transit 
            (Abidjan, Lomé, Cotonou…), de la période et du type de marchandise. 
            Demandez toujours un devis avant d&apos;engager un envoi.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────── */
/*  5. LITIGE TIMELINE (Module 3)                          */
/* ─────────────────────────────────────────────────────── */
const LITIGE_STEPS = [
  { day: 'J0', title: 'Commande passée', desc: 'Votre commande est confirmée et payée.', color: 'blue', icon: ShoppingCart },
  { day: 'J1–3', title: 'Expédition par le vendeur', desc: 'Le vendeur emballe et expédie votre colis. Le numéro de suivi est disponible.', color: 'blue', icon: Package },
  { day: 'J5–45', title: 'Colis en transit', desc: 'Selon le mode de livraison choisi (Standard : 20–45j, Express : 5–15j).', color: 'orange', icon: Plane },
  { day: 'J20–60', title: 'Réception du colis', desc: 'Vous récupérez le colis à La Poste. Inspectez-le AVANT de confirmer.', color: 'green', icon: CheckCircle },
  { day: 'J+15', title: 'Fenêtre de litige (15 jours)', desc: 'Après confirmation de réception, vous avez 15 jours pour ouvrir un litige si problème.', color: 'red', icon: AlertTriangle },
  { day: 'J60–75', title: 'Fin de la protection acheteur', desc: 'La protection expire. Passé ce délai, AliExpress ne peut plus vous rembourser.', color: 'gray', icon: Clock },
];

export function LitigeTimeline() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="card p-6 shadow-md">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
          <Clock size={18} className="text-red-500" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#1e3a5f]">Chronologie de la protection acheteur</h3>
          <p className="text-[11px] text-gray-500">Cliquez sur une étape pour les détails</p>
        </div>
      </div>

      <div className="space-y-2">
        {LITIGE_STEPS.map((step, i) => {
          const isActive = active === i;
          const Icon = step.icon;
          const colorMap = {
            blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600', dot: 'bg-blue-500', badge: 'text-blue-700 bg-blue-100' },
            orange: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'text-orange-500', dot: 'bg-orange-500', badge: 'text-orange-700 bg-orange-100' },
            green: { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-600', dot: 'bg-green-500', badge: 'text-green-700 bg-green-100' },
            red: { bg: 'bg-red-50', border: 'border-red-200', icon: 'text-red-500', dot: 'bg-red-500', badge: 'text-red-700 bg-red-100' },
            gray: { bg: 'bg-gray-50', border: 'border-gray-200', icon: 'text-gray-400', dot: 'bg-gray-400', badge: 'text-gray-600 bg-gray-100' },
          };
          const c = colorMap[step.color as keyof typeof colorMap];

          return (
            <button
              key={i}
              onClick={() => setActive(isActive ? null : i)}
              className={`w-full flex items-start gap-3 p-3 rounded-xl border-2 transition-all text-left min-h-0 ${
                isActive ? `${c.bg} ${c.border}` : 'border-gray-100 bg-white hover:border-gray-200'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${c.bg}`}>
                <Icon size={15} className={c.icon} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.badge}`}>{step.day}</span>
                  <p className="text-xs font-bold text-[#1e3a5f]">{step.title}</p>
                </div>
                <AnimatePresence>
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-gray-600 mt-1.5 leading-relaxed"
                    >
                      {step.desc}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────── */
/*  6. SORTING GAME (Module 4)                             */
/* ─────────────────────────────────────────────────────── */
const PRODUCTS = [
  { id: 1, name: 'Écouteurs Bluetooth', correct: true, reason: 'Léger, forte demande, pas fabriqué localement' },
  { id: 2, name: 'Sacs de ciment (50kg)', correct: false, reason: 'Très lourd → transport coûteux, fabriqué localement → marge nulle' },
  { id: 3, name: 'Chargeurs rapides USB-C', correct: true, reason: 'Léger, forte demande tech, bonne marge possible' },
  { id: 4, name: 'Médicaments non homologués', correct: false, reason: 'Nécessite une licence pharmaceutique — interdit sans autorisation' },
  { id: 5, name: 'Bijoux fantaisie tendance', correct: true, reason: 'Léger, forte valeur ajoutée, facile à vendre' },
  { id: 6, name: 'Contrefaçons Nike/Adidas', correct: false, reason: 'Risque de saisie douanière + poursuites pénales' },
  { id: 7, name: 'Jouets éducatifs', correct: true, reason: 'Léger, forte demande, peu de concurrence locale' },
  { id: 8, name: 'Eau minérale en bouteille', correct: false, reason: 'Très lourd, produit local → zéro marge' },
];

export function SortingGame() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [done, setDone] = useState(false);

  const product = PRODUCTS[current];
  const answer = answers[product.id];
  const isCorrect = answer === product.correct;
  const correctCount = Object.entries(answers).filter(([id, a]) => PRODUCTS.find(p => p.id === parseInt(id))?.correct === a).length;

  const handleAnswer = (choice: boolean) => {
    if (showFeedback) return;
    setAnswers({ ...answers, [product.id]: choice });
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (current < PRODUCTS.length - 1) {
      setCurrent(current + 1);
    } else {
      setDone(true);
    }
  };

  const handleReset = () => {
    setCurrent(0);
    setAnswers({});
    setShowFeedback(false);
    setDone(false);
  };

  if (done) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-6 shadow-md text-center">
        <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${correctCount >= 6 ? 'bg-green-100' : 'bg-orange-100'}`}>
          {correctCount >= 6 ? <CheckCircle size={30} className="text-green-600" /> : <AlertTriangle size={30} className="text-orange-500" />}
        </div>
        <h3 className="text-lg font-extrabold text-[#1e3a5f] mb-1">Score final</h3>
        <p className="text-3xl font-extrabold text-[#f6932a] my-3">{correctCount}/{PRODUCTS.length}</p>
        <p className="text-sm text-gray-500 mb-5">{correctCount >= 6 ? 'Excellent œil ! Vous savez sélectionner les bons produits.' : 'Relisez les critères de sélection dans le module.'}</p>
        <button onClick={handleReset} className="btn-secondary mx-auto"><RotateCcw size={15} /> Rejouer</button>
      </motion.div>
    );
  }

  return (
    <div className="card p-6 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">
          <Tag size={18} className="text-purple-600" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#1e3a5f]">Jeu de tri : Importer ou pas ?</h3>
          <p className="text-[11px] text-gray-500">Produit {current + 1}/{PRODUCTS.length}</p>
        </div>
      </div>

      <div className="h-1.5 bg-gray-100 rounded-full mb-5">
        <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${((current + 1) / PRODUCTS.length) * 100}%` }} />
      </div>

      <div className="rounded-xl bg-[#1e3a5f] text-white p-5 text-center mb-5">
        <p className="text-[10px] text-white/80 uppercase tracking-widest mb-2">Produit</p>
        <p className="text-lg font-extrabold">{product.name}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { choice: true, label: 'Importer', icon: CheckCircle, baseClass: 'border-green-200 bg-green-50 text-green-700 hover:border-green-400' },
          { choice: false, label: 'Éviter', icon: AlertTriangle, baseClass: 'border-red-200 bg-red-50 text-red-700 hover:border-red-400' },
        ].map(({ choice, label, icon: BtnIcon, baseClass }) => {
          const selected = answer === choice;
          const correct = product.correct === choice;
          let cls = `flex items-center justify-center gap-2 p-4 rounded-xl border-2 font-bold text-sm transition-all min-h-0 cursor-pointer `;
          if (showFeedback) {
            if (correct) cls += 'border-green-400 bg-green-50 text-green-700';
            else if (selected) cls += 'border-red-400 bg-red-50 text-red-600';
            else cls += 'border-gray-200 bg-gray-50 text-gray-400';
          } else {
            cls += baseClass;
          }
          return (
            <button key={String(choice)} onClick={() => handleAnswer(choice)} disabled={showFeedback} className={cls}>
              <BtnIcon size={16} />
              {label}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl p-3 mb-4 border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}
          >
            <p className={`text-xs font-bold mb-1 ${isCorrect ? 'text-green-700' : 'text-orange-700'}`}>
              {isCorrect ? <Check size={12} className="mr-1" /> : <AlertTriangle size={12} className="mr-1" />}{isCorrect ? 'Correct !' : `Réponse : ${product.correct ? 'Importer' : 'Éviter'}`}
            </p>
            <p className={`text-xs leading-relaxed ${isCorrect ? 'text-green-800' : 'text-orange-800'}`}>{product.reason}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {showFeedback && (
        <button onClick={handleNext} className="btn-primary w-full">
          {current < PRODUCTS.length - 1 ? (<><span>Produit suivant</span><ArrowRight size={15} /></>) : (<><span>Voir le score</span><CheckCircle size={15} /></>)}
        </button>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────── */
/*  7. MARGIN SIMULATOR (Module 5)                         */
/* ─────────────────────────────────────────────────────── */
export function MarginSimulator() {
  const [purchasePrice, setPurchasePrice] = useState(2000);
  const [freightCost, setFreightCost] = useState(1500);
  const [customsTax, setCustomsTax] = useState(0);
  const [quantity, setQuantity] = useState(10);
  const [sellingPrice, setSellingPrice] = useState(7000);

  const totalCost = (purchasePrice + freightCost + customsTax) * quantity;
  const totalRevenue = sellingPrice * quantity;
  const totalMargin = totalRevenue - totalCost;
  const marginPercent = totalRevenue > 0 ? (totalMargin / totalRevenue) * 100 : 0;
  const unitCost = purchasePrice + freightCost + customsTax;
  const unitMargin = sellingPrice - unitCost;

  const isGood = marginPercent >= 50;
  const isOk = marginPercent >= 30 && marginPercent < 50;

  return (
    <div className="card p-6 shadow-md">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
          <TrendingUp size={18} className="text-red-500" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#1e3a5f]">Simulateur de marge commerciale</h3>
          <p className="text-[11px] text-gray-500">Calculez la rentabilité de votre importation</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        {[
          { label: 'Prix achat/pièce (FCFA)', value: purchasePrice, setter: setPurchasePrice, step: 500 },
          { label: 'Fret estimatif/pièce (FCFA)', value: freightCost, setter: setFreightCost, step: 500 },
          { label: 'Taxes douane/pièce (FCFA)', value: customsTax, setter: setCustomsTax, step: 100 },
          { label: 'Quantité', value: quantity, setter: setQuantity, step: 1, min: 1 },
          { label: 'Prix de vente/pièce (FCFA)', value: sellingPrice, setter: setSellingPrice, step: 500 },
        ].map(({ label, value, setter, step, min = 0 }) => (
          <div key={label}>
            <label className="block text-xs font-semibold text-[#1e3a5f] mb-1.5">{label}</label>
            <input
              type="number"
              value={value}
              onChange={e => setter(Math.max(min, parseInt(e.target.value) || 0))}
              step={step}
              min={min}
              className="sim-input"
            />
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-[#1e3a5f] p-4">
        <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-white/85">Coût de revient/pièce</p>
            <p className="text-base font-extrabold text-white mt-1">{unitCost.toLocaleString()} FCFA</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-white/85">Marge/pièce</p>
            <p className={`text-base font-extrabold mt-1 ${unitMargin > 0 ? 'text-[#f6932a]' : 'text-red-400'}`}>
              {unitMargin > 0 ? '+' : ''}{unitMargin.toLocaleString()} FCFA
            </p>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-white/85">Chiffre d&apos;affaires total</p>
            <p className="text-base font-extrabold text-white mt-1">{totalRevenue.toLocaleString()} FCFA</p>
          </div>
          <div className={`rounded-xl p-3 ${isGood ? 'bg-green-500/20' : isOk ? 'bg-orange-500/20' : 'bg-red-500/20'}`}>
            <p className="text-white/85">Marge nette totale</p>
            <p className={`text-base font-extrabold mt-1 ${isGood ? 'text-green-400' : isOk ? 'text-orange-400' : 'text-red-400'}`}>
              {totalMargin > 0 ? '+' : ''}{totalMargin.toLocaleString()} FCFA
            </p>
          </div>
        </div>

        {/* Margin bar */}
        <div>
          <div className="flex justify-between text-xs text-white/85 mb-1.5">
            <span>Marge : {marginPercent.toFixed(1)}%</span>
            <span>{isGood ? 'Excellent' : isOk ? 'Correct' : 'Trop faible'}</span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${isGood ? 'bg-green-500' : isOk ? 'bg-[#f6932a]' : 'bg-red-500'}`}
              initial={{ width: '0%' }}
              animate={{ width: `${Math.max(0, Math.min(100, marginPercent))}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-white/30 mt-1">
            <span>0%</span>
            <span>30%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {!isGood && (
        <div className="tip-box mt-4">
          <div className="flex items-start gap-2">
            <Info size={13} className="text-[#f6932a] shrink-0 mt-0.5" />
            <p className="text-xs text-gray-700 leading-relaxed">
              {totalMargin <= 0
                ? 'Opération non rentable. Augmentez le prix de vente ou réduisez le fret (commandez en plus grande quantité).'
                : 'Marge faible. Visez au minimum 50% de marge pour couvrir les imprévus et les frais de vente.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
