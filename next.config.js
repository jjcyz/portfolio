/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  compress: true,
  swcMinify: true,
  reactStrictMode: true,
  generateEtags: false,
  /**
   * Do not attach CSP to `/_next/*` (or other static assets). A site-wide CSP without
   * `script-src` / `connect-src` etc. can break the dev client, HMR, and chunk loading.
   * Apply only to typical HTML routes.
   */
  async headers() {
    if (process.env.NODE_ENV !== 'production') {
      return [];
    }
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https:",
      "connect-src 'self'",
    ].join('; ');
    return [
      {
        source: '/((?!_next/|favicon.ico|apple-touch-icon.png|manifest.json|images/).*)',
        headers: [{ key: 'Content-Security-Policy', value: csp }],
      },
    ];
  },
}

module.exports = nextConfig
