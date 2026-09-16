import type { Block } from "payload";

import { link } from "@/fields/link";
import { SURFACE_COLORS, brandOptions } from "@/utilities/brand";

/**
 * A row of cards, written inside a Content column's copy.
 *
 * Cards used to exist twice: as a block of their own, and as a set of fields
 * bolted onto the base CTA. Neither let an editor put them where the argument
 * for them lands — between the paragraph that sets them up and the one that
 * follows. As a lexical block they sit in the copy, the way the button does.
 *
 * The description is plain text rather than rich text: a card is a label and a
 * sentence, and nesting an editor inside an editor inside a column invites
 * content no card can hold.
 */
export const CardsBlock: Block = {
  slug: "cards",
  interfaceName: "CardsBlock",
  labels: { singular: "Cards", plural: "Cards" },
  fields: [
    {
      name: "cards",
      type: "array",
      label: "Cards",
      minRows: 1,
      maxRows: 6,
      admin: { initCollapsed: true },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", label: "Body" },
        {
          name: "color",
          type: "select",
          required: true,
          defaultValue: "coral",
          options: brandOptions(SURFACE_COLORS),
        },
        {
          name: "withLink",
          type: "checkbox",
          label: "Enable link",
          defaultValue: false,
        },
        link({
          appearances: false,
          overrides: {
            admin: {
              condition: (_data, siblingData) => siblingData?.withLink === true,
            },
          },
        }),
        {
          name: "backgroundImage",
          type: "upload",
          relationTo: "media",
          label: "Background image",
          admin: {
            description:
              "Optional image shown behind the card, over its color.",
          },
        },
        {
          name: "backgroundOpacity",
          type: "number",
          label: "Background image opacity (%)",
          defaultValue: 100,
          min: 0,
          max: 100,
          admin: {
            step: 1,
            condition: (_data, siblingData) =>
              Boolean(siblingData?.backgroundImage),
          },
        },
      ],
    },
  ],
};
