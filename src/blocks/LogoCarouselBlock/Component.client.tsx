"use client";
import React from "react";
import { useViewport } from "@/hooks/useViewport";
import { Diamond } from "@/components/Motif";
import type { LogoCarouselBlock as Props } from "@/payload-types";

function Crest({ name }: { name: string }) {
  return (
    <div
      style={{
        fontSize: 9.5,
        fontWeight: 600,
        letterSpacing: "0.08em",
        color: "var(--ink-soft)",
        textAlign: "center",
        lineHeight: 1.35,
        whiteSpace: "pre-line",
        display: "flex",
        alignItems: "center",
        gap: 8,
        opacity: 0.8,
        flexShrink: 0,
      }}
    >
      <span
        style={{
          width: 32,
          height: 32,
          border: "1.5px solid var(--ink-soft)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 1,
        }}
      >
        <Diamond size={6} color="var(--ink-soft)" />
      </span>
      <span>{name}</span>
    </div>
  );
}

const DEFAULT_PARTNERS = [
  "CONSILIUL JUDEȚEAN\nBOTOȘANI",
  "PRIMĂRIA\nMUNICIPIULUI BOTOȘANI",
  'TEATRUL\n„MIHAI EMINESCU”\nBOTOȘANI',
  "MUZEUL JUDEȚEAN\nBOTOȘANI",
  'UNIVERSITATEA\n„Stefan cel Mare”\nSUCEAVA',
  "TVR\nIAȘI",
  "RADIO ROMÂNIA\nIAȘI",
];

export const LogoCarousel: React.FC<Props> = (props) => {
  const { partners: partnerItems } = props as any;
  const vp = useViewport();
  const m = vp.isMobile;
  const t = vp.isTablet;

  const partnerNames: string[] =
    partnerItems?.length
      ? partnerItems.map((p: any) => p.name || "")
      : DEFAULT_PARTNERS;

  if (m) {
    return (
      <section
        style={{
          background: "var(--cream)",
          padding: "28px 0 24px",
          borderTop: "1px solid var(--rule)",
          overflow: "hidden",
        }}
      >
        <style>{`
          @keyframes partners-marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .partners-track {
            display: flex; gap: 36px; width: max-content;
            animation: partners-marquee 28s linear infinite;
          }
          .partners-mask {
            position: relative;
            mask-image: linear-gradient(to right, transparent 0, #000 32px, #000 calc(100% - 32px), transparent 100%);
            -webkit-mask-image: linear-gradient(to right, transparent 0, #000 32px, #000 calc(100% - 32px), transparent 100%);
          }
        `}</style>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginBottom: 18,
          }}
        >
          <Diamond color="var(--red)" />
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.22em", color: "var(--ink)" }}>
            PARTENERI
          </span>
        </div>
        <div className="partners-mask">
          <div className="partners-track">
            {partnerNames.map((p, i) => <Crest key={`a-${i}`} name={p} />)}
            {partnerNames.map((p, i) => <Crest key={`b-${i}`} name={p} />)}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ background: "var(--cream)", padding: "28px 0", borderTop: "1px solid var(--rule)" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: t ? "0 40px" : "0 64px",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <button
          aria-label="prev"
          style={{
            background: "none",
            border: "none",
            color: "var(--ink-soft)",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            paddingRight: 14,
            borderRight: "1px solid var(--rule)",
            flexShrink: 0,
          }}
        >
          <Diamond color="var(--red)" />
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", color: "var(--ink)" }}>PARTENERI</span>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            gap: 14,
            justifyContent: "space-between",
            overflow: "hidden",
          }}
        >
          {partnerNames.map((p, i) => <Crest key={i} name={p} />)}
        </div>

        <button
          aria-label="next"
          style={{
            background: "none",
            border: "none",
            color: "var(--ink-soft)",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
};
