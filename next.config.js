/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    mdxRss: true,
    serverComponentsExternalPackages: ['mongoose']
  },
  images: {
    domains: ['example.com']
  }
};

module.exports = nextConfig;
