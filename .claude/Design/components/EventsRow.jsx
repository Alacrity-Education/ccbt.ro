// EventsRow.jsx — four dated event cards (responsive)
function EventsRow() {
  const vp = useViewport();
  const m = vp.isMobile;
  const t = vp.isTablet;

  const events = [
    { day: "24", mo: "MAI", title: "Concert Simfonic Extraordinar", venue: 'Sala „Mihai Eminescu”',
      grad: "linear-gradient(135deg, #1f1a14 0%, #4a3a25 60%, #7a5a35 100%)" },
    { day: "28", mo: "MAI", title: "Expoziție de Artă Plastică", venue: "Galeria Colecția de Artă",
      grad: "linear-gradient(135deg, #221915 0%, #463224 60%, #715029 100%)" },
    { day: "01", mo: "IUN", title: "Festivalul Folclorului", venue: "Parcul Mihai Eminescu",
      grad: "linear-gradient(135deg, #2a2520 0%, #524430 55%, #8a6635 100%)" },
    { day: "05", mo: "IUN", title: "Spectacol de Teatru", venue: 'Teatrul „Mihai Eminescu”',
      grad: "linear-gradient(135deg, #1c1815 0%, #3d3024 60%, #6e4f2e 100%)" },
  ];

  const pad = m ? "0 24px 64px" : t ? "0 40px 72px" : "0 64px 96px";
  const cols = m ? "1fr" : t ? "repeat(2, 1fr)" : "repeat(4, 1fr)";

  return (
    <section style={{ background: "var(--cream)", padding: 0 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: pad }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
          <Motif.Eyebrow tone="red">Evenimente</Motif.Eyebrow>
          <a href="#" className="link-arrow" style={{ marginLeft: "auto" }}>
            Vezi toate
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: cols, gap: m ? 14 : 18 }}>
          {events.map((e, i) => (
            <article key={i} className="card" style={{ overflow: "hidden", cursor: "pointer" }}>
              <div style={{ position: "relative", height: m ? 200 : 170, background: e.grad }}>
                <div style={{
                  position: "absolute", left: 12, top: 12,
                  width: 44, padding: "8px 0",
                  background: "var(--red)", color: "#fff",
                  textAlign: "center", lineHeight: 1,
                  fontFamily: "var(--font-body)", fontWeight: 700,
                }}>
                  <div style={{ fontSize: 20 }}>{e.day}</div>
                  <div style={{ fontSize: 10, letterSpacing: "0.16em", marginTop: 3 }}>{e.mo}</div>
                </div>
              </div>
              <div style={{ padding: "16px 16px 18px", position: "relative" }}>
                <h5 style={{
                  fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18,
                  color: "var(--ink)", margin: "0 24px 4px 0", lineHeight: 1.2,
                }}>{e.title}</h5>
                <p style={{ fontSize: 12.5, color: "var(--ink-soft)", margin: 0 }}>{e.venue}</p>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--red)" strokeWidth="2" style={{ position: "absolute", right: 14, bottom: 16 }}>
                  <path d="M7 17 17 7M9 7h8v8"/>
                </svg>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
window.EventsRow = EventsRow;
