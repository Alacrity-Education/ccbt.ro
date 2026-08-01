import type { Block } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { link } from "@/fields/link";

export const Archive: Block = {
  slug: "archive",
  interfaceName: "ArchiveBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Block Title",
    },
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      admin: {
        description: "Small label above the title (Text variant).",
        condition: (_, siblingData) => siblingData.style === "text",
      },
    },
    {
      name: "introContent",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
      label: "Intro Content",
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
    link({
      appearances: false,
      overrides: {
        label: "Button",
        admin: {
          condition: (_, siblingData) => siblingData.style === "text",
        },
      },
    }),
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
  ],
  labels: {
    plural: "Archives",
    singular: "Archive",
  },
};
