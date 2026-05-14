// Footer.jsx — dark navy footer with three-column layout (responsive)
function Footer() {
  const vp = useViewport();
  const m = vp.isMobile;
  const t = vp.isTablet;

  const cols  = m ? "1fr" : t ? "1fr 1fr" : "1.4fr 1fr 1.1fr 1fr";
  const pad   = m ? "48px 24px 24px" : t ? "56px 40px 24px" : "56px 64px 24px";
  const gap   = m ? 36 : t ? 40 : 56;
  const lowerPad = m ? "18px 24px" : t ? "18px 40px" : "18px 64px";

  return (
    <footer style={{ background: "var(--ink)", color: "rgba(255,255,255,0.82)", position: "relative", overflow: "hidden" }}>
      {/* Faint building line-art — hide on mobile */}
      {!m ? (
        <svg viewBox="0 0 320 120" width={t ? 320 : 420} style={{
          position: "absolute", right: t ? 24 : 40, bottom: 22, opacity: 0.18,
        }}>
          <g stroke="rgba(255,255,255,0.6)" strokeWidth="1" fill="none">
            <line x1="10" y1="110" x2="310" y2="110"/>
            <rect x="60" y="40" width="200" height="70"/>
            <polyline points="60,40 80,28 240,28 260,40"/>
            <polyline points="140,40 160,16 180,40"/>
            <rect x="80" y="58" width="14" height="34"/>
            <rect x="104" y="58" width="14" height="34"/>
            <rect x="128" y="58" width="14" height="34"/>
            <rect x="178" y="58" width="14" height="34"/>
            <rect x="202" y="58" width="14" height="34"/>
            <rect x="226" y="58" width="14" height="34"/>
            <rect x="154" y="64" width="12" height="46"/>
            <line x1="146" y1="40" x2="146" y2="110"/>
            <line x1="174" y1="40" x2="174" y2="110"/>
          </g>
        </svg>
      ) : null}

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: pad, display: "grid", gridTemplateColumns: cols, gap, position: "relative" }}>
        <div>
          <Motif.Logo dark />
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.55, margin: "20px 0 22px", maxWidth: 260 }}>
            Promovăm cultura, susținem arta și valorile autentice ale comunității botoșănene.
          </p>
          <div style={{ display: "flex", gap: 14 }}>
            <a href="#" aria-label="Facebook" style={{ color: "rgba(255,255,255,0.7)" }}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9V14.9H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" style={{ color: "rgba(255,255,255,0.7)" }}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
            </a>
            <a href="#" aria-label="YouTube" style={{ color: "rgba(255,255,255,0.7)" }}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12c0 1.9.2 3.8.5 5.8a3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1c.3-2 .5-3.9.5-5.8 0-1.9-.2-3.8-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h6 style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", color: "var(--gold-soft)", textTransform: "uppercase", margin: "0 0 16px" }}>Linkuri utile</h6>
          {["Despre noi", "Evenimente", "Proiecte", "Galerie", "Noutăți", "Contact"].map((l) => (
            <a key={l} href="#" style={{ display: "block", fontSize: 13.5, color: "rgba(255,255,255,0.78)", margin: "0 0 8px", textDecoration: "none" }}>{l}</a>
          ))}
        </div>

        <div>
          <h6 style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", color: "var(--gold-soft)", textTransform: "uppercase", margin: "0 0 16px" }}>Informații</h6>
          <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.78)", margin: "0 0 8px", lineHeight: 1.5 }}>Piața Revoluției nr. 12<br/>Botoșani, România</p>
          <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.78)", margin: "10px 0 4px" }}>0231 514 086</p>
          <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.78)", margin: 0 }}>contact@centrulculturalbt.ro</p>
        </div>

        <div>
          <h6 style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", color: "var(--gold-soft)", textTransform: "uppercase", margin: "0 0 16px" }}>Program</h6>
          <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.78)", margin: "0 0 6px" }}>Luni – Vineri: 09:00 – 17:00</p>
          <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.78)", margin: 0 }}>Sâmbătă – Duminică: Închis</p>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 32 }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto", padding: lowerPad,
          display: "flex", justifyContent: "space-between",
          flexDirection: m ? "column" : "row", gap: m ? 10 : 0,
          fontSize: 12, color: "rgba(255,255,255,0.5)",
        }}>
          <span>© 2026 Centrul Cultural Botoșani. Toate drepturile rezervate.</span>
          <span style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Politica de confidențialitate</a>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Termeni și condiții</a>
          </span>
        </div>
      </div>
      <div style={{ height: 4, background: "var(--red)" }} />
    </footer>
  );
}
window.Footer = Footer;
