"use client";

import React, { useEffect, useState } from "react";

import type { Post } from "@/payload-types";

import { HeroBackdrop } from "@/heros/HeroBackdrop";
import { HeroScrim } from "@/heros/HeroScrim";
import { resolveColor, type HeroOverlay } from "@/heros/heroColor";

export type PostSlide = NonNullable<Post["heroSlides"]>[number];

/**
 * The layer behind a post's hero copy: one image, or several cycling.
 *
 * Only the backdrop moves. A post is a single article — its title, categories,
 * author and date belong to the whole thing — so unlike the page's sliding hero
 * there is no per-slide text, and the copy stays put while the picture changes.
 *
 * That is also why these dissolve rather than slide across as the page hero's
 * do: with the title fixed on top, a backdrop travelling sideways underneath it
 * reads as the text being left behind. A dissolve keeps the title the anchor.
 *
 * A single slide never starts a timer and draws no indicators, so it is an
 * ordinary post hero in everything but the code path.
 */
export const PostHeroSlides: React.FC<{
  slides: PostSlide[];
  timeout?: number | null;
}> = ({ slides, timeout }) => {
  const count = slides.length;
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (count < 2) return;

    const id = setInterval(
      () => setVisible((current) => (current + 1) % count),
      timeout || 6000,
    );

    return () => clearInterval(id);
  }, [count, timeout]);

  if (count === 0) return null;

  return (
    <>
      <div className="absolute inset-0 h-full w-full select-none">
        {slides.map((slide, index) => {
          const { bg } = resolveColor(
            (slide.overlayColor as HeroOverlay) ?? "purple",
          );
          const isCurrent = index === visible;

          return (
            <div
              key={slide.id ?? index}
              aria-hidden={!isCurrent}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              // The colour sits under the image for the same reason it does in
              // the page heroes: it is what a letterboxed image's bars are
              // filled with. With no overlay chosen there is nothing to fill
              // them with, and the page shows through.
              style={{ opacity: isCurrent ? 1 : 0, backgroundColor: bg }}
            >
              <HeroBackdrop
                desktop={slide.media}
                mobile={slide.mediaMobile}
                // The first slide is what the post paints on load, so it is the
                // LCP image and must not be deferred. The rest can wait.
                priority={index === 0}
                className="absolute inset-0 h-full w-full"
                imgClassName="object-center"
              />
              <HeroScrim color={bg} />
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20">
          <div className="container mx-auto flex justify-end">
            <div className="pointer-events-auto flex w-max flex-row gap-4 sm:gap-3">
              {slides.map((slide, index) => {
                const isCurrent = index === visible;

                return (
                  <button
                    key={slide.id ?? index}
                    type="button"
                    aria-label={`Slide ${index + 1}`}
                    aria-current={isCurrent}
                    onClick={() => setVisible(index)}
                    className="relative h-4 cursor-pointer overflow-hidden rounded-lg bg-white/40 shadow-lg transition-all duration-300 sm:h-3"
                    style={{ width: isCurrent ? "6rem" : "1.5rem" }}
                  >
                    {/* Fills over the slide's own duration, so the bar doubles
                        as the countdown to the next one. */}
                    <span
                      className="block h-full bg-white ease-linear"
                      style={{
                        width: isCurrent ? "100%" : "0%",
                        transitionProperty: "width",
                        transitionDuration: isCurrent
                          ? `${timeout || 6000}ms`
                          : "0ms",
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
