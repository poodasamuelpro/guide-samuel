'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Tag, Trophy, Ban,
  CheckCircle, AlertTriangle, Info, Lightbulb,
  Package, Smartphone, Shirt, Wrench, Zap,
  ThumbsUp, ThumbsDown, RotateCcw, Star
} from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';
import { SortingGame } from '@/components/Simulators';
import IllustrationBanner from '@/components/IllustrationBanner';

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

// ─── SWIPE CARD GAME ──────────────────────────────────────────────────────────
const SWIPE_CARDS = [
  { id: 1, product: 'Écouteurs Bluetooth sans fil', emoji: '🎧', shouldImport: true, reason: 'Léger, forte demande, non fabriqué localement — excellent choix !' },
  { id: 2, product: 'Sacs de ciment 50kg', emoji: '🧱', shouldImport: false, reason: 'Trop lourd = fret ruineux. Fabriqué localement. Marge quasi nulle.' },
  { id: 3, product: 'Chargeurs rapides USB-C', emoji: '🔌', shouldImport: true, reason: 'Petit, léger, demande croissante avec les smartphones. Bonne marge.' },
  { id: 4, product: 'Répliques de montres de luxe', emoji: '⌚', shouldImport: false, reason: 'Contrefaçon = saisie douanière + poursuites pénales. Risque maximal !' },
  { id: 5, product: 'Bijoux fantaisie colorés', emoji: '💍', shouldImport: true, reason: 'Ultra léger, marge x3 à x5, très demandé — idéal pour débuter !' },
  { id: 6, product: 'Médicaments sans ordonnance', emoji: '💊', shouldImport: false, reason: 'Interdit sans licence pharmaceutique. Très risqué légalement.' },
  { id: 7, product: 'Jouets éducatifs pour enfants', emoji: '🧩', shouldImport: true, reason: 'Demande forte, facile à transporter, marges intéressantes.' },
  { id: 8, product: 'Armes et répliques d\'armes', emoji: '🔫', shouldImport: false, reason: 'Absolument interdit à l\'importation. Risque pénal majeur.' },
  { id: 9, product: 'Coques de téléphone personnalisées', emoji: '📱', shouldImport: true, reason: 'Très léger, prix d\'achat bas, personnalisable. Parfait pour débuter.' },
  { id: 10, product: 'Savon et produits de nettoyage locaux', emoji: '🧼', shouldImport: false, reason: 'Fabriqué localement et trop lourd/volumineux. Pas rentable.' },
];

function SwipeCardGame() {
  const [current, setCurrent] = useState(0);
  const [results, setResults] = useState<{ id: number; correct: boolean; direction: 'left' | 'right' }[]>([]);
  const [lastResult, setLastResult] = useState<{ correct: boolean; text: string } | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  // Color overlay transforms
  const greenOpacity = useTransform(x, [0, 100], [0, 0.8]);
  const redOpacity = useTransform(x, [-100, 0], [0.8, 0]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 80;
    if (Math.abs(info.offset.x) < threshold) return;

    const direction = info.offset.x > 0 ? 'right' : 'left';
    const card = SWIPE_CARDS[current];
    const correct = (direction === 'right' && card.shouldImport) || (direction === 'left' && !card.shouldImport);

    setLastResult({ correct, text: card.reason });
    setResults(prev => [...prev, { id: card.id, correct, direction }]);

    setTimeout(() => {
      setLastResult(null);
      const next = current + 1;
      if (next >= SWIPE_CARDS.length) {
        setGameOver(true);
      } else {
        setCurrent(next);
      }
      x.set(0);
    }, 1400);
  };

  const reset = () => {
    setCurrent(0);
    setResults([]);
    setLastResult(null);
    setGameOver(false);
    x.set(0);
  };

  const score = results.filter(r => r.correct).length;
  const card = SWIPE_CARDS[current];

  return (
    <div className="card p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <Tag size={18} className="text-purple-600" />
        <h2 className="text-base font-bold text-[#073b4c]">Jeu : Importer ou pas ?</h2>
      </div>
      <p className="text-xs text-gray-500 mb-5">
        Glisse la carte à droite si tu importerais ce produit, à gauche si non !
      </p>

      {/* Instructions */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 border border-red-200">
          <ThumbsDown size={16} className="text-red-500" />
          <div>
            <p className="text-xs font-bold text-red-700">Gauche</p>
            <p className="text-[10px] text-red-500">À éviter</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-green-50 border border-green-200">
          <ThumbsUp size={16} className="text-green-500" />
          <div>
            <p className="text-xs font-bold text-green-700">Droite</p>
            <p className="text-[10px] text-green-500">J&apos;importe !</p>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-5">
        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#8bd346] rounded-full"
            animate={{ width: `${(results.length / SWIPE_CARDS.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="text-xs font-bold text-gray-500">{results.length}/{SWIPE_CARDS.length}</span>
      </div>

      {!gameOver ? (
        <>
          {/* Card stack */}
          <div className="relative h-52 mb-5" style={{ touchAction: 'none' }}>
            {/* Background cards */}
            {SWIPE_CARDS.slice(current + 1, current + 3).reverse().map((c, i) => (
              <div
                key={c.id}
                className="absolute inset-0 rounded-2xl bg-gray-100 border-2 border-gray-200"
                style={{ transform: `scale(${0.95 - i * 0.03}) translateY(${(i + 1) * 6}px)`, zIndex: -i }}
              />
            ))}

            {/* Active card */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              style={{ x, rotate, opacity }}
              className="absolute inset-0 rounded-2xl bg-white border-2 border-purple-200 flex flex-col items-center justify-center p-6 cursor-grab active:cursor-grabbing shadow-xl"
              whileHover={{ boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
            >
              {/* Green overlay */}
              <motion.div
                style={{ opacity: greenOpacity }}
                className="absolute inset-0 rounded-2xl bg-green-400 flex items-center justify-center"
              >
                <ThumbsUp size={48} className="text-white" />
              </motion.div>

              {/* Red overlay */}
              <motion.div
                style={{ opacity: redOpacity }}
                className="absolute inset-0 rounded-2xl bg-red-400 flex items-center justify-center"
              >
                <ThumbsDown size={48} className="text-white" />
              </motion.div>

              {/* Card content */}
              <div className="relative z-10 text-center">
                <div className="text-5xl mb-3">{card.emoji}</div>
                <p className="text-sm font-bold text-[#073b4c] leading-tight">{card.product}</p>
                <p className="text-[10px] text-gray-400 mt-2">Carte {current + 1} sur {SWIPE_CARDS.length}</p>
              </div>
            </motion.div>
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {lastResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-3 rounded-xl mb-4 ${lastResult.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
              >
                <div className="flex items-start gap-2">
                  {lastResult.correct
                    ? <CheckCircle size={14} className="text-green-600 shrink-0 mt-0.5" />
                    : <AlertTriangle size={14} className="text-red-500 shrink-0 mt-0.5" />
                  }
                  <p className={`text-xs leading-relaxed ${lastResult.correct ? 'text-green-700' : 'text-red-700'}`}>
                    <strong>{lastResult.correct ? 'Bonne réponse !' : 'Raté !'}</strong> {lastResult.text}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button controls (mobile fallback) */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                const ev = { offset: { x: -200, y: 0 }, delta: { x: -200, y: 0 }, point: { x: 0, y: 0 }, velocity: { x: -1, y: 0 } } as unknown as PanInfo;
                handleDragEnd(null, ev);
              }}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-100 text-red-700 text-sm font-bold hover:bg-red-200 transition-colors"
            >
              <ThumbsDown size={15} /> Éviter
            </button>
            <button
              onClick={() => {
                const ev = { offset: { x: 200, y: 0 }, delta: { x: 200, y: 0 }, point: { x: 0, y: 0 }, velocity: { x: 1, y: 0 } } as unknown as PanInfo;
                handleDragEnd(null, ev);
              }}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-100 text-green-700 text-sm font-bold hover:bg-green-200 transition-colors"
            >
              Importer <ThumbsUp size={15} />
            </button>
          </div>
        </>
      ) : (
        /* Game Over */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-4"
        >
          <div className="text-5xl mb-3">
            {score >= 8 ? '🏆' : score >= 5 ? '👍' : '📚'}
          </div>
          <p className="text-xl font-extrabold text-[#073b4c] mb-1">
            {score}/{SWIPE_CARDS.length} bonnes réponses
          </p>
          <p className="text-sm text-gray-500 mb-4">
            {score >= 8 ? 'Excellent ! Tu as l\'instinct d\'un importateur !' : score >= 5 ? 'Pas mal ! Relis les conseils pour progresser.' : 'Continue à apprendre, tu vas y arriver !'}
          </p>

          {/* Score bars */}
          <div className="grid grid-cols-10 gap-1 mb-5">
            {results.map((r, i) => (
              <div
                key={i}
                className={`h-3 rounded-full ${r.correct ? 'bg-green-400' : 'bg-red-300'}`}
              />
            ))}
          </div>

          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#073b4c] text-white text-sm font-bold hover:bg-[#0b87ab] transition-colors mx-auto"
          >
            <RotateCcw size={15} /> Rejouer
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default function Module4({ onStartQuiz, onBack }: Props) {
  const [activeTab, setActiveTab] = useState<'content' | 'game'>('content');

  return (
    <div className="min-h-screen bg-[#f5faf9]">
      <div className="bg-[#073b4c] pt-6 pb-8">
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
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center shrink-0">
              <Tag size={22} className="text-purple-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#8bd346] uppercase tracking-widest">Module 04</p>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">Quels produits importer</h1>
            </div>
          </motion.div>
          <div className="flex gap-2 mt-5">
            {(['content', 'game'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all min-h-0 ${
                  activeTab === tab ? 'bg-[#8bd346] text-[#073b4c] font-bold' : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {tab === 'content' ? 'Contenu' : 'Jeu de tri'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'content' ? (
          <div className="space-y-6">
            <ScrollSection>
              <VideoPlayer envKey="NEXT_PUBLIC_VIDEO_MODULE_4" />
            </ScrollSection>

            {/* Illustration réelle — entrepôt / sélection produits */}
            <ScrollSection delay={0.02}>
              <IllustrationBanner moduleKey="mod4" />
            </ScrollSection>

            {/* SWIPE GAME — star of module 4 */}
            <ScrollSection delay={0.05}>
              <SwipeCardGame />
            </ScrollSection>

            {/* Winning categories */}
            <ScrollSection delay={0.05}>
              <div className="card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy size={18} className="text-yellow-500" />
                  <h2 className="text-base font-bold text-[#073b4c]">Les 3 types de produits gagnants</h2>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      num: '01', icon: Smartphone, color: 'blue',
                      title: 'Non fabriqués localement',
                      desc: 'Accessoires tech, gadgets électroniques, articles innovants. Pas de concurrent local = position unique.',
                      examples: ['Écouteurs sans fil', 'Chargeurs rapides', 'Gadgets de cuisine', 'Coques personnalisées'],
                    },
                    {
                      num: '02', icon: Package, color: 'green',
                      title: 'Légers à forte valeur ajoutée',
                      desc: 'Le fret est calculé au poids. Léger + bonne marge = rentabilité maximale.',
                      examples: ['Bijoux fantaisie', 'Cosmétiques', 'Papeterie créative', 'Jouets éducatifs'],
                    },
                    {
                      num: '03', icon: Shirt, color: 'purple',
                      title: 'Forte demande locale non satisfaite',
                      desc: 'Identifiez les besoins de votre entourage. Ce qu\'ils cherchent sans trouver, c\'est votre opportunité.',
                      examples: ['Articles scolaires', 'Équipements sportifs', 'Décoration intérieure', 'Outillage léger'],
                    },
                  ].map(({ num, icon: Icon, color, title, desc, examples }) => (
                    <motion.div
                      key={num}
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                      className={`rounded-xl bg-${color}-50 border border-${color}-200 p-4`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-8 h-8 rounded-lg bg-${color}-600 flex items-center justify-center shrink-0`}>
                          <span className="text-xs font-extrabold text-white">{num}</span>
                        </div>
                        <Icon size={16} className={`text-${color}-600`} />
                        <p className={`font-bold text-${color}-900 text-sm`}>{title}</p>
                      </div>
                      <p className={`text-xs text-${color}-800 leading-relaxed mb-3`}>{desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {examples.map((ex) => (
                          <span key={ex} className={`text-[10px] px-2 py-0.5 rounded-full bg-white border border-${color}-200 text-${color}-700 font-medium`}>
                            {ex}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollSection>

            {/* Products to avoid */}
            <ScrollSection delay={0.05}>
              <div className="card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Ban size={18} className="text-red-500" />
                  <h2 className="text-base font-bold text-[#073b4c]">Produits à éviter absolument</h2>
                </div>
                <p className="text-gray-500 text-xs mb-4">
                  Basé sur la réglementation douanière du Burkina Faso et zone UEMOA/CEDEAO. Liste non exhaustive.
                </p>
                <div className="space-y-2">
                  {[
                    { icon: Ban, title: 'Contrefaçons de marques', desc: 'Risque de saisie douanière + poursuites pénales. Tolérance zéro.', level: 'danger' },
                    { icon: Ban, title: 'Armes, munitions et répliques', desc: 'Strictement interdites sans autorisation ministérielle.', level: 'danger' },
                    { icon: Ban, title: 'Médicaments sans autorisation', desc: 'Nécessite une licence pharmaceutique (Ministère de la Santé).', level: 'danger' },
                    { icon: AlertTriangle, title: 'Alcools titrant > 45°', desc: 'Restrictions strictes d\'importation.', level: 'warning' },
                    { icon: AlertTriangle, title: 'Produits alimentaires périssables', desc: 'Contrôles phytosanitaires obligatoires, réglementations strictes.', level: 'warning' },
                    { icon: AlertTriangle, title: 'Produits lourds fabriqués localement', desc: 'Ciment, eau, savon, sucre — marge nulle à cause du poids.', level: 'warning' },
                    { icon: Info, title: 'Batteries lithium seules', desc: 'Interdites en fret aérien standard. Intégrées dans les appareils seulement.', level: 'info' },
                  ].map(({ icon: Icon, title, desc, level }) => (
                    <motion.div
                      key={title}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      className={`flex items-start gap-3 p-3 rounded-xl border ${
                        level === 'danger' ? 'bg-red-50 border-red-200' :
                        level === 'warning' ? 'bg-orange-50 border-orange-200' :
                        'bg-blue-50 border-blue-200'
                      }`}
                    >
                      <Icon size={14} className={`shrink-0 mt-0.5 ${
                        level === 'danger' ? 'text-red-500' :
                        level === 'warning' ? 'text-orange-500' :
                        'text-blue-500'
                      }`} />
                      <div>
                        <p className={`text-xs font-bold ${level === 'danger' ? 'text-red-800' : level === 'warning' ? 'text-orange-800' : 'text-blue-800'}`}>
                          {title}
                        </p>
                        <p className={`text-[11px] mt-0.5 leading-relaxed ${level === 'danger' ? 'text-red-700' : level === 'warning' ? 'text-orange-700' : 'text-blue-700'}`}>
                          {desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollSection>

            {/* Validation method */}
            <ScrollSection delay={0.05}>
              <div className="tip-box">
                <div className="flex items-start gap-2">
                  <Lightbulb size={15} className="text-[#8bd346] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-[#073b4c] mb-2">La méthode pour valider un produit</p>
                    <ul className="space-y-1.5 text-xs text-gray-700">
                      {[
                        'Est-ce que mes proches cherchent ce produit et ne le trouvent pas facilement ?',
                        'Y a-t-il un concurrent local qui vend ce produit à un prix similaire ou inférieur ?',
                        'Mon calcul : prix achat + fret + douane < prix de vente possible / 2 ?',
                        'Commandez 3-5 pièces test avant d\'investir dans un gros stock',
                      ].map((tip, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Star size={10} className="text-[#8bd346] shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollSection>

            {/* Products best-sellers */}
            <ScrollSection delay={0.05}>
              <div className="rounded-xl bg-[#073b4c] p-5 text-white">
                <p className="text-xs font-bold text-[#8bd346] uppercase tracking-widest mb-3">Produits populaires Burkina Faso 2025</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { name: 'Chargeurs solaires', emoji: '☀️', hot: true },
                    { name: 'Perruques synthétiques', emoji: '💇', hot: true },
                    { name: 'Gadgets cuisine', emoji: '🍳', hot: false },
                    { name: 'Accessoires bébé', emoji: '👶', hot: true },
                    { name: 'Montres connectées', emoji: '⌚', hot: false },
                    { name: 'Sacs à dos', emoji: '🎒', hot: false },
                  ].map(({ name, emoji, hot }) => (
                    <div key={name} className="flex items-center gap-2 p-2 rounded-xl bg-white/10">
                      <span className="text-lg">{emoji}</span>
                      <div>
                        <p className="text-[11px] font-bold text-white leading-tight">{name}</p>
                        {hot && <span className="text-[9px] text-[#8bd346]">Tendance</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollSection>

            <ScrollSection delay={0.05}>
              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => setActiveTab('game')} className="btn-secondary flex-1">
                  <Tag size={17} /> Jeu &quot;Importer ou pas ?&quot;
                </button>
                <button onClick={onStartQuiz} className="btn-primary flex-1">
                  Quiz du module <ArrowRight size={17} />
                </button>
              </div>
            </ScrollSection>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="mb-4">
              <button onClick={() => setActiveTab('content')} className="text-sm text-gray-500 hover:text-[#073b4c] flex items-center gap-1 min-h-0 p-0 bg-transparent border-none">
                <ArrowLeft size={13} /> Retour au contenu
              </button>
            </div>
            <SortingGame />
            <div className="mt-6">
              <button onClick={onStartQuiz} className="btn-primary w-full">
                <Zap size={17} /> Passer le quiz officiel du module 4 <ArrowRight size={17} />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
