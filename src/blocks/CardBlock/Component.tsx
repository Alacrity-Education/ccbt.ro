import React from "react";
import type { CardBlock as CardBlockProps } from "@/payload-types";

import RichText from "@/components/RichText";
import { SectionTitle } from "@/components/SectionTitle";
import { PillarCard } from "@/components/Card/PillarCard";

export const CardBlock: React.FC<CardBlockProps & { title?: string }> = ({ title, cards }) => {
  const visibleCards = cards || [];
  if (visibleCards.length === 0) return null;

  return (
    <section className="container mx-auto w-full py-12">
      {title && <SectionTitle title={title} className="mb-12 text-center" />}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCards.map((card, i) => (
          <PillarCard
            key={card.id ?? i}
            title={card.title}
            color={card.color}
            orientation={card.orientation}
            withLink={card.withLink}
            link={card.link}
            backgroundImage={card.backgroundImage}
            backgroundOpacity={card.backgroundOpacity}
          >
            {card.description && <RichText data={card.description} enableGutter={false} />}
          </PillarCard>
        ))}
      </div>
    </section>
  );
};
