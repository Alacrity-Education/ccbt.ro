import React from "react";

import { headingId } from "@/utilities/headingId";
import { cn } from "@/utilities/ui";

/**
 * The heading over one month's cards.
 *
 * An `h3` rather than an `h2`: the block's own title, written as an H2 in the
 * intro, is the section — these are its parts, and a document that jumps from
 * one H2 straight to the next H2 inside it reads as a flat list of sections to
 * anything following the outline.
 *
 * Set as an eyebrow, because it labels the run below it and has to stay
 * quieter than the post titles it sits over, which are the thing being read.
 * Small and uppercase is a style, not a heading level — the level is what the
 * tag says.
 *
 * It carries the same id its rich text counterparts do, derived from its own
 * words by `headingId`: "Octombrie 2026" is reachable at `#octombrie-2026`.
 * Two blocks on one page grouping the same month would write the id twice and
 * the browser would take the first, which is what the rich text headings do
 * with a repeated title too (see RichText/converters/base).
 *
 * `scroll-mt-24` is what the fixed header costs: without it the browser puts
 * the heading at the very top of the viewport, behind the header.
 */
export const MonthHeading: React.FC<{
  children: string;
  className?: string;
}> = ({ children, className }) => {
  const id = headingId(children);

  return (
    <h3
      className={cn(
        "text-primary scroll-mt-24 text-sm font-semibold tracking-[0.18em] uppercase",
        className,
      )}
      id={id || undefined}
    >
      {children}
    </h3>
  );
};
