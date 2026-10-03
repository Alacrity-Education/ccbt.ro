import React from "react";

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
export const PageMotif: React.FC = () => (
  <div
    aria-hidden
    // Spans its run exactly. `top-0`, not a negative top: the first run begins
    // where the hero ends, and pulling the rail above it puts the ribbon over
    // the hero's purple transition strip. The small bottom overhang covers the
    // hairline the clip would otherwise leave at the run's last edge; anything
    // more reaches into the gap below the run, which is what used to show.
    className="pointer-events-none absolute top-0 -bottom-1 right-0 -z-10 hidden w-[200px] overflow-hidden lg:block xl:w-[250px]"
  >
    <TeamMotif uid="page" className="h-auto w-full" />
  </div>
);
