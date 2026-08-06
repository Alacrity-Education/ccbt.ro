import React from "react";

import { cn } from "@/utilities/ui";
import { brandFill, brandHex, type BrandColor } from "@/utilities/brand";

/**
 * The L-shaped corner mark, drawn to the sizes in the design export:
 * a 108.75 x 25.33 bar across the top and a 26.15 x 139.16 bar down the right,
 * so the two meet in the top-right corner. Colours default to the export's
 * purple over green.
 */
const BAR = { w: 108.75, h: 139.16, horizontal: 25.33, vertical: 26.15 };

// Half a bar, as a share of the box — the mark straddles the corner it sits on
// rather than tucking inside it.
const OVERHANG = `translate(${((BAR.vertical / 2 / BAR.w) * 100).toFixed(2)}%, -${(
  (BAR.horizontal / 2 / BAR.h) *
  100
).toFixed(2)}%)`;

export const CornerMotif: React.FC<{
  horizontalColor?: BrandColor | null;
  verticalColor?: BrandColor | null;
  className?: string;
}> = ({ horizontalColor, verticalColor, className }) => (
  <svg
    className={cn("h-auto w-[clamp(56px,28%,120px)]", className)}
    style={{ transform: OVERHANG }}
    viewBox={`0 0 ${BAR.w} ${BAR.h}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    preserveAspectRatio="xMaxYMin meet"
  >
    <rect
      className={brandFill(horizontalColor, "purple")}
      x="0"
      y="0"
      width={BAR.w}
      height={BAR.horizontal}
    />
    <rect
      className={brandFill(verticalColor, "green")}
      x={BAR.w - BAR.vertical}
      y="0"
      width={BAR.vertical}
      height={BAR.h}
    />
  </svg>
);

/**
 * The 40px stroke at -45° from the same group, drawn as an arrow pointing up and
 * to the right. 4px wide, green by default, like the export.
 */
export const MotifArrow: React.FC<{
  color?: BrandColor | null;
  className?: string;
}> = ({ color, className }) => (
  <svg
    className={cn("h-10 w-10", className)}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M4 36L36 4M36 4H14M36 4V26"
      stroke={brandHex(color, "green")}
      strokeWidth="4"
    />
  </svg>
);
