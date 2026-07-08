import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // optimized case shots / logos change rarely — let browsers keep them
    minimumCacheTTL: 2678400, // 31 days
  },
  async headers() {
    // long-lived caching for the public/ asset folders (default is
    // max-age=0, must-revalidate — every view re-fetches every image)
    return [
      {
        source: "/:dir(cases|branding)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  async redirects() {
    // preserve equity from the old static .html URLs
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/careers.html", destination: "/careers", permanent: true },
      { source: "/privacy-policy.html", destination: "/privacy-policy", permanent: true },
    ];
  },
  async rewrites() {
    // the zeevora partner page stays a static file in public/
    return [{ source: "/zeevora", destination: "/zeevora/index.html" }];
  },
};

export default nextConfig;
