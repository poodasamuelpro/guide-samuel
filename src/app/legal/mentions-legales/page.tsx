import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Mentions légales — Le Guide de Samuel',
  description: 'Mentions légales de la plateforme de formation Le Guide de Samuel.',
};

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      title="Mentions légales"
      subtitle="Informations légales relatives à la plateforme Le Guide de Samuel"
      lastUpdated="15 juillet 2025"
      sections={[
        {
          title: '1. Éditeur du site',
          content: (
            <>
              <p>
                Le site <strong>Le Guide de Samuel</strong> (ci-après « la Plateforme ») est édité par une personne physique à titre personnel et non commercial.
              </p>
              <p className="mt-2">
                <strong>Responsable de la publication :</strong> Samuel Pooda<br />
                <strong>Pays de résidence :</strong> Burkina Faso<br />
                <strong>Contact :</strong>{' '}
                <a href="mailto:contact@leguidededsamuel.com" className="text-[#f2994a] hover:underline">
                  contact@leguidededsamuel.com
                </a>
              </p>
              <p className="mt-2 text-gray-600 text-xs italic">
                Cette plateforme est une initiative éducative privée et indépendante, sans objet commercial direct.
                Elle ne collecte pas de paiement et ne vend pas de biens ou services.
              </p>
            </>
          ),
        },
        {
          title: '2. Hébergement',
          content: (
            <>
              <p>La Plateforme est hébergée par :</p>
              <div className="mt-2 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="font-semibold text-[#1a2a4a]">Vercel Inc.</p>
                <p className="text-gray-600 text-xs mt-1">
                  440 N Barranca Ave #4133<br />
                  Covina, CA 91723, États-Unis<br />
                  Site web :{' '}
                  <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[#f2994a] hover:underline">
                    vercel.com
                  </a>
                </p>
              </div>
            </>
          ),
        },
        {
          title: '3. Nature de la plateforme',
          content: (
            <>
              <p>
                Le Guide de Samuel est une <strong>plateforme de formation en ligne gratuite</strong> destinée aux entrepreneurs d&apos;Afrique de l&apos;Ouest souhaitant apprendre à importer des marchandises depuis la Chine.
              </p>
              <ul className="mt-3 space-y-2 list-none">
                {[
                  'La plateforme ne collecte aucun paiement.',
                  'Aucune inscription avec e-mail ou mot de passe n\'est requise.',
                  'Les données saisies (prénom, nom, ville) sont stockées uniquement dans le navigateur de l\'utilisateur (localStorage).',
                  'Aucune donnée personnelle n\'est transmise à des tiers.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#f2994a] rounded-full mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </>
          ),
        },
        {
          title: '4. Propriété intellectuelle',
          content: (
            <>
              <p>
                L&apos;ensemble du contenu de la Plateforme — textes, données pédagogiques, simulateurs interactifs, structure des modules, design — est la propriété intellectuelle exclusive de Samuel Pooda, sauf mention contraire.
              </p>
              <p className="mt-2">
                Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l&apos;autorisation préalable et écrite de l&apos;éditeur.
              </p>
              <p className="mt-2">
                Les marques et noms commerciaux mentionnés dans le contenu pédagogique (AliExpress, Alibaba, UBA, Ecobank, Orange Money, La Poste, etc.) appartiennent à leurs détenteurs respectifs. Leur mention est uniquement à titre d&apos;information éducative.
              </p>
            </>
          ),
        },
        {
          title: '5. Limitation de responsabilité',
          content: (
            <>
              <p>
                Les informations contenues dans cette plateforme sont fournies à titre <strong>purement indicatif et éducatif</strong>. Elles ne constituent en aucun cas un conseil juridique, fiscal ou commercial.
              </p>
              <p className="mt-2">
                Samuel Pooda s&apos;efforce de maintenir les informations à jour, mais ne peut garantir l&apos;exactitude, l&apos;exhaustivité ou l&apos;actualité des informations publiées. Les tarifs (cartes bancaires, boîte postale, taxes douanières) peuvent évoluer sans préavis.
              </p>
              <p className="mt-2">
                L&apos;utilisateur est seul responsable des décisions commerciales qu&apos;il prend sur la base des informations consultées sur la Plateforme.
              </p>
            </>
          ),
        },
        {
          title: '6. Liens hypertextes',
          content: (
            <>
              <p>
                La Plateforme peut contenir des liens vers des sites tiers (AliExpress, Alibaba, sites des banques, etc.). Ces liens sont fournis uniquement à titre informatif. Samuel Pooda n&apos;est pas responsable du contenu de ces sites ni de leur politique de confidentialité.
              </p>
            </>
          ),
        },
        {
          title: '7. Droit applicable',
          content: (
            <>
              <p>
                La Plateforme est régie par le droit en vigueur au Burkina Faso. En cas de litige, et à défaut d&apos;accord amiable, les tribunaux compétents de Ouagadougou seront seuls compétents.
              </p>
            </>
          ),
        },
        {
          title: '8. Contact',
          content: (
            <>
              <p>Pour toute question relative à ces mentions légales, vous pouvez nous contacter à :</p>
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
