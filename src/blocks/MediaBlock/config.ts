import type { Block } from 'payload'
import { sectionLayout } from '@/fields/sectionLayout'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
      ...sectionLayout(),
  ],
}
