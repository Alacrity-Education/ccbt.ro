import type { Metadata } from "next";

import { cn } from "@/utilities/ui";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import {
  Barlow,
  Barlow_Condensed,
  Barlow_Semi_Condensed,
  Montserrat,
} from "next/font/google";
import React from "react";

import { AdminBar } from "@/components/AdminBar";
import { Footer } from "@/Footer/Component";
import { Header } from "@/Header/Component";
import { Providers } from "@/providers";
import { InitTheme } from "@/providers/Theme/InitTheme";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import { draftMode } from "next/headers";

import "./globals.css";
import { getServerSideURL } from "@/utilities/getURL";
import Script from "next/script";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

const barlow = Barlow({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  variable: "--font-barlow-sans",
});

// The condensed cut of the Barlow superfamily, loaded for one purpose: the
// action button. Keeping it to that single role is what makes the button read as
// a distinct object rather than another block of body text.
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["700"],
  variable: "--font-barlow-condensed",
});

// The semi-condensed cut: the timeline's dates, titles and copy.
const barlowSemiCondensed = Barlow_Semi_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  variable: "--font-barlow-semi-condensed",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <html
      className={cn(
        GeistSans.variable,
        montserrat.variable,
        barlow.variable,
        barlowCondensed.variable,
        barlowSemiCondensed.variable,
        GeistMono.variable,
      )}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
        <Script
          strategy="lazyOnload"
          id={"accessiblity"}
          src={
            "https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js"
          }
        ></Script>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: "summary_large_image",
    creator: "@payloadcms",
  },
};
