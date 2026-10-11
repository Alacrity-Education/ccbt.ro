import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor, OrderedListFeature, UnorderedListFeature,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Banner } from '../../blocks/Banner/config'

import { MediaBlock } from '../../blocks/MediaBlock/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { HERO_COLORS, brandOptions } from '@/utilities/brand'
import { populateAuthors } from './hooks/populateAuthors'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'

export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a post is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'posts'>
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'posts',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'posts',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: false,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            /**
             * The post's hero, as one or more slides.
             *
             * One slide is an ordinary post hero and looks exactly as it always
             * has; more than one cycles between them. The post's own title,
             * categories, author and date stay put across the whole run — a
             * post is one article, so only what sits behind it changes.
             *
             * The two single-image fields below predate this and still render
             * when no slide has been added, so no post had to be touched to
             * keep working. A post that has slides ignores them.
             */
            {
              name: 'heroSlides',
              label: 'Hero slides',
              type: 'array',
              minRows: 0,
              maxRows: 10,
              admin: {
                initCollapsed: true,
                description:
                  'One slide renders as a normal hero; add more to make it cycle. Leave empty to use the single hero image below.',
              },
              fields: [
                {
                  name: 'media',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Image — desktop',
                },
                {
                  name: 'mediaMobile',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Image — mobile',
                  admin: {
                    description:
                      'Optional portrait crop for phones; the desktop image is used when empty.',
                  },
                },
                {
                  name: 'overlayColor',
                  type: 'select',
                  label: 'Overlay colour',
                  defaultValue: 'purple',
                  options: [
                    ...brandOptions(HERO_COLORS),
                    { label: 'None — no overlay', value: 'none' },
                  ],
                  admin: {
                    description:
                      'The wash that keeps the title legible, or none to leave the image untinted.',
                  },
                },
              ],
            },
            {
              name: 'heroSlideTimeout',
              type: 'number',
              label: 'Time per slide',
              min: 4000,
              max: 16000,
              defaultValue: 6000,
              admin: {
                description: 'Milliseconds. Only used when there is more than one slide.',
              },
            },
            {
              name: 'heroImageMD',
              label: 'Hero Image (Desktop)',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Used only when no hero slides have been added.',
              },
            },
            {
              name: 'heroImageSM',
              label: 'Hero Image (Mobile)',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Used only when no hero slides have been added.',
              },
            },
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: [Banner, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    UnorderedListFeature(),
                    OrderedListFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: false,
              required: true,
            },
          ],
          label: 'Content',
        },
        {
          fields: [
            {
              name: 'relatedPosts',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: 'posts',
            },
            {
              name: 'categories',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'categories',
            },
          ],
          label: 'Meta',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      // Same choice the page heroes offer, so a post's hero can be tinted to
      // match the section it belongs to rather than always fading to black.
      name: 'heroOverlayColor',
      type: 'select',
      label: 'Hero overlay colour',
      defaultValue: 'purple',
      options: [...brandOptions(HERO_COLORS), { label: 'None — no overlay', value: 'none' }],
      admin: {
        position: 'sidebar',
        description:
          'The wash over the hero image that keeps the title legible. Used only when no hero slides have been added — a slide carries its own.',
      },
    },
    {
      name: 'showMotif',
      type: 'checkbox',
      label: 'Show decorative motif',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description:
          'Purple strip between the hero and the article, plus the woven ribbon running down beside it. On by default; switch off to hide it for this post.',
      },
    },
    {
      name: 'isEvent',
      type: 'checkbox',
      label: 'Is event',
      defaultValue: false,
    },
    {
      name: 'eventDate',
      type: 'date',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.isEvent),
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks:{
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value && siblingData?.isEvent) {
              return new Date()
            }
            return value
          },
        ],
      }
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'users',
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
