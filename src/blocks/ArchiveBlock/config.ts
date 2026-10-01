import type { Block } from "payload";

import { richTextEditor } from "@/fields/richTextEditor";
import { sectionBackground } from "@/fields/sectionBackground"

export const Archive: Block = {
  slug: "archive",
  interfaceName: "ArchiveBlock",
  fields: [
    {
      name: "introContent",
      type: "richText",
      editor: richTextEditor(["h2", "h3"]),
      label: "Intro Content",
      admin: {
        description:
          "Heading 3 renders as the eyebrow, Heading 2 as the heading, paragraphs as body text — in whatever order you write them. Add a Button block for the call to action.",
      },
    },
    {
      name: "style",
      type: "select",
      options: [
        { label: "Text", value: "text" },
        { label: "Cards", value: "cards" },
      ],
      defaultValue: "text",
    },
    // The button used to live here as its own field, pinned below the intro and
    // only available to the Text style. It is a Button block inside introContent
    // now, so both styles can have one and the editor places it.
    {
      name: "populateBy",
      type: "select",
      defaultValue: "collection",
      options: [
        {
          label: "Collection",
          value: "collection",
        },
        {
          label: "Individual Selection",
          value: "selection",
        },
      ],
    },
    {
      name: "relationTo",
      type: "select",
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === "collection",
      },
      defaultValue: "posts",
      label: "Collections To Show",
      options: [
        {
          label: "Posts",
          value: "posts",
        },
      ],
    },
    {
      name: "categories",
      type: "relationship",
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === "collection",
      },
      hasMany: true,
      label: "Categories To Show",
      relationTo: "categories",
    },
    {
      name: "limit",
      type: "number",
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === "collection",
        step: 1,
      },
      defaultValue: 10,
      label: "Limit",
    },
    {
      name: "selectedDocs",
      type: "relationship",
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === "selection",
      },
      hasMany: true,
      label: "Selection",
      relationTo: ["posts"],
    },
    {
      name: "longCardStyles",
      type: "group",
      label: "Card Styles",
      admin: {
        condition: (_, siblingData) => siblingData.style === "cards",
      },
      fields: [
        {
          name: "card1",
          type: "select",
          label: "Card 1 Style",
          defaultValue: "primary",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Starry", value: "starry" },
            { label: "Transparent", value: "transparent" },
          ],
        },
        {
          name: "card2",
          type: "select",
          label: "Card 2 Style",
          defaultValue: "secondary",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Starry", value: "starry" },
            { label: "Transparent", value: "transparent" },
          ],
        },
        {
          name: "card3",
          type: "select",
          label: "Card 3 Style",
          defaultValue: "starry",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Starry", value: "starry" },
            { label: "Transparent", value: "transparent" },
          ],
        },
        {
          name: "card4",
          type: "select",
          label: "Card 4 Style",
          defaultValue: "transparent",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Starry", value: "starry" },
            { label: "Transparent", value: "transparent" },
          ],
        },
      ],
    },
      sectionBackground,
  ],
  labels: {
    plural: "Archives",
    singular: "Archive",
  },
};
