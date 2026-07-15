import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://guide-samuel.vercel.app/sitemap.xml',
    host: 'https://guide-samuel.vercel.app',
  };
}
