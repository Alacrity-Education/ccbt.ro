import type { StaticImageData } from "next/image";

import { cn } from "@/utilities/ui";
import React from "react";
import RichText from "@/components/RichText";

import type { MediaBlock as MediaBlockProps } from "@/payload-types";

import { Media } from "../../components/Media";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";

type Props = MediaBlockProps & {
  breakout?: boolean;
  captionClassName?: string;
  className?: string;
  enableGutter?: boolean;
  imgClassName?: string;
  staticImage?: StaticImageData;
  disableInnerContainer?: boolean;
};

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
  } = props;

  const { youtubeUrl } = props as { youtubeUrl?: string | null };

  let caption;
  if (media && typeof media === "object") caption = media.caption;

  // A link beats an upload: the field only appears when the other is empty, but
  // a block edited before that condition existed could hold both.
  if (youtubeUrl) {
    return (
      <div className="w-full">
        <div className="container mx-auto">
          <YouTubeEmbed url={youtubeUrl} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">

      <div
        className={cn(
          "",
          {
            container: enableGutter,
          },
          "container mx-auto",
          className,
        )}
      >
        {(media || staticImage) && (
          <Media
            imgClassName={cn(
              "border border-border rounded-[0.8rem]",
              imgClassName,
            )}
            resource={media}
            src={staticImage}
          />
        )}
        {caption && (
          <div
            className={cn(
              "mt-6 text-center w-full",
              {
                container: !disableInnerContainer,
              },
              captionClassName,
            )}
          >
            <RichText data={caption} enableGutter={false} />
          </div>
        )}
      </div>
    </div>
  );
};
