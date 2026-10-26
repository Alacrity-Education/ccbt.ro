import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

// ccbt.ro is this same code exported as static files; cms.ccbt.ro is the
// server. See src/utilities/siteMode.ts for what each build is. Read from the
// environment directly rather than imported from there, because this file is
// loaded by the Next CLI before any TypeScript path alias resolves.
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // standalone emits .next/standalone, which the Dockerfile's production stage
  // copies into the runtime image. export writes plain HTML to out/ for the
  // static host. The two are mutually exclusive, which is why this is a
  // ternary and not two keys.
  output: isStaticExport ? 'export' : 'standalone',
  images: {
    // No image optimiser in an export — there is no server to run one. The
    // consequence is not just "images are unoptimised": Next also drops the
    // srcSet and sizes it would have generated, so the browser fetches
    // whatever `src` points at. See components/Media/ImageMedia, which builds
    // its own srcSet from the derivatives Payload made at upload.
    ...(isStaticExport ? { unoptimized: true } : {}),
    dangerouslyAllowLocalIP: true,
    // ImageMedia requests quality 80. Next only serves qualities listed here and
    // answers 400 for anything else, so omitting the one it asks for breaks
    // every image that component renders — not just a warning.
    qualities: [75, 80],
    remotePatterns: [
      ...[
        process.env.NEXT_PUBLIC_SERVER_URL,
        // Media is served by the Payload instance, which in the static build
        // is a different origin from the site rendering it.
        process.env.NEXT_PUBLIC_PAYLOAD_API_URL,
      ]
        // filter(Boolean) so an unset variable is skipped rather than throwing
        // "Invalid URL" out of new URL(undefined) and failing the whole build.
        .filter(Boolean)
        .map((item) => {
          const url = new URL(item)

          return {
            hostname: url.hostname,
            protocol: url.protocol.replace(':', ''),
          }
        })
        // The two variables usually name the same origin on the server build;
        // keep one entry for it.
        .filter(
          (pattern, i, all) =>
            all.findIndex(
              (other) =>
                other.hostname === pattern.hostname &&
                other.protocol === pattern.protocol,
            ) === i,
        ),
    ],
  },

  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  // An export has no server to answer a redirect, and Next warns and ignores
  // the key rather than failing — which would be a silent loss. The static
  // host serves them instead.
  ...(isStaticExport ? {} : { redirects }),
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // The frontend and the admin have separate root layouts, so the 404 for an
  // address matching no route is src/app/global-not-found.tsx. Without this
  // the export has no out/404.html to write.
  experimental: {
    globalNotFound: true,
    staticGenerationRetryCount: 3,
    // Tuned for the server build, which prerenders almost nothing. The export
    // renders every page and post, so it is given room to do so.
    staticGenerationMaxConcurrency: isStaticExport ? 8 : 2,
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
