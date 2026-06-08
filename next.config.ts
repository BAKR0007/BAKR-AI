import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // إعداداتك القديمة (التي تعمل جيداً)
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        pathname: '/**',
      },
      // 👇 الإضافات الجديدة لحل مشكلة ظهور صور الأدوات
      {
        protocol: 'https',
        hostname: 'rapidapi.29392.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org', // احتياطاً للصور التجريبية إن وجدت
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;