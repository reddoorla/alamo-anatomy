<script lang="ts">
  import ContentWidth from "$lib/components/ContentWidth.svelte";
  import DefaultButton from "$lib/components/DefaultButton.svelte";
</script>

<svelte:head>
  <title>Thank You — Alamo Anatomy Training Institute</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<section class="bg-dark text-light min-h-[80vh] flex items-center pt-32 pb-20 lg:pt-40 lg:pb-28">
  <ContentWidth class="flex flex-col items-start text-left gap-8">
    <h4 class="opacity-80">Message Received</h4>
    <h1>Thanks — we'll be in touch soon.</h1>
    <p class="max-w-150 text-base opacity-90">
      Your message has been received by the AATI team. We'll follow up shortly. In the meantime,
      feel free to explore the rest of the site.
    </p>
    <div class="flex flex-wrap gap-4 mt-4">
      <DefaultButton href="/">Back to Home</DefaultButton>
      <DefaultButton href="/facility">Our Facility</DefaultButton>
    </div>
  </ContentWidth>
</section>
