import type { NextConfig } from "next";

const config: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.solvingodds.com" }],
        destination: "https://solvingodds.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default config;
