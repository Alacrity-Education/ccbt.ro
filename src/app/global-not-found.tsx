import Link from "next/link";
import React from "react";

import { cn } from "@/utilities/ui";
import { SITE_NAME } from "@/utilities/siteMeta";

import "./(frontend)/globals.css";

export const metadata = {
  title: `Pagina nu a fost găsită — ${SITE_NAME}`,
};

/**
 * The 404 for an address that matches no route at all.
 *
 * The frontend and the Payload admin have separate root layouts, so there is
 * no single layout Next can wrap a not-found page in — which is what
 * `experimental.globalNotFound` is for, and why this file brings its own
 * `<html>`. `(frontend)/not-found.tsx` still handles the in-layout case, a
 * page that routed here but holds no document.
 *
 * It reads nothing from the CMS, and that is the point rather than an
 * accident: Next prerenders this route whatever it declares, so anything it
 * read would be read during the Docker image build, where there is no
 * database — and the layout-level `force-dynamic` that used to hold that back
 * is gone, because an export rejects it.
 */
export default function GlobalNotFound() {
  return (
    <html lang="ro">
      <body className={cn("bg-base-100 text-base-content")}>
        <div className="container py-28">
          <div className="prose max-w-none">
            <h1 style={{ marginBottom: 0 }}>404</h1>
            <p className="mb-4">Pagina căutată nu există.</p>
          </div>
          <Link className="btn-brand" href="/">
            Înapoi la pagina principală
          </Link>
        </div>
      </body>
    </html>
  );
}
