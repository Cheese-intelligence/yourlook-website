import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/beta",
        destination: "/",
        permanent: true,
      },
      {
        source: "/beta/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/thank-you",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
