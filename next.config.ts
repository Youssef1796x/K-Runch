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
      },\n      {\n        protocol: "https",\n        hostname: "redlandsranchmarket.com",\n      },\n      {\n        protocol: "https",\n        hostname: "www.ajegroup.com",\n      },
    ],
  },
};

export default nextConfig;
