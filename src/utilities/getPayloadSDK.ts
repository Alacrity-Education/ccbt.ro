import type { Config } from "@/payload-types";

import { PayloadSDK } from "@payloadcms/sdk";

import canUseDOM from "./canUseDOM";
import { getServerSideURL } from "./getURL";
import { isStaticExport } from "./siteMode";

let client: PayloadSDK<Config> | null = null;

/**
 * Payload over REST.
 *
 * This is how the static build reads content: it has no database and no Local
 * API, only HTTP to the CMS. The server build reaches for it too, but only
 * from the browser — see the search results component, which runs client-side
 * in both builds.
 *
 * REST always applies access control, and there is no `overrideAccess` to
 * reach for, so every collection the frontend reads this way has to be
 * readable anonymously. That is already true of what the site renders — pages
 * and posts are `authenticatedOrPublished`, media and categories are open —
 * but it is the constraint to check before adding a collection to a page.
 *
 * Built once and kept: a new SDK per call would discard nothing but would
 * churn an object on every render.
 */
export const getSDK = (): PayloadSDK<Config> => {
  if (client) return client;

  const configured = process.env.NEXT_PUBLIC_PAYLOAD_API_URL;

  // Without it the export would quietly build against its own origin, which
  // serves no API, and publish a site of empty pages. Better to stop here.
  if (!configured && isStaticExport) {
    throw new Error(
      "NEXT_PUBLIC_PAYLOAD_API_URL must be set for the static export",
    );
  }

  const baseURL =
    configured ||
    `${canUseDOM ? window.location.origin : getServerSideURL()}/api`;

  client = new PayloadSDK<Config>({ baseURL });

  return client;
};
