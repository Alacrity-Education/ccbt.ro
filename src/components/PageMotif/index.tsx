import React from "react";

import { cn } from "@/utilities/ui";

import { TeamMotif } from "@/blocks/Team/Motif";

/**
 * The woven ribbon down the right edge, drawn once per unbroken run of blocks
 * that show it rather than once per block or once per page.
 *
 * Per block, the weave restarts at every boundary and the ribbons never line up
 * across the join. Spanning the whole page it has the opposite fault, which is
 * what this replaced: blocks with an opaque fill paint it out, so between two of
 * them all that survives is the gap — a 96px slice of a pattern whose crossings
 * are some 1400px apart, which reads as debris rather than as a ribbon, and the
 * last such slice collides with the footer.
 *
 * A run is the unit that fixes both. Within one the ribbon is continuous, which
 * is the whole point of not drawing it per block; between two there is always an
 * opaque block, so the weave restarting is never visible. It still sits behind
 * its run's blocks, and the lane it occupies is reserved by `.container`, which
 * holds every block's content clear of it at the same breakpoints (see
 * globals.css).
 *
 * Below `lg` the lane costs more width than the ribbons are worth, and the
 * blocks that want a motif there draw their own.
 */
export const PageMotif: React.FC<{ meetsAbove?: boolean }> = ({
  meetsAbove = false,
}) => (
  <div
    aria-hidden
    className={cn(
      "pointer-events-none absolute right-0 -z-10 hidden w-[200px] overflow-hidden lg:block xl:w-[250px]",
      // Reaches past its run by the gap between blocks, so the ribbon is cut by
      // the edge of whatever comes next instead of stopping in open space. Cut
      // against a block it reads as passing behind it; cut in the white between
      // two, it reads as snapped off. The overhang is BLOCK_MARGIN exactly (see
      // blocks/RenderBlocks) — the last block's margin is what separates a run
      // from the next block, and below the last run it is the lane's own bottom
      // padding, which is the same measure and ends at the footer.
      "-bottom-24",
      // `top-0` for the first run, which begins where the hero ends: pulling
      // the rail above it would put the ribbon over the hero's purple
      // transition strip. Any later run has an opaque block above it to be cut
      // against, so it reaches up the same way it reaches down.
      meetsAbove ? "-top-24" : "top-0",
    )}
  >
    <TeamMotif uid="page" className="h-auto w-full" />
  </div>
);
