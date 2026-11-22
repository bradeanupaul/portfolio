import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            // Allow keyless Google Maps embeds without locking Next runtime scripts.
            key: "Content-Security-Policy",
            value:
              "frame-src 'self' https://www.google.com https://www.google.ro https://maps.google.com; object-src 'none'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
