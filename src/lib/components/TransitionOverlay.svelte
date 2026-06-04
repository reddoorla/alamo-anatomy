<script lang="ts">
  import { afterNavigate, beforeNavigate } from "$app/navigation";
  import { fade } from "svelte/transition";

  const OVERLAY_VISIBLE_DURATION = 400;
  const FADE_OUT_DURATION = 350;

  let isTransitioning = $state(false);

  beforeNavigate(() => {
    isTransitioning = true;
  });

  afterNavigate(() => {
    setTimeout(() => {
      isTransitioning = false;
    }, OVERLAY_VISIBLE_DURATION);
  });
</script>

{#if isTransitioning}
  <div
    class="h-screen w-screen fixed z-50 bg-background top-0 left-0"
    out:fade={{ duration: FADE_OUT_DURATION }}
  ></div>
{/if}
