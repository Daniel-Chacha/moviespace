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
    ],
  },
};

export default nextConfig;
