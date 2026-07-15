import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Le Guide de Samuel — Importation Chine, Vente Afrique de l\'Ouest',
  description: 'La formation complète pour importer depuis la Chine et vendre en Afrique de l\'Ouest. 5 modules, simulateurs interactifs, certificat PDF gratuit.',
  keywords: 'importation chine, burkina faso, afrique ouest, aliexpress, alibaba, formation, entrepreneuriat',
  openGraph: {
    title: 'Le Guide de Samuel',
    description: 'Commander et Vendre depuis la Chine — Formation interactive gratuite',
    type: 'website',
    locale: 'fr_FR',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#1a2a4a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
