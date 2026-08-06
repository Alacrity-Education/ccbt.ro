import React from "react";

/**
 * The wash that keeps hero copy legible over the media.
 *
 * The axis has to follow the layout. From `sm` up the copy is confined to the left
 * of the frame, so a left-to-right fade covers it while leaving most of the photo
 * clear. Below that the copy runs the full container width, where a horizontal fade
 * drops its right half onto bare image — so it becomes a bottom-weighted vertical
 * wash instead, dense where the copy sits and clearing toward the top.
 *
 * Both fades reach transparent well before the far edge rather than running the
 * whole way: carried to 100% the wash greys the entire image, and the half of the
 * frame with no text over it has nothing to be legible against.
 */
export const HeroScrim: React.FC<{ color: string }> = ({ color }) => (
  <>
    <div
      aria-hidden
      className="absolute inset-0 z-0 sm:hidden"
      style={{
        background: `linear-gradient(to top, ${color} 0%, color-mix(in srgb, ${color} 60%, transparent) 32%, transparent 62%)`,
      }}
    />
        <div
      aria-hidden
      className="absolute inset-0 z-0 hidden sm:block"
      style={{
        background: `linear-gradient(to top, ${color} 0%, color-mix(in srgb, ${color} 40%, transparent) 32%, transparent 62%)`,
      }}
    />
  </>
);
