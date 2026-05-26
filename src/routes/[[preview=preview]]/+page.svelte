<script lang="ts">
  import { PrismicImage, PrismicRichText } from "@prismicio/svelte";
  import { asLink } from "@prismicio/client";
  import ScreenWidthMedia from "$lib/components/ScreenWidthMedia.svelte";
  import ContentWidth from "$lib/components/ContentWidth.svelte";
  import DefaultButton from "$lib/components/DefaultButton.svelte";
  import logo from "$lib/assets/images/logos/typeLight.svg";
  import mark from "$lib/assets/images/logos/mark.svg"

  let { data } = $props();
  const d = $derived(data.page.data);
</script>

<!-- Hero -->

<section class="bg-dark lg:min-h-[60vh]">
  <ContentWidth
    class="h-full lg:min-h-[60vh] flex flex-col justify-start items-start lg:items-end pt-72 pb-8 lg:pt-48 lg:pb-60 text-light text-left relative"
  >

  <img src={mark} alt="AATI" class="top-16 left-0 absolute w-40 h-40 opacity-8"/>

    <img
      src={logo}
      alt="Alamo Anatomy Training Institute"
      class="w-44 lg:absolute lg:bottom-0 lg:left-0 lg:w-3/4"
    />

    <div class="w-72 lg:w-1/3 mt-6 lg:mt-0">
      <PrismicRichText field={d.s1_subtitle} />

      {#if d.s1_button?.text}
        <DefaultButton href={asLink(d.s1_button) ?? ""} class="mt-10">
          {d.s1_button.text}
        </DefaultButton>
      {/if}
    </div>
  </ContentWidth>
</section>

<ScreenWidthMedia
  vimeoId={d.s2_vimeo_id ?? ""}
  field={d.s2_fallback_image}
  darken
  percentHeight={50}
/>
<!-- Section 3: Icon boxes + heading -->
<section class=" py-20 lg:py-28">
  <ContentWidth
    class="flex flex-col lg:flex-row gap-12 lg:gap-0 items-center justify-between"
  >
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full w-full lg:w-7/12 ">
      {#each d.s3_left_boxes as box}
        <div
          class="flex flex-col items-center justify-center text-center gap-3 bg-light px-5 xl:px-7 py-10"
        >
          <PrismicImage field={box.icon} class="w-24 h-24" />
          <h4>{box.label}</h4>
        </div>
      {/each}
    </div>
    <div class="w-full lg:w-1/3">
      <h2>{d.s3_heading_right}</h2>
    </div>
  </ContentWidth>
</section>

<!-- Mobile-only sticky image -->
<section class="lg:hidden">
  <ContentWidth>
    <PrismicImage
      field={d.s4_s6_sticky_image}
      class="w-full object-cover rounded aspect-3/4"
    />
  </ContentWidth>
</section>

<!-- Sections 4 + 5 + 6: Text left, sticky image right -->
<section class="pt-20 relative">
  <!-- Sticky image overlay — absolute so it doesn't affect layout, ContentWidth for alignment -->
  <div class="hidden lg:block absolute inset-0 overflow-visible pointer-events-none">
    <ContentWidth class="h-full items-end justify-start pb-20">
      <div class="sticky top-24 w-1/3 pointer-events-auto ml-auto">
        <PrismicImage
          field={d.s4_s6_sticky_image}
          class="w-full object-cover rounded aspect-3/4"
        />
      </div>
    </ContentWidth>
  </div>

  <!-- S4 -->
  <ContentWidth class="gap-12 lg:gap-20">
    <div class="w-full lg:w-1/2">
      <h4 class="mb-4">{d.s4_eyebrow}</h4>
      <h3 class="font-bold mb-6">{d.s4_heading}</h3>
      <div class="mb-12">
        <PrismicRichText field={d.s4_body} />
      </div>
    </div>
  </ContentWidth>

  <div class="bg-dark text-light py-20">
    <!-- S5 -->
    <ContentWidth class="gap-12 lg:gap-20">
      <div class="w-full lg:w-7/12">
        <div class="mb-8">
          <PrismicRichText field={d.s5_body} />
        </div>
        {#if d.s5_button?.text}
          <DefaultButton href={asLink(d.s5_button) ?? ""}>
            {d.s5_button.text}
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="inline-block ml-2">
              <path d="M1 6H15M15 6L10 1M15 6L10 11" />
            </svg>
          </DefaultButton>
        {/if}
      </div>
    </ContentWidth>

    <!-- S6 -->
    <ContentWidth class="mt-20">
      <div class="w-full lg:w-7/12">
        <h2 class="mb-4">{d.s6_heading}</h2>
        <p class="mb-12 max-w-150">{d.s6_body}</p>
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-8 w-full">
          {#each d.s6_boxes as box}
            <div class="flex flex-col items-center text-center gap-3">
              <PrismicImage field={box.icon} class="w-12 h-12 object-contain" />
              <h5>{box.label}</h5>
            </div>
          {/each}
        </div>
      </div>
    </ContentWidth>
  </div>
</section>

<!-- Section 7: Full-width image -->
<section class="w-full">
  <ScreenWidthMedia field={d.s7_image} percentHeight={60}/>
</section>
