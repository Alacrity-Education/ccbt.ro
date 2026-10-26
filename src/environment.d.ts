declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      DATABASE_URI: string
      NEXT_PUBLIC_SERVER_URL: string
      VERCEL_PROJECT_PRODUCTION_URL: string
      /**
       * SMTP. Unset means no email adapter at all: Payload logs the message it
       * would have sent instead of sending it (see src/email). Optional, so
       * typed as possibly undefined — the rest of this list is required and
       * the app does not start without it.
       */
      SMTP_HOST?: string
      SMTP_PORT?: string
      SMTP_USER?: string
      SMTP_PASS?: string
      SMTP_FROM_ADDRESS?: string
      SMTP_FROM_NAME?: string
      /** Comma-separated origins allowed to post a form. See utilities/publicOrigins. */
      PUBLIC_FORM_ORIGINS?: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
