/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    dynamicIO: true
  },
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
      },
    ],
  },
};

export default nextConfig;
