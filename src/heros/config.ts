import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'

import { linkGroup } from '@/fields/linkGroup'
import { GRADIENT_COLORS, HERO_COLORS, brandOptions } from '@/utilities/brand'

const IMPACT_TYPES = ['homeHero', 'highImpactHero', 'lowImpact']
const WITH_MEDIA = ['homeHero', 'highImpactHero']
const WITH_SUBTITLE = ['homeHero', 'highImpactHero']
// Sliding hero uses a per-slide color instead of one hero-wide background color.
const SELECTABLE_COLOR = ['homeHero', 'highImpactHero']

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'homeHero',
      label: 'Type',
      options: [
        { label: 'None', value: 'none' },
        { label: 'High Impact Hero', value: 'homeHero' },
        { label: 'Medium Impact Hero', value: 'highImpactHero' },
        { label: 'Low Impact Hero', value: 'lowImpact' },
        { label: 'Sliding Hero', value: 'slidingHero' },
      ],
      required: true,
    },
    {
      name: 'bgColor',
      type: 'select',
      label: 'Background color',
      defaultValue: 'base',
      options: brandOptions(HERO_COLORS),
      admin: {
        description:
          'Color for this hero — applied to the gradient (High Impact & Sliding) or the surface background (Medium Impact).',
        condition: (_, { type } = {}) => SELECTABLE_COLOR.includes(type),
      },
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => IMPACT_TYPES.includes(type),
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => WITH_SUBTITLE.includes(type),
      },
    },
    {
      name: 'body',
      type: 'textarea',
      label: 'Body text',
      admin: {
        condition: (_, { type } = {}) => IMPACT_TYPES.includes(type),
      },
    },
    link({
      overrides: {
        name: 'ctaLink',
        label: 'CTA button link',
        admin: {
          condition: (_, { type } = {}) => IMPACT_TYPES.includes(type),
        },
      },
    }),
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        condition: (_, { type } = {}) => WITH_MEDIA.includes(type),
      },
    },
    {
      name: 'timeout',
      type: 'number',
      label: 'Time per slide',
      min: 4000,
      max: 16000,
      defaultValue: 6000,
      admin: {
        condition: (_, { type } = {}) => type === 'slidingHero',
      },
    },
    {
      name: 'slides',
      label: 'Slides',
      interfaceName: 'Slides',
      type: 'array',
      minRows: 1,
      maxRows: 10,
      admin: {
        condition: (_, { type } = {}) => type === 'slidingHero',
      },
      fields: [
        {
          name: 'color',
          type: 'select',
          label: 'Background color',
          defaultValue: 'purple',
          options: brandOptions(GRADIENT_COLORS),
          admin: { description: 'Gradient color for this slide.' },
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        { name: 'title', type: 'text' },
        { name: 'subtitle', type: 'text' },
        {
          name: 'cta',
          type: 'group',
          label: 'Call To Action',
          fields: [
            {
              name: 'enable',
              type: 'checkbox',
              defaultValue: false,
              label: 'Enable CTA Button',
            },
            link({
              overrides: {
                admin: {
                  condition: (_, { enable } = {}) => enable === true,
                },
              },
            }),
          ],
        },
      ],
    },
    {
      // Kept (hidden) to preserve the existing column under push mode — not used
      // by the current heroes. Safe to remove later via a proper migration.
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
      admin: {
        hidden: true,
      },
    },
  ],
  label: false,
}