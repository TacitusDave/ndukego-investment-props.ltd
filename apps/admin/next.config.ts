import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@nhgp/assets"],
  reactCompiler: true,
  allowedDevOrigins: ["192.168.0.192"],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
