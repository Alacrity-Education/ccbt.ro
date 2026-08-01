import { cn } from "@/utilities/ui";
import React from "react";
import RichText from "@/components/RichText";
import type { ContentBlock as ContentBlockProps } from "@/payload-types";
import { CMSLink } from "../../components/Link";
import { Media } from "@/components/Media";
import { CornerDecorator } from "@/components/CornerDecorator";

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns, title } = props;

  // 1. Map the FULL class strings so Tailwind detects them correctly
  const colsSpanClasses = {
    full: "md:col-span-12",
    half: "md:col-span-6",
    oneThird: "md:col-span-4",
    twoThirds: "md:col-span-8",
  };

  return (
    <div className="container mx-auto my-4 w-full sm:my-10">
      {title && (
        <h2 className="text-primary py-10 text-center text-xl font-semibold md:text-3xl">
          {title}
        </h2>
      )}
      {/* 2. Ensure parent is grid-cols-12 at md breakpoint */}
      <div className="grid grid-cols-4 gap-x-16 gap-y-8 md:grid-cols-12">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { decorator, enableLink, link, media, richText, size, type } = col;
            const isMedia = (type ?? "text") === "media";
            const showDecorator = isMedia && Boolean(decorator?.enabled);

            return (
              <div
                className={cn(
                  "col-span-4", // Default to full width on mobile
                  colsSpanClasses[size!], // Apply the mapped class for desktop
                )}
                key={index}
              >
                {isMedia
                  ? media && (
                      <div className="relative">
                        <Media
                          resource={media}
                          className="w-full"
                          imgClassName={cn(
                            "h-auto w-full object-cover",
                            !showDecorator && "rounded-box",
                          )}
                        />
                        {showDecorator && (
                          <CornerDecorator
                            verticalColor={decorator?.verticalColor}
                            horizontalColor={decorator?.horizontalColor}
                            className="pointer-events-none absolute top-0 right-0 z-10"
                          />
                        )}
                      </div>
                    )
                  : richText && <RichText data={richText} enableGutter={false} />}
                {enableLink && (
                  <div className="mt-6">
                    <CMSLink {...link} />
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};
