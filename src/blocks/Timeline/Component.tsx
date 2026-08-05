"use client";
import React, { useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import type { TimelineBlock as TimelineBlockProps } from "@/payload-types";

import RichText from "@/components/RichText";
import { CMSLink } from "@/components/Link";
import { cn } from "@/utilities/ui";

type Entry = NonNullable<TimelineBlockProps["entries"]>[number];

// Coral "pivot" marker that straddles the rail above each column (verbatim SVG).
const Pivot: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="91"
    height="90"
    viewBox="0 0 91 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <g filter="url(#tl_pivot_shadow)">
      <path d="M24.1016 19V43.7886V74.4288V81H4.10156V74.4288V43.7886V19H24.1016Z" fill="#E84935" stroke="#E84935" strokeWidth="0.2" strokeMiterlimit="10" />
      <path d="M55.1016 0V7.81155V23.1979V31H35.1016V23.1979V7.81155V0H55.1016Z" fill="#E84935" />
      <path d="M55.1016 51V58.8115V74.1979V82H35.1016V74.1979V58.8115V51H55.1016Z" fill="#E84935" />
      <path d="M86.1016 19V43.7886V74.4288V81H65.1016V74.4288V43.7886V19H86.1016Z" fill="#E84935" stroke="#E84935" strokeWidth="0.2" strokeMiterlimit="10" />
    </g>
    <defs>
      <filter id="tl_pivot_shadow" x="0" y="0" width="90.2031" height="90" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);

// The coral arrowhead that caps the right end of the rail — the arrowhead portion
// of SVG 1 only (the horizontal bars are drawn in CSS so they can extend under it).
const RailCap: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className,
  style,
}) => (
  <svg
    className={className}
    style={style}
    viewBox="1183 0 171 89"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    preserveAspectRatio="xMinYMid slice"
  >
    <g filter="url(#tl_cap_f1)">
      <path d="M1303.86 77.2908L1293.85 67.0086L1274.14 46.7559L1264.14 36.4862L1278.48 22.5371L1288.47 32.8068L1308.18 53.0595L1318.19 63.3416L1303.86 77.2908Z" fill="#FB3524" />
    </g>
    <g filter="url(#tl_cap_f2)">
      <path d="M1347.35 37.0694L1336.96 47.4525L1316.51 67.904L1306.14 78.2745L1292 64.1323L1302.37 53.7618L1322.82 33.3103L1333.21 22.9272L1347.35 37.0694Z" fill="#FB3524" />
    </g>
    <g filter="url(#tl_cap_f3)">
      <path d="M1334.24 80.1155L1333.31 79.1688L1293.13 37.8789L1307.46 23.9298L1347.65 65.2196L1348.57 66.1663L1349.04 66.6466L1334.7 80.5958L1334.24 80.1155Z" fill="#5F0058" />
    </g>
    <g filter="url(#tl_cap_f4)">
      <path d="M1280.33 80.4007L1279.39 79.464L1238.54 38.6094L1252.68 24.4672L1293.54 65.3219L1294.47 66.2586L1294.95 66.7338L1280.81 80.876L1280.33 80.4007Z" fill="#5F0058" />
    </g>
    <g filter="url(#tl_cap_f5)">
      <path d="M1201.21 0.000199377L1217.74 16.5244L1250.29 49.072L1266.79 65.5761L1252.65 79.7183L1236.14 63.2141L1203.6 30.6665L1187.07 14.1423L1201.21 0.000199377Z" fill="#FB3524" />
    </g>
    <defs>
      {["tl_cap_f1", "tl_cap_f2", "tl_cap_f3", "tl_cap_f4", "tl_cap_f5"].map((id) => (
        <filter key={id} id={id} x="0" y="0" width="1400" height="120" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="fx" />
          <feBlend mode="normal" in="SourceGraphic" in2="fx" result="shape" />
        </filter>
      ))}
    </defs>
  </svg>
);

// Shared rail geometry (matches the SVG coordinate system, 89-unit tall zone).
const RAIL_H = 89;
const TOP_BAR = { top: 29, height: 20 };
const BOTTOM_BAR = { top: 60, height: 20 };

const TimelineEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const hasHref = entry.withLink && (entry.link?.url || entry.link?.reference);
  return (
    <div className="relative w-[300px] shrink-0 pr-10">
      {/* Pivot sits on the rail, above the content. */}
      <div style={{ height: RAIL_H }} className="relative">
        <Pivot className="absolute top-[21px] left-0 h-[90px] w-auto" />
      </div>
      <p className="text-secondary mt-10 mb-4 text-lg font-bold tracking-wide uppercase">
        {entry.date}
      </p>
      {entry.content && (
        <RichText
          className="[&_h3]:text-primary [&_h4]:text-primary text-base-content/80 [&_h3]:mt-5 [&_h3]:mb-1 [&_h3]:text-xl [&_h3]:font-bold [&_h4]:mt-5 [&_h4]:mb-1 [&_h4]:font-bold [&_p]:text-sm/relaxed"
          data={entry.content}
          enableGutter={false}
        />
      )}
      {hasHref && (
        <CMSLink
          {...entry.link}
          appearance="secondary"
          className="mt-6 text-xs font-semibold tracking-wide uppercase"
        />
      )}
    </div>
  );
};

export const TimelineBlock: React.FC<TimelineBlockProps> = ({ entries }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Start scrolled to the end so the arrow + latest entries are shown first;
  // scroll left to reach earlier entries.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  if (!entries || entries.length === 0) return null;

  const nudge = (dir: -1 | 1) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <div className="w-full pt-12 md:pt-16">
      {/* Full-bleed scroll area — the rail runs edge to edge, not capped to the container. */}
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* min-w-full keeps the rail spanning the whole screen even with few columns;
            justify-end right-aligns the entries against the arrow end. */}
        <div className="relative flex w-max min-w-full justify-end pt-2 pr-4 pl-6 sm:pl-8 lg:pl-12">
          {/* Rail: two purple bars spanning the full row, capped by the arrowhead.
              The cap shrinks on small screens so a card stays visible beside it. */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 right-0"
            style={{ height: RAIL_H }}
          >
            <div
              className="bg-primary absolute left-0 right-[70px] shadow-md sm:right-[138px]"
              style={{ top: TOP_BAR.top, height: TOP_BAR.height }}
            />
            <div
              className="bg-primary absolute left-0 right-[70px] sm:right-[138px]"
              style={{ top: BOTTOM_BAR.top, height: BOTTOM_BAR.height }}
            />
            <RailCap className="absolute top-1 right-6 h-[89px] w-[100px] sm:right-9 sm:w-[171px]" />
          </div>

          {entries.map((entry, i) => (
            <TimelineEntry key={entry.id ?? i} entry={entry} />
          ))}
          {/* Trailing space so the arrowhead cap sits past the last column when scrolling. */}
          <div className="w-[120px] shrink-0 sm:w-[210px]" />
        </div>
      </div>

      {/* Prev / next nudge controls. */}
      <div className="container mx-auto mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Scroll left"
          className="bg-secondary text-secondary-content flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform hover:-translate-y-0.5"
        >
          <FiChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Scroll right"
          className="bg-secondary text-secondary-content flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform hover:-translate-y-0.5"
        >
          <FiChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};
