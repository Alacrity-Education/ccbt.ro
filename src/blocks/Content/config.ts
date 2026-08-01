import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { SURFACE_COLORS, brandOptions } from '@/utilities/brand'

// Brand palette shared by the decorator's two lines; the fills live in
// utilities/brand, mapped onto the theme tokens.
const decoratorColorOptions = brandOptions(SURFACE_COLORS)

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },

    ],
  },

  // A column holds either text or an image, never both — the grid stays predictable
  // and the irrelevant field hides itself. Values mirror the ImageContent block's
  // cell type so both blocks read the same. Not required: existing rows predate the
  // field and read as text (see the `?? 'text'` fallback in Component.tsx).
  {
    name: 'type',
    type: 'select',
    label: 'Column Content',
    defaultValue: 'text',
    options: [
      { label: 'Text', value: 'text' },
      { label: 'Media', value: 'media' },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
    admin: {
      condition: (_data, siblingData) => siblingData?.type !== 'media',
    },
  },
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
    label: 'Image',
    admin: {
      condition: (_data, siblingData) => siblingData?.type === 'media',
    },
  },
  {
    name: 'decorator',
    type: 'group',
    label: 'Corner decorator',
    admin: {
      description: "L-shaped brand mark drawn over the image's top-right corner.",
      condition: (_data, siblingData) => siblingData?.type === 'media',
    },
    fields: [
      {
        name: 'enabled',
        type: 'checkbox',
        label: 'Enable decorator',
        defaultValue: false,
      },
      {
        type: 'row',
        fields: [
          {
            name: 'verticalColor',
            type: 'select',
            label: 'Vertical line',
            defaultValue: 'coral',
            options: decoratorColorOptions,
            admin: {
              width: '50%',
              condition: (_data, siblingData) => Boolean(siblingData?.enabled),
            },
          },
          {
            name: 'horizontalColor',
            type: 'select',
            label: 'Horizontal line',
            defaultValue: 'purple',
            options: decoratorColorOptions,
            admin: {
              width: '50%',
              condition: (_data, siblingData) => Boolean(siblingData?.enabled),
            },
          },
        ],
      },
    ],
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name:"title",
      type:"text",
      label:"title",
    },
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
