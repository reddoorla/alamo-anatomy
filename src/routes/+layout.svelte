<script lang="ts">
  import { PrismicPreview } from "@prismicio/svelte/kit";
  import { page } from "$app/state";
  import { afterNavigate } from "$app/navigation";
  import { repositoryName } from "$lib/prismicio";
  import "../app.css";
  import LandscapeModal from "$lib/components/LandscapeModal.svelte";
  import TransitionOverlay from "$lib/components/TransitionOverlay.svelte";
  import Nav from "$lib/components/Nav.svelte";
  import Footer from "$lib/components/Footer.svelte";

  let { children, data } = $props();

  const isPreviewOrDev = $derived(import.meta.env.DEV || page.url.pathname.startsWith("/preview"));

  // Force instant scroll-to-top on route change (overrides html { scroll-behavior: smooth })
  afterNavigate(({ from, to, type }) => {
    if (type === "popstate") return; // back/forward — let SvelteKit restore
    if (from?.url.pathname === to?.url.pathname) return; // same page (hash nav etc.)
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = "";
    });
  });

  const jsonLd = $derived(
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      name: "Alamo Anatomy Training Institute",
      alternateName: "AATI",
      url: page.url.origin,
      telephone: "+1-210-488-4001",
      address: {
        "@type": "PostalAddress",
        streetAddress: "4590 Lockhill Selma Rd",
        addressLocality: "San Antonio",
        addressRegion: "TX",
        postalCode: "78249",
        addressCountry: "US",
      },
      openingHours: "Mo-Su 06:00-20:00",
    }),
  );
</script>

<svelte:head>
  <title>{page.data.title ?? "Alamo Anatomy Training Institute"}</title>
  <link rel="canonical" href={page.url.href} />
  <meta property="og:url" content={page.url.href} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Alamo Anatomy Training Institute" />
  {#if page.data.meta_description}
    <meta name="description" content={page.data.meta_description} />
    <meta name="twitter:description" content={page.data.meta_description} />
  {/if}
  {#if page.data.meta_title}
    <meta property="og:title" content={page.data.meta_title} />
    <meta name="twitter:title" content={page.data.meta_title} />
  {/if}
  <meta property="og:image" content={page.data.meta_image ?? `${page.url.origin}/og-default.png`} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta
    name="twitter:image"
    content={page.data.meta_image ?? `${page.url.origin}/og-default.png`}
  />

  <!-- JSON-LD: Local Business (tag tokens split so the Svelte parser doesn't enter script mode) -->
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html `<scr` + `ipt type="application/ld+json">${jsonLd}</scr` + `ipt>`}

  <!-- Prismic toolbar — only for editors viewing previews or in dev -->
  {#if isPreviewOrDev}
    <script
      async
      defer
      src="https://static.cdn.prismic.io/prismic.js?new=true&repo={repositoryName}"
    ></script>
  {/if}
</svelte:head>
<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-dark focus:text-light focus:px-4 focus:py-2 focus:rounded focus:outline-none focus:ring-2 focus:ring-light"
>
  Skip to main content
</a>
<div class="flex flex-col min-h-screen">
  <Nav />

  <main id="main-content">
    {@render children?.()}
  </main>

  <Footer />
</div>
<TransitionOverlay />
<LandscapeModal />
{#if data.isPreviewSession}
  <PrismicPreview {repositoryName} />
{/if}
