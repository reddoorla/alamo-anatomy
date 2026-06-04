<script lang="ts">
  import { PrismicImage, PrismicRichText } from "@prismicio/svelte";
  import { asLink } from "@prismicio/client";
  import ScreenWidthMedia from "$lib/components/ScreenWidthMedia.svelte";
  import ContentWidth from "$lib/components/ContentWidth.svelte";
  import DefaultButton from "$lib/components/DefaultButton.svelte";

  let { data } = $props();
  const d = $derived(data.page.data);
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

<!-- Section 3: Two-column intro -->
<section class="py-20 lg:py-28 bg-light">
  <ContentWidth class="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start justify-between">
    <div class="w-full lg:w-1/2">
      <PrismicRichText field={d.s3_left_body} />
    </div>
    <div class="w-full lg:w-1/3">
      <div class="mb-8">
        <PrismicRichText field={d.s3_right_body} />
      </div>
      {#if d.s3_button?.text}
        <DefaultButton dark href={asLink(d.s3_button) ?? ""}>
          {d.s3_button.text}
        </DefaultButton>
      {/if}
    </div>
  </ContentWidth>
</section>

<!-- Section 4: Icon grid + heading -->
<section class="py-20 lg:py-28">
  <ContentWidth class="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start justify-between">
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full lg:w-7/12">
      {#each d.s4_boxes as box, i (i)}
        <div class="flex flex-col items-center justify-center text-center gap-3 bg-light px-4 py-8">
          <PrismicImage field={box.icon} class="w-20 h-20 object-contain" />
          <h5>{box.label}</h5>
        </div>
      {/each}
    </div>
    <div class="w-full lg:w-1/3">
      <PrismicRichText field={d.s4_heading} />
    </div>
  </ContentWidth>
</section>

<!-- Section 5: Image + partner -->
<section class="py-20 lg:py-28">
  <ContentWidth
    class="flex flex-col md:flex-row gap-12 md:gap-10 lg:gap-20 items-start justify-between"
  >
    <div class="w-full md:w-1/2 lg:w-7/12">
      <PrismicImage field={d.s5_image} class="w-full object-cover rounded aspect-4/3" />
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3">
      {#if d.s5_eyebrow}
        <h4 class="mb-6">{d.s5_eyebrow}</h4>
      {/if}
      {#if d.s5_logo?.url}
        <PrismicImage field={d.s5_logo} class="h-24 w-auto object-contain mb-6" />
      {/if}
      <div class="mb-8">
        <PrismicRichText field={d.s5_body} />
      </div>
      {#if d.s5_button?.text}
        <DefaultButton dark href={asLink(d.s5_button) ?? ""}>
          {d.s5_button.text}
        </DefaultButton>
      {/if}
    </div>
  </ContentWidth>
</section>
