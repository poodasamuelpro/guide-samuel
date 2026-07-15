import { QuizQuestion } from '@/types';

export const QUIZ_DATA: Record<number, QuizQuestion[]> = {
  1: [
    {
      id: 'q1_1',
      question: "Quel est le cout d'acquisition de la carte Visa UBA prepayee au Burkina Faso ?",
      options: ['5 000 FCFA', '10 000 FCFA', '15 000 FCFA', '20 000 FCFA'],
      correctIndex: 1,
      explanation: "La carte Visa UBA prepayee coute 10 000 FCFA au Burkina Faso. Elle est rechargeable via les agences UBA ou Orange Money.",
    },
    {
      id: 'q1_2',
      question: "Pourquoi une boite postale est-elle indispensable pour importer de Chine ?",
      options: [
        "Pour avoir un code postal reconnu par AliExpress",
        "Parce que les livreurs chinois ne livrent pas a domicile en Afrique de l'Ouest",
        "Pour recevoir les colis en toute securite a La Poste",
        "C'est obligatoire legalement",
      ],
      correctIndex: 2,
      explanation: "La boite postale permet de recevoir tes colis de maniere securisee a La Poste. C'est l'adresse de livraison standard pour les commandes depuis la Chine.",
    },
    {
      id: 'q1_3',
      question: "Combien faut-il budgetiser au minimum pour demarrer (carte + boite postale) ?",
      options: ['Moins de 10 000 FCFA', 'Environ 25 000 FCFA', 'Environ 50 000 FCFA', 'Plus de 100 000 FCFA'],
      correctIndex: 1,
      explanation: "Le budget minimal est d'environ 25 200 FCFA : carte Visa UBA (10 000) + boite postale (15 000 + 200 timbre) = depart solide sans grosse mise de fonds.",
    },
  ],
  2: [
    {
      id: 'q2_1',
      question: "Tu veux commander 5 paires de chaussures pour les revendre. Quelle plateforme choisir ?",
      options: [
        "Alibaba -- pour les petites quantites",
        "AliExpress -- ideal pour debuter et les petites quantites",
        "Les deux sont identiques",
        "Ni l'un ni l'autre",
      ],
      correctIndex: 1,
      explanation: "AliExpress est ideal pour debuter : commandes a l'unite ou en petites quantites, protection acheteur integree, le vendeur gere la livraison jusqu'a toi.",
    },
    {
      id: 'q2_2',
      question: "Sur Alibaba, qui s'occupe generalement du transport vers ton pays ?",
      options: [
        "Alibaba s'en charge automatiquement",
        "Tu dois negocier le transport toi-meme avec le fournisseur",
        "La douane gere le transport",
        "Orange Money inclut le transport",
      ],
      correctIndex: 1,
      explanation: "Sur Alibaba, tu traites directement avec des fabricants/grossistes. Tu dois toi-meme negocier et organiser le transport vers ton pays.",
    },
    {
      id: 'q2_3',
      question: "Quelle est la principale difference entre AliExpress et Alibaba ?",
      options: [
        "AliExpress est plus cher mais plus rapide",
        "Alibaba est pour les grosses commandes/fabricants, AliExpress pour les detaillants",
        "Alibaba accepte Orange Money, pas AliExpress",
        "Il n'y a aucune difference",
      ],
      correctIndex: 1,
      explanation: "AliExpress = detail, petites quantites, protection acheteur forte. Alibaba = grosses commandes, fabricants, necessite plus d'experience.",
    },
  ],
  3: [
    {
      id: 'q3_1',
      question: "Quelle est la fourchette de prix indicative du fret aerien Chine-Burkina Faso via un transitaire local ?",
      options: [
        "2 000 à 4 000 FCFA/kg",
        "9 000 à 13 000 FCFA/kg",
        "20 000 à 30 000 FCFA/kg",
        "Le fret aerien est toujours gratuit via AliExpress",
      ],
      correctIndex: 1,
      explanation: "Le fret aerien via transitaire local est estimé entre 9 000 et 13 000 FCFA/kg (indicatif, varie selon le transitaire et la periode). Toujours demander un devis avant d'engager un envoi.",
    },
    {
      id: 'q3_2',
      question: "Comment calcule-t-on le CBM (volume facturable) pour le fret maritime ?",
      options: [
        "Poids x Distance x Duree",
        "Longueur x Largeur x Hauteur (en metres)",
        "Poids total en kg divise par 6",
        "La compagnie calcule automatiquement, on n'a rien a faire",
      ],
      correctIndex: 1,
      explanation: "CBM = Longueur x Largeur x Hauteur EN METRES. Ex: 0,5m x 0,4m x 0,3m = 0,06 CBM. En fret maritime, c'est ce volume qui determine le cout d'expedition.",
    },
    {
      id: 'q3_3',
      question: "Quel type de marchandise est INTERDIT en fret aerien standard ?",
      options: [
        "Les chaussures",
        "Les vetements",
        "Les batteries au lithium isolees (non integrees a un appareil)",
        "Les gadgets electroniques sans batterie",
      ],
      correctIndex: 2,
      explanation: "Les batteries au lithium seules (non integrees dans un appareil) sont interdites en fret aerien standard. Les liquides, huiles et poudres sont aussi fortement restreints. En cas de doute, consultez votre transitaire.",
    },
  ],
  4: [
    {
      id: 'q4_1',
      question: "Quel type de produit est le plus rentable a importer de Chine ?",
      options: [
        "Les produits deja fabriques localement en grande quantite",
        "Les contrefacons de marques connues",
        "Les produits non fabriques localement et de bonne qualite",
        "Les produits alimentaires transformes",
      ],
      correctIndex: 2,
      explanation: "Importer des produits non fabriques localement (ex : accessoires tech, gadgets) et de bonne qualite evite la concurrence locale et justifie un bon prix de vente.",
    },
    {
      id: 'q4_2',
      question: "Pourquoi faut-il eviter d'importer des contrefacons ?",
      options: [
        "Elles ne se vendent pas",
        "Risques de saisie par les douanes ET poursuites judiciaires",
        "Elles coutent trop cher a commander",
        "AliExpress ne vend pas de contrefacons",
      ],
      correctIndex: 1,
      explanation: "Les contrefacons exposent a des saisies douanieres et a des poursuites penales. C'est un risque majeur qui peut ruiner ton business avant meme de demarrer.",
    },
    {
      id: 'q4_3',
      question: "Un ami te conseille d'importer du ciment de Chine pour le vendre au Burkina. Bonne idee ?",
      options: [
        "Oui, le ciment chinois est meilleur",
        "Non -- c'est un produit lourd, taxe, et fabrique localement : mauvaise rentabilite",
        "Oui si tu commandes en petite quantite",
        "Oui, il n'y a pas de douane sur le ciment",
      ],
      correctIndex: 1,
      explanation: "Le ciment est lourd (frais de transport eleves), taxe, et fabrique localement. La marge sera nulle ou negative. Prefere des produits legers, a forte valeur ajoutee.",
    },
  ],
  5: [
    {
      id: 'q5_1',
      question: "Quelle est la methode grossiste pour vendre tes produits importes ?",
      options: [
        "Ouvrir une boutique physique en ville",
        "Vendre aux commercants detaillants a un prix inferieur au marche pour qu'ils revendent",
        "Vendre uniquement sur Jumia",
        "Exporter tes produits vers la France",
      ],
      correctIndex: 1,
      explanation: "En tant que grossiste, tu vends en volume a des commercants. Ex : tu achetes a 500 FCFA, tu vends a 800 FCFA aux detaillants qui revendent a 1 200 FCFA.",
    },
    {
      id: 'q5_2',
      question: "Quelle plateforme est la plus utilisee pour vendre en ligne en Afrique de l'Ouest en 2025 ?",
      options: ['Amazon', 'eBay', "Facebook Marketplace et WhatsApp Business", 'Alibaba'],
      correctIndex: 2,
      explanation: "Facebook Marketplace et WhatsApp Business dominent la vente en ligne en Afrique de l'Ouest. Jumia est aussi present dans certains pays comme la Cote d'Ivoire.",
    },
    {
      id: 'q5_3',
      question: "Comment maximiser tes chances de vendre rapidement tes produits importes ?",
      options: [
        "Vendre uniquement en boutique physique, pas en ligne",
        "Combiner vente en ligne (Facebook/WhatsApp) + photos de qualite + livraison locale",
        "Attendre que les clients viennent a toi",
        "Baisser les prix au maximum",
      ],
      correctIndex: 1,
      explanation: "La combinaison gagnante : visibilite en ligne (Facebook, WhatsApp), belles photos de produits, prix competitif et service de livraison locale pour conclure les ventes.",
    },
  ],
};
