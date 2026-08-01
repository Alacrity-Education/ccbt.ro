import React from "react";

import { cn } from "@/utilities/ui";

export type DecoratorColor = "coral" | "purple" | "cyan" | "green";

const FILL_CLASSES: Record<DecoratorColor, string> = {
  coral: "fill-secondary",
  purple: "fill-primary",
  cyan: "fill-accent",
  green: "fill-success",
};

const VIEW = { w: 110, h: 140 };
const BAR = { vertical: 26.43, horizontal: 25.84 };

const OVERHANG = `translate(${((BAR.vertical / 2 / VIEW.w) * 100).toFixed(2)}%, -${(
  (BAR.horizontal / 2 / VIEW.h) *
  100
).toFixed(2)}%)`;

export const CornerDecorator: React.FC<{
  verticalColor?: DecoratorColor | null;
  horizontalColor?: DecoratorColor | null;
  className?: string;
}> = ({ verticalColor, horizontalColor, className }) => (
  <svg
    className={cn("h-auto w-[clamp(40px,15%,150px)]", className)}
    style={{ transform: OVERHANG }}
    viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    preserveAspectRatio="xMaxYMin meet"
  >
    <path
      className={FILL_CLASSES[verticalColor ?? "coral"] ?? FILL_CLASSES.coral}
      d="M108.738 139.671L108.809 104.634L108.947 35.5507L109.018 0.513711L82.8695 0.304599L82.7991 35.3416L82.6604 104.425L82.59 139.462L108.738 139.671Z"
    />
    <path
      className={FILL_CLASSES[horizontalColor ?? "purple"] ?? FILL_CLASSES.purple}
      d="M109.02 0.513672L81.6389 0.38436L27.6517 0.129392L0.271092 8.07481e-05L-0.000189739 25.3272L27.3804 25.4566L81.3677 25.7115L108.748 25.8408L109.02 0.513672Z"
    />
  </svg>
);