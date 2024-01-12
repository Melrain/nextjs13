/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRss: true,
    serverComponentsExternalPackages: ['mongoose'],
    serverActions: true
  },

  images: {
    domains: ['example.com'],
    remotePatterns: [{ protocol: 'https', hostname: '*' }]
  },
  env: {
    NOWPAYMENT_API_KEY: process.env.NOWPAYMENT_API_KEY
  }
};

module.exports = nextConfig;
