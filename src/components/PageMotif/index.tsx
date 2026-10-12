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
      // Reaches past its run by one BLOCK_MARGIN (see blocks/RenderBlocks), so
      // the ribbon is cut by the edge of whatever comes next instead of
      // stopping in open space. Cut against a block it reads as passing behind
      // it; cut in the white between two, it reads as snapped off.
      //
      // One measure is enough everywhere, including the last run: a block
      // margin is all that separates the last block from the footer too, now
      // that the lane carries no bottom padding of its own (see the page
      // template).
      "-bottom-24",
      // The first run starts above its own top rather than at it.
      //
      // The lane is already flush with what precedes it, but the artwork inside
      // is not: the pattern opens mid-weave, so its first rows are thinner than
      // the full ribbon and read as the motif stopping short of the header.
      // Starting higher puts those rows behind whatever sits above — the fixed
      // header on a page with no hero, the hero's purple strip otherwise — so
      // what shows below is already the full weave.
      //
      // Exactly the strip's own height, so it can never reach past it into the
      // hero itself. The strip is raised above this (see heros/RenderHero), or
      // the ribbon would cross it instead of passing behind.
      meetsAbove ? "-top-24" : "-top-10",
    )}
  >
    <TeamMotif uid="page" className="h-auto w-full" />
  </div>
);
