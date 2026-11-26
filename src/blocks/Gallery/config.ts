import type { Block } from "payload";

import { brandOptions } from "@/utilities/brand";
import { sectionBackground } from "@/fields/sectionBackground";

/**
 * Images shown whole, in sections, each one opening full screen on click.
 *
 * Kept apart from the Team block on purpose: a team card crops a portrait to a
 * square and may link somewhere, while a gallery item is an artwork that must
 * never be cropped and opens in the viewer instead. One block doing both would
 * crop the paintings or make every staff portrait zoomable.
 */
export const Gallery: Block = {
  slug: "gallery",
  interfaceName: "GalleryBlock",
  labels: { singular: "Gallery", plural: "Galleries" },
  fields: [
    {
      name: "sections",
      type: "array",
      label: "Sections",
      labels: { singular: "Section", plural: "Sections" },
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        { name: "title", type: "text", label: "Section title" },
        {
          name: "color",
          type: "select",
          required: true,
          defaultValue: "coral",
          options: brandOptions(["purple", "coral"]),
        },
        {
          name: "items",
          type: "array",
          label: "Images",
          labels: { singular: "Image", plural: "Images" },
          minRows: 1,
          admin: { initCollapsed: true },
          fields: [
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              required: true,
            },
            { name: "title", type: "text", label: "Title" },
            { name: "subtitle", type: "text", label: "Subtitle" },
          ],
        },
      ],
    },
    sectionBackground,
  ],
};
