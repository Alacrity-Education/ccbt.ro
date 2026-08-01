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

export const HighlightCTA: React.FC<
  CTABlockProps & { align?: "left" | "center" }
> = ({ title, subtitle, richText, links, enableCards, cards, enableMotif, align = "left" }) => {
  const centered = align === "center";
  // The motif only applies to the left-aligned variant.
  const showMotif = enableMotif && !centered;

  return (
    <section className="relative bg-base-200">
      {/* Woven-ribbon motif. Anchored to the CTA's top edge and bled upward with a
          negative offset so it overlaps the purple transition strip and the bottom
          of the hero above. The strip sits directly above the CTA at a fixed height,
          so this overlap stays consistent regardless of the hero's viewport height.
          Horizontal overflow is clipped by the body (overflow-x-clip); vertical
          overflow is left visible so the motif can reach up into the hero. */}
      {showMotif && (
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 bottom-0 z-0 hidden w-[200px] flex-col lg:top-[-130px] lg:flex lg:min-h-[833px] xl:top-[-160px] xl:w-[250px] xl:min-h-[1041px]"
        >
          {/* Head: plus + weave + start of the tails (cropped just below the weave). */}
          <HighlightMotif viewBoxHeight={885} className="h-auto w-full shrink-0" />
          {/* Tails continue as percentage-aligned bars, filling down to the section
              bottom. min-height keeps them at least the motif's natural length when
              the CTA is shorter than the motif. */}
          <div className="relative w-full grow">
            <span className="absolute inset-y-0" style={{ left: "35.27%", width: "13.45%", background: "#57C6FF" }} />
            <span className="absolute inset-y-0" style={{ left: "54.91%", width: "13.45%", background: "#009E5C" }} />
            <span className="absolute inset-y-0" style={{ left: "74.91%", width: "13.45%", background: "#5F0058" }} />
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
            <h2 className="text-primary text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
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

        {enableCards && cards && cards.length > 0 && (
          <div className="mt-12 sm:max-w-4/5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, i) => (
              <HighlightCardItem key={card.id ?? i} {...card} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
