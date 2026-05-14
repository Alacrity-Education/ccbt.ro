import type { Block } from "payload";
import { link } from "@/fields/link";

export const TeamTeaserBlock: Block = {
  slug: "teamTeaser",
  interfaceName: "TeamTeaserBlock",
  labels: {
    singular: "Team Teaser",
    plural: "Team Teasers",
  },
  fields: [
    {
      name: "heading",
      type: "text",
      label: "Heading",
      defaultValue: "Oamenii din spatele fiecărui proiect",
    },
    link({
      appearances: false,
      overrides: {
        name: "ctaLink",
        label: "CTA link",
        required: false,
      },
    }),
  ],
};
