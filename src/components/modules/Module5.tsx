'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, TrendingUp, ShoppingCart, Store,
  Smartphone, MessageCircle, Users, Camera, Package,
  Star, BarChart, CheckCircle, AlertTriangle, Info, Lightbulb, Zap,
  RefreshCw, TrendingDown
} from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';
import { MarginSimulator } from '@/components/Simulators';

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

// ─── LIVE MARGIN CHART ────────────────────────────────────────────────────────
function LiveMarginChart() {
  const [buyPrice, setBuyPrice] = useState(2000);
  const [freight, setFreight] = useState(1500);
  const [customs, setCustoms] = useState(0);
  const [sellPrice, setSellPrice] = useState(8000);
  const [qty, setQty] = useState(10);
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) setTimeout(() => setAnimated(true), 300);
  }, [inView]);

  const totalCost = buyPrice + freight + customs;
  const marginPerUnit = sellPrice - totalCost;
  const marginPct = totalCost > 0 ? Math.round((marginPerUnit / sellPrice) * 100) : 0;
  const totalProfit = marginPerUnit * qty;
  const roi = totalCost > 0 ? Math.round((marginPerUnit / totalCost) * 100) : 0;

  const isGood = marginPct >= 40;
  const isOk = marginPct >= 20 && marginPct < 40;
  const isBad = marginPct < 20;

  const barData = [
    { label: 'Achat', value: buyPrice, color: '#6366f1', emoji: '🛒' },
    { label: 'Fret', value: freight, color: '#f59e0b', emoji: '✈️' },
    { label: 'Douane', value: customs, color: '#94a3b8', emoji: '📋' },
    { label: 'Marge', value: Math.max(0, marginPerUnit), color: isGood ? '#22c55e' : isOk ? '#f59e0b' : '#ef4444', emoji: '💰' },
  ];
  const maxVal = Math.max(...barData.map(b => b.value), 1);

  const presets = [
    { name: 'Écouteurs', buy: 1500, freight: 1200, customs: 0, sell: 6000, qty: 20 },
    { name: 'Bijoux', buy: 500, freight: 800, customs: 0, sell: 3500, qty: 50 },
    { name: 'Chargeur', buy: 800, freight: 1000, customs: 0, sell: 4000, qty: 30 },
  ];

  return (
    <div ref={ref} className="card p-6 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <BarChart size={18} className="text-[#f2994a]" />
          <h2 className="text-base font-bold text-[#1a2a4a]">Calculateur de marge en temps réel</h2>
        </div>
        <AnimatePresence>
          {isGood && animated && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-bold"
            >
              Rentable !
            </motion.span>
          )}
          {isBad && animated && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full font-bold"
            >
              Marge faible
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <p className="text-xs text-gray-500 mb-5">Ajuste les valeurs — le graphique se met à jour en direct</p>

      {/* Presets */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {presets.map((p) => (
          <button
            key={p.name}
            onClick={() => { setBuyPrice(p.buy); setFreight(p.freight); setCustoms(p.customs); setSellPrice(p.sell); setQty(p.qty); }}
            className="px-3 py-1.5 rounded-full text-xs font-semibold border border-gray-200 text-gray-600 hover:border-[#f2994a] hover:text-[#f2994a] transition-all"
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Bar chart */}
      <div className="mb-5">
        <div className="flex items-end gap-3 h-36 mb-1">
          {barData.map(({ label, value, color, emoji }) => {
            const heightPct = (value / maxVal) * 100;
            return (
              <div key={label} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  className="text-[10px] font-bold text-gray-600 mb-0.5"
                  animate={{ opacity: 1 }}
                >
                  {value.toLocaleString()}
                </motion.div>
                <div className="w-full relative flex items-end" style={{ height: '100px' }}>
                  <motion.div
                    animate={{ height: animated ? `${Math.max(heightPct, 3)}%` : '3%' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    className="w-full rounded-t-lg"
                    style={{ backgroundColor: color, minHeight: 4 }}
                  />
                </div>
                <span className="text-[10px] text-gray-500">{emoji}</span>
                <span className="text-[9px] text-gray-400 text-center leading-tight">{label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
        {[
          { label: 'Prix de revient', value: `${totalCost.toLocaleString()} FCFA`, color: 'blue' },
          { label: 'Marge/pièce', value: `${marginPerUnit.toLocaleString()} FCFA`, color: marginPerUnit > 0 ? 'green' : 'red' },
          { label: 'Marge %', value: `${marginPct}%`, color: isGood ? 'green' : isOk ? 'orange' : 'red' },
          { label: `Profit total (×${qty})`, value: `${totalProfit.toLocaleString()} FCFA`, color: totalProfit > 0 ? 'green' : 'red' },
        ].map(({ label, value, color }) => (
          <motion.div
            key={label}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 0.3 }}
            className={`p-2 rounded-xl text-center border ${
              color === 'green' ? 'bg-green-50 border-green-200' :
              color === 'red' ? 'bg-red-50 border-red-200' :
              color === 'orange' ? 'bg-orange-50 border-orange-200' :
              'bg-blue-50 border-blue-200'
            }`}
          >
            <p className={`text-xs font-extrabold ${
              color === 'green' ? 'text-green-700' :
              color === 'red' ? 'text-red-600' :
              color === 'orange' ? 'text-orange-600' :
              'text-blue-700'
            }`}>{value}</p>
            <p className="text-[9px] text-gray-400 leading-tight mt-0.5">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* ROI */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-[#1a2a4a]/5 border border-[#1a2a4a]/10 mb-5">
        <TrendingUp size={14} className="text-[#1a2a4a] shrink-0" />
        <p className="text-xs text-[#1a2a4a]">
          <strong>ROI :</strong> Pour 1 FCFA investi, tu gagnes <strong className="text-[#f2994a]">{roi > 0 ? roi : 0}%</strong> de retour sur investissement
        </p>
      </div>

      {/* Inputs */}
      <div className="space-y-3">
        <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Ajuste les paramètres :</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: 'Prix d\'achat (FCFA)', value: buyPrice, setter: setBuyPrice, min: 100, max: 50000, step: 100 },
            { label: 'Fret / pièce (FCFA)', value: freight, setter: setFreight, min: 0, max: 20000, step: 100 },
            { label: 'Taxes douane / pièce (FCFA)', value: customs, setter: setCustoms, min: 0, max: 20000, step: 100 },
            { label: 'Prix de vente (FCFA)', value: sellPrice, setter: setSellPrice, min: 500, max: 100000, step: 100 },
          ].map(({ label, value, setter, min, max, step }) => (
            <div key={label}>
              <div className="flex justify-between mb-1">
                <label className="text-xs text-gray-600">{label}</label>
                <span className="text-xs font-bold text-[#1a2a4a]">{value.toLocaleString()} FCFA</span>
              </div>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => setter(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: '#f2994a' }}
              />
            </div>
          ))}
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs text-gray-600">Quantité commandée</label>
            <span className="text-xs font-bold text-[#1a2a4a]">{qty} pièces</span>
          </div>
          <input
            type="range"
            min={1}
            max={200}
            step={1}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: '#f2994a' }}
          />
        </div>
      </div>

      {/* Alert */}
      <AnimatePresence>
        {isBad && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2"
          >
            <TrendingDown size={14} className="text-red-500 shrink-0 mt-0.5" />
            <p className="text-xs text-red-700">Marge insuffisante (&lt;20%). Essaie d&apos;augmenter le prix de vente ou de réduire le fret.</p>
          </motion.div>
        )}
        {isGood && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-3 rounded-xl bg-green-50 border border-green-200 flex items-start gap-2"
          >
            <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />
            <p className="text-xs text-green-700">Excellente marge ({marginPct}%) ! Ce produit est rentable. Pense à commander un échantillon test.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Module5({ onStartQuiz, onBack }: Props) {
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
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center shrink-0">
              <TrendingUp size={22} className="text-red-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#f2994a] uppercase tracking-widest">Module 05</p>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">Comment vendre vos produits</h1>
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
                {tab === 'content' ? 'Contenu' : 'Simulateur de marge'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'content' ? (
          <div className="space-y-6">
            <ScrollSection>
              <VideoPlayer envKey="NEXT_PUBLIC_VIDEO_MODULE_5" />
            </ScrollSection>

            {/* LIVE CHART — star of module 5 */}
            <ScrollSection delay={0.05}>
              <LiveMarginChart />
            </ScrollSection>

            {/* Wholesale vs Retail */}
            <ScrollSection delay={0.05}>
              <div className="card p-6 shadow-sm">
                <h2 className="text-base font-bold text-[#1a2a4a] mb-3">Grossiste ou Détaillant ?</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Une fois vos produits reçus, deux grandes stratégies s&apos;offrent à vous. Choisissez 
                  selon votre stock et votre temps disponible.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }} className="card p-5 border-2 border-blue-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Users size={18} className="text-blue-600" />
                      <p className="font-bold text-[#1a2a4a] text-sm">Grossiste</p>
                    </div>
                    <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                      Vous vendez en volume à des détaillants.
                    </p>
                    <div className="rounded-lg bg-blue-50 p-3 mb-3 text-xs">
                      <p className="font-bold text-blue-800 mb-1">Exemple :</p>
                      <p className="text-blue-700">Achat 500 → Vente détaillants 800 → Ils revendent 1 200</p>
                    </div>
                    <ul className="space-y-1.5 text-xs text-gray-600">
                      {[['check', 'Écoulement rapide des stocks'], ['check', 'Moins de temps en vente'], ['warn', 'Marge unitaire plus faible'], ['warn', 'Dépend de quelques gros clients']].map(([type, text]) => (
                        <li key={text} className="flex items-start gap-2">
                          {type === 'check' ? <CheckCircle size={11} className="text-green-600 shrink-0 mt-0.5" /> : <AlertTriangle size={11} className="text-orange-500 shrink-0 mt-0.5" />}
                          <span>{text}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }} className="card p-5 border-2 border-green-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Store size={18} className="text-green-600" />
                      <p className="font-bold text-[#1a2a4a] text-sm">Détaillant direct</p>
                    </div>
                    <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                      Vous vendez directement au consommateur final.
                    </p>
                    <div className="rounded-lg bg-green-50 p-3 mb-3 text-xs">
                      <p className="font-bold text-green-800 mb-1">Exemple :</p>
                      <p className="text-green-700">Achat 500 → Vente directe 1 500 → Marge 3× supérieure</p>
                    </div>
                    <ul className="space-y-1.5 text-xs text-gray-600">
                      {[['check', 'Marge maximale par produit'], ['check', 'Relation directe avec les clients'], ['warn', 'Plus de temps en vente/SAV'], ['warn', 'Écoulement plus lent']].map(([type, text]) => (
                        <li key={text} className="flex items-start gap-2">
                          {type === 'check' ? <CheckCircle size={11} className="text-green-600 shrink-0 mt-0.5" /> : <AlertTriangle size={11} className="text-orange-500 shrink-0 mt-0.5" />}
                          <span>{text}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            </ScrollSection>

            {/* Selling channels */}
            <ScrollSection delay={0.05}>
              <div className="card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart size={18} className="text-[#f2994a]" />
                  <h2 className="text-base font-bold text-[#1a2a4a]">Les canaux de vente en Afrique de l&apos;Ouest (2025)</h2>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: Smartphone, name: 'Facebook Marketplace', reach: 'Très forte', cost: 'Gratuit', bestFor: 'Tout type de produit, large audience', recommended: true },
                    { icon: MessageCircle, name: 'WhatsApp Business', reach: 'Forte (réseau personnel)', cost: 'Gratuit', bestFor: 'Vente via bouche-à-oreille, clients fidèles', recommended: true },
                    { icon: ShoppingCart, name: 'Jumia Burkina Faso', reach: 'Modérée', cost: 'Commission sur vente', bestFor: 'Produits tech, mode — présence croissante', recommended: false },
                    { icon: Store, name: 'Boutique physique / marché', reach: 'Locale', cost: 'Loyer ou emplacement', bestFor: 'Produits qui nécessitent de voir/essayer', recommended: false },
                  ].map(({ icon: Icon, name, reach, cost, bestFor, recommended }) => (
                    <motion.div
                      key={name}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      className={`flex items-start gap-3 p-3 rounded-xl border ${recommended ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-100'}`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${recommended ? 'bg-green-200' : 'bg-gray-200'}`}>
                        <Icon size={15} className={recommended ? 'text-green-700' : 'text-gray-600'} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-xs font-bold text-[#1a2a4a]">{name}</p>
                          {recommended && <span className="badge-green text-[10px]">Recommandé</span>}
                        </div>
                        <div className="flex gap-3 mt-0.5 flex-wrap">
                          <span className="text-[10px] text-gray-500">Portée : {reach}</span>
                          <span className="text-[10px] text-gray-500">Coût : {cost}</span>
                        </div>
                        <p className="text-[11px] text-gray-600 mt-0.5">{bestFor}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollSection>

            {/* 6 tips */}
            <ScrollSection delay={0.05}>
              <div className="card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb size={18} className="text-[#f2994a]" />
                  <h2 className="text-base font-bold text-[#1a2a4a]">Les 6 clés pour vendre rapidement</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { icon: Camera, text: 'Photos de qualité : fond blanc, plusieurs angles, produit en contexte' },
                    { icon: MessageCircle, text: 'Description honnête : matière, dimensions, couleurs, délai de livraison' },
                    { icon: Package, text: 'Proposez la livraison locale : un gros différenciateur par rapport aux concurrents' },
                    { icon: Star, text: 'Demandez les avis clients : le bouche-à-oreille en ligne multiplie vos ventes' },
                    { icon: TrendingUp, text: 'Analysez ce qui marche : doublez la commande sur les articles best-sellers' },
                    { icon: Users, text: 'Créez un réseau de revendeurs : donnez une commission, ils vendent pour vous' },
                  ].map(({ icon: Icon, text }) => (
                    <motion.div
                      key={text}
                      whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
                      transition={{ duration: 0.2 }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#1a2a4a] flex items-center justify-center shrink-0">
                        <Icon size={13} className="text-[#f2994a]" />
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed">{text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollSection>

            {/* Pricing formula */}
            <ScrollSection delay={0.05}>
              <div className="card p-6 shadow-sm border-2 border-[#f2994a]/30">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart size={18} className="text-[#f2994a]" />
                  <h2 className="text-base font-bold text-[#1a2a4a]">La formule de prix de vente</h2>
                </div>
                <motion.div
                  animate={{ boxShadow: ['0 0 0 0 rgba(242,153,74,0)', '0 0 0 8px rgba(242,153,74,0.15)', '0 0 0 0 rgba(242,153,74,0)'] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="rounded-xl bg-[#1a2a4a] p-4 text-white text-center mb-4"
                >
                  <p className="text-sm font-bold text-white/70 mb-2">Prix de vente recommandé</p>
                  <p className="text-base font-extrabold text-[#f2994a]">
                    (Prix achat + Frais transit + Taxes) × 2 à 3
                  </p>
                </motion.div>
                <div className="text-xs text-gray-600 leading-relaxed">
                  <p className="mb-2 font-bold">Exemple concret :</p>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />Achat sur AliExpress : 2 000 FCFA/pièce</li>
                    <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />Fret aérien : 1 500 FCFA/pièce (estimatif)</li>
                    <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-gray-300 shrink-0" />Douane : 0 FCFA (petite quantité)</li>
                    <li className="flex items-center gap-2 font-bold text-[#1a2a4a]"><span className="w-2 h-2 rounded-full bg-[#1a2a4a] shrink-0" />Prix de revient total : 3 500 FCFA</li>
                    <li className="flex items-center gap-2 font-bold text-green-700"><span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />Prix de vente conseillé : 7 000 à 10 500 FCFA</li>
                    <li className="flex items-center gap-2 font-bold text-[#f2994a]"><span className="w-2 h-2 rounded-full bg-[#f2994a] shrink-0" />Marge nette : 3 500 à 7 000 FCFA/pièce</li>
                  </ul>
                </div>
              </div>
            </ScrollSection>

            {/* Tips */}
            <ScrollSection delay={0.05}>
              <div className="tip-box">
                <div className="flex items-start gap-2">
                  <Lightbulb size={15} className="text-[#f2994a] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-[#1a2a4a] mb-2">Les pièges à éviter quand on vend</p>
                    <ul className="space-y-1.5 text-xs text-gray-700">
                      {[
                        'Ne vendez pas avant d\'avoir reçu et inspecté votre commande',
                        'Évitez de promettre des délais que vous ne maîtrisez pas (fret variable)',
                        'Documentez chaque vente avec un reçu — même informel',
                        'Ne cédez pas au chantage : si un client n\'est pas satisfait, gérez le avec calme',
                      ].map((tip, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Info size={10} className="text-blue-500 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollSection>

            <ScrollSection delay={0.05}>
              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => setActiveTab('simulator')} className="btn-secondary flex-1">
                  <BarChart size={17} /> Simulateur de marge avancé
                </button>
                <button onClick={onStartQuiz} className="btn-primary flex-1">
                  Quiz du module 5 <ArrowRight size={17} />
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
