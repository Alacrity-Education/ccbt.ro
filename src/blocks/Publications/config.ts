import type { Block } from "payload";

import { sectionBackground } from "@/fields/sectionBackground";

/**
 * A shelf of publications, each shown as its cover with a coloured spine.
 *
 * The cover is the subject, not a decoration: it is a required upload of its
 * own rather than the `backgroundImage` + opacity pair the generic card block
 * offered, which is what reduced a designed cover to wallpaper behind a
 * coloured panel. Nothing is ever drawn over a cover — the title lives on the
 * spine, which is the one surface this site is free to brand.
 */
export const PublicationsBlock: Block = {
  slug: "publications",
  interfaceName: "PublicationsBlock",
  labels: {
    singular: "Publications",
    plural: "Publications",
  },
  fields: [
    {
      name: "heading",
      type: "text",
      label: "Section heading",
    },
    {
      name: "items",
      type: "array",
      label: "Publications",
      labels: { singular: "Publication", plural: "Publications" },
      minRows: 1,
      admin: {
        // The spine carries the title, so that is what identifies a row.
        initCollapsed: true,
        components: {
          RowLabel: "@/blocks/Publications/RowLabel#PublicationRowLabel",
        },
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          label: "Title",
        },
        {
          name: "cover",
          type: "upload",
          relationTo: "media",
          required: true,
          label: "Cover",
        },
        {
          name: "author",
          type: "text",
          label: "Author / editor",
        },
        {
          name: "year",
          type: "number",
          label: "Year",
        },
        {
          /**
           * The file, usually a PDF. The media collection sets no mimeTypes,
           * so it takes documents as well as images; Payload only generates
           * image sizes for images, so a PDF is stored as uploaded.
           */
          name: "file",
          type: "upload",
          relationTo: "media",
          label: "File (PDF)",
        },
        {
          name: "url",
          type: "text",
          label: "External link",
          admin: {
            condition: (_data, siblingData) => !siblingData?.file,
          },
        },
      ],
    },
    sectionBackground,
  ],
};
