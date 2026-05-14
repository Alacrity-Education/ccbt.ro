// PartnersStrip.jsx — typographic crests of partner institutions (responsive)
function PartnersStrip() {
  const vp = useViewport();
  const m = vp.isMobile;
  const t = vp.isTablet;

  const partners = [
    "CONSILIUL JUDEȚEAN\nBOTOȘANI",
    "PRIMĂRIA\nMUNICIPIULUI BOTOȘANI",
    'TEATRUL\n„MIHAI EMINESCU”\nBOTOȘANI',
    "MUZEUL JUDEȚEAN\nBOTOȘANI",
    'UNIVERSITATEA\n„ȘTEFAN CEL MARE”\nSUCEAVA',
    "TVR\nIAȘI",
    "RADIO ROMÂNIA\nIAȘI",
  ];

  const Crest = ({ p }) => (
    <div style={{
      fontSize: 9.5, fontWeight: 600, letterSpacing: "0.08em",
      color: "var(--ink-soft)", textAlign: "center", lineHeight: 1.35,
      whiteSpace: "pre-line",
      display: "flex", alignItems: "center", gap: 8,
      opacity: 0.8, flexShrink: 0,
    }}>
      <span style={{
        width: 32, height: 32, border: "1.5px solid var(--ink-soft)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        borderRadius: 1,
      }}>
        <Motif.Diamond size={6} color="var(--ink-soft)" />
      </span>
      <span>{p}</span>
    </div>
  );

  // Mobile layout: stacked title + continuous marquee
  if (m) {
    return (
      <section style={{ background: "var(--cream)", padding: "28px 0 24px", borderTop: "1px solid var(--rule)", overflow: "hidden" }}>
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
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          marginBottom: 18,
        }}>
          <Motif.Diamond color="var(--red)" />
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.22em", color: "var(--ink)" }}>PARTENERI</span>
        </div>
        <div className="partners-mask">
          <div className="partners-track">
            {partners.map((p, i) => <Crest key={`a-${i}`} p={p}/>)}
            {partners.map((p, i) => <Crest key={`b-${i}`} p={p}/>)}
          </div>
        </div>
      </section>
    );
  }

  // Desktop / tablet — original single-row layout with side arrows
  return (
    <section style={{ background: "var(--cream)", padding: "28px 0", borderTop: "1px solid var(--rule)" }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: t ? "0 40px" : "0 64px",
        display: "flex", alignItems: "center", gap: 14,
      }}>
        <button aria-label="prev" style={{ background: "none", border: "none", color: "var(--ink-soft)", cursor: "pointer", flexShrink: 0 }}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m15 18-6-6 6-6"/></svg>
        </button>

        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          paddingRight: 14, borderRight: "1px solid var(--rule)",
          flexShrink: 0,
        }}>
          <Motif.Diamond color="var(--red)" />
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", color: "var(--ink)" }}>PARTENERI</span>
        </div>

        <div style={{
          flex: 1, display: "flex", gap: 14,
          justifyContent: "space-between",
        }}>
          {partners.map((p, i) => <Crest key={i} p={p}/>)}
        </div>

        <button aria-label="next" style={{ background: "none", border: "none", color: "var(--ink-soft)", cursor: "pointer", flexShrink: 0 }}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </section>
  );
}
window.PartnersStrip = PartnersStrip;
