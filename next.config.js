import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'


/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emits .next/standalone, which the Dockerfile's production stage copies. Harmless
  // outside Docker — `next dev` and `next start` are unaffected.
  output: 'standalone',
  images: {
    dangerouslyAllowLocalIP:true,
    // ImageMedia requests quality 80. Next only serves qualities listed here and
    // answers 400 for anything else, so omitting the one it asks for breaks
    // every image that component renders — not just a warning.
    qualities: [75, 80],
    remotePatterns: [

      ...[process.env.NEXT_PUBLIC_SERVER_URL].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
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
  redirects,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  experimental: {
    staticGenerationRetryCount: 3,
    staticGenerationMaxConcurrency: 2,

  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
