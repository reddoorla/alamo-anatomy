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
    const page = await client.getSingle("reserve");
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

const str = (form: FormData, key: string) => form.get(key)?.toString();

export const actions: Actions = {
  default: createIngestAction({
    formType: "reserve",
    redirectTo: "/thank-you",
    getConfig: () => ({ url: env.FORMS_INGEST_URL, token: env.FORMS_INGEST_TOKEN }),
    buildPayload: (form, event) => ({
      // typed columns
      name: str(form, "main_contact_name"),
      email: str(form, "requestor_email"),
      phone: str(form, "requestor_phone"),
      message: str(form, "event_description"),
      sourceUrl: event.url.href,
      // everything else → Extra fields (multi-value catering joined)
      preferred_start_date: str(form, "preferred_start_date"),
      preferred_end_date: str(form, "preferred_end_date"),
      number_of_stations: str(form, "number_of_stations"),
      time_slots: str(form, "time_slots"),
      estimated_attendees: str(form, "estimated_attendees"),
      c_arm_needed: str(form, "c_arm_needed"),
      drills_needed: str(form, "drills_needed"),
      arthroscope_needed: str(form, "arthroscope_needed"),
      tissue_type: str(form, "tissue_type"),
      procedure_description: str(form, "procedure_description"),
      catering: form.getAll("catering").map(String).join(", ") || undefined,
      additional_catering_info: str(form, "additional_catering_info"),
      diet_accommodations: str(form, "diet_accommodations"),
      requestor_company: str(form, "requestor_company"),
      day_of_contact: str(form, "day_of_contact"),
      ap_contact_name: str(form, "ap_contact_name"),
      ap_contact_phone: str(form, "ap_contact_phone"),
      ap_contact_email: str(form, "ap_contact_email"),
      billing_street: str(form, "billing_street"),
      billing_city: str(form, "billing_city"),
      billing_state: str(form, "billing_state"),
      billing_zip: str(form, "billing_zip"),
    }),
  }),
};
