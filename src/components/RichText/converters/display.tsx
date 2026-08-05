import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";

import { baseConverters, type NodeTypes } from "./base";

/**
 * The Archive "Text" variant's intro column, which used to be three separate
 * fields — eyebrow, title and intro rich text — stacked in that order.
 *
 * One field replaces them, with the heading level standing in for what used to be
 * the field name: h3 is the eyebrow, h2 the display heading, paragraphs the body.
 * Authoring order gives the same stacking for free. Prose is off for this preset,
 * so these classes are the whole styling — no `!important` overrides needed to
 * win against it. The body color and width live on the wrapper (see the preset's
 * `className`) so they apply once rather than to every paragraph.
 */
const EYEBROW =
  "text-secondary mb-4 text-sm font-semibold tracking-[0.2em] uppercase md:text-base";
const DISPLAY_TITLE =
  "text-primary mb-6 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl";
const BODY = "mb-4 last:mb-0";

export const displayConverters: JSXConvertersFunction<NodeTypes> = (args) => {
  const base = baseConverters(args);

  return {
    ...base,
    heading: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children });

      if (node.tag === "h3") return <p className={EYEBROW}>{children}</p>;
      if (node.tag === "h2") return <h2 className={DISPLAY_TITLE}>{children}</h2>;

      const Tag = node.tag;
      return <Tag>{children}</Tag>;
    },
    paragraph: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children });
      // Matches the default converter: an empty paragraph is a deliberate blank
      // line, and needs the <br> to occupy one.
      if (!children?.length) {
        return (
          <p className={BODY}>
            <br />
          </p>
        );
      }
      return <p className={BODY}>{children}</p>;
    },
  };
};
