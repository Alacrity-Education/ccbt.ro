import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/utilities/ui";
import Link from "next/link";
import React from "react";

import type { Page, Post } from "@/payload-types";

type CMSLinkType = {
  appearance?:
    | "inline"
    | "brand"
    | "brandPlinth"
    | "brandInvert"
    | "brandInvertPlinth"
    | ButtonProps["variant"];
  children?: React.ReactNode;
  className?: string;
  label?: string | null;
  newTab?: boolean | null;
  reference?: {
    relationTo: "pages" | "posts";
    value: Page | Post | string | number;
  } | null;
  size?: ButtonProps["size"] | null;
  type?: "custom" | "reference" | null;
  url?: string | null;
};

/**
 * Maps a link appearance onto its button class.
 *
 * `brand` is the site's action button (.btn-brand in globals.css) and the
 * default for new links; `brandInvert` is the same button with its fills swapped
 * for saturated panels. The `*Plinth` pair adds the offset rectangle behind the
 * face, which is off by default. The daisyUI colors below are kept for the
 * heroes, which are excluded from the single-button rule.
 */
const linkAppearance: Record<string, string> = {
  brand: "btn-brand",
  brandPlinth: "btn-brand btn-brand-plinth",
  brandInvert: "btn-brand btn-brand-invert",
  brandInvertPlinth: "btn-brand btn-brand-invert btn-brand-plinth",
  default: "btn btn-primary",
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  accent: "btn btn-accent",
  neutral: "btn btn-neutral",
  success: "btn btn-success",
  outline: "btn btn-outline",
  transparent: "btn btn-ghost",
  ghost: "btn btn-ghost",
}

/** Maps a button size onto its daisyUI size class. */
const linkSize: Record<string, string> = {
  clear: "",
  default: "",
  icon: "btn-square",
  lg: "btn-lg",
  sm: "btn-sm",
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = "inline",
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props;

  const href =
    type === "reference" &&
    typeof reference?.value === "object" &&
    reference.value.slug
      ? `${reference?.relationTo !== "pages" ? `/${reference?.relationTo}` : ""}/${
          reference.value.slug
        }`
      : url;

  if (!href) return null;

  // The brand button ships at one size, so the daisyUI size modifiers (which
  // also expect a `.btn` base it does not have) are dropped for it.
  const isBrand = String(appearance ?? "").startsWith("brand");
  const size = appearance === "link" || isBrand ? "clear" : sizeFromProps;
  const newTabProps = newTab
    ? { rel: "noopener noreferrer", target: "_blank" }
    : {};

  /* Ensure we don't break any styles set by richText */
  if (appearance === "inline") {
    return (
      <Link className={cn(className)} href={href || url || ""} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    );
  }

  return (
    <Link
      className={cn(
        linkAppearance[appearance as string] ?? "btn",
        size ? linkSize[size] : undefined,
        className,
      )}
      href={href || url || ""}
      {...newTabProps}
    >
      {label && label}
      {children && children}
    </Link>
  );
};
