import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité — Le Guide de Samuel',
  description: 'Politique de confidentialité et protection des données de la plateforme Le Guide de Samuel.',
  robots: { index: false, follow: false },
};

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-[#fafaf8] py-20 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="bg-[#1a2a4a] rounded-2xl p-8 mb-8 text-white">
          <a href="/" className="text-[#f2994a] text-sm hover:underline mb-4 block">
            ← Retour à l&apos;accueil
          </a>
          <h1 className="text-2xl font-extrabold">Politique de confidentialité</h1>
          <p className="text-white/60 mt-2 text-sm">Dernière mise à jour : Juillet 2025</p>
        </div>

        <div className="legal-content space-y-6">

          <div className="card p-6 border-2 border-green-200 bg-green-50/30">
            <h2>Notre engagement : Zéro collecte de données</h2>
            <p>
              <strong>Le Guide de Samuel ne collecte aucune donnée personnelle sur des serveurs externes.</strong> 
              Toutes les informations que vous saisissez (prénom, nom, progression) 
              restent exclusivement sur votre appareil. Aucun compte, aucun email, 
              aucune base de données distante.
            </p>
          </div>

          <div className="card p-6">
            <h2>1. Responsable du traitement</h2>
            <p>
              Le Guide de Samuel, formation éducative privée, Ouagadougou, Burkina Faso.<br />
              Contact : <a href="mailto:poodasamuelpro@gmail.com">poodasamuelpro@gmail.com</a>
            </p>
          </div>

          <div className="card p-6">
            <h2>2. Données collectées localement (localStorage)</h2>
            <p>
              Les seules données enregistrées sont stockées dans le <strong>localStorage 
              de votre navigateur</strong>, sous la clé <code>guide_samuel_v1</code>. 
              Ces données incluent :
            </p>
            <ul>
              <li>Prénom et nom (saisis lors de l&apos;onboarding)</li>
              <li>Ville (optionnel)</li>
              <li>Progression par module (modules complétés, score quiz)</li>
              <li>Points XP et badges obtenus</li>
              <li>Date de complétion des modules</li>
            </ul>
            <p>
              Ces données ne quittent jamais votre appareil. Vous pouvez les supprimer 
              à tout moment en vidant le cache/données de votre navigateur.
            </p>
          </div>

          <div className="card p-6">
            <h2>3. Données NON collectées</h2>
            <p>La plateforme ne collecte <strong>pas</strong> :</p>
            <ul>
              <li>Adresse IP ou données de navigation</li>
              <li>Adresse email ou numéro de téléphone</li>
              <li>Données de paiement (la formation est gratuite)</li>
              <li>Localisation GPS</li>
              <li>Données comportementales ou analytiques</li>
              <li>Fichiers de cookie publicitaire</li>
            </ul>
          </div>

          <div className="card p-6">
            <h2>4. Cookies</h2>
            <p>
              La plateforme n&apos;utilise <strong>aucun cookie de traçage publicitaire</strong>. 
              Le localStorage utilisé est différent des cookies et ne permet aucune 
              identification inter-sites. Aucun outil d&apos;analyse tiers (Google Analytics, 
              Hotjar, etc.) n&apos;est installé.
            </p>
          </div>

          <div className="card p-6">
            <h2>5. Partage de données</h2>
            <p>
              Vos données ne sont <strong>jamais partagées</strong> avec des tiers, car elles 
              ne sont pas transmises à des serveurs. Elles restent sur votre appareil.
            </p>
          </div>

          <div className="card p-6">
            <h2>6. Contenu vidéo (YouTube)</h2>
            <p>
              Si des vidéos YouTube sont intégrées sur la plateforme, leur lecture peut 
              entraîner le dépôt de cookies par YouTube/Google sur votre navigateur, 
              conformément à leurs propres politiques de confidentialité. Ces cookies 
              sont hors du contrôle de l&apos;éditeur de cette plateforme.
            </p>
            <p>
              Vous pouvez bloquer ces cookies via les paramètres de votre navigateur.
            </p>
          </div>

          <div className="card p-6">
            <h2>7. Sécurité</h2>
            <p>
              La plateforme est servie exclusivement via HTTPS (Vercel). 
              Les champs de saisie sont protégés contre les injections XSS. 
              Aucune clé secrète ou jeton d&apos;API sensible n&apos;est exposé côté client.
            </p>
          </div>

          <div className="card p-6">
            <h2>8. Vos droits</h2>
            <p>Puisque les données sont stockées localement sur votre appareil :</p>
            <ul>
              <li><strong>Accès :</strong> Vos données sont dans le localStorage de votre navigateur</li>
              <li><strong>Modification :</strong> Réinitialisez via les paramètres de votre navigateur</li>
              <li><strong>Suppression :</strong> Videz le cache/données du site dans votre navigateur</li>
              <li><strong>Portabilité :</strong> Non applicable (données locales)</li>
            </ul>
          </div>

          <div className="card p-6">
            <h2>9. Rétention des données</h2>
            <p>
              Les données sont conservées dans votre localStorage jusqu&apos;à ce que vous 
              effaciez manuellement les données de navigation, ou jusqu&apos;à désinstallation 
              de l&apos;application / réinitialisation de l&apos;appareil. Leur durée de vie est 
              sous votre contrôle exclusif.
            </p>
          </div>

          <div className="card p-6">
            <h2>10. Mineurs</h2>
            <p>
              La plateforme ne collecte aucune donnée. Elle peut être utilisée par des 
              personnes de tout âge dans un contexte éducatif. Aucune restriction d&apos;âge 
              n&apos;est imposée pour l&apos;accès au contenu pédagogique.
            </p>
          </div>

          <div className="card p-6">
            <h2>11. Modifications de cette politique</h2>
            <p>
              Cette politique peut être mise à jour. La date de dernière mise à jour 
              figure en haut de cette page. L&apos;utilisation continue de la plateforme 
              vaut acceptation de la politique en vigueur.
            </p>
          </div>

          <div className="card p-6">
            <h2>12. Contact</h2>
            <p>
              Pour toute question relative à cette politique : <a href="mailto:poodasamuelpro@gmail.com">poodasamuelpro@gmail.com</a>
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <a href="/legal/mentions-legales" className="badge-navy text-sm">Mentions légales</a>
          <a href="/legal/cgu" className="badge-navy text-sm">CGU</a>
          <a href="/" className="badge-orange text-sm">Retour à la formation</a>
        </div>
      </div>
    </div>
  );
}
