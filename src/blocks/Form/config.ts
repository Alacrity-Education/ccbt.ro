import type { Block } from 'payload'

import { richTextEditor } from '@/fields/richTextEditor'
import { sectionBackground } from '@/fields/sectionBackground'

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
    /**
     * How the form's panel is drawn. The two coloured ones are solid brand
     * surfaces, which means the controls inside have to change with them — the
     * component inverts the labels, fields and button rather than leaving dark
     * text on a dark panel (see Component.tsx).
     */
    {
      name: 'variant',
      type: 'select',
      label: 'Variant',
      defaultValue: 'default',
      options: [
        { label: 'Default — outlined', value: 'default' },
        { label: 'Purple', value: 'purple' },
        { label: 'Coral', value: 'coral' },
      ],
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
      sectionBackground,
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
  labels: {
    plural: 'Form Blocks',
    singular: 'Form Block',
  },
}
