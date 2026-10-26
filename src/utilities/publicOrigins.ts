/**
 * The sites allowed to post a form to this one.
 *
 * ccbt.ro is built and hosted separately from the CMS, so a form there is a
 * cross-origin request and the browser will not send it unless this server
 * says the origin is welcome. Set PUBLIC_FORM_ORIGINS to a comma-separated
 * list of full origins — scheme and host, no trailing slash:
 *
 *   PUBLIC_FORM_ORIGINS=https://ccbt.ro,https://www.ccbt.ro
 *
 * Worth being clear about what this is: a browser rule, not a lock. CORS is
 * enforced by the browser on behalf of the page making the request, so it
 * stops another site's JavaScript from posting on a visitor's behalf — and
 * stops nothing at all from a script that sends the request itself, with no
 * Origin header or a forged one. What actually keeps rubbish out of the
 * submissions is the honeypot and the rate limit on the endpoint.
 */
export const publicOrigins = (): string[] =>
  (process.env.PUBLIC_FORM_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean);
