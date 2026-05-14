import type { Block } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

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
      name: "eventsOnly",
      type: "checkbox",
      label: "Show events only (upcoming future events)",
      defaultValue: false,
    },
    {
      name: "sectionLabel",
      type: "text",
      label: "Section label",
      defaultValue: "Evenimente",
      admin: {
        condition: (_, siblingData) => siblingData.eventsOnly === true,
      },
    },
    {
      name: "viewAllUrl",
      type: "text",
      label: "\"View all\" link URL",
      defaultValue: "/posts",
      admin: {
        condition: (_, siblingData) => siblingData.eventsOnly === true,
      },
    },
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
