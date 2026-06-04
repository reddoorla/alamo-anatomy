<script lang="ts">
  import { slide } from "svelte/transition";

  const LOREM =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat m dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor inc.";

  let {
    labels = ["Is this thing on?", "It could be why don't you check"],
    contents = [LOREM, LOREM],
  } = $props();

  // svelte-ignore state_referenced_locally
  let activeAccordions: boolean[] = $state(labels.map(() => false));
</script>

<div class="w-full flex flex-col border-light border-b-2 cursor-pointer">
  {#each labels as label, i (i)}
    <button
      class="w-full border-t-2 border-light cursor-pointer"
      aria-expanded={activeAccordions[i]}
      onclick={() => (activeAccordions[i] = !activeAccordions[i])}
    >
      <div class="h-20 p-8 w-full flex flex-row justify-between items-center">
        <p class="text-left">{label}</p>
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          class="transition-transform duration-300 ease-in-out opacity-80 hover:opacity-100 {activeAccordions[
            i
          ]
            ? 'rotate-90'
            : ''}"
        >
          <path d="M1 1L7 7L1 13" />
        </svg>
      </div>
      {#if activeAccordions[i]}
        <div transition:slide={{ duration: 500 }}>
          <p class="text-left p-8 pt-0">{contents[i]}</p>
        </div>
      {/if}
    </button>
  {/each}
</div>
