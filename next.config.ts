// next.config.ts
import type { NextConfig } from "next";
import * as path from "path";

const nextConfig: NextConfig = {
  // point turbopack at this project folder
  turbopack: {
    root: path.resolve(__dirname),
  },

  images: {
    // remotePatterns is preferred for fine-grained control:
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pgvhhgmrjcpcrwvrfuvz.supabase.co",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
