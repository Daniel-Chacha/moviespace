// import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

// const nextConfig: NextConfig = {
//   /* config options here */
// };
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',        
      },
      {
        protocol: 'https',
        hostname: 'media.kitsu.app',
      },
      {
        protocol: 'https',
        hostname: 'kitsu-production-media.s3.us-west-002.backblazeb2.com',
      },
    ],
  },
};

export default nextConfig;
