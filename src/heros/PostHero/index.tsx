import { formatDateTime } from "@/utilities/formatDateTime";
import React from "react";

import type { Post } from "@/payload-types";

import { Media } from "@/components/Media";
import { formatAuthors } from "@/utilities/formatAuthors";
import { resolveColor, type HeroColor } from "@/heros/heroColor";
import { HeroScrim } from "@/heros/HeroScrim";
import {cn} from "@/utilities/ui";

export const PostHero: React.FC<{
  post: Post;
}> = ({ post }) => {
  const { categories, heroImageMD,heroImageSM, populatedAuthors, publishedAt, title, subtitle, heroOverlayColor } = post;

  // Same wash the page heroes use, so a post reads as part of the same family.
  const { bg } = resolveColor((heroOverlayColor as HeroColor) ?? "purple");

  const hasAuthors =
    populatedAuthors &&
    populatedAuthors.length > 0 &&
    formatAuthors(populatedAuthors) !== "";

  const hasMD = heroImageMD && typeof heroImageMD !== undefined;
  const hasSM = heroImageSM && typeof heroImageSM !== undefined;

  // Matches the high impact page hero (see heros/Home), so a post opens at the
  // same height as a page rather than at whatever its own aspect ratio worked
  // out to — which was a portrait 210:297 on phones and 3:2 above `sm`.
  //
  // The height alone does not make them look alike: the pull above has to leave
  // this sitting where a page hero sits. A page hero starts 40px down (its
  // article's `pt-10`) with the fixed 80px header over its top; the article here
  // opens with `pt-16`, so -24px lands it in the same place. The old -9rem put
  // 80px of it above the document, which cost the hero that much visible height.
  const heightClass = "min-h-[80svh]";


  return (
    <div className={cn(heightClass, "relative flex w-full -mt-6 items-end overflow-hidden")}>
      <div className="relative z-10 container pb-8 z-10 text-white lg:grid lg:grid-cols-[1fr_48rem_1fr]">
        <div className="col-span-1 col-start-1 md:col-span-2 md:col-start-2">
          <div className="mb-6 text-sm uppercase">
            {categories?.map((category, index) => {
              if (typeof category === "object" && category !== null) {
                const { title: categoryTitle } = category;

                const titleToUse = categoryTitle || "Untitled category";

                const isLast = index === categories.length - 1;

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                );
              }
              return null;
            })}
          </div>

          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
          </div>
          {subtitle && <div className="">
            <h1 className="mb-6 text-xl md:text-3xl lg:text-4xl">{subtitle}</h1>
          </div>}
          <div className="flex flex-col gap-4 md:flex-row md:gap-16">
            {hasAuthors && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Author</p>

                  <p>{formatAuthors(populatedAuthors)}</p>
                </div>
              </div>
            )}
            {publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Date Published</p>

                <time dateTime={publishedAt}>
                  {formatDateTime(publishedAt)}
                </time>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 h-full w-full select-none">

        {/* MD Image: Shows on md+ screens if both exist, otherwise shows everywhere */}
        {hasMD && (
          <Media
            fill
            priority
            className={`h-full w-full ${hasSM ? "hidden md:block" : "block"}`}
            imgClassName="z-0 object-cover"
            pictureClassName={`h-full w-full ${hasSM ? "hidden md:block" : "block"}`}
            resource={heroImageMD}
          />
        )}

        {/* SM Image: Shows on mobile if both exist, otherwise shows everywhere */}
        {hasSM && (
          <Media
            fill
            priority
            className={`h-full w-full ${hasMD ? "block md:hidden" : "block"}`}
            imgClassName="z-0 object-cover"
            pictureClassName={`h-full w-full ${hasMD ? "block md:hidden" : "block"}`}
            resource={heroImageSM}
          />
        )}

        <HeroScrim color={bg} />
      </div>
    </div>
  );
};
