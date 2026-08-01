import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/utilities/ui";
import Link from "next/link";
import React from "react";

import type { Page, Post } from "@/payload-types";

type CMSLinkType = {
  appearance?: "inline" | ButtonProps["variant"];
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
 * Maps a link appearance onto its daisyUI button class. The colors mirror the
 * "ccbt" theme tokens declared in globals.css: primary (purple), secondary
 * (coral), accent (cyan), neutral (ink) and success (green).
 */
const linkAppearance: Record<string, string> = {
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

  const size = appearance === "link" ? "clear" : sizeFromProps;
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
