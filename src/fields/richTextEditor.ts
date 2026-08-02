import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

type HeadingSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

/**
 * The editor shared by every rich text field in the project: the default feature
 * set plus both toolbars, and a heading control when the field allows headings.
 *
 * Ten configs carried a verbatim copy of this; only the heading levels ever
 * differed, which is why they are the one argument. The exception is the Posts body
 * (see collections/Posts), which additionally embeds blocks, lists and rules in a
 * specific order and keeps its own editor.
 */
export const richTextEditor = (headings?: HeadingSize[]) =>
  lexicalEditor({
    features: ({ rootFeatures }) => [
      ...rootFeatures,
      ...(headings ? [HeadingFeature({ enabledHeadingSizes: headings })] : []),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
    ],
  })
