import { getCachedGlobal } from "@/utilities/getGlobals";
import Link from "next/link";
import React from "react";

import type { Footer as FooterGlobal, Media } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import { Divider, BandH } from "@/components/Motif";

export async function Footer() {
  const footerData = (await getCachedGlobal("footer", 1)()) as FooterGlobal | null;

  const brand = footerData?.brand;
  const sections = footerData?.sections || [];
  const credit = footerData?.credit;

  const logo: Media | null =
    brand && typeof brand.logo === "object" && brand.logo && "url" in brand.logo
      ? (brand.logo as Media)
      : null;

  return (
    <footer style={{ background: "var(--ink)", color: "var(--cream)", position: "relative", overflow: "hidden" }}>
      <BandH color="#C8A456" opacity={0.18} height={14} style={{ position: "absolute", top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 64px 48px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 40,
          }}
          className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* Brand column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <Link href="/">
              {logo?.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logo.url as string}
                  alt="Centrul Cultural Botoșani"
                  style={{ height: 48, width: "auto", filter: "invert(1) brightness(1.15)" }}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/logo.svg"
                  alt="Centrul Cultural Botoșani"
                  style={{ height: 48, width: "auto", filter: "invert(1) brightness(1.15)" }}
                />
              )}
            </Link>
            <p style={{ fontSize: 14, color: "rgba(245,237,224,0.65)", lineHeight: 1.7, maxWidth: 240 }}>
              Centrul Cultural Botoșani — instituție publică de cultură, artă și educație.
            </p>
            <Divider tone="gold" width={160} />
          </div>

          {/* Nav sections */}
          {sections.map((section, i) => {
            const colStart = (section as any).colStartLg;
            return (
              <div
                key={i}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
                className={colStart ? `lg:col-start-${colStart}` : ""}
              >
                {section.title && (
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 13,
                      fontWeight: 600,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      margin: 0,
                    }}
                  >
                    {section.title}
                  </h3>
                )}
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {(section.links || []).map(({ link }, j) => (
                    <li key={j}>
                      <CMSLink
                        {...link}
                        appearance="inline"
                        style={{
                          fontSize: 14,
                          color: "rgba(245,237,224,0.7)",
                          textDecoration: "none",
                          transition: "color 0.2s",
                        }}
                        className="hover:!text-[var(--cream)]"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 64,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.14)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ fontSize: 13, color: "rgba(245,237,224,0.45)", margin: 0 }}>
            {credit ?? "Dezvoltat de Alacrity Education"}
          </p>
        </div>
      </div>
    </footer>
  );
}
