import { ModuleData } from '@/types';

export const MODULES: ModuleData[] = [
  {
    id: 1,
    title: 'Les indispensables pour importer',
    icon: '💳',
    color: 'from-blue-500 to-blue-700',
    description: "Carte bancaire, boite postale, budget de depart -- tout ce qu'il te faut avant de passer ta premiere commande.",
    xpReward: 100,
    badge: 'module_1',
    badgeLabel: '🎯 Pret a demarrer',
  },
  {
    id: 2,
    title: 'Sur quels sites acheter',
    icon: '🛒',
    color: 'from-orange-500 to-orange-700',
    description: "AliExpress vs Alibaba : comprends les differences et choisis la plateforme adaptee a ta situation.",
    xpReward: 100,
    badge: 'module_2',
    badgeLabel: '🛍️ Acheteur averti',
  },
  {
    id: 3,
    title: 'Délais et taxes douanières',
    icon: '📦',
    color: 'from-green-500 to-green-700',
    description: "Maitrise les delais de livraison, la protection acheteur et la gestion des douanes.",
    xpReward: 100,
    badge: 'module_3',
    badgeLabel: '⏱️ Expert logistique',
  },
  {
    id: 4,
    title: 'Quels produits importer',
    icon: '🏷️',
    color: 'from-purple-500 to-purple-700',
    description: "Les 3 types de produits gagnants et les pieges a eviter pour importer intelligemment.",
    xpReward: 100,
    badge: 'module_4',
    badgeLabel: '🏷️ Selectionneur pro',
  },
  {
    id: 5,
    title: 'Comment vendre vos produits',
    icon: '💰',
    color: 'from-red-500 to-red-700',
    description: "Grossiste ou detaillant ? Facebook, WhatsApp, Jumia -- trouve ta strategie de vente ideale.",
    xpReward: 100,
    badge: 'module_5',
    badgeLabel: '💰 Vendeur accompli',
  },
];

export const BADGE_LABELS: Record<string, string> = {
  module_1: '🎯 Pret a demarrer',
  module_2: '🛍️ Acheteur averti',
  module_3: '⏱️ Expert logistique',
  module_4: '🏷️ Selectionneur pro',
  module_5: '💰 Vendeur accompli',
  champion: '🏆 Champion importateur',
};
