// AboutSection.jsx — left text + three pillar cards (responsive)
function AboutSection() {
  const vp = useViewport();
  const m = vp.isMobile;
  const t = vp.isTablet;

  const pillars = [
    { title: "Misiune", body: "Promovăm cultura și arta în toate formele sale.", tone: "red" },
    { title: "Viziune", body: "O comunitate educată, creativă și unită prin cultură.", tone: "ink" },
    { title: "Valori",  body: "Respect, autenticitate, implicare, diversitate.", tone: "red" },
  ];
  const colorFor = (tone) => tone === "red" ? "var(--red)" : tone === "ink" ? "var(--ink)" : "var(--ink)";

  const PillarIcon = ({ tone }) => {
    if (tone === "red") {
      return (
        <svg viewBox="0 0 64 64" width="44" height="44"><g fill="#B03A2E">
          <path d="M32 6 L40 18 L52 18 L42 28 L48 44 L32 36 L16 44 L22 28 L12 18 L24 18 Z"/>
          <circle cx="32" cy="50" r="3"/>
        </g></svg>
      );
    }
    if (tone === "ink") {
      return (
        <svg viewBox="0 0 64 64" width="44" height="44"><g fill="#1B2A4A">
          <path d="M32 4 L42 14 L52 24 L42 34 L32 44 L22 34 L12 24 L22 14 Z"/>
          <path d="M32 16 L38 24 L32 32 L26 24 Z" fill="#F5EDE0"/>
          <rect x="30" y="46" width="4" height="4" transform="rotate(45 32 48)"/>
        </g></svg>
      );
    }
    return (
      <svg viewBox="0 0 64 64" width="44" height="44"><g fill="#B03A2E">
        <path d="M32 6 L46 20 L32 34 L18 20 Z"/>
        <path d="M32 16 L40 24 L32 32 L24 24 Z" fill="#F5EDE0"/>
        <path d="M16 38 L24 46 L16 54 L8 46 Z"/>
        <path d="M48 38 L56 46 L48 54 L40 46 Z"/>
        <path d="M32 40 L40 48 L32 56 L24 48 Z"/>
      </g></svg>
    );
  };

  const pad      = m ? "64px 24px" : t ? "72px 40px" : "96px 64px";
  const leftPad  = 0; // content stays aligned with the rest of the page; band sits behind
  const headSize = m ? 34 : t ? 40 : 48;
  const gridCols = (m || t) ? "1fr" : "minmax(260px, 360px) 1fr";
  const gridGap  = m ? 40 : t ? 40 : 64;
  const pillarCols = m ? "1fr" : "repeat(3, 1fr)";

  return (
    <section style={{ background: "var(--cream)", position: "relative", padding: pad }}>
      {/* vertical folk band on the left — desktop only */}
      {!m && !t ? (
        <Motif.BandV width={28} color="#B03A2E" opacity={0.55} style={{
          position: "absolute", left: 32, top: 60, bottom: 60,
        }}/>
      ) : null}

      <div style={{
        maxWidth: 1280, margin: "0 auto",
        paddingLeft: leftPad,
        display: "grid", gridTemplateColumns: gridCols, gap: gridGap, alignItems: "start",
      }}>
        <div>
          <Motif.Eyebrow tone="red">Despre noi</Motif.Eyebrow>
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: headSize, lineHeight: 1.05, letterSpacing: "-0.01em",
            color: "var(--ink)", margin: "14px 0 18px",
          }}>
            Centrul Cultural{m ? " " : <br/>}Botoșani
          </h2>
          <p style={{ color: "var(--ink-soft)", fontSize: 15.5, lineHeight: 1.65, margin: "0 0 28px" }}>
            Suntem o instituție publică ce susține și promovează cultura, arta, tradițiile și patrimoniul local. Prin proiectele și evenimentele noastre, contribuim la dezvoltarea comunității și la păstrarea identității culturale.
          </p>
          <button className="btn btn--primary" style={{ padding: "14px 24px" }}>
            Citește mai mult
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: pillarCols, gap: m ? 16 : 22 }}>
          {pillars.map((p) => (
            <div key={p.title} className="card" style={{ padding: m ? "28px 20px" : "36px 24px", textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
                <PillarIcon tone={p.tone}/>
              </div>
              <h4 style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: m ? 22 : 26, color: colorFor(p.tone), margin: "0 0 10px",
              }}>{p.title}</h4>
              <p style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.5, margin: "0 0 18px", minHeight: m ? 0 : 42 }}>{p.body}</p>
              <a href="#" className="link-arrow" style={{ color: colorFor(p.tone) }}>
                Detalii
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.AboutSection = AboutSection;
