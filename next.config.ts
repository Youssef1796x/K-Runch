import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "3000-" + (process.env.BASE44_PUBLIC_HOST_SUFFIX ?? ""),
  ],

  images: {
    qualities: [60, 65, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "redlandsranchmarket.com",
      },
      {
        protocol: "https",
        hostname: "www.ajegroup.com",
      },
    ],
  },
};

export default nextConfig;
