export type HeroAlign = "left" | "right";

/**
 * Which side the copy sits on, for the heroes that lay it over a full-bleed
 * image (see heros/config). The column keeps its measure either way — what
 * moves is the column, and with it every line inside it.
 *
 * Each line needs `ms-auto` of its own: the title and subtitle carry their own
 * max-widths, so `text-right` alone would set the text to the right of a box
 * still sitting against the left edge. A button is inline-block and follows
 * `text-right` without any help.
 */
export const heroAlignment = (align?: HeroAlign | string | null) => {
  const right = align === "right";

  return {
    /** Goes on the column that holds the copy. */
    column: right ? "ms-auto text-right" : "md:text-start",
    /** Goes on each block-level line inside it. */
    line: right ? "ms-auto" : "",
  };
};
