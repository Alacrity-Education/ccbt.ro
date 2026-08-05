import React from "react";

import type { CallToActionBlock as CTABlockProps } from "@/payload-types";

import RichText from "@/components/RichText";
import { CMSLink } from "@/components/Link";
import { cn } from "@/utilities/ui";
import { PillarCard } from "@/components/Card/PillarCard";
import { HighlightMotif } from "./Motif";

type HighlightCard = NonNullable<CTABlockProps["cards"]>[number];

// The highlight cards are the shared PillarCard, kept vertical (square) here.
const HighlightCardItem: React.FC<HighlightCard> = ({
  title,
  body,
  color,
  withLink,
  link,
  backgroundImage,
  backgroundOpacity,
}) => (
  <PillarCard
    title={title}
    color={color}
    orientation="vertical"
    withLink={withLink}
    link={link}
    backgroundImage={backgroundImage}
    backgroundOpacity={backgroundOpacity}
  >
    {body}
  </PillarCard>
);

export const HighlightCTA: React.FC<CTABlockProps> = ({
  title,
  subtitle,
  richText,
  links,
  enableCards,
  cards,
  enableMotif,
}) => {
  // Alignment follows the motif: it claims the right side of the section, which only
  // works with left-aligned content. Without it the layout is centered.
  const showMotif = Boolean(enableMotif);
  const centered = !showMotif;

  return (
    <section className="relative overflow-hidden bg-base-200 -mb-16">
      {/* Woven-ribbon motif. It keeps its natural length — the negative top offset and
          min-height let the artwork run at full scale, so the tails are always long
          enough — while overflow-hidden on the section clips it to the CTA's own bounds.
          Whatever runs past the top or bottom edge is simply cut, never drawn over the
          hero above or the section below. */}
      {showMotif && (
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 bottom-0 z-0 hidden w-[200px] flex-col lg:top-[-130px] lg:flex lg:min-h-[956px] xl:top-[-160px] xl:w-[250px] xl:min-h-[1195px]"
        >
          {/* Head: plus + weave + start of the tails (cropped just below the weave). */}
          <HighlightMotif viewBoxHeight={915} className="h-auto w-full shrink-0" />
          {/* Tails continue as percentage-aligned bars, filling down to the section
              bottom. Offsets and colors mirror the artwork's bottom bars (x 2-51,
              78-128, 153-202 of the 204-wide viewBox). min-height keeps them at least
              the motif's natural length when the CTA is shorter than the motif. */}
          <div className="relative w-full grow">
            <span className="absolute inset-y-0" style={{ left: "0.98%", width: "24.02%", background: "#5ED9FC" }} />
            <span className="absolute inset-y-0" style={{ left: "38.24%", width: "24.51%", background: "#5F0058" }} />
            <span className="absolute inset-y-0" style={{ left: "75%", width: "24.02%", background: "#E84935" }} />
          </div>
        </div>
      )}

      <div
        className={cn(
          "relative z-10 container mx-auto py-16 sm:py-20 lg:py-24",
          showMotif && "lg:pr-64",
        )}
      >
        <div
          className={cn(
            "flex flex-col",
            centered ? "items-center text-center" : "items-start text-left",
          )}
        >
          {title && (
            <h2 className="text-primary text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-secondary mt-2 text-2xl font-semibold sm:text-3xl">
              {subtitle}
            </p>
          )}
          {richText && (
            <RichText
              className={cn(
                "text-base-content/70 mt-6 max-w-2xl text-base sm:text-lg mx-0",
                centered && "mx-auto",
              )}
              data={richText}
              enableGutter={false}
            />
          )}
          {links && links.length > 0 && (
            <div className={cn("mt-8 flex flex-wrap gap-4", centered && "justify-center")}>
              {links.map(({ link }, i) =>
                link ? (
                  <CMSLink
                    key={i}
                    {...link}
                    size="lg"
                    appearance={link.appearance ?? "secondary"}
                  />
                ) : null,
              )}
            </div>
          )}
        </div>

        {/* Sibling of the copy above, so it has to repeat that block's alignment
            rather than inherit it — the cards keep their own left-aligned text. */}
        {enableCards && cards && cards.length > 0 && (
          <div
            className={cn(
              "mt-12 grid gap-4 sm:max-w-4/5 sm:grid-cols-2 lg:grid-cols-3",
              centered && "sm:mx-auto",
            )}
          >
            {cards.map((card, i) => (
              <HighlightCardItem key={card.id ?? i} {...card} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
