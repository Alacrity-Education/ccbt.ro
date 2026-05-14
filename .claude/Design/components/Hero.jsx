// Hero.jsx — full-bleed photo hero with slide pagination (responsive)
function Hero() {
  const vp = useViewport();
  const slides = [
    {
      label: "Palatul Administrativ, Botoșani",
      bg: "radial-gradient(ellipse 110% 90% at 78% 55%, #e8b070 0%, #b07a44 22%, #6e4a2e 48%, #2d2218 75%, #161210 100%)",
    },
    {
      label: "Festivalul Folclorului",
      bg: "radial-gradient(ellipse 110% 90% at 72% 60%, #d99d5e 0%, #9a6938 26%, #5a3e26 52%, #241c14 78%, #110d0a 100%)",
    },
    {
      label: "Galeria Colecția de Artă",
      bg: "radial-gradient(ellipse 110% 90% at 80% 50%, #c89568 0%, #8d6240 28%, #4d3624 55%, #1f1812 80%, #100c09 100%)",
    },
  ];
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, []);

  const m = vp.isMobile;
  const t = vp.isTablet;
  const heroHeight = m ? 560 : t ? 540 : 600;
  const padX       = m ? 24 : t ? 40 : 64;
  const padTop     = m ? 72 : t ? 92 : 120;
  const titleSize  = m ? 40 : t ? 56 : 76;
  const bodySize   = m ? 15 : 17;
  const btnPad     = m ? "14px 22px" : "16px 28px";

  const Silhouette = () => (
    <svg viewBox="0 0 1600 600" preserveAspectRatio="xMidYMax meet" style={{
      position: "absolute", inset: 0, width: "100%", height: "100%",
      opacity: 0.32, mixBlendMode: "soft-light",
    }} aria-hidden="true">
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

  return (
    <section style={{
      position: "relative", height: heroHeight, overflow: "hidden",
      background: slides[i].bg,
      transition: "background 800ms cubic-bezier(.2,.6,.2,1)",
    }} data-screen-label="Hero">
      <div style={{
        position: "absolute", right: m ? "-10%" : "8%", top: m ? "20%" : "30%",
        width: m ? 360 : 480, height: m ? 360 : 480,
        background: "radial-gradient(circle, rgba(255,210,150,0.55) 0%, rgba(255,180,110,0.15) 35%, transparent 65%)",
        filter: "blur(4px)", pointerEvents: "none",
      }} />

      <Silhouette />

      {/* legibility — stronger on mobile since content covers more of frame */}
      <div style={{
        position: "absolute", inset: 0,
        background: m
          ? "linear-gradient(180deg, rgba(10,14,28,0.45) 0%, rgba(10,14,28,0.55) 50%, rgba(10,14,28,0.65) 100%)"
          : "linear-gradient(90deg, rgba(10,14,28,0.75) 0%, rgba(10,14,28,0.45) 45%, rgba(10,14,28,0.10) 75%, transparent 100%)",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, transparent 0%, transparent 55%, rgba(0,0,0,0.35) 100%)",
      }} />

      {/* Prev / Next — hide on mobile (use swipe dots) */}
      {!m && (
        <React.Fragment>
          <button onClick={() => setI((v) => (v - 1 + slides.length) % slides.length)} aria-label="Înapoi" style={{
            position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)",
            width: 40, height: 40, background: "transparent", border: "none", color: "#fff", cursor: "pointer", opacity: 0.75,
          }}>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button onClick={() => setI((v) => (v + 1) % slides.length)} aria-label="Înainte" style={{
            position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)",
            width: 40, height: 40, background: "transparent", border: "none", color: "#fff", cursor: "pointer", opacity: 0.75,
          }}>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </React.Fragment>
      )}

      <div style={{
        position: "relative", maxWidth: 1280, margin: "0 auto",
        padding: `${padTop}px ${padX}px 0`,
        height: "100%", boxSizing: "border-box",
      }}>
        <div style={{ maxWidth: 640 }}>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 700, fontSize: titleSize, lineHeight: 1.02,
            color: "#FFFFFF", letterSpacing: "-0.01em", margin: 0,
            textShadow: "0 2px 24px rgba(0,0,0,0.35)",
          }}>
            Cultura unește.
          </h1>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: titleSize, lineHeight: 1.02,
            color: "var(--red-soft)", letterSpacing: "-0.01em", margin: "6px 0 0",
            textShadow: "0 2px 24px rgba(0,0,0,0.35)",
          }}>
            Botoșani ne inspiră.
          </h1>

          <div style={{ margin: m ? "18px 0 16px" : "26px 0 22px" }}>
            <Motif.Divider width={m ? 200 : 260} tone="gold" />
          </div>

          <p style={{
            fontFamily: "var(--font-body)", fontSize: bodySize, lineHeight: 1.6,
            color: "rgba(255,255,255,0.90)", maxWidth: 420, margin: m ? "0 0 24px" : "0 0 32px",
            textShadow: "0 1px 12px rgba(0,0,0,0.35)",
          }}>
            Promovăm valorile culturale, tradițiile și arta{m ? " " : <br/>}în inima comunității botoșănene.
          </p>

          <button className="btn btn--primary" style={{ padding: btnPad }}>
            Descoperă mai mult
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </button>

          <div style={{ marginTop: m ? 32 : 56, display: "flex", gap: 6 }}>
            {slides.map((s, idx) => (
              <button key={idx} onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`} style={{
                width: idx === i ? 32 : 22, height: 4,
                background: idx === i ? "var(--red)" : "rgba(255,255,255,0.45)",
                border: "none", cursor: "pointer", padding: 0,
                transition: "width 240ms cubic-bezier(.2,.6,.2,1), background 240ms",
              }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
window.Hero = Hero;
