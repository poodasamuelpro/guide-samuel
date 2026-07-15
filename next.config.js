/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance: enable React strict mode
  reactStrictMode: true,

  // Skip TypeScript and ESLint checks during build
  // (tsc --noEmit is run separately as part of the CI/pre-commit workflow)
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: true },

  // Security headers applied to all routes
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        // Prevent MIME-type sniffing
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        // Prevent clickjacking — no iframe embedding
        { key: 'X-Frame-Options', value: 'DENY' },
        // Legacy XSS filter (still useful for older browsers)
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        // Referrer policy for privacy
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        // HSTS: force HTTPS for 1 year (Vercel handles this, belt-and-suspenders)
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains',
        },
        // Permissions policy: disable unnecessary browser features
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=(), payment=()',
        },
        // Content Security Policy
        {
          key: 'Content-Security-Policy',
          value: [
            // Only load resources from our own origin by default
            "default-src 'self'",
            // Scripts: self + inline (Next.js requires unsafe-inline for hydration)
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            // Styles: self + inline + Google Fonts
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            // Fonts: self + Google Fonts CDN
            "font-src 'self' https://fonts.gstatic.com data:",
            // Images: self + data URIs + blob (for jsPDF certificate generation)
            "img-src 'self' data: blob:",
            // Frames: only YouTube for video players
            "frame-src https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com",
            // Fetch/XHR: only our own origin (no backend, no external API calls)
            "connect-src 'self'",
            // Workers: needed for jsPDF
            "worker-src 'self' blob:",
            // Media: self only
            "media-src 'self'",
            // Object/embed: none
            "object-src 'none'",
            // Base URI: restrict to self to prevent base tag injection
            "base-uri 'self'",
            // Form submissions: self only
            "form-action 'self'",
            // Upgrade insecure requests in production
            "upgrade-insecure-requests",
          ].join('; '),
        },
      ],
    },
  ],

  // Image optimization config (no remote images used currently)
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
};

module.exports = nextConfig;
