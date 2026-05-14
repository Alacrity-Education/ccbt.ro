// TeamTeaser.jsx — small section at the end inviting the user to the team page.
function TeamTeaser() {
  const vp = useViewport();
  const isMobile = vp.isMobile;
  const isTablet = vp.isTablet;
  const padX = isMobile ? 24 : isTablet ? 48 : 64;
  const padY = isMobile ? 56 : 80;

  // Sample avatar tiles — just visual stack, real team page will have full grid
  const tiles = [
    { initials: "AM", tone: "navy" },
    { initials: "DR", tone: "red"  },
    { initials: "EC", tone: "gold" },
    { initials: "MP", tone: "navy" },
    { initials: "IT", tone: "red"  },
  ];

  const [hover, setHover] = React.useState(false);

  return (
    <section
      data-screen-label="TeamTeaser"
      style={{
        background: "var(--cream-2)",
        padding: `${padY}px ${padX}px`,
        borderTop: "1px solid var(--rule)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        gap: isMobile ? 28 : 48,
        justifyContent: "space-between",
      }}>
        {/* Avatar cluster */}
        <div style={{
          display: "flex",
          alignItems: "center",
        }}>
          {tiles.map((t, i) => (
            <div key={i} style={{
              width: isMobile ? 52 : 64, height: isMobile ? 52 : 64,
              borderRadius: 999,
              background:
                t.tone === "navy" ? "var(--ink)" :
                t.tone === "red"  ? "var(--red)" : "var(--gold)",
              color: t.tone === "gold" ? "var(--ink)" : "var(--cream)",
              border: "3px solid var(--cream-2)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-body)",
              fontSize: isMobile ? 13 : 15, fontWeight: 600,
              letterSpacing: "0.08em",
              marginLeft: i === 0 ? 0 : (isMobile ? -14 : -18),
              boxShadow: "var(--shadow-card)",
              zIndex: tiles.length - i,
            }}>
              {t.initials}
            </div>
          ))}
        </div>

        {/* Middle text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 10,
            color: "var(--red)", fontSize: 12, fontWeight: 600,
            letterSpacing: "0.18em", textTransform: "uppercase",
          }}>
            <Motif.Diamond size={8} color="var(--red)" />
            <span>Echipa noastră</span>
          </div>
          <h3 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: isMobile ? 26 : 32,
            lineHeight: 1.15,
            margin: 0,
            color: "var(--ink)",
            letterSpacing: "-0.005em",
            textWrap: "balance",
          }}>
            Oamenii din spatele <em style={{ color: "var(--gold)", fontStyle: "italic", fontWeight: 500 }}>fiecărui proiect</em>
          </h3>
        </div>

        {/* CTA */}
        <a
          href="Echipa.html"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 14,
            background: hover ? "var(--ink)" : "transparent",
            color: hover ? "var(--cream)" : "var(--ink)",
            border: "1px solid var(--ink)",
            padding: "14px 24px",
            fontSize: 12, fontWeight: 600,
            letterSpacing: "0.18em", textTransform: "uppercase",
            textDecoration: "none",
            cursor: "pointer", borderRadius: 2,
            fontFamily: "var(--font-body)",
            transition: "background 200ms, color 200ms",
            flexShrink: 0,
          }}
        >
          Cunoaște echipa
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
window.TeamTeaser = TeamTeaser;
