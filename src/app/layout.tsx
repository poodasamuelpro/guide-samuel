import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Le Guide de Samuel — Commander et Vendre en Chine',
  description: 'La formation complète pour importer depuis la Chine et vendre en Afrique de l\'Ouest. 5 modules, simulateurs interactifs, certificat.',
  keywords: 'importation chine, burkina faso, afrique ouest, aliexpress, alibaba, formation',
  openGraph: {
    title: 'Le Guide de Samuel',
    description: 'Commander et Vendre en Chine — Formation interactive',
    type: 'website',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
