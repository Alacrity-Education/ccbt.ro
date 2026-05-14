import type { Block } from "payload";

export const ChronologyBlock: Block = {
  slug: "chronology",
  interfaceName: "ChronologyBlock",
  labels: {
    singular: "Chronology / Timeline",
    plural: "Chronology / Timelines",
  },
  fields: [
    {
      name: "variant",
      type: "select",
      label: "Display variant",
      defaultValue: "history",
      required: true,
      options: [
        { label: "History strip (past milestones)", value: "history" },
        { label: "Upcoming steps + newsletter", value: "upcoming" },
      ],
    },
    {
      name: "title",
      type: "text",
      label: "Section title",
    },
    // ── History variant fields ──────────────────────────────────
    {
      name: "milestones",
      type: "array",
      label: "Historical milestones",
      admin: {
        condition: (_, { variant } = {}) => variant === "history",
      },
      fields: [
        { name: "year", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea" },
      ],
    },
    // ── Upcoming variant fields ─────────────────────────────────
    {
      name: "steps",
      type: "array",
      label: "Upcoming steps",
      admin: {
        condition: (_, { variant } = {}) => variant === "upcoming",
      },
      fields: [
        { name: "tag", type: "text", label: "Date tag (e.g. MAI 2026)", required: true },
        { name: "text", type: "text", required: true },
      ],
    },
    {
      name: "newsletterEnabled",
      type: "checkbox",
      label: "Show newsletter signup",
      defaultValue: true,
      admin: {
        condition: (_, { variant } = {}) => variant === "upcoming",
      },
    },
  ],
};
