"use client";
import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import type { TimelineBlock as TimelineBlockProps } from "@/payload-types";

import RichText from "@/components/RichText";
import { CMSLink } from "@/components/Link";
import { Button } from "@/components/ui/button";
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
      <path
        d="M24.1016 19V43.7886V74.4288V81H4.10156V74.4288V43.7886V19H24.1016Z"
        fill="#E84935"
        stroke="#E84935"
        strokeWidth="0.2"
        strokeMiterlimit="10"
      />
      <path
        d="M55.1016 0V7.81155V23.1979V31H35.1016V23.1979V7.81155V0H55.1016Z"
        fill="#E84935"
      />
      <path
        d="M55.1016 51V58.8115V74.1979V82H35.1016V74.1979V58.8115V51H55.1016Z"
        fill="#E84935"
      />
      <path
        d="M86.1016 19V43.7886V74.4288V81H65.1016V74.4288V43.7886V19H86.1016Z"
        fill="#E84935"
        stroke="#E84935"
        strokeWidth="0.2"
        strokeMiterlimit="10"
      />
    </g>
    <defs>
      <filter
        id="tl_pivot_shadow"
        x="0"
        y="0"
        width="90.2031"
        height="90"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

// The coral arrowhead that caps the right end of the rail — the arrowhead portion
// of SVG 1 only (the horizontal bars are drawn in CSS so they can extend under it).
const RailCap: React.FC<{
  className?: string;
  style?: React.CSSProperties;
}> = ({ className, style }) => (
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
      <path
        d="M1303.86 77.2908L1293.85 67.0086L1274.14 46.7559L1264.14 36.4862L1278.48 22.5371L1288.47 32.8068L1308.18 53.0595L1318.19 63.3416L1303.86 77.2908Z"
        fill="#FB3524"
      />
    </g>
    <g filter="url(#tl_cap_f2)">
      <path
        d="M1347.35 37.0694L1336.96 47.4525L1316.51 67.904L1306.14 78.2745L1292 64.1323L1302.37 53.7618L1322.82 33.3103L1333.21 22.9272L1347.35 37.0694Z"
        fill="#FB3524"
      />
    </g>
    <g filter="url(#tl_cap_f3)">
      <path
        d="M1334.24 80.1155L1333.31 79.1688L1293.13 37.8789L1307.46 23.9298L1347.65 65.2196L1348.57 66.1663L1349.04 66.6466L1334.7 80.5958L1334.24 80.1155Z"
        fill="#5F0058"
      />
    </g>
    <g filter="url(#tl_cap_f4)">
      <path
        d="M1280.33 80.4007L1279.39 79.464L1238.54 38.6094L1252.68 24.4672L1293.54 65.3219L1294.47 66.2586L1294.95 66.7338L1280.81 80.876L1280.33 80.4007Z"
        fill="#5F0058"
      />
    </g>
    <g filter="url(#tl_cap_f5)">
      <path
        d="M1201.21 0.000199377L1217.74 16.5244L1250.29 49.072L1266.79 65.5761L1252.65 79.7183L1236.14 63.2141L1203.6 30.6665L1187.07 14.1423L1201.21 0.000199377Z"
        fill="#FB3524"
      />
    </g>
    <defs>
      {["tl_cap_f1", "tl_cap_f2", "tl_cap_f3", "tl_cap_f4", "tl_cap_f5"].map(
        (id) => (
          <filter
            key={id}
            id={id}
            x="0"
            y="0"
            width="1400"
            height="120"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend mode="normal" in2="BackgroundImageFix" result="fx" />
            <feBlend mode="normal" in="SourceGraphic" in2="fx" result="shape" />
          </filter>
        ),
      )}
    </defs>
  </svg>
);

// Mobile header rail: the two purple bars with the coral pivot standing on them.
// Its paths run from -7 to 1608 across a 1602 viewBox, so the bars bleed off both
// ends however wide it is drawn — it is meant to go edge to edge.
const TopRail: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 1602 322"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M1589.84 166.798H1554.05H-7V101.552H1554.05H1589.84H1608V166.798H1589.84Z"
      fill="#5F0058"
    />
    <g filter="url(#tl_toprail_shadow)">
      <path
        d="M1581.46 65.2412H1547.02H1529.55H-7V0.0001297H1529.55H1547.02H1581.46H1598.94V65.2412H1581.46Z"
        fill="#5F0058"
      />
    </g>
    <g filter="url(#tl_toprail_shadow)">
      <path
        d="M459.545 0.000198364V25.6259V76.1007V101.695H384.039V76.1007V25.6259V0.000198364H459.545Z"
        fill="#E84935"
      />
      <path
        d="M342.506 62.3295V143.648V244.163V265.72H267V244.163V143.648V62.3295H342.506Z"
        fill="#E84935"
        stroke="#E84935"
        strokeWidth="0.2"
        strokeMiterlimit="10"
      />
      <path
        d="M459 166V203.294V276.751V314H383V276.751V203.294V166H459Z"
        fill="#E84935"
      />
      <path
        d="M576.571 62.3295V143.648V244.163V265.72H497.289V244.163V143.648V62.3295H576.571Z"
        fill="#E84935"
        stroke="#E84935"
        strokeWidth="0.2"
        strokeMiterlimit="10"
      />
    </g>
    <defs>
      <filter
        id="tl_toprail_shadow"
        x="-40"
        y="-40"
        width="1700"
        height="420"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="fx" />
        <feBlend mode="normal" in="SourceGraphic" in2="fx" result="shape" />
      </filter>
    </defs>
  </svg>
);

// Mobile rail: the arrowhead turned on its side plus the long purple bar running
// down the right edge of the block.
//
// The artwork is 2270 tall but its bar ends — the "foot" — at 1879.48, so the
// viewBox is cropped there: with `meet` the foot then lands exactly on the bottom
// edge of the box it is given, and dropping the dead 390 units scales everything
// else up. `xMinYMax` keeps it pinned bottom-left if the box ratio ever differs.
const VRAIL_W = 415;
const VRAIL_FOOT = 1879.48;

const VerticalRail: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox={`0 0 ${VRAIL_W} ${VRAIL_FOOT}`}
    preserveAspectRatio="xMinYMax meet"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M264.615 512.015L258.895 517.735L9.42969 767.2L97.0025 854.773L346.468 605.307L352.187 599.588L355.089 596.686L267.517 509.113L264.615 512.015Z"
      fill="#5F0058"
    />
    <path
      d="M259.443 165.244L253.723 170.964L4.25781 420.429L91.8306 508.002L341.296 258.536L347.016 252.817L349.918 249.915L262.345 162.342L259.443 165.244Z"
      fill="#5F0058"
    />
    <path
      d="M9.57812 780.585V805.216V1879.48H133.388V805.216V780.585V768.088H9.57812V780.585Z"
      fill="#5F0058"
    />
    <g filter="url(#tl_vrail_shadow)">
      <path
        d="M17.4954 267.621L81.0628 329.586L206.272 451.638L269.762 513.528L356 424.779L292.51 362.889L167.301 240.837L103.733 178.872L17.4954 267.621Z"
        fill="#E84935"
      />
    </g>
    <path
      d="M274.827 10.456L210.636 74.7492L84.1981 201.387L20.0844 265.603L107.516 353.172L171.629 288.957L298.067 162.319L362.259 98.0257L274.827 10.456Z"
      fill="#E84935"
    />
    <g filter="url(#tl_vrail_shadow)">
      <path
        d="M8.70035 91.6436L14.5532 97.3489L269.82 346.181L356.058 257.432L100.791 8.60017L94.9384 2.89486L91.9688 0.000172625L5.73081 88.7489L8.70035 91.6436Z"
        fill="#5F0058"
      />
    </g>
    <g filter="url(#tl_vrail_shadow)">
      <path
        d="M6.93717 425.431L12.7283 431.232L265.305 684.208L352.736 596.638L100.16 343.662L94.3684 337.861L91.4302 334.919L3.99896 422.488L6.93717 425.431Z"
        fill="#5F0058"
      />
    </g>
    <path
      d="M503.999 915.325L401.841 813.006L200.621 611.467L98.5875 509.272L11.1562 596.841L113.19 699.037L314.41 900.576L416.568 1002.9L503.999 915.325Z"
      fill="#E84935"
    />
    <defs>
      {/* The three filters in the export are identical apart from their bounds, so
          one region generous enough to cover every path replaces all of them. */}
      <filter
        id="tl_vrail_shadow"
        x="-40"
        y="-40"
        width="620"
        height="2400"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="fx" />
        <feBlend mode="normal" in="SourceGraphic" in2="fx" result="shape" />
      </filter>
    </defs>
  </svg>
);

// Shared rail geometry (matches the SVG coordinate system, 89-unit tall zone).
const RAIL_H = 89;
const TOP_BAR = { top: 29, height: 20 };
const BOTTOM_BAR = { top: 60, height: 20 };

// How much of the stack the mobile window aims to show at once. It is a target,
// not a cap: entries are never split, so a page takes the exact height of the
// whole entries on it — two text-heavy ones, or more short ones.
const MOBILE_PAGE_H = 560;

type Page = { top: number; height: number };

/**
 * Groups measured entry heights into pages of whole entries, filling up to
 * MOBILE_PAGE_H. An entry taller than the target gets a page of its own rather
 * than being cut in half.
 */
const buildPages = (heights: number[]): Page[] => {
  const pages: Page[] = [];
  let top = 0;
  let height = 0;

  for (const h of heights) {
    if (height > 0 && height + h > MOBILE_PAGE_H) {
      pages.push({ top, height });
      top += height;
      height = h;
    } else {
      height += h;
    }
  }
  if (height > 0) pages.push({ top, height });

  return pages;
};

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
        <CMSLink {...entry.link} appearance="brand" className="mt-6" />
      )}
    </div>
  );
};

// Mobile entry: no pivot — the rail moved to the right edge of the block — so the
// entry is just the date, the copy and, for events, its button underneath.
const StackedEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const hasHref = entry.withLink && (entry.link?.url || entry.link?.reference);
  return (
    <div className="font-barlow-semi pb-9 font-bold">
      {/* The entry's title. 72px — four times the 18px it used to be. */}
      <p className="text-primary mb-2 text-7xl leading-[0.9] font-bold">
        {entry.date}
      </p>
      {entry.content && (
        <RichText
          className="[&_h3]:text-primary [&_h4]:text-primary text-base-content [&_h3]:mt-2 [&_h3]:mb-2 [&_h3]:text-5xl [&_h3]:leading-[0.95] [&_h3]:font-bold [&_h4]:mt-2 [&_h4]:mb-2 [&_h4]:text-4xl [&_h4]:leading-tight [&_h4]:font-bold [&_p]:text-[27px]/snug [&_p]:font-semibold"
          data={entry.content}
          enableGutter={false}
        />
      )}
      {hasHref && (
        <CMSLink {...entry.link} appearance="brand" className="mt-5" />
      )}
    </div>
  );
};

// Prev / next controls, shared by both layouts. `size` scales the whole control;
// mobile runs them at 1.2x, desktop keeps the original 48px.
const NudgeControls: React.FC<{
  className?: string;
  iconClassName?: string;
  buttonClassName?: string;
  onNudge: (dir: -1 | 1) => void;
}> = ({
  className,
  iconClassName = "h-6 w-6",
  buttonClassName = "h-12 w-12",
  onNudge,
}) => (
  <div className={className}>
    <Button
      variant="secondary"
      size="icon"
      onClick={() => onNudge(-1)}
      aria-label="Înapoi"
      className={cn(
        "rounded-full shadow-lg transition-transform hover:-translate-y-0.5",
        buttonClassName,
      )}
    >
      <FiChevronLeft className={iconClassName} />
    </Button>
    <Button
      variant="secondary"
      size="icon"
      onClick={() => onNudge(1)}
      aria-label="Înainte"
      className={cn(
        "rounded-full shadow-lg transition-transform hover:-translate-y-0.5",
        buttonClassName,
      )}
    >
      <FiChevronRight className={iconClassName} />
    </Button>
  </div>
);

export const TimelineBlock: React.FC<TimelineBlockProps> = ({ entries }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<Page[]>([]);
  const [pageIdx, setPageIdx] = useState(0);

  // Start scrolled to the end so the arrow + latest entries are shown first;
  // scroll left to reach earlier entries.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  // Measure the stacked entries and regroup them into pages. Observing the stack
  // (not the window) keeps this out of the window's own height changes, and picks
  // up rich text reflowing on rotate or a font swap.
  useEffect(() => {
    const el = stackRef.current;
    if (!el) return;

    const measure = () => {
      const heights = Array.from(el.children).map(
        (kid) => (kid as HTMLElement).offsetHeight,
      );
      setPages(buildPages(heights));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [entries]);

  if (!entries || entries.length === 0) return null;

  const nudge = (dir: -1 | 1) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  // Mobile moves a whole page of entries at a time, so nothing ever shows half a
  // text or an orphaned button.
  const page = (dir: -1 | 1) => {
    if (!pages.length) return;
    const next = Math.min(Math.max(pageIdx + dir, 0), pages.length - 1);
    setPageIdx(next);
    windowRef.current?.scrollTo({ top: pages[next].top, behavior: "smooth" });
  };

  // The window takes the exact height of the page it shows, so a long entry
  // expands the block instead of getting clipped.
  const windowHeight = pages[pageIdx]?.height ?? MOBILE_PAGE_H;

  return (
    <>
      {/* ---------- Mobile: entries stacked in a column, rail down the right ---------- */}
      {/* The bottom padding is the gap the rail runs through: the foot is pinned to
          the padding edge, so the bar carries on past the controls and is cut off
          exactly where the next block starts.
          RenderBlocks wraps every block in `mb-16`, and a margin is outside this
          box — nothing can be painted in it. So the 64px is taken into the padding
          instead and given back with `-mb-16`: same rhythm, but the rail now runs
          through that gap too and is clipped at the far edge of it. */}
      <div className="relative -mb-16 w-full overflow-hidden pb-36 md:hidden">
        {/* Topmost thing in the block, edge to edge — no container padding. */}
        <TopRail className="block h-auto w-full" />

        {/* Pinned bottom-right, height taken from the artwork's own ratio: the foot
            lands on the block's bottom edge and the arrowhead runs off the right. */}
        {/* Scaled down on narrow phones so the copy keeps a usable measure — the
            artwork's height follows its width, so this shrinks it whole. */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 bottom-0 w-[84px] min-[400px]:w-[104px] min-[520px]:w-[124px] sm:w-[140px]"
        >
          <VerticalRail className="h-auto w-full" />
        </div>

        <div className="relative mt-10 flex items-start">
          <div className="min-w-0 flex-1 pr-4 pl-6">
            {/* The window onto the stack: you see as many whole entries as fit, the
                buttons bring the next ones in. overflow-hidden (not auto) so the
                block never hijacks the page's own vertical scroll. */}
            <div
              ref={windowRef}
              className="overflow-hidden transition-[height] duration-300"
              style={{ height: windowHeight }}
            >
              <div ref={stackRef}>
                {entries.map((entry, i) => (
                  <StackedEntry key={entry.id ?? i} entry={entry} />
                ))}
              </div>
            </div>

            {/* 1.2x the 48px default, and capped in width so the pair sits closer. */}
            <NudgeControls
              className="mt-2 flex max-w-[240px] items-center justify-between"
              buttonClassName="h-[58px] w-[58px]"
              iconClassName="h-7 w-7"
              onNudge={page}
            />
          </div>

          {/* Reserves the rail's lane — the rail itself is out of flow, behind this
              row — plus clearance so the copy never touches the artwork. Tracks the
              rail's widths above; the rail is right-anchored, so widening its lane
              is what moves the copy off it. */}
          <div
            aria-hidden
            className="w-[104px] shrink-0 min-[400px]:w-[128px] min-[520px]:w-[152px] sm:w-[172px]"
          />
        </div>
      </div>

      {/* ---------- Desktop: the horizontal rail, unchanged ---------- */}
      <div className="hidden w-full pt-12 md:block md:pt-16">
        {/* Full-bleed scroll area — the rail runs edge to edge, not capped to the container. */}
        <div
          ref={scrollRef}
          className="w-full [scrollbar-width:none] overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden"
        >
          {/* min-w-full keeps the rail spanning the whole screen even with few columns;
            justify-end right-aligns the entries against the arrow end. */}
          <div className="relative flex w-max min-w-full justify-end pt-2 pr-4 pl-6 sm:pl-8 lg:pl-12">
            {/* Rail: two purple bars spanning the full row, capped by the arrowhead.
              The cap shrinks on small screens so a card stays visible beside it. */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 right-0 left-0"
              style={{ height: RAIL_H }}
            >
              <div
                className="bg-primary absolute right-[70px] left-0 shadow-md sm:right-[138px]"
                style={{ top: TOP_BAR.top, height: TOP_BAR.height }}
              />
              <div
                className="bg-primary absolute right-[70px] left-0 sm:right-[138px]"
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
        <NudgeControls
          className="container mx-auto mt-8 flex items-center justify-between"
          onNudge={nudge}
        />
      </div>
    </>
  );
};
