import { BrandMark } from './Logo';
import { Mail, MapPin, Share2, Play, Radio } from 'lucide-react';

const LEGAL_LINKS = [
  { href: '/legal/mentions-legales', label: 'Mentions légales' },
  { href: '/legal/confidentialite', label: 'Confidentialité' },
  { href: '/legal/cgu', label: 'Conditions d\'utilisation' },
];

const NAV_LINKS = [
  { label: 'Accueil', href: '#' },
  { label: 'Les Modules', href: '#' },
  { label: 'À propos', href: '#' },
  { label: 'Contact', href: 'mailto:contact@guide-samuel.app' },
];

const SOCIAL = [
  { Icon: Share2, href: '#', label: 'Facebook' },
  { Icon: Radio, href: '#', label: 'Instagram' },
  { Icon: Play, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1a2a4a] text-white" role="contentinfo">
      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand column */}
          <div className="md:col-span-1">
            <BrandMark size="sm" variant="light" />
            <p className="mt-4 text-sm text-white/65 leading-relaxed max-w-xs">
              La formation de référence pour importer depuis la Chine et vendre 
              en Afrique de l&apos;Ouest. Accessible sur mobile, 100% gratuit.
            </p>
            <div className="flex items-center gap-1.5 mt-4">
              <MapPin size={13} className="text-[#f2994a] shrink-0" />
              <span className="text-xs text-white/50">Ouagadougou, Burkina Faso</span>
            </div>
            {/* Social */}
            <div className="flex items-center gap-3 mt-5">
              {SOCIAL.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#f2994a] transition-colors min-h-0"
                >
                  <Icon size={16} />
                </a>
              ))}
              <a
                href="mailto:contact@guide-samuel.app"
                aria-label="Email"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#f2994a] transition-colors min-h-0"
              >
                <Mail size={16} />
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
                    className="text-sm text-white/60 hover:text-[#f2994a] transition-colors flex items-center gap-1.5 min-h-0"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#f2994a] shrink-0" />
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
                    className="text-sm text-white/60 hover:text-[#f2994a] transition-colors flex items-center gap-1.5 min-h-0"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#f2994a] shrink-0" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-3 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xs text-white/50 leading-relaxed">
                Aucune donnée personnelle collectée. Toutes les informations 
                restent sur votre appareil (localStorage).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {year} Le Guide de Samuel · Tous droits réservés
          </p>
          <p className="text-xs text-white/40">
            Formation privée, non commerciale · Fait avec <span className="text-[#f2994a]">♥</span> au Burkina Faso
          </p>
        </div>
      </div>
    </footer>
  );
}
