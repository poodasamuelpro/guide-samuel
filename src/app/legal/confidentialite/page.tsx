import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité — Le Guide de Samuel',
  description: 'Politique de confidentialité et de protection des données de Le Guide de Samuel.',
};

export default function ConfidentialitePage() {
  return (
    <LegalPage
      title="Politique de Confidentialité"
      subtitle="Protection des données personnelles et de la vie privée"
      lastUpdated="15 juillet 2025"
      sections={[
        {
          title: '1. Introduction',
          content: (
            <>
              <p>
                Samuel Pooda, éditeur de la plateforme <strong>Le Guide de Samuel</strong>, prend très au sérieux la protection de votre vie privée. La présente politique de confidentialité vous informe de la manière dont vos données sont traitées lorsque vous utilisez la Plateforme.
              </p>
              <p className="mt-2">
                La Plateforme a été conçue selon le principe de <strong>« privacy by design »</strong> : les données personnelles ne quittent jamais votre appareil.
              </p>
            </>
          ),
        },
        {
          title: '2. Données collectées',
          content: (
            <>
              <p className="font-semibold text-[#1a2a4a] mb-3">2.1 Données saisies volontairement</p>
              <p>
                Lors de votre première visite, vous pouvez renseigner de manière optionnelle :
              </p>
              <ul className="mt-2 space-y-1.5 list-none">
                {[
                  'Votre prénom (requis pour personnalisation)',
                  'Votre nom de famille (requis pour personnalisation)',
                  'Votre ville (optionnel)',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#f2994a] rounded-full mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3">
                <p className="text-green-800 text-sm font-semibold">
                  Ces données sont stockées <em>exclusivement</em> dans votre navigateur via la technologie localStorage. Elles ne sont jamais transmises à aucun serveur, aucune base de données distante, ni à aucun tiers.
                </p>
              </div>

              <p className="font-semibold text-[#1a2a4a] mt-5 mb-3">2.2 Données de progression</p>
              <p>
                La Plateforme sauvegarde localement sur votre appareil :
              </p>
              <ul className="mt-2 space-y-1.5 list-none">
                {[
                  'Votre progression dans les modules (modules complétés, quiz réussis)',
                  'Vos points XP accumulés',
                  'Vos badges obtenus',
                  'La date de complétion de chaque module',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-gray-600">
                Ces données sont stockées sous la clé <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">guide_samuel_v1</code> dans le localStorage de votre navigateur.
              </p>
            </>
          ),
        },
        {
          title: '3. Données NON collectées',
          content: (
            <>
              <p>La Plateforme <strong>ne collecte pas</strong> les données suivantes :</p>
              <div className="mt-3 grid grid-cols-1 gap-2">
                {[
                  'Adresse e-mail ou numéro de téléphone',
                  'Adresse IP ou données de géolocalisation',
                  'Cookies de tracking ou cookies tiers',
                  'Données financières ou bancaires',
                  'Identifiants de réseaux sociaux',
                  'Données biométriques',
                  'Historique de navigation',
                  'Informations sur l\'appareil (modèle, OS, etc.)',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-red-50 rounded-lg px-3 py-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                    <span className="text-sm text-red-700">{item}</span>
                  </div>
                ))}
              </div>
            </>
          ),
        },
        {
          title: '4. Cookies et technologies similaires',
          content: (
            <>
              <p>
                La Plateforme <strong>n&apos;utilise pas de cookies</strong> à des fins de suivi, d&apos;analyse ou de publicité.
              </p>
              <p className="mt-2">
                La technologie utilisée est le <strong>localStorage</strong> du navigateur, qui est une forme de stockage local différente des cookies. Le localStorage :
              </p>
              <ul className="mt-2 space-y-1.5 list-none">
                {[
                  'Ne quitte jamais votre appareil',
                  'N\'est pas envoyé automatiquement avec les requêtes HTTP',
                  'N\'est pas accessible par d\'autres sites web',
                  'Persiste jusqu\'à ce que vous le supprimiez manuellement',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </>
          ),
        },
        {
          title: '5. Partage des données',
          content: (
            <>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-green-800 font-semibold text-sm">
                  Aucune donnée vous concernant n&apos;est partagée avec des tiers, vendue, louée ou transférée de quelque façon que ce soit.
                </p>
              </div>
              <p className="mt-3">
                La Plateforme n&apos;intègre pas de systèmes d&apos;analyse d&apos;audience (Google Analytics, Facebook Pixel, etc.) ni de services publicitaires.
              </p>
            </>
          ),
        },
        {
          title: '6. Vidéos intégrées (optionnelles)',
          content: (
            <>
              <p>
                Certains modules peuvent contenir des vidéos hébergées sur YouTube. Ces vidéos sont intégrées de manière optionnelle — elles ne s&apos;affichent que si l&apos;éditeur de la Plateforme a configuré les liens vidéo correspondants.
              </p>
              <p className="mt-2">
                Lorsqu&apos;une vidéo YouTube est chargée, votre navigateur établit une connexion avec les serveurs de Google/YouTube. Cette connexion est soumise à la{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f2994a] hover:underline"
                >
                  politique de confidentialité de Google
                </a>.
              </p>
            </>
          ),
        },
        {
          title: '7. Sécurité des données',
          content: (
            <>
              <p>
                Étant donné que toutes les données sont stockées uniquement sur votre appareil, la sécurité de vos données dépend principalement de la sécurité de votre propre appareil.
              </p>
              <p className="mt-2">
                Des mesures de sécurité sont néanmoins implémentées côté Plateforme :
              </p>
              <ul className="mt-2 space-y-1.5 list-none">
                {[
                  'Transmission sécurisée via HTTPS',
                  'En-têtes de sécurité HTTP (CSP, X-Frame-Options, X-Content-Type-Options)',
                  'Validation et assainissement des entrées utilisateur (protection XSS)',
                  'Aucune base de données distante à pirater',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#1a2a4a] rounded-full mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </>
          ),
        },
        {
          title: '8. Vos droits',
          content: (
            <>
              <p>
                Conformément à la réglementation applicable en matière de protection des données, vous disposez des droits suivants :
              </p>
              <div className="mt-3 space-y-2">
                {[
                  { droit: 'Droit d\'accès', desc: 'Vous pouvez accéder à vos données à tout moment via les paramètres de votre navigateur (localStorage).' },
                  { droit: 'Droit de suppression', desc: 'Vous pouvez supprimer toutes vos données en vidant le localStorage de votre navigateur. Sur mobile : Paramètres → Navigateur → Effacer les données du site.' },
                  { droit: 'Droit de rectification', desc: 'Vous pouvez modifier vos informations personnelles en réinitialisant votre profil dans l\'application.' },
                  { droit: 'Droit à la portabilité', desc: 'Vos données étant déjà sur votre appareil, elles sont par nature portables.' },
                ].map(({ droit, desc }, i) => (
                  <div key={i} className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                    <p className="font-semibold text-[#1a2a4a] text-sm">{droit}</p>
                    <p className="text-gray-600 text-xs mt-1">{desc}</p>
                  </div>
                ))}
              </div>
            </>
          ),
        },
        {
          title: '9. Rétention des données',
          content: (
            <>
              <p>
                Vos données sont conservées indéfiniment dans le localStorage de votre navigateur, jusqu&apos;à ce que vous les supprimiez manuellement.
              </p>
              <p className="mt-2">
                Pour supprimer toutes vos données :
              </p>
              <div className="mt-2 bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-2">
                <p className="text-sm"><strong>Sur Android (Chrome) :</strong> Paramètres → Confidentialité → Effacer les données de navigation → Données du site</p>
                <p className="text-sm"><strong>Sur iOS (Safari) :</strong> Réglages → Safari → Effacer l&apos;historique et les données du site</p>
                <p className="text-sm"><strong>Sur ordinateur :</strong> F12 → Application → localStorage → Supprimer la clé <code className="bg-gray-200 px-1 rounded text-xs font-mono">guide_samuel_v1</code></p>
              </div>
            </>
          ),
        },
        {
          title: '10. Mineurs',
          content: (
            <>
              <p>
                La Plateforme est destinée à un public adulte entrepreneur. Elle n&apos;est pas spécifiquement conçue pour des mineurs. Si vous avez moins de 18 ans, l&apos;utilisation de la Plateforme doit se faire avec l&apos;accord d&apos;un parent ou tuteur.
              </p>
            </>
          ),
        },
        {
          title: '11. Modifications de la politique',
          content: (
            <>
              <p>
                La présente politique de confidentialité peut être modifiée à tout moment. Toute modification sera publiée sur cette page avec une mise à jour de la date de dernière révision.
              </p>
            </>
          ),
        },
        {
          title: '12. Contact',
          content: (
            <>
              <p>
                Pour toute question relative à la protection de vos données personnelles ou pour exercer vos droits, contactez-nous :
              </p>
              <p className="mt-2">
                <a href="mailto:contact@leguidededsamuel.com" className="text-[#f2994a] font-semibold hover:underline">
                  contact@leguidededsamuel.com
                </a>
              </p>
              <p className="mt-2 text-gray-500 text-xs">
                Nous nous engageons à répondre à toute demande dans un délai raisonnable de 15 jours ouvrés.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
