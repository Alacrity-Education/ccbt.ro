"use client";
import React, { useRef, useState, useCallback } from "react";
import { useViewport } from "@/hooks/useViewport";
import { BandH, Eyebrow, Divider } from "@/components/Motif";
import type { ChronologyBlock as Props } from "@/payload-types";

function ScrollBtn({ onClick, dir }: { onClick: () => void; dir: "left" | "right" }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={dir === "left" ? "Anterior" : "Următor"}
      style={{
        width: 48,
        height: 48,
        borderRadius: 999,
        background: hover ? "var(--gold)" : "transparent",
        color: hover ? "var(--ink)" : "var(--cream)",
        border: "1px solid var(--gold)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "background 200ms, color 200ms",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        style={{ transform: dir === "left" ? "rotate(180deg)" : "none" }}
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}

function HistoryVariant({ title, milestones, vp }: any) {
  const isMobile = vp.isMobile;
  const isTablet = vp.isTablet;
  const padX = isMobile ? 24 : isTablet ? 48 : 64;
  const padY = isMobile ? 64 : 96;

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const onScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-hist-card]");
    const left = el.scrollLeft + el.clientWidth / 2;
    let bestIdx = 0;
    let bestDist = Infinity;
    cards.forEach((c, i) => {
      const center = c.offsetLeft + c.offsetWidth / 2;
      const d = Math.abs(center - left);
      if (d < bestDist) { bestDist = d; bestIdx = i; }
    });
    setActiveIdx(bestIdx);
  }, []);

  const scrollBy = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-hist-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const cardWidth = isMobile ? 260 : isTablet ? 300 : 340;
  const list = milestones?.length ? milestones : [
    { year: "1968", title: "Fondare", body: "Înființat ca Casă de Cultură Județeană." },
    { year: "1985", title: 'Sala „Mihai Eminescu”', body: "Inaugurarea sălii principale de spectacole." },
    { year: "2001", title: "Reorganizare", body: "Centru Cultural Județean Botoșani." },
    { year: "2024", title: "Capitală culturală", body: "Peste 200 de evenimente anuale." },
  ];

  return (
    <section
      style={{
        background: "var(--ink)",
        color: "var(--cream)",
        padding: `${padY}px 0`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <BandH height={14} color="#C8A456" opacity={0.45} style={{ position: "absolute", top: 0, left: 0, right: 0 }} />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: `0 ${padX}px`,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "flex-end",
          justifyContent: "space-between",
          gap: 24,
          marginBottom: isMobile ? 32 : 48,
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
              color: "var(--gold)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ width: 10, height: 10, background: "var(--gold)", transform: "rotate(45deg)", display: "inline-block" }} />
            <span>Istoria noastră</span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: isMobile ? 36 : isTablet ? 48 : 60,
              lineHeight: 1.05,
              margin: 0,
              letterSpacing: "-0.015em",
              color: "var(--cream)",
              maxWidth: 720,
            }}
          >
            {title || (
              <>
                Peste cinci decenii{" "}
                <em style={{ color: "var(--gold)", fontStyle: "italic", fontWeight: 500 }}>de cultură</em>
              </>
            )}
          </h2>
        </div>
        {!isMobile && (
          <div style={{ display: "flex", gap: 12 }}>
            <ScrollBtn onClick={() => scrollBy(-1)} dir="left" />
            <ScrollBtn onClick={() => scrollBy(1)} dir="right" />
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: `0 ${padX}px`, marginBottom: 28 }}>
        <div style={{ height: 2, background: "rgba(245,237,224,0.12)", position: "relative", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: `${((activeIdx + 1) / list.length) * 100}%`,
              background: "var(--gold)",
              transition: "width 240ms cubic-bezier(.2,.6,.2,1)",
            }}
          />
        </div>
        <div
          style={{
            marginTop: 10,
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "var(--font-body)",
            fontSize: 12,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(245,237,224,0.6)",
          }}
        >
          <span style={{ color: "var(--gold)", fontWeight: 600 }}>
            {String(activeIdx + 1).padStart(2, "0")} · {list[activeIdx]?.year}
          </span>
          <span>{String(list.length).padStart(2, "0")} momente</span>
        </div>
      </div>

      {/* Scroller */}
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        style={{
          display: "flex",
          gap: 24,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          padding: `8px ${padX}px 48px`,
          WebkitOverflowScrolling: "touch",
        } as React.CSSProperties}
      >
        {list.map((item: any, i: number) => {
          const active = i === activeIdx;
          return (
            <article
              key={i}
              data-hist-card="true"
              style={{
                flex: `0 0 ${cardWidth}px`,
                scrollSnapAlign: "center",
                background: active
                  ? "linear-gradient(180deg, rgba(200,164,86,0.12) 0%, rgba(200,164,86,0.04) 100%)"
                  : "rgba(245,237,224,0.04)",
                border: active ? "1px solid var(--gold)" : "1px solid rgba(245,237,224,0.1)",
                padding: "28px 28px 32px",
                position: "relative",
                minHeight: 280,
                display: "flex",
                flexDirection: "column",
                transition: "background 240ms, border-color 240ms, transform 240ms cubic-bezier(.2,.6,.2,1)",
                transform: active ? "translateY(-4px)" : "translateY(0)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  right: 20,
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  color: "rgba(245,237,224,0.4)",
                }}
              >
                {String(i + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontStyle: "italic",
                  fontSize: 64,
                  lineHeight: 1,
                  color: active ? "var(--gold)" : "rgba(245,237,224,0.85)",
                  marginBottom: 20,
                  letterSpacing: "-0.02em",
                  transition: "color 240ms",
                }}
              >
                {item.year}
              </div>
              <div
                style={{
                  width: 12,
                  height: 12,
                  transform: "rotate(45deg)",
                  background: active ? "var(--gold)" : "rgba(245,237,224,0.3)",
                  marginBottom: 18,
                  transition: "background 240ms",
                }}
              />
              <h4
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--cream)",
                  margin: "0 0 12px 0",
                }}
              >
                {item.title}
              </h4>
              {item.body && (
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "rgba(245,237,224,0.72)",
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {item.body}
                </p>
              )}
            </article>
          );
        })}
        <div style={{ flex: "0 0 1px" }} />
      </div>

      {isMobile && (
        <div style={{ display: "flex", justifyContent: "center", gap: 12, padding: `0 ${padX}px` }}>
          <ScrollBtn onClick={() => scrollBy(-1)} dir="left" />
          <ScrollBtn onClick={() => scrollBy(1)} dir="right" />
        </div>
      )}
    </section>
  );
}

function UpcomingVariant({ title, steps, newsletterEnabled, vp }: any) {
  const m = vp.isMobile;
  const t = vp.isTablet;
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const defaultSteps = [
    { tag: "MAI 2026", text: 'Lansarea proiectului „Cultură pentru toți"' },
    { tag: "IUN 2026", text: "Ateliere educaționale pentru tineri" },
    { tag: "IUL 2026", text: 'Tabăra de creație „Vara la Botoșani"' },
    { tag: "AUG 2026", text: "Zilele Culturale ale Botoșaniului" },
  ];
  const stepList = steps?.length ? steps : defaultSteps;

  return (
    <section style={{ background: "var(--ink)", color: "#fff", position: "relative", overflow: "hidden" }}>
      <BandH height={14} color="#C8A456" opacity={0.18} style={{ position: "absolute", left: 0, right: 0, top: 18 }} />
      <BandH height={14} color="#C8A456" opacity={0.18} style={{ position: "absolute", left: 0, right: 0, bottom: 18 }} />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: m ? "56px 24px" : t ? "60px 40px" : "64px 64px",
          display: "grid",
          gridTemplateColumns: m || t ? "1fr" : "1.5fr 1fr",
          gap: m || t ? 40 : 64,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: m ? 8 : 14,
              marginBottom: m ? 28 : 36,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {!m && <Divider width={t ? 100 : 140} tone="gold" />}
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: m ? 22 : 28,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                margin: 0,
                color: "#fff",
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
            >
              {title || "Următorii pași"}
            </h2>
            {!m && <Divider width={t ? 100 : 140} tone="gold" />}
          </div>

          {m ? (
            <div style={{ position: "relative", paddingLeft: 32 }}>
              <div
                style={{
                  position: "absolute",
                  left: 14,
                  top: 6,
                  bottom: 6,
                  width: 1,
                  backgroundImage: "linear-gradient(to bottom, #C8A456 50%, transparent 50%)",
                  backgroundSize: "1px 10px",
                  backgroundRepeat: "repeat-y",
                }}
              />
              {stepList.map((s: any, i: number) => (
                <div key={i} style={{ position: "relative", paddingBottom: 24 }}>
                  <div
                    style={{
                      position: "absolute",
                      left: -25,
                      top: 4,
                      width: 14,
                      height: 14,
                      background: "var(--gold)",
                      transform: "rotate(45deg)",
                      boxShadow: "0 0 0 3px var(--ink)",
                    }}
                  />
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "#F0D58A", marginBottom: 4 }}>{s.tag}</div>
                  <div style={{ fontSize: 14, color: "#fff", fontWeight: 500, lineHeight: 1.45 }}>{s.text}</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ position: "relative", paddingTop: 12 }}>
              <div
                style={{
                  position: "absolute",
                  left: 30,
                  right: 30,
                  top: 26,
                  height: 1,
                  backgroundImage: "linear-gradient(to right, #C8A456 50%, transparent 50%)",
                  backgroundSize: "10px 1px",
                  backgroundRepeat: "repeat-x",
                }}
              />
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(stepList.length, 4)}, 1fr)` }}>
                {stepList.map((s: any, i: number) => (
                  <div key={i} style={{ textAlign: "center", padding: "0 8px" }}>
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        background: "var(--gold)",
                        transform: "rotate(45deg)",
                        margin: "0 auto 20px",
                        boxShadow: "0 0 0 3px var(--ink)",
                      }}
                    />
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "#F0D58A", marginBottom: 6 }}>{s.tag}</div>
                    <div style={{ fontSize: 13.5, color: "#fff", fontWeight: 500, lineHeight: 1.45, maxWidth: 180, margin: "0 auto" }}>{s.text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {newsletterEnabled !== false && (
          <div
            style={{
              paddingLeft: m || t ? 0 : 32,
              paddingTop: m || t ? 24 : 0,
              borderLeft: m || t ? "none" : "1px solid rgba(255,255,255,0.12)",
              borderTop: m || t ? "1px solid rgba(255,255,255,0.12)" : "none",
            }}
          >
            <Eyebrow tone="gold">Abonează-te la noutăți</Eyebrow>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.78)", lineHeight: 1.55, margin: "12px 0 22px" }}>
              Fii la curent cu cele mai recente evenimente și proiecte culturale.
            </p>
            {sent ? (
              <div
                style={{
                  padding: "14px 16px",
                  background: "rgba(200,164,86,0.12)",
                  border: "1px solid rgba(200,164,86,0.35)",
                  color: "var(--gold-soft)",
                  fontSize: 13,
                }}
              >
                Mulțumim! Vei primi în curând noutățile noastre.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.includes("@")) setSent(true);
                }}
                style={{ display: "flex", gap: 0, flexDirection: m ? "column" : "row" }}
              >
                <input
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Adresa ta de email"
                  style={{
                    flex: 1,
                    padding: "14px 16px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.22)",
                    color: "#fff",
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                    marginBottom: m ? 10 : 0,
                  }}
                />
                <button
                  type="submit"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    background: "var(--red)",
                    color: "#fff",
                    border: "none",
                    padding: m ? "14px 22px" : "0 22px",
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Abonează-te
                </button>
              </form>
            )}
            {!m && (
              <div style={{ marginTop: 22 }}>
                <Divider width={200} tone="gold" />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export const ChronologyBlock: React.FC<Props> = (props) => {
  const { variant, title, milestones, steps, newsletterEnabled } = props as any;
  const vp = useViewport();

  if (variant === "upcoming") {
    return <UpcomingVariant title={title} steps={steps} newsletterEnabled={newsletterEnabled} vp={vp} />;
  }
  return <HistoryVariant title={title} milestones={milestones} vp={vp} />;
};
