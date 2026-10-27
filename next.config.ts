import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/beta",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
