import type { Block } from "payload";

import { richTextEditor } from "@/fields/richTextEditor";

import { linkGroup } from "../../fields/linkGroup";
import { link } from "@/fields/link";
import { SURFACE_COLORS, brandOptions } from "@/utilities/brand";
import { sectionDividers } from "@/fields/sectionDividers";
import { sectionBackground } from "@/fields/sectionBackground"

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
    // Off unless asked for. The band carries the section on its own fill and
    // its own motif; the cut edges are a finish on top of that, and drawn by
    // default they were the loudest thing in the block.
    {
      name: "showDividers",
      type: "checkbox",
      label: "Show dividers",
      defaultValue: false,
      admin: {
        description:
          "Finishes the band with the cut top and bottom edges. Left off, the section meets the page squarely.",
        condition: (_, sibling) => isBase(sibling?.variant as string),
      },
    },
    ...sectionDividers(
      (_, sibling) =>
        isBase(sibling?.variant as string) && sibling?.showDividers === true,
    ),
      sectionBackground,
  ],
  labels: {
    plural: "Calls to Action",
    singular: "Call to Action",
  },
};
