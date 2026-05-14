// Navbar.jsx — top navigation; responsive: hamburger drawer on mobile/tablet
function Navbar({ active = "Acasă", onNav = () => {} }) {
  const vp = useViewport();
  const compact = !vp.isDesktop; // tablet + mobile share the hamburger
  const links = ["Acasă", "Despre noi", "Evenimente", "Proiecte", "Galerie", "Noutăți", "Contact"];
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const linkStyle = (isActive) => ({
    position: "relative",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: isActive ? "var(--red)" : "var(--ink)",
    textDecoration: "none",
    cursor: "pointer",
    paddingBottom: 6,
  });

  return (
    <React.Fragment>
      <nav style={{
        height: compact ? 64 : 88,
        display: "flex", alignItems: "center",
        padding: compact ? "0 20px" : "0 64px",
        background: "var(--cream)",
        position: "relative", zIndex: 30,
      }}>
        <div style={{ transform: compact ? "scale(0.78)" : "none", transformOrigin: "left center" }}>
          <Motif.Logo />
        </div>

        {compact ? (
          <React.Fragment>
            <button
              aria-label={open ? "Închide meniul" : "Deschide meniul"}
              onClick={() => setOpen((v) => !v)}
              style={{
                marginLeft: "auto", width: 40, height: 40, background: "transparent",
                border: "none", cursor: "pointer", color: "var(--ink)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
              }}>
              {open
                ? <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 6l12 12M18 6L6 18"/></svg>
                : <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 7h18M3 12h18M3 17h18"/></svg>}
            </button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div style={{ display: "flex", gap: 40, marginLeft: "auto", marginRight: 40 }}>
              {links.map((l) => {
                const isActive = l === active;
                return (
                  <a key={l} onClick={() => onNav(l)} style={linkStyle(isActive)}>
                    {l}
                    {isActive ? <span style={{ position: "absolute", left: 0, right: 0, bottom: -10, height: 2, background: "var(--red)" }} /> : null}
                  </a>
                );
              })}
            </div>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--ink)" strokeWidth="1.5" style={{ cursor: "pointer" }}>
              <circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>
            </svg>
          </React.Fragment>
        )}
      </nav>

      {/* Mobile drawer */}
      {compact && open ? (
        <div style={{
          position: "fixed", inset: "64px 0 0 0", zIndex: 25,
          background: "var(--cream)",
          padding: "32px 24px",
          overflowY: "auto",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {links.map((l) => {
              const isActive = l === active;
              return (
                <a key={l} onClick={() => { onNav(l); setOpen(false); }} style={{
                  ...linkStyle(isActive),
                  fontSize: 16, padding: "18px 4px",
                  borderBottom: "1px solid var(--rule)",
                }}>
                  {l}
                </a>
              );
            })}
          </div>
          <div style={{
            marginTop: 32, display: "flex", alignItems: "center", gap: 12,
            padding: "14px 16px", border: "1px solid var(--rule)", borderRadius: 2,
            background: "var(--paper)",
          }}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--ink-soft)" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <span style={{ color: "var(--ink-soft)", fontSize: 14 }}>Caută…</span>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}
window.Navbar = Navbar;
