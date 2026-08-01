"use client";
import React from "react";

import type { Page } from "@/payload-types";
import { Media } from "@/components/Media";
import { CMSLink } from "@/components/Link";
import { cn } from "@/utilities/ui";
import { BRAND, type HeroSurfaceColor } from "@/utilities/brand";

export type HeroImpact = "high" | "medium" | "low";
export type HeroColor = HeroSurfaceColor;

type HeroProps = Page["hero"] & {
  impact: HeroImpact;
  color: HeroColor;
};

type HeroContent = {
  title?: string | null;
  subtitle?: string | null;
  body?: string | null;
  media?: any;
  ctaLink?: any;
};

export function resolveColor(color: HeroColor) {
  const entry = BRAND[color] ?? BRAND.base;
  return { bg: entry.cssVar ?? entry.hex, dark: entry.dark };
}

/** CTA button that stays legible on any surface. */
const HeroCta: React.FC<{ ctaLink: any; dark: boolean }> = ({ ctaLink, dark }) => {
  if (!ctaLink?.label) return null;
  const hasHref = ctaLink?.url || ctaLink?.reference;
  if (!hasHref) return null;

  return (
    <CMSLink
      {...ctaLink}
      size={"lg"}
    />
  );
};

export const Hero: React.FC<HeroProps> = (props) => {
  const { impact, color } = props;
  const { title, subtitle, body, media, ctaLink } =
    props as unknown as HeroContent;

  const { bg, dark } = resolveColor(color);

  const bodyClass = dark ? "text-white/90" : "text-base-content/80";

  /* ----------------------------- HIGH IMPACT ----------------------------- */
  if (impact === "high") {
    return (
      <section
        className={cn(
          "relative flex h-[80vh] items-center overflow-hidden",
          dark ? "text-white" : "text-base-content",
        )}
        data-theme={dark ? "dark" : undefined}
      >
        <div className="font-base relative z-20 container mx-auto flex h-full items-center justify-start">
          <div className="max-w-4xl pb-8 md:text-start">
            {title && (
              <h1 className="mb-5 max-w-[15ch] lg:max-w-1/2 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-7xl lg:text-7xl xl:text-7xl leading-[0.98] md:leading-[0.95]">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mb-6 max-w-2xl text-lg text-balance sm:text-xl md:text-2xl xl:text-3xl">
                {subtitle}
              </p>
            )}
            {body && (
              <p className={cn("mb-8 max-w-xl text-sm sm:text-base md:text-lg", bodyClass)}>
                {body}
              </p>
            )}
            <HeroCta ctaLink={ctaLink} dark />
          </div>
        </div>

        <div className="absolute inset-0 z-0 select-none">
          <div
            className="absolute z-10 h-full w-full"
            style={{ background: `linear-gradient(to right, ${bg} ,${bg} 30%, transparent )` }}
          />
          {media && (
            <Media
              fill
              priority
              resource={media}
              pictureClassName="absolute h-[80vh] w-[160vh] left-1/2 -ml-[80vh] sm:h-full sm:w-full sm:left-0 sm:ml-0"
              imgClassName="object-cover z-0 animate-ken-burns sm:animate-none"
            />
          )}
        </div>
      </section>
    );
  }

  /* ---------------------------- MEDIUM IMPACT ---------------------------- */
  if (impact === "medium") {
    return (
      <section
        className={cn(
          "relative overflow-hidden",
          dark ? "text-white" : "text-base-content",
        )}
        style={{ background: bg }}
        data-theme={dark ? "dark" : undefined}
      >
        <div className="font-base container mx-auto grid items-center gap-10 py-16 md:grid-cols-2 md:gap-14 md:py-24">
          <div className="max-w-xl">
            {title && (
              <h1 className="mb-5 text-4xl font-semibold text-balance md:text-5xl xl:text-6xl">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mb-5 text-xl text-balance md:text-2xl xl:text-3xl">
                {subtitle}
              </p>
            )}
            {body && (
              <p className={cn("mb-8 text-base md:text-lg", bodyClass)}>{body}</p>
            )}
            <HeroCta ctaLink={ctaLink} dark={dark} />
          </div>

          {media && (
            <div className="rounded-box relative aspect-4/3 w-full overflow-hidden">
              <Media
                fill
                resource={media}
                pictureClassName="absolute inset-0 h-full w-full"
                imgClassName="object-cover"
              />
            </div>
          )}
        </div>
      </section>
    );
  }

  /* ------------------------------ LOW IMPACT ----------------------------- */
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        dark ? "text-white" : "text-base-content",
      )}
      style={{ background: bg }}
      data-theme={dark ? "dark" : undefined}
    >
      <div className="font-base mx-auto container py-14 md:py-20">
        <div className="max-w-3xl">
          {title && (
            <h1 className="mb-4 text-3xl font-semibold text-balance md:text-4xl xl:text-5xl">
              {title}
            </h1>
          )}
          {body && (
            <p className={cn("mb-6 text-base md:text-lg", bodyClass)}>{body}</p>
          )}
          <HeroCta ctaLink={ctaLink} dark={dark} />
        </div>
      </div>
    </section>
  );
};
