import React from "react";
import Link from "next/link";

import type { Media as MediaType } from "@/payload-types";
import { Media } from "@/components/Media";
import { CMSLink } from "@/components/Link";
import { cn } from "@/utilities/ui";

export type LongCardStyle = "primary" | "secondary" | "starry" | "transparent";

/** The four surfaces, as Payload select options. */
export const LONG_CARD_STYLE_OPTIONS: {
  label: string;
  value: LongCardStyle;
}[] = [
  { label: "Primary", value: "primary" },
  { label: "Secondary", value: "secondary" },
  { label: "Starry", value: "starry" },
  { label: "Transparent", value: "transparent" },
];

const STYLE_CLASSES: Record<LongCardStyle, string> = {
  primary: "bg-primary text-primary-content",
  secondary: "bg-secondary text-secondary-content",
  transparent: "bg-base-100 text-base-content border border-neutral/20",
  starry:
    "bg-gradient-to-tr from-primary to-black stars [--star-scale:200px] text-primary-content",
};

type LongCardProps = {
  title?: string | null;
  subtitle?: string | null;
  /** Already formatted for display — the caller owns the locale. */
  date?: string | null;
  image?: (number | MediaType) | null;
  style?: LongCardStyle | null;
  /** Plain href — used by the archive, which links to a post. */
  href?: string | null;
  /** Payload link object — used by blocks where the editor picks the target. */
  link?: any;
  children?: React.ReactNode;
  className?: string;
};

const WRAPPER =
  "h-full w-full min-w-0 max-w-full transition-all hover:-translate-y-1";

/**
 * The wide card: picture on the right, copy on the left, stacking on a phone.
 * Shared by the Archive block's Cards style and the Card block's Long type, so
 * the two stay one design rather than two that drift.
 */
export const LongCard: React.FC<LongCardProps> = ({
  title,
  subtitle,
  date,
  image,
  style,
  href,
  link,
  children,
  className,
}) => {
  const article = (
    <article
      className={cn(
        STYLE_CLASSES[style ?? "primary"] ?? STYLE_CLASSES.primary,
        "flex h-max w-full flex-col gap-4 rounded-lg p-4 shadow-lg hover:cursor-pointer sm:flex-row-reverse sm:gap-0",
        className,
      )}
    >
      {/* Side by side the portrait crop reads well, but stacked on a phone it
          would eat most of the screen — so it goes landscape and full width. */}
      <div className="relative aspect-3/2 w-full shrink-0 sm:aspect-2/3 sm:h-60 sm:w-auto">
        {(!image || typeof image !== "object") && (
          <div className="bg-base-200 flex h-full w-full items-center justify-center rounded-lg text-xs">
            No Image
          </div>
        )}
        {image && typeof image === "object" && (
          <Media
            resource={image}
            // Two sizes to fix, both of which collapsed the image to 0 height:
            // Media wraps its <picture> in a plain div, which had no height for
            // `h-full` to resolve against; and <picture> is an inline element,
            // where width/height simply do not apply — hence `block`.
            className="h-full w-full"
            imgClassName="h-full w-full object-cover rounded-lg overflow-clip object-center shadow-xl absolute inset-0"
            pictureClassName="block h-full w-full rounded-lg overflow-clip object-center bg-base-200 shadow-lg"
            fill
          />
        )}
      </div>

      <div className="flex h-full min-w-0 flex-1 flex-col text-base sm:pr-4">
        {title && (
          <div className="w-full text-start text-base font-bold no-underline sm:text-xl">
            <h3>{title}</h3>
          </div>
        )}
        {subtitle && (
          <div className="w-full text-start text-base no-underline sm:text-xl">
            <h3>{subtitle}</h3>
          </div>
        )}
        {date && (
          <div className="not-prose mb-4 w-full text-start text-sm">{date}</div>
        )}
        {children && (
          <div className="line-clamp-7 w-full text-start text-xs font-light break-words sm:line-clamp-3 sm:text-sm md:line-clamp-5">
            {children}
          </div>
        )}
      </div>
    </article>
  );

  if (href) {
    return (
      <Link className={WRAPPER} href={href}>
        {article}
      </Link>
    );
  }

  if (link) {
    return (
      <CMSLink
        {...link}
        label={undefined}
        appearance="inline"
        className={WRAPPER}
      >
        {article}
      </CMSLink>
    );
  }

  return <div className={WRAPPER}>{article}</div>;
};
