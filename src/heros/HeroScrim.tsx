import React from "react";

/**
 * The wash that keeps hero copy legible over the media.
 *
 * The axis has to follow the layout. From `sm` up the copy is confined to the left
 * of the frame, so a left-to-right fade covers it while leaving most of the photo
 * clear. Below that the copy runs the full container width, where a horizontal fade
 * drops its right half onto bare image — so it becomes a bottom-weighted vertical
 * wash instead, dense where the centred copy sits and clearing toward the top.
 */
export const HeroScrim: React.FC<{ color: string }> = ({ color }) => (
  <>
    <div
      aria-hidden
      className="absolute inset-0 z-10 sm:hidden"
      style={{
        background: `linear-gradient(to top, ${color} 0%, color-mix(in srgb, ${color} 80%, transparent) 65%, transparent 100%)`,
      }}
    />
    <div
      aria-hidden
      className="absolute inset-0 z-10 hidden sm:block"
      style={{
        background: `linear-gradient(to right, ${color}, ${color} 30%, transparent)`,
      }}
    />
  </>
);
