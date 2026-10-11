import type { Block } from "payload";
import { richTextEditor } from "@/fields/richTextEditor";
import { link } from "@/fields/link";
import { SURFACE_COLORS, brandOptions } from "@/utilities/brand";
import { sectionBackground } from "@/fields/sectionBackground"

export const CardBlock: Block = {
  slug: "cardBlock",
  interfaceName: "CardBlock",
  labels: {
    singular: "Card Block",
    plural: "Card Blocks",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
    },
    /**
     * The shape every card in this block takes.
     *
     * One choice for the whole block rather than one per card: a grid of cards
     * in two different shapes reads as a mistake, which is why the old
     * per-card horizontal option was dropped (see components/Card/PillarCard).
     */
    {
      name: "variant",
      type: "select",
      label: "Card format",
      defaultValue: "default",
      options: [
        { label: "Default — landscape", value: "default" },
        { label: "Vertical — A4 portrait", value: "vertical" },
      ],
    },
    {
      name: "cards",
      type: "array",
      label: "Cards",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "richText",
          label: "Description",
          editor: richTextEditor(['h3', 'h4']),
        },
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
          label: "Enable Link",
          defaultValue: false,
          admin: { description: "Enable to add a link to the card" },
        },
        /**
         * Turns the card over on click or tap: the front keeps the title, the
         * description moves to the back.
         *
         * Only offered on a card that is not a link, since a card cannot both
         * go somewhere and turn over — the same tap would have to mean two
         * things. A linked card wins, and this hides itself.
         */
        {
          name: "flippable",
          type: "checkbox",
          label: "Flip on click",
          defaultValue: false,
          admin: {
            description:
              "The description moves to the back of the card and is revealed by clicking it.",
            condition: (_data, siblingData) => siblingData?.withLink !== true,
          },
        },
        link({
          appearances: false,
          overrides: {
            required: false,
            validate: () => true,
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
          admin: { description: "Optional image shown behind the card, over its color." },
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
            condition: (_data, siblingData) => Boolean(siblingData?.backgroundImage),
          },
        },
      ],
    },
      sectionBackground,
  ],
};
