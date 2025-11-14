import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "merry-setter-409.convex.site"
      },
      {
        protocol: "https",
        hostname: "merry-setter-409.convex.cloud"
      }
    ]
  }
};

export default nextConfig;
