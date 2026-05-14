import type { Block } from "payload";

export const LogoCarouselBlock: Block = {
  slug: "logoCarousel",
  interfaceName: "LogoCarouselBlock",
  labels: {
    singular: "Partners Strip",
    plural: "Partners Strips",
  },
  fields: [
    {
      name: "partners",
      type: "array",
      label: "Partner names",
      fields: [
        {
          name: "name",
          type: "text",
          label: "Partner name (use \\n for line breaks)",
          required: true,
        },
      ],
    },
  ],
};
