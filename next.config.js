/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization for lightning-fast loading
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year cache
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Compression and performance headers
  compress: true,

  // Generate ETags for caching
  generateEtags: true,

  // Optimize production builds
  productionBrowserSourceMaps: false,

  // Poweredby header disabled for security
  poweredByHeader: false,

  // Use SWC minification
  swcMinify: true,

  // Enable React strict mode for development
  reactStrictMode: true,

  // Experimental optimizations
  experimental: {
    optimizePackageImports: [
      'gsap',
      'framer-motion',
      '@gsap/react',
    ],
  },

  // Custom headers for performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirects for legacy URLs (if needed)
  async redirects() {
    return [];
  },
};

module.exports = nextConfig;


