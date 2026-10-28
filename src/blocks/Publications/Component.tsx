import React from "react";

import type { Media as MediaType, PublicationsBlock as Props } from "@/payload-types";

import { Media } from "@/components/Media";
import { cn } from "@/utilities/ui";
import { getMediaUrl } from "@/utilities/getMediaUrl";

/**
 * Publications, shown as volumes on a shelf.
 *
 * The rule the whole block is built on: a cover is already a finished piece of
 * design, with its own typography and palette, so nothing of ours is ever laid
 * on top of one. The site's voice goes on the spine instead — the one surface
 * a book gives you to brand — and the cover is reproduced whole, at its own
 * proportions, never cropped and never framed.
 *
 * Spine colours cycle through the three brand colours so a row reads as a
 * single collection rather than a set of unrelated objects.
 */

/** Spine colours, in the order they cycle. Cyan takes ink; the other two take white. */
const SPINES = [
  "bg-primary text-primary-content",
  "bg-secondary text-secondary-content",
  "bg-accent text-accent-content",
] as const;

const isMedia = (v: unknown): v is MediaType =>
  typeof v === "object" && v !== null && "url" in v;

/**
 * Bytes as the reader needs them: a round number and a unit, because the point
 * is "can I open this on my phone", not accounting. Payload records `filesize`
 * on every upload, so this costs no extra field.
 */
const fileSize = (bytes?: number | null): string | null => {
  if (!bytes || bytes < 1) return null;
  const mb = bytes / 1_000_000;
  if (mb >= 1) return `${mb < 10 ? mb.toFixed(1) : Math.round(mb)} MB`;
  return `${Math.max(1, Math.round(bytes / 1000))} kB`;
};

export const PublicationsBlockComponent: React.FC<Props> = ({ heading, items }) => {
  if (!items?.length) return null;

  return (
    <div className="container mx-auto">
      {heading && (
        <h2 className="text-primary mb-10 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {heading}
        </h2>
      )}

      {/* `items-start`, not `items-end`. Every volume is the same height — the
          cover sets it and the spine matches — so aligning the tops aligns the
          bottoms too, and the shelf holds. Aligning the bottoms instead lines
          up the ends of the *captions*, which are as tall as their text, and a
          publication with no author then stands a line proud of its neighbours.
          The rhythm here is in the widths: each cover keeps its own. */}
      <ul className="flex list-none flex-wrap items-start gap-x-7 gap-y-12 p-0">
        {items.map((item, i) => (
          <Volume key={item.id ?? i} item={item} spine={SPINES[i % SPINES.length]} />
        ))}
      </ul>
    </div>
  );
};

const Volume: React.FC<{
  item: NonNullable<Props["items"]>[number];
  spine: string;
}> = ({ item, spine }) => {
  const { title, cover, author, year, file, url } = item;

  if (!isMedia(cover)) return null;

  const doc = isMedia(file) ? file : null;
  const href = doc ? getMediaUrl(doc.url) : url || null;
  const size = fileSize(doc?.filesize);

  // Everything the link is for, in one string. Without it a screen reader
  // announces the spine and the cover's alt text as one run-on name.
  const label = [title, author, year ? String(year) : null]
    .filter(Boolean)
    .join(", ") + (doc ? ` — PDF${size ? `, ${size}` : ""}` : "");

  const book = (
    <span
      className={cn(
        // The height is set here rather than on the cover so the spine has a
        // definite box to be clipped against: `max-height: 100%` inside a
        // stretch-sized parent resolves against a parent the text is itself
        // growing, which is why a long title used to run past its own cover.
        "flex h-[220px] items-stretch shadow-md sm:h-[300px]",
        // The lift reads as taking a book off the shelf. It answers a
        // pointer, so it is motion with a cause — and it still stands down
        // for anyone who has asked for less of it.
        "transition-transform duration-200 ease-out",
        "group-hover:-translate-y-2.5 group-focus-visible:-translate-y-2.5",
        "motion-reduce:transform-none motion-reduce:transition-none",
      )}
    >
      <span
        className={cn(
          "flex h-full w-8 shrink-0 items-center justify-center overflow-hidden py-3 sm:w-9",
          spine,
        )}
      >
        {/* Vertical type is the point of the variant, so it is real text in a
            real writing mode rather than a rotated image: it stays selectable,
            searchable and legible to assistive technology. `rotate(180deg)`
            turns the default top-to-bottom run into bottom-to-top, which is
            how the mock read. A title longer than the cover is cut with an
            ellipsis — the full name is in the link's own label. */}
        <span className="font-barlow-cond max-h-full overflow-hidden text-base font-bold tracking-wide text-ellipsis whitespace-nowrap [writing-mode:vertical-rl] [transform:rotate(180deg)]">
          {title}
        </span>
      </span>

      <Media
        resource={cover}
        // The cover sets the height of the volume; its width follows from its
        // own proportions, which is what keeps it uncropped.
        pictureClassName="block h-full"
        imgClassName="h-full w-auto max-w-none object-contain"
        size="(max-width: 640px) 160px, 220px"
      />
    </span>
  );

  const caption = (
    <span className="mt-3 block w-0 min-w-full">
      {author && (
        <span className="text-base-content/70 block text-sm leading-snug">
          {author}
        </span>
      )}
      {doc && (
        <span className="text-secondary mt-1 inline-block border-b-2 border-current text-xs font-semibold">
          PDF{size ? ` · ${size}` : ""}
        </span>
      )}
    </span>
  );

  // No file and no link is a publication that exists but cannot be opened
  // yet. It still belongs on the shelf; it simply is not a link, rather than
  // a link that goes nowhere.
  if (!href) {
    return (
      <li className="w-fit">
        {book}
        {caption}
      </li>
    );
  }

  return (
    <li className="w-fit">
      <a
        href={href}
        aria-label={label}
        // The file sits on the CMS origin, so `download` would be ignored
        // cross-origin; it opens instead, which is what a PDF should do.
        target="_blank"
        rel="noopener noreferrer"
        className="group focus-visible:outline-accent block w-fit no-underline focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        {book}
        {caption}
      </a>
    </li>
  );
};
