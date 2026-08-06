import React from "react";
import type { CardBlock as CardBlockProps } from "@/payload-types";

import RichText from "@/components/RichText";
import { LongCard } from "@/components/Card/LongCard";

/**
 * The Archive block's card design, driven by cards the editor writes here rather
 * than by posts. Same component, so the two render identically — including the
 * grid, which waits for `lg` before splitting: these cards are horizontal and
 * need real width before the text well gets usable.
 */
export const LongCardBlock: React.FC<CardBlockProps> = ({ cards }) => {
  const visibleCards = cards || [];
  if (visibleCards.length === 0) return null;

  return (
    <section className="container mx-auto w-full py-12">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {visibleCards.map((card, i) => {
          const hasHref =
            card.withLink && (card.link?.url || card.link?.reference);

          return (
            <LongCard
              key={card.id ?? i}
              title={card.title}
              subtitle={card.subtitle}
              date={
                card.date
                  ? new Date(card.date).toLocaleDateString("en-GB")
                  : null
              }
              image={card.image}
              style={card.longStyle}
              link={hasHref ? card.link : undefined}
            >
              {card.description && (
                <RichText data={card.description} enableGutter={false} />
              )}
            </LongCard>
          );
        })}
      </div>
    </section>
  );
};
