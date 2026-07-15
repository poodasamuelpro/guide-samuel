# Le Guide de Samuel 🚀

Formation e-learning complète pour **importer depuis la Chine** et **vendre en Afrique de l'Ouest** (Burkina Faso / UEMOA).

🌐 **Live** → [guide-samuel.vercel.app](https://guide-samuel.vercel.app)

---

## ✨ Fonctionnalités

| Fonctionnalité | Détail |
|---|---|
| 📚 **5 modules** | Contenu vérifié et actualisé (UBA Africard, AliExpress, transit, TEC CEDEAO) |
| 🎮 **7 simulateurs** | BudgetSimulator, AlibabaAliexpressQuiz, TaxSimulator, CBMCalculator, LitigeTimeline, SortingGame, MarginSimulator |
| 🏆 **XP & badges** | 100 XP par module + 6 badges + badge Champion |
| 📜 **Certificat PDF** | Généré côté client (jsPDF), téléchargeable après validation des 5 modules |
| 🎥 **Vidéos résumé** | Par module (YouTube non répertorié, via variables d'environnement) |
| 🔐 **Zéro collecte** | Données en localStorage uniquement, aucun serveur externe |
| 📱 **Mobile-first** | Menu burger, simulateurs tactiles, responsive complet |
| 🔍 **SEO complet** | Metadata, Open Graph, sitemap.xml, robots.txt, manifest PWA |

---

## 📦 Stack technique

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS v4** (`@import "tailwindcss"`, pas de config)
- **Framer Motion 12** (animations par page et par module)
- **lucide-react** (icônes SVG vectorielles, style cohérent)
- **jsPDF** (certificat client-side)
- **localStorage** (`guide_samuel_v1`) — seule couche de persistance

---

## 🚀 Déploiement Vercel (recommandé)

### 1. Fork / Clone

```bash
git clone https://github.com/poodasamuelpros/guide-samuel.git
cd guide-samuel
npm install
```

### 2. Variables d'environnement

Copiez `.env.example` en `.env.local` et renseignez vos URLs YouTube :

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_VIDEO_GLOBAL=https://www.youtube.com/embed/VOTRE_ID
NEXT_PUBLIC_VIDEO_MODULE_1=https://www.youtube.com/embed/VOTRE_ID_MODULE_1
NEXT_PUBLIC_VIDEO_MODULE_2=https://www.youtube.com/embed/VOTRE_ID_MODULE_2
NEXT_PUBLIC_VIDEO_MODULE_3=https://www.youtube.com/embed/VOTRE_ID_MODULE_3
NEXT_PUBLIC_VIDEO_MODULE_4=https://www.youtube.com/embed/VOTRE_ID_MODULE_4
NEXT_PUBLIC_VIDEO_MODULE_5=https://www.youtube.com/embed/VOTRE_ID_MODULE_5
```

> ⚠️ Si une variable est absente/vide, le composant `<VideoPlayer>` retourne `null` sans erreur — le reste de la page est inchangé.

### 3. Développement local

```bash
npm run dev
# → http://localhost:3000
```

### 4. Build de production

```bash
npm run build
npm start
```

### 5. Déployer sur Vercel

#### Via CLI

```bash
npx vercel --prod
```

#### Via interface Vercel

1. Connectez votre repo GitHub sur [vercel.com](https://vercel.com)
2. **Framework Preset** : Next.js (détecté automatiquement)
3. **Build Command** : `npm run build`
4. **Output Directory** : `.next`
5. Ajoutez les variables d'environnement dans *Settings → Environment Variables*
6. Cliquez **Deploy**

---

## 📁 Structure du projet

```
guide-samuel/
├── src/
│   ├── app/
│   │   ├── globals.css          # Système de design (CSS custom properties, utilities)
│   │   ├── layout.tsx           # Layout racine (Inter font, metadata, OG)
│   │   ├── page.tsx             # Entrée → <App />
│   │   ├── sitemap.ts           # Sitemap automatique
│   │   ├── robots.ts            # robots.txt automatique
│   │   └── legal/
│   │       ├── layout.tsx
│   │       ├── mentions-legales/
│   │       ├── cgu/
│   │       └── confidentialite/
│   ├── components/
│   │   ├── Logo.tsx             # GSLogo (SVG monogram) + BrandMark
│   │   ├── Header.tsx           # Header fixe, mobile menu, XP indicator
│   │   ├── Footer.tsx           # Footer complet (nav, légal, social, année)
│   │   ├── App.tsx              # Routeur principal
│   │   ├── Landing.tsx          # Page d'accueil (hero, stats, modules, CTA)
│   │   ├── Onboarding.tsx       # Formulaire nom/prénom/ville
│   │   ├── Dashboard.tsx        # Progression, badges, certificat
│   │   ├── Quiz.tsx             # Quiz animé (slide + lettered options)
│   │   ├── Simulators.tsx       # 7 simulateurs gamifiés
│   │   ├── VideoPlayer.tsx      # YouTube embed (retourne null si var absente)
│   │   └── modules/
│   │       ├── Module1.tsx      # Éléments indispensables + BudgetSimulator
│   │       ├── Module2.tsx      # AliExpress/Alibaba + AlibabaAliexpressQuiz
│   │       ├── Module3.tsx      # Transit/taxes + TaxSim + CBMCalc + LitigeTimeline
│   │       ├── Module4.tsx      # Produits + SortingGame
│   │       └── Module5.tsx      # Vente + MarginSimulator
│   ├── lib/
│   │   ├── storage.ts           # localStorage: loadState, saveUser, markModuleComplete
│   │   ├── modules.ts           # Définition des 5 modules
│   │   ├── quizData.ts          # Questions QCM (5 modules × 3 questions min)
│   │   └── certificate.ts       # Génération certificat jsPDF
│   └── types/
│       └── index.ts             # AppState, UserProfile, ModuleData
├── public/
│   ├── manifest.json            # PWA manifest
│   └── favicon.ico
├── .env.example                 # Variables d'environnement (modèle)
├── next.config.js               # Config Next.js + security headers
├── tailwind.config.ts           # (Tailwind v4 — inutilisé)
└── package.json
```

---

## 🗺️ Contenu des modules

| # | Titre | Simulateur |
|---|---|---|
| 1 | Les éléments indispensables pour importer de Chine | BudgetSimulator |
| 2 | Sur quels sites acheter (AliExpress vs Alibaba) | AlibabaAliexpressQuiz |
| 3 | Délais de livraison, transit et taxes douanières | TaxSimulator + CBMCalculator + LitigeTimeline |
| 4 | Les types de produits à importer | SortingGame |
| 5 | Comment vendre ses produits importés | MarginSimulator |

---

## 🏗️ Données vérifiées

| Donnée | Valeur | Source |
|---|---|---|
| UBA Africard | ~10 000 FCFA | UBA Burkina Faso |
| Boîte postale La Poste BF | ~15 200 FCFA/an | laposte.bf |
| Fret aérien Chine → BF | 9 000–13 000 FCFA/kg (estimatif) | Transitaires locaux |
| Protection acheteur AliExpress | 60 jours (litige 15j après réception) | AliExpress Help Center |
| TEC CEDEAO | 0%, 5%, 10%, 20% | UEMOA/CEDEAO officiel |
| CBM | L × W × H (en mètres) | Standard logistique |

---

## 🔒 Sécurité & vie privée

- **Aucune donnée serveur** : nom, prénom, ville et progression restent dans le `localStorage` du navigateur
- **Aucun tracking tiers** ni cookie publicitaire
- **En-têtes HTTP sécurisés** : CSP, X-Frame-Options, HSTS, Permissions-Policy (voir `next.config.js`)
- **XSS basique** : sanitisation des entrées utilisateur via `src/lib/storage.ts`

---

## 📄 Licence

Contenu et code © Samuel — Usage personnel et éducatif.

---

*Dernière mise à jour : Juillet 2025*
