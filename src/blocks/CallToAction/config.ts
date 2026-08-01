import type { Block } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

import { linkGroup } from "../../fields/linkGroup";
import { link } from "@/fields/link";

// The two "highlight" variants share the same fields (heading + body + button +
// optional highlight cards + optional motif); they only differ in alignment.
const HIGHLIGHT_VARIANTS = ["highlightLeft", "highlightCentered"];
const isHighlight = (variant?: string) => HIGHLIGHT_VARIANTS.includes(variant ?? "");

export const CallToAction: Block = {
  slug: "cta",
  interfaceName: "CallToActionBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Block Title",
    },
    {
      name: "subtitle",
      type: "text",
      label: "Subtitle",
      admin: {
        description: "Colored line shown under the title (Highlight variants).",
        condition: (_, sibling) => isHighlight(sibling?.variant),
      },
    },
    {
      name: "richText",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
      label: false,
    },
    {
      name: "variant",
      type: "select",
      options: [
        { label: "Purple", value: "primary" },
        { label: "Coral", value: "secondary" },
        { label: "Background image", value: "background" },
        { label: "Highlight — Left", value: "highlightLeft" },
        { label: "Highlight — Centered", value: "highlightCentered" },
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
          "Draws a placeholder purple rectangle down the side of the section — replace with your SVG.",
        condition: (_, sibling) => sibling?.variant === "highlightLeft",
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
          options: [
            { label: "Coral", value: "coral" },
            { label: "Purple", value: "purple" },
            { label: "Cyan", value: "cyan" },
            { label: "Green", value: "green" },
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
