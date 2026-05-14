import type { Block } from "payload";
import { link } from "@/fields/link";

export const ImageContentBlock: Block = {
  slug: "imageContent",
  interfaceName: "ImageContentBlock",
  labels: {
    plural: "Feature Blocks",
    singular: "Feature Block",
  },
  fields: [
    {
      name: "sectionEyebrow",
      type: "text",
      label: "Section eyebrow",
      defaultValue: "Implică-te",
    },
    {
      name: "sectionTitle",
      type: "text",
      label: "Section heading",
    },
    {
      name: "items",
      type: "array",
      label: "Feature cards",
      minRows: 1,
      maxRows: 2,
      fields: [
        { name: "eyebrow", type: "text", label: "Eyebrow badge" },
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea" },
        link({
          appearances: false,
          overrides: {
            name: "ctaLink",
            label: "CTA link",
            required: false,
          },
        }),
        {
          name: "media",
          type: "upload",
          relationTo: "media",
          required: false,
          label: "Image",
        },
        {
          name: "tone",
          type: "select",
          label: "Card tone",
          defaultValue: "navy",
          options: [
            { label: "Navy (dark)", value: "navy" },
            { label: "Cream (light)", value: "cream" },
          ],
        },
      ],
    },
  ],
};
