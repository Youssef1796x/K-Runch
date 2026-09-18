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
      {
        protocol: "https",
        hostname: "media.almashhad.com",
      },
      {
        protocol: "https",
        hostname: "www.alkhan-mart.com",
      },
      {
        protocol: "https",
        hostname: "www.osmanmarket.com",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "images.deliveryhero.io",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
    ],
  },
};

export default nextConfig;
