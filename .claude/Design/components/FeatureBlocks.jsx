// FeatureBlocks.jsx — full-width sticky stacking cards (GSAP).
// As the user scrolls, each card sticks to the top, and the next card
// slides up over it, slightly scaling the previous one down.
function FeatureBlocks({ items = null }) {
  const vp = useViewport();
  const isMobile = vp.isMobile;
  const isTablet = vp.isTablet;
  const padX = isMobile ? 24 : isTablet ? 48 : 64;
  const padY = isMobile ? 72 : 120;

  const defaults = [
    {
      eyebrow: "Vizitează-ne",
      title: "Sediul nostru, în inima orașului",
      body: "Sala „Mihai Eminescu”, galeriile de expoziție și sala de conferințe — un spațiu deschis publicului, zilnic între 09:00 și 17:00. Programări pentru grupuri organizate, vizite ghidate și prezentări pentru școli sunt posibile la cerere.",
      cta: "Vezi programul",
      image: "building",
      tone: "navy",
    },
    {
      eyebrow: "Participă",
      title: "Ateliere & programe pentru tineri",
      body: "Tabere de creație, ateliere de folclor, pictură și muzică — gândite pentru copii și tineri pasionați de cultură. Înscrierile se fac online, locurile sunt limitate iar grupele sunt formate după vârstă și nivel.",
      cta: "Înscrie-te",
      image: "workshop",
      tone: "cream",
    },
  ];
  const list = (items || defaults).slice(0, 2);

  const sectionRef = React.useRef(null);
  const cardRefs = React.useRef([]);
  cardRefs.current = [];
  const setCardRef = (el) => { if (el) cardRefs.current.push(el); };

  // Card height — used for sizing the spacer that gives us scroll room.
  const cardHeight = isMobile ? "auto" : isTablet ? 540 : 580;
  // Sticky top offset (where each card pins). Navbar is 88px on desktop, 64 on compact.
  const stickyTop = (vp.isDesktop ? 88 : 64) + 24;
  // Per-card scroll distance — how much scroll moves us from one card to the next.
  const scrollPerCard = isMobile ? 0 : 600;

  React.useEffect(() => {
    if (isMobile) return;
    if (!window.gsap || !window.ScrollTrigger) return;
    const gsap = window.gsap;
    const ST = window.ScrollTrigger;
    gsap.registerPlugin(ST);

    const ctx = gsap.context(() => {
      const cards = cardRefs.current;
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return; // last card stays at rest
        // As the next card comes into view, scale/fade the previous one
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
  }, [isMobile, stickyTop]);

  return (
    <section
      ref={sectionRef}
      data-screen-label="FeatureBlocks"
      style={{
        background: "var(--cream)",
        padding: `${padY}px ${padX}px ${isMobile ? padY : padY + 40}px`,
        position: "relative",
      }}
    >
      {/* Section heading */}
      <div style={{ maxWidth: 1280, margin: "0 auto 56px" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16,
          color: "var(--red)", fontSize: 13, fontWeight: 600,
          letterSpacing: "0.18em", textTransform: "uppercase",
        }}>
          <Motif.Diamond size={10} color="var(--red)" />
          <span>Implică-te</span>
        </div>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: isMobile ? 36 : isTablet ? 48 : 60,
          lineHeight: 1.05,
          letterSpacing: "-0.015em",
          color: "var(--ink)",
          margin: 0,
          maxWidth: 760,
          textWrap: "balance",
        }}>
          Două invitații deschise <em style={{ color: "var(--gold)", fontStyle: "italic", fontWeight: 500 }}>publicului</em>
        </h2>
      </div>

      {/* Stacking cards */}
      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? 24 : scrollPerCard,
      }}>
        {list.map((it, i) => (
          <div
            key={i}
            ref={setCardRef}
            style={{
              position: isMobile ? "relative" : "sticky",
              top: isMobile ? "auto" : stickyTop,
              zIndex: 10 + i,
              willChange: "transform",
            }}
          >
            <FeatureCard {...it} index={i} isMobile={isMobile} height={cardHeight} />
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ eyebrow, title, body, cta, image, tone, index, isMobile, height }) {
  const isNavy = tone === "navy";
  return (
    <article style={{
      background: isNavy ? "var(--ink)" : "var(--paper)",
      color: isNavy ? "var(--cream)" : "var(--ink)",
      border: isNavy ? "none" : "1px solid var(--rule)",
      boxShadow: "0 30px 60px rgba(27,42,74,0.18), 0 8px 20px rgba(27,42,74,0.10)",
      overflow: "hidden",
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "5fr 7fr",
      width: "100%",
      height: isMobile ? "auto" : height,
    }}>
      {/* Image side */}
      <div style={{
        position: "relative",
        background: "linear-gradient(135deg, #2c3b5f 0%, #1b2a4a 100%)",
        minHeight: isMobile ? 220 : 0,
      }}>
        <FeatureImage kind={image} />
        <div style={{
          position: "absolute", top: 20, left: 20,
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(176, 58, 46, 0.95)",
          color: "#fff",
          padding: "8px 14px",
          fontSize: 11, fontWeight: 600,
          letterSpacing: "0.18em", textTransform: "uppercase",
        }}>
          <Motif.Diamond size={8} color="#fff" />
          <span>{eyebrow}</span>
        </div>
        {/* Index numeral, large, lower-right */}
        <div style={{
          position: "absolute", right: 24, bottom: 18,
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 96,
          fontWeight: 500,
          color: "rgba(245, 237, 224, 0.18)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}>
          0{index + 1}
        </div>
      </div>

      {/* Text side */}
      <div style={{
        padding: isMobile ? "32px 28px" : "56px 56px",
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}>
        <div style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 18,
          color: "var(--gold)",
          marginBottom: 12,
        }}>
          — Capitolul 0{index + 1}
        </div>
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: isMobile ? 32 : 44,
          lineHeight: 1.12,
          letterSpacing: "-0.01em",
          margin: "0 0 20px 0",
          color: isNavy ? "var(--cream)" : "var(--ink)",
          textWrap: "balance",
        }}>{title}</h3>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: isMobile ? 15 : 16,
          lineHeight: 1.7,
          color: isNavy ? "rgba(245, 237, 224, 0.78)" : "var(--ink-soft)",
          margin: "0 0 32px 0",
          textWrap: "pretty",
        }}>{body}</p>
        <button style={{
          alignSelf: "flex-start",
          display: "inline-flex", alignItems: "center", gap: 14,
          background: isNavy ? "var(--red)" : "var(--ink)",
          color: "#fff",
          border: "none",
          padding: "14px 26px",
          fontSize: 12, fontWeight: 600,
          letterSpacing: "0.18em", textTransform: "uppercase",
          cursor: "pointer", borderRadius: 2,
          fontFamily: "var(--font-body)",
        }}>
          {cta}
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </button>
      </div>
    </article>
  );
}

function FeatureImage({ kind }) {
  if (kind === "building") {
    return (
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
          {[0,1,2,3,4,5,6,7].map(i => (
            <rect key={i} x={100 + i*54} y={320} width={32} height={70} fill="#1b2a4a" opacity="0.6" />
          ))}
          {[0,1,2,3,4,5,6,7].map(i => (
            <rect key={`b${i}`} x={100 + i*54} y={440} width={32} height={70} fill="#1b2a4a" opacity="0.6" />
          ))}
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 600 600" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="fi-w" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d9a574" /><stop offset="100%" stopColor="#7a4d3a" />
        </linearGradient>
      </defs>
      <rect width="600" height="600" fill="url(#fi-w)" />
      <g fill="#1b2a4a" opacity="0.55">
        {Array.from({ length: 6 }).map((_, r) => (
          Array.from({ length: 6 }).map((__, c) => {
            const x = 60 + c * 90;
            const y = 60 + r * 90;
            return <g key={`${r}-${c}`} transform={`translate(${x} ${y}) rotate(45)`}>
              <rect x={-18} y={-18} width={36} height={36} />
              <rect x={-4} y={-26} width={8} height={52} fill="#b03a2e" opacity="0.9" />
              <rect x={-26} y={-4} width={52} height={8} fill="#b03a2e" opacity="0.9" />
            </g>;
          })
        ))}
      </g>
      <rect width="600" height="600" fill="rgba(27,42,74,0.25)" />
    </svg>
  );
}
window.FeatureBlocks = FeatureBlocks;
