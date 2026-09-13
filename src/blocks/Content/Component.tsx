import { cn } from "@/utilities/ui";
import React from "react";
import RichText from "@/components/RichText";
import type { ContentBlock as ContentBlockProps } from "@/payload-types";
import { CMSLink } from "../../components/Link";
import { DecoratedMedia } from "@/components/Media/DecoratedMedia";

type ColumnSize = NonNullable<
  NonNullable<ContentBlockProps["columns"]>[number]["size"]
>;

const COL_SPAN: Record<ColumnSize, string> = {
  full: "md:col-span-12",
  half: "md:col-span-6",
  oneThird: "md:col-span-4",
  twoThirds: "md:col-span-8",
};

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props;

  return (
    <div className="container mx-auto w-full">
      <div className="grid grid-cols-4 gap-x-8 gap-y-8 md:grid-cols-12 lg:gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const {
              centerContent,
              decorator,
              enableLink,
              link,
              media,
              richText,
              size,
              type,
            } = col;
            const isMedia = (type ?? "text") === "media";

            return (
              <div
                className={cn(
                  "col-span-4 md:flex md:flex-col",
                  size && COL_SPAN[size],
                  centerContent && "md:justify-center",
                )}
                key={index}
              >
                {isMedia
                  ? media && (
                      <DecoratedMedia resource={media} decorator={decorator} />
                    )
                  : richText && (
                      <RichText
                        data={richText}
                        preset="section"
                        enableGutter={false}
                      />
                    )}
                {enableLink && (
                  <div className="mt-6">
                    <CMSLink {...link} appearance="brand" />
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};
