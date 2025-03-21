/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['fosskok.no'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fosskok.no',
        pathname: '/**',
      },
    ],
  },
  // Use standalone output for Vercel deployment
  output: 'standalone',
  // Disable trailing slashes for testing
  trailingSlash: false,
  // Enable strict mode for better error catching
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Configure headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
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
        ],
      },
    ];
  },
  // Configure redirects
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/',
        permanent: true,
      },
      {
        source: '/admin/dashboard',
        destination: '/admin/dashboard/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
