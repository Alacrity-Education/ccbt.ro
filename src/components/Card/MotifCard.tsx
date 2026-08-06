import React from "react";

import type { Media as MediaType } from "@/payload-types";
import { Media } from "@/components/Media";
import { CMSLink } from "@/components/Link";
import { CornerMotif, MotifArrow } from "@/components/Card/CornerMotif";
import { cn } from "@/utilities/ui";
import type { BrandColor } from "@/utilities/brand";

/**
 * The frame from the export: 375 x 550. It goes on whichever element ends up
 * outermost — the article, or the link wrapping it — so turning the link on does
 * not change the card's box. Classes, not inline styles: CMSLink takes no style.
 */
const FRAME = "w-full max-w-[375px] min-h-[550px]";

type MotifCardProps = {
  title?: string | null;
  image?: (number | MediaType) | null;
  horizontalColor?: BrandColor | null;
  verticalColor?: BrandColor | null;
  arrowColor?: BrandColor | null;
  /** Payload link object; adds the arrow and makes the card clickable. */
  link?: any;
  children?: React.ReactNode;
  className?: string;
};

export const MotifCard: React.FC<MotifCardProps> = ({
  title,
  image,
  horizontalColor,
  verticalColor,
  arrowColor,
  link,
  children,
  className,
}) => {
  const article = (
    <article
      className={cn(
        "relative flex w-full flex-col bg-white p-6",
        // Unlinked, the article is the outer box: it carries the frame and any
        // caller classes. Linked, the wrapper below is outermost and takes both.
        !link && FRAME,
        !link && className,
      )}
    >
      {/* The picture and the mark share a positioned box so the mark sits on the
          picture's top-right corner, half on and half off it. */}
      {/* A fixed box, so every card gets the same picture area whatever the
          photo's own proportions are; the photo covers it and is cropped. */}
      <div className="relative aspect-square w-full overflow-hidden">
        {image && typeof image === "object" ? (
          <Media
            resource={image}
            fill
            // Media's wrapper div and its <picture> both need a size of their
            // own: the wrapper has no height to give `h-full`, and <picture> is
            // inline, where width and height do not apply.
            className="h-full w-full"
            pictureClassName="block h-full w-full"
            imgClassName="h-full w-full object-cover object-center"
          />
        ) : (
          <div className="bg-base-300 h-full w-full" />
        )}
        <CornerMotif
          horizontalColor={horizontalColor}
          verticalColor={verticalColor}
          className="pointer-events-none absolute top-0 right-0 z-10"
        />
      </div>

      {title && (
        <h3 className="text-primary font-barlow-cond mt-6 text-3xl leading-none font-bold uppercase">
          {title}
        </h3>
      )}

      {children && (
        <div className="text-base-content mt-3 text-sm/relaxed">{children}</div>
      )}

      {link && (
        <MotifArrow color={arrowColor} className="mt-auto ml-auto shrink-0" />
      )}
    </article>
  );

  if (link) {
    return (
      <CMSLink
        {...link}
        label={undefined}
        appearance="inline"
        // Flex, not block: it makes the article stretch to the frame's
        // min-height, which a percentage height could not do against an auto box.
        className={cn("group flex", FRAME, className)}
      >
        {article}
      </CMSLink>
    );
  }

  return article;
};
