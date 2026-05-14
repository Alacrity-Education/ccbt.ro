// HistoryStrip.jsx — modern horizontal-scrollable history rail.
// figma node: 2027:284 (Timeline strip). Reworked as a snap-scroll carousel.
function HistoryStrip({ items = null }) {
  const vp = useViewport();
  const isMobile = vp.isMobile;
  const isTablet = vp.isTablet;
  const padX = isMobile ? 24 : isTablet ? 48 : 64;
  const padY = isMobile ? 64 : 96;

  const defaults = [
    { year: "1968", title: "Fondare",                body: "Înființat ca Casă de Cultură Județeană, pentru a susține mișcarea folclorică și artistică a zonei Botoșani." },
    { year: "1985", title: "Sala „Mihai Eminescu”",  body: "Inaugurarea sălii principale de spectacole — reper al vieții culturale botoșănene." },
    { year: "2001", title: "Reorganizare",           body: "Reorganizare ca Centru Cultural Județean Botoșani, cu un mandat extins de cercetare și diseminare." },
    { year: "2009", title: "Festivalul Folclorului", body: "Lansarea festivalului anual, care reunește ansambluri din întreaga țară și din comunitățile românești de peste hotare." },
    { year: "2015", title: "Patrimoniu Imaterial",   body: "Programul de cercetare și valorificare a patrimoniului imaterial — colecție de tradiții vii." },
    { year: "2020", title: "Online & Hibrid",         body: "Lansarea platformelor digitale: arhive online, concerte transmise și ateliere hibride pentru un public extins." },
    { year: "2024", title: "Capitală culturală",      body: "Peste 200 de evenimente anuale, parteneriate naționale și internaționale, o nouă generație de creatori." },
  ];
  const list = items || defaults;

  const scrollerRef = React.useRef(null);
  const [activeIdx, setActiveIdx] = React.useState(0);

  const onScroll = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const cards = el.querySelectorAll("[data-hist-card]");
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

  const scrollBy = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-hist-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const cardWidth = isMobile ? 260 : isTablet ? 300 : 340;

  return (
    <section
      data-screen-label="HistoryStrip"
      style={{
        background: "var(--ink)",
        color: "var(--cream)",
        padding: `${padY}px 0`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* faint folk-band stripe at top */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 14,
        opacity: 0.45, pointerEvents: "none",
      }}>
        <Motif.BandH height={14} color="#C8A456" opacity={0.6} />
      </div>

      {/* Header row */}
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: `0 ${padX}px`,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "flex-end",
        justifyContent: "space-between",
        gap: 24,
        marginBottom: isMobile ? 32 : 48,
      }}>
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16,
            color: "var(--gold)", fontSize: 13, fontWeight: 600,
            letterSpacing: "0.18em", textTransform: "uppercase",
          }}>
            <Motif.Diamond size={10} color="var(--gold)" />
            <span>Istoria noastră</span>
          </div>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: isMobile ? 36 : isTablet ? 48 : 60,
            lineHeight: 1.05,
            margin: 0,
            letterSpacing: "-0.015em",
            color: "var(--cream)",
            textWrap: "balance",
            maxWidth: 720,
          }}>
            Peste cinci decenii <em style={{ color: "var(--gold)", fontStyle: "italic", fontWeight: 500 }}>de cultură</em>
          </h2>
        </div>

        {!isMobile ? (
          <div style={{ display: "flex", gap: 12 }}>
            <ScrollBtn onClick={() => scrollBy(-1)} dir="left" />
            <ScrollBtn onClick={() => scrollBy(1)}  dir="right" />
          </div>
        ) : null}
      </div>

      {/* Progress bar */}
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: `0 ${padX}px`,
        marginBottom: 28,
      }}>
        <div style={{
          height: 2, background: "rgba(245, 237, 224, 0.12)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", left: 0, top: 0, bottom: 0,
            width: `${((activeIdx + 1) / list.length) * 100}%`,
            background: "var(--gold)",
            transition: "width 240ms cubic-bezier(.2,.6,.2,1)",
          }} />
        </div>
        <div style={{
          marginTop: 10,
          display: "flex", justifyContent: "space-between",
          fontFamily: "var(--font-body)",
          fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase",
          color: "rgba(245, 237, 224, 0.6)",
        }}>
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
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          padding: `8px ${padX}px 48px`,
          maxWidth: "100%",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <style>{`
          [data-hist-scroller]::-webkit-scrollbar { display: none; }
        `}</style>
        {list.map((it, i) => (
          <HistoryCard key={i} item={it} index={i} total={list.length} width={cardWidth} active={i === activeIdx} />
        ))}
        {/* spacer at end so last card can center */}
        <div style={{ flex: "0 0 1px" }} />
      </div>

      {isMobile ? (
        <div style={{
          display: "flex", justifyContent: "center", gap: 12,
          padding: `0 ${padX}px`,
        }}>
          <ScrollBtn onClick={() => scrollBy(-1)} dir="left" />
          <ScrollBtn onClick={() => scrollBy(1)}  dir="right" />
        </div>
      ) : null}
    </section>
  );
}

function HistoryCard({ item, index, total, width, active }) {
  return (
    <article
      data-hist-card="true"
      style={{
        flex: `0 0 ${width}px`,
        scrollSnapAlign: "center",
        background: active
          ? "linear-gradient(180deg, rgba(200,164,86,0.12) 0%, rgba(200,164,86,0.04) 100%)"
          : "rgba(245, 237, 224, 0.04)",
        border: active ? "1px solid var(--gold)" : "1px solid rgba(245, 237, 224, 0.1)",
        padding: "28px 28px 32px",
        position: "relative",
        minHeight: 280,
        display: "flex", flexDirection: "column",
        transition: "background 240ms, border-color 240ms, transform 240ms cubic-bezier(.2,.6,.2,1)",
        transform: active ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Index in corner */}
      <div style={{
        position: "absolute", top: 16, right: 20,
        fontFamily: "var(--font-body)",
        fontSize: 11, fontWeight: 600,
        letterSpacing: "0.18em",
        color: "rgba(245, 237, 224, 0.4)",
      }}>
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>

      {/* Year — display oversized */}
      <div style={{
        fontFamily: "var(--font-display)",
        fontWeight: 500,
        fontStyle: "italic",
        fontSize: 64,
        lineHeight: 1,
        color: active ? "var(--gold)" : "rgba(245, 237, 224, 0.85)",
        marginBottom: 20,
        letterSpacing: "-0.02em",
        transition: "color 240ms",
      }}>
        {item.year}
      </div>

      {/* Diamond node */}
      <div style={{
        width: 12, height: 12, transform: "rotate(45deg)",
        background: active ? "var(--gold)" : "rgba(245, 237, 224, 0.3)",
        marginBottom: 18,
        transition: "background 240ms",
      }} />

      <h4 style={{
        fontFamily: "var(--font-body)",
        fontSize: 12, fontWeight: 700,
        letterSpacing: "0.18em", textTransform: "uppercase",
        color: "var(--cream)",
        margin: "0 0 12px 0",
      }}>{item.title}</h4>

      <p style={{
        fontFamily: "var(--font-body)",
        fontSize: 14, lineHeight: 1.6,
        color: "rgba(245, 237, 224, 0.72)",
        margin: 0,
        textWrap: "pretty",
        flex: 1,
      }}>{item.body}</p>
    </article>
  );
}

function ScrollBtn({ onClick, dir }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={dir === "left" ? "Anterior" : "Următor"}
      style={{
        width: 48, height: 48, borderRadius: 999,
        background: hover ? "var(--gold)" : "transparent",
        color: hover ? "var(--ink)" : "var(--cream)",
        border: "1px solid var(--gold)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
        transition: "background 200ms, color 200ms",
      }}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"
        style={{ transform: dir === "left" ? "rotate(180deg)" : "none" }}>
        <path d="M5 12h14M13 6l6 6-6 6"/>
      </svg>
    </button>
  );
}

window.HistoryStrip = HistoryStrip;
