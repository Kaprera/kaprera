import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
