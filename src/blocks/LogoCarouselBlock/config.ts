import type { Block } from 'payload'
import { sectionLayout } from '@/fields/sectionLayout'

export const CarouselLogoBlock: Block = {
  slug: 'carouselLogoBlock',
  interfaceName: 'CarouselLogoBlock',
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Logos to be displayed',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Logo title',
          required: true,
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
        },
      ],
    },
      ...sectionLayout(),
  ],
}