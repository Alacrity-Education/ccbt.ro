// Motif.jsx — folk-pattern primitives used across components
// Loaded via Babel; exposes window.Motif

const Motif = {
  Diamond: ({ size = 8, color = "var(--red)", style }) => (
    <span style={{ display: "inline-block", width: size, height: size, background: color, transform: "rotate(45deg)", ...style }} />
  ),
  Cross: ({ size = 40, color = "#B03A2E", style }) => (
    <svg viewBox="0 0 64 64" width={size} height={size} style={style} aria-hidden="true">
      <g fill={color}>
        <path d="M32 6 L40 22 L56 22 L44 34 L52 52 L32 40 L12 52 L20 34 L8 22 L24 22 Z"/>
        <path d="M32 24 L38 32 L32 40 L26 32 Z" fill="#F5EDE0"/>
      </g>
    </svg>
  ),
  Eyebrow: ({ children, tone = "red" }) => {
    const colors = { red: "var(--red)", gold: "var(--gold-deep)", ink: "var(--ink)" };
    return (
      <span className="eyebrow" style={{ color: colors[tone] }}>
        <span style={{ width: 8, height: 8, background: colors[tone], transform: "rotate(45deg)", display: "inline-block" }} />
        {children}
      </span>
    );
  },
  // Decorative line: thin tapered line — diamond — thin tapered line
  Divider: ({ width = 240, tone = "gold" }) => {
    const color = tone === "gold" ? "#C8A456" : tone === "red" ? "#B03A2E" : "#1B2A4A";
    return (
      <svg viewBox="0 0 240 16" width={width} height={16} aria-hidden="true" style={{ display: "block" }}>
        <line x1="20" y1="8" x2="108" y2="8" stroke={color} strokeWidth="1" opacity="0.6"/>
        <path d="M14 8 L20 2 L26 8 L20 14 Z" fill="none" stroke={color} strokeWidth="1"/>
        <path d="M120 2 L130 8 L120 14 L110 8 Z" fill={color}/>
        <line x1="135" y1="8" x2="220" y2="8" stroke={color} strokeWidth="1" opacity="0.6"/>
        <path d="M226 2 L232 8 L226 14 L220 8 Z" fill="none" stroke={color} strokeWidth="1"/>
      </svg>
    );
  },
  // Repeating horizontal folk band — for timeline / footer
  BandH: ({ height = 14, color = "#C8A456", opacity = 0.55, style }) => {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 24' preserveAspectRatio='xMidYMid meet'><g fill='${color}'><path d='M20 4 L28 12 L20 20 L12 12 Z'/><rect x='0' y='10' width='4' height='4' transform='rotate(45 2 12)'/><rect x='36' y='10' width='4' height='4' transform='rotate(45 38 12)'/></g></svg>`;
    return (
      <div style={{
        height,
        backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`,
        backgroundSize: "auto 100%",
        backgroundRepeat: "repeat-x",
        opacity,
        ...style,
      }} />
    );
  },
  // Vertical folk band for the About section
  BandV: ({ width = 36, color = "#B03A2E", opacity = 0.85, style }) => {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 40' preserveAspectRatio='xMidYMid meet'><g fill='${color}'><path d='M16 6 L24 14 L16 22 L8 14 Z'/><rect x='14' y='0' width='4' height='4' transform='rotate(45 16 2)'/><rect x='14' y='24' width='4' height='4' transform='rotate(45 16 26)'/><rect x='0' y='12' width='4' height='4' transform='rotate(45 2 14)'/><rect x='28' y='12' width='4' height='4' transform='rotate(45 30 14)'/></g></svg>`;
    return (
      <div style={{
        width,
        backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`,
        backgroundSize: `${width}px auto`,
        backgroundRepeat: "repeat-y",
        opacity,
        ...style,
      }} />
    );
  },
  // Logo lockup
  Logo: ({ scale = 1, dark = false }) => (
    <img src="assets/logo.svg" alt="Centrul Cultural Botoșani" style={{
      height: 56 * scale,
      width: "auto",
      display: "block",
      filter: dark ? "invert(1) brightness(1.15)" : "none",
    }}/>
  ),
};

window.Motif = Motif;
