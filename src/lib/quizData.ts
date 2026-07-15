import { QuizQuestion } from '@/types';

// ─── BANQUE COMPLÈTE — 10 questions par module ────────────────────────────────
// Le quiz tire 5 questions au hasard à chaque tentative (anti-triche)

const QUIZ_BANK: Record<number, QuizQuestion[]> = {
  1: [
    {
      id: 'q1_a',
      question: "Quel est le coût d'acquisition estimé de la carte Visa UBA prépayée au Burkina Faso ?",
      options: ['5 000 FCFA', '10 000 FCFA', '25 000 FCFA', '50 000 FCFA'],
      correctIndex: 1,
      explanation: "La carte Visa UBA prépayée coûte environ 10 000 FCFA. Elle est rechargeable via les agences UBA ou Orange Money.",
    },
    {
      id: 'q1_b',
      question: "Pourquoi une boîte postale est-elle indispensable pour importer depuis la Chine ?",
      options: [
        "Pour avoir un code postal reconnu par AliExpress",
        "Parce que les livreurs internationaux ne livrent pas à domicile en Afrique de l'Ouest",
        "Pour recevoir les colis en toute sécurité à La Poste",
        "C'est obligatoire légalement",
      ],
      correctIndex: 1,
      explanation: "Les livreurs internationaux (Chine Post, AliExpress Standard) n'assurent pas la livraison à domicile en Afrique de l'Ouest. La boîte postale est ton adresse fixe.",
    },
    {
      id: 'q1_c',
      question: "Quel est le budget MINIMAL estimé pour bien démarrer (carte VISA + boîte postale) ?",
      options: ['Moins de 10 000 FCFA', 'Environ 25 000 FCFA', 'Environ 75 000 FCFA', 'Plus de 150 000 FCFA'],
      correctIndex: 1,
      explanation: "Budget minimal : carte Visa UBA (~10 000) + boîte postale (~15 000) + timbre (~200) = environ 25 200 FCFA. Un départ solide sans grosse mise de fonds.",
    },
    {
      id: 'q1_d',
      question: "Quel plafond mensuel offre la carte Visa UBA prépayée (Africard) ?",
      options: ['200 000 FCFA', '500 000 FCFA', '2 000 000 FCFA', 'Illimité'],
      correctIndex: 2,
      explanation: "La carte UBA Africard permet jusqu'à 2 000 000 FCFA par mois, largement suffisant pour débuter l'importation.",
    },
    {
      id: 'q1_e',
      question: "Quelle est la durée d'un abonnement standard à une boîte postale à La Poste du Burkina ?",
      options: ['6 mois', '1 an', '2 ans', '3 ans'],
      correctIndex: 1,
      explanation: "L'abonnement standard à La Poste est annuel — environ 15 000 FCFA/an pour les particuliers.",
    },
    {
      id: 'q1_f',
      question: "Quelle pièce est obligatoire pour ouvrir une boîte postale à La Poste ?",
      options: ['Passeport uniquement', 'CNI ou passeport valide', 'Acte de naissance', 'Aucune pièce requise'],
      correctIndex: 1,
      explanation: "La Poste exige une pièce d'identité valide (CNI ou passeport) pour ouvrir une boîte postale.",
    },
    {
      id: 'q1_g',
      question: "Que conseille-t-on de faire avec le solde de ta carte VISA lors de ta première commande ?",
      options: [
        "Recharger le maximum possible pour être tranquille",
        "Recharger uniquement le montant de la commande + 10% de marge",
        "Ne jamais recharger plus de 1 000 FCFA",
        "Toujours garder 50 000 FCFA de réserve",
      ],
      correctIndex: 1,
      explanation: "Pour sécuriser ta carte, ne recharge que le montant exact de ta commande + 10% de marge. Évite de laisser un solde élevé inutilement.",
    },
    {
      id: 'q1_h',
      question: "En combien de temps maximum doit-on ouvrir un litige sur AliExpress après confirmation de réception ?",
      options: ['3 jours', '7 jours', '15 jours', '30 jours'],
      correctIndex: 2,
      explanation: "Après confirmation de réception, tu as 15 jours maximum pour ouvrir un litige. Inspecte TOUJOURS ton colis avant de confirmer la réception !",
    },
    {
      id: 'q1_i',
      question: "Quelle est la fréquence des frais de gestion mensuels estimés pour la carte UBA Africard ?",
      options: ['500 FCFA/mois', '2 000 FCFA/mois', '5 000 FCFA/mois', 'Aucun frais mensuel'],
      correctIndex: 0,
      explanation: "Les frais de gestion sont estimés à environ 500 FCFA/mois, soit 6 000 FCFA/an — un coût très raisonnable.",
    },
    {
      id: 'q1_j',
      question: "Que faut-il faire AVANT de confirmer la réception de ton colis sur AliExpress ?",
      options: [
        "Confirmer directement pour libérer le paiement au vendeur",
        "Inspecter le colis et vérifier que tout est conforme à la commande",
        "Attendre 30 jours après réception",
        "Envoyer d'abord un message au vendeur",
      ],
      correctIndex: 1,
      explanation: "TOUJOURS inspecter le contenu avant de confirmer ! Une fois que tu confirmes, la protection acheteur est réduite à 15 jours seulement.",
    },
  ],

  2: [
    {
      id: 'q2_a',
      question: "Tu veux commander 5 paires de chaussures pour les revendre. Quelle plateforme choisir ?",
      options: [
        "Alibaba — pour les petites quantités",
        "AliExpress — idéal pour débuter et les petites quantités",
        "Les deux sont identiques",
        "Ni l'un ni l'autre",
      ],
      correctIndex: 1,
      explanation: "AliExpress est parfait pour débuter : commandes à l'unité, protection acheteur intégrée 60 jours, le vendeur gère la livraison.",
    },
    {
      id: 'q2_b',
      question: "Sur Alibaba, qui s'occupe généralement du transport vers ton pays ?",
      options: [
        "Alibaba s'en charge automatiquement",
        "Tu dois négocier le transport toi-même avec un transitaire",
        "La douane gère le transport",
        "Orange Money inclut le transport",
      ],
      correctIndex: 1,
      explanation: "Sur Alibaba, tu traites directement avec des fabricants. Tu dois toi-même organiser et financer le transport via un transitaire local.",
    },
    {
      id: 'q2_c',
      question: "Quelle est la principale différence entre AliExpress et Alibaba ?",
      options: [
        "AliExpress est plus cher mais plus rapide",
        "Alibaba est pour les grosses commandes/fabricants, AliExpress pour le détail",
        "Alibaba accepte Orange Money, pas AliExpress",
        "Il n'y a aucune différence",
      ],
      correctIndex: 1,
      explanation: "AliExpress = détail, petites quantités, protection acheteur forte. Alibaba = grosses commandes, fabricants directs, plus d'expérience requise.",
    },
    {
      id: 'q2_d',
      question: "Quelle est la durée standard de la protection acheteur AliExpress en 2025 ?",
      options: ['15 jours', '30 jours', '60 à 75 jours', '6 mois'],
      correctIndex: 2,
      explanation: "La protection acheteur AliExpress dure de 60 à 75 jours à compter de l'expédition, selon la commande.",
    },
    {
      id: 'q2_e',
      question: "Quel est le MOQ (Minimum Order Quantity) habituel sur Alibaba ?",
      options: ['1 pièce', '5 à 10 pièces', '50 à 500 pièces', 'Pas de minimum'],
      correctIndex: 2,
      explanation: "Sur Alibaba, les fabricants imposent souvent un MOQ entre 50 et 500 pièces selon le produit. C'est pourquoi AliExpress est préférable pour débuter.",
    },
    {
      id: 'q2_f',
      question: "Quelle note vendeur minimum conseille-t-on sur AliExpress avant d'acheter ?",
      options: ['3/5 étoiles', '3,5/5 étoiles', '4/5 étoiles', '4,5/5 étoiles minimum'],
      correctIndex: 3,
      explanation: "Un vendeur fiable sur AliExpress doit avoir minimum 4,5/5 étoiles et plus de 100 commandes passées pour être considéré comme sûr.",
    },
    {
      id: 'q2_g',
      question: "Pourquoi ne faut-il JAMAIS confirmer la réception d'un colis non inspecté ?",
      options: [
        "Ça ralentit la livraison des prochaines commandes",
        "Une fois confirmé, ta fenêtre de litige passe à 15 jours seulement",
        "AliExpress facture des frais de confirmation",
        "Ça diminue ta note de client",
      ],
      correctIndex: 1,
      explanation: "Après confirmation, la protection acheteur passe à 15 jours seulement. Si le produit est défectueux et que tu n'as pas inspecté, tu perds ta protection !",
    },
    {
      id: 'q2_h',
      question: "Quelle méthode de livraison AliExpress est généralement recommandée pour débuter ?",
      options: [
        "DHL Express (le plus rapide)",
        "AliExpress Standard Shipping (bon rapport qualité/délai/prix)",
        "China Post (le moins cher mais très lent)",
        "Retrait en boutique",
      ],
      correctIndex: 1,
      explanation: "AliExpress Standard Shipping offre le meilleur rapport qualité/délai/prix pour les débutants : souvent gratuit ou peu cher, délai raisonnable.",
    },
    {
      id: 'q2_i',
      question: "Les deux groupes AliExpress et Alibaba appartiennent à la même entreprise. Laquelle ?",
      options: ['Amazon', 'Groupe Alibaba (Jack Ma)', 'Tencent', 'JD.com'],
      correctIndex: 1,
      explanation: "AliExpress et Alibaba.com appartiennent tous les deux au groupe Alibaba, fondé par Jack Ma en 1999 en Chine.",
    },
    {
      id: 'q2_j',
      question: "Qu'est-ce qu'un produit OEM sur Alibaba ?",
      options: [
        "Un produit déjà emballé en boîte",
        "Un produit que tu fais fabriquer avec ton propre logo/emballage",
        "Un produit issu de retours clients",
        "Un produit certifié CE obligatoire",
      ],
      correctIndex: 1,
      explanation: "OEM (Original Equipment Manufacturer) = fabriquer un produit à tes spécifications avec ton logo et ton emballage personnalisé. Possible sur Alibaba avec gros volumes.",
    },
  ],

  3: [
    {
      id: 'q3_a',
      question: "Quelle est la fourchette de prix indicative du fret aérien Chine-Burkina via transitaire local ?",
      options: [
        "2 000 à 4 000 FCFA/kg",
        "9 000 à 13 000 FCFA/kg",
        "20 000 à 30 000 FCFA/kg",
        "Le fret aérien est toujours gratuit via AliExpress",
      ],
      correctIndex: 1,
      explanation: "Le fret aérien via transitaire local est estimé entre 9 000 et 13 000 FCFA/kg (indicatif). Toujours demander plusieurs devis !",
    },
    {
      id: 'q3_b',
      question: "Comment calcule-t-on le CBM (volume facturable) pour le fret maritime ?",
      options: [
        "Poids × Distance × Durée",
        "Longueur × Largeur × Hauteur (en mètres)",
        "Poids total en kg divisé par 6",
        "La compagnie calcule automatiquement",
      ],
      correctIndex: 1,
      explanation: "CBM = Longueur × Largeur × Hauteur EN MÈTRES. Ex : 0,5m × 0,4m × 0,3m = 0,06 CBM. C'est la base de facturation en fret maritime.",
    },
    {
      id: 'q3_c',
      question: "Quel type de marchandise est INTERDIT en fret aérien standard ?",
      options: [
        "Les chaussures",
        "Les vêtements",
        "Les batteries au lithium isolées (non intégrées à un appareil)",
        "Les gadgets électroniques sans batterie",
      ],
      correctIndex: 2,
      explanation: "Les batteries au lithium seules sont interdites en fret aérien. Liquides, huiles et poudres sont aussi fortement restreints. Vérifiez toujours avec votre transitaire.",
    },
    {
      id: 'q3_d',
      question: "Quel délai faut-il prévoir pour le fret maritime depuis la Chine jusqu'au Burkina Faso ?",
      options: ['5 à 10 jours', '15 à 25 jours', '45 à 90 jours', 'Plus de 6 mois'],
      correctIndex: 2,
      explanation: "Le fret maritime prend 45 à 90 jours en comptant le temps de mer + passage en port + transport routier jusqu'à Ouagadougou.",
    },
    {
      id: 'q3_e',
      question: "Pour une petite commande légère et urgente, quel mode de livraison choisir ?",
      options: [
        "Fret maritime en conteneur",
        "AliExpress Standard Shipping ou DHL Express",
        "China Post (le plus lent)",
        "Transport routier depuis la Chine",
      ],
      correctIndex: 1,
      explanation: "Pour un colis léger et urgent, AliExpress Standard Shipping (gratuit, 20-45j) ou DHL Express (payant, 7-15j) sont les meilleures options.",
    },
    {
      id: 'q3_f',
      question: "Quel taux de droits de douane s'applique aux produits de consommation courante dans la zone UEMOA ?",
      options: ['0%', '5%', '10%', '20%'],
      correctIndex: 3,
      explanation: "Les produits de consommation courante sont taxés à 20% dans la zone CEDEAO/UEMOA selon le Tarif Extérieur Commun (TEC).",
    },
    {
      id: 'q3_g',
      question: "Par quel(s) port(s) passent généralement les marchandises à destination du Burkina Faso ?",
      options: [
        "Port de Dakar uniquement",
        "Ports d'Abidjan (Côte d'Ivoire), Lomé (Togo) ou Cotonou (Bénin)",
        "Port de Lagos (Nigéria)",
        "Le Burkina Faso a son propre port",
      ],
      correctIndex: 1,
      explanation: "Le Burkina Faso étant enclavé, les marchandises arrivent par mer via Abidjan, Lomé ou Cotonou, puis par route jusqu'à Ouagadougou.",
    },
    {
      id: 'q3_h',
      question: "Quelle est la durée indicative du fret aérien Chine → Burkina Faso via transitaire ?",
      options: ['1 à 2 jours', '5 à 10 jours', '20 à 30 jours', '60 à 90 jours'],
      correctIndex: 1,
      explanation: "Le fret aérien prend environ 5 à 10 jours depuis la Chine jusqu'au Burkina Faso, selon le transitaire et les escales.",
    },
    {
      id: 'q3_i',
      question: "Un transitaire, c'est quoi exactement ?",
      options: [
        "Un chauffeur de taxi entre Ouaga et Abidjan",
        "Une entreprise qui organise le transport international de marchandises",
        "Un douanier qui contrôle les colis",
        "Un vendeur sur Alibaba",
      ],
      correctIndex: 1,
      explanation: "Un transitaire est une entreprise spécialisée dans l'organisation du transport international de marchandises. Il gère l'acheminement, la douane et les documents.",
    },
    {
      id: 'q3_j',
      question: "Que signifie 'groupage' en fret maritime ?",
      options: [
        "Un conteneur partagé entre plusieurs importateurs",
        "Regrouper plusieurs commandes en une seule",
        "Un type de douane spécial",
        "Le paiement groupé de plusieurs fournisseurs",
      ],
      correctIndex: 0,
      explanation: "Le groupage = partager un conteneur avec d'autres importateurs. C'est plus économique pour les petits volumes : tu paies seulement pour le CBM que tu occupes.",
    },
  ],

  4: [
    {
      id: 'q4_a',
      question: "Quel type de produit est le plus rentable à importer de Chine ?",
      options: [
        "Les produits déjà fabriqués localement en grande quantité",
        "Les contrefaçons de marques connues",
        "Les produits légers, non fabriqués localement, à forte demande",
        "Les produits alimentaires transformés",
      ],
      correctIndex: 2,
      explanation: "Les meilleurs produits à importer sont légers (fret faible), non fabriqués localement (pas de concurrence) et à forte demande. Ex : accessoires tech, bijoux fantaisie.",
    },
    {
      id: 'q4_b',
      question: "Pourquoi faut-il éviter d'importer des contrefaçons ?",
      options: [
        "Elles ne se vendent pas",
        "Risques de saisie par les douanes ET poursuites judiciaires",
        "Elles coûtent trop cher à commander",
        "AliExpress ne vend pas de contrefaçons",
      ],
      correctIndex: 1,
      explanation: "Les contrefaçons exposent à des saisies douanières et à des poursuites pénales. C'est un risque majeur qui peut ruiner ton business avant même de démarrer.",
    },
    {
      id: 'q4_c',
      question: "Un ami te conseille d'importer du ciment de Chine. Bonne idée ?",
      options: [
        "Oui, le ciment chinois est meilleur",
        "Non — produit lourd, taxé, et fabriqué localement : mauvaise rentabilité",
        "Oui si tu commandes en petite quantité",
        "Oui, il n'y a pas de douane sur le ciment",
      ],
      correctIndex: 1,
      explanation: "Le ciment est lourd (fret ruineux), taxé, et fabriqué localement. La marge sera nulle ou négative. Préfère des produits légers et à forte valeur ajoutée.",
    },
    {
      id: 'q4_d',
      question: "Pourquoi les bijoux fantaisie sont-ils considérés comme d'excellents produits à importer ?",
      options: [
        "Parce qu'ils ne sont pas taxés à la douane",
        "Parce qu'ils sont légers, peu chers à l'achat et à forte marge de revente",
        "Parce qu'ils sont fabriqués localement",
        "Parce qu'AliExpress les garantit à vie",
      ],
      correctIndex: 1,
      explanation: "Les bijoux fantaisie sont ultra-légers (fret faible), peu chers à acheter (500-1000 FCFA) et revendus 3 à 5× le prix d'achat. Idéal pour débuter !",
    },
    {
      id: 'q4_e',
      question: "Quelle est la première étape pour valider un produit avant de l'importer ?",
      options: [
        "Faire une grosse commande de 500 pièces pour tester le marché",
        "Commander 3 à 5 pièces test pour évaluer la qualité et la demande",
        "Attendre que quelqu'un d'autre le vende d'abord",
        "Demander l'autorisation à la douane",
      ],
      correctIndex: 1,
      explanation: "TOUJOURS tester avec 3 à 5 pièces avant d'investir dans un gros stock. Cela permet de vérifier la qualité, l'emballage et la demande réelle.",
    },
    {
      id: 'q4_f',
      question: "Les médicaments importés sans autorisation sont considérés comme :",
      options: [
        "Autorisés si achetés sur AliExpress",
        "Interdits sans licence pharmaceutique et accord du Ministère de la Santé",
        "Libres de vente car naturels",
        "Seulement interdits en France, pas au Burkina",
      ],
      correctIndex: 1,
      explanation: "L'importation de médicaments sans licence pharmaceutique est strictement interdite au Burkina Faso. Elle expose à des poursuites pénales graves.",
    },
    {
      id: 'q4_g',
      question: "Quelle catégorie de produits est la plus demandée au Burkina Faso en 2025 ?",
      options: [
        "Articles de luxe et maroquinerie",
        "Accessoires tech, chargeurs, écouteurs et gadgets légers",
        "Machines agricoles lourdes",
        "Mobilier de bureau volumineux",
      ],
      correctIndex: 1,
      explanation: "Les accessoires tech (chargeurs, écouteurs, coques) sont très demandés : légers, faciles à transporter, marges élevées, et non fabriqués localement.",
    },
    {
      id: 'q4_h',
      question: "Pourquoi éviter les produits très lourds comme l'eau minérale ou le sucre ?",
      options: [
        "Ils sont trop chers sur AliExpress",
        "Le coût du fret (calculé au poids) rend la marge nulle ou négative",
        "Ils sont interdits d'importation",
        "La douane bloque systématiquement ces produits",
      ],
      correctIndex: 1,
      explanation: "Un produit lourd = fret élevé au kg. Si le prix de vente local est bas (compétition locale), la marge disparaît complètement. Préfère le léger !",
    },
    {
      id: 'q4_i',
      question: "La méthode de validation d'un produit consiste à :",
      options: [
        "Demander à des amis si le produit leur plaît",
        "Vérifier : demande locale + non fabriqué localement + calcul marge + test 3-5 pièces",
        "Regarder ce qui se vend en France",
        "Copier ce que font les autres importateurs",
      ],
      correctIndex: 1,
      explanation: "La vraie validation : demande locale réelle + absence de compétition locale + marge positive + test physique de 3-5 pièces avant le gros stock.",
    },
    {
      id: 'q4_j',
      question: "Que signifie avoir une position unique sur le marché pour ton produit importé ?",
      options: [
        "Être le seul à vendre en ligne",
        "Proposer un produit qu'on ne trouve pas facilement localement",
        "Avoir le prix le plus bas du marché",
        "Avoir un stand dans le marché central",
      ],
      correctIndex: 1,
      explanation: "Position unique = vendre un produit introuvable localement. Cela justifie un meilleur prix et évite la guerre des prix avec les concurrents locaux.",
    },
  ],

  5: [
    {
      id: 'q5_a',
      question: "Quelle est la méthode grossiste pour vendre tes produits importés ?",
      options: [
        "Ouvrir une boutique physique en ville",
        "Vendre en volume à des commerçants détaillants qui revendent à leurs clients",
        "Vendre uniquement sur Jumia",
        "Exporter tes produits vers la France",
      ],
      correctIndex: 1,
      explanation: "En tant que grossiste, tu vends en volume. Ex : achète à 500 FCFA, vends à 800 aux détaillants qui revendent à 1 200. Moins de marge mais stock écoulé rapidement.",
    },
    {
      id: 'q5_b',
      question: "Quelle plateforme est la plus utilisée pour vendre en ligne en Afrique de l'Ouest en 2025 ?",
      options: ['Amazon', 'eBay', 'Facebook Marketplace et WhatsApp Business', 'Alibaba'],
      correctIndex: 2,
      explanation: "Facebook Marketplace et WhatsApp Business dominent la vente en ligne en Afrique de l'Ouest. Gratuit, large audience, idéal pour tout type de produit.",
    },
    {
      id: 'q5_c',
      question: "Comment maximiser tes chances de vendre rapidement tes produits importés ?",
      options: [
        "Vendre uniquement en boutique physique",
        "Combiner Facebook/WhatsApp + photos de qualité + livraison locale proposée",
        "Attendre que les clients viennent à toi",
        "Baisser les prix au maximum",
      ],
      correctIndex: 1,
      explanation: "La combinaison gagnante : visibilité en ligne (Facebook, WhatsApp), belles photos, prix compétitif et livraison locale pour conclure les ventes.",
    },
    {
      id: 'q5_d',
      question: "Quelle formule utilise-t-on pour calculer le prix de vente minimum rentable ?",
      options: [
        "(Prix achat + Fret + Douane) × 1,1",
        "(Prix achat + Fret + Douane) × 2 à 3",
        "Prix achat × 10",
        "Prix achat - 20%",
      ],
      correctIndex: 1,
      explanation: "Le prix de vente recommandé = (prix achat + fret + douane) × 2 à 3. Cela garantit une marge nette suffisante après tous les frais.",
    },
    {
      id: 'q5_e',
      question: "Quel est l'avantage principal de la vente en détail direct par rapport au grossiste ?",
      options: [
        "Le stock s'écoule plus vite",
        "La marge par pièce est maximale",
        "Pas besoin de photos produit",
        "La livraison est gratuite automatiquement",
      ],
      correctIndex: 1,
      explanation: "En vendant directement au consommateur final, tu captures toute la chaîne de valeur. La marge par pièce peut être 3× supérieure au modèle grossiste.",
    },
    {
      id: 'q5_f',
      question: "Quel ROI (retour sur investissement) minimum doit-on viser pour qu'un produit soit rentable ?",
      options: ['5%', '10%', 'Au moins 50 à 100%', 'Le ROI ne compte pas en commerce'],
      correctIndex: 2,
      explanation: "En importation, il faut viser au minimum 50 à 100% de ROI pour couvrir les imprévus (délais, casse, invendus) et dégager un vrai bénéfice.",
    },
    {
      id: 'q5_g',
      question: "Pourquoi faut-il TOUJOURS faire des photos de qualité de tes produits ?",
      options: [
        "C'est obligatoire sur Facebook Marketplace",
        "Les photos de qualité augmentent la confiance et accélèrent les ventes",
        "Pour éviter les problèmes de douane",
        "Pour obtenir de meilleurs prix d'achat",
      ],
      correctIndex: 1,
      explanation: "En Afrique de l'Ouest, le client ne peut pas toucher le produit avant d'acheter. Une belle photo sur fond blanc, plusieurs angles, rassure et déclenche l'achat.",
    },
    {
      id: 'q5_h',
      question: "Qu'est-ce qu'un réseau de revendeurs et pourquoi est-ce puissant ?",
      options: [
        "Un groupe WhatsApp de clients réguliers",
        "Des personnes qui vendent tes produits en échange d'une commission",
        "Un réseau de transitaires partenaires",
        "Une association d'importateurs",
      ],
      correctIndex: 1,
      explanation: "Un réseau de revendeurs = des personnes qui vendent pour toi contre commission (10-20%). Tu multiplies tes points de vente sans effort et sans coût fixe.",
    },
    {
      id: 'q5_i',
      question: "Quel est le principal avantage de WhatsApp Business par rapport à Facebook Marketplace ?",
      options: [
        "WhatsApp est plus populaire en Afrique",
        "La vente via réseau personnel et bouche-à-oreille — clients déjà qualifiés",
        "WhatsApp est gratuit, Facebook est payant",
        "WhatsApp permet de livrer automatiquement",
      ],
      correctIndex: 1,
      explanation: "WhatsApp Business permet de vendre via ton réseau personnel : contacts, famille, amis. Ces clients te font confiance d'entrée, les ventes se concluent plus vite.",
    },
    {
      id: 'q5_j',
      question: "Quel est le risque si tu promets des délais de livraison que tu ne maîtrises pas ?",
      options: [
        "Aucun risque, les clients comprennent",
        "Perte de confiance, mauvaise réputation, retours et disputes",
        "La douane peut bloquer ta prochaine commande",
        "AliExpress peut fermer ton compte",
      ],
      correctIndex: 1,
      explanation: "Ne jamais sur-promettre ! Le fret aérien peut prendre 5-15 jours, le maritime 45-90 jours. Si tu annonces 3 jours et livres en 3 semaines, tu perds ta réputation.",
    },
  ],
};

// ─── FONCTION SHUFFLE (mélange aléatoire de Fisher-Yates) ────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── API PUBLIQUE : 5 questions aléatoires parmi les 10 ──────────────────────
// Chaque appel retourne un set DIFFÉRENT → anti-triche garantie
export function getQuizQuestions(moduleId: number): QuizQuestion[] {
  const bank = QUIZ_BANK[moduleId] ?? [];
  return shuffle(bank).slice(0, 5);
}

// Compat legacy (les quelques endroits qui lisent QUIZ_DATA directement)
export const QUIZ_DATA: Record<number, QuizQuestion[]> = QUIZ_BANK;
