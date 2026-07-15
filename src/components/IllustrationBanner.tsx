'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

// Images libres de droits (CC/PD) trouvées via image_search
const MODULE_IMAGES_MAP: Record<string, { url: string; alt: string; caption: string }> = {
  // Module 1 : boîte postale + carte bancaire
  // Image : colis/parcels - Needpix (domaine public)
  mod1: {
    url: 'https://sspark.genspark.ai/cfimages?u1=a04o8aHcnOiIffLeNKMZvisQk6nN3HVWhJLKkDQ7kI%2BLj33HMXTt4HX5j9QRfHVAAPhzBVTI8ikbx2egCj6GdVqC71NdPe2yQgP64EV%2FKdE2VA%3D%3D&u2=AFSn3D5PDkBoBBjf&width=2560',
    alt: 'Colis prêts à être expédiés',
    caption: '📦 Vos premiers colis arrivent à la boîte postale',
  },
  // Module 2 : shopping en ligne - AliExpress
  mod2: {
    url: 'https://sspark.genspark.ai/cfimages?u1=rki31eu3fVQK00G7SM7Ji1HU1UxXqNfjxaRYfP47pFAQQqwvFOjhrPCxVMGkbUe%2FfoqBYeq3O5RveDjtCQPZWtSjhsxYNZrsmb8zGq9YQgqSEXHTuiUQtC2H2TANk90S&u2=zNtb5uvhTjtplGiz&width=2560',
    alt: 'Shopping sur AliExpress depuis un téléphone',
    caption: '🛒 Commander depuis AliExpress en quelques clics',
  },
  // Module 3 : fret aérien - avion cargo
  mod3_air: {
    url: 'https://sspark.genspark.ai/cfimages?u1=02n3lkyCwBN6hxUWPUFrHtyMUQ8r0xKxe2TJ09sThsc5uN0XBnQWgRkBKJPG5sjWMBZ7kVFlxLV6qVL%2BJSiRmwDxRDw75GN8FGqEDFddOehHwILyLyRnCXJH%2Bu7kMieldps8iXqNlaUMJggWtA%3D%3D&u2=XkdUPHTcFDFqNQdd&width=2560',
    alt: 'Avion cargo fret aérien',
    caption: '✈️ Fret aérien : 5 à 10 jours depuis la Chine',
  },
  // Module 3 : fret maritime - porte-conteneurs
  mod3_sea: {
    url: 'https://sspark.genspark.ai/cfimages?u1=L%2FKMMTbAhIte4Uz2mTRKSi5uDEyryEHdGMpvm7rdkWHMxpVcrEiM%2BDUrClYN9yIW1KJpn5EvG8Bh0wdArzC0dg9orImYE%2Fhf8EN4AtONMw%3D%3D&u2=itr1%2FK2AcgbnUxyY&width=2560',
    alt: 'Porte-conteneurs fret maritime',
    caption: '🚢 Fret maritime : 45 à 90 jours via Abidjan/Lomé',
  },
  // Module 4 : entrepôt logistique
  mod4: {
    url: 'https://sspark.genspark.ai/cfimages?u1=j1pntyHBwbPFXtWO4peLUfxIaTx%2FtLhu0VtErahrrlP%2BQt%2FQqop1X%2BqmUs3RNQM%2F01gVOHDu4iI9PuGf034xIrG0ut8k%2Fcx7nLqKqwuBbvZ1XXYK2zTeC0BKIwKwrDq%2FsEMQG0V%2Bbms5Mb5Ny9Mn8UW%2FShthfEwtN3GwNtXTIdFgwO3ie0TNtMUlRLgWAFDPARx6&u2=0NQ9hC31Xm%2FJDWko&width=2560',
    alt: 'Entrepôt logistique avec colis',
    caption: '🏭 Sélection des produits rentables à importer',
  },
  // Module 5 : colis/packages livraison
  mod5: {
    url: 'https://sspark.genspark.ai/cfimages?u1=vQSi1ZBMfQGAqYvG6TZNSGvDgVSwscCEZvosa2%2BrZ0FHp0iOzCy6u6lkrukDOBnqV42VQbypvdHUfvEmS9LQ3KVzC0zbvIFpGhXnFlSTK6XO6y8WylLFdIXFpI4oGS8o8D8A3mM%2B&u2=job%2FxGoEl8251thL&width=2560',
    alt: 'Livraison de colis et vente',
    caption: '💰 Vendre vos produits et générer des revenus',
  },
};

export type ModuleImageKey = keyof typeof MODULE_IMAGES_MAP;

interface IllustrationBannerProps {
  moduleKey: ModuleImageKey;
  compact?: boolean;
}

export default function IllustrationBanner({ moduleKey, compact = false }: IllustrationBannerProps) {
  const img = MODULE_IMAGES_MAP[moduleKey];
  if (!img) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl overflow-hidden relative shadow-md"
      style={{ height: compact ? 160 : 220 }}
    >
      <Image
        src={img.url}
        alt={img.alt}
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        sizes="(max-width: 768px) 100vw, 700px"
        priority={false}
        unoptimized
      />
      {/* Overlay dégradé navy */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, transparent 30%, rgba(30,58,95,0.78) 100%)'
      }} />
      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white text-sm font-semibold" style={{textShadow: '0 1px 4px rgba(0,0,0,0.6)'}}>
          {img.caption}
        </p>
      </div>
    </motion.div>
  );
}

/** Composant de grille d'images côte à côte (pour module 3 : avion + bateau) */
export function DualIllustration({
  left,
  right,
}: {
  left: ModuleImageKey;
  right: ModuleImageKey;
}) {
  const imgL = MODULE_IMAGES_MAP[left];
  const imgR = MODULE_IMAGES_MAP[right];
  if (!imgL || !imgR) return null;

  return (
    <div className="grid grid-cols-2 gap-3">
      {[{ img: imgL, key: left }, { img: imgR, key: right }].map(({ img, key }) => (
        <motion.div
          key={String(key)}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl overflow-hidden relative shadow-md"
          style={{ height: 140 }}
        >
          <Image
            src={img.url}
            alt={img.alt}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            sizes="(max-width: 768px) 50vw, 350px"
            unoptimized
          />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(180deg, transparent 20%, rgba(30,58,95,0.82) 100%)'
          }} />
          <div className="absolute bottom-0 left-0 right-0 p-2.5">
            <p className="text-white text-[11px] font-semibold leading-tight" style={{textShadow: '0 1px 4px rgba(0,0,0,0.7)'}}>
              {img.caption}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
