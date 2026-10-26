"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { CollectionArchive } from "@/components/CollectionArchive";
import type { CardPostData } from "@/components/Card";
// `@/utilities/getPayloadSDK`, not the reader: this runs in the browser in
// both builds, so it always wants REST. The reader would resolve to the Local
// API on the server build and pull payload.config into a browser bundle.
import { getSDK } from "@/utilities/getPayloadSDK";

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error" }
  | { status: "done"; posts: CardPostData[] };

/**
 * Results fetched in the browser rather than on the server.
 *
 * A static export has no server to read `?q=` on: every visitor to /search
 * gets the same prerendered HTML, so the query is only ever known
 * client-side. The server build uses this component too — it loses nothing by
 * fetching the same results from the browser, and one implementation is
 * easier to keep honest than two.
 *
 * This requires the Payload instance to allow this origin in its `cors`
 * config; see utilities/publicOrigins, which feeds it.
 */
export const SearchResults: React.FC = () => {
  const query = (useSearchParams().get("q") ?? "").trim();
  const [state, setState] = useState<State>({ status: "idle" });

  useEffect(() => {
    if (!query) {
      setState({ status: "idle" });
      return;
    }

    // A request in flight when the query changes would otherwise be free to
    // land after the newer one and overwrite it with stale results.
    let cancelled = false;
    setState({ status: "loading" });

    getSDK()
      .find({
        collection: "search",
        depth: 1,
        limit: 12,
        pagination: false,
        select: { title: true, slug: true, categories: true, meta: true },
        where: {
          or: [
            { title: { like: query } },
            { "meta.description": { like: query } },
            { "meta.title": { like: query } },
            { slug: { like: query } },
          ],
        },
      })
      .then((result) => {
        if (cancelled) return;
        setState({ status: "done", posts: result.docs as CardPostData[] });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  if (state.status === "idle")
    return <div className="container">Scrie pentru a căuta.</div>;

  if (state.status === "loading")
    return <div className="container">Se caută…</div>;

  if (state.status === "error")
    return (
      <div className="container">
        Căutarea nu a putut fi efectuată. Încearcă din nou.
      </div>
    );

  if (state.posts.length === 0)
    return <div className="container">Niciun rezultat.</div>;

  return <CollectionArchive posts={state.posts} />;
};
