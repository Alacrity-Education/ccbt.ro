import type { Endpoint, PayloadRequest } from "payload";

import { publicOrigins } from "@/utilities/publicOrigins";

/**
 * The form endpoint the static site posts to.
 *
 * Payload already publishes one: the form builder plugin's
 * `POST /api/form-submissions`, which is what the CMS's own form block uses.
 * This sits in front of it rather than replacing it, and everything below the
 * write is unchanged — the submission lands in the same collection, and the
 * plugin's own hook sends the notifications configured on the form's Emails
 * tab. What this adds is the three things a cross-origin, unauthenticated
 * endpoint needs and that one cannot be given:
 *
 *   - a name instead of a numeric id, so the static build does not have to
 *     carry CMS primary keys;
 *   - a honeypot and a rate limit, because the plugin's route is `create:
 *     () => true` and every write sends mail — an open relay into the
 *     centre's inbox, once the address is public;
 *   - a shape a form on another site can send without knowing how Payload
 *     stores a submission.
 *
 * Request:
 *   POST /api/public/forms/<slug>
 *   { "data": { "<field name>": "<value>", ... }, "hp": "" }
 *
 * Replies 200 `{ ok: true, confirmation }`, or 400 with the fields at fault.
 */

/** Longest a single answer may be, matching the textarea the CMS stores it in. */
const MAX_VALUE = 5_000;
/** Most fields one submission may carry, before it is junk by definition. */
const MAX_FIELDS = 60;

/** Requests per window, per address. */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
/** Addresses tracked at once; past this the oldest are forgotten. */
const RATE_MAX_KEYS = 5_000;

/**
 * Submissions seen recently, per address.
 *
 * In memory on purpose, and worth knowing the limits of: it is per process,
 * so it resets on deploy and would not be shared if this ever ran as more
 * than one container. That is the right trade here — it costs nothing, needs
 * no table, and the thing it defends against is a script hammering one
 * endpoint, which it does. A determined flood from many addresses is a job
 * for the proxy in front, not for this.
 */
const seen = new Map<string, number[]>();

const rateLimited = (key: string): boolean => {
  const now = Date.now();
  const hits = (seen.get(key) ?? []).filter((at) => now - at < RATE_WINDOW_MS);

  if (hits.length >= RATE_LIMIT) {
    seen.set(key, hits);
    return true;
  }

  hits.push(now);
  seen.set(key, hits);

  // Cheap eviction: the map is only ever read by key, so which entries go does
  // not matter much — only that it cannot grow without bound.
  if (seen.size > RATE_MAX_KEYS) {
    for (const [k, times] of seen) {
      if (times.every((at) => now - at >= RATE_WINDOW_MS)) seen.delete(k);
      if (seen.size <= RATE_MAX_KEYS) break;
    }
  }

  return false;
};

/**
 * Who sent this, as far as can be told. Behind the proxy the socket address is
 * the proxy's, so the first hop in `x-forwarded-for` is the closest thing to
 * the client — spoofable by anyone talking to the origin directly, which is
 * why the limit is a speed bump rather than a gate.
 */
const clientKey = (req: PayloadRequest): string =>
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  req.headers.get("x-real-ip") ||
  "unknown";

const json = (body: unknown, status: number, origin: string | null) =>
  Response.json(body, {
    status,
    headers: origin
      ? {
          "Access-Control-Allow-Origin": origin,
          Vary: "Origin",
        }
      : {},
  });

/** The fields a form actually declares, by name. */
type FormField = {
  blockType?: string;
  name?: string;
  label?: string | null;
  required?: boolean | null;
};

export const publicFormSubmit: Endpoint = {
  path: "/public/forms/:slug",
  method: "post",

  handler: async (req) => {
    const { payload } = req;
    const allowed = publicOrigins();
    const origin = req.headers.get("origin");

    // A browser will not read the reply without this header, so an origin we
    // do not know gets a plain refusal rather than a response it cannot see.
    if (origin && !allowed.includes(origin)) {
      payload.logger.warn({ msg: `Form post from unlisted origin: ${origin}` });
      return json({ ok: false, error: "origin_not_allowed" }, 403, null);
    }

    if (rateLimited(clientKey(req))) {
      return json({ ok: false, error: "rate_limited" }, 429, origin);
    }

    let body: { data?: Record<string, unknown>; hp?: unknown };
    try {
      body = (await req.json?.()) ?? {};
    } catch {
      return json({ ok: false, error: "invalid_json" }, 400, origin);
    }

    // The honeypot: a field hidden from people and irresistible to anything
    // filling the form by reading its markup. Answered with a success, because
    // telling a bot it was caught only teaches it to leave the field alone.
    if (typeof body.hp === "string" && body.hp.trim() !== "") {
      payload.logger.info({ msg: "Form post rejected by honeypot." });
      return json({ ok: true }, 200, origin);
    }

    const slug = String(req.routeParams?.slug ?? "");
    const { docs } = await payload.find({
      collection: "forms",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
      req,
    });

    const form = docs[0];
    if (!form) return json({ ok: false, error: "form_not_found" }, 404, origin);

    const data = body.data ?? {};
    if (Object.keys(data).length > MAX_FIELDS) {
      return json({ ok: false, error: "too_many_fields" }, 400, origin);
    }

    // Only the names the form declares. An unknown key is dropped rather than
    // stored: the notification is a template over these values, so anything
    // accepted here is something a stranger can put in the centre's inbox.
    const fields = ((form.fields ?? []) as FormField[]).filter(
      (field) => typeof field.name === "string" && field.blockType !== "message",
    );

    const errors: { field: string; message: string }[] = [];
    const submissionData: { field: string; value: string }[] = [];

    for (const field of fields) {
      const name = field.name as string;
      const raw = data[name];

      // Several answers to one question arrive as an array — the multi-select
      // does this. The column behind `value` is a single string, so they are
      // joined the same way the CMS's own form block joins them.
      const value = Array.isArray(raw)
        ? raw.map((v) => String(v ?? "")).filter(Boolean).join(", ")
        : raw === null || raw === undefined
          ? ""
          : String(raw);

      if (field.required && value.trim() === "") {
        errors.push({ field: name, message: `${field.label || name} is required.` });
        continue;
      }

      if (value.length > MAX_VALUE) {
        errors.push({ field: name, message: `${field.label || name} is too long.` });
        continue;
      }

      // Every declared field is written, blank ones included: `value` is a
      // required column, and a missing row would leave a {{placeholder}}
      // unreplaced in the notification.
      submissionData.push({ field: name, value });
    }

    if (errors.length) {
      return json({ ok: false, errors }, 400, origin);
    }

    try {
      // Through the Local API, so this is the same write the CMS's own form
      // block makes — same collection, same hook, same notifications.
      await payload.create({
        collection: "form-submissions",
        data: { form: form.id, submissionData },
        req,
      });
    } catch (err) {
      payload.logger.error({ err, msg: `Form "${slug}" submission failed.` });
      return json({ ok: false, error: "submission_failed" }, 500, origin);
    }

    // Handed back so the static site can show what the editor wrote in the CMS
    // rather than carry its own copy of the thank-you.
    return json(
      {
        ok: true,
        confirmationType: form.confirmationType ?? "message",
        confirmation: form.confirmationMessage ?? null,
        redirect: form.redirect ?? null,
      },
      200,
      origin,
    );
  },
};
