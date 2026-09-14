import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  /**
   * Exposes the site's content over MCP, served at `/api/mcp`.
   *
   * The plugin adds a `payload-mcp-api-keys` collection: a client authenticates
   * with a key issued there, so access is granted per key rather than being open
   * to anyone who can reach the endpoint.
   *
   * What each collection allows is listed rather than switched on wholesale.
   * `users` is left out entirely — it is the auth collection, and nothing good
   * comes of handing it to a client. `forms` and `form-submissions` are read
   * only: submissions are people's messages, and a form's own shape is not
   * something to edit remotely.
   *
   * The experimental tools stay off. They write collection configs, the Payload
   * config and job definitions to disk, which is a different kind of access from
   * editing content.
   */
  mcpPlugin({
    collections: {
      pages: {
        description: 'Site pages, each assembled from layout blocks.',
        enabled: { create: true, delete: true, find: true, update: true },
      },
      posts: {
        description: 'News and articles.',
        enabled: { create: true, delete: true, find: true, update: true },
      },
      categories: {
        description: 'Categories used to group posts.',
        enabled: { create: true, delete: true, find: true, update: true },
      },
      media: {
        description: 'Uploaded images and files.',
        enabled: { create: false, delete: false, find: true, update: true },
      },
      forms: {
        description: 'Form definitions used by the form block.',
        enabled: { find: true },
      },
      'form-submissions': {
        description: 'Submitted form entries.',
        enabled: { find: true },
      },
    },
    globals: {
      header: {
        description: 'Header navigation.',
        enabled: { find: true, update: true },
      },
      footer: {
        description: 'Footer navigation.',
        enabled: { find: true, update: true },
      },
    },
  }),
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
]
