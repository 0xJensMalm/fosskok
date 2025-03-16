/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    remotePatterns: [],
  },
  // Enable static exports for better performance
  output: 'standalone',
};

module.exports = nextConfig;
