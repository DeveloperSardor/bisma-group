import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    qualities: [75, 80, 85, 90],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "optim.tildacdn.one" },
    ],
  },
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
};

export default nextConfig;


