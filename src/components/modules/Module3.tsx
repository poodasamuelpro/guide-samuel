'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Package, Plane, Ship, Clock,
  Shield, CheckCircle, AlertTriangle, Info, Calculator,
  MapPin, TrendingDown, FileText, Zap
} from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';
import { TaxSimulator, LitigeTimeline, CBMCalculator } from '@/components/Simulators';

interface Props {
  onStartQuiz: () => void;
  onBack: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }),
};

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
      <div className="bg-[#1a2a4a] pt-6 pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-5 transition-colors min-h-0 p-0 bg-transparent border-none"
          >
            <ArrowLeft size={15} /> Retour
          </button>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center shrink-0">
              <Package size={22} className="text-green-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#f2994a] uppercase tracking-widest">Module 03</p>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">Délais, transit et douane</h1>
            </div>
          </div>
          <div className="flex gap-2 mt-5 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all min-h-0 ${
                  activeTab === tab.id ? 'bg-[#f2994a] text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'
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
          <motion.div initial="hidden" animate="visible" className="space-y-6">
            <VideoPlayer envKey="NEXT_PUBLIC_VIDEO_MODULE_3" />

            {/* Delivery times */}
            <motion.div variants={fadeUp} custom={0}>
              <div className="card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={18} className="text-green-600" />
                  <h2 className="text-base font-bold text-[#1a2a4a]">Délais de livraison depuis la Chine</h2>
                </div>
                <div className="space-y-3">
                  {[
                    { mode: 'DHL / FedEx / EMS Express', delay: '7 à 15 jours', cost: 'Élevé (15–30 $/kg)', icon: Plane, color: 'blue', recommended: false },
                    { mode: 'AliExpress Standard Shipping', delay: '20 à 45 jours', cost: 'Gratuit ou très faible', icon: Package, color: 'green', recommended: true },
                    { mode: 'ePacket (selon disponibilité)', delay: '15 à 30 jours', cost: 'Faible (1–5 $)', icon: Package, color: 'orange', recommended: false },
                    { mode: 'La Poste Chine (China Post)', delay: '30 à 60 jours', cost: 'Très faible ou gratuit', icon: Package, color: 'gray', recommended: false },
                  ].map(({ mode, delay, cost, icon: Icon, color, recommended }) => (
                    <div key={mode} className={`flex items-start gap-3 p-4 rounded-xl border ${
                      recommended ? 'border-green-200 bg-green-50' : 'border-gray-100 bg-gray-50'
                    }`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-${color}-100`}>
                        <Icon size={15} className={`text-${color}-600`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-bold text-[#1a2a4a]">{mode}</p>
                          {recommended && <span className="badge-green text-[10px]">Conseillé débutant</span>}
                        </div>
                        <div className="flex gap-4 mt-1 flex-wrap">
                          <span className="text-[11px] text-gray-500"><Clock size={10} className="inline mr-1" />{delay}</span>
                          <span className="text-[11px] text-gray-500"><TrendingDown size={10} className="inline mr-1" />{cost}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Transit section — NEW CONTENT */}
            <motion.div variants={fadeUp} custom={1}>
              <div className="card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Plane size={18} className="text-[#f2994a]" />
                  <h2 className="text-base font-bold text-[#1a2a4a]">Fret via transitaire — Pour les grosses commandes</h2>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Pour les gros volumes (plusieurs kg à plusieurs centaines de kg), passer par 
                  un <strong>transitaire local</strong> est souvent plus économique que les 
                  livraisons intégrées AliExpress. Le transitaire gère l&apos;acheminement complet 
                  depuis la Chine jusqu&apos;à Ouagadougou.
                </p>

                {/* Route */}
                <div className="rounded-xl bg-[#fef3e8] border border-[#f2994a]/30 p-4 mb-5">
                  <p className="text-xs font-bold text-[#1a2a4a] mb-2 flex items-center gap-1.5">
                    <MapPin size={13} className="text-[#f2994a]" /> Route typique : Chine → Burkina Faso
                  </p>
                  <div className="flex items-center gap-2 flex-wrap text-xs text-gray-600">
                    {['Guangzhou / Shenzhen (Chine)', '→', 'Port d\'Abidjan ou Lomé ou Cotonou', '→', 'Ouagadougou (par route)'].map((step, i) => (
                      <span key={i} className={step === '→' ? 'text-[#f2994a] font-bold' : 'bg-white rounded-lg px-2 py-1 border border-gray-100'}>
                        {step}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Air vs Sea comparison */}
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Plane size={16} className="text-blue-600" />
                      <p className="font-bold text-blue-900 text-sm">Fret Aérien</p>
                    </div>
                    <ul className="space-y-1.5 text-xs text-gray-700">
                      <li className="flex items-start gap-1.5"><CheckCircle size={11} className="text-blue-500 shrink-0 mt-0.5" /><span>Délai : <strong>5 à 10 jours</strong> environ</span></li>
                      <li className="flex items-start gap-1.5"><CheckCircle size={11} className="text-blue-500 shrink-0 mt-0.5" /><span>Facturé au <strong>poids (kg)</strong></span></li>
                      <li className="flex items-start gap-1.5"><AlertTriangle size={11} className="text-orange-500 shrink-0 mt-0.5" /><span>Coût estimatif : <strong>9 000 à 13 000 FCFA/kg</strong>*</span></li>
                      <li className="flex items-start gap-1.5"><CheckCircle size={11} className="text-blue-500 shrink-0 mt-0.5" /><span>Idéal pour petits colis à haute valeur</span></li>
                    </ul>
                  </div>
                  <div className="rounded-xl bg-green-50 border border-green-200 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Ship size={16} className="text-green-600" />
                      <p className="font-bold text-green-900 text-sm">Fret Maritime / Groupage</p>
                    </div>
                    <ul className="space-y-1.5 text-xs text-gray-700">
                      <li className="flex items-start gap-1.5"><CheckCircle size={11} className="text-green-500 shrink-0 mt-0.5" /><span>Délai : <strong>45 à 90 jours</strong> (port + route)</span></li>
                      <li className="flex items-start gap-1.5"><CheckCircle size={11} className="text-green-500 shrink-0 mt-0.5" /><span>Facturé au <strong>volume (CBM)</strong></span></li>
                      <li className="flex items-start gap-1.5"><CheckCircle size={11} className="text-green-500 shrink-0 mt-0.5" /><span>Nettement plus économique pour les gros volumes</span></li>
                      <li className="flex items-start gap-1.5"><Info size={11} className="text-blue-500 shrink-0 mt-0.5" /><span>Idéal pour marchandises lourdes et volumineuses</span></li>
                    </ul>
                  </div>
                </div>

                <div className="warning-box">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={14} className="text-orange-500 shrink-0 mt-0.5" />
                    <div className="text-xs text-orange-800 leading-relaxed">
                      <p className="font-bold mb-1">Interdictions en fret aérien</p>
                      <p>Les colis contenant <strong>batteries au lithium</strong> (téléphones, accessoires), <strong>liquides</strong>, <strong>huiles</strong> ou <strong>poudres</strong> sont interdits ou fortement restreints. En fret maritime, des règles spéciales s&apos;appliquent également. Vérifiez toujours avec votre transitaire.</p>
                    </div>
                  </div>
                </div>

                <div className="tip-box mt-3">
                  <div className="flex items-start gap-2">
                    <Info size={14} className="text-[#f2994a] shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-700 leading-relaxed">
                      <strong>* Prix indicatifs seulement :</strong> Les tarifs aériens varient selon le transitaire, 
                      le volume, la période et le type de marchandise. Un tarif observé récemment : 
                      12 000 FCFA/kg (source : transitaire local, 2025). Demandez toujours plusieurs devis 
                      avant d&apos;engager un envoi.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CBM explanation */}
            <motion.div variants={fadeUp} custom={2}>
              <div className="card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Calculator size={18} className="text-purple-600" />
                  <h2 className="text-base font-bold text-[#1a2a4a]">Le CBM — Comment calculer le volume facturable</h2>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  En fret maritime, on facture au <strong>CBM (Cubic Meter / Mètre Cube)</strong>. 
                  C&apos;est le volume occupé par votre colis en m³.
                </p>
                <div className="rounded-xl bg-purple-50 border border-purple-200 p-4 mb-3">
                  <p className="text-sm font-bold text-purple-900 mb-2">Formule :</p>
                  <p className="text-lg font-extrabold text-purple-700 text-center my-3">
                    CBM = Longueur × Largeur × Hauteur (en mètres)
                  </p>
                  <p className="text-xs text-purple-700 text-center">
                    Exemple : 0.5m × 0.4m × 0.3m = <strong>0.06 CBM</strong>
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('cbm')}
                  className="btn-secondary w-full"
                >
                  <Calculator size={17} />
                  Ouvrir le calculateur CBM interactif
                </button>
              </div>
            </motion.div>

            {/* Customs */}
            <motion.div variants={fadeUp} custom={3}>
              <div className="card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <FileText size={18} className="text-[#1a2a4a]" />
                  <h2 className="text-base font-bold text-[#1a2a4a]">Douane et taxes — Zone UEMOA</h2>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Les marchandises importées en Afrique de l&apos;Ouest sont soumises au tarif 
                  extérieur commun (TEC) de la CEDEAO, appliqué par les douanes de chaque pays.
                </p>
                <div className="space-y-2 mb-4">
                  {[
                    { cat: 'Biens essentiels (médicaments, équipements agricoles)', rate: '0%', color: 'green' },
                    { cat: 'Matières premières, biens d\'équipement', rate: '5%', color: 'blue' },
                    { cat: 'Produits intermédiaires', rate: '10%', color: 'orange' },
                    { cat: 'Produits de consommation courante', rate: '20%', color: 'red' },
                  ].map(({ cat, rate, color }) => (
                    <div key={cat} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-xs text-gray-700 flex-1">{cat}</p>
                      <span className={`badge-${color === 'green' ? 'green' : color === 'blue' ? 'navy' : 'orange'} shrink-0 ml-2 font-bold`}>
                        {rate}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="info-box">
                  <div className="flex items-start gap-2">
                    <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-800 leading-relaxed">
                      <strong>En pratique pour les petits colis :</strong> Les colis personnels de faible valeur 
                      (moins de 10 pièces, valeur modeste) sont souvent laissés sans taxation à la douane. 
                      Mais cette pratique n&apos;est pas garantie et peut changer. Pour des envois importants, 
                      contactez la douane du Burkina Faso ou votre transitaire.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="flex flex-col sm:flex-row gap-3 flex-wrap">
              <button onClick={() => setActiveTab('tax')} className="btn-secondary flex-1">
                <FileText size={17} /> Simulateur taxes
              </button>
              <button onClick={() => setActiveTab('cbm')} className="btn-secondary flex-1">
                <Calculator size={17} /> Calculateur CBM
              </button>
              <button onClick={onStartQuiz} className="btn-primary flex-1">
                Quiz du module <ArrowRight size={17} />
              </button>
            </motion.div>
          </motion.div>
        ) : activeTab === 'tax' ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="mb-4">
              <button onClick={() => setActiveTab('content')} className="text-sm text-gray-500 hover:text-[#1a2a4a] flex items-center gap-1 min-h-0 p-0 bg-transparent border-none">
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
              <button onClick={() => setActiveTab('content')} className="text-sm text-gray-500 hover:text-[#1a2a4a] flex items-center gap-1 min-h-0 p-0 bg-transparent border-none">
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
              <button onClick={() => setActiveTab('content')} className="text-sm text-gray-500 hover:text-[#1a2a4a] flex items-center gap-1 min-h-0 p-0 bg-transparent border-none">
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
