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
}

module.exports = nextConfig
