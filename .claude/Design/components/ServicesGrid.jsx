// ServicesGrid.jsx — 6-card grid of departments / domains.
// figma node: 2027:284 (Card Grid) — 6× RegularCard
function ServicesGrid({ items = null }) {
  const vp = useViewport();
  const isMobile = vp.isMobile;
  const isTablet = vp.isTablet;
  const padX = isMobile ? 24 : isTablet ? 48 : 64;
  const padY = isMobile ? 64 : isTablet ? 80 : 112;
  const cols = isMobile ? 1 : 3;
  const gap = isMobile ? 16 : 24;

  const defaults = [
    { title: "Folclor & Tradiții",    icon: "diamond", desc: "Ansambluri folclorice, dansuri și costume populare, cercetare și valorificare a patrimoniului imaterial al zonei Botoșani." },
    { title: "Spectacol & Muzică",   icon: "cross",   desc: "Concerte, recitaluri, producții teatrale și colaborări cu filarmonici, soliști și companii naționale." },
    { title: "Educație Culturală",   icon: "rhombus", desc: "Expoziții, ateliere și tabere de creație — programe gândite pentru copii, tineri și public larg." },
  ];
  const list = items || defaults;

  return (
    <section
      data-screen-label="ServicesGrid"
      style={{
        background: "var(--cream-2)",
        padding: `${padY}px ${padX}px`,
        borderTop: "1px solid var(--rule)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "flex-end",
          gap: 24,
          marginBottom: isMobile ? 36 : 56,
        }}>
          <div>
            <div style={{
              display: "flex", alignItems: "center", gap: 10, marginBottom: 16,
              color: "var(--red)", fontSize: 13, fontWeight: 600,
              letterSpacing: "0.18em", textTransform: "uppercase",
            }}>
              <Motif.Diamond size={10} color="var(--red)" />
              <span>Domenii de activitate</span>
            </div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: isMobile ? 36 : isTablet ? 44 : 52,
              lineHeight: 1.1,
              color: "var(--ink)",
              margin: 0,
              letterSpacing: "-0.01em",
              maxWidth: 720,
              textWrap: "balance",
            }}>
              Trei direcții, o singură misiune
            </h2>
          </div>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            lineHeight: 1.7,
            color: "var(--ink-soft)",
            margin: 0,
            maxWidth: 360,
            textWrap: "pretty",
          }}>
            Programele noastre acoperă întreaga sferă a vieții culturale botoșănene — de la creație și educație la cercetare și diseminare.
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gap,
        }}>
          {list.map((it, i) => (
            <ServiceCard key={i} index={i} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ title, desc, icon, index }) {
  const [hover, setHover] = React.useState(false);
  // Cycle accent color across the 6 cards: red, navy, gold, red, navy, gold
  const accents = ["var(--red)", "var(--ink)", "var(--gold)"];
  const accent = accents[index % 3];

  const iconEl = (() => {
    if (icon === "cross")   return <Motif.Cross size={48} color={accent} />;
    if (icon === "rhombus") return <Motif.Diamond size={42} color={accent} style={{ borderRadius: 2 }} />;
    return <Motif.Cross size={48} color={accent} />;
  })();

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
        transition: "box-shadow 200ms cubic-bezier(.2,.6,.2,1), transform 200ms cubic-bezier(.2,.6,.2,1)",
        boxShadow: hover ? "var(--shadow-lift)" : "var(--shadow-card)",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        display: "flex",
        flexDirection: "column",
        minHeight: 260,
      }}
    >
      {/* Number index, small upper-right */}
      <span style={{
        position: "absolute", top: 20, right: 24,
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        fontSize: 20,
        color: "var(--rule)",
        fontWeight: 500,
      }}>
        0{index + 1}
      </span>

      <div style={{ marginBottom: 24 }}>{iconEl}</div>

      <h3 style={{
        fontFamily: "var(--font-display)",
        fontWeight: 500,
        fontSize: 24,
        lineHeight: 1.2,
        color: "var(--ink)",
        margin: "0 0 12px 0",
      }}>{title}</h3>

      <p style={{
        fontFamily: "var(--font-body)",
        fontSize: 14,
        lineHeight: 1.6,
        color: "var(--ink-soft)",
        margin: "0 0 24px 0",
        flex: 1,
      }}>{desc}</p>

      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        paddingTop: 16, borderTop: "1px solid var(--rule)",
      }}>
        <span style={{
          fontSize: 12, fontWeight: 600,
          letterSpacing: "0.16em", textTransform: "uppercase",
          color: accent,
        }}>
          Detalii
        </span>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={accent} strokeWidth="1.6"
          style={{
            transform: hover ? "translateX(4px)" : "translateX(0)",
            transition: "transform 200ms cubic-bezier(.2,.6,.2,1)",
          }}>
          <path d="M7 17L17 7M17 7H9M17 7V15" />
        </svg>
      </div>
    </article>
  );
}
window.ServicesGrid = ServicesGrid;
