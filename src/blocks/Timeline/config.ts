import type { Block } from "payload";

import { richTextEditor } from "@/fields/richTextEditor";

import { link } from "@/fields/link";

export const Timeline: Block = {
  slug: "timeline",
  interfaceName: "TimelineBlock",
  labels: { singular: "Timeline", plural: "Timelines" },
  fields: [
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
          editor: richTextEditor(['h3', 'h4']),
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
