import { BrandMark } from './Logo';
import { Mail, MapPin } from 'lucide-react';

const LEGAL_LINKS = [
  { href: '/legal/mentions-legales', label: 'Mentions légales' },
  { href: '/legal/confidentialite', label: 'Confidentialité' },
  { href: '/legal/cgu', label: 'Conditions d\'utilisation' },
];

const NAV_LINKS = [
  { label: 'Accueil', href: '#' },
  { label: 'Les Modules', href: '#' },
  { label: 'À propos', href: '#' },
  { label: 'Contact', href: 'mailto:poodasamuelpro@gmail.com' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: 'var(--brand-deep)', color: '#ffffff' }} role="contentinfo">
      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand column */}
          <div className="md:col-span-1">
            <BrandMark size="sm" variant="light" />
            <p className="mt-4 text-sm leading-relaxed max-w-xs" style={{ color: 'rgba(255,255,255,0.88)' }}>
              La formation de référence pour importer depuis la Chine et vendre 
              en Afrique de l&apos;Ouest. Accessible sur mobile, 100% gratuit.
            </p>
            <div className="flex items-center gap-1.5 mt-4">
              <MapPin size={13} style={{ color: 'var(--brand-accent)' }} className="shrink-0" />
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.80)' }}>Ouagadougou, Burkina Faso</span>
            </div>
            {/* Contact email */}
            <div className="flex items-center gap-2 mt-5">
              <a
                href="mailto:poodasamuelpro@gmail.com"
                aria-label="Envoyer un email"
                className="flex items-center gap-2 px-4 py-2 rounded-xl transition-colors text-sm"
                style={{
                  background: 'rgba(255,255,255,0.10)',
                  color: 'rgba(255,255,255,0.92)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'var(--brand-accent)';
                  (e.currentTarget as HTMLAnchorElement).style.color = '#073b4c';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.10)';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.92)';
                }}
              >
                <Mail size={15} />
                <span>poodasamuelpro@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5" role="list">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm flex items-center gap-1.5 min-h-0 transition-colors"
                    style={{ color: 'rgba(255,255,255,0.85)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--brand-accent)'}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.85)'}
                  >
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: 'var(--brand-accent)' }} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">
              Informations légales
            </h3>
            <ul className="space-y-2.5" role="list">
              {LEGAL_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm flex items-center gap-1.5 min-h-0 transition-colors"
                    style={{ color: 'rgba(255,255,255,0.85)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--brand-accent)'}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.85)'}
                  >
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: 'var(--brand-accent)' }} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-3 rounded-xl border" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.10)' }}>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.78)' }}>
                Aucune donnée personnelle collectée. Toutes les informations 
                restent sur votre appareil (localStorage).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.88)' }}>
            © {year} Le Guide de Samuel · Tous droits réservés
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.88)' }}>
            Formation privée, non commerciale · Burkina Faso
          </p>
        </div>
      </div>
    </footer>
  );
}
