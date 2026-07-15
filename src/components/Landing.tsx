'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight, Package, ShoppingCart, CreditCard, Tag, TrendingUp,
  Star, CheckCircle, Users, Globe, Award, BookOpen, Zap, Shield
} from 'lucide-react';
import { GSLogo } from './Logo';

interface LandingProps {
  onStart: () => void;
}

const MODULES_PREVIEW = [
  { icon: CreditCard, num: '01', title: 'Les indispensables', desc: 'Carte bancaire, boîte postale, budget de départ', color: '#3b82f6' },
  { icon: ShoppingCart, num: '02', title: 'Sur quels sites acheter', desc: 'AliExpress vs Alibaba — la bonne plateforme', color: '#f97316' },
  { icon: Package, num: '03', title: 'Délais & transit', desc: 'Livraison, douane, transitaires, calcul CBM', color: '#10b981' },
  { icon: Tag, num: '04', title: 'Quels produits importer', desc: 'Gagnants, perdants, produits interdits', color: '#8b5cf6' },
  { icon: TrendingUp, num: '05', title: 'Vendre vos produits', desc: 'Facebook, WhatsApp, grossiste vs détaillant', color: '#ef4444' },
];

const FEATURES = [
  { icon: Zap, title: '6 simulateurs interactifs', desc: 'Budget, taxes, CBM, marge, quiz de mise en situation…' },
  { icon: Award, title: 'Badges & XP par module', desc: 'Progression gamifiée, certificat PDF à télécharger' },
  { icon: Shield, title: '100% privé, 0 serveur', desc: 'Toutes vos données restent sur votre téléphone' },
  { icon: Globe, title: 'Adapté à l\'Afrique de l\'Ouest', desc: 'Burkina Faso, Côte d\'Ivoire, Sénégal, FCFA, UEMOA' },
];

const STATS = [
  { value: '5', label: 'Modules complets', icon: BookOpen },
  { value: '15', label: 'Questions de quiz', icon: CheckCircle },
  { value: '6', label: 'Simulateurs', icon: Zap },
  { value: '100%', label: 'Gratuit', icon: Star },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="min-h-screen bg-[#fafaf8] overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{background: '#1e3a5f'}}>
        {/* Image de fond — porte-conteneurs réel */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://sspark.genspark.ai/cfimages?u1=L%2FKMMTbAhIte4Uz2mTRKSi5uDEyryEHdGMpvm7rdkWHMxpVcrEiM%2BDUrClYN9yIW1KJpn5EvG8Bh0wdArzC0dg9orImYE%2Fhf8EN4AtONMw%3D%3D&u2=itr1%2FK2AcgbnUxyY&width=2560"
            alt="Porte-conteneurs fret maritime international"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 60%' }}
            unoptimized
            priority
          />
          {/* Overlay navy fort pour lisibilité texte */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, rgba(30,58,95,0.92) 0%, rgba(45,82,130,0.85) 60%, rgba(30,58,95,0.90) 100%)'
          }} />
          {/* Vague décorative bas */}
          <svg className="absolute bottom-0 left-0 w-full" height="80" viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0 80 L1440 80 L1440 20 Q720 80 0 20 Z" fill="#f8f7f4" />
          </svg>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="text-white"
            >
              <motion.div variants={fadeUp} custom={0}>
                <span className="inline-flex items-center gap-2 bg-[#f6932a]/20 text-[#f6932a] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#f6932a]/30 mb-6">
                  <Star size={11} fill="currentColor" />
                  Formation e-commerce — Afrique de l&apos;Ouest
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-white mb-5"
              >
                Commander depuis la Chine,{' '}
                <span className="text-[#f6932a]">Vendre en Afrique</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-base sm:text-lg leading-relaxed mb-8 max-w-md" style={{color:'rgba(255,255,255,0.88)'}}
              >
                La formation complète pour importer depuis AliExpress et Alibaba et revendre 
                vos produits au Burkina Faso et en Afrique de l&apos;Ouest. Adapté au smartphone. 100% gratuit.
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onStart}
                  className="btn-primary text-base px-8 py-4 shadow-xl"
                  aria-label="Commencer la formation gratuitement"
                >
                  Commencer gratuitement
                  <ArrowRight size={18} />
                </button>
                <div className="flex items-center gap-2 text-sm" style={{color:'rgba(255,255,255,0.85)'}}>
                  <CheckCircle size={15} className="text-[#f6932a] shrink-0" />
                  <span>Aucun compte requis</span>
                </div>
              </motion.div>

              {/* Social proof */}
              <motion.div variants={fadeUp} custom={4} className="flex items-center gap-4 mt-8">
                <div className="flex -space-x-2">
                  {['S','K','A','M'].map((l, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f6932a] to-[#d97a1a] border-2 border-[#1e3a5f] flex items-center justify-center text-xs font-bold text-white"
                    >
                      {l}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex">
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#f6932a" color="#f6932a" />)}
                  </div>
                  <p className="text-xs mt-0.5" style={{color:'rgba(255,255,255,0.75)'}}>+200 apprenants actifs</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Visual card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="hidden md:block"
            >
              <div className="relative">
                {/* Main card */}
                <div className="bg-white rounded-2xl shadow-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-5">
                    <GSLogo size={42} />
                    <div>
                      <p className="font-bold text-[#1e3a5f] text-sm">Le Guide de Samuel</p>
                      <p className="text-xs text-gray-400">Formation complète</p>
                    </div>
                    <span className="ml-auto badge-green">Gratuit</span>
                  </div>
                  {/* Module progress bars */}
                  {MODULES_PREVIEW.map((m, i) => (
                    <div key={m.num} className="flex items-center gap-3 mb-3">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `${m.color}15` }}
                      >
                        <m.icon size={14} style={{ color: m.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-700 truncate">{m.title}</p>
                        <div className="progress-bar mt-1">
                          <div className="progress-fill" style={{ width: `${(i < 2 ? (i+1)*50 : 0)}%` }} />
                        </div>
                      </div>
                      <span className="text-xs shrink-0">
                        {i < 2
                          ? <CheckCircle size={13} className="text-green-500" />
                          : <span className="text-gray-300">·</span>
                        }
                      </span>
                    </div>
                  ))}
                  <div className="mt-4 p-3 bg-[#fef3e8] rounded-xl border border-[#f6932a]/20">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 font-medium">Progression totale</span>
                      <span className="text-xs font-bold text-[#f6932a]">200 XP</span>
                    </div>
                    <div className="progress-bar mt-2">
                      <div className="progress-fill" style={{ width: '40%' }} />
                    </div>
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-[#f6932a] text-white rounded-2xl px-3 py-2 shadow-lg rotate-3 flex items-center gap-1.5">
                  <Award size={13} className="text-white" />
                  <p className="text-xs font-bold">Certificat PDF</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section className="py-10 bg-white border-b border-gray-100" aria-label="Statistiques">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {STATS.map(({ value, label, icon: Icon }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-[#fef3e8] flex items-center justify-center mx-auto mb-2">
                  <Icon size={18} className="text-[#f6932a]" />
                </div>
                <p className="text-2xl font-extrabold text-[#1e3a5f]">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MODULES PREVIEW ───────────────────────────────────────── */}
      <section className="py-16 bg-[#fafaf8]" aria-labelledby="modules-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-10">
              <span className="badge-orange text-xs mb-3">5 modules progressifs</span>
              <h2 id="modules-heading" className="text-2xl sm:text-3xl font-extrabold text-[#1e3a5f] mt-2">
                Tout ce qu&apos;il faut savoir pour démarrer
              </h2>
              <p className="text-gray-500 mt-2 text-sm max-w-lg mx-auto">
                Du premier achat sur AliExpress à la vente de vos produits au Burkina Faso — 
                un parcours complet, étape par étape.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {MODULES_PREVIEW.map((m, i) => (
                <motion.div
                  key={m.num}
                  variants={fadeUp}
                  custom={i}
                  className="card card-interactive p-5 group cursor-pointer"
                  onClick={onStart}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onStart()}
                  aria-label={`Module ${m.num}: ${m.title}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                      style={{ background: `${m.color}15` }}
                    >
                      <m.icon size={18} style={{ color: m.color }} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Module {m.num}</span>
                      <h3 className="text-sm font-bold text-[#1e3a5f] leading-tight mt-0.5">{m.title}</h3>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <span className="badge-navy text-[10px]">+100 XP</span>
                    <ArrowRight size={14} className="text-[#f6932a] transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.div>
              ))}

              {/* CTA card */}
              <motion.div
                variants={fadeUp}
                custom={5}
                className="sm:col-span-2 lg:col-span-1 rounded-2xl p-5 flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow"
                style={{background:'linear-gradient(135deg, #1e3a5f 0%, #2d5282 100%)'}}
                onClick={onStart}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onStart()}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#f6932a] flex items-center justify-center mb-3">
                    <Award size={18} className="text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-white leading-tight">Certificat de formation</h3>
                  <p className="text-xs mt-1 leading-relaxed" style={{color:'rgba(255,255,255,0.85)'}}>
                    Téléchargez votre certificat PDF après avoir terminé les 5 modules.
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-4 text-[#f6932a] text-xs font-semibold">
                  <span>Commencer la formation</span>
                  <ArrowRight size={13} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────── */}
      <section className="py-14 bg-white border-t border-gray-100" aria-labelledby="features-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-10">
              <h2 id="features-heading" className="text-2xl sm:text-3xl font-extrabold text-[#1e3a5f]">
                Pourquoi Le Guide de Samuel ?
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                Conçu spécifiquement pour les entrepreneurs d&apos;Afrique de l&apos;Ouest
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {FEATURES.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  custom={i}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#f6932a]/30 hover:bg-[#fef3e8]/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1e3a5f] flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-[#f6932a]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1e3a5f] text-sm">{title}</h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────── */}
      <section className="py-16" style={{background:'linear-gradient(135deg, #1e3a5f 0%, #2d5282 60%, #1e3a5f 100%)'}} aria-labelledby="cta-heading">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <div className="w-16 h-16 rounded-2xl bg-[#f6932a] flex items-center justify-center mx-auto mb-5 shadow-lg">
                <Users size={28} className="text-white" />
              </div>
              <h2 id="cta-heading" className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Prêt à vous lancer ?
              </h2>
              <p className="mb-7 text-sm leading-relaxed" style={{color:'rgba(255,255,255,0.88)'}}>
                Rejoignez les apprenants qui ont transformé leur business grâce à l&apos;import depuis la Chine. 
                Formation 100% gratuite, en français, sur mobile.
              </p>
              <button
                onClick={onStart}
                className="btn-primary text-base px-10 py-4 shadow-xl mx-auto"
                aria-label="Commencer la formation"
              >
                Démarrer la formation
                <ArrowRight size={18} />
              </button>
              <p className="text-xs mt-4" style={{color:'rgba(255,255,255,0.70)'}}>
                Sans inscription · Sans email · Vos données restent sur votre appareil
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
