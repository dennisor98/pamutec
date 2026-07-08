/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
    // Also allow any http hostname for local dev
    domains: [],
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
