import React from "react";

interface DiamondProps {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Diamond: React.FC<DiamondProps> = ({
  size = 8,
  color = "var(--red)",
  className,
  style,
}) => (
  <span
    className={className}
    style={{
      display: "inline-block",
      width: size,
      height: size,
      background: color,
      transform: "rotate(45deg)",
      flexShrink: 0,
      ...style,
    }}
  />
);

interface CrossProps {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

export const Cross: React.FC<CrossProps> = ({
  size = 40,
  color = "#B03A2E",
  style,
}) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    style={style}
    aria-hidden="true"
  >
    <g fill={color}>
      <path d="M32 6 L40 22 L56 22 L44 34 L52 52 L32 40 L12 52 L20 34 L8 22 L24 22 Z" />
      <path d="M32 24 L38 32 L32 40 L26 32 Z" fill="#F5EDE0" />
    </g>
  </svg>
);

interface EyebrowProps {
  children: React.ReactNode;
  tone?: "red" | "gold" | "ink";
  className?: string;
}

export const Eyebrow: React.FC<EyebrowProps> = ({
  children,
  tone = "red",
  className,
}) => {
  const colors = {
    red: "var(--red)",
    gold: "var(--gold-deep)",
    ink: "var(--ink)",
  };
  const color = colors[tone];

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--font-body)",
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          background: color,
          transform: "rotate(45deg)",
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      {children}
    </span>
  );
};

interface DividerProps {
  width?: number;
  tone?: "gold" | "red" | "ink";
  className?: string;
  style?: React.CSSProperties;
}

export const Divider: React.FC<DividerProps> = ({
  width = 240,
  tone = "gold",
  className,
  style,
}) => {
  const color =
    tone === "gold" ? "#C8A456" : tone === "red" ? "#B03A2E" : "#1B2A4A";
  return (
    <svg
      viewBox="0 0 240 16"
      width={width}
      height={16}
      aria-hidden="true"
      className={className}
      style={{ display: "block", ...style }}
    >
      <line x1="20" y1="8" x2="108" y2="8" stroke={color} strokeWidth="1" opacity="0.6" />
      <path d="M14 8 L20 2 L26 8 L20 14 Z" fill="none" stroke={color} strokeWidth="1" />
      <path d="M120 2 L130 8 L120 14 L110 8 Z" fill={color} />
      <line x1="135" y1="8" x2="220" y2="8" stroke={color} strokeWidth="1" opacity="0.6" />
      <path d="M226 2 L232 8 L226 14 L220 8 Z" fill="none" stroke={color} strokeWidth="1" />
    </svg>
  );
};

interface BandHProps {
  height?: number;
  color?: string;
  opacity?: number;
  style?: React.CSSProperties;
  className?: string;
}

export const BandH: React.FC<BandHProps> = ({
  height = 14,
  color = "#C8A456",
  opacity = 0.55,
  style,
  className,
}) => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 24' preserveAspectRatio='xMidYMid meet'><g fill='${color}'><path d='M20 4 L28 12 L20 20 L12 12 Z'/><rect x='0' y='10' width='4' height='4' transform='rotate(45 2 12)'/><rect x='36' y='10' width='4' height='4' transform='rotate(45 38 12)'/></g></svg>`;
  return (
    <div
      className={className}
      style={{
        height,
        backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`,
        backgroundSize: "auto 100%",
        backgroundRepeat: "repeat-x",
        opacity,
        ...style,
      }}
    />
  );
};

interface BandVProps {
  width?: number;
  color?: string;
  opacity?: number;
  style?: React.CSSProperties;
  className?: string;
}

export const BandV: React.FC<BandVProps> = ({
  width = 36,
  color = "#B03A2E",
  opacity = 0.85,
  style,
  className,
}) => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 40' preserveAspectRatio='xMidYMid meet'><g fill='${color}'><path d='M16 6 L24 14 L16 22 L8 14 Z'/><rect x='14' y='0' width='4' height='4' transform='rotate(45 16 2)'/><rect x='14' y='24' width='4' height='4' transform='rotate(45 16 26)'/><rect x='0' y='12' width='4' height='4' transform='rotate(45 2 14)'/><rect x='28' y='12' width='4' height='4' transform='rotate(45 30 14)'/></g></svg>`;
  return (
    <div
      className={className}
      style={{
        width,
        backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`,
        backgroundSize: `${width}px auto`,
        backgroundRepeat: "repeat-y",
        opacity,
        ...style,
      }}
    />
  );
};

interface LogoProps {
  scale?: number;
  dark?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ scale = 1, dark = false, className }) => (
  <img
    src="/logo.svg"
    alt="Centrul Cultural Botoșani"
    className={className}
    style={{
      height: 56 * scale,
      width: "auto",
      display: "block",
      filter: dark ? "invert(1) brightness(1.15)" : "none",
    }}
  />
);
