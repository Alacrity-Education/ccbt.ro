import type { Block } from "payload";

import { richTextEditor } from "@/fields/richTextEditor";

import { link } from "@/fields/link";
import { sectionDividers } from "@/fields/sectionDividers";
import { sectionBackground } from "@/fields/sectionBackground"

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
    // The band itself is not optional — the timeline always runs full width on
    // its own fill. This only decides whether that band is finished with the
    // cut edges or meets the page squarely.
    {
      name: "showDividers",
      type: "checkbox",
      label: "Show dividers",
      defaultValue: true,
    },
    // Unset on rows that predate the toggle, which read as on (see
    // blocks/RenderBlocks) — hence `!== false` rather than a truth test.
    ...sectionDividers((_, sibling) => sibling?.showDividers !== false),
      sectionBackground,
  ],
};
