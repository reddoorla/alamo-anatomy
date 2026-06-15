import { error } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { createIngestAction } from "@reddoorla/maintenance/forms";
import { createClient } from "$lib/prismicio";
import type { Actions } from "./$types";

// Root layout sets prerender = "auto"; a form action can't run on a prerendered route.
export const prerender = false;

export async function load({ fetch, cookies }) {
  const client = createClient({ fetch, cookies });
  try {
    const page = await client.getSingle("contact");
    return {
      page,
      title: page.data.title,
      meta_description: page.data.meta_description,
      meta_title: page.data.meta_title,
      meta_image: page.data.meta_image?.url,
      formTs: Date.now(),
    };
  } catch {
    error(404, { message: "Page not found" });
  }
}

export const actions: Actions = {
  default: createIngestAction({
    formType: "contact",
    redirectTo: "/thank-you",
    getConfig: () => ({ url: env.FORMS_INGEST_URL, token: env.FORMS_INGEST_TOKEN }),
    buildPayload: (form, event) => {
      const first = form.get("first_name")?.toString() ?? "";
      const last = form.get("last_name")?.toString() ?? "";
      return {
        name: `${first} ${last}`.trim(),
        firstName: first || undefined,
        lastName: last || undefined,
        email: form.get("email")?.toString(),
        phone: form.get("phone")?.toString(),
        message: form.get("message")?.toString(),
        sourceUrl: event.url.href,
      };
    },
  }),
};
