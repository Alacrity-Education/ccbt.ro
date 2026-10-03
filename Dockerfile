FROM node:22.17.0-bookworm-slim AS base

RUN apt-get update && apt-get install -y --no-install-recommends \
      libcairo2 \
      libpango-1.0-0 \
      libpangocairo-1.0-0 \
      libjpeg62-turbo \
      libgif7 \
      librsvg2-2 \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# ---------------------------------------------------------------- dependencies
FROM base AS deps

COPY package.json package-lock.json .npmrc ./
RUN npm ci

FROM base AS dev
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ------------------------------------------------------------------ migrator
# Run this against the production database before the app starts. The runtime
# image below is a traced standalone bundle and carries no Payload CLI, so the
# migrations cannot be run from it.
FROM base AS migrator
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
CMD ["npx", "payload", "migrate"]

# --------------------------------------------------------------------- build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# next.config.js reads NEXT_PUBLIC_SERVER_URL at build time and throws without it.
ARG NEXT_PUBLIC_SERVER_URL=http://localhost:3000
# NEXT_PUBLIC_* is inlined into the client bundle here, at build time. Setting
# it on the container later only reaches server-side code — the browser gets
# whatever was frozen in now. It is also readable from the published image, so
# never pass a real secret this way.
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
RUN npm run build

# -------------------------------------------------------------------- runtime
FROM base AS runner
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next && chown nextjs:nodejs .next

# Output file tracing keeps the image small.
# https://nextjs.org/docs/app/api-reference/config/next-config-js/output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000 HOSTNAME=0.0.0.0

# server.js is produced by next build from the standalone output
CMD ["node", "server.js"]
