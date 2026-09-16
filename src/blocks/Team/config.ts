import type { Block } from "payload";

import { link } from "@/fields/link";
import { brandOptions } from "@/utilities/brand";

// Departments alternate between the two brand surfaces, and the colour a
// department carries is also the colour of its people's cards — so the choice is
// made once, here, rather than per person.
const departmentColors = brandOptions(["purple", "coral"]);

export const Team: Block = {
  slug: "team",
  interfaceName: "TeamBlock",
  labels: { singular: "Team", plural: "Teams" },
  // No title and no banner of its own: put a Content block above for the
  // heading, the same as every other block on the site.
  fields: [
    {
      name: "departments",
      type: "array",
      label: "Departments",
      labels: { singular: "Department", plural: "Departments" },
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        { name: "name", type: "text", required: true, label: "Department name" },
        {
          name: "color",
          type: "select",
          required: true,
          defaultValue: "coral",
          options: departmentColors,
          admin: {
            description: "Colours the department's label and all of its cards.",
          },
        },
        {
          name: "members",
          type: "array",
          label: "People",
          labels: { singular: "Person", plural: "People" },
          minRows: 1,
          admin: { initCollapsed: true },
          fields: [
            { name: "name", type: "text", required: true },
            { name: "role", type: "text", label: "Role" },
            {
              name: "photo",
              type: "upload",
              relationTo: "media",
              label: "Photo",
            },
            {
              name: "withLink",
              type: "checkbox",
              label: "Enable link",
              defaultValue: false,
              admin: {
                description:
                  "Makes the card clickable and shows the arrow next to the role.",
              },
            },
            link({
              appearances: false,
              overrides: {
                admin: {
                  condition: (_, siblingData) => siblingData?.withLink === true,
                },
              },
            }),
          ],
        },
      ],
    },
  ],
};
