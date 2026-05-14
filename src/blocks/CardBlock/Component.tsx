"use client";
import React, { useState } from "react";
import { useViewport } from "@/hooks/useViewport";
import { Diamond, Cross } from "@/components/Motif";
import type { CardBlock as CardBlockProps } from "@/payload-types";

const ACCENTS = ["var(--red)", "var(--ink)", "var(--gold)"];

function ServiceCard({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description?: string | null;
  icon?: string | null;
  index: number;
}) {
  const [hover, setHover] = useState(false);
  const accent = ACCENTS[index % 3];

  const iconEl =
    icon === "diamond" ? (
      <Diamond size={42} color={accent} />
    ) : (
      <Cross
        size={48}
        color={
          accent === "var(--gold)"
            ? "#C8A456"
            : accent === "var(--ink)"
            ? "#1B2A4A"
            : "#B03A2E"
        }
      />
    );

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "var(--paper)",
        border: "1px solid var(--rule)",
        padding: "40px 32px",
        position: "relative",
        cursor: "pointer",
        transition:
          "box-shadow 200ms cubic-bezier(.2,.6,.2,1), transform 200ms cubic-bezier(.2,.6,.2,1)",
        boxShadow: hover ? "var(--shadow-lift)" : "var(--shadow-card)",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        display: "flex",
        flexDirection: "column",
        minHeight: 260,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 20,
          right: 24,
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 20,
          color: "var(--rule)",
          fontWeight: 500,
        }}
      >
        0{index + 1}
      </span>

      <div style={{ marginBottom: 24 }}>{iconEl}</div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: 24,
          lineHeight: 1.2,
          color: "var(--ink)",
          margin: "0 0 12px 0",
        }}
      >
        {title}
      </h3>

      {description && (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            lineHeight: 1.6,
            color: "var(--ink-soft)",
            margin: "0 0 24px 0",
            flex: 1,
          }}
        >
          {description}
        </p>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 16,
          borderTop: "1px solid var(--rule)",
          marginTop: "auto",
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: accent,
          }}
        >
          Detalii
        </span>
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke={accent}
          strokeWidth="1.6"
          style={{
            transform: hover ? "translateX(4px)" : "translateX(0)",
            transition: "transform 200ms cubic-bezier(.2,.6,.2,1)",
          }}
        >
          <path d="M7 17L17 7M17 7H9M17 7V15" />
        </svg>
      </div>
    </article>
  );
}

export const CardBlock: React.FC<
  CardBlockProps & { sectionTitle?: string; sectionSubtitle?: string }
> = (props) => {
  const { cards } = props as any;
  const sectionTitle = (props as any).sectionTitle;
  const sectionSubtitle = (props as any).sectionSubtitle;
  const vp = useViewport();
  const isMobile = vp.isMobile;
  const isTablet = vp.isTablet;
  const padX = isMobile ? 24 : isTablet ? 48 : 64;
  const padY = isMobile ? 64 : isTablet ? 80 : 112;
  const cols = isMobile ? 1 : 3;
  const gap = isMobile ? 16 : 24;

  if (!cards?.length) return null;

  return (
    <section
      style={{
        background: "var(--cream-2)",
        padding: `${padY}px ${padX}px`,
        borderTop: "1px solid var(--rule)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "flex-end",
            gap: 24,
            marginBottom: isMobile ? 36 : 56,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
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
              <span>Domenii de activitate</span>
            </div>
            {sectionTitle && (
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: isMobile ? 36 : isTablet ? 44 : 52,
                  lineHeight: 1.1,
                  color: "var(--ink)",
                  margin: 0,
                  letterSpacing: "-0.01em",
                  maxWidth: 720,
                }}
              >
                {sectionTitle}
              </h2>
            )}
          </div>
          {sectionSubtitle && (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                lineHeight: 1.7,
                color: "var(--ink-soft)",
                margin: 0,
                maxWidth: 360,
              }}
            >
              {sectionSubtitle}
            </p>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gap,
          }}
        >
          {cards.map((card: any, i: number) => (
            <ServiceCard key={i} index={i} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};
