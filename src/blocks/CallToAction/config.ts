import type { Block } from "payload";

import { richTextEditor } from "@/fields/richTextEditor";

import { linkGroup } from "../../fields/linkGroup";
import { link } from "@/fields/link";
import { SURFACE_COLORS, brandOptions } from "@/utilities/brand";
import { sectionLayout } from "@/fields/sectionLayout"

// The "base" variant is the one with the motif and the highlight cards. It is
// always left-aligned — see blocks/CallToAction/Base.
const isBase = (variant?: string) => variant === "base";

export const CallToAction: Block = {
  slug: "cta",
  interfaceName: "CallToActionBlock",
  fields: [
    // The heading and its coloured line are written as an H2 and an H3 in the
    // rich text below, rather than as fields of their own.
    {
      name: "richText",
      type: "richText",
      editor: richTextEditor(['h1', 'h2', 'h3', 'h4'], { align: true }),
      label: false,
    },
    {
      name: "variant",
      type: "select",
      options: [
        { label: "Purple", value: "primary" },
        { label: "Coral", value: "secondary" },
        { label: "Background image", value: "background" },
        { label: "Base", value: "base" },
      ],
    },
    {
      name: "media",
      type: "upload",
      relationTo: "media",
      admin: {
        condition: (data, sibling) => {
          return sibling.variant === "background";
        },
      },
    },
    {
      name: "ctaType",
      type: "select",
      label: "CTA Type",
      defaultValue: "links",
      options: [
        { label: "Links", value: "links" },
        { label: "Modal", value: "modal" },
      ],
    },
    {
      name: "modalButtonText",
      type: "text",
      label: "Modal Button Text",
      admin: {
        condition: (_, sibling) => sibling?.ctaType === "modal",
      },
    },
    {
      name: "form",
      type: "relationship",
      relationTo: "forms",
      label: "Form to render",
      admin: {
        condition: (_, sibling) => sibling?.ctaType === "modal",
      },
    },
    linkGroup({
      appearances: ["brand", "outline", "secondary", "default"],
      overrides: {
        maxRows: 2,
        admin: {
          condition: (_, sibling) => sibling?.ctaType !== "modal",
        },
      },
    }),
    {
      name: "enableCards",
      type: "checkbox",
      label: "Enable highlight cards",
      defaultValue: false,
      admin: {
        condition: (_, sibling) => isBase(sibling?.variant),
      },
    },
    {
      name: "cards",
      type: "array",
      label: "Highlight cards",
      minRows: 1,
      maxRows: 4,
      admin: {
        initCollapsed: true,
        condition: (_, sibling) =>
          isBase(sibling?.variant) && sibling?.enableCards === true,
      },
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
              condition: (_, sibling) => sibling?.withLink === true,
            },
          },
        }),
        {
          name: "backgroundImage",
          type: "upload",
          relationTo: "media",
          label: "Background image",
          admin: {
            description: "Optional image shown behind the card, over its color.",
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
            description: "How visible the background image is over the card color.",
            condition: (_, sibling) => Boolean(sibling?.backgroundImage),
          },
        },
      ],
    },
      ...sectionLayout(),
  ],
  labels: {
    plural: "Calls to Action",
    singular: "Call to Action",
  },
};
