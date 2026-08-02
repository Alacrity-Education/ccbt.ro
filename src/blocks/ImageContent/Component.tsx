import React from "react";
import { Media } from "@/components/Media";
import RichText from "@/components/RichText";
import { cn } from "@/utilities/ui";
import { ImageContentBlock as ImageContentBlockProps } from "@/payload-types";
import { CMSLink } from "@/components/Link";
import { SectionTitle } from "@/components/SectionTitle";

// Written out in full so the compiler can find them, and scoped to `lg` because
// that is where the grid gains rows — below it every cell is one row of one column,
// where a span would only open empty tracks.
const ROW_SPAN: Record<number, string> = {
  1: "",
  2: "lg:row-span-2",
  3: "lg:row-span-3",
  4: "lg:row-span-4",
};

export const ImageContentBlock: React.FC<ImageContentBlockProps> = (props) => {
  const { title, cells, colsLg = 2, rowsLg = 2 } = props || {};

  if (!cells || !Array.isArray(cells) || cells.length === 0) return null;

  return (
    <div className="container mx-auto w-full">
      <SectionTitle title={title} className="py-10 text-center" />
      <div
        className={cn(
          "grid grid-cols-1 gap-4 lg:gap-12",
          "lg:grid-cols-[var(--cols-lg)] lg:grid-rows-[var(--rows-lg)] lg:h-full lg:grid-flow-row",
        )}
        style={
          {
            "--cols-lg": `repeat(${colsLg}, minmax(0, 1fr))`,
            "--rows-lg": `repeat(${rowsLg}, minmax(0, 1fr))`,
          } as React.CSSProperties
        }
      >
        {cells.map((cell, i) => {
          const rowSpan = ROW_SPAN[Math.min(Math.max(1, cell.rowSpan || 1), 4)];
          const common = cn("h-full w-full rounded-lg", rowSpan);

          if (cell.type === "media" && cell.media) {
            return (
              <div key={i} className={cn(common, "flex items-start")}>
                <Media
                  resource={cell.media}
                  // The fixed height keeps cells even once the grid has rows; below
                  // `lg` there is no grid to even out, so the image keeps its own
                  // ratio instead of being cropped to a letterbox on a phone.
                  imgClassName="w-full rounded-lg lg:mt-8 lg:h-full lg:min-h-[40svh] lg:object-cover"
                  pictureClassName="w-full lg:h-full lg:min-h-[40svh]"
                />
              </div>
            );
          }

          if (cell.type === "text" && cell.richText) {
            const links = cell.links;

            return (
              <div key={i} className={cn(common, "flex flex-col rounded-lg border p-4")}>
                <RichText
                  data={cell.richText}
                  enableGutter={false}
                  className={"m-0! text-start"}
                />
                <div className={"grow"}></div>
                {links && links.length > 0 && (
                  <div className="mt-6 flex w-full flex-wrap gap-2 sm:justify-end">
                    {links.map(({ link }, linkIndex) => (
                      <CMSLink
                        key={linkIndex}
                        size="lg"
                        {...link}
                        className={"btn btn-primary"}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};
