import type { Post, ArchiveBlock as ArchiveBlockProps } from "@/payload-types";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import React from "react";
import RichText from "@/components/RichText";
import { cn } from "@/utilities/ui";
import Link from "next/link";
import { Media } from "@/components/Media";

const GRAD_CYCLE = [
  "linear-gradient(135deg, #1f1a14 0%, #4a3a25 60%, #7a5a35 100%)",
  "linear-gradient(135deg, #221915 0%, #463224 60%, #715029 100%)",
  "linear-gradient(135deg, #2a2520 0%, #524430 55%, #8a6635 100%)",
  "linear-gradient(135deg, #1c1815 0%, #3d3024 60%, #6e4f2e 100%)",
];

const MONTHS_RO = ["IAN", "FEB", "MAR", "APR", "MAI", "IUN", "IUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function formatEventDate(dateStr: string) {
  const d = new Date(dateStr);
  return { day: String(d.getDate()).padStart(2, "0"), mo: MONTHS_RO[d.getMonth()] };
}

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
  } = props;

  const eventsOnly = (props as any).eventsOnly ?? false;
  const sectionLabel = (props as any).sectionLabel ?? "Evenimente";
  const viewAllUrl = (props as any).viewAllUrl ?? "/posts";

  const styles: ("primary" | "secondary" | "starry" | "transparent")[] = [
    longCardStyles?.card1 ?? "primary",
    longCardStyles?.card2 ?? "secondary",
    longCardStyles?.card3 ?? "starry",
    longCardStyles?.card4 ?? "transparent",
  ];

  const limit = limitFromProps || (eventsOnly ? 4 : 6);

  let posts: Post[] = [];

  if (populateBy === "collection") {
    const payload = await getPayload({ config: configPromise });

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === "object") return category.id;
      else return category;
    });

    const baseWhere: any = {};
    if (eventsOnly) {
      baseWhere.and = [
        { isEvent: { equals: true } },
        { eventDate: { greater_than: new Date().toISOString() } },
      ];
    } else if (flattenedCategories && flattenedCategories.length > 0) {
      baseWhere.categories = { in: flattenedCategories };
    }

    const fetchedPosts = await payload.find({
      collection: "posts",
      depth: 1,
      sort: eventsOnly ? "eventDate" : "-eventDate",
      limit,
      ...(Object.keys(baseWhere).length > 0 ? { where: baseWhere } : {}),
    });

    posts = fetchedPosts.docs;
  } else {
    if (selectedDocs?.length) {
      posts = selectedDocs
        .map((post) => (typeof post.value === "object" ? post.value : null))
        .filter(Boolean) as Post[];
    }
  }

  if (eventsOnly && !posts.length) return null;

  const getVariantClasses = (
    variant: "primary" | "secondary" | "starry" | "transparent"
  ) =>
    variant === "primary"
      ? "bg-primary text-primary-content"
      : variant === "secondary"
        ? "bg-secondary text-secondary-content"
        : variant === "transparent"
          ? "bg-base-100 text-base-content border border-neutral/20"
          : "bg-gradient-to-tr from-primary to-black stars [--star-scale:200px] text-primary-content";

  return (
    <div
      className={eventsOnly ? "" : "container mx-auto my-8"}
      style={eventsOnly ? { background: "var(--cream)", padding: 0 } : {}}
      id={`block-${id}`}
    >
      {/* Events mode: section header */}
      {eventsOnly && (
        <div
          style={{ maxWidth: 1280, margin: "0 auto", padding: "0 64px 28px" }}
          className="!px-6 sm:!px-10 lg:!px-16"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "var(--red)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  background: "var(--red)",
                  transform: "rotate(45deg)",
                  display: "inline-block",
                }}
              />
              <span>{sectionLabel}</span>
            </div>
            <Link
              href={viewAllUrl}
              style={{
                marginLeft: "auto",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "var(--red)",
              }}
            >
              Vezi toate
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      )}

      {/* Regular mode: intro content */}
      {!eventsOnly && introContent && (
        <div className="container mb-6">
          <RichText
            className="ms-0 max-w-3xl"
            data={introContent}
            enableGutter={false}
          />
        </div>
      )}

      {/* Events mode: event cards grid */}
      {eventsOnly ? (
        <div
          style={{ maxWidth: 1280, margin: "0 auto", padding: "0 64px 96px" }}
          className="!px-6 sm:!px-10 lg:!px-16"
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(posts.length, 4)}, 1fr)`,
              gap: 18,
            }}
            className="!grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4"
          >
            {posts.map((event: any, i: number) => {
              const { day, mo } = event.eventDate
                ? formatEventDate(event.eventDate)
                : { day: "--", mo: "---" };
              const grad = GRAD_CYCLE[i % GRAD_CYCLE.length];

              return (
                <Link key={event.id} href={`/posts/${event.slug}`} style={{ textDecoration: "none" }}>
                  <article
                    style={{
                      background: "var(--paper)",
                      border: "1px solid var(--rule)",
                      boxShadow: "var(--shadow-card)",
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "box-shadow 200ms",
                    }}
                    className="hover:shadow-lift"
                  >
                    <div style={{ position: "relative", height: 170, background: grad }}>
                      <div
                        style={{
                          position: "absolute",
                          left: 12,
                          top: 12,
                          width: 44,
                          padding: "8px 0",
                          background: "var(--red)",
                          color: "#fff",
                          textAlign: "center",
                          lineHeight: 1,
                          fontFamily: "var(--font-body)",
                          fontWeight: 700,
                        }}
                      >
                        <div style={{ fontSize: 20 }}>{day}</div>
                        <div style={{ fontSize: 10, letterSpacing: "0.16em", marginTop: 3 }}>{mo}</div>
                      </div>
                    </div>
                    <div style={{ padding: "16px 16px 18px", position: "relative" }}>
                      <h5
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontSize: 18,
                          color: "var(--ink)",
                          margin: "0 24px 4px 0",
                          lineHeight: 1.2,
                        }}
                      >
                        {event.title}
                      </h5>
                      {event.subtitle && (
                        <p style={{ fontSize: 12.5, color: "var(--ink-soft)", margin: 0 }}>
                          {event.subtitle}
                        </p>
                      )}
                      <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="none"
                        stroke="var(--red)"
                        strokeWidth="2"
                        style={{ position: "absolute", right: 14, bottom: 16 }}
                      >
                        <path d="M7 17 17 7M9 7h8v8" />
                      </svg>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        /* Regular mode: standard card grid */
        <div className={cn("w-full")}>
          <div
            className={cn(
              "grid grid-cols-1 gap-4",
              "sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
            )}
          >
            {posts?.map((post, index) => {
              if (typeof post !== "object" || post === null) return null;
              const styleVariant = styles?.[index % styles.length] ?? "primary";
              const variantClasses = getVariantClasses(styleVariant);
              const href = `/posts/${post.slug}`;
              const metaImage = post.meta?.image;
              const description = post.meta?.description;
              const title = post.title;
              const subtitle = post.subtitle;
              const sanitizedDescription = description?.replace(/\s/g, " ");

              return (
                <Link
                  className="h-full w-full min-w-0 max-w-full hover:-translate-y-1 transition-all"
                  key={href}
                  href={href}
                >
                  <article
                    key={index}
                    className={cn(
                      variantClasses,
                      "shadow-lg rounded-lg p-4 flex h-max w-full flex-row-reverse hover:cursor-pointer"
                    )}
                  >
                    <div className="relative h-46 sm:h-60 aspect-2/3 shrink-0">
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

                    <div className="min-w-0 flex-1 lg:pr-0 h-full text-base flex flex-col pr-4">
                      {title && (
                        <div className="w-full text-start text-base sm:text-xl font-bold no-underline">
                          <h3>{title}</h3>
                        </div>
                      )}
                      {subtitle && (
                        <div className="w-full text-start text-base sm:text-xl no-underline">
                          <h3>{subtitle}</h3>
                        </div>
                      )}
                      {post.eventDate && (
                        <div className="not-prose w-full text-start text-sm mb-4">
                          {new Date(post.eventDate).toLocaleDateString("en-GB")}
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
            })}
          </div>
        </div>
      )}
    </div>
  );
};
