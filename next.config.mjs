/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'getdelve.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
