import { defineEnvVars } from "@sveltejs/kit/env";

// Kit 3 exposes ONLY the variables declared here, through `$app/env/private`
// and `$app/env/public`. With no declaration, `FORMS_INGEST_URL` is undefined
// even when Netlify sets it. The build says so in a warning, and nothing
// fails, so a variable read anywhere in src/ and missing from this file is a
// form that silently stops delivering. Every one is optional: unset is a real
// state (dev, CI), and each reader already handles it.
const optional = (value: string | undefined) => value;

export const variables = defineEnvVars({
  FORMS_INGEST_URL: {
    schema: optional,
    description: "Central form-ingest endpoint the contact and reserve forms post to.",
  },
  FORMS_INGEST_TOKEN: {
    schema: optional,
    description: "Bearer token for the central form-ingest endpoint.",
  },
  PUBLIC_TURNSTILE_SITE_KEY: {
    public: true,
    schema: optional,
    description: "Cloudflare Turnstile sitekey; unset renders no widget.",
  },
});
