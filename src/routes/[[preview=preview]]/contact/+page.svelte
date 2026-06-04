<script lang="ts">
  import { PrismicRichText } from "@prismicio/svelte";
  import ContentWidth from "$lib/components/ContentWidth.svelte";
  import DefaultButton from "$lib/components/DefaultButton.svelte";

  let { data } = $props();
  const d = $derived(data.page.data);

  const inputClass =
    "flex-1 bg-white text-dark text-base placeholder:text-[#70A19E] placeholder:opacity-60 placeholder:text-xs placeholder:uppercase placeholder:tracking-wider rounded-sm p-4 outline-none focus:ring-2 focus:ring-light";
  const textareaClass =
    "bg-white text-dark text-base placeholder:text-[#70A19E] placeholder:opacity-60 placeholder:text-base rounded-sm p-4 outline-none focus:ring-2 focus:ring-light resize-y";

  const mapSrc = $derived.by(() => {
    const raw = d.s2_map_embed_url?.trim();
    if (!raw) return "";
    const match = raw.match(/src=["']([^"']+)["']/i);
    return match ? match[1] : raw;
  });
</script>

<!-- Section 1: Hero + Contact Form -->
<section class="bg-dark text-light pt-32 pb-20 lg:pt-40 lg:pb-28">
  <ContentWidth class="flex flex-col items-start text-left gap-12">
    <div class="w-full lg:w-3/4">
      {#if d.s1_eyebrow}
        <h4 class="mb-10 opacity-80">{d.s1_eyebrow}</h4>
      {/if}
      <PrismicRichText field={d.s1_heading} />
    </div>

    <div class="w-full lg:w-3/4">
      <div class="mb-6">
        <PrismicRichText field={d.s1_subheading} />
      </div>

      <form
        name="contact"
        method="POST"
        action="/thank-you"
        data-netlify="true"
        netlify-honeypot="bot-field"
        class="flex flex-col gap-5"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p class="hidden">
          <label>Don't fill this out: <input name="bot-field" /></label>
        </p>

        <div class="flex flex-col sm:flex-row gap-5">
          <input
            type="text"
            name="first_name"
            placeholder="First Name*"
            aria-label="First Name"
            required
            class={inputClass}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name*"
            aria-label="Last Name"
            required
            class={inputClass}
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email*"
          aria-label="Email"
          required
          class={inputClass}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone*"
          aria-label="Phone"
          required
          class={inputClass}
        />
        <textarea
          name="message"
          placeholder="Comments or Questions"
          aria-label="Comments or Questions"
          rows="6"
          class={textareaClass}
        ></textarea>

        <div>
          <DefaultButton>
            {d.s1_button_label || "Send Message"}
          </DefaultButton>
        </div>
      </form>
    </div>
  </ContentWidth>
</section>

<!-- Section 2: Map + address -->
<section class="py-20 lg:py-28">
  <ContentWidth
    class="flex flex-col md:flex-row gap-12 md:gap-10 lg:gap-20 items-start justify-between"
  >
    <div class="w-full md:w-1/2 lg:w-7/12">
      {#if mapSrc}
        <div class="w-full aspect-4/3 overflow-hidden rounded bg-light">
          <iframe
            src={mapSrc}
            title="Map"
            class="w-full h-full border-0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          ></iframe>
        </div>
      {/if}
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3">
      {#if d.s2_eyebrow}
        <h4 class="mb-6">{d.s2_eyebrow}</h4>
      {/if}
      <div class="mb-8">
        <PrismicRichText field={d.s2_body} />
      </div>
      <div
        class="bg-light p-5 [&_p:last-child]:mb-0 [&_p]:text-sm [&_p]:uppercase [&_p]:tracking-wider"
      >
        <PrismicRichText field={d.s2_info} />
      </div>
    </div>
  </ContentWidth>
</section>
