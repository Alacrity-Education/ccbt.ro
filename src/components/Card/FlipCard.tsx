"use client";

import React, { useState } from "react";
import { FiRotateCw } from "react-icons/fi";

import type { Media as MediaType } from "@/payload-types";
import { Media } from "@/components/Media";
import { cn } from "@/utilities/ui";
import { brandSurface, type SurfaceColor } from "@/utilities/brand";

/**
 * A card that turns over when it is clicked or tapped.
 *
 * The front carries the title; the description moves to the back. Nothing on
 * the page says a card can be turned over, so the front also carries a rotate
 * icon — these cards hold no link, which means they have none of the usual cues
 * that something will happen when you press them.
 *
 * Built as a `<button>` rather than a div with a click handler: that is what
 * makes it reachable by keyboard and announced as pressable, and `aria-pressed`
 * is what tells a screen reader which side is showing. The faces are both in
 * the document the whole time, so the text on the back is readable by a screen
 * reader and findable by the browser's own search — `aria-hidden` on the face
 * turned away is what stops both sides being read at once.
 *
 * The 3D is written inline rather than in utilities: `transform-style` and
 * `backface-visibility` have to agree across three elements, and spelling that
 * out here keeps the whole mechanism in one place.
 */
export const FlipCard: React.FC<{
  title?: string | null;
  color?: SurfaceColor | null;
  backgroundImage?: (number | MediaType) | null;
  backgroundOpacity?: number | null;
  children?: React.ReactNode;
  className?: string;
}> = ({
  title,
  color,
  backgroundImage,
  backgroundOpacity,
  children,
  className,
}) => {
  const [flipped, setFlipped] = useState(false);
  const colorClass = brandSurface(color, "coral");

  const face =
    "absolute inset-0 flex flex-col overflow-hidden rounded-box p-6 text-left";

  return (
    <button
      type="button"
      aria-pressed={flipped}
      aria-label={title ? `${title} — turn the card over` : "Turn the card over"}
      onClick={() => setFlipped((f) => !f)}
      className={cn("group relative block h-full w-full", className)}
      style={{ perspective: "1200px" }}
    >
      <div
        className="relative h-full w-full transition-transform duration-500 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : undefined,
        }}
      >
        {/* Front */}
        <div
          aria-hidden={flipped}
          className={cn(face, colorClass)}
          style={{ backfaceVisibility: "hidden" }}
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
            {title && (
              <h3 className="text-lg font-semibold sm:text-2xl">{title}</h3>
            )}
            <FiRotateCw
              aria-hidden
              className="mt-1 h-5 w-5 shrink-0 transition-transform duration-300 ease-out group-hover:rotate-90"
            />
          </div>
        </div>

        {/* Back — the same panel, turned around, so the description lands on a
            surface the reader has already seen rather than a new one. */}
        <div
          aria-hidden={!flipped}
          className={cn(face, colorClass)}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="relative z-10 flex items-start justify-end">
            <FiRotateCw
              aria-hidden
              className="mt-1 h-5 w-5 shrink-0 transition-transform duration-300 ease-out group-hover:-rotate-90"
            />
          </div>
          {children && (
            <div className="relative z-10 mt-2 overflow-y-auto text-sm/relaxed opacity-90 **:text-inherit!">
              {children}
            </div>
          )}
        </div>
      </div>
    </button>
  );
};
