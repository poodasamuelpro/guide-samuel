'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconCalculator,
  IconCheck,
  IconCheckCircle,
  IconReceiptText,
  IconShoppingCart,
  IconPackage,
  IconPlane,
  IconZap,
  IconAlertTriangle,
  IconDollarSign,
  IconClock,
  IconTag,
  IconTrendingUp,
  IconRefreshCw,
  IconArrowRight,
  IconX,
  IconInfo,
  IconSmartphone,
  IconLightbulb,
} from '@/components/Icons';

// ── Module 1 : Simulateur de budget ──────────────────────────────────────────

export function BudgetSimulator() {
  const cards = [
    { id: 'uba', label: 'Carte Visa UBA', cost: 10000, note: 'Rechargeable via Orange Money' },
    { id: 'ecobank', label: 'Carte Cashxpress Ecobank', cost: 3500, note: 'Rechargeable en agence uniquement' },
  ];
  const [card, setCard] = useState(cards[0]);
  const [withBP, setWithBP] = useState(true);
  const bpCost = 17200;
  const total = card.cost + (withBP ? bpCost : 0);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 space-y-4">
      <div className="flex items-center gap-2">
        <IconCalculator size={18} color="#1a2a4a" />
        <h3 className="font-bold text-[#1a2a4a] text-base">Simulateur de budget de départ</h3>
      </div>
      <div>
        <label className="text-sm font-semibold text-gray-700 block mb-2">Choisis ta carte bancaire :</label>
        <div className="space-y-2">
          {cards.map((c) => (
            <label key={c.id} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all
              ${card.id === c.id ? 'border-[#f2994a] bg-orange-50' : 'border-gray-200 bg-white'}`}>
              <input type="radio" name="card" checked={card.id === c.id} onChange={() => setCard(c)} className="accent-[#f2994a]" />
              <div>
                <p className="font-semibold text-sm text-[#1a2a4a]">{c.label} — <span className="text-[#f2994a]">{c.cost.toLocaleString()} FCFA</span></p>
                <p className="text-xs text-gray-500">{c.note}</p>
              </div>
            </label>
          ))}
        </div>
      </div>
      <label className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all
        ${withBP ? 'border-[#f2994a] bg-orange-50' : 'border-gray-200 bg-white'}`}>
        <input type="checkbox" checked={withBP} onChange={(e) => setWithBP(e.target.checked)} className="accent-[#f2994a]" />
        <div>
          <p className="font-semibold text-sm text-[#1a2a4a]">Boîte postale La Poste — <span className="text-[#f2994a]">17 200 FCFA</span></p>
          <p className="text-xs text-gray-500">Indispensable pour recevoir tes colis</p>
        </div>
      </label>
      <div className="bg-[#1a2a4a] text-white rounded-xl p-4 text-center">
        <p className="text-sm text-gray-300 mb-1">Budget total estimé</p>
        <p className="text-3xl font-bold text-[#f2994a]">{total.toLocaleString()} FCFA</p>
        <p className="text-xs text-gray-400 mt-1">≈ {(total / 655).toFixed(0)} € · {(total / 600).toFixed(0)} USD</p>
      </div>
    </div>
  );
}

// ── Module 1 : Checklist ──────────────────────────────────────────────────────

export function StarterChecklist() {
  const items = [
    { id: 'phone', text: "J'ai un téléphone Android ou un ordinateur" },
    { id: 'internet', text: "J'ai une connexion internet (WiFi ou data)" },
    { id: 'card', text: "J'ai ma carte Visa prépayée (UBA ou Ecobank)" },
    { id: 'bp', text: "J'ai ouvert ma boîte postale à La Poste" },
    { id: 'budget', text: "J'ai mon budget de départ disponible" },
    { id: 'aliexpress', text: "J'ai créé mon compte sur AliExpress" },
  ];
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setChecked((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const percent = Math.round((checked.size / items.length) * 100);

  return (
    <div className="bg-green-50 border border-green-200 rounded-2xl p-5 space-y-3">
      <div className="flex items-center gap-2">
        <IconCheckCircle size={18} color="#1a2a4a" />
        <h3 className="font-bold text-[#1a2a4a] text-base">Ma checklist de démarrage</h3>
      </div>
      <div className="bg-white rounded-xl p-3">
        <div className="flex justify-between text-xs text-gray-600 mb-1.5">
          <span className="font-medium">Prêt à importer</span>
          <span className="font-bold text-[#f2994a]">{checked.size}/{items.length}</span>
        </div>
        <div className="bg-gray-200 rounded-full h-2">
          <motion.div
            animate={{ width: `${percent}%` }}
            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
          />
        </div>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <label key={item.id} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all
            ${checked.has(item.id) ? 'bg-green-100' : 'bg-white'}`}>
            <div className={`w-5 h-5 rounded flex items-center justify-center border-2 flex-shrink-0 transition-all
              ${checked.has(item.id) ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}
              onClick={() => toggle(item.id)}>
              {checked.has(item.id) && <IconCheck size={12} color="white" />}
            </div>
            <span className={`text-sm ${checked.has(item.id) ? 'line-through text-gray-400' : 'text-gray-700'}`}>{item.text}</span>
          </label>
        ))}
      </div>
      {checked.size === items.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-600 text-white text-center rounded-xl p-3 font-bold text-sm flex items-center justify-center gap-2"
        >
          <IconCheckCircle size={18} color="white" />
          <span>Tu es prêt(e) à passer ta première commande !</span>
        </motion.div>
      )}
    </div>
  );
}

// ── Module 3 : Simulateur de taxes douanières ─────────────────────────────────

export function TaxSimulator() {
  const [qty, setQty] = useState(5);
  const [pricePerUnit, setPricePerUnit] = useState(3000);
  const total = qty * pricePerUnit;

  let taxNote = '';
  let taxColor = 'text-green-700';
  let TaxIcon = IconCheckCircle;
  let taxIconColor = '#16a34a';

  if (qty < 10 && pricePerUnit < 5000) {
    taxNote = 'Probablement exonéré — petite quantité et faible valeur unitaire.';
    taxColor = 'text-green-700';
    TaxIcon = IconCheckCircle;
    taxIconColor = '#16a34a';
  } else if (total > 30000) {
    taxNote = 'Risque élevé de taxation. Prévoir entre 5 000 et 10 000 FCFA minimum de frais de douane. À vérifier auprès de la douane locale.';
    taxColor = 'text-orange-700';
    TaxIcon = IconAlertTriangle;
    taxIconColor = '#ea580c';
  } else {
    taxNote = 'Taxation possible. En pratique souvent < 5 000 FCFA pour ce montant. Vérifier auprès de la douane locale.';
    taxColor = 'text-yellow-700';
    TaxIcon = IconInfo;
    taxIconColor = '#d97706';
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 space-y-4">
      <div className="flex items-center gap-2">
        <IconReceiptText size={18} color="#1a2a4a" />
        <h3 className="font-bold text-[#1a2a4a] text-base">Simulateur de taxes douanières</h3>
      </div>
      <p className="text-xs text-gray-600">Indication approximative — les tarifs varient selon la catégorie de produit. Consultez la douane locale pour un tarif exact.</p>
      <div className="space-y-3">
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-1">Nombre de pièces : <span className="text-[#f2994a]">{qty}</span></label>
          <input type="range" min={1} max={50} value={qty} onChange={(e) => setQty(+e.target.value)} className="w-full accent-[#f2994a]" />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-1">Prix unitaire (FCFA) : <span className="text-[#f2994a]">{pricePerUnit.toLocaleString()}</span></label>
          <input type="range" min={500} max={50000} step={500} value={pricePerUnit} onChange={(e) => setPricePerUnit(+e.target.value)} className="w-full accent-[#f2994a]" />
        </div>
      </div>
      <div className="bg-white rounded-xl p-4">
        <div className="flex justify-between text-sm mb-3">
          <span className="text-gray-600">Valeur totale du colis</span>
          <span className="font-bold text-[#1a2a4a]">{total.toLocaleString()} FCFA</span>
        </div>
        <div className={`flex items-start gap-2 text-sm font-semibold ${taxColor}`}>
          <TaxIcon size={16} color={taxIconColor} className="flex-shrink-0 mt-0.5" />
          <span>{taxNote}</span>
        </div>
      </div>
    </div>
  );
}

// ── Module 3 : Chronologie litige AliExpress ──────────────────────────────────

export function LitigeTimeline() {
  const steps = [
    { day: 'J+0', label: 'Commande passée', Icon: IconShoppingCart, color: 'bg-blue-500' },
    { day: 'J+1 à 5', label: "Vendeur prépare l'envoi", Icon: IconPackage, color: 'bg-blue-400' },
    { day: 'J+20 à 45', label: 'Livraison standard (AliExpress Shipping)', Icon: IconPlane, color: 'bg-orange-400' },
    { day: 'J+7 à 15', label: 'Livraison express (DHL / EMS)', Icon: IconZap, color: 'bg-green-500' },
    { day: 'Avant J+60', label: 'Ouvrir un litige si non reçu', Icon: IconAlertTriangle, color: 'bg-red-400' },
    { day: 'J+7 à 15', label: 'Remboursement reçu après litige', Icon: IconDollarSign, color: 'bg-green-600' },
  ];

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <IconClock size={18} color="#1a2a4a" />
        <h3 className="font-bold text-[#1a2a4a] text-base">Chronologie type commande</h3>
      </div>
      <div className="space-y-3">
        {steps.map(({ day, label, Icon, color }, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className={`w-9 h-9 rounded-full ${color} flex items-center justify-center flex-shrink-0`}>
              <Icon size={16} color="white" />
            </div>
            <div className="pt-0.5">
              <span className="text-xs font-bold text-gray-400 uppercase block">{day}</span>
              <p className="text-sm font-medium text-[#1a2a4a]">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Module 4 : Jeu de tri "Importer ou pas ?" ─────────────────────────────────

const PRODUCTS = [
  { name: 'Accessoires téléphone', Icon: IconSmartphone, shouldImport: true, reason: 'Léger, forte marge, non fabriqué localement.' },
  { name: 'Ciment en sac', Icon: IconPackage, shouldImport: false, reason: 'Lourd, taxé, fabriqué localement — pas rentable.' },
  { name: 'Ampoules LED', Icon: IconZap, shouldImport: true, reason: 'Produit tech, non fabriqué localement, forte demande.' },
  { name: 'Chaussures contrefaites', Icon: IconX, shouldImport: false, reason: 'Contrefaçon = risque de saisie et poursuites judiciaires.' },
  { name: 'Souris et claviers', Icon: IconPackage, shouldImport: true, reason: 'Produit tech léger, non fabriqué localement.' },
  { name: 'Chocolat industriel', Icon: IconX, shouldImport: false, reason: "Produit alimentaire — réglementations sanitaires complexes." },
  { name: 'Cosmétiques et beauté', Icon: IconTag, shouldImport: true, reason: "Forte demande en Afrique de l'Ouest, bonne marge possible." },
  { name: 'Carburant', Icon: IconX, shouldImport: false, reason: "Produit réglementé et dangereux — interdit à l'importation privée." },
];

export function SortingGame() {
  const [current, setCurrent] = useState(0);
  const [feedback, setFeedback] = useState<{ correct: boolean; reason: string } | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const p = PRODUCTS[current];

  function choose(choice: boolean) {
    if (feedback) return;
    const correct = choice === p.shouldImport;
    if (correct) setScore((s) => s + 1);
    setFeedback({ correct, reason: p.reason });
  }

  function next() {
    if (current + 1 >= PRODUCTS.length) { setDone(true); return; }
    setCurrent((c) => c + 1);
    setFeedback(null);
  }

  function restart() {
    setCurrent(0); setScore(0); setFeedback(null); setDone(false);
  }

  if (done) return (
    <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 text-center">
      <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
        <IconTrendingUp size={28} color="#7c3aed" />
      </div>
      <h3 className="font-bold text-[#1a2a4a] text-base mb-1">Résultat du jeu de tri</h3>
      <p className="text-3xl font-bold text-[#f2994a] mb-2">{score}/{PRODUCTS.length}</p>
      <p className="text-sm text-gray-600">
        {score >= 6 ? 'Excellent ! Tu sais choisir tes produits.' : 'Continue à pratiquer ! Relis le module pour affiner tes choix.'}
      </p>
      <button onClick={restart} className="mt-4 bg-purple-600 text-white font-bold px-5 py-2 rounded-xl text-sm flex items-center gap-2 mx-auto">
        <IconRefreshCw size={14} color="white" />
        <span>Rejouer</span>
      </button>
    </div>
  );

  const ProductIcon = p.Icon;

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <IconTag size={18} color="#1a2a4a" />
          <h3 className="font-bold text-[#1a2a4a] text-base">Importer ou pas ?</h3>
        </div>
        <span className="text-xs text-purple-600 font-bold bg-purple-100 px-2.5 py-1 rounded-full">{current + 1}/{PRODUCTS.length}</span>
      </div>
      <div className="bg-white rounded-xl p-5 text-center border border-purple-100">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <ProductIcon size={24} color="#7c3aed" />
        </div>
        <p className="font-bold text-[#1a2a4a] text-base">{p.name}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => choose(true)} className={`py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2
          ${feedback ? (p.shouldImport ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400') : 'bg-green-100 text-green-700 hover:bg-green-200'}`}>
          <IconCheck size={16} color={feedback ? (p.shouldImport ? 'white' : '#9ca3af') : '#16a34a'} />
          <span>Importer</span>
        </button>
        <button onClick={() => choose(false)} className={`py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2
          ${feedback ? (!p.shouldImport ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-400') : 'bg-red-100 text-red-700 hover:bg-red-200'}`}>
          <IconX size={16} color={feedback ? (!p.shouldImport ? 'white' : '#9ca3af') : '#dc2626'} />
          <span>Éviter</span>
        </button>
      </div>
      {feedback && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl p-4 text-sm border ${feedback.correct ? 'bg-green-50 text-green-800 border-green-200' : 'bg-orange-50 text-orange-800 border-orange-200'}`}>
          <div className="flex items-center gap-2 font-bold mb-1">
            {feedback.correct
              ? <IconCheckCircle size={16} color="#16a34a" />
              : <IconAlertTriangle size={16} color="#ea580c" />
            }
            <span>{feedback.correct ? 'Bonne réponse !' : 'Pas tout à fait...'}</span>
          </div>
          <p className="text-xs mb-3">{feedback.reason}</p>
          <button onClick={next} className="bg-[#f2994a] text-white font-bold px-4 py-1.5 rounded-lg text-xs flex items-center gap-1.5">
            <span>{current + 1 < PRODUCTS.length ? 'Produit suivant' : 'Voir mon score'}</span>
            <IconArrowRight size={12} color="white" />
          </button>
        </motion.div>
      )}
    </div>
  );
}

// ── Module 5 : Simulateur de marge ───────────────────────────────────────────

export function MarginSimulator() {
  const [buyPrice, setBuyPrice] = useState(2000);
  const [fees, setFees] = useState(500);
  const [sellPrice, setSellPrice] = useState(5000);

  const cost = buyPrice + fees;
  const profit = sellPrice - cost;
  const margin = sellPrice > 0 ? Math.round((profit / sellPrice) * 100) : 0;
  const profitColor = profit > 0 ? 'text-green-700' : 'text-red-600';

  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-5 space-y-4">
      <div className="flex items-center gap-2">
        <IconDollarSign size={18} color="#1a2a4a" />
        <h3 className="font-bold text-[#1a2a4a] text-base">Simulateur de marge</h3>
      </div>
      <div className="space-y-3">
        {[
          { label: "Prix d'achat (Chine)", value: buyPrice, set: setBuyPrice, max: 50000 },
          { label: 'Frais (transport, douane, BP)', value: fees, set: setFees, max: 20000 },
          { label: 'Prix de vente local', value: sellPrice, set: setSellPrice, max: 100000 },
        ].map((f) => (
          <div key={f.label}>
            <label className="text-sm font-semibold text-gray-700 block mb-1">
              {f.label} : <span className="text-[#f2994a]">{f.value.toLocaleString()} FCFA</span>
            </label>
            <input type="range" min={0} max={f.max} step={100} value={f.value}
              onChange={(e) => f.set(+e.target.value)} className="w-full accent-[#f2994a]" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Coût total</span>
          <span className="font-bold text-[#1a2a4a]">{cost.toLocaleString()} FCFA</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Prix de vente</span>
          <span className="font-bold text-[#1a2a4a]">{sellPrice.toLocaleString()} FCFA</span>
        </div>
        <hr className="border-gray-100" />
        <div className="flex justify-between">
          <span className="font-bold text-[#1a2a4a] text-sm">Bénéfice net</span>
          <span className={`font-bold text-lg ${profitColor}`}>{profit > 0 ? '+' : ''}{profit.toLocaleString()} FCFA</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Marge</span>
          <span className={`font-semibold text-sm ${profitColor}`}>{margin}%</span>
        </div>
      </div>

      {profit <= 0 && (
        <div className="flex items-start gap-2 text-red-700 text-xs font-semibold">
          <IconAlertTriangle size={14} color="#dc2626" className="flex-shrink-0 mt-0.5" />
          <span>Prix de vente trop bas — tu perds de l&apos;argent !</span>
        </div>
      )}
      {profit > 0 && profit < cost * 0.2 && (
        <div className="flex items-start gap-2 text-yellow-700 text-xs font-semibold">
          <IconInfo size={14} color="#d97706" className="flex-shrink-0 mt-0.5" />
          <span>Marge faible — essaie de négocier le prix ou d&apos;augmenter le prix de vente.</span>
        </div>
      )}
      {profit >= cost * 0.5 && (
        <div className="flex items-start gap-2 text-green-700 text-xs font-semibold">
          <IconTrendingUp size={14} color="#16a34a" className="flex-shrink-0 mt-0.5" />
          <span>Excellente marge ! Tu es sur la bonne voie.</span>
        </div>
      )}
    </div>
  );
}
