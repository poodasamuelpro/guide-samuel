import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conditions Générales d\'Utilisation — Le Guide de Samuel',
  description: 'Conditions générales d\'utilisation de la plateforme Le Guide de Samuel.',
  robots: { index: false, follow: false },
};

export default function CGUPage() {
  return (
    <div className="min-h-screen bg-[#fafaf8] py-20 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="bg-[#1a2a4a] rounded-2xl p-8 mb-8 text-white">
          <a href="/" className="text-[#f2994a] text-sm hover:underline mb-4 block">
            ← Retour à l&apos;accueil
          </a>
          <h1 className="text-2xl font-extrabold">Conditions Générales d&apos;Utilisation</h1>
          <p className="text-white/60 mt-2 text-sm">Dernière mise à jour : Juillet 2025</p>
        </div>

        <div className="legal-content space-y-6">

          <div className="card p-6">
            <h2>1. Objet</h2>
            <p>
              Les présentes Conditions Générales d&apos;Utilisation (CGU) régissent l&apos;accès et 
              l&apos;utilisation de la plateforme <strong>Le Guide de Samuel</strong>, accessible 
              gratuitement. En utilisant cette plateforme, vous acceptez sans réserve les présentes CGU.
            </p>
          </div>

          <div className="card p-6">
            <h2>2. Description du service</h2>
            <p>
              Le Guide de Samuel est une plateforme éducative interactive qui propose :
            </p>
            <ul>
              <li>5 modules de formation sur l&apos;importation depuis la Chine</li>
              <li>Des simulateurs et jeux interactifs pour pratiquer les concepts</li>
              <li>Des quiz de validation des connaissances</li>
              <li>Un système de progression avec points XP et badges</li>
              <li>Un certificat de formation téléchargeable en PDF</li>
            </ul>
          </div>

          <div className="card p-6">
            <h2>3. Accès à la plateforme</h2>
            <p>
              L&apos;accès est libre et gratuit, sans création de compte obligatoire. 
              La plateforme fonctionne entièrement côté navigateur. Aucune inscription 
              par email n&apos;est requise.
            </p>
            <p>
              L&apos;utilisateur doit disposer d&apos;un appareil connecté à Internet avec 
              un navigateur web moderne (Chrome, Firefox, Safari, Edge).
            </p>
          </div>

          <div className="card p-6">
            <h2>4. Comportement de l&apos;utilisateur</h2>
            <p>L&apos;utilisateur s&apos;engage à :</p>
            <ul>
              <li>Utiliser la plateforme à des fins personnelles et éducatives uniquement</li>
              <li>Ne pas tenter de contourner les mécanismes de progression</li>
              <li>Ne pas copier, redistribuer ou revendre le contenu sans autorisation</li>
              <li>Ne pas utiliser la plateforme pour des activités illégales</li>
            </ul>
          </div>

          <div className="card p-6">
            <h2>5. Propriété intellectuelle</h2>
            <p>
              Tout le contenu de la plateforme (textes pédagogiques, simulateurs, 
              design graphique, code source) est protégé par le droit de la propriété 
              intellectuelle. Toute reproduction totale ou partielle à des fins commerciales 
              sans accord préalable est interdite.
            </p>
            <p>
              L&apos;utilisation personnelle, le partage de liens et les citations avec 
              attribution sont autorisés.
            </p>
          </div>

          <div className="card p-6">
            <h2>6. Contenu pédagogique</h2>
            <p>
              Les informations fournies dans la formation sont rédigées à titre éducatif 
              et informatif. Les tarifs, délais, et réglementations mentionnés sont des 
              estimations basées sur des sources publiques et peuvent évoluer.
            </p>
            <p>
              <strong>L&apos;éditeur recommande vivement de vérifier toute information 
              critique auprès des sources officielles</strong> (banques, douanes, La Poste) 
              avant de prendre une décision commerciale.
            </p>
          </div>

          <div className="card p-6">
            <h2>7. Certificat de formation</h2>
            <p>
              Le certificat généré par la plateforme est un document récapitulatif à 
              caractère personnel. Il n&apos;a pas de valeur académique officielle et ne 
              constitue pas une qualification professionnelle reconnue. Il est destiné 
              à valoriser le parcours personnel de l&apos;apprenant.
            </p>
          </div>

          <div className="card p-6">
            <h2>8. Limitation de responsabilité</h2>
            <p>
              L&apos;éditeur ne peut être tenu responsable :
            </p>
            <ul>
              <li>De pertes de données dues à l&apos;effacement du cache/localStorage</li>
              <li>Des décisions commerciales prises sur la base des informations fournies</li>
              <li>Des interruptions de service dues à l&apos;hébergeur ou à une panne technique</li>
              <li>De l&apos;exactitude des tarifs et réglementations qui peuvent évoluer</li>
            </ul>
          </div>

          <div className="card p-6">
            <h2>9. Modification des CGU</h2>
            <p>
              L&apos;éditeur se réserve le droit de modifier les présentes CGU à tout moment. 
              Les modifications entrent en vigueur à la date de leur publication sur la plateforme. 
              L&apos;utilisation continue de la plateforme vaut acceptation des CGU modifiées.
            </p>
          </div>

          <div className="card p-6">
            <h2>10. Droit applicable</h2>
            <p>
              Les présentes CGU sont régies par le droit burkinabè. 
              Tout litige sera porté devant les juridictions compétentes de Ouagadougou, Burkina Faso.
            </p>
          </div>

          <div className="card p-6">
            <h2>11. Contact</h2>
            <p>
              Pour toute question relative aux présentes CGU : <a href="mailto:poodasamuelpro@gmail.com">poodasamuelpro@gmail.com</a>
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <a href="/legal/mentions-legales" className="badge-navy text-sm">Mentions légales</a>
          <a href="/legal/confidentialite" className="badge-navy text-sm">Confidentialité</a>
          <a href="/" className="badge-orange text-sm">Retour à la formation</a>
        </div>
      </div>
    </div>
  );
}
