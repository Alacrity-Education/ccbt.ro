"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useViewport } from "@/hooks/useViewport";
import { Diamond } from "@/components/Motif";
import type { ImageContentBlock as Props } from "@/payload-types";
import Link from "next/link";
import { Media } from "@/components/Media";

function resolveHref(link: any): string {
  if (!link) return "#";
  if (link.type === "reference" && typeof link.reference?.value === "object") {
    const slug = link.reference.value.slug;
    const prefix = link.reference.relationTo !== "pages" ? `/${link.reference.relationTo}` : "";
    return `${prefix}/${slug ?? ""}`;
  }
  return link.url || "#";
}

const BuildingImage = () => (
  <svg viewBox="0 0 600 600" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="fi-sky-b" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5a6c8a" /><stop offset="100%" stopColor="#2c3b5f" />
      </linearGradient>
    </defs>
    <rect width="600" height="600" fill="url(#fi-sky-b)" />
    <g opacity="0.92">
      <rect x="80" y="280" width="440" height="320" fill="#c8a456" />
      <polygon points="300,170 80,280 520,280" fill="#1b2a4a" />
      <rect x="280" y="200" width="40" height="60" fill="#1b2a4a" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
        <rect key={n} x={100 + n * 54} y={320} width={32} height={70} fill="#1b2a4a" opacity="0.6" />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
        <rect key={`b${n}`} x={100 + n * 54} y={440} width={32} height={70} fill="#1b2a4a" opacity="0.6" />
      ))}
    </g>
  </svg>
);


function FeatureCard({
  eyebrow,
  title,
  body,
  ctaLink,
  media,
  tone,
  index,
  isMobile,
  height,
}: any) {
  const isNavy = tone === "navy";
  const hasMedia = media && typeof media === "object";
  return (
    <article
      style={{
        background: isNavy ? "var(--ink)" : "var(--paper)",
        color: isNavy ? "var(--cream)" : "var(--ink)",
        border: isNavy ? "none" : "1px solid var(--rule)",
        boxShadow: "0 30px 60px rgba(27,42,74,0.18), 0 8px 20px rgba(27,42,74,0.10)",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "5fr 7fr",
        width: "100%",
        height: isMobile ? "auto" : height,
      }}
    >
      {/* Image side */}
      <div
        style={{
          position: "relative",
          background: "linear-gradient(135deg, #2c3b5f 0%, #1b2a4a 100%)",
          minHeight: isMobile ? 220 : 0,
          overflow: "hidden",
        }}
      >
        {hasMedia ? (
          <Media
            fill
            resource={media}
            imgClassName="object-cover absolute inset-0 w-full h-full"
            pictureClassName="absolute inset-0 w-full h-full"
          />
        ) : (
          <BuildingImage />
        )}
        {eyebrow && (
          <div
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(176, 58, 46, 0.95)",
              color: "#fff",
              padding: "8px 14px",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            <Diamond size={8} color="#fff" />
            <span>{eyebrow}</span>
          </div>
        )}
        <div
          style={{
            position: "absolute",
            right: 24,
            bottom: 18,
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 96,
            fontWeight: 500,
            color: "rgba(245, 237, 224, 0.18)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          0{index + 1}
        </div>
      </div>

      {/* Text side */}
      <div
        style={{
          padding: isMobile ? "32px 28px" : "56px 56px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 18,
            color: "var(--gold)",
            marginBottom: 12,
          }}
        >
          — Capitolul 0{index + 1}
        </div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: isMobile ? 32 : 44,
            lineHeight: 1.12,
            letterSpacing: "-0.01em",
            margin: "0 0 20px 0",
            color: isNavy ? "var(--cream)" : "var(--ink)",
          }}
        >
          {title}
        </h3>
        {body && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: isMobile ? 15 : 16,
              lineHeight: 1.7,
              color: isNavy ? "rgba(245, 237, 224, 0.78)" : "var(--ink-soft)",
              margin: "0 0 32px 0",
            }}
          >
            {body}
          </p>
        )}
        {ctaLink?.label && (
          <Link
            href={resolveHref(ctaLink)}
            style={{
              alignSelf: "flex-start",
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              background: isNavy ? "var(--red)" : "var(--ink)",
              color: "#fff",
              border: "none",
              padding: "14px 26px",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              cursor: "pointer",
              borderRadius: 2,
              fontFamily: "var(--font-body)",
              textDecoration: "none",
            }}
          >
            {ctaLink.label}
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        )}
      </div>
    </article>
  );
}

export const ImageContentBlock: React.FC<Props> = (props) => {
  const { items } = props as any;
  const sectionEyebrow = (props as any).sectionEyebrow ?? "Implică-te";
  const sectionTitle = (props as any).sectionTitle;

  const vp = useViewport();
  const isMobile = vp.isMobile;
  const isTablet = vp.isTablet;
  const padX = isMobile ? 24 : isTablet ? 48 : 64;
  const padY = isMobile ? 72 : 120;

  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const cardHeight = isMobile ? "auto" : isTablet ? 540 : 580;
  const stickyTop = (vp.isDesktop ? 88 : 64) + 24;
  const scrollPerCard = isMobile ? 0 : 600;

  useEffect(() => {
    if (isMobile || !items?.length) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.94,
          opacity: 0.55,
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: `top ${stickyTop + 60}`,
            end: `top ${stickyTop - 40}`,
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, stickyTop, items?.length]);

  if (!items?.length) return null;

  const list = items.slice(0, 2);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--cream)",
        padding: `${padY}px ${padX}px ${isMobile ? padY : padY + 40}px`,
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto 56px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
            color: "var(--red)",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <Diamond size={10} color="var(--red)" />
          <span>{sectionEyebrow}</span>
        </div>
        {sectionTitle && (
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: isMobile ? 36 : isTablet ? 48 : 60,
              lineHeight: 1.05,
              letterSpacing: "-0.015em",
              color: "var(--ink)",
              margin: 0,
              maxWidth: 760,
            }}
          >
            {sectionTitle}
          </h2>
        )}
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? 24 : scrollPerCard,
        }}
      >
        {list.map((item: any, i: number) => (
          <div
            key={i}
            ref={(el) => { if (el) cardRefs.current[i] = el; }}
            style={{
              position: isMobile ? "relative" : "sticky",
              top: isMobile ? "auto" : stickyTop,
              zIndex: 10 + i,
              willChange: "transform",
            }}
          >
            <FeatureCard
              {...item}
              index={i}
              isMobile={isMobile}
              height={cardHeight}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
