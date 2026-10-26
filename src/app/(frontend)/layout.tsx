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
import { SITE_DESCRIPTION, SITE_NAME } from "@/utilities/siteMeta";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";

import "./globals.css";
import { SITE_URL } from "@/utilities/siteMetadata";
import { isDraftMode } from "@/utilities/frontendData";
import { isStaticExport } from "@/utilities/siteMode";
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
  const isEnabled = await isDraftMode();

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
      lang="ro"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          {/* The admin bar talks to the CMS session, and the static site has
              none: its cookie is scoped to cms.ccbt.ro, so cross-origin the
              bar would ask who is logged in, be told nobody, and stay hidden
              for ever. Its exit-preview link points at a route the export
              does not contain either. */}
          {!isStaticExport && (
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />
          )}

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
  // The site's own address, not NEXT_PUBLIC_SERVER_URL. That variable says
  // which origin this build talks to, and in the static build it is the CMS —
  // a canonical pointing there would tell search engines cms.ccbt.ro is the
  // real site and the one people visit is a copy of it.
  metadataBase: new URL(SITE_URL),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: "summary_large_image",
    // No `creator`: it was the Payload starter's own handle, and the field
    // takes an @handle rather than a name, so there is nothing to put here
    // until the centre's account is known.
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};
