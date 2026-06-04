<script lang="ts">
  import { page } from "$app/state";
  import ContentWidth from "$lib/components/ContentWidth.svelte";
  import DefaultButton from "$lib/components/DefaultButton.svelte";

  const headline = $derived(page.status === 404 ? "Page not found" : "Something went wrong");
  const message = $derived(
    page.status === 404
      ? "The page you're looking for doesn't exist or has moved."
      : (page.error?.message ?? "An unexpected error occurred. Please try again."),
  );
</script>

<svelte:head>
  <title>{page.status} — Alamo Anatomy Training Institute</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<section class="bg-dark text-light min-h-[80vh] flex items-center pt-32 pb-20 lg:pt-40 lg:pb-28">
  <ContentWidth class="flex flex-col items-start text-left gap-8">
    <h4 class="opacity-80">Error {page.status}</h4>
    <h1>{headline}</h1>
    <p class="max-w-150 text-base opacity-90">{message}</p>
    <div class="flex flex-wrap gap-4 mt-4">
      <DefaultButton href="/">Back to Home</DefaultButton>
      <DefaultButton href="/contact">Contact Us</DefaultButton>
    </div>
  </ContentWidth>
</section>
