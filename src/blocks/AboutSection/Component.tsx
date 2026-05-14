"use client";
import React from "react";
import Link from "next/link";
import { useViewport } from "@/hooks/useViewport";
import { Eyebrow, BandV } from "@/components/Motif";
import type { AboutSectionBlock as Props } from "@/payload-types";

function resolveHref(link: any): string {
  if (!link) return "#";
  if (link.type === "reference" && typeof link.reference?.value === "object") {
    const slug = link.reference.value.slug;
    const prefix = link.reference.relationTo !== "pages" ? `/${link.reference.relationTo}` : "";
    return `${prefix}/${slug ?? ""}`;
  }
  return link.url || "#";
}

const PillarIcon = ({ tone }: { tone: string }) => {
  if (tone === "ink") {
    return (
      <svg viewBox="0 0 64 64" width="44" height="44">
        <g fill="#1B2A4A">
          <path d="M32 4 L42 14 L52 24 L42 34 L32 44 L22 34 L12 24 L22 14 Z" />
          <path d="M32 16 L38 24 L32 32 L26 24 Z" fill="#F5EDE0" />
          <rect x="30" y="46" width="4" height="4" transform="rotate(45 32 48)" />
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" width="44" height="44">
      <g fill="#B03A2E">
        <path d="M32 6 L40 18 L52 18 L42 28 L48 44 L32 36 L16 44 L22 28 L12 18 L24 18 Z" />
        <circle cx="32" cy="50" r="3" />
      </g>
    </svg>
  );
};

export const AboutSectionBlock: React.FC<Props> = (props) => {
  const { heading, body, pillars } = props as any;
  const ctaLink = (props as any).ctaLink;
  const [hoveredPillar, setHoveredPillar] = React.useState<number | null>(null);
  const vp = useViewport();
  const m = vp.isMobile;
  const t = vp.isTablet;

  const headSize = m ? 34 : t ? 40 : 48;
  const gridCols = m || t ? "1fr" : "minmax(260px, 360px) 1fr";
  const pillarCols = m ? "1fr" : "repeat(3, 1fr)";

  const defaultPillars = [
    { title: "Misiune", body: "Promovăm cultura și arta în toate formele sale.", tone: "red" },
    { title: "Viziune", body: "O comunitate educată, creativă și unită prin cultură.", tone: "ink" },
    { title: "Valori", body: "Respect, autenticitate, implicare, diversitate.", tone: "red" },
  ];
  const pillarList = pillars?.length ? pillars : defaultPillars;

  return (
    <section
      style={{
        background: "var(--cream)",
        position: "relative",
        padding: m ? "64px 24px" : t ? "72px 40px" : "96px 64px",
      }}
    >
      {!m && !t && (
        <BandV
          width={28}
          color="#B03A2E"
          opacity={0.55}
          style={{ position: "absolute", left: 32, top: 60, bottom: 60 }}
        />
      )}

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: gridCols,
          gap: m ? 40 : t ? 40 : 64,
          alignItems: "start",
        }}
      >
        <div>
          <Eyebrow tone="red">Despre noi</Eyebrow>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: headSize,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: "var(--ink)",
              margin: "14px 0 18px",
            }}
          >
            {heading || "Centrul Cultural Botoșani"}
          </h2>
          {body && (
            <p
              style={{
                color: "var(--ink-soft)",
                fontSize: 15.5,
                lineHeight: 1.65,
                margin: "0 0 28px",
              }}
            >
              {body}
            </p>
          )}
          {ctaLink?.label && (
            <Link
              href={resolveHref(ctaLink)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "var(--red)",
                color: "#fff",
                padding: "14px 24px",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: 2,
              }}
            >
              {ctaLink.label}
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: pillarCols,
            gap: m ? 16 : 22,
          }}
        >
          {pillarList.map((p: any, i: number) => {
            const isHovered = hoveredPillar === i;
            const hasLink = p.link && (p.link.url || p.link.reference);
            const cardContent = (
              <div
                key={i}
                onMouseEnter={() => setHoveredPillar(i)}
                onMouseLeave={() => setHoveredPillar(null)}
                style={{
                  background: "var(--paper)",
                  border: "1px solid var(--rule)",
                  boxShadow: isHovered
                    ? "0 12px 32px rgba(27,42,74,0.18), 0 4px 12px rgba(27,42,74,0.10)"
                    : "var(--shadow-card)",
                  padding: m ? "28px 20px" : "36px 24px",
                  textAlign: "center",
                  transform: isHovered ? "translateY(-4px)" : "none",
                  transition: "transform 200ms ease, box-shadow 200ms ease",
                  cursor: hasLink ? "pointer" : "default",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
                  <PillarIcon tone={p.tone} />
                </div>
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: m ? 22 : 26,
                    color: p.tone === "ink" ? "var(--ink)" : "var(--red)",
                    margin: "0 0 10px",
                  }}
                >
                  {p.title}
                </h4>
                <p
                  style={{
                    color: "var(--ink-soft)",
                    fontSize: 14,
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {p.body}
                </p>
              </div>
            );

            return hasLink ? (
              <Link
                key={i}
                href={resolveHref(p.link)}
                style={{ textDecoration: "none", display: "block" }}
              >
                {cardContent}
              </Link>
            ) : (
              <React.Fragment key={i}>{cardContent}</React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};
