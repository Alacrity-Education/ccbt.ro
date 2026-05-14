// Timeline.jsx — navy band: "Urmează­torii pași" + newsletter signup (responsive)
function Timeline() {
  const vp = useViewport();
  const m = vp.isMobile;
  const t = vp.isTablet;

  const steps = [
    { tag: "MAI 2026", txt: 'Lansarea proiectului „Cultură pentru toți”' },
    { tag: "IUN 2026", txt: "Ateliere educaționale pentru tineri" },
    { tag: "IUL 2026", txt: 'Tabăra de creație „Vara la Botoșani”' },
    { tag: "AUG 2026", txt: "Zilele Culturale ale Botoșaniului" },
  ];
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);

  const pad      = m ? "56px 24px" : t ? "60px 40px" : "64px 64px";
  const colCfg   = (m || t) ? "1fr" : "1.5fr 1fr";
  const colGap   = (m || t) ? 40 : 64;

  return (
    <section style={{ background: "var(--ink)", color: "#fff", position: "relative", overflow: "hidden" }}>
      <Motif.BandH height={14} color="#C8A456" opacity={0.18} style={{ position: "absolute", left: 0, right: 0, top: 18 }}/>
      <Motif.BandH height={14} color="#C8A456" opacity={0.18} style={{ position: "absolute", left: 0, right: 0, bottom: 18 }}/>

      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: pad,
        display: "grid", gridTemplateColumns: colCfg, gap: colGap,
      }}>
        {/* Timeline */}
        <div>
          <div style={{
            display: "flex", alignItems: "center", gap: m ? 8 : 14,
            marginBottom: m ? 28 : 36, justifyContent: "center", flexWrap: m ? "wrap" : "nowrap",
          }}>
            {!m && <Motif.Divider width={t ? 100 : 140} tone="gold" />}
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: m ? 22 : 28,
              letterSpacing: "0.04em", textTransform: "uppercase", margin: 0, color: "#fff",
              whiteSpace: "nowrap", textAlign: "center",
            }}>
              Urmează­torii pași
            </h2>
            {!m && <Motif.Divider width={t ? 100 : 140} tone="gold" />}
          </div>

          {m ? (
            // Vertical timeline on mobile
            <div style={{ position: "relative", paddingLeft: 32 }}>
              <div style={{
                position: "absolute", left: 14, top: 6, bottom: 6, width: 1,
                backgroundImage: "linear-gradient(to bottom, #C8A456 50%, transparent 50%)",
                backgroundSize: "1px 10px", backgroundRepeat: "repeat-y",
              }} />
              {steps.map((s, i) => (
                <div key={i} style={{ position: "relative", paddingBottom: 24 }}>
                  <div style={{
                    position: "absolute", left: -25, top: 4,
                    width: 14, height: 14, background: "var(--gold)",
                    transform: "rotate(45deg)",
                    boxShadow: "0 0 0 3px var(--ink)",
                  }}/>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "#F0D58A", marginBottom: 4 }}>{s.tag}</div>
                  <div style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 500, lineHeight: 1.45 }}>{s.txt}</div>
                </div>
              ))}
            </div>
          ) : (
            // Horizontal timeline
            <div style={{ position: "relative", paddingTop: 12 }}>
              <div style={{
                position: "absolute", left: 30, right: 30, top: 26, height: 1,
                backgroundImage: "linear-gradient(to right, #C8A456 50%, transparent 50%)",
                backgroundSize: "10px 1px", backgroundRepeat: "repeat-x",
              }} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
                {steps.map((s, i) => (
                  <div key={i} style={{ textAlign: "center", padding: "0 8px" }}>
                    <div style={{
                      width: 16, height: 16, background: "var(--gold)",
                      transform: "rotate(45deg)", margin: "0 auto 20px",
                      boxShadow: "0 0 0 3px var(--ink)",
                    }}/>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "#F0D58A", marginBottom: 6 }}>{s.tag}</div>
                    <div style={{ fontSize: 13.5, color: "#FFFFFF", fontWeight: 500, lineHeight: 1.45, maxWidth: 180, margin: "0 auto" }}>{s.txt}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Newsletter */}
        <div style={{
          paddingLeft: (m || t) ? 0 : 32,
          paddingTop: (m || t) ? 24 : 0,
          borderLeft: (m || t) ? "none" : "1px solid rgba(255,255,255,0.12)",
          borderTop:  (m || t) ? "1px solid rgba(255,255,255,0.12)" : "none",
        }}>
          <Motif.Eyebrow tone="gold">Abonează-te la noutăți</Motif.Eyebrow>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.78)", lineHeight: 1.55, margin: "12px 0 22px" }}>
            Fii la curent cu cele mai recente evenimente și proiecte culturale.
          </p>
          {sent ? (
            <div style={{ padding: "14px 16px", background: "rgba(200,164,86,0.12)", border: "1px solid rgba(200,164,86,0.35)", color: "var(--gold-soft)", fontSize: 13 }}>
              Mulțumim! Vei primi în curând noutățile noastre.
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) setSent(true); }} style={{
              display: "flex", gap: 0, flexDirection: m ? "column" : "row",
            }}>
              <input
                type="email" value={email} required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Adresa ta de email"
                style={{
                  flex: 1, padding: "14px 16px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  color: "#fff", fontFamily: "var(--font-body)", fontSize: 14,
                  outline: "none", boxSizing: "border-box",
                  marginBottom: m ? 10 : 0,
                }} />
              <button type="submit" className="btn btn--primary" style={{
                padding: m ? "14px 22px" : "0 22px",
                borderRadius: 0,
                justifyContent: "center",
              }}>
                Abonează-te
              </button>
            </form>
          )}
          {!m ? (
            <div style={{ marginTop: 22 }}>
              <Motif.Divider width={200} tone="gold" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
window.Timeline = Timeline;
