import React from "react";

import { TeamMotif } from "@/blocks/Team/Motif";

/** Full-width purple line closing the hero, as on the home page. */
export const PostStrip: React.FC = () => (
  <div aria-hidden className="bg-primary h-10 w-full" />
);

/**
 * The woven ribbon beside a post's body — the same tiled treatment the team
 * section uses, so the two read as one motif rather than two.
 *
 * The previous version drew the base CTA's artwork once and then continued
 * its tails as flat bars, which meant a single crossing near the top and a long
 * dead run under it however long the post was. The tiled artwork repeats the
 * crossing the whole way down instead, and handles any article height on its own.
 *
 * Absolute, so it never affects where the centred article sits, and hidden below
 * `sm` where there is no margin to put it in.
 *
 * Pushed off the right edge rather than sitting inside it. Between `sm` and `lg`
 * the article fills the container completely — its only free space is the
 * container's own 24px of padding — so a motif drawn in full would land on the
 * text. It hangs outside instead and only the sliver that fits shows, widening as
 * the viewport gives the centred column room to pull away from the edge.
 *
 * Expects a positioned ancestor that clips horizontally, or the negative offset
 * becomes page-wide overflow.
 */
export const PostMotif: React.FC<{ uid?: string }> = ({ uid = "post" }) => (
  <div
    aria-hidden
    className="pointer-events-none absolute top-0 -right-[72px] bottom-0 z-0 hidden w-[92px] overflow-hidden sm:block lg:-right-8 lg:w-[120px] xl:right-0 xl:w-[150px]"
  >
    <TeamMotif uid={uid} className="h-auto w-full" />
  </div>
);
