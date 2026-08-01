import type { Block } from "payload";
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { link } from "@/fields/link";
import { SURFACE_COLORS, brandOptions } from "@/utilities/brand";

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
      label: "Block Title",
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
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ["h3", "h4"] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
        {
          name: "color",
          type: "select",
          required: true,
          defaultValue: "coral",
          options: brandOptions(SURFACE_COLORS),
        },
        {
          name: "orientation",
          type: "select",
          required: true,
          defaultValue: "vertical",
          options: [
            { label: "Vertical", value: "vertical" },
            { label: "Horizontal", value: "horizontal" },
          ],
        },
        {
          name: "withLink",
          type: "checkbox",
          label: "Enable Link",
          defaultValue: false,
          admin: { description: "Enable to add a link to the card" },
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
  ],
};
