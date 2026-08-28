<!--
@component
DocSection — A reusable documentation section with consistent heading and spacing.

Use this inside DocPage or standalone for sub-sections, comparison tables,
and callouts that need consistent styling.

Usage:
```svelte
<DocSection title="Comparison: Tag vs Badge">
  <p>Tags are interactive and selectable; badges are decorative.</p>
</DocSection>

<DocSection title="Best Practices" variant="tip">
  <ul>
    <li>Use primary variant for main CTAs</li>
  </ul>
</DocSection>
```
-->
<script lang="ts">
  import type { Snippet } from "svelte"

  interface Props {
    /** Section heading text */
    title: string
    /** Heading level — defaults to h2, use h3 for subsections */
    level?: "h2" | "h3"
    /** Visual variant for the section */
    variant?: "default" | "tip" | "warning" | "danger"
    /** Additional CSS classes */
    class?: string
    /** Section content */
    children?: Snippet
  }

  let {
    title,
    level = "h2",
    variant = "default",
    class: className = "",
    children,
  }: Props = $props()

  const variantClasses = $derived(
    {
      default: "",
      tip: "border-l-4 border-success-500 pl-4 bg-success-500/5 rounded-r-lg",
      warning: "border-l-4 border-warning-500 pl-4 bg-warning-500/5 rounded-r-lg",
      danger: "border-l-4 border-error-500 pl-4 bg-error-500/5 rounded-r-lg",
    }[variant]
  )
</script>

<style lang="postcss">
  @reference "../../twintrinsic.css";

  .docsection {
    @apply mb-6;
  }

  .docsection :global(h2) {
    @apply text-xl font-semibold mt-10 mb-4 pb-2 border-b border-border;
  }

  .docsection :global(h3) {
    @apply text-lg font-medium mt-6 mb-2;
  }

  .docsection :global(p) {
    @apply mb-3;
  }

  .docsection :global(ul) {
    @apply mb-3 list-disc pl-6 space-y-1;
  }

  .docsection :global(table) {
    @apply w-full border-collapse my-4;
  }

  .docsection :global(th) {
    @apply px-4 py-2 text-left text-sm font-medium bg-surface border-b border-border;
  }

  .docsection :global(td) {
    @apply px-4 py-2 border-b border-border;
  }

  .docsection :global(code) {
    @apply px-1.5 py-0.5 text-xs font-mono rounded bg-surface;
  }

  .docsection :global(kbd) {
    @apply px-2 py-0.5 text-xs font-mono rounded border border-border bg-surface;
  }
</style>

<div class="docsection {variantClasses} {className}">
  {#if level === "h2"}
    <h2>{title}</h2>
  {:else}
    <h3>{title}</h3>
  {/if}

  {#if children}
    {@render children()}
  {/if}
</div>
