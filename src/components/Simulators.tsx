'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// ── Module 1 : Simulateur de budget + checklist ──────────────────────────────

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
      <h3 className="font-bold text-[#1a2a4a] text-base">🧮 Simulateur de budget de départ</h3>
      <div>
        <label className="text-sm font-semibold text-gray-700 block mb-2">Choisis ta carte bancaire :</label>
        <div className="space-y-2">
          {cards.map((c) => (
            <label key={c.id} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all
              ${card.id === c.id ? 'border-[#f2994a] bg-orange-50' : 'border-gray-200 bg-white'}`}>
              <input type="radio" name="card" checked={card.id === c.id} onChange={() => setCard(c)} className="accent-[#f2994a]" />
              <div>
                <p className="font-semibold text-sm text-[#1a2a4a]">{c.label}  --  <span className="text-[#f2994a]">{c.cost.toLocaleString()} FCFA</span></p>
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
          <p className="font-semibold text-sm text-[#1a2a4a]">Boîte postale La Poste  --  <span className="text-[#f2994a]">17 200 FCFA</span></p>
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

// ── Module 1 : Checklist ─────────────────────────────────────────────────────

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
      <h3 className="font-bold text-[#1a2a4a] text-base">✅ Ma checklist de démarrage</h3>
      <div className="bg-white rounded-xl p-3">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Prêt à importer</span>
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
            <input type="checkbox" checked={checked.has(item.id)} onChange={() => toggle(item.id)} className="accent-green-500 w-4 h-4" />
            <span className={`text-sm ${checked.has(item.id) ? 'line-through text-gray-400' : 'text-gray-700'}`}>{item.text}</span>
          </label>
        ))}
      </div>
      {checked.size === items.length && (
        <div className="bg-green-600 text-white text-center rounded-xl p-3 font-bold text-sm">
          🎉 Tu es prêt(e) à passer ta première commande !
        </div>
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
  let taxColor = 'text-green-600';

  if (qty < 10 && pricePerUnit < 5000) {
    taxNote = '✅ Probablement exonéré  --  petite quantité et faible valeur unitaire.';
    taxColor = 'text-green-600';
  } else if (total > 30000) {
    taxNote = '⚠️ Risque élevé de taxation. Prévoir entre 5 000 et 10 000 FCFA minimum de frais de douane. À vérifier auprès de la douane locale.';
    taxColor = 'text-orange-600';
  } else {
    taxNote = '🟡 Taxation possible. En pratique souvent < 5 000 FCFA pour ce montant. Vérifier auprès de la douane locale.';
    taxColor = 'text-yellow-600';
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 space-y-4">
      <h3 className="font-bold text-[#1a2a4a] text-base">🧾 Simulateur de taxes douanières</h3>
      <p className="text-xs text-gray-500">Indication approximative  --  les tarifs varient selon la catégorie de produit. Consulter la douane locale pour un tarif exact.</p>
      <div className="space-y-3">
        <div>
          <label className="text-sm font-semibold text-gray-700">Nombre de pièces : <span className="text-[#f2994a]">{qty}</span></label>
          <input type="range" min={1} max={50} value={qty} onChange={(e) => setQty(+e.target.value)} className="w-full accent-[#f2994a] mt-1" />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700">Prix unitaire (FCFA) : <span className="text-[#f2994a]">{pricePerUnit.toLocaleString()}</span></label>
          <input type="range" min={500} max={50000} step={500} value={pricePerUnit} onChange={(e) => setPricePerUnit(+e.target.value)} className="w-full accent-[#f2994a] mt-1" />
        </div>
      </div>
      <div className="bg-white rounded-xl p-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-500">Valeur totale du colis</span>
          <span className="font-bold text-[#1a2a4a]">{total.toLocaleString()} FCFA</span>
        </div>
        <p className={`text-sm font-semibold mt-3 ${taxColor}`}>{taxNote}</p>
      </div>
    </div>
  );
}

// ── Module 3 : Chronologie litige AliExpress ──────────────────────────────────

export function LitigeTimeline() {
  const steps = [
    { day: 'J+0', label: 'Commande passée', icon: '🛒', color: 'bg-blue-500' },
    { day: 'J+1 à 5', label: "Vendeur prépare l'envoi", icon: '📦', color: 'bg-blue-400' },

    { day: 'J+20 à 45', label: 'Livraison standard (AliExpress Shipping)', icon: '✈️', color: 'bg-orange-400' },
    { day: 'J+7 à 15', label: 'Livraison express (DHL / EMS)', icon: '🚀', color: 'bg-green-500' },
    { day: 'Avant J+60', label: 'Ouvrir un litige si non reçu', icon: '⚠️', color: 'bg-red-400' },
    { day: 'J+7 a 15', label: 'Remboursement recu apres litige', icon: '💰', color: 'bg-green-600' },
  ];
  return (
    <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
      <h3 className="font-bold text-[#1a2a4a] text-base mb-4">⏱️ Chronologie type commande</h3>

      <div className="space-y-3">
        {steps.map((s, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-full ${s.color} flex items-center justify-center text-sm flex-shrink-0`}>
              {s.icon}
            </div>
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase">{s.day}</span>
              <p className="text-sm font-medium text-[#1a2a4a]">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Module 4 : Jeu de tri "Importer ou pas ?" ─────────────────────────────────

const PRODUCTS = [
  { name: '📱 Accessoires telephone', shouldImport: true, reason: '✅ Leger, forte marge, non fabrique localement.' },
  { name: '🌿 Ciment en sac', shouldImport: false, reason: '❌ Lourd, taxe, fabrique localement => pas rentable.' },
  { name: '💡 Ampoules LED', shouldImport: true, reason: '✅ Produit tech, non fabrique localement, forte demande.' },
  { name: '👟 Chaussures contrefaites', shouldImport: false, reason: '❌ Contrefacon = risque de saisie et poursuites judiciaires.' },
  { name: '🖥️ Souris et claviers', shouldImport: true, reason: '✅ Produit tech leger, non fabrique localement.' },
  { name: '🍫 Chocolat industriel', shouldImport: false, reason: '❌ Produit alimentaire => reglementations sanitaires complexes.' },
  { name: '💄 Cosmetiques & beaute', shouldImport: true, reason: '✅ Forte demande en Afrique de l\'Ouest, bonne marge possible.' },
  { name: '⛽ Carburant', shouldImport: false, reason: '❌ Produit reglemente et dangereux -- interdit a l\'importation privee.' },
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

  if (done) return (
    <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 text-center">
      <div className="text-4xl mb-2">🎯</div>
      <h3 className="font-bold text-[#1a2a4a] text-base mb-1">Résultat du jeu de tri</h3>
      <p className="text-2xl font-bold text-[#f2994a] mb-2">{score}/{PRODUCTS.length}</p>
      <p className="text-sm text-gray-600">{score >= 6 ? 'Excellent ! Tu sais choisir tes produits 🏆' : 'Continue à pratiquer ! Relis le module pour affiner tes choix.'}</p>
      <button onClick={() => { setCurrent(0); setScore(0); setFeedback(null); setDone(false); }} className="mt-4 bg-purple-600 text-white font-bold px-5 py-2 rounded-xl text-sm">
        Rejouer
      </button>
    </div>
  );

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-[#1a2a4a] text-base">🏷️ Importer ou pas ?</h3>
        <span className="text-xs text-purple-600 font-bold">{current + 1}/{PRODUCTS.length}</span>
      </div>
      <div className="bg-white rounded-xl p-4 text-center">
        <p className="text-4xl mb-2">{p.name.split(' ')[0]}</p>
        <p className="font-semibold text-[#1a2a4a]">{p.name.slice(p.name.indexOf(' ') + 1)}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => choose(true)} className={`py-3 rounded-xl font-bold text-sm transition-all
          ${feedback ? (p.shouldImport ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400') : 'bg-green-100 text-green-700 hover:bg-green-200'}`}>
          ✅ Importer
        </button>
        <button onClick={() => choose(false)} className={`py-3 rounded-xl font-bold text-sm transition-all
          ${feedback ? (!p.shouldImport ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-400') : 'bg-red-100 text-red-700 hover:bg-red-200'}`}>
          ❌ Éviter
        </button>
      </div>
      {feedback && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl p-3 text-sm ${feedback.correct ? 'bg-green-50 text-green-800' : 'bg-orange-50 text-orange-800'}`}>
          <p className="font-semibold">{feedback.correct ? '✅ Bonne réponse !' : '❌ Pas tout à fait...'}</p>
          <p>{feedback.reason}</p>
          <button onClick={next} className="mt-2 bg-[#f2994a] text-white font-bold px-4 py-1.5 rounded-lg text-xs">
            {current + 1 < PRODUCTS.length ? 'Produit suivant →' : 'Voir mon score'}
          </button>
        </motion.div>
      )}
    </div>
  );
}

// ── Module 5 : Simulateur de marge ──────────────────────────────────────────

export function MarginSimulator() {
  const [buyPrice, setBuyPrice] = useState(2000);
  const [fees, setFees] = useState(500);
  const [sellPrice, setSellPrice] = useState(5000);

  const cost = buyPrice + fees;
  const profit = sellPrice - cost;
  const margin = sellPrice > 0 ? Math.round((profit / sellPrice) * 100) : 0;
  const profitColor = profit > 0 ? 'text-green-600' : 'text-red-500';

  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-5 space-y-4">
      <h3 className="font-bold text-[#1a2a4a] text-base">💰 Simulateur de marge</h3>
      <div className="space-y-3">
        {[
          { label: "Prix d'achat (Chine)", value: buyPrice, set: setBuyPrice, max: 50000 },

          { label: 'Frais (transport, douane, BP)', value: fees, set: setFees, max: 20000 },
          { label: 'Prix de vente local', value: sellPrice, set: setSellPrice, max: 100000 },
        ].map((f) => (
          <div key={f.label}>
            <label className="text-sm font-semibold text-gray-700">{f.label} : <span className="text-[#f2994a]">{f.value.toLocaleString()} FCFA</span></label>
            <input type="range" min={0} max={f.max} step={100} value={f.value} onChange={(e) => f.set(+e.target.value)} className="w-full accent-[#f2994a] mt-1" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-sm"><span className="text-gray-500">Coût total</span><span className="font-bold">{cost.toLocaleString()} FCFA</span></div>
        <div className="flex justify-between text-sm"><span className="text-gray-500">Prix de vente</span><span className="font-bold">{sellPrice.toLocaleString()} FCFA</span></div>
        <hr />
        <div className="flex justify-between"><span className="font-bold text-[#1a2a4a]">Benefice net</span><span className={`font-bold text-lg ${profitColor}`}>{profit > 0 ? "+" : ""}{profit.toLocaleString()} FCFA</span></div>
        <div className="flex justify-between"><span className="text-sm text-gray-500">Marge</span><span className={`font-semibold ${profitColor}`}>{margin}%</span></div>
      </div>
      {profit <= 0 && <p className="text-red-600 text-xs font-semibold">⚠️ Prix de vente trop bas -- tu perds de l&apos;argent !</p>}

      {profit > 0 && profit < cost * 0.2 && <p className="text-yellow-600 text-xs font-semibold">🟡 Marge faible -- essaie de negocier le prix ou d&apos;augmenter le prix de vente.</p>}
      {profit >= cost * 0.5 && <p className="text-green-600 text-xs font-semibold">🚀 Excellente marge ! Tu es sur la bonne voie.</p>}
    </div>
  );
}
