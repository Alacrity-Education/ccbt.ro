import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";

import { baseConverters, type NodeTypes } from "./base";

/**
 * The section heading, previously drawn by a `SectionTitle` component that every
 * block carried a `title` field to feed. An h2 written in a Content block's rich
 * text now produces exactly the same markup, so a Content block placed above a
 * section is how that section gets its heading.
 */
const SECTION_TITLE = "text-primary text-xl font-semibold md:text-3xl";

export const sectionConverters: JSXConvertersFunction<NodeTypes> = (args) => {
  const base = baseConverters(args);

  return {
    ...base,
    heading: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children });

      // Only h2 is the section heading; the deeper levels are ordinary
      // sub-headings and keep whatever the prose styles give them.
      if (node.tag === "h2") {
        return <h2 className={SECTION_TITLE}>{children}</h2>;
      }

      const Tag = node.tag;
      return <Tag>{children}</Tag>;
    },
  };
};
