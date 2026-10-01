import type { Block } from 'payload'
import { sectionBackground } from '@/fields/sectionBackground'

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
      sectionBackground,
  ],
}
