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
export const PageMotif: React.FC<{
  meetsAbove?: boolean;
  endsPage?: boolean;
}> = ({ meetsAbove = false, endsPage = false }) => (
  <div
    aria-hidden
    className={cn(
      "pointer-events-none absolute right-0 -z-10 hidden w-[200px] overflow-hidden lg:block xl:w-[250px]",
      // Reaches past its run, so the ribbon is cut by the edge of whatever comes
      // next instead of stopping in open space. Cut against a block it reads as
      // passing behind it; cut in the white between two, it reads as snapped
      // off.
      //
      // A run in the body of the page is one BLOCK_MARGIN from the next block
      // (see blocks/RenderBlocks). The last run is further from the footer than
      // that: the last block's margin *and* the lane's own bottom padding lie
      // between them, which is the same measure again (see the page template).
      // Reaching only one of the two is what left the ribbon short of the
      // footer. Overshooting costs nothing — the footer is opaque and cuts it —
      // so erring long here is deliberate.
      endsPage ? "-bottom-48" : "-bottom-24",
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
