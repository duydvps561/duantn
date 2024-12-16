/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend-duan-9qb7.onrender.com',
        port: '',
        pathname: '/img/**',
      },
    ],
  },
};

export default nextConfig;