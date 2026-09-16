import React from "react";

import type { CallToActionBlock as CTABlockProps } from "@/payload-types";

import RichText from "@/components/RichText";
import { CMSLink } from "@/components/Link";
import { cn } from "@/utilities/ui";
import { BaseMotifMobile } from "./Motif";

export const BaseCTA: React.FC<CTABlockProps & { fullWidth?: boolean | null }> = ({
  richText,
  links,
  fullWidth,
}) => (
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
      {/* Left-aligned and held to a readable measure by default, so the copy
          lines up with every other block on the page.

          Running full width drops both: the block already has the container's
          whole measure, so the copy takes it too and an alignment chosen in the
          editor then centres against the screen rather than inside a column
          sitting off to the left.

          Only the copy is narrowed to clear the phone motif — the cards below
          keep the full width, since the motif has run out by the time they
          start. From `lg` the motif is the page-wide one and `.container`
          reserves its lane for every block, so this resets. */}
      <div
        className={cn(
          "flex flex-col pr-[104px] min-[420px]:pr-[130px] md:pr-[72px] lg:pr-0",
          fullWidth ? "items-stretch" : "items-start text-left",
        )}
      >
        {richText && (
          <RichText
            className={cn(
              // w-full so an alignment chosen in the editor has the whole
              // column to act in — without it the flex parent's `items-start`
              // shrinks this to its text and centring is invisible.
              "w-full",
              fullWidth ? "mx-auto max-w-none" : "mx-0 max-w-2xl",
            )}
            data={richText}
            enableGutter={false}
          />
        )}
        {links && links.length > 0 && (
          <div
            className={cn(
              "mt-8 flex flex-wrap gap-4",
              fullWidth && "justify-center",
            )}
          >
            {links.map(({ link }, i) =>
              link ? <CMSLink key={i} {...link} appearance="brand" /> : null,
            )}
          </div>
        )}
      </div>

    </div>
  </section>
);
