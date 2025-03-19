/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    remotePatterns: [],
  },
  // Use standalone output for Vercel deployment
  output: 'standalone',
  // Ensure trailing slashes for better compatibility
  trailingSlash: true,
};

module.exports = nextConfig;
