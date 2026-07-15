import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Conditions Générales d\'Utilisation — Le Guide de Samuel',
  description: 'Conditions générales d\'utilisation de la plateforme de formation Le Guide de Samuel.',
};

export default function CguPage() {
  return (
    <LegalPage
      title="Conditions Générales d'Utilisation"
      subtitle="Conditions régissant l'utilisation de la plateforme Le Guide de Samuel"
      lastUpdated="15 juillet 2025"
      sections={[
        {
          title: '1. Objet',
          content: (
            <>
              <p>
                Les présentes Conditions Générales d&apos;Utilisation (ci-après « CGU ») régissent l&apos;accès et l&apos;utilisation de la plateforme de formation en ligne <strong>Le Guide de Samuel</strong>, accessible via le web et conçue pour les appareils mobiles.
              </p>
              <p className="mt-2">
                En accédant à la Plateforme, l&apos;utilisateur accepte sans réserve les présentes CGU. Si l&apos;utilisateur ne les accepte pas, il doit cesser immédiatement d&apos;utiliser la Plateforme.
              </p>
            </>
          ),
        },
        {
          title: '2. Description du service',
          content: (
            <>
              <p>
                Le Guide de Samuel est une plateforme éducative <strong>gratuite</strong> proposant :
              </p>
              <ul className="mt-3 space-y-2 list-none">
                {[
                  '5 modules de formation sur l\'importation depuis la Chine et la vente en Afrique de l\'Ouest',
                  '15 questions de quiz interactif (3 par module)',
                  '6 simulateurs et outils interactifs (budget, taxes, marge, checklist, etc.)',
                  'Un système de progression avec points XP et badges',
                  'Un certificat de complétion généré localement au format PDF',
                  'Un système de déblocage séquentiel des modules',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="w-1.5 h-1.5 bg-[#f2994a] rounded-full mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3">
                Le service est fourni sans garantie de disponibilité permanente et peut être interrompu, modifié ou supprimé à tout moment sans préavis.
              </p>
            </>
          ),
        },
        {
          title: '3. Accès et utilisation',
          content: (
            <>
              <p>
                L&apos;accès à la Plateforme est <strong>libre, gratuit et anonyme</strong>. Aucun compte, mot de passe ou adresse e-mail n&apos;est requis.
              </p>
              <p className="mt-2">
                L&apos;utilisateur peut renseigner un prénom, un nom et une ville pour personnaliser son expérience. Ces informations sont stockées exclusivement dans le navigateur de l&apos;utilisateur via la technologie <strong>localStorage</strong> et ne quittent jamais son appareil.
              </p>
              <p className="mt-2">
                La Plateforme est conçue pour fonctionner sur smartphones (Android et iOS) ainsi que sur ordinateurs disposant d&apos;un navigateur web moderne et d&apos;une connexion internet.
              </p>
            </>
          ),
        },
        {
          title: '4. Comportement de l\'utilisateur',
          content: (
            <>
              <p>
                L&apos;utilisateur s&apos;engage à utiliser la Plateforme de manière licite et conforme aux présentes CGU. Il est notamment interdit de :
              </p>
              <ul className="mt-3 space-y-2 list-none">
                {[
                  'Tenter de contourner les mécanismes de sécurité ou de progression de la Plateforme',
                  'Reproduire, copier ou distribuer le contenu pédagogique sans autorisation',
                  'Utiliser des robots ou scripts automatisés pour accéder à la Plateforme',
                  'Effectuer toute action susceptible de nuire au bon fonctionnement du service',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </>
          ),
        },
        {
          title: '5. Propriété intellectuelle',
          content: (
            <>
              <p>
                Tout le contenu de la Plateforme (textes, modules, quiz, simulateurs, design, code) est protégé par les droits de propriété intellectuelle et appartient à Samuel Pooda ou à ses concédants de licence.
              </p>
              <p className="mt-2">
                L&apos;utilisateur bénéficie d&apos;un droit d&apos;usage personnel, non exclusif et non transférable de la Plateforme, uniquement à des fins d&apos;apprentissage privé.
              </p>
              <p className="mt-2">
                Toute utilisation à des fins commerciales, toute reproduction ou distribution du contenu est strictement interdite sans accord préalable écrit de l&apos;éditeur.
              </p>
            </>
          ),
        },
        {
          title: '6. Contenu pédagogique et exactitude',
          content: (
            <>
              <p>
                Les informations fournies dans les modules de formation sont à titre <strong>exclusivement éducatif</strong>. Elles sont basées sur des recherches et des expériences personnelles et ne constituent pas :
              </p>
              <ul className="mt-3 space-y-2 list-none">
                {[
                  'Un conseil juridique ou fiscal',
                  'Une garantie de revenus ou de succès commercial',
                  'Une recommandation officielle d\'un organisme gouvernemental ou bancaire',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3">
                Les tarifs et réglementations mentionnés (coût des cartes bancaires, taxes douanières, délais de livraison) peuvent évoluer. L&apos;utilisateur est invité à vérifier ces informations auprès des organismes compétents.
              </p>
            </>
          ),
        },
        {
          title: '7. Certificat de complétion',
          content: (
            <>
              <p>
                Un certificat de complétion peut être généré et téléchargé par l&apos;utilisateur ayant complété l&apos;ensemble des 5 modules et de leurs quiz.
              </p>
              <p className="mt-2">
                Ce certificat est généré localement sur l&apos;appareil de l&apos;utilisateur. Il ne constitue <strong>pas un diplôme officiel</strong> reconnu par un organisme de certification ou d&apos;éducation nationale. Il atteste uniquement de la complétion des modules de la Plateforme.
              </p>
            </>
          ),
        },
        {
          title: '8. Limitation de responsabilité',
          content: (
            <>
              <p>
                Dans les limites permises par la loi applicable, Samuel Pooda décline toute responsabilité pour :
              </p>
              <ul className="mt-3 space-y-2 list-none">
                {[
                  'Toute perte de données résultant d\'une suppression du cache ou d\'un changement d\'appareil (les données sont stockées localement)',
                  'Toute décision commerciale prise sur la base des informations de la Plateforme',
                  'Toute interruption ou indisponibilité du service',
                  'Tout dommage direct ou indirect lié à l\'utilisation de la Plateforme',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </>
          ),
        },
        {
          title: '9. Modification des CGU',
          content: (
            <>
              <p>
                Samuel Pooda se réserve le droit de modifier les présentes CGU à tout moment. Les modifications prennent effet dès leur publication sur la Plateforme.
              </p>
              <p className="mt-2">
                L&apos;utilisation continue de la Plateforme après publication des modifications vaut acceptation des nouvelles CGU.
              </p>
            </>
          ),
        },
        {
          title: '10. Droit applicable et juridiction',
          content: (
            <>
              <p>
                Les présentes CGU sont soumises au droit en vigueur au Burkina Faso. Tout litige relatif à l&apos;utilisation de la Plateforme sera soumis à la juridiction des tribunaux compétents de Ouagadougou, après tentative de règlement amiable.
              </p>
            </>
          ),
        },
        {
          title: '11. Contact',
          content: (
            <>
              <p>Pour toute question relative aux présentes CGU :</p>
              <p className="mt-2">
                <a href="mailto:contact@leguidededsamuel.com" className="text-[#f2994a] font-semibold hover:underline">
                  contact@leguidededsamuel.com
                </a>
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
