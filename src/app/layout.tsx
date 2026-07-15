import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Le Guide de Samuel — Importer depuis la Chine, Vendre en Afrique de l\'Ouest',
  description: 'La formation complète pour importer depuis la Chine et vendre en Afrique de l\'Ouest. 5 modules interactifs, simulateurs, quiz et certificat PDF gratuit. Burkina Faso, Côte d\'Ivoire, Sénégal.',
  keywords: 'importation chine, burkina faso, afrique de l\'ouest, aliexpress, alibaba, formation entrepreneuriat, e-commerce afrique, transitaire, douane',
  authors: [{ name: 'Le Guide de Samuel' }],
  creator: 'Le Guide de Samuel',
  metadataBase: new URL('https://guide-samuel.vercel.app'),
  openGraph: {
    title: 'Le Guide de Samuel — Commander depuis la Chine',
    description: 'Formation interactive gratuite : importer depuis la Chine et vendre en Afrique de l\'Ouest. 5 modules + simulateurs + certificat.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Le Guide de Samuel',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le Guide de Samuel',
    description: 'Formation : importer de Chine & vendre en Afrique de l\'Ouest',
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#073b4c',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
