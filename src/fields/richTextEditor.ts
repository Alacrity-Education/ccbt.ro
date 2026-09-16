import {
  AlignFeature,
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  TextStateFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { ButtonBlock } from '@/blocks/Button/config'
import { CardsBlock } from '@/blocks/Cards/config'
import { TEXT_STATE } from './textState'

type HeadingSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type EditorOptions = {
  /**
   * Adds the left/center/right controls to the toolbar.
   *
   * Off by default. Most copy on the site is left-aligned by its block, and an
   * alignment control there would only let an editor fight the layout; it is
   * turned on for the blocks whose design actually offers the choice.
   */
  align?: boolean
  /**
   * Adds the cards block to the insert menu. Only the Content block turns this
   * on — cards are a section-level device, and offering them inside every rich
   * text field invites a row of them in places that cannot hold one.
   */
  cards?: boolean
}

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
export const richTextEditor = (
  headings?: HeadingSize[],
  { align = false, cards = false }: EditorOptions = {},
) =>
  lexicalEditor({
    features: ({ rootFeatures }) => [
      ...rootFeatures,
      ...(headings ? [HeadingFeature({ enabledHeadingSizes: headings })] : []),
      ...(align ? [AlignFeature()] : []),
      TextStateFeature({ state: TEXT_STATE }),
      BlocksFeature({ blocks: cards ? [ButtonBlock, CardsBlock] : [ButtonBlock] }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
    ],
  })
