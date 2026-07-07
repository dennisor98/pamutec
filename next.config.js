/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve AVIF first, fall back to WebP -- both far smaller than the
    // original JPEG/PNG uploads. Fixes: LCP 7.9s, 9.52MB image payload,
    // "convert to WebP", "responsive images" audit findings.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 220, 256],
    minimumCacheTTL: 31536000, // 1 year -- pairs with "JS/CSS files are cached" strength
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.MINIO_ENDPOINT || 'localhost',
        port: process.env.MINIO_PORT || '9000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: process.env.MINIO_ENDPOINT || 'localhost',
        pathname: '/**',
      },
    ],
  },

  // --- P1 #6: URL canonicalization (www vs non-www) ---
  // Permanently redirects the www host to the bare domain so Google and
  // browsers only ever see one canonical URL. Update the hostname below if
  // the canonical domain choice changes.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.sevenssstarskenya.co.ke' }],
        destination: 'https://sevenssstarskenya.co.ke/:path*',
        permanent: true,
      },
    ];
  },

  // --- P2 hygiene: Missing HSTS header ---
  // NOTE: if the site sits behind a CDN/reverse proxy (Cloudflare, Nginx,
  // etc.), that layer must also forward/set this header -- a header set only
  // here will be ignored if the proxy strips it or serves a cached response
  // directly. Confirm with whoever manages the edge/CDN layer.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
