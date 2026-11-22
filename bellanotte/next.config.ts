import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";

const nextConfig: NextConfig = {
  ...(basePath ? { basePath } : {}),
  async redirects() {
    return [
      { source: "/despre", destination: "/despre-noi", permanent: true },
      {
        source: "/confidentialitate",
        destination: "/politica-de-confidentialitate",
        permanent: true,
      },
      { source: "/termeni", destination: "/termeni-si-conditii", permanent: true },
      { source: "/cookies", destination: "/politica-cookies", permanent: true },
    ];
  },
  images: {
    dangerouslyAllowLocalIP: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
