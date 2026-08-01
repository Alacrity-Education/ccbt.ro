import React from "react";

import { HighlightMotif } from "@/blocks/CallToAction/Highlight/Motif";

/**
 * Purple transition strip + woven-ribbon motif shown between a post's hero and its
 * body — mirrors the hero→CTA transition used on the home page. The ribbon is
 * anchored to the strip's bottom edge and bleeds upward over the hero's right
 * side. Hidden below lg, where there is no room beside the centred article.
 * Purely decorative, so aria-hidden.
 */
export const PostMotif: React.FC = () => (
  <div className="relative">
    {/* Full-width purple line between the hero image and the article. */}
    <div className="h-10 w-full bg-primary" />

    {/* Woven ribbon, bottom-aligned to the strip and bleeding up into the hero.
        The artwork is ~3.2× taller than wide, so width drives how far it reaches
        up — kept slim here so it doesn't overrun the hero. */}
    <div
      aria-hidden
      className="pointer-events-none absolute right-8 bottom-0 z-20 hidden w-[120px] lg:block xl:right-16 xl:w-[150px]"
    >
      <HighlightMotif viewBoxHeight={885} className="h-auto w-full" />
    </div>
  </div>
);
