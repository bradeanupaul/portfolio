import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
