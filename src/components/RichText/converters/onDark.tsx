import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";

import { baseConverters, buttonConverter, type NodeTypes } from "./base";

/**
 * Rich text sitting on a saturated panel — today only the CTA block's purple and
 * coral cards.
 *
 * Identical to `body` except that a button node renders with the inverted fills,
 * because the standard coral face and purple plinth would each disappear into
 * those two surfaces. The surface is a property of where the field is rendered,
 * so this is derived here rather than being another choice in the admin.
 */
export const onDarkConverters: JSXConvertersFunction<NodeTypes> = (args) => {
  const base = baseConverters(args);

  return {
    ...base,
    blocks: {
      ...base.blocks,
      ...buttonConverter("brandInvert"),
    },
  };
};
