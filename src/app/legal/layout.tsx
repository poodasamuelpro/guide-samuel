import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Informations légales — Le Guide de Samuel',
  description: 'Mentions légales, CGU et politique de confidentialité de Le Guide de Samuel.',
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
