import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-b8708cc439d048e5a408add2b251c642.r2.dev",
        pathname: "/**",
      },
      // Agar localhost:8081 (NEXT_PUBLIC_IMAGE_BASE_URL) se bhi kabhi
      // images aati hain to wo bhi yahan add kar dena:
      {
        protocol: "http",
        hostname: "localhost",
        port: "8081",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;