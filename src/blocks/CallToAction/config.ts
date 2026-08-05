import type { Block } from "payload";

import { richTextEditor } from "@/fields/richTextEditor";

import { linkGroup } from "../../fields/linkGroup";
import { link } from "@/fields/link";
import { SURFACE_COLORS, brandOptions } from "@/utilities/brand";

// The "highlight" variant renders left-aligned when the motif is enabled (the motif
// claims the right side of the section) and centered otherwise. See
// blocks/CallToAction/Highlight — alignment is derived, never picked by the editor.
const isHighlight = (variant?: string) => variant === "highlight";

export const CallToAction: Block = {
  slug: "cta",
  interfaceName: "CallToActionBlock",
  fields: [
    // Highlight draws its own heading and lays out around it. The other variants
    // have no heading of their own — put a Content block above them instead.
    {
      name: "title",
      type: "text",
      label: "Title",
      admin: {
        condition: (_, sibling) => isHighlight(sibling?.variant),
      },
    },
    {
      name: "subtitle",
      type: "text",
      label: "Subtitle",
      admin: {
        description: "Colored line shown under the title.",
        condition: (_, sibling) => isHighlight(sibling?.variant),
      },
    },
    {
      name: "richText",
      type: "richText",
      editor: richTextEditor(['h1', 'h2', 'h3', 'h4']),
      label: false,
    },
    {
      name: "variant",
      type: "select",
      options: [
        { label: "Purple", value: "primary" },
        { label: "Coral", value: "secondary" },
        { label: "Background image", value: "background" },
        { label: "Highlight", value: "highlight" },
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
      appearances: ["outline","secondary","default"],
      overrides: {
        maxRows: 2,
        admin: {
          condition: (_, sibling) => sibling?.ctaType !== "modal",
        },
      },
    }),
    {
      name: "enableMotif",
      type: "checkbox",
      label: "Enable motif",
      defaultValue: false,
      admin: {
        description:
          "Draws the woven-ribbon motif down the right side of the section. The motif takes up that space, so enabling it also left-aligns the content; leave it off for a centered layout.",
        condition: (_, sibling) => isHighlight(sibling?.variant),
      },
    },
    {
      name: "enableCards",
      type: "checkbox",
      label: "Enable highlight cards",
      defaultValue: false,
      admin: {
        condition: (_, sibling) => isHighlight(sibling?.variant),
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
          isHighlight(sibling?.variant) && sibling?.enableCards === true,
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
  ],
  labels: {
    plural: "Calls to Action",
    singular: "Call to Action",
  },
};
