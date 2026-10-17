import React from "react";

import type { CallToActionBlock as CTABlockProps, Form } from "@/payload-types";

import RichText from "@/components/RichText";
import { CMSLink } from "@/components/Link";
import { TeamMotif } from "@/blocks/Team/Motif";
import { BaseMotifMobile } from "./Motif";
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
        at every width — see blocks/Team/Component. From `lg` the woven ribbon
        below takes over and this stands down. */}
    <div
      aria-hidden
      className="pointer-events-none absolute top-0 right-0 z-0 w-[120px] min-[420px]:w-[150px] md:w-[88px] lg:hidden"
    >
      <BaseMotifMobile className="h-auto w-full" />
    </div>

    {/* The same ribbon the rest of the page carries, drawn here rather than by
        components/PageMotif: this block is banded, and a banded block paints an
        opaque fill over the page-wide motif, so RenderBlocks stops drawing one
        behind it. Without this the lane is simply empty from `lg` up.

        Lane width and the offset above the band are PageMotif's, so the ribbon
        lines up with the runs either side of it. The offset matters: the weave
        opens mid-pattern and its first rows are thinner than the full ribbon,
        and starting high puts those behind the band's top edge — `overflow-hidden`
        on the section is what crops them. */}
    <div
      aria-hidden
      className="pointer-events-none absolute -top-24 right-0 bottom-0 z-0 hidden w-[200px] overflow-hidden lg:block xl:w-[250px]"
    >
      <TeamMotif uid={`cta-${id ?? "base"}`} className="h-auto w-full" />
    </div>

    <div className="relative z-10 container mx-auto py-16 sm:py-20 lg:py-24">
      {/* This block always runs full width — RenderBlocks bands it on sight of
          the variant, so there is no narrow case left to branch on. The copy
          takes the container's whole measure, which is what lets an alignment
          chosen in the editor centre against the screen rather than inside a
          column sitting off to the left.

          Only the right padding is kept, to clear the phone motif; from `lg`
          the woven ribbon takes over and the copy runs past it, the same way
          every other block does (see components/PageMotif). */}
      <div className="flex flex-col items-stretch pr-[104px] min-[420px]:pr-[130px] md:pr-[72px] lg:pr-0">
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
