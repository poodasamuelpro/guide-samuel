import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions légales — Le Guide de Samuel',
  description: 'Mentions légales de la plateforme Le Guide de Samuel.',
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-[#fafaf8] py-20 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="bg-[#1e3a5f] rounded-2xl p-8 mb-8 text-white">
          <a href="/" className="text-[#f6932a] text-sm hover:underline mb-4 block">
            ← Retour à l&apos;accueil
          </a>
          <h1 className="text-2xl font-extrabold">Mentions légales</h1>
          <p className="text-white/60 mt-2 text-sm">Dernière mise à jour : Juillet 2025</p>
        </div>

        <div className="legal-content space-y-6">

          <div className="card p-6">
            <h2>1. Éditeur de la plateforme</h2>
            <p>
              La plateforme <strong>Le Guide de Samuel</strong> est un projet éducatif non commercial,
              édité à titre personnel par son créateur résidant à Ouagadougou, Burkina Faso.
            </p>
            <ul>
              <li><strong>Nom de la plateforme :</strong> Le Guide de Samuel</li>
              <li><strong>Contact :</strong> poodasamuelpro@gmail.com</li>
              <li><strong>Nature :</strong> Formation privée, non commerciale, gratuite</li>
              <li><strong>Pays d&apos;origine :</strong> Burkina Faso</li>
            </ul>
          </div>

          <div className="card p-6">
            <h2>2. Hébergement</h2>
            <p>
              La plateforme est hébergée sur l&apos;infrastructure de <strong>Vercel Inc.</strong>
            </p>
            <ul>
              <li><strong>Entreprise :</strong> Vercel Inc.</li>
              <li><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</li>
              <li><strong>Site :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a></li>
            </ul>
          </div>

          <div className="card p-6">
            <h2>3. Nature de la plateforme</h2>
            <p>
              Le Guide de Samuel est une plateforme éducative interactive permettant aux 
              entrepreneurs d&apos;Afrique de l&apos;Ouest d&apos;apprendre à importer depuis la Chine 
              et à vendre leurs produits localement. Elle est entièrement gratuite.
            </p>
            <ul>
              <li>Aucun achat ou abonnement n&apos;est requis</li>
              <li>Aucun compte utilisateur n&apos;est créé sur des serveurs</li>
              <li>Les données (prénom, nom, progression) sont stockées uniquement sur l&apos;appareil de l&apos;utilisateur</li>
            </ul>
          </div>

          <div className="card p-6">
            <h2>4. Propriété intellectuelle</h2>
            <p>
              Tout le contenu de cette plateforme (textes, simulateurs, design, code source, 
              certificat) est la propriété exclusive de son créateur. Toute reproduction, 
              distribution ou utilisation commerciale sans autorisation écrite préalable est interdite.
            </p>
          </div>

          <div className="card p-6">
            <h2>5. Limitation de responsabilité</h2>
            <p>
              Les informations fournies sur cette plateforme ont un but éducatif uniquement. 
              Les chiffres présentés (tarifs bancaires, coûts de fret, taxes douanières) sont 
              des estimations indicatives susceptibles de variation. L&apos;éditeur ne peut être 
              tenu responsable de décisions commerciales prises sur la base de ces informations.
            </p>
            <p>
              Pour toute décision d&apos;investissement, consultez les sources officielles :
              votre banque, La Poste du Burkina Faso, la Direction Générale des Douanes du Burkina Faso.
            </p>
          </div>

          <div className="card p-6">
            <h2>6. Liens hypertextes</h2>
            <p>
              Cette plateforme peut contenir des liens vers des sites tiers (AliExpress, Alibaba, 
              La Poste BF, etc.). Ces liens sont fournis à titre informatif. L&apos;éditeur n&apos;est pas 
              responsable du contenu de ces sites externes.
            </p>
          </div>

          <div className="card p-6">
            <h2>7. Droit applicable</h2>
            <p>
              Les présentes mentions légales sont soumises au droit burkinabè. 
              Tout litige sera soumis aux juridictions compétentes de Ouagadougou, Burkina Faso.
            </p>
          </div>

          <div className="card p-6">
            <h2>8. Contact</h2>
            <p>
              Pour toute question ou signalement : <a href="mailto:poodasamuelpro@gmail.com">poodasamuelpro@gmail.com</a>
            </p>
          </div>
        </div>

        {/* Footer nav */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <a href="/legal/cgu" className="badge-navy text-sm">CGU</a>
          <a href="/legal/confidentialite" className="badge-navy text-sm">Confidentialité</a>
          <a href="/" className="badge-orange text-sm">Retour à la formation</a>
        </div>
      </div>
    </div>
  );
}
