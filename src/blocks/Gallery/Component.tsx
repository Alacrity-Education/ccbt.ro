import React from "react";
import { FiMaximize2 } from "react-icons/fi";

import type {
  GalleryBlock as GalleryBlockProps,
  Media as MediaType,
} from "@/payload-types";

import { Media } from "@/components/Media";
import { brandSurface, type BrandColor } from "@/utilities/brand";
import { headingId } from "@/utilities/headingId";
import { cn } from "@/utilities/ui";

import { Lightbox, LightboxTrigger, type LightboxItem } from "./Lightbox";

type Section = NonNullable<GalleryBlockProps["sections"]>[number];
type Item = NonNullable<Section["items"]>[number];

/** The section's colour: its label's surface and its titles' text colour. */
const PAIR: Record<string, { surface: BrandColor; title: string }> = {
  purple: { surface: "purple", title: "text-primary" },
  coral: { surface: "coral", title: "text-secondary" },
};
const pairFor = (color?: string | null) => PAIR[color ?? "coral"] ?? PAIR.coral;

/**
 * The section's label — the same pill the Team block gives a department, so a
 * page that moves from one block to the other keeps its look. It is a heading
 * here, since a gallery section is one, and it carries an id like every other
 * heading on the site (see utilities/headingId).
 */
const SectionLabel: React.FC<{ title: string; color?: string | null }> = ({
  title,
  color,
}) => (
  <h2
    className={cn(
      "font-barlow-semi mb-6 inline-block scroll-mt-24 rounded-sm px-8 py-1.5 text-lg font-semibold sm:text-xl",
      brandSurface(pairFor(color).surface),
    )}
    id={headingId(title) || undefined}
  >
    {title}
  </h2>
);

/**
 * One artwork. Drawn whole on a neutral mat rather than cropped to fill its
 * cell: the cell is square so the grid stays even, and a painting of any shape
 * sits inside it at its own proportions — cutting the edges off an artwork is
 * not a layout decision this block gets to make.
 */
const GalleryItem: React.FC<{
  item: Item & { image: MediaType };
  index: number;
  color?: string | null;
}> = ({ item, index, color }) => (
  <figure className="flex h-full w-full flex-col">
    <LightboxTrigger
      index={index}
      label={`Mărește imaginea${item.title ? `: ${item.title}` : ""}`}
      className="group bg-base-200 relative block aspect-square w-full cursor-zoom-in overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
    >
      <Media
        fill
        resource={item.image}
        // Two to a row, four from `lg` (see the grid below).
        size="(min-width: 1024px) 25vw, 50vw"
        htmlElement={null}
        pictureClassName="absolute inset-3 sm:inset-4"
        imgClassName="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
      />
      {/* The cue that the image opens: on hover with a mouse, always with a
          finger, where there is no hover to reveal it. */}
      <span
        aria-hidden
        className="bg-base-100/90 text-base-content absolute top-2 right-2 rounded-full p-1.5 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
      >
        <FiMaximize2 className="h-4 w-4" />
      </span>
    </LightboxTrigger>
    {(item.title || item.subtitle) && (
      <figcaption className="font-barlow-semi pt-4 sm:pt-5">
        {item.title && (
          <p
            className={cn(
              "text-lg leading-tight font-bold lg:text-2xl",
              pairFor(color).title,
            )}
          >
            {item.title}
          </p>
        )}
        {item.subtitle && (
          <p className="text-base-content/80 mt-0.5 text-base/tight sm:text-lg/tight lg:text-xl">
            {item.subtitle}
          </p>
        )}
      </figcaption>
    )}
  </figure>
);

export const GalleryBlock: React.FC<
  GalleryBlockProps & { id?: string | null }
> = ({ sections }) => {
  if (!sections || sections.length === 0) return null;

  // Every image in reading order, so the viewer's arrows walk the whole block.
  // An item whose image failed to populate comes back as a bare id and is
  // dropped: there is nothing to draw or to open.
  const items: LightboxItem[] = [];
  const rendered = sections.map((section) => ({
    section,
    entries: (section.items ?? []).flatMap((item) =>
      typeof item.image === "object" && item.image
        ? [
            {
              item: item as Item & { image: MediaType },
              index:
                items.push({
                  image: item.image,
                  title: item.title,
                  subtitle: item.subtitle,
                }) - 1,
            },
          ]
        : [],
    ),
  }));

  if (items.length === 0) return null;

  // No background of its own: the page motif runs behind the blocks (see
  // components/PageMotif).
  return (
    <section className="relative w-full">
      <div className="relative container mx-auto py-6">
        <Lightbox items={items}>
          {rendered.map(({ section, entries }, i) =>
            entries.length ? (
              <div key={section.id ?? i} className={cn(i > 0 && "mt-14")}>
                {section.title && (
                  <SectionLabel title={section.title} color={section.color} />
                )}
                <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
                  {entries.map(({ item, index }) => (
                    <GalleryItem
                      key={item.id ?? index}
                      item={item}
                      index={index}
                      color={section.color}
                    />
                  ))}
                </div>
              </div>
            ) : null,
          )}
        </Lightbox>
      </div>
    </section>
  );
};
