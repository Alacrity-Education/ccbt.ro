import type { Block } from 'payload'
import { sectionBackground } from '@/fields/sectionBackground'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    /**
     * A YouTube link, which is not an upload and so cannot be a media document.
     * Given one, the block renders the player and ignores the upload below.
     */
    {
      name: 'youtubeUrl',
      type: 'text',
      label: 'YouTube link',
      admin: {
        description:
          'Paste any YouTube link — watch, youtu.be, embed or Shorts. Leave empty to show the uploaded file instead.',
      },
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        condition: (_data, siblingData) => !siblingData?.youtubeUrl,
      },
    },
      sectionBackground,
  ],
}
