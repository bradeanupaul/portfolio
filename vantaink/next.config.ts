import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";
const isStatic = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(basePath ? { basePath } : {}),
  ...(isStatic
    ? {
        output: "export",
        images: { unoptimized: true },
      }
    : {
        cacheComponents: true,
        partialPrefetching: true,
        async headers() {
          return [
            {
              source: "/:path*",
              headers: [
                {
                  key: "Content-Security-Policy",
                  value:
                    "frame-src 'self' https://www.google.com https://www.google.ro https://maps.google.com; object-src 'none'",
                },
              ],
            },
          ];
        },
      }),
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
