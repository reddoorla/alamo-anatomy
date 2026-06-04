<script lang="ts">
  import typeLight from "$lib/assets/images/logos/typeLight.svg";

  import { fade } from "svelte/transition";
  import { page } from "$app/state";
  import ContentWidth from "./ContentWidth.svelte";
  import DefaultButton from "./DefaultButton.svelte";

  let menuOpen = $state(false);
  let scrollY = $state(0);
  const isHome = $derived(page.url.pathname === "/" || page.url.pathname === "/preview");
  const showLogo = $derived(
    !isHome || (typeof window !== "undefined" && scrollY > window.innerHeight * 0.6 - 64),
  );

  $effect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = menuOpen ? "hidden" : "";
    }
  });
</script>

<svelte:window bind:scrollY />

<nav class="fixed top-0 left-0 w-full z-50 h-16 bg-dark/80 backdrop-blur-lg">
  <ContentWidth class="flex items-center h-full justify-between">
    <a
      href="/"
      class="transition-opacity duration-300 {showLogo
        ? 'opacity-100'
        : 'opacity-0 pointer-events-none'}"
    >
      <img src={typeLight} alt="AATI" class="h-8 w-auto" />
    </a>

    <div class="h-full flex items-center relative gap-4">
      <DefaultButton href="/contact">Contact Us</DefaultButton>
      <button
        onclick={() => (menuOpen = !menuOpen)}
        class="text-light hover:text-white transition duration-400 text-2xl flex items-center justify-center"
        aria-label="Toggle menu"
      >
        <svg
          width="20"
          height="16"
          viewBox="0 0 20 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect width="20" height="2" rx="1" />
          <rect y="7" width="20" height="2" rx="1" />
          <rect y="14" width="20" height="2" rx="1" />
        </svg>
      </button>
    </div>
  </ContentWidth>
</nav>

{#if menuOpen}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-40 bg-dark/90 backdrop-blur-lg flex flex-col items-center justify-center gap-8 text-white text-2xl"
    onclick={() => (menuOpen = false)}
    onkeydown={(e) => {
      if (e.key === "Escape") menuOpen = false;
    }}
    transition:fade
  >
    <a href="/" class="hover:opacity-70 transition"><h3>Home</h3></a>
    <a href="/about" class="hover:opacity-70 transition"><h3>About Us</h3></a>
    <a href="/facility" class="hover:opacity-70 transition"><h3>Our Facility</h3></a>
    <a href="/reserve" class="hover:opacity-70 transition"><h3>Reserve Lab</h3></a>
    <a href="/contact" class="hover:opacity-70 transition"><h3>Contact Us</h3></a>
  </div>
{/if}
