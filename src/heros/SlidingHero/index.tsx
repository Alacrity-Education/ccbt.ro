"use client";
import React, { useEffect, useState } from "react";
import type { Page } from "@/payload-types";
import { Media } from "@/components/Media";
import { CMSLink } from "@/components/Link";
import { Divider } from "@/components/Motif";
import { useViewport } from "@/hooks/useViewport";

const SLIDE_GRADIENTS = [
  "radial-gradient(ellipse 110% 90% at 78% 55%, #e8b070 0%, #b07a44 22%, #6e4a2e 48%, #2d2218 75%, #161210 100%)",
  "radial-gradient(ellipse 110% 90% at 72% 60%, #d99d5e 0%, #9a6938 26%, #5a3e26 52%, #241c14 78%, #110d0a 100%)",
  "radial-gradient(ellipse 110% 90% at 80% 50%, #c89568 0%, #8d6240 28%, #4d3624 55%, #1f1812 80%, #100c09 100%)",
];

const Silhouette = () => (
  <svg
    viewBox="0 0 1600 600"
    preserveAspectRatio="xMidYMax meet"
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.32, mixBlendMode: "soft-light" }}
    aria-hidden="true"
  >
    <g fill="rgba(20,12,8,0.85)">
      <rect x="0" y="540" width="1600" height="60" />
      <path d="M0 540 L0 320 Q40 290 70 310 Q100 270 140 300 Q170 270 200 310 Q230 290 260 320 L260 540 Z" />
      <ellipse cx="100" cy="280" rx="80" ry="50" />
      <ellipse cx="200" cy="270" rx="70" ry="45" />
      <rect x="640" y="240" width="640" height="300" />
      <rect x="860" y="180" width="200" height="360" />
      <polygon points="640,240 700,210 1220,210 1280,240" />
      <polygon points="860,180 960,130 1060,180" />
      <rect x="600" y="220" width="80" height="320" />
      <rect x="1240" y="220" width="80" height="320" />
      <ellipse cx="960" cy="130" rx="22" ry="32" />
      <rect x="954" y="80" width="12" height="55" />
      <ellipse cx="1480" cy="380" rx="160" ry="120" />
      <ellipse cx="1560" cy="430" rx="80" ry="60" />
    </g>
    <g fill="rgba(255,210,140,0.18)">
      <rect x="858" y="178" width="6" height="362" />
      <rect x="1056" y="178" width="6" height="362" />
    </g>
  </svg>
);

export const SlidingHero: React.FC<Page["hero"]> = ({ slides, timeout }) => {
  const [active, setActive] = useState(0);
  const vp = useViewport();
  const len = slides?.length || 0;

  useEffect(() => {
    if (!len) return;
    const t = setInterval(() => setActive((v) => (v + 1) % len), timeout || 6500);
    return () => clearInterval(t);
  }, [len, timeout]);

  if (!len) return null;

  const isMobile = vp.isMobile;
  const isTablet = vp.isTablet;
  const heroHeight = isMobile ? 560 : isTablet ? 540 : 600;
  const padX = isMobile ? 24 : isTablet ? 40 : 64;
  const padTop = isMobile ? 72 : isTablet ? 92 : 120;
  const titleSize = isMobile ? 40 : isTablet ? 56 : 76;
  const bodySize = isMobile ? 15 : 17;

  const currentSlide = slides![active]!;
  const hasBgMedia = currentSlide?.media && typeof currentSlide.media === "object";
  const gradient = SLIDE_GRADIENTS[active % SLIDE_GRADIENTS.length];

  return (
    <section
      style={{
        position: "relative",
        height: heroHeight,
        overflow: "hidden",
        background: hasBgMedia ? "#1b2a4a" : gradient,
        transition: "background 800ms cubic-bezier(.2,.6,.2,1)",
      }}
    >
      {/* Background media */}
      {hasBgMedia && (
        <div style={{ position: "absolute", inset: 0 }}>
          <Media
            fill
            resource={currentSlide.media as any}
            imgClassName="object-cover w-full h-full"
            pictureClassName="absolute inset-0 w-full h-full"
          />
        </div>
      )}

      {/* Warm glow orb */}
      {!hasBgMedia && (
        <div
          style={{
            position: "absolute",
            right: isMobile ? "-10%" : "8%",
            top: isMobile ? "20%" : "30%",
            width: isMobile ? 360 : 480,
            height: isMobile ? 360 : 480,
            background: "radial-gradient(circle, rgba(255,210,150,0.55) 0%, rgba(255,180,110,0.15) 35%, transparent 65%)",
            filter: "blur(4px)",
            pointerEvents: "none",
          }}
        />
      )}

      <Silhouette />

      {/* Legibility gradients */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isMobile
            ? "linear-gradient(180deg, rgba(10,14,28,0.45) 0%, rgba(10,14,28,0.55) 50%, rgba(10,14,28,0.65) 100%)"
            : "linear-gradient(90deg, rgba(10,14,28,0.75) 0%, rgba(10,14,28,0.45) 45%, rgba(10,14,28,0.10) 75%, transparent 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, transparent 0%, transparent 55%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* Prev / Next — hidden on mobile */}
      {!isMobile && (
        <>
          <button
            onClick={() => setActive((v) => (v - 1 + len) % len)}
            aria-label="Înapoi"
            style={{
              position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)",
              width: 40, height: 40, background: "transparent", border: "none",
              color: "#fff", cursor: "pointer", opacity: 0.75,
            }}
          >
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => setActive((v) => (v + 1) % len)}
            aria-label="Înainte"
            style={{
              position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)",
              width: 40, height: 40, background: "transparent", border: "none",
              color: "#fff", cursor: "pointer", opacity: 0.75,
            }}
          >
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </>
      )}

      {/* Content */}
      <div
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "0 auto",
          padding: `${padTop}px ${padX}px 0`,
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ maxWidth: 640 }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: titleSize,
              lineHeight: 1.02,
              color: "#FFFFFF",
              letterSpacing: "-0.01em",
              margin: 0,
              textShadow: "0 2px 24px rgba(0,0,0,0.35)",
            }}
          >
            {currentSlide?.title || "Cultura unește."}
          </h1>
          {currentSlide?.subtitle && (
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: titleSize,
                lineHeight: 1.02,
                color: "var(--red-soft)",
                letterSpacing: "-0.01em",
                margin: "6px 0 0",
                textShadow: "0 2px 24px rgba(0,0,0,0.35)",
              }}
            >
              {currentSlide.subtitle}
            </h2>
          )}

          <div style={{ margin: isMobile ? "18px 0 16px" : "26px 0 22px" }}>
            <Divider width={isMobile ? 200 : 260} tone="gold" />
          </div>

          {/* Dot pagination */}
          <div style={{ display: "flex", gap: 6 }}>
            {slides!.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                aria-label={`Slide ${idx + 1}`}
                style={{
                  width: idx === active ? 32 : 22,
                  height: 4,
                  background: idx === active ? "var(--red)" : "rgba(255,255,255,0.45)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  borderRadius: 2,
                  transition: "width 240ms cubic-bezier(.2,.6,.2,1), background 240ms",
                }}
              />
            ))}
          </div>

          {currentSlide?.cta?.enable && currentSlide.cta.link && (
            <div style={{ marginTop: 28 }}>
              <CMSLink
                {...currentSlide.cta.link}
                className="inline-flex items-center gap-3"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "var(--red)",
                  color: "#fff",
                  padding: isMobile ? "14px 22px" : "16px 28px",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  borderRadius: 2,
                  border: "none",
                  cursor: "pointer",
                } as React.CSSProperties}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
