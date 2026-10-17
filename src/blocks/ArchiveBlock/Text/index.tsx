import type { Post, ArchiveBlock as ArchiveBlockProps } from "@/payload-types";

import configPromise from "@payload-config";
import { getPayload } from "payload";
import React from "react";
import Link from "next/link";

import RichText from "@/components/RichText";
import { brandSurface } from "@/utilities/brand";
import { cn } from "@/utilities/ui";

import { groupPostsByMonth } from "../groupByMonth";
import { MonthHeading } from "../MonthHeading";

/**
 * One entry in the list. The two brand surfaces alternate down the whole
 * archive rather than restarting at each month, so `index` is the running
 * position across every group — a month with an odd number of posts would
 * otherwise put two cards of the same colour against each other at the join.
 */
const PostRow: React.FC<{ post: Post; index: number }> = ({ post, index }) => (
  <Link
    href={`/posts/${post.slug}`}
    className={cn(
      "group rounded-box block px-8 py-7 transition-transform duration-200 hover:-translate-y-1",
      brandSurface(index % 2 === 0 ? "purple" : "coral"),
    )}
  >
    <h3 className="text-xl font-bold sm:text-2xl">{post.title}</h3>
    <span className="mt-2 inline-flex text-sm font-semibold tracking-[0.15em] uppercase opacity-80 group-hover:underline">
      Află mai multe
    </span>
  </Link>
);

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
    groupByDate,
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
      sort: "-publishedAt",
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

  // `!== false` rather than a truth test: the toggle defaults to on, and blocks
  // saved before it existed hold no value at all — they get the months too.
  const grouped = groupByDate !== false;
  const { groups, undated } = grouped
    ? groupPostsByMonth(posts)
    : { groups: [], undated: posts };

  // The running position across every month, so the alternating surfaces carry
  // through the joins (see PostRow).
  let position = 0;

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
          <div className="flex flex-col gap-10">
            {groups.map((group) => (
              <div className="flex flex-col gap-5" key={group.key}>
                <MonthHeading>{group.label}</MonthHeading>
                {group.posts.map((post) => (
                  <PostRow
                    key={post.id ?? `${group.key}-${position}`}
                    post={post}
                    index={position++}
                  />
                ))}
              </div>
            ))}

            {/* Whatever had no date to file under — kept rather than dropped,
                and with no heading, because there is no month to name. */}
            {undated.length > 0 && (
              <div className="flex flex-col gap-5">
                {undated.map((post, i) => (
                  <PostRow
                    key={post.id ?? `undated-${i}`}
                    post={post}
                    index={position++}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
