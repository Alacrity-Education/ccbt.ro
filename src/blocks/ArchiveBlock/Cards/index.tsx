import type { Post, ArchiveBlock as ArchiveBlockProps } from "@/payload-types";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import React from "react";
import RichText from "@/components/RichText";
import { cn } from "@/utilities/ui";
import Link from "next/link";
import { Media } from "@/components/Media";

import { groupPostsByMonth } from "../groupByMonth";
import { MonthHeading } from "../MonthHeading";

type CardStyle = "primary" | "secondary" | "transparent";

const getVariantClasses = (variant: CardStyle) =>
  variant === "primary"
    ? "bg-primary text-primary-content"
    : variant === "secondary"
      ? "bg-secondary text-secondary-content"
      : "bg-base-100 text-base-content border border-neutral/20";

/**
 * One card. `index` is the running position across every month, not the
 * position within one: the four styles cycle down the whole archive, and
 * restarting the cycle at each month would put the same style under the same
 * heading every time.
 */
const PostCard: React.FC<{
  post: Post;
  index: number;
  styles: CardStyle[];
}> = ({ post, index, styles }) => {
  const styleVariant = styles[index % styles.length] ?? "primary";
  const href = `/posts/${post.slug}`;
  const metaImage = post.meta?.image;
  const description = post.meta?.description;
  const { title, subtitle } = post;
  const sanitizedDescription = description?.replace(/\s/g, " ");

  return (
    <Link
      // 1. REMOVED `min-w-max` here. Added `min-w-0` to be safe.
      className={
        "h-full w-full min-w-0 max-w-full hover:-translate-y-1 transition-all"
      }
      href={href}
    >
      <article
        className={cn(
          getVariantClasses(styleVariant),
          "shadow-lg rounded-lg p-4 flex h-max w-full flex-col gap-4 sm:flex-row-reverse sm:gap-0 hover:cursor-pointer",
        )}
      >
        {/* Side by side the portrait crop reads well, but stacked on a
            phone it would eat most of the screen — so it goes landscape
            and full width there instead. */}
        <div className="relative w-full shrink-0 aspect-3/2 sm:aspect-2/3 sm:h-60 sm:w-auto">
          {!metaImage && (
            <div className="bg-base-200 rounded-lg h-full w-full flex items-center justify-center text-xs">
              No Image
            </div>
          )}
          {metaImage && typeof metaImage === "object" && (
            <Media
              resource={metaImage}
              imgClassName="h-full w-full object-cover rounded-lg overflow-clip object-center shadow-xl absolute inset-0"
              pictureClassName="h-full w-full rounded-lg overflow-clip object-center bg-base-200 shadow-lg"
              fill
            />
          )}
        </div>

        <div className="min-w-0 flex-1 h-full text-base flex flex-col sm:pr-4">
          {title && (
            <div className="w-full text-start text-base sm:text-xl font-bold no-underline ">
              <h3>{title}</h3>
            </div>
          )}
          {subtitle && (
            <div className="w-full text-start text-base sm:text-xl no-underline ">
              <h3>{subtitle}</h3>
            </div>
          )}

          {post.publishedAt && (
            <div className="not-prose w-full text-start text-sm mb-4">
              {new Date(post.publishedAt).toLocaleDateString("en-GB")}
            </div>
          )}

          {description && (
            <div className="line-clamp-7 font-light sm:line-clamp-3 md:line-clamp-5 text-xs sm:text-sm w-full text-start break-words">
              <p>{sanitizedDescription}</p>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

const CardGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  // Cards are horizontal, so they need real width before splitting into
  // columns — at two columns on a 768px tablet the text well was down to
  // ~144px. The second column waits for lg.
  <div className={cn("grid grid-cols-1 gap-4", "lg:grid-cols-2 xl:grid-cols-3")}>
    {children}
  </div>
);

export const CardsArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string | null;
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    longCardStyles,
    groupByDate,
  } = props;

  const styles: CardStyle[] = [
    longCardStyles?.card1 ?? "primary",
    longCardStyles?.card2 ?? "secondary",
    longCardStyles?.card3 ?? "transparent",
    longCardStyles?.card4 ?? "secondary",
  ];

  const limit = limitFromProps || 6;

  let posts: Post[] = [];

  if (populateBy === "collection") {
    const payload = await getPayload({ config: configPromise });

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === "object") return category.id;
      else return category;
    });

    const fetchedPosts = await payload.find({
      collection: "posts",
      depth: 1,
      sort: "-publishedAt",
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
          where: {
            categories: {
              in: flattenedCategories,
            },
          },
        }
        : {}),
    });

    posts = fetchedPosts.docs;
  } else {
    if (selectedDocs?.length) {
      posts = selectedDocs
        .map((post) => (typeof post.value === "object" ? post.value : null))
        .filter(Boolean) as Post[];
    }
  }

  // A relationship that failed to populate comes back as a bare id; the card
  // needs the document, so drop those rather than render an empty shell.
  posts = posts.filter((post) => typeof post === "object" && post !== null);

  // `!== false` rather than a truth test: the toggle defaults to on, and blocks
  // saved before it existed hold no value at all — they get the months too.
  const grouped = groupByDate !== false;
  const { groups, undated } = grouped
    ? groupPostsByMonth(posts)
    : { groups: [], undated: posts };

  // The running position across every month, so the four card styles cycle
  // down the whole archive (see PostCard).
  let position = 0;

  return (
    <div className="container mx-auto my-8" id={`block-${id}`}>
      {/* Same field, same preset as the Text variant — the intro used to fall
          through to `body` here and came out at prose sizes, so the two styles
          rendered identical content at visibly different scales. */}
      {introContent && (
        <div className="container mb-6">
          <RichText
            className="ms-0"
            data={introContent}
            preset="display"
            enableGutter={false}
          />
        </div>
      )}
      <div className={cn("flex w-full flex-col gap-10")}>
        {groups.map((group) => (
          <div key={group.key}>
            <MonthHeading className="mb-4">{group.label}</MonthHeading>
            <CardGrid>
              {group.posts.map((post) => (
                <PostCard
                  key={post.id ?? `${group.key}-${position}`}
                  post={post}
                  index={position++}
                  styles={styles}
                />
              ))}
            </CardGrid>
          </div>
        ))}

        {/* Whatever had no date to file under — kept rather than dropped, and
            with no heading, because there is no month to name. */}
        {undated.length > 0 && (
          <CardGrid>
            {undated.map((post, i) => (
              <PostCard
                key={post.id ?? `undated-${i}`}
                post={post}
                index={position++}
                styles={styles}
              />
            ))}
          </CardGrid>
        )}
      </div>
    </div>
  );
};
