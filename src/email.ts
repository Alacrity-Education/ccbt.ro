import { nodemailerAdapter } from "@payloadcms/email-nodemailer";

/**
 * How the site sends mail: plain SMTP, through whatever mailbox the centre
 * already owns.
 *
 * Nothing here is called by the form code. The form builder plugin writes
 * every submission to `form-submissions` and its own `afterChange` hook then
 * calls `payload.sendEmail` once per entry in that form's Emails list — so
 * which address a form notifies, and what the message says, is set per form in
 * the admin rather than here. This only decides how that mail leaves the
 * server. (See plugins/index.ts for the plugin, and the Emails tab on any form
 * for the templates, which take `{{field_name}}`.)
 *
 * Returns `undefined` when SMTP_HOST is unset, which leaves Payload with no
 * adapter: it logs the message it would have sent and carries on. That is what
 * local development wants, and it is also the safe failure in production —
 * a missing variable costs the notification, not the submission, because the
 * row is written before the hook runs.
 *
 * Deliberately not falling back to the adapter's own default, which reaches
 * out to Ethereal for a throwaway test account at boot. In a container with no
 * egress to it that is a hang on startup, and a silent one.
 */
export const email = (() => {
  const host = process.env.SMTP_HOST;

  if (!host) return undefined;

  const port = Number(process.env.SMTP_PORT ?? 587);

  return nodemailerAdapter({
    defaultFromAddress: process.env.SMTP_FROM_ADDRESS ?? `noreply@${host}`,
    defaultFromName: process.env.SMTP_FROM_NAME ?? "Centrul Cultural Botoșani",
    transportOptions: {
      host,
      port,
      // 465 is SMTPS, where TLS wraps the connection from the start. Everything
      // else — 587 above all — starts in the clear and upgrades with STARTTLS,
      // which is what `secure: false` means here: not "no encryption", but
      // "negotiate it". Setting it the other way round on 587 fails by hanging
      // until the socket times out rather than by saying anything.
      secure: port === 465,
      auth: process.env.SMTP_USER
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          }
        : undefined,
    },
  });
})();
