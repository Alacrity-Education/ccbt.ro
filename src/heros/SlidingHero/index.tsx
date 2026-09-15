"use client";
import React, { Suspense, useEffect, useState } from "react";
import type { Page } from "@/payload-types";
import { CMSLink } from "@/components/Link";
import { resolveColor, type HeroColor } from "@/heros/heroColor";
import { HeroScrim } from "@/heros/HeroScrim";
import { HeroBackdrop } from "@/heros/HeroBackdrop";

type pageType = Page["hero"];

type NonNullable<T> = Exclude<T, null | undefined>; // Remove null and undefined from T

type Unpacked<T> = T extends (infer U)[] ? U : T;
type slidesType = pageType["slides"];
type slideType = NonNullable<Unpacked<slidesType>>;

type SlideControls = {
  slides: slidesType;
  visibleSlide: number;
  setVisibleSlide: (index: number) => void;
  timeout?: number | null;
};

export const SlidingHero: React.FC<Page["hero"] & { color?: HeroColor }> = ({
  slides,
  timeout,
  color = "purple",
}) => {
  const [visibleSlide, setVisibleSlide] = useState<number>(0);
  const sliderLength = slides?.length || 0;

  useEffect(() => {
    if (sliderLength === 0) return;

    const intervalId = setInterval(() => {
      setVisibleSlide((prev) => {
        return (prev + 1) % sliderLength;
      });
    }, timeout || 4000);

    return () => clearInterval(intervalId);
  }, [sliderLength, timeout, visibleSlide]);

  if (!sliderLength) {
    return null;
  }

  const len = slides?.length || 0;

  // 1. Calculate the neighbors accurately, handling the loop (wrap-around)
  const nextIndex = (visibleSlide + 1) % len;
  const prevIndex = (visibleSlide - 1 + len) % len;

  return (
    <div className="relative isolate flex h-[80svh] min-h-[30rem] w-full overflow-hidden text-white">
      {slides?.map((slide, index) => {
        // 2. Determine the state of this specific slide
        const isCurrent = index === visibleSlide;
        const isNext = index === nextIndex;
        const isPrev = index === prevIndex;

        // 3. Determine Position
        // If it's Previous, send it Left (-100%).
        // If it's Next (or any other future slide), send it Right (100%).
        // If it's Current, center it (0).
        let leftPosition = "100%";
        if (isCurrent) leftPosition = "0";
        else if (isPrev) leftPosition = "-100%";

        // 4. Determine Opacity
        // Only show the active loop members. Hide the rest to prevent glitches.
        const isVisible = isCurrent || isNext || isPrev;

        return (
          <div
            key={index}
            className={`absolute inset-0 h-full w-full transition-all duration-500 ease-in-out`}
            style={{
              left: leftPosition,
              opacity: isVisible ? 1 : 0,
              // Optimization: Remove pointer events from hidden slides so you can't click links on them
              pointerEvents: isCurrent ? "auto" : "none",
              zIndex: isCurrent ? "10" : "0",
            }}
          >
            <Suspense fallback={<div className={"loading-spinner"}> </div>}>
              <Slide
                slide={slide}
                fallbackColor={color}
                // The first slide is what the page paints on load, so it is the
                // LCP image and must not be deferred. The rest can wait.
                priority={index === 0}
              />
            </Suspense>
          </div>
        );
      })}

      {/* Slide indicators — a single overlay pinned to the bottom of the hero. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-10 z-30 sm:bottom-14">
        <div className="container mx-auto">
          <SlideIndicators
            slides={slides}
            visibleSlide={visibleSlide}
            setVisibleSlide={setVisibleSlide}
            timeout={timeout}
          />
        </div>
      </div>
    </div>
  );
};

const Slide = ({
  slide,
  fallbackColor,
  priority = false,
}: {
  slide: slideType;
  fallbackColor: HeroColor;
  priority?: boolean;
}) => {
  const { media, mediaMobile, objectFit, title, subtitle, cta } = slide;
  // Each slide sets its own gradient color; fall back to the hero-level color.
  const { bg, dark } = resolveColor(
    (slide.color as HeroColor) ?? fallbackColor,
  );

  return (
    <div
      // Low in the frame, matching the home hero. The bottom padding also clears
      // the slide indicators, which are pinned at bottom-10 / sm:bottom-14.
      className={`relative flex h-full items-end overflow-hidden ${dark ? "text-white" : "text-base-content"}`}
      data-theme={dark ? "dark" : undefined}
    >
      <div className="font-base relative z-20 container mx-auto pt-24 pb-24 sm:pb-28">
        <div className="max-w-4xl md:text-start">
          {title && (
            <h1 className="mb-5 max-w-[15ch] text-4xl leading-[0.98] font-semibold tracking-tight text-balance sm:text-5xl md:text-7xl md:leading-[0.95]">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mb-6 max-w-2xl text-lg text-balance sm:text-xl md:text-2xl xl:text-3xl">
              {subtitle}
            </p>
          )}
          {cta && cta.enable && cta.link && (
            <CMSLink
              {...cta.link}
              size="lg"
              appearance={
                // The CMS appearance field defaults to "default" (never null), so a
                // plain `?? "secondary"` never fires. Treat unset/"default" as coral
                // here while still honouring an explicit colour choice.
                !cta.link.appearance || cta.link.appearance === "default"
                  ? "secondary"
                  : cta.link.appearance
              }
              className="mt-2"
            />
          )}
        </div>
      </div>

      {/* Static, and no longer drifting — see the note in heros/Home. The slide
          already moves; the image panning inside it as well was what made the
          edges show. */}
      {/* Scrim after the image — see the note in heros/Home. */}
      <div className="absolute inset-0 z-0 select-none">
        <HeroBackdrop
          desktop={media}
          mobile={mediaMobile}
          priority={priority}
          objectFit={objectFit}
          className="absolute inset-0 h-full w-full"
          imgClassName="object-center"
        />
        <HeroScrim color={bg} />
      </div>
    </div>
  );
};

const SlideIndicators = ({
  slides,
  visibleSlide,
  setVisibleSlide,
  timeout,
}: SlideControls) => {
  return (
    <div className="pointer-events-auto flex w-max flex-row gap-4 sm:gap-3">
      {slides?.map((slide, index) => {
        const isCurrent = index === visibleSlide;
        const slideTimeout = timeout || 4000;

        return (
          <div
            key={"index_slide" + index}
            onClick={() => setVisibleSlide(index)}
            // The container acts as the track
            className="relative h-4 cursor-pointer overflow-hidden rounded-lg bg-white/40 shadow-lg transition-all duration-300 sm:h-3"
            style={{
              width: isCurrent ? "6rem " : "1.5rem",
            }}
          >
            {/* The inner div acts as the animated fill */}
            <div
              className="h-full bg-white ease-linear"
              style={{
                width: isCurrent ? "100%" : "0%",
                transitionProperty: "width",
                // Animate over the timeout duration if active, snap to 0 immediately if inactive
                transitionDuration: isCurrent ? `${slideTimeout}ms` : "0ms",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
