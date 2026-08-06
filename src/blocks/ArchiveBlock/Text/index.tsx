import type { Post, ArchiveBlock as ArchiveBlockProps } from "@/payload-types";

import configPromise from "@payload-config";
import { getPayload } from "payload";
import React from "react";
import Link from "next/link";

import RichText from "@/components/RichText";
import { brandSurface } from "@/utilities/brand";
import { cn } from "@/utilities/ui";

export const TextArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string | null;
  }
> = async (props) => {
  const {
    id,
    introContent,
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
        {/* Intro — eyebrow, heading, body and the button all come from
            introContent; the `display` preset maps h3/h2/paragraph onto them. */}
        <div className="max-w-xl">
          {introContent && (
            <RichText
              data={introContent}
              preset="display"
              enableGutter={false}
            />
          )}
        </div>

        {/* Event list */}
        {posts.length > 0 && (
          <div className="flex flex-col gap-5">
            {/* The two brand surfaces alternating, rather than the lavender/cyan
                pair this used before. Both carry light text, so the title and its
                prompt take the surface's own foreground token instead of naming a
                colour — which is what keeps them readable on either card. */}
            {posts.map((post, i) => (
              <Link
                key={post.id ?? i}
                href={`/posts/${post.slug}`}
                className={cn(
                  "group rounded-box block px-8 py-7 transition-transform duration-200 hover:-translate-y-1",
                  brandSurface(i % 2 === 0 ? "purple" : "coral"),
                )}
              >
                <h3 className="text-xl font-bold sm:text-2xl">{post.title}</h3>
                <span className="mt-2 inline-flex text-sm font-semibold tracking-[0.15em] uppercase opacity-80 group-hover:underline">
                  Află mai multe
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
