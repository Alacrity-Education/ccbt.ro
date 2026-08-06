import type { Block } from "payload";

import { link } from "@/fields/link";

/**
 * A button placed inside rich text, rather than a `link` field bolted onto the
 * block around it.
 *
 * Blocks used to carry a separate link field whose button always landed in one
 * fixed spot — after the copy, always last. As a rich text node the editor
 * decides where it goes and how many there are, and the field disappears from
 * the block's own form.
 *
 * No appearance choice: the site has one button (see .btn-brand in globals.css).
 * The inverted fills used on saturated panels are picked by the rich text preset
 * doing the rendering, not by the editor — see components/RichText/converters.
 */
export const ButtonBlock: Block = {
  slug: "button",
  interfaceName: "ButtonBlock",
  labels: { singular: "Button", plural: "Buttons" },
  fields: [link({ appearances: false })],
};
