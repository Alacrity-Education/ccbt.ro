import type { Post, ArchiveBlock as ArchiveBlockProps } from "@/payload-types";

import configPromise from "@payload-config";
import { getPayload } from "payload";
import React from "react";
import Link from "next/link";

import RichText from "@/components/RichText";
import { CMSLink } from "@/components/Link";
import { cn } from "@/utilities/ui";

export const TextArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string | null;
  }
> = async (props) => {
  const {
    id,
    eyebrow,
    title,
    introContent,
    link,
    categories,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
  } = props;

  const limit = limitFromProps || 4;

  let posts: Post[] = [];

  if (populateBy === "collection") {
    const payload = await getPayload({ config: configPromise });

    const flattenedCategories = categories?.map((category) =>
      typeof category === "object" ? category.id : category,
    );

    const fetchedPosts = await payload.find({
      collection: "posts",
      depth: 1,
      sort: "-eventDate",
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? { where: { categories: { in: flattenedCategories } } }
        : {}),
    });

    posts = fetchedPosts.docs;
  } else if (selectedDocs?.length) {
    posts = selectedDocs
      .map((post) => (typeof post.value === "object" ? post.value : null))
      .filter(Boolean) as Post[];
  }

  return (
    <div className="container mx-auto" id={`block-${id}`}>
      <div className="grid items-start gap-10 md:grid-cols-2 md:gap-16">
        {/* Intro */}
        <div className="max-w-xl">
          {eyebrow && (
            <p className="text-secondary mb-4 text-sm font-semibold tracking-[0.2em] uppercase md:text-base">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-primary mb-6 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
              {title}
            </h2>
          )}
          {introContent && (
            <RichText
              className="text-base-content/80 mb-8 max-w-lg text-start! pl-0! ml-0!"
              data={introContent}
              enableGutter={false}
            />
          )}
          {link?.label && (link.url || link.reference) && (
            <CMSLink {...link} appearance="secondary" size="lg" />
          )}
        </div>

        {/* Event list */}
        {posts.length > 0 && (
          <div className="flex flex-col gap-5">
            {posts.map((post, i) => {
              const lavender = i % 2 === 0;
              return (
                <Link
                  key={post.id ?? i}
                  href={`/posts/${post.slug}`}
                  className={cn(
                    "group rounded-box block px-8 py-7 transition-transform duration-200 hover:-translate-y-1",
                    lavender
                      ? "bg-base-300 text-base-content"
                      : "bg-accent text-accent-content",
                  )}
                >
                  <h3 className="text-neutral text-lg font-bold uppercase sm:text-xl">
                    {post.title}
                  </h3>
                  <span className="text-secondary mt-6 inline-flex text-xs font-semibold tracking-[0.15em] uppercase group-hover:underline">
                    Află mai multe
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
