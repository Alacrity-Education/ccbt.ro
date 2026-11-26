"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

import type { Media as MediaType } from "@/payload-types";

import { Media } from "@/components/Media";
import { cn } from "@/utilities/ui";

export type LightboxItem = {
  image: MediaType;
  title?: string | null;
  subtitle?: string | null;
};

const OpenContext = createContext<((index: number) => void) | null>(null);

/**
 * One viewer for the whole block, so the arrows can walk every image in it in
 * the order the page shows them. The cards stay server-rendered: they only
 * need a button that knows its own position, which `LightboxTrigger` is.
 *
 * Built on <dialog> opened with showModal(): the browser then traps focus,
 * closes it on Esc, hands focus back to the image that opened it, and makes the
 * rest of the page inert — none of which has to be written here.
 */
export const Lightbox: React.FC<{
  items: LightboxItem[];
  children: React.ReactNode;
}> = ({ items, children }) => {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const count = items.length;
  const isOpen = index !== null;

  const step = useCallback(
    (delta: number) =>
      setIndex((i) => (i === null ? i : (i + delta + count) % count)),
    [count],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  // A modal dialog does not stop the page behind it scrolling under a wheel or
  // a finger; without this the gallery drifts away while the viewer is open.
  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [isOpen]);

  const current = index !== null ? items[index] : null;

  return (
    <OpenContext.Provider value={setIndex}>
      {children}
      <dialog
        ref={dialogRef}
        aria-label={current?.title || "Imagine"}
        // Esc closes the dialog natively; this keeps the state in step.
        onClose={() => setIndex(null)}
        // Anywhere but a control or the caption closes it, the image included:
        // on a full-screen viewer there is no "outside" left to click.
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("button, figcaption")) return;
          setIndex(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onTouchStart={(e) => {
          touchX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          const start = touchX.current;
          const end = e.changedTouches[0]?.clientX;
          touchX.current = null;
          if (start == null || end == null) return;
          const dx = end - start;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
        }}
        // No display class without `open:`: one would override the browser's
        // own `display: none` on a closed dialog and leave it on the page.
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none cursor-zoom-out bg-black/90 p-0 text-white backdrop:bg-black/60 open:flex open:flex-col"
      >
        {current && (
          <figure className="flex min-h-0 flex-1 flex-col items-center px-4 pt-14 pb-4 sm:px-20 sm:pb-6">
            <div className="relative min-h-0 w-full flex-1">
              <Media
                // A fresh element per image, so the previous one is never
                // shown at the new one's place while it loads.
                key={index}
                resource={current.image}
                fill
                size="100vw"
                priority
                htmlElement={null}
                pictureClassName="absolute inset-0"
                imgClassName="object-contain"
              />
            </div>
            {(current.title || current.subtitle) && (
              <figcaption className="font-barlow-semi mt-4 cursor-auto text-center">
                {current.title && (
                  <p className="text-lg leading-tight font-bold sm:text-2xl">
                    {current.title}
                  </p>
                )}
                {current.subtitle && (
                  <p className="mt-1 text-base text-white/75 sm:text-lg">
                    {current.subtitle}
                  </p>
                )}
              </figcaption>
            )}
          </figure>
        )}

        <p className="absolute top-4 left-4 text-sm text-white/70 tabular-nums">
          {index !== null && count > 1 ? `${index + 1} / ${count}` : null}
        </p>
        <button
          type="button"
          onClick={() => setIndex(null)}
          aria-label="Închide"
          className="absolute top-2 right-2 cursor-pointer rounded-full p-2 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
        >
          <FiX aria-hidden className="h-7 w-7" />
        </button>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Imaginea anterioară"
              className={cn(ARROW, "left-1 sm:left-4")}
            >
              <FiChevronLeft aria-hidden className="h-8 w-8" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Imaginea următoare"
              className={cn(ARROW, "right-1 sm:right-4")}
            >
              <FiChevronRight aria-hidden className="h-8 w-8" />
            </button>
          </>
        )}
      </dialog>
    </OpenContext.Provider>
  );
};

const ARROW =
  "absolute top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-black/40 p-2 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white";

/** The clickable image on the page: opens the viewer at its own position. */
export const LightboxTrigger: React.FC<{
  index: number;
  label: string;
  className?: string;
  children: React.ReactNode;
}> = ({ index, label, className, children }) => {
  const open = useContext(OpenContext);

  return (
    <button
      type="button"
      aria-label={label}
      aria-haspopup="dialog"
      onClick={() => open?.(index)}
      className={className}
    >
      {children}
    </button>
  );
};
