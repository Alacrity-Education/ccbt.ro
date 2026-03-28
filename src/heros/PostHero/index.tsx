import { formatDateTime } from "src/utilities/formatDateTime";
import React from "react";

import type { Post } from "@/payload-types";

import { Media } from "@/components/Media";
import { formatAuthors } from "@/utilities/formatAuthors";
import {cn} from "@/utilities/ui";

export const PostHero: React.FC<{
  post: Post;
}> = ({ post }) => {
  const { categories, heroImageMD,heroImageSM, populatedAuthors, publishedAt, title, subtitle } = post;

  const hasAuthors =
    populatedAuthors &&
    populatedAuthors.length > 0 &&
    formatAuthors(populatedAuthors) !== "";

  const hasMD = heroImageMD && typeof heroImageMD !== undefined;
  const hasSM = heroImageSM && typeof heroImageSM !== undefined;

  const aspectClass = "aspect-[210/297] sm:aspect-[3/2]";


  return (
    <div className={cn(aspectClass,"relative w-full -mt-[9rem] min-h-max flex items-end")}>
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
      <div className={cn(aspectClass," h-full w-full select-none absolute top-0 left-0 inset-0")}>

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

        {/* Gradient Overlay */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-1/2 w-full bg-linear-to-t from-black to-transparent" />
      </div>
    </div>
  );
};
