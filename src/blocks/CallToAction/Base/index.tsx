import React from "react";

import type { CallToActionBlock as CTABlockProps } from "@/payload-types";

import RichText from "@/components/RichText";
import { CMSLink } from "@/components/Link";
import { BaseMotifMobile } from "./Motif";

export const BaseCTA: React.FC<CTABlockProps> = ({ richText, links }) => (
  // No background of its own: the page motif runs behind the blocks, and an
  // opaque fill would cut it (see components/PageMotif).
  <section className="relative overflow-hidden">
    {/* Phone motif: the diagonal chain, anchored top-right and clipped by the
        section. Its own paths run past the right edge of the viewBox, so it is
        meant to be cut there — `xMinYMin` keeps that crop on the right and the
        chain's head at the top.

        `md` narrows to the Team section's own measure, so the two motifs match
        at every width — see blocks/Team/Component. From `lg` the page-wide motif
        takes over and this stands down. */}
    <div
      aria-hidden
      className="pointer-events-none absolute top-0 right-0 z-0 w-[120px] min-[420px]:w-[150px] md:w-[88px] lg:hidden"
    >
      <BaseMotifMobile className="h-auto w-full" />
    </div>

    <div className="relative z-10 container mx-auto py-16 sm:py-20 lg:py-24">
      {/* This block always runs full width — RenderBlocks bands it on sight of
          the variant, so there is no narrow case left to branch on. The copy
          takes the container's whole measure, which is what lets an alignment
          chosen in the editor centre against the screen rather than inside a
          column sitting off to the left.

          Only the right padding is kept, to clear the phone motif; from `lg`
          the page-wide motif takes over and it resets. */}
      <div className="flex flex-col items-stretch pr-[104px] min-[420px]:pr-[130px] md:pr-[72px] lg:pr-0">
        {richText && (
          <RichText
            className="mx-auto w-full max-w-none"
            data={richText}
            enableGutter={false}
          />
        )}
        {links && links.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {links.map(({ link }, i) =>
              link ? <CMSLink key={i} {...link} appearance="brand" /> : null,
            )}
          </div>
        )}
      </div>

    </div>
  </section>
);
