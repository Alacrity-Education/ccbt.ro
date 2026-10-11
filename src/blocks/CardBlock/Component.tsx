import React from "react";
import type { CardBlock as CardBlockProps } from "@/payload-types";

import RichText from "@/components/RichText";
import { PillarCard, cardShape } from "@/components/Card/PillarCard";
import { FlipCard } from "@/components/Card/FlipCard";

export const CardBlock: React.FC<CardBlockProps> = ({
  title,
  cards,
  variant,
}) => {
  const visibleCards = cards || [];
  if (visibleCards.length === 0) return null;

  return (
    <section className="container mx-auto w-full py-6">
      {/* Title and grid share one box so the heading keeps the cards' left edge
          at every width — held apart, the centred single column left the title
          hanging outside it. */}
      <div className="mx-auto max-w-sm md:max-w-none">
        {title && (
          <h2 className="text-primary mb-8 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {title}
          </h2>
        )}
        {/* Three across from `lg`, two from `md`, one below that — a card carries
            a title and a paragraph, and two of them on a phone leaves neither
            enough width to read.

            The single column is capped rather than run edge to edge: stretched
            full width the card loses its 3:2 shape against its own max-height
            and reads as a banner instead of a card. */}
        <div
          className={
            variant === "vertical"
              ? // Portrait cards are narrow, so more fit across before any of
                // them gets too tall to read as a card.
                "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
              : "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          }
        >
          {visibleCards.map((card, i) => {
            const body = card.description ? (
              <RichText data={card.description} enableGutter={false} />
            ) : null;

            // A linked card wins over a flipping one: the toggle hides itself
            // behind a link in the admin, but a card saved before that could
            // hold both, and one tap cannot mean two things.
            if (card.flippable && !card.withLink) {
              return (
                <FlipCard
                  key={card.id ?? i}
                  title={card.title}
                  color={card.color}
                  backgroundImage={card.backgroundImage}
                  backgroundOpacity={card.backgroundOpacity}
                  className={cardShape(variant)}
                >
                  {body}
                </FlipCard>
              );
            }

            return (
              <PillarCard
                key={card.id ?? i}
                title={card.title}
                color={card.color}
                withLink={card.withLink}
                link={card.link}
                backgroundImage={card.backgroundImage}
                backgroundOpacity={card.backgroundOpacity}
                shape={variant}
              >
                {body}
              </PillarCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
