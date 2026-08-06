"use client";
import React from "react";

import { cn } from "@/utilities/ui";

/**
 * The brick menu trigger.
 *
 * Six bars in a 105x94 box: three coral offset right by exactly one bar-height,
 * three purple flush left, overlapping down the stack so the two sets interlock.
 * Built from positioned divs rather than the exported `<svg>` so each row can
 * carry its own transition — an SVG would have to animate as one piece.
 *
 * Every measurement is a share of the artwork's own viewBox, so the button is
 * sized by height alone and the bricks stay in register at any size.
 */
const W = 105;
const H = 94;
const BAR_W = 87.2308;
const BAR_H = 17.7692;
const OFFSET = 17.7656; // how far the coral set sits right of the purple

const pctW = (n: number) => `${(n / W) * 100}%`;
const pctH = (n: number) => `${(n / H) * 100}%`;

/**
 * On hover the two sets close on each other and meet halfway, so the interlocked
 * bricks slide into a single aligned stack.
 *
 * Expressed as a share of a bar's own width — that is what `translateX(%)`
 * resolves against — and handed to the CSS as a variable so both directions stay
 * derived from OFFSET instead of being written out twice.
 */
const SLIDE = (OFFSET / 2 / BAR_W) * 100;

const CORAL_TOPS = [0, 29.0771, 58.1538];
const PURPLE_TOPS = [17.7695, 46.8462, 75.9233];

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
      "menu-brick focus-visible:outline-primary relative h-9 shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4",
      className,
    )}
    style={{ aspectRatio: `${W} / ${H}` }}
  >
    {CORAL_TOPS.map((top) => (
      <span
        key={`c${top}`}
        aria-hidden
        className="bg-secondary absolute"
        style={{
          left: pctW(OFFSET),
          top: pctH(top),
          width: pctW(BAR_W),
          height: pctH(BAR_H),
          ["--brick-slide" as string]: `${-SLIDE}%`,
        }}
      />
    ))}
    {PURPLE_TOPS.map((top) => (
      <span
        key={`p${top}`}
        aria-hidden
        className="bg-primary absolute"
        style={{
          left: 0,
          top: pctH(top),
          width: pctW(BAR_W),
          height: pctH(BAR_H),
          ["--brick-slide" as string]: `${SLIDE}%`,
        }}
      />
    ))}
  </button>
);
