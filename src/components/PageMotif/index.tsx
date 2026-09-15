import React from "react";

import { TeamMotif } from "@/blocks/Team/Motif";

/**
 * The woven ribbon, run once down the right edge of the whole page instead of
 * once per section.
 *
 * Sectioned motifs get cut at every section boundary — each section clips its
 * own overflow, so the weave restarts and the ribbons never line up across the
 * join. Drawn here it is a single element spanning the whole content column, so
 * it crosses section boundaries without a seam.
 *
 * It sits behind the blocks, which makes an opaque section background the tool
 * for cutting it: a block that should break the ribbon paints `bg-base-100` over
 * it, and a block that should let it run leaves its own
 * background off. The lane itself is reserved by `.container`, which holds every
 * block's content clear of it at the same breakpoints (see globals.css).
 *
 * Below `lg` the lane costs more width than the ribbons are worth, and the
 * blocks that want a motif there draw their own.
 */
export const PageMotif: React.FC = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-y-[-1rem] -top-10 right-0 -z-10 hidden w-[200px] overflow-hidden lg:block xl:w-[250px]"
  >
    <TeamMotif uid="page" className="h-auto w-full" />
  </div>
);
