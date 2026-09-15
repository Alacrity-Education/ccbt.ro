import type { Field } from 'payload'

import { richTextEditor } from '@/fields/richTextEditor'
import { link, type LinkAppearances } from '@/fields/link'

import { linkGroup } from '@/fields/linkGroup'
import { GRADIENT_COLORS, HERO_COLORS, brandOptions } from '@/utilities/brand'

const IMPACT_TYPES = ['homeHero', 'highImpactHero', 'lowImpact']
const WITH_MEDIA = ['homeHero', 'highImpactHero']
const WITH_SUBTITLE = ['homeHero', 'highImpactHero']
// Sliding hero uses a per-slide color instead of one hero-wide background color.
const SELECTABLE_COLOR = ['homeHero', 'highImpactHero']

/**
 * How the hero image fills its frame.
 *
 * `cover` crops to fill and is right for a photograph, where losing the edges
 * costs nothing. `contain` fits the whole image in and leaves the hero's
 * background showing around it — which is what a poster or a logo needs, since
 * cropping those cuts into the artwork.
 */
const OBJECT_FIT_OPTIONS = [
  { label: 'Cover — fill the frame, cropping the edges', value: 'cover' },
  { label: 'Contain — fit the whole image, letterboxed', value: 'contain' },
]

/**
 * The heroes are the one place excluded from the site's single-button rule, but
 * the full palette was more choice than the surface can carry — a hero button
 * sits on a saturated gradient, where most of the daisyUI colours read as mud.
 * These five cover it: the site button, the same with its plinth, and the three
 * that hold up against a photograph.
 *
 * `default` stays because existing hero links are stored with it, and because
 * SlidingHero reads it as "unset" and renders coral.
 */
const HERO_APPEARANCES: LinkAppearances[] = [
  'brand',
  'brandPlinth',
  'default',
  'secondary',
  'outline',
]

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
      appearances: HERO_APPEARANCES,
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
      label: 'Image — desktop',
      admin: {
        condition: (_, { type } = {}) => WITH_MEDIA.includes(type),
      },
    },
    {
      name: 'mediaMobile',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Image — mobile',
      admin: {
        description:
          'Optional portrait crop for phones. A landscape image has to be scaled up hard to fill a tall screen, which is what leaves the subject cropped out. Left empty, the desktop image is used everywhere.',
        condition: (_, { type } = {}) => WITH_MEDIA.includes(type),
      },
    },
    {
      name: 'objectFit',
      type: 'select',
      label: 'Image fit',
      defaultValue: 'cover',
      options: OBJECT_FIT_OPTIONS,
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
          label: 'Image — desktop',
        },
        {
          name: 'mediaMobile',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Image — mobile',
          admin: {
            description:
              'Optional portrait crop for phones; the desktop image is used when empty.',
          },
        },
        {
          name: 'objectFit',
          type: 'select',
          label: 'Image fit',
          defaultValue: 'cover',
          options: OBJECT_FIT_OPTIONS,
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
              appearances: HERO_APPEARANCES,
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
      editor: richTextEditor(['h1', 'h2', 'h3', 'h4']),
      label: false,
      admin: {
        hidden: true,
      },
    },
  ],
  label: false,
}