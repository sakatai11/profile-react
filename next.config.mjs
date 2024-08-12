/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
      },
    ],
    loader: 'custom',
    loaderFile: './app/_components/elements/loader/image/loader.ts',
  },
};

export default nextConfig;
