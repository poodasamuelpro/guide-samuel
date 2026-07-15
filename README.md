# Le Guide de Samuel

## Présentation du projet
- **Nom** : Le Guide de Samuel — Commander et Vendre en Chine
- **Technologie** : Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion
- **Hébergement cible** : Vercel (déploiement standard Next.js)
- **Public** : Entrepreneurs Burkina Faso / Afrique de l'Ouest, mobile-first

---

## ✅ Fonctionnalités implémentées

### Navigation & UX
- **Landing page** : présentation chaleureuse, aperçu des 5 modules, stats, CTA
- **Onboarding** : formulaire Nom + Prénom + Ville (optionnel), stocké en localStorage, validation XSS
- **Dashboard** : progression globale, barre XP, badges débloqués, modules verrouillés en séquence
- **Navigation** : progression guidée module → quiz → déblocage suivant

### 5 Modules de contenu (actualisés 2025)
| Module | Contenu |
|--------|---------|
| 1 | Carte UBA (10 000 FCFA), boîte postale (17 200 FCFA), budget de départ |
| 2 | AliExpress vs Alibaba, conseils d'achat |
| 3 | Délais DHL/EMS (7-15j) vs Standard (20-45j), protection 60 jours, douanes |
| 4 | 3 types de produits gagnants, produits à éviter |
| 5 | Méthodes grossiste/détaillant, Facebook, WhatsApp, Jumia |

### Gamification
- **Simulateur budget** (Module 1) : choix carte + boîte postale → total FCFA
- **Checklist démarrage** (Module 1) : 6 étapes avec barre de progression
- **Simulateur taxes** (Module 3) : curseurs quantité/prix → estimation douane
- **Chronologie litige** (Module 3) : timeline visuelle commande → remboursement
- **Jeu de tri** (Module 4) : "Importer ou pas ?" — 8 produits avec feedback
- **Simulateur marge** (Module 5) : achat + frais → vente → bénéfice + %
- **Quiz 3 questions** par module (15 questions au total)
- **Système XP** : 100 XP par module validé (500 XP max)
- **Badges** : 1 badge par module + badge Champion

### Certificat PDF
- Généré côté client via **jsPDF** (aucun serveur requis)
- Design soigné : fond bleu marine, bordure dorée, sceau, signature
- Nommage automatique : `certificat-guide-samuel-[prenom]-[nom].pdf`
- Accessible depuis le dashboard une fois tous les modules validés

### Vidéos (variables d'environnement)
- Composant `<VideoPlayer envKey="..." />` — retourne `null` si URL absente
- 6 variables : `NEXT_PUBLIC_VIDEO_GLOBAL`, `NEXT_PUBLIC_VIDEO_MODULE_1` à `_5`
- Fichier `.env.example` fourni

### Sécurité
- Données uniquement en localStorage (jamais envoyées)
- Validation + sanitisation des champs onboarding
- Headers : `CSP`, `X-Frame-Options: DENY`, `X-Content-Type-Options`, `X-XSS-Protection`

---

## 📁 Structure du projet

```
guide-samuel/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Layout + métadonnées SEO
│   │   ├── page.tsx          # Entry point → <App />
│   │   └── globals.css
│   ├── components/
│   │   ├── App.tsx           # Routeur principal (état global)
│   │   ├── Landing.tsx       # Page d'accueil
│   │   ├── Onboarding.tsx    # Formulaire d'inscription
│   │   ├── Dashboard.tsx     # Tableau de bord
│   │   ├── Quiz.tsx          # Composant quiz générique
│   │   ├── VideoPlayer.tsx   # Lecteur YouTube conditionnel
│   │   ├── Simulators.tsx    # Tous les simulateurs/jeux
│   │   └── modules/
│   │       ├── Module1.tsx à Module5.tsx
│   ├── lib/
│   │   ├── storage.ts        # localStorage helpers
│   │   ├── modules.ts        # Données des modules
│   │   ├── quizData.ts       # 15 questions de quiz
│   │   └── certificate.ts    # Génération PDF jsPDF
│   └── types/index.ts
├── .env.example               # Variables vidéo à renseigner
├── next.config.js             # Security headers
├── package.json
└── README.md
```

---

## 🚀 Déploiement sur Vercel

### 1. Pousser sur GitHub
```bash
git remote add origin https://github.com/TON-COMPTE/guide-samuel.git
git push -u origin main
```

### 2. Importer sur Vercel
- Aller sur [vercel.com](https://vercel.com) → "Import Project"
- Sélectionner le repo GitHub
- Framework : **Next.js** (détecté automatiquement)
- Cliquer **Deploy**

### 3. Configurer les variables d'environnement (optionnel)
Dans Vercel → Settings → Environment Variables :
```
NEXT_PUBLIC_VIDEO_GLOBAL=https://youtu.be/VOTRE_ID
NEXT_PUBLIC_VIDEO_MODULE_1=https://youtu.be/VOTRE_ID
NEXT_PUBLIC_VIDEO_MODULE_2=https://youtu.be/VOTRE_ID
NEXT_PUBLIC_VIDEO_MODULE_3=https://youtu.be/VOTRE_ID
NEXT_PUBLIC_VIDEO_MODULE_4=https://youtu.be/VOTRE_ID
NEXT_PUBLIC_VIDEO_MODULE_5=https://youtu.be/VOTRE_ID
```
**Si non renseignées → les sections vidéo n'apparaissent pas (aucune erreur).**

---

## 🌐 URLs de test (sandbox)
- **Application** : https://3000-i045r0y2dipp1dtveppl7-3c7ff1b5.sandbox.novita.ai

---

## 📦 Dépendances principales
- `next` 16.x, `react` 19.x, `typescript`
- `tailwindcss`, `framer-motion`
- `jspdf` (certificat PDF)
- `lucide-react`, `@radix-ui/*`

---

## ⚠️ Limitations connues
- Accents dans les textes remplacés par équivalents ASCII dans quelques endroits (compatibilité parser JS)
- Les données de prix (cartes, douanes) sont indicatives — à vérifier auprès des sources officielles
- Aucun backend : tout en localStorage (données perdues si l'utilisateur vide son cache)

---

*Dernière mise à jour : Juillet 2025*
