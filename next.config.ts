import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static export: the app is entirely client-side (URL state, localStorage),
  // so it can be hosted on any static server or CDN.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // Subpath hosting (e.g. GitHub Pages project sites): set NEXT_PUBLIC_BASE_PATH="/repo-name".
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  experimental: {
    // The stylesheet was a separate blocking request on the critical path, which
    // on a phone cost a round trip before anything could paint. It is small
    // enough to travel inside the document.
    inlineCss: true,
  },
};

export default nextConfig;
