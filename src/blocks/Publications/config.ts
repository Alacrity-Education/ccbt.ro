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
      admin: {
        description: "Optional. Leave empty if the page already has one above.",
      },
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
          admin: {
            description:
              "Shown on the spine, set vertically. Long titles are trimmed to fit the cover's height — keep it to the name of the publication.",
          },
        },
        {
          name: "cover",
          type: "upload",
          relationTo: "media",
          required: true,
          label: "Cover",
          admin: {
            description:
              "Shown whole, at its own proportions. It is never cropped and nothing is laid over it.",
          },
        },
        {
          name: "author",
          type: "text",
          label: "Author / editor",
          admin: { description: "Optional. Appears under the cover." },
        },
        {
          name: "year",
          type: "number",
          label: "Year",
          admin: {
            description:
              "Optional, but worth filling in: it is what lets the list be ordered or grouped later without editing every entry by hand.",
          },
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
          admin: {
            description:
              "Optional. With a file, the publication opens it and its size is shown. Without one, fill in the link below instead.",
          },
        },
        {
          name: "url",
          type: "text",
          label: "External link",
          admin: {
            description: "Used only when there is no file.",
            condition: (_data, siblingData) => !siblingData?.file,
          },
        },
      ],
    },
    sectionBackground,
  ],
};
