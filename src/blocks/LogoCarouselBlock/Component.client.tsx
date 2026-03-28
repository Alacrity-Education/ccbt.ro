"use client";
import React from "react";
import type { LogoCarouselBlock as LogoCarouselProps, Media as MediaType } from "@/payload-types";
import { Media } from "@/components/Media";

export const LogoCarousel: React.FC<LogoCarouselProps> = ({ title, logos, speed = 30, gap = 24 }) => {
  const items = (logos || [])
    .map((l) => ({
      image: typeof l?.image === "object" ? (l.image as MediaType) : null,
      alt: l?.alt ?? "",
    }))
    .filter((i) => i.image);

  if (items.length === 0) return null;

  // Ensure we have enough items to fill the screen width to avoid visual gaps
  // If the list is short, we repeat it internally before creating the strips
  let loopItems = items;
  if (items.length < 6) {
    loopItems = [...items, ...items, ...items, ...items];
  }

  return (
    <div className="w-full h-max ">
      {title && (
        <h2 className="text-primary  text-center text-xl font-semibold md:text-3xl">{title}</h2>
      )}
      <section className="w-full py-10 h-max overflow-hidden">
        <div
          className="flex w-full select-none overflow-hidden"
          style={{
            // Tailwind v4: Pass dynamic values as CSS variables
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            "--marquee-duration": `${speed}s`,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            "--marquee-gap": `${gap}px`,
          }}
        >
          {/* Strip 1 */}
          <div className="animate-marquee flex min-w-full shrink-0 items-center justify-around gap-[var(--marquee-gap)] pr-[var(--marquee-gap)]">
            {loopItems.map((item, idx) => (
              <LogoItem key={`a-${idx}`} item={item} />
            ))}
          </div>

          {/* Strip 2 (Duplicate for seamless loop) */}
          <div aria-hidden="true" className="animate-marquee flex min-w-full shrink-0 items-center justify-around gap-[var(--marquee-gap)] pr-[var(--marquee-gap)]">
            {loopItems.map((item, idx) => (
              <LogoItem key={`b-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const LogoItem = ({ item }: { item: { image: MediaType | null; alt: string } }) => (
  <div className="relative h-38 w-38 md:h-38 md:w-38 shrink-0">
    <Media
      resource={item.image as MediaType}
      imgClassName="object-contain h-full w-full"
      fill
    />
  </div>
);
