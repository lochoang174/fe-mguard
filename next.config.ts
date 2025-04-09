import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  devIndicators: false
  /* config options here */
};

export default nextConfig;
