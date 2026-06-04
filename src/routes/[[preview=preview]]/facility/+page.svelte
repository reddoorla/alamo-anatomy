<script lang="ts">
  import { PrismicImage, PrismicRichText } from "@prismicio/svelte";
  import { asLink } from "@prismicio/client";
  import ScreenWidthMedia from "$lib/components/ScreenWidthMedia.svelte";
  import ContentWidth from "$lib/components/ContentWidth.svelte";
  import DefaultButton from "$lib/components/DefaultButton.svelte";

  let { data } = $props();
  const d = $derived(data.page.data);

  let activeIndex = $state(0);
  const images = $derived(d.s3_images ?? []);
  let thumbButtons: HTMLButtonElement[] = $state([]);

  function next() {
    if (images.length) activeIndex = (activeIndex + 1) % images.length;
  }
  function prev() {
    if (images.length) activeIndex = (activeIndex - 1 + images.length) % images.length;
  }

  $effect(() => {
    const el = thumbButtons[activeIndex];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  });

  const mapSrc = $derived.by(() => {
    const raw = d.s5_map_embed_url?.trim();
    if (!raw) return "";
    const match = raw.match(/src=["']([^"']+)["']/i);
    return match ? match[1] : raw;
  });
</script>

<!-- Section 1: Hero -->
<section class="bg-dark text-light pt-32 pb-20 lg:pt-40 lg:pb-28">
  <ContentWidth class="flex flex-col items-start text-left">
    {#if d.s1_eyebrow}
      <h4 class="mb-6 opacity-80">{d.s1_eyebrow}</h4>
    {/if}
    <div class="w-full lg:w-3/4">
      <PrismicRichText field={d.s1_heading} />
    </div>
  </ContentWidth>
</section>

<!-- Section 2: Masthead media -->
<ScreenWidthMedia vimeoId={d.s2_vimeo_id ?? ""} field={d.s2_image} percentHeight={50} />

<!-- Section 3: Carousel + body -->
<section class="bg-light py-20 lg:py-28">
  <ContentWidth class="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start justify-between">
    <div class="w-full lg:w-7/12">
      {#if images.length}
        <div class="w-full aspect-4/3 overflow-hidden rounded mb-5 bg-[#B0D6D4] relative">
          {#each images as img, i (i)}
            <PrismicImage
              field={img.image}
              class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out {activeIndex ===
              i
                ? 'opacity-100'
                : 'opacity-0'}"
            />
          {/each}
        </div>
        <div class="flex items-center justify-between gap-3">
          <button
            type="button"
            onclick={prev}
            aria-label="Previous image"
            class="shrink-0 w-10 h-10 rounded-full border border-dark flex items-center justify-center hover:bg-dark hover:text-light transition"
          >
            <svg
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M15 6H1M1 6L6 1M1 6L6 11" />
            </svg>
          </button>
          <div class="flex-1 flex gap-2 overflow-x-auto no-scrollbar">
            {#each images as img, i (i)}
              <button
                type="button"
                bind:this={thumbButtons[i]}
                onclick={() => (activeIndex = i)}
                aria-label="Show image {i + 1}"
                class="shrink-0 w-[100px] h-[75px] overflow-hidden border-b-[3px] transition duration-300 cursor-pointer {activeIndex ===
                i
                  ? 'border-dark saturate-100'
                  : 'border-transparent saturate-50 opacity-80 hover:saturate-100 hover:opacity-100'}"
              >
                <PrismicImage field={img.image} class="w-full h-full object-cover" />
              </button>
            {/each}
          </div>
          <button
            type="button"
            onclick={next}
            aria-label="Next image"
            class="shrink-0 w-10 h-10 rounded-full border border-dark flex items-center justify-center hover:bg-dark hover:text-light transition"
          >
            <svg
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M1 6H15M15 6L10 1M15 6L10 11" />
            </svg>
          </button>
        </div>
      {/if}
    </div>
    <div class="w-full lg:w-1/3">
      <div class="mb-8">
        <PrismicRichText field={d.s3_body} />
      </div>
      {#if d.s3_button?.text}
        <DefaultButton dark href={asLink(d.s3_button) ?? ""}>
          {d.s3_button.text}
        </DefaultButton>
      {/if}
    </div>
  </ContentWidth>
</section>

<!-- Section 4: Box grid + heading + button -->
<section class="py-20 lg:py-28">
  <ContentWidth class="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start justify-between">
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-7/12">
      {#each d.s4_boxes as box, i (i)}
        <div
          class="flex flex-col items-center justify-center text-center gap-3 bg-light px-5 py-8 min-h-28 sm:py-10 sm:min-h-32 lg:min-h-40"
        >
          {#if box.icon?.url}
            <PrismicImage field={box.icon} class="w-20 h-20 object-contain" />
          {/if}
          <h5>{box.label}</h5>
        </div>
      {/each}
    </div>
    <div class="w-full lg:w-1/3">
      <div class="mb-6">
        <PrismicRichText field={d.s4_heading} />
      </div>
      {#if d.s4_button?.text}
        <DefaultButton dark href={asLink(d.s4_button) ?? ""}>
          {d.s4_button.text}
        </DefaultButton>
      {/if}
    </div>
  </ContentWidth>
</section>

<!-- Section 5: Map + address -->
<section class="pb-20 lg:pb-28">
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
      {#if d.s5_eyebrow}
        <h4 class="mb-6">{d.s5_eyebrow}</h4>
      {/if}
      <div class="mb-8">
        <PrismicRichText field={d.s5_body} />
      </div>
      <div
        class="bg-light p-5 [&_p:last-child]:mb-0 [&_p]:text-sm [&_p]:uppercase [&_p]:tracking-wider"
      >
        <PrismicRichText field={d.s5_info} />
      </div>
    </div>
  </ContentWidth>
</section>
