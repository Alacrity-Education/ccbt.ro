import React from "react";

import type { CallToActionBlock as CTABlockProps, Form } from "@/payload-types";

import RichText from "@/components/RichText";
import { CMSLink } from "@/components/Link";
import { BaseMotif, BaseMotifMobile } from "./Motif";
import { CTAModal } from "../Primitive.client";

export const BaseCTA: React.FC<CTABlockProps & { id?: string | null }> = ({
  id,
  richText,
  links,
  ctaType,
  form,
  modalButtonText,
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

    {/* The braid, from `lg` up. The block is banded, and a banded block paints
        an opaque fill over the page-wide ribbon, so RenderBlocks draws none
        behind it (see components/PageMotif) — the lane was simply empty.

        Centred rather than anchored to the top, which is the whole of why it
        reads as continuous. The artwork opens and closes with three straight
        bars and carries the braid between them; anchored at the top, a short
        band showed the thin opening rows and left a detached fragment above
        the weave. Centred, any band shorter than the artwork is a window on
        the middle of the braid, so `overflow-hidden` always cuts it through
        the thick of the weave and it reads as passing behind the section.

        No height is assumed: this holds at every band height the block can
        take, measured at 320, 400 and 604. */}
    <div
      aria-hidden
      className="pointer-events-none absolute top-1/2 right-0 z-0 hidden w-[200px] -translate-y-1/2 lg:block xl:w-[250px]"
    >
      <BaseMotif className="h-auto w-full" />
    </div>

    <div className="relative z-10 container mx-auto py-16 sm:py-20 lg:py-24">
      {/* This block always runs full width — RenderBlocks bands it on sight of
          the variant, so there is no narrow case left to branch on. The copy
          takes the container's whole measure, which is what lets an alignment
          chosen in the editor centre against the screen rather than inside a
          column sitting off to the left.

          The right padding clears whichever motif is drawn: the phone chain
          below `lg`, the braid above it. Unlike the page-wide ribbon, which
          content is free to paint over, this one shares the block's own fill
          and a line crossing it is simply unreadable — at 1280 the last words
          of the paragraph sat on the coral. */}
      <div className="flex flex-col items-stretch pr-[104px] min-[420px]:pr-[130px] md:pr-[72px] lg:pr-[216px] xl:pr-[266px]">
        {richText && (
          <RichText
            className="mx-auto w-full max-w-none"
            data={richText}
            enableGutter={false}
          />
        )}
        {/* Left, not centred: the button belongs under the copy it follows, and
            the copy is set from the left. Centring it in a full-measure
            container put it in the middle of the screen instead, a long way
            from the text it acts on. */}
        {ctaType === "modal" && form && typeof form === "object" ? (
          <div className="mt-8 flex flex-wrap gap-4">
            <CTAModal
              id={`cta-modal-${id ?? "base"}`}
              buttonText={modalButtonText || "Open"}
              form={form as Form}
              buttonClassName="btn-brand"
            />
          </div>
        ) : (
          links &&
          links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-4">
              {links.map(({ link }, i) =>
                link ? <CMSLink key={i} {...link} appearance="brand" /> : null,
              )}
            </div>
          )
        )}
      </div>
    </div>
  </section>
);
