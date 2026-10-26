/**
 * One codebase builds two sites:
 *
 * - cms.ccbt.ro: a Next.js server with Payload, reading the database through
 *   the Local API, deployed as the Docker standalone image. This is the
 *   default — the variable is unset there.
 * - ccbt.ro: the same code exported as static files, built with
 *   NEXT_PUBLIC_STATIC_EXPORT=true. It reads the CMS over its REST API at
 *   build time and has no server of its own.
 *
 * `NEXT_PUBLIC_` so Next inlines the value at build time in server and browser
 * code alike. That inlining is what lets the bundler drop the other branch
 * rather than ship both — which matters, because the branch not taken in the
 * export would otherwise drag `payload`, `pg` and `sharp` into a build that
 * can compile none of them.
 *
 * A constant, not a function, for the same reason: a call the bundler has to
 * reason about is a call it will keep.
 */
export const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
