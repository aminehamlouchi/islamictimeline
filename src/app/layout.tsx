import type { Metadata, Viewport } from "next";
import "./globals.css";

import { SITE_URL } from "@/lib/site";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: `${SITE_URL}/` },
  title: "The Islamic Timeline, an instrument for fourteen centuries",
  description:
    "An interactive vertical timeline of Islamic history: scroll back from today through scholars, books, empires, and battles, with dual Hijri/Gregorian dating, a synchronized historical atlas, comparison tools, and cited sources.",
  icons: { icon: `${SITE_URL}/favicon.svg` },
  openGraph: {
    title: "The Islamic Timeline",
    description:
      "Scroll back from today through fourteen centuries, scholars, books, empires, and battles on one honest scale, with Hijri/Gregorian dating, an atlas, and cited sources.",
    images: [`${SITE_URL}/og.png`],
    url: `${SITE_URL}/`,
    siteName: "The Islamic Timeline",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Islamic Timeline",
    description:
      "An interactive instrument for exploring fourteen centuries of Islamic history.",
    images: [`${SITE_URL}/og.png`],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3ecdd" },
    { media: "(prefers-color-scheme: dark)", color: "#16140f" },
  ],
  width: "device-width",
  initialScale: 1,
  // The canvas takes pinch for timeline zoom through `touch-action: none`, so
  // the page itself can stay zoomable for anyone who needs to magnify the text.
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          The introduction is part of the first frame for a first-time visitor,
          so it cannot wait for hydration to decide whether to exist. This marks
          the document before anything paints; CSS hides the panel for anyone
          who has already seen it, with no flash either way.
        */}
        {/*
          A print stylesheet is downloaded at low priority and never blocks the
          render, so the ~390 kB of faces stay off the critical path. Every face
          declares font-display: swap, so text is readable in the fallback from
          the first frame; the script below applies the faces the moment they
          arrive. Without this the fonts cost about 1.7 s of first paint on a
          throttled phone.
        */}
        <link
          rel="stylesheet"
          href={`${BASE_PATH}/fonts.css`}
          media="print"
          data-fonts=""
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('itl-onboarded'))document.documentElement.setAttribute('data-onboarded','1')}catch(e){}" +
              "var f=document.querySelector('link[data-fonts]');" +
              // Applying the faces has to wait for two things: the file to have
              // arrived, and the first frame to have been painted. Enabling a
              // stylesheet that is still in flight would block rendering all
              // over again, which is the bug this replaced.
              "function a(){requestAnimationFrame(function(){setTimeout(function(){f.media='all'},0)})}" +
              "if(f){if(f.sheet){a()}else{f.addEventListener('load',a)}}",
          }}
        />
        <noscript>
          <link rel="stylesheet" href={`${BASE_PATH}/fonts.css`} />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
