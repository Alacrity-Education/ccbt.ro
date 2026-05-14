import type { Block } from "payload";
import { link } from "@/fields/link";

export const AboutSectionBlock: Block = {
  slug: "aboutSection",
  interfaceName: "AboutSectionBlock",
  labels: {
    singular: "About Section",
    plural: "About Sections",
  },
  fields: [
    {
      name: "heading",
      type: "text",
      label: "Heading",
      defaultValue: "Centrul Cultural Botoșani",
    },
    {
      name: "body",
      type: "textarea",
      label: "Body text",
    },
    link({
      appearances: false,
      overrides: {
        name: "ctaLink",
        label: "CTA button link",
        required: false,
      },
    }),
    {
      name: "pillars",
      type: "array",
      label: "Pillar cards",
      maxRows: 3,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea" },
        {
          name: "tone",
          type: "select",
          defaultValue: "red",
          options: [
            { label: "Red", value: "red" },
            { label: "Navy", value: "ink" },
          ],
        },
        link({
          appearances: false,
          overrides: {
            name: "link",
            label: "Card link",
            required: false,
          },
        }),
      ],
    },
  ],
};
