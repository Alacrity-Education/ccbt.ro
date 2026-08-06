import React from "react";
import type { CardBlock as CardBlockProps } from "@/payload-types";

import RichText from "@/components/RichText";
import { MotifCard } from "@/components/Card/MotifCard";

export const MotifCardBlock: React.FC<CardBlockProps> = ({ cards }) => {
  const visibleCards = cards || [];
  if (visibleCards.length === 0) return null;

  return (
    <section className="container mx-auto w-full py-12">
      <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCards.map((card, i) => {
          const hasHref =
            card.withLink && (card.link?.url || card.link?.reference);

          return (
            <MotifCard
              key={card.id ?? i}
              title={card.title}
              image={card.image}
              horizontalColor={card.motif?.horizontalColor}
              verticalColor={card.motif?.verticalColor}
              arrowColor={card.motif?.arrowColor}
              link={hasHref ? card.link : undefined}
            >
              {card.description && (
                <RichText data={card.description} enableGutter={false} />
              )}
            </MotifCard>
          );
        })}
      </div>
    </section>
  );
};
