import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

export type LinkAppearances =
  | 'brand'
  | 'brandPlinth'
  | 'default'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'neutral'
  | 'success'
  | 'outline'

// Color values mirror the "ccbt" daisyUI theme tokens declared in globals.css.
export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  // The site's action button (see .btn-brand in globals.css). Listed first so it
  // is the default every new link starts on.
  brand: {
    label: 'Button (site standard)',
    value: 'brand',
  },
  // The same button with the offset plinth behind it. Off by default; pick this
  // for the one link on a page that has to carry it.
  brandPlinth: {
    label: 'Button with plinth',
    value: 'brandPlinth',
  },
  default: {
    label: 'Default',
    value: 'default',
  },
  primary: {
    label: 'Primary (Purple)',
    value: 'primary',
  },
  secondary: {
    label: 'Secondary (Coral)',
    value: 'secondary',
  },
  accent: {
    label: 'Accent (Cyan)',
    value: 'accent',
  },
  neutral: {
    label: 'Neutral (Ink)',
    value: 'neutral',
  },
  success: {
    label: 'Success (Green)',
    value: 'success',
  },
  outline: {
    label: 'Outline',
    value: 'outline',
  },
}

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  overrides?: Partial<GroupField>
}) => Field

export const link: LinkType = ({ appearances, disableLabel = false, overrides = {} } = {}) => {
  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Internal link',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: 'Open in new tab',
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Document to link to',
      relationTo: ['pages', 'posts'],
      // Conditionally validate only when type is reference
      validate: (val: any, { siblingData }: { siblingData: any }): string | true => {
        // TEMPORARY BYPASS:
        return true

        // ORIGINAL CODE (Uncomment later):
        // if (siblingData?.type !== 'reference') return true
        // return !!val || 'Please choose a document to link to.'
      },
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: 'Custom URL',
      defaultValue: '#',
      // Conditionally validate only when type is custom
      validate: (val: any, { siblingData }: { siblingData: any }): string | true => {
        // TEMPORARY BYPASS:
        return true

        // ORIGINAL CODE (Uncomment later):
        // if (siblingData?.type !== 'custom') return true
        // return !!val || 'Please provide a URL.'
      },
    },
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    }))

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Label',
          required: false,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    // `defaultValue` below takes the first entry, so ordering is what makes the
    // site standard the default.
    let appearanceOptionsToUse = [
      appearanceOptions.brand,
      appearanceOptions.brandPlinth,
      appearanceOptions.default,
      appearanceOptions.primary,
      appearanceOptions.secondary,
      appearanceOptions.accent,
      appearanceOptions.neutral,
      appearanceOptions.success,
      appearanceOptions.outline,
    ]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: {
        description: 'Choose how the link should be rendered.',
      },
      defaultValue: appearanceOptionsToUse[0]?.value ||'default',
      options: appearanceOptionsToUse,
    })
  }

  return deepMerge(linkResult, overrides)
}
