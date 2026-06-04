<script lang="ts">
  import type { Snippet } from "svelte";

  interface ButtonProps {
    href?: string;
    onclick?: (event: MouseEvent) => void;
    filled?: boolean;
    dark?: boolean;
    class?: string;
    children?: Snippet;
  }

  let {
    href = "",
    onclick = () => {},
    filled = false,
    dark = false,
    class: passedClasses = "",
    children = undefined,
  }: ButtonProps = $props();

  const baseClasses =
    "inline-block active:opacity-90 rounded-full border-[1.5px] border-solid px-4 pb-3 pt-2.5 h-fit transition";

  const variantClasses = $derived(
    filled
      ? dark
        ? "bg-dark text-light border-dark hover:bg-light hover:text-dark"
        : "bg-light text-dark border-light hover:bg-dark hover:text-light"
      : dark
        ? "bg-transparent text-dark border-dark hover:bg-dark hover:text-light"
        : "bg-transparent text-light border-light hover:bg-light hover:text-dark",
  );
</script>

{#if href}
  <a {href} {onclick} class="{baseClasses} {variantClasses} {passedClasses}">
    {@render children?.()}
  </a>
{:else}
  <button {onclick} class="{baseClasses} {variantClasses} {passedClasses}">
    {@render children?.()}
  </button>
{/if}
