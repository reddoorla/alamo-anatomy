<script lang="ts">
  import { PrismicRichText } from "@prismicio/svelte";
  import { enhance } from "$app/forms";
  import { env } from "$env/dynamic/public";
  import { loadTurnstile } from "$lib/turnstile";
  import ContentWidth from "$lib/components/ContentWidth.svelte";
  import DefaultButton from "$lib/components/DefaultButton.svelte";
  import { datepicker } from "$lib/utils/datepicker";

  let { data, form } = $props();
  const d = $derived(data.page.data);

  let submitting = $state(false);
  let startDate = $state("");
  let endDate = $state("");

  // Optional Cloudflare Turnstile — dark until PUBLIC_TURNSTILE_SITE_KEY is set;
  // rendered explicitly (works on full load + SPA nav). createIngestAction reads
  // the injected cf-turnstile-response input and forwards it for central verify.
  const turnstileSiteKey = env.PUBLIC_TURNSTILE_SITE_KEY?.trim();
  let turnstileEl = $state<HTMLDivElement>();

  $effect(() => {
    const el = turnstileEl;
    if (!turnstileSiteKey || !el) return;
    let widgetId: string | undefined;
    let cancelled = false;
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !el.isConnected) return;
        widgetId = turnstile.render(el, { sitekey: turnstileSiteKey });
      })
      .catch((err) => {
        console.warn("[turnstile] widget did not render:", err);
      });
    return () => {
      cancelled = true;
      if (widgetId !== undefined) {
        try {
          window.turnstile?.remove(widgetId);
        } catch {
          // already torn down (e.g. by navigation)
        }
      }
    };
  });

  const inputClass =
    "w-full bg-white text-dark text-base placeholder:text-dark placeholder:opacity-60 placeholder:text-xs placeholder:uppercase placeholder:tracking-wider rounded-sm p-4 outline-none focus:ring-2 focus:ring-dark/30 [color-scheme:light]";
  const textareaClass =
    "w-full bg-white text-dark text-base placeholder:text-dark placeholder:opacity-60 placeholder:text-base rounded-sm p-4 outline-none focus:ring-2 focus:ring-dark/30 resize-y";
</script>

<section class="pt-32 pb-20 lg:pt-40 lg:pb-28">
  <ContentWidth class="flex flex-col items-start text-left gap-10">
    <div class="w-full lg:w-3/4">
      <PrismicRichText field={d.s1_heading} />
    </div>

    <div class="w-full lg:w-3/4">
      <div class="mb-8">
        <PrismicRichText field={d.s1_subheading} />
      </div>

      <form
        method="POST"
        use:enhance={() => {
          submitting = true;
          return async ({ update }) => {
            await update();
            submitting = false;
          };
        }}
        class="flex flex-col gap-10"
      >
        {#if form?.error}
          <p role="alert" class="rounded-sm bg-red-50 p-4 text-red-900">{form.error}</p>
        {/if}
        <input type="hidden" name="ts" value={data.formTs} />
        <p class="hidden">
          <label>Don't fill this out: <input name="bot-field" /></label>
        </p>

        <!-- Event Details -->
        <fieldset class="flex flex-col gap-5">
          <legend><h4 class="mb-4">Event Details</h4></legend>
          <div class="flex flex-col sm:flex-row gap-5">
            <div class="flex-1 min-w-0">
              <div class="relative">
                {#if !startDate}
                  <label
                    for="preferred_start_date"
                    class="sm:hidden block absolute top-1/2 -translate-y-1/2 text-xs left-3.5 uppercase tracking-wider text-dark/60 z-10"
                    >Preferred Start Date*</label
                  >
                {/if}
                <input
                  id="preferred_start_date"
                  type="text"
                  name="preferred_start_date"
                  placeholder="Preferred Start Date*"
                  aria-label="Preferred Start Date"
                  required
                  bind:value={startDate}
                  use:datepicker
                  class={inputClass}
                />
                <svg
                  class="sm:hidden absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-5 h-5 text-dark/40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <div class="relative">
                {#if !endDate}
                  <label
                    for="preferred_end_date"
                    class="sm:hidden block absolute top-1/2 -translate-y-1/2 text-xs left-3.5 uppercase tracking-wider text-dark/60 z-10"
                    >Preferred End Date*</label
                  >
                {/if}
                <input
                  id="preferred_end_date"
                  type="text"
                  name="preferred_end_date"
                  placeholder="Preferred End Date*"
                  aria-label="Preferred End Date"
                  required
                  bind:value={endDate}
                  use:datepicker={{ minDate: startDate || "today" }}
                  class={inputClass}
                />
                <svg
                  class="sm:hidden absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-5 h-5 text-dark/40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row gap-5">
            <input
              type="number"
              name="number_of_stations"
              placeholder="Number of Stations*"
              aria-label="Number of Stations"
              required
              min="1"
              class={inputClass}
            />
            <input
              type="text"
              name="time_slots"
              placeholder="Time Slots*"
              aria-label="Time Slots"
              required
              class={inputClass}
            />
          </div>
          <input
            type="number"
            name="estimated_attendees"
            placeholder="Estimated Number of Attendees*"
            aria-label="Estimated Number of Attendees"
            required
            min="1"
            class={inputClass}
          />
          <textarea
            name="event_description"
            placeholder="Description of Event*"
            aria-label="Description of Event"
            required
            rows="6"
            class={textareaClass}
          ></textarea>
        </fieldset>

        <!-- Lab Equipment -->
        <fieldset class="flex flex-col gap-5">
          <legend><h4 class="mb-4">Lab Equipment</h4></legend>
          <div class="flex flex-col sm:flex-row gap-5">
            <input
              type="text"
              name="c_arm_needed"
              placeholder="C-Arm Needed*"
              aria-label="C-Arm Needed"
              required
              class={inputClass}
            />
            <input
              type="text"
              name="drills_needed"
              placeholder="Drills Needed?*"
              aria-label="Drills Needed"
              required
              class={inputClass}
            />
          </div>
          <div class="flex flex-col sm:flex-row gap-5">
            <input
              type="text"
              name="arthroscope_needed"
              placeholder="Arthroscope Needed?*"
              aria-label="Arthroscope Needed"
              required
              class={inputClass}
            />
            <input
              type="text"
              name="tissue_type"
              placeholder="Type of Tissue Needed*"
              aria-label="Type of Tissue Needed"
              required
              class={inputClass}
            />
          </div>
          <textarea
            name="procedure_description"
            placeholder="Description of Procedure*"
            aria-label="Description of Procedure"
            required
            rows="6"
            class={textareaClass}
          ></textarea>
        </fieldset>

        <!-- Catering -->
        <fieldset class="flex flex-col gap-5">
          <legend><h4 class="mb-4">Catering</h4></legend>
          <div class="flex flex-col gap-2">
            {#each ["Breakfast", "Lunch", "Dinner", "Snacks", "None"] as meal (meal)}
              <label class="group flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="catering" value={meal} class="peer sr-only" />
                <span
                  class="size-4 border border-dark rounded-xs inline-block shrink-0 transition-colors duration-100 group-hover:bg-dark/10 peer-checked:bg-dark peer-focus-visible:ring-2 peer-focus-visible:ring-dark/30"
                ></span>
                <span>{meal}</span>
              </label>
            {/each}
          </div>
          <textarea
            name="additional_catering_info"
            placeholder="Additional Catering Info"
            aria-label="Additional Catering Info"
            rows="5"
            class={textareaClass}
          ></textarea>
          <textarea
            name="diet_accommodations"
            placeholder="Diet Accommodation Requests"
            aria-label="Diet Accommodation Requests"
            rows="5"
            class={textareaClass}
          ></textarea>
        </fieldset>

        <!-- Lab Requestor Information -->
        <fieldset class="flex flex-col gap-5">
          <legend><h4 class="mb-4">Lab Requestor Information</h4></legend>
          <div class="flex flex-col sm:flex-row gap-5">
            <input
              type="text"
              name="main_contact_name"
              placeholder="Main Contact Name*"
              aria-label="Main Contact Name"
              required
              class={inputClass}
            />
            <input
              type="text"
              name="requestor_company"
              placeholder="Requestor Company*"
              aria-label="Requestor Company"
              required
              class={inputClass}
            />
          </div>
          <div class="flex flex-col sm:flex-row gap-5">
            <input
              type="email"
              name="requestor_email"
              placeholder="Requestor Email*"
              aria-label="Requestor Email"
              required
              class={inputClass}
            />
            <input
              type="tel"
              name="requestor_phone"
              placeholder="Requestor Phone*"
              aria-label="Requestor Phone"
              required
              class={inputClass}
            />
          </div>
          <div class="flex flex-col sm:flex-row gap-5">
            <input
              type="text"
              name="day_of_contact"
              placeholder="Contact the Day of Lab*"
              aria-label="Contact the Day of Lab"
              required
              class={inputClass}
            />
            <input
              type="text"
              name="ap_contact_name"
              placeholder="Accounts Payable Contact Name*"
              aria-label="Accounts Payable Contact Name"
              required
              class={inputClass}
            />
          </div>
          <div class="flex flex-col sm:flex-row gap-5">
            <input
              type="tel"
              name="ap_contact_phone"
              placeholder="AP Contact Phone #*"
              aria-label="AP Contact Phone Number"
              required
              class={inputClass}
            />
            <input
              type="email"
              name="ap_contact_email"
              placeholder="AP Contact Email*"
              aria-label="AP Contact Email"
              required
              class={inputClass}
            />
          </div>
          <div class="flex flex-col sm:flex-row gap-5">
            <input
              type="text"
              name="billing_street"
              placeholder="Billing Street Address*"
              aria-label="Billing Street Address"
              required
              class={inputClass}
            />
            <input
              type="text"
              name="billing_city"
              placeholder="Billing City*"
              aria-label="Billing City"
              required
              class={inputClass}
            />
          </div>
          <div class="flex flex-col sm:flex-row gap-5">
            <input
              type="text"
              name="billing_state"
              placeholder="Billing State*"
              aria-label="Billing State"
              required
              class={inputClass}
            />
            <input
              type="text"
              name="billing_zip"
              placeholder="Billing Zip Code*"
              aria-label="Billing Zip Code"
              required
              class={inputClass}
            />
          </div>
        </fieldset>

        {#if turnstileSiteKey}
          <!-- Cloudflare Turnstile mount point; the effect renders it explicitly and
               injects a hidden cf-turnstile-response input that createIngestAction forwards. -->
          <div class="cf-turnstile" bind:this={turnstileEl}></div>
        {/if}

        <div>
          <DefaultButton dark disabled={submitting}>
            {d.s1_button_label || "Send Request"}
          </DefaultButton>
        </div>
      </form>
    </div>
  </ContentWidth>
</section>
