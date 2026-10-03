import type { Block } from "payload";
import { sectionBackground } from "@/fields/sectionBackground"

export const StaticMap: Block = {
  slug: "staticMap",
  interfaceName: "StaticMapBlock",
  labels: {
    singular: "Static Map",
    plural: "Static Maps",
  },
  fields: [
    {
      name: "variant",
      type: "select",
      label: "Map Variant",
      defaultValue: "default",
      options: [
        { label: "Light", value: "default" },
        { label: "Light, no labels", value: "mono" },
        { label: "Dark", value: "mono-black" },
      ],
    },
    {
      name: "initialView",
      type: "group",
      label: "Initial View",
      fields: [
        { name: "latitude", type: "number", required: true },
        { name: "longitude", type: "number", required: true },
        { name: "zoom", type: "number", required: true, defaultValue: 14 },
      ],
    },
    {
      name: "markers",
      type: "array",
      label: "Markers",
      labels: { singular: "Marker", plural: "Markers" },
      fields: [
        { name: "latitude", type: "number", required: true, label: "Latitude" },
        { name: "longitude", type: "number", required: true, label: "Longitude" },
        { name: "title", type: "text", label: "Title" },
        { name: "subtitle", type: "text", label: "Subtitle" },
      ],
    },

      sectionBackground,
  ],
};

