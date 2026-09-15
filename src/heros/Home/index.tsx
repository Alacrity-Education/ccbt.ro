"use client";
import React from "react";

import type { Page } from "@/payload-types";
import { CMSLink } from "@/components/Link";
import { cn } from "@/utilities/ui";
import { HeroScrim } from "@/heros/HeroScrim";
import { HeroBackdrop } from "@/heros/HeroBackdrop";
import { resolveColor, type HeroColor } from "@/heros/heroColor";

export type HeroImpact = "high" | "medium" | "low";
export type { HeroColor };

type HeroProps = Page["hero"] & {
  impact: HeroImpact;
  color: HeroColor;
};

type HeroContent = {
  title?: string | null;
  subtitle?: string | null;
  body?: string | null;
  media?: any;
  mediaMobile?: any;
  ctaLink?: any;
};

// Re-exported so existing importers keep working; it lives in heros/heroColor
// because this file is a client module and the server heroes need to call it.
export { resolveColor };

/** CTA button that stays legible on any surface. */
const HeroCta: React.FC<{ ctaLink: any; dark: boolean }> = ({
  ctaLink,
  dark,
}) => {
  if (!ctaLink?.label) return null;
  const hasHref = ctaLink?.url || ctaLink?.reference;
  if (!hasHref) return null;

  return <CMSLink {...ctaLink} size={"lg"} />;
};

export const Hero: React.FC<HeroProps> = (props) => {
  const { impact, color } = props;
  const { title, subtitle, body, media, mediaMobile, ctaLink, objectFit } =
    props as unknown as HeroContent & { objectFit?: "cover" | "contain" | null };

  const { bg, dark } = resolveColor(color);

  const bodyClass = dark ? "text-white/90" : "text-base-content/80";

  /* ----------------------------- HIGH IMPACT ----------------------------- */
  if (impact === "high") {
    return (
      <section
        className={cn(
          // Copy sits low in the frame rather than centred, which puts it where
          // the scrim is densest and leaves the top of the image uncovered.
          "relative flex min-h-[80svh] items-end overflow-hidden",
          dark ? "text-white" : "text-base-content",
        )}
        data-theme={dark ? "dark" : undefined}
      >
        <div className="font-base relative z-20 container mx-auto pt-24 pb-14 sm:pb-16">
          <div className="max-w-4xl md:text-start">
            {title && (
              <h1 className="mb-5 max-w-[15ch] text-4xl leading-[0.98] font-semibold tracking-tight text-balance sm:text-5xl md:text-7xl md:leading-[0.95] lg:max-w-1/2 lg:text-7xl xl:text-7xl">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mb-6 max-w-2xl text-lg text-balance sm:text-xl md:text-2xl xl:text-3xl">
                {subtitle}
              </p>
            )}
            {body && (
              <p
                className={cn(
                  "mb-8 max-w-xl text-sm sm:text-base md:text-lg",
                  bodyClass,
                )}
              >
                {body}
              </p>
            )}
            <HeroCta ctaLink={ctaLink} dark />
          </div>
        </div>

        {/* Static. This used to drift under `animate-ken-burns`, which paired a
            15% translate with a 1.05 scale — the image only overhangs the frame
            by 2.5% a side at that scale, so the pan walked a bare edge into view.
            It was also `sm:animate-none`, so phones were the only place it ran. */}
        {/* Scrim after the image, not before: both sit at stacking level 0, so
            painting order is what decides, and an image that came second would
            cover the wash. Ordering keeps that true whatever the z-indexes are. */}
        <div className="absolute inset-0 z-0 select-none">
          <HeroBackdrop
            desktop={media}
            mobile={mediaMobile}
            priority
            objectFit={objectFit}
            className="absolute inset-0 h-full w-full"
            imgClassName="object-center"
          />
          <HeroScrim color={bg} />
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
              <p className={cn("mb-8 text-base md:text-lg", bodyClass)}>
                {body}
              </p>
            )}
            <HeroCta ctaLink={ctaLink} dark={dark} />
          </div>

          {(media || mediaMobile) && (
            <div className="rounded-box relative aspect-4/3 w-full overflow-hidden">
              <HeroBackdrop
                desktop={media}
                mobile={mediaMobile}
                objectFit={objectFit}
                className="absolute inset-0 h-full w-full"
                sizes="(max-width: 767px) 100vw, 50vw"
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
      <div className="font-base container mx-auto py-14 md:py-20">
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
