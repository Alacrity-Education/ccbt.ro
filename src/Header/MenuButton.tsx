"use client";
import React from "react";

import { cn } from "@/utilities/ui";

/**
 * The brick menu trigger.
 *
 * Three purple bars stacked in a 105x94 box. The artwork originally interlocked
 * a coral set with this one, each offset from the other and sliding together on
 * hover; the coral half and that motion are both gone, leaving a plain stack.
 *
 * The box keeps its original dimensions so the header layout and the touch
 * target are unchanged — the bars are centred inside it instead, since on their
 * own they sat flush left and low, where the coral set used to balance them.
 *
 * Every measurement is a share of the artwork's own viewBox, so the button is
 * sized by height alone and the bars stay in register at any size.
 */
const W = 105;
const H = 94;
const BAR_W = 87.2308;
const BAR_H = 17.7692;

const pctW = (n: number) => `${(n / W) * 100}%`;
const pctH = (n: number) => `${(n / H) * 100}%`;

// Bar tops in the original artwork. The gap between them is what gives the stack
// its rhythm, so the spacing is kept and only the whole set is re-centred.
const BAR_TOPS = [17.7695, 46.8462, 75.9233];

const STACK_H = BAR_TOPS[2] + BAR_H - BAR_TOPS[0];
const INSET_X = (W - BAR_W) / 2;
const INSET_Y = (H - STACK_H) / 2;

type Props = {
  onClick: () => void;
  expanded: boolean;
  controls: string;
  className?: string;
};

export const MenuButton: React.FC<Props> = ({
  onClick,
  expanded,
  controls,
  className,
}) => (
  <button
    type="button"
    aria-label="Deschide meniul"
    aria-expanded={expanded}
    aria-controls={controls}
    onClick={onClick}
    className={cn(
      "focus-visible:outline-primary relative h-9 shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4",
      className,
    )}
    style={{ aspectRatio: `${W} / ${H}` }}
  >
    {BAR_TOPS.map((top) => (
      <span
        key={top}
        aria-hidden
        className="bg-primary absolute"
        style={{
          left: pctW(INSET_X),
          top: pctH(INSET_Y + (top - BAR_TOPS[0])),
          width: pctW(BAR_W),
          height: pctH(BAR_H),
        }}
      />
    ))}
  </button>
);
