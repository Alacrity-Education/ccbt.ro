import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";

import { baseConverters, type NodeTypes } from "./base";

/**
 * The Content block's converters.
 *
 * This used to restyle h2 into a section heading of its own. It no longer needs
 * to: headings are sized once, for every field, by the scale in
 * components/RichText — so an h2 written here and an h2 written in a CTA come out
 * the same size, which is what makes the page read as one document.
 */
export const sectionConverters: JSXConvertersFunction<NodeTypes> = (args) =>
  baseConverters(args);
