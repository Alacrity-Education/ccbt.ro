import type { Block } from 'payload'

import { richTextEditor } from '@/fields/richTextEditor'
import { sectionLayout } from '@/fields/sectionLayout'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: false,
    },
    {
      name: 'showTitle',
      type: 'checkbox',
      label: 'Show Form Title',
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Intro Content',
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
      editor: richTextEditor(['h1', 'h2', 'h3', 'h4']),
      label: 'Intro Content',
    },
      ...sectionLayout(),
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
  labels: {
    plural: 'Form Blocks',
    singular: 'Form Block',
  },
}
