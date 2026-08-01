/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@nhgp/assets"],
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
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1",
    NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:4000",
  },
};

export default nextConfig;
