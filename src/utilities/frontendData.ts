import type { Payload } from "payload";

import { draftMode } from "next/headers";

import { getSDK } from "./getPayloadSDK";
import { isStaticExport } from "./siteMode";

/** The read operations the frontend uses, with the Local API's signatures. */
export type FrontendReader = Pick<
  Payload,
  "count" | "find" | "findByID" | "findGlobal"
>;

/**
 * Local API options that mean nothing over REST are dropped rather than sent
 * as query parameters. The static site only ever shows published content.
 *
 * This is what lets every call site keep writing `overrideAccess: false` and
 * `req`: over REST access control always applies, so the option is redundant
 * rather than wrong, and sending it would only put a stray query parameter on
 * the wire.
 */
const toRest = (args: object): never => {
  const {
    overrideAccess: _overrideAccess,
    req: _req,
    user: _user,
    ...rest
  } = args as Record<string, unknown>;

  if ("draft" in rest) rest.draft = false;

  return rest as never;
};

const restReader = {
  count: (args: object) => getSDK().count(toRest(args)),
  find: (args: object) => getSDK().find(toRest(args)),
  findByID: (args: object) => getSDK().findByID(toRest(args)),
  findGlobal: (args: object) => getSDK().findGlobal(toRest(args)),
} as unknown as FrontendReader;

/**
 * Where frontend pages read content from: the Local API on cms.ccbt.ro, the
 * remote REST API in the static export.
 *
 * `payload` and its config are imported lazily, inside the branch. That is
 * the whole trick, and it is not a style choice: a static `import` at the top
 * of this file would put Payload, `pg` and `sharp` in the export's build
 * graph, none of which it can compile and none of which it has a database
 * for. The condition is a build-time constant, so the bundler drops the
 * branch it does not need — but only because the imports are inside it.
 *
 * Typed as the Local API's own signatures (`Pick<Payload, …>`) so call sites
 * never learn which reader they got, and a call that type-checks here
 * type-checks in both builds.
 */
export const getReader = async (): Promise<FrontendReader> => {
  if (isStaticExport) return restReader;

  const [{ getPayload }, { default: config }] = await Promise.all([
    import("payload"),
    import("@payload-config"),
  ]);

  return getPayload({ config });
};

/**
 * Whether the reader is in Payload's draft preview.
 *
 * Always false in the static export: preview needs a server to set the cookie
 * and to render on demand, and an export has neither. Written so `draftMode()`
 * is never reached there — it is a dynamic API, and merely calling one makes a
 * route unexportable, so the check has to come before the call rather than
 * around its result.
 */
export const isDraftMode = async (): Promise<boolean> => {
  if (isStaticExport) return false;

  return (await draftMode()).isEnabled;
};
