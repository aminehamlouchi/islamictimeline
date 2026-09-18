import type { Metadata, Viewport } from "next";
import "@fontsource-variable/eb-garamond";
import "@fontsource-variable/inter";
import "@fontsource/amiri/400.css";
import "@fontsource/amiri/700.css";
import "./globals.css";

import { SITE_URL } from "@/lib/site";

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
  maximumScale: 1,
  userScalable: false, // pinch is used for timeline zoom
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
