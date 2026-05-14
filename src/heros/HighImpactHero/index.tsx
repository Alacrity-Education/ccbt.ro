"use client";
import React from "react";
import type { Page } from "@/payload-types";
import { Media } from "@/components/Media";
import { CMSLink } from "@/components/Link";
import { Diamond, Divider, BandV } from "@/components/Motif";
import { useViewport } from "@/hooks/useViewport";

export const HighImpactHero: React.FC<Page["hero"]> = (props) => {
  const { title, subtitle, media, richText: _rt, ...rest } = props as any;
  const eyebrow = (rest as any).eyebrow ?? "DESPRE NOI";
  const body = (rest as any).body ?? subtitle ?? "";
  const ctaLink = (rest as any).ctaLink ?? null;

  const vp = useViewport();
  const isMobile = vp.isMobile;
  const isTablet = vp.isTablet;
  const padX = isMobile ? 24 : isTablet ? 48 : 64;
  const padY = isMobile ? 56 : isTablet ? 80 : 120;
  const gap = isMobile ? 32 : isTablet ? 48 : 96;
  const hasMedia = media && typeof media === "object";

  return (
    <section
      style={{
        position: "relative",
        background: "var(--cream)",
        padding: `${padY}px ${padX}px`,
        overflow: "hidden",
      }}
    >
      {vp.isDesktop && (
        <BandV
          width={64}
          color="var(--red)"
          opacity={0.45}
          style={{ position: "absolute", right: 0, top: 0, bottom: 0, height: "100%" }}
        />
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: vp.isDesktop ? "1fr 1fr" : "1fr",
          gap,
          alignItems: "center",
          maxWidth: 1440,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Text column */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 28,
              color: "var(--red)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            <Diamond size={10} color="var(--red)" />
            <span>{eyebrow}</span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: isMobile ? 44 : isTablet ? 60 : 76,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: "var(--ink)",
              margin: "0 0 28px 0",
            }}
          >
            {title || "Patrimoniul cultural al Botoșanilor"}
          </h1>

          <div style={{ margin: "0 0 28px 0" }}>
            <Divider width={isMobile ? 180 : 240} tone="gold" />
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: isMobile ? 16 : 18,
              lineHeight: 1.7,
              color: "var(--ink-soft)",
              margin: "0 0 36px 0",
              maxWidth: 560,
            }}
          >
            {body}
          </p>

          {ctaLink?.label && ctaLink && (
            <CMSLink
              {...ctaLink}
              label={ctaLink.label}
              className="inline-flex items-center gap-3"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                background: "var(--red)",
                color: "#fff",
                border: "none",
                padding: "16px 28px",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                cursor: "pointer",
                borderRadius: 2,
                fontFamily: "var(--font-body)",
                textDecoration: "none",
              } as React.CSSProperties}
            />
          )}
        </div>

        {/* Image column */}
        <div
          style={{
            aspectRatio: "1 / 1",
            width: "100%",
            maxWidth: 560,
            marginLeft: vp.isDesktop ? "auto" : 0,
            marginRight: vp.isDesktop ? 0 : "auto",
            position: "relative",
            background: "linear-gradient(135deg, #2c3b5f 0%, #1b2a4a 100%)",
            overflow: "hidden",
            boxShadow: "var(--shadow-lift)",
          }}
        >
          {hasMedia ? (
            <Media
              fill
              resource={media as any}
              imgClassName="object-cover w-full h-full"
              pictureClassName="absolute inset-0 w-full h-full"
            />
          ) : (
            <svg
              viewBox="0 0 600 600"
              style={{ width: "100%", height: "100%", display: "block" }}
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <linearGradient id="sky-hh" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f3d9a4" />
                  <stop offset="50%" stopColor="#d9a574" />
                  <stop offset="100%" stopColor="#7a4d3a" />
                </linearGradient>
                <linearGradient id="bldg-hh" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c8a456" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#8b6b3a" stopOpacity="0.95" />
                </linearGradient>
              </defs>
              <rect width="600" height="600" fill="url(#sky-hh)" />
              <path d="M0 600 L0 380 Q 30 360 50 370 Q 80 340 110 370 Q 130 350 150 370 L150 600 Z" fill="#1a1a1a" opacity="0.85" />
              <g opacity="0.95">
                <rect x="160" y="290" width="350" height="280" fill="url(#bldg-hh)" />
                <rect x="200" y="240" width="270" height="60" fill="#a07a45" />
                <polygon points="335,180 200,240 470,240" fill="#5a3a26" />
                <rect x="320" y="200" width="30" height="42" fill="#2a1810" />
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <rect key={n} x={185 + n * 52} y={340} width={28} height={60} fill="#1b2a4a" opacity="0.7" />
                ))}
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <rect key={`b${n}`} x={185 + n * 52} y={440} width={28} height={60} fill="#1b2a4a" opacity="0.7" />
                ))}
                <rect x="220" y="290" width="8" height="280" fill="#6b4a2a" opacity="0.4" />
                <rect x="442" y="290" width="8" height="280" fill="#6b4a2a" opacity="0.4" />
              </g>
              <path d="M600 600 L600 360 Q570 340 545 370 Q520 340 490 380 L490 600 Z" fill="#1a1a1a" opacity="0.85" />
            </svg>
          )}
        </div>
      </div>
    </section>
  );
};
