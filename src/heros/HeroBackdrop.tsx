import React from "react";

import type { Media as MediaDoc } from "@/payload-types";

import { getMediaUrl } from "@/utilities/getMediaUrl";
import { cn } from "@/utilities/ui";

type Resource = number | MediaDoc | null | undefined;

const asDoc = (r: Resource): MediaDoc | null =>
  r && typeof r === "object" ? r : null;

/**
 * Every derivative Payload generated for this upload, as a srcset. The original
 * is included last so a very wide viewport still has something to reach for.
 */
const srcSetFor = (doc: MediaDoc): string => {
  const tag = doc.updatedAt;
  const entries = Object.values(doc.sizes ?? {})
    .filter((s): s is { url: string; width: number } =>
      Boolean(s && typeof s === "object" && s.url && s.width),
    )
    .map((s) => `${getMediaUrl(s.url, tag)} ${s.width}w`);

  if (doc.url && doc.width) {
    entries.push(`${getMediaUrl(doc.url, tag)} ${doc.width}w`);
  }

  return entries.join(", ");
};

/**
 * The image behind a hero.
 *
 * Two uploads rather than one, because a landscape crop in a tall phone viewport
 * has to be blown up until almost nothing of the subject is left. `mobile` is
 * optional and `desktop` stands in when it is missing.
 *
 * Written as a plain `<picture>` with a `<source media>` instead of two `<Media>`
 * elements toggled with CSS: a hidden `<img>` is still fetched, and this is the
 * page's LCP image, so that would mean every phone paying for the desktop crop
 * as well. The srcsets come from Payload's own generated sizes, so the browser
 * still picks a sensibly sized file.
 */
export const HeroBackdrop: React.FC<{
  desktop: Resource;
  mobile?: Resource;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Width the image occupies, for the browser's srcset maths. */
  sizes?: string;
}> = ({
  desktop,
  mobile,
  className,
  imgClassName,
  priority = false,
  sizes = "100vw",
}) => {
  const desktopDoc = asDoc(desktop);
  const mobileDoc = asDoc(mobile);

  if (!desktopDoc && !mobileDoc) return null;

  // With only a mobile image set, it is the one that has to serve everywhere.
  const main = desktopDoc ?? mobileDoc!;
  const alt = main.alt || "";

  return (
    <picture className={cn("block", className)}>
      {mobileDoc && desktopDoc && (
        <source
          media="(max-width: 767px)"
          srcSet={srcSetFor(mobileDoc)}
          sizes={sizes}
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={alt}
        src={getMediaUrl(main.url, main.updatedAt)}
        srcSet={srcSetFor(main)}
        sizes={sizes}
        className={cn("h-full w-full object-cover", imgClassName)}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
      />
    </picture>
  );
};
