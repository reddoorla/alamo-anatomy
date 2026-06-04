<script lang="ts">
  import mark from "$lib/assets/images/logos/mark.svg";
  import ContentWidth from "./ContentWidth.svelte";
  import DefaultButton from "./DefaultButton.svelte";
</script>

<footer class="w-full pt-12 md:pt-20 pb-8 mt-auto bg-light">
  <ContentWidth class="flex flex-col md:flex-row gap-12 items-start justify-between">
    <a class="flex justify-center lg:justify-start" href="/">
      <img src={mark} alt="AATI" class="w-24 h-24 md:w-40 md:h-40" />
    </a>

    <div>
      <h4 class="mb-2">Have Questions?</h4>
      <h1 class="mb-6">Speak to the<br />AATI team.</h1>
      <div class="flex gap-4 flex-wrap">
        <DefaultButton dark href="/reserve">Reserve Lab</DefaultButton>
        <DefaultButton dark href="/contact">Contact Us</DefaultButton>
      </div>
      <nav class="flex flex-col gap-2 sm:gap-6 text-sm uppercase tracking-wider mt-8 md:mt-24">
        <a href="/about" class="hover:opacity-70 transition">About Us</a>
        <a href="/facility" class="hover:opacity-70 transition">Our Facility</a>
        <a
          href="https://courses.cadaverlabsa.com/"
          target="_blank"
          rel="noopener"
          class="hover:opacity-70 transition">210 TacLabs</a
        >
        <a href="/contact" class="hover:opacity-70 transition">Contact Us</a>
      </nav>
      <p class="text-xs opacity-80 mt-6">
        &copy; {new Date().getFullYear()} Alamo Anatomy Training Institute.<br />All Rights
        Reserved.
      </p>
    </div>
  </ContentWidth>
</footer>
