import type { Block, Condition } from "payload";
import { richTextEditor } from "@/fields/richTextEditor";
import { link } from "@/fields/link";
import {
  SURFACE_COLORS,
  DIVIDER_COLORS,
  brandOptions,
} from "@/utilities/brand";
import { LONG_CARD_STYLE_OPTIONS } from "@/components/Card/LongCard";

// The card type lives on the block, not on the row, so a row's fields read it
// off `blockData` — `siblingData` here is only the row itself.
const forTypes =
  (...types: string[]): Condition =>
  (_data, _siblingData, { blockData }) =>
    types.includes(blockData?.cardType ?? "pillar");

const isPillar = forTypes("pillar");
const isLong = forTypes("long");
const isMotif = forTypes("motif");
const hasImage = forTypes("long", "motif");

// The motif is drawn in purple over green, which is outside the three surface
// tokens — DIVIDER_COLORS is the set that already includes green.
const motifColorOptions = brandOptions(DIVIDER_COLORS);

export const CardBlock: Block = {
  slug: "cardBlock",
  interfaceName: "CardBlock",
  labels: {
    singular: "Card Block",
    plural: "Card Blocks",
  },
  fields: [
    {
      name: "cardType",
      type: "select",
      required: true,
      defaultValue: "pillar",
      label: "Card type",
      options: [
        { label: "Pillar", value: "pillar" },
        { label: "Long", value: "long" },
        { label: "Motif", value: "motif" },
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
          name: "subtitle",
          type: "text",
          label: "Subtitle",
          admin: { condition: isLong },
        },
        {
          name: "date",
          type: "date",
          label: "Date",
          admin: {
            condition: isLong,
            date: { pickerAppearance: "dayOnly", displayFormat: "dd/MM/yyyy" },
          },
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Image",
          admin: { condition: hasImage },
        },
        {
          name: "longStyle",
          type: "select",
          label: "Card style",
          required: true,
          defaultValue: "primary",
          options: LONG_CARD_STYLE_OPTIONS,
          admin: { condition: isLong },
        },
        {
          name: "motif",
          type: "group",
          label: "Corner motif",
          admin: { condition: isMotif },
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "horizontalColor",
                  type: "select",
                  label: "Top bar",
                  defaultValue: "purple",
                  options: motifColorOptions,
                  admin: { width: "33%" },
                },
                {
                  name: "verticalColor",
                  type: "select",
                  label: "Side bar",
                  defaultValue: "green",
                  options: motifColorOptions,
                  admin: { width: "33%" },
                },
                {
                  name: "arrowColor",
                  type: "select",
                  label: "Arrow",
                  defaultValue: "green",
                  options: motifColorOptions,
                  admin: { width: "33%" },
                },
              ],
            },
          ],
        },
        {
          name: "description",
          type: "richText",
          label: "Description",
          editor: richTextEditor(["h3", "h4"]),
        },
        {
          name: "color",
          type: "select",
          required: true,
          defaultValue: "coral",
          options: brandOptions(SURFACE_COLORS),
          admin: { condition: isPillar },
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
          admin: { condition: isPillar },
        },
        {
          name: "withLink",
          type: "checkbox",
          label: "Enable Link",
          defaultValue: false,
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
          admin: { condition: isPillar },
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
            condition: (data, siblingData, ctx) =>
              isPillar(data, siblingData, ctx) &&
              Boolean(siblingData?.backgroundImage),
          },
        },
      ],
    },
  ],
};
