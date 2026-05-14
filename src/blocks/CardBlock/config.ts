import type { Block } from "payload";
import { link } from "@/fields/link";

export const CardBlock: Block = {
  slug: "cardBlock",
  interfaceName: "CardBlock",
  labels: {
    singular: "Services Grid",
    plural: "Services Grids",
  },
  fields: [
    {
      name: "sectionTitle",
      type: "text",
      label: "Section heading",
      defaultValue: "Trei direcții, o singură misiune",
    },
    {
      name: "sectionSubtitle",
      type: "textarea",
      label: "Section description",
    },
    {
      name: "cards",
      type: "array",
      label: "Service cards",
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          label: "Description",
        },
        {
          name: "icon",
          type: "select",
          label: "Icon",
          defaultValue: "cross",
          options: [
            { label: "Cross (folk star)", value: "cross" },
            { label: "Diamond", value: "diamond" },
          ],
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
            required: false,
            admin: {
              condition: (_, sibling) => sibling?.withLink === true,
            },
          },
        }),
      ],
    },
  ],
};
