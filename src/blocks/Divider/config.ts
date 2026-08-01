import type { Block } from "payload";

import { DIVIDER_COLORS, brandOptions } from "@/utilities/brand";

const colorOptions = [
  { label: "Default (pattern)", value: "default" },
  ...brandOptions(DIVIDER_COLORS),
];

export const Divider: Block = {
  slug: "divider",
  interfaceName: "DividerBlock",
  labels: { singular: "Divider", plural: "Dividers" },
  fields: [
    {
      name: "pattern",
      type: "select",
      required: true,
      defaultValue: "a",
      label: "Pattern",
      options: [
        { label: "Pattern A — short", value: "a" },
        { label: "Pattern B — medium", value: "b" },
        { label: "Pattern C — thin", value: "c" },
        { label: "Pattern D — tall", value: "d" },
      ],
    },
    {
      name: "primaryColor",
      type: "select",
      label: "Primary color (bars)",
      defaultValue: "default",
      options: colorOptions,
    },
    {
      name: "secondaryColor",
      type: "select",
      label: "Secondary color (accent)",
      defaultValue: "default",
      options: colorOptions,
    },
    {
      name: "tertiaryColor",
      type: "select",
      label: "Tertiary color",
      defaultValue: "default",
      admin: { description: "Only used by patterns B and D." },
      options: colorOptions,
    },
  ],
};
