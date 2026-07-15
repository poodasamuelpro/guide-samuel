import Link from 'next/link';

interface LegalSection {
  title: string;
  content: React.ReactNode;
}

interface LegalPageProps {
  title: string;
  subtitle?: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export default function LegalPage({ title, subtitle, lastUpdated, sections }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#1a2a4a] to-[#0f1a2e] text-white px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm mb-6 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Retour à l&apos;accueil
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-[#f2994a] rounded-full" />
            <h1 className="text-2xl font-bold text-white">{title}</h1>
          </div>
          {subtitle && (
            <p className="text-blue-200 text-sm ml-4">{subtitle}</p>
          )}
          <p className="text-gray-400 text-xs mt-3 ml-4">Dernière mise à jour : {lastUpdated}</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-8 pb-16">
        <div className="space-y-8">
          {sections.map((section, i) => (
            <section key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-[#1a2a4a] mb-4 pb-2 border-b border-gray-100">
                {section.title}
              </h2>
              <div className="text-sm text-gray-700 leading-relaxed space-y-3">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {/* Navigation légale */}
        <div className="mt-10 bg-[#1a2a4a] rounded-2xl p-5 text-white">
          <p className="text-sm font-semibold mb-3 text-gray-300">Autres documents légaux</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {[
              { href: '/legal/mentions-legales', label: 'Mentions légales' },
              { href: '/legal/cgu', label: 'Conditions d\'utilisation' },
              { href: '/legal/confidentialite', label: 'Confidentialité' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-blue-300 hover:text-white transition-colors py-1.5 px-3 rounded-lg hover:bg-white/10 text-center border border-white/10 hover:border-white/30"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
