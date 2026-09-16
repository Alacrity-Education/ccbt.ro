import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

import type { Media as MediaType } from "@/payload-types";
import { Media } from "@/components/Media";
import { CMSLink } from "@/components/Link";
import { cn } from "@/utilities/ui";
import { brandSurface, type SurfaceColor } from "@/utilities/brand";

export type PillarCardColor = SurfaceColor;

// One shape for every card. Aspect sets it; max-h caps how tall a card gets in a
// wide grid cell. The horizontal variant is gone — two shapes for the same object
// only ever made a grid of them look unresolved.
const CARD_SHAPE = "aspect-3/2 max-h-72";

type PillarCardProps = {
  title?: string | null;
  color?: PillarCardColor | null;
  /** Payload link object; the card becomes clickable and shows the arrow. */
  link?: any;
  withLink?: boolean | null;
  backgroundImage?: (number | MediaType) | null;
  backgroundOpacity?: number | null;
  /** Body content (rich text, paragraph, etc.). */
  children?: React.ReactNode;
  className?: string;
};

/**
 * Shared "pillar" card — a solid theme-colored panel with a corner title, an
 * optional background image at a set opacity, and a top-right arrow when linked.
 * Used by the CardBlock and the base CTA (and future card blocks).
 */
export const PillarCard: React.FC<PillarCardProps> = ({
  title,
  color,
  link,
  withLink,
  backgroundImage,
  backgroundOpacity,
  children,
  className,
}) => {
  const colorClass = brandSurface(color, "coral");
  const hasHref = withLink && (link?.url || link?.reference);

  const inner = (
    <div
      className={cn(
        "rounded-box relative flex h-full w-full min-h-40 flex-col overflow-hidden p-6",
        colorClass,
        className,
      )}
    >
      {backgroundImage && (
        <div
          aria-hidden
          className="absolute inset-0 z-0"
          style={{ opacity: (backgroundOpacity ?? 100) / 100 }}
        >
          <Media
            fill
            resource={backgroundImage}
            pictureClassName="absolute inset-0 h-full w-full"
            imgClassName="object-cover"
          />
        </div>
      )}
      <div className="relative z-10 flex items-start justify-between gap-3">
        {title && <h3 className="text-lg font-semibold sm:text-2xl">{title}</h3>}
        {hasHref && (
          <FiArrowUpRight
            aria-hidden
            className="mt-1 h-5 w-5 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        )}
      </div>
      {/* Body inherits the card's text color (white on coral/purple/green, dark on
          cyan), overriding RichText's own prose colors. */}
      {children && (
        <div className="relative z-10 mt-2 text-sm/relaxed opacity-90 **:text-inherit!">
          {children}
        </div>
      )}
    </div>
  );

  if (hasHref) {
    return (
      <CMSLink
        {...link}
        label={undefined}
        appearance="inline"
        className={cn(
          "group block h-full transition-transform duration-200 hover:-translate-y-1",
          CARD_SHAPE,
        )}
      >
        {inner}
      </CMSLink>
    );
  }

  return <div className={cn("h-full", CARD_SHAPE)}>{inner}</div>;
};
