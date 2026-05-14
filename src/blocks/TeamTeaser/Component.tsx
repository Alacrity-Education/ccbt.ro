"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useViewport } from "@/hooks/useViewport";
import { Diamond } from "@/components/Motif";
import type { TeamTeaserBlock as Props } from "@/payload-types";

const TILES = [
  { initials: "AM", tone: "navy" },
  { initials: "DR", tone: "red" },
  { initials: "EC", tone: "gold" },
  { initials: "MP", tone: "navy" },
  { initials: "IT", tone: "red" },
];

function resolveHref(link: any): string {
  if (!link) return "#";
  if (link.type === "reference" && typeof link.reference?.value === "object") {
    const slug = link.reference.value.slug;
    const prefix = link.reference.relationTo !== "pages" ? `/${link.reference.relationTo}` : "";
    return `${prefix}/${slug ?? ""}`;
  }
  return link.url || "#";
}

export const TeamTeaserBlock: React.FC<Props> = (props) => {
  const { heading } = props as any;
  const ctaLink = (props as any).ctaLink;
  const vp = useViewport();
  const isMobile = vp.isMobile;
  const isTablet = vp.isTablet;
  const padX = isMobile ? 24 : isTablet ? 48 : 64;
  const padY = isMobile ? 56 : 80;
  const [hover, setHover] = useState(false);

  return (
    <section
      style={{
        background: "var(--cream-2)",
        padding: `${padY}px ${padX}px`,
        borderTop: "1px solid var(--rule)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          gap: isMobile ? 28 : 48,
          justifyContent: "space-between",
        }}
      >
        {/* Avatar cluster */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {TILES.map((tile, i) => (
            <div
              key={i}
              style={{
                width: isMobile ? 52 : 64,
                height: isMobile ? 52 : 64,
                borderRadius: 999,
                background:
                  tile.tone === "navy"
                    ? "var(--ink)"
                    : tile.tone === "red"
                    ? "var(--red)"
                    : "var(--gold)",
                color: tile.tone === "gold" ? "var(--ink)" : "var(--cream)",
                border: "3px solid var(--cream-2)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-body)",
                fontSize: isMobile ? 13 : 15,
                fontWeight: 600,
                letterSpacing: "0.08em",
                marginLeft: i === 0 ? 0 : isMobile ? -14 : -18,
                boxShadow: "var(--shadow-card)",
                zIndex: TILES.length - i,
                position: "relative",
              }}
            >
              {tile.initials}
            </div>
          ))}
        </div>

        {/* Middle text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 10,
              color: "var(--red)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            <Diamond size={8} color="var(--red)" />
            <span>Echipa noastră</span>
          </div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: isMobile ? 26 : 32,
              lineHeight: 1.15,
              margin: 0,
              color: "var(--ink)",
              letterSpacing: "-0.005em",
            }}
          >
            {heading || (
              <>
                Oamenii din spatele{" "}
                <em style={{ color: "var(--gold)", fontStyle: "italic", fontWeight: 500 }}>fiecărui proiect</em>
              </>
            )}
          </h3>
        </div>

        {/* CTA */}
        <Link
          href={resolveHref(ctaLink)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            background: hover ? "var(--ink)" : "transparent",
            color: hover ? "var(--cream)" : "var(--ink)",
            border: "1px solid var(--ink)",
            padding: "14px 24px",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            textDecoration: "none",
            cursor: "pointer",
            borderRadius: 2,
            fontFamily: "var(--font-body)",
            transition: "background 200ms, color 200ms",
            flexShrink: 0,
          }}
        >
          {ctaLink?.label || "Cunoaște echipa"}
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
};
