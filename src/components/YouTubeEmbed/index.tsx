import React from "react";

import { cn } from "@/utilities/ui";
import { youtubeEmbedUrl, youtubeId } from "@/utilities/youtube";

/**
 * A YouTube video, from nothing but the link an editor pasted.
 *
 * The frame is a 16:9 box rather than a fixed height so the player keeps its
 * shape at every width; YouTube letterboxes anything that is not 16:9 inside
 * it, which is the same thing the site would have to do by hand.
 *
 * Renders nothing at all when the link is not a YouTube one. An editor who
 * pastes the wrong thing gets an empty space rather than a broken player
 * reporting an error in someone else's words.
 */
export const YouTubeEmbed: React.FC<{
  url?: string | null;
  title?: string | null;
  className?: string;
}> = ({ url, title, className }) => {
  const id = youtubeId(url);

  if (!id) return null;

  return (
    <div
      className={cn(
        "rounded-box relative aspect-video w-full overflow-hidden shadow-lg",
        className,
      )}
    >
      <iframe
        className="absolute inset-0 h-full w-full"
        src={youtubeEmbedUrl(id)}
        title={title || "YouTube video"}
        // `clipboard-write` is what the player's own share button needs;
        // without `encrypted-media` the player refuses to start for some
        // videos.
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
};
