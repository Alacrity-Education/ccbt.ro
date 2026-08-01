import type { Block } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

import { link } from "@/fields/link";

export const Timeline: Block = {
  slug: "timeline",
  interfaceName: "TimelineBlock",
  labels: { singular: "Timeline", plural: "Timelines" },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Block Title",
    },
    {
      name: "entries",
      type: "array",
      label: "Entries",
      labels: { singular: "Entry", plural: "Entries" },
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        {
          name: "date",
          type: "text",
          required: true,
          label: "Date label",
          admin: { description: 'The coral label, e.g. "IANUARIE 2023".' },
        },
        {
          name: "content",
          type: "richText",
          label: "Content",
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ["h3", "h4"] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
        {
          name: "withLink",
          type: "checkbox",
          label: "Enable button",
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
      ],
    },
  ],
};
