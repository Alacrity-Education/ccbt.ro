import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  TextStateFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { ButtonBlock } from '@/blocks/Button/config'
import { TEXT_STATE } from './textState'

type HeadingSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

/**
 * The editor shared by every rich text field in the project: the default feature
 * set plus both toolbars, and a heading control when the field allows headings.
 *
 * Ten configs carried a verbatim copy of this; only the heading levels ever
 * differed, which is why they are the one argument. The exception is the Posts body
 * (see collections/Posts), which additionally embeds blocks, lists and rules in a
 * specific order and keeps its own editor.
 *
 * TextStateFeature adds the brand text colors (see fields/textState). It stores a
 * state key on the text node rather than inline CSS, so the rendered styling is
 * decided by the JSX converter and can be changed later without touching content.
 *
 * BlocksFeature contributes the button, so a call to action belongs to the copy
 * that leads up to it instead of being a separate field on the block.
 */
export const richTextEditor = (headings?: HeadingSize[]) =>
  lexicalEditor({
    features: ({ rootFeatures }) => [
      ...rootFeatures,
      ...(headings ? [HeadingFeature({ enabledHeadingSizes: headings })] : []),
      TextStateFeature({ state: TEXT_STATE }),
      BlocksFeature({ blocks: [ButtonBlock] }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
    ],
  })
