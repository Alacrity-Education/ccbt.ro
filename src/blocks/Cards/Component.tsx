import React from "react";

import type { CardsBlock as CardsBlockProps } from "@/payload-types";

import { PillarCard } from "@/components/Card/PillarCard";

/**
 * The cards as they appear inside a Content column's copy.
 *
 * `not-prose` because this sits in a rich text flow: the typography styles that
 * govern the paragraphs around it would otherwise reach into the card titles and
 * bodies, which carry their own scale.
 *
 * Three across from `lg`, two from `md`, one below — the same rhythm the
 * standalone Card Block uses, so a row of cards reads the same wherever it is
 * written.
 */
export const CardsBlockComponent: React.FC<CardsBlockProps> = ({ cards }) => {
  if (!cards || cards.length === 0) return null;

  return (
    <div className="not-prose my-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, i) => (
        <PillarCard
          key={card.id ?? i}
          title={card.title}
          color={card.color}
          withLink={card.withLink}
          link={card.link}
          backgroundImage={card.backgroundImage}
          backgroundOpacity={card.backgroundOpacity}
        >
          {card.body}
        </PillarCard>
      ))}
    </div>
  );
};
