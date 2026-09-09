<!--
@component
DocPage — Standardized documentation page layout for all Twintrinsic component pages.

Enforces a consistent section ordering: Name → Description → What/When/Why →
Responsiveness → Customization → Examples → Slots → Props → Events →
Accessibility → Keyboard Support.

Every section is an optional snippet — only rendered when provided. This makes
the component backward-compatible: existing pages can adopt sections one at a time.

Usage:
```svelte
<DocPage name="Button">
  {#snippet description()}
    <p>A versatile interactive element.</p>
  {/snippet}

  {#snippet whatWhenWhy()}
    <h3>What is it?</h3>
    <p>A styled button component.</p>
  {/snippet}

  {#snippet examples()}
    <ExampleTabs code={`<Button>Click me</Button>`}>
      <Button>Click me</Button>
    </ExampleTabs>
  {/snippet}

  {#snippet props()}
    <PropsTable component={ButtonModule} />
  {/snippet}
</DocPage>
```
-->
<script lang="ts">
  import type { Snippet } from "svelte"
  import Container from "../Container/Container.svelte"

  interface Props {
    /** Component name displayed as the page title (H1) */
    name: string
    /** Additional CSS classes on the outer Container */
    class?: string
    /** Page description shown below the title */
    description?: Snippet
    /** "What, When & Why" section content */
    whatWhenWhy?: Snippet
    /** Responsiveness notes */
    responsiveness?: Snippet
    /** Customization options */
    customization?: Snippet
    /** Examples section (use ExampleTabs inside) */
    examples?: Snippet
    /** Slots documentation */
    slots?: Snippet
    /** Props table (typically PropsTable component) */
    props?: Snippet
    /** Events table (typically EventsTable component) */
    events?: Snippet
    /** Accessibility notes */
    accessibility?: Snippet
    /** Keyboard support table */
    keyboardSupport?: Snippet
    /** Additional sections rendered after Keyboard Support */
    children?: Snippet
  }

  let {
    name,
    class: className = "",
    description,
    whatWhenWhy,
    responsiveness,
    customization,
    examples,
    slots,
    props,
    events,
    accessibility,
    keyboardSupport,
    children,
  }: Props = $props()
</script>

<style lang="postcss">
  @reference "../../twintrinsic.css";

  /* Consistent section spacing */
  :global(.docpage section) {
    @apply mb-10;
  }

  :global(.docpage h2) {
    @apply text-xl font-semibold mt-10 mb-4 pb-2 border-b border-border;
  }

  :global(.docpage h3) {
    @apply text-lg font-medium mt-6 mb-2;
  }

  :global(.docpage h3:not(:first-child)) {
    @apply mt-8;
  }

  :global(.docpage p) {
    @apply mb-4;
  }

  :global(.docpage ul) {
    @apply mb-4 list-disc pl-6 space-y-1;
  }

  :global(.docpage table) {
    @apply w-full border-collapse my-4;
  }

  :global(.docpage th) {
    @apply px-4 py-2 text-start text-sm font-medium bg-surface border-b border-border;
  }

  :global(.docpage td) {
    @apply px-4 py-2 border-b border-border;
  }

  :global(.docpage code) {
    @apply px-1.5 py-0.5 text-xs font-mono rounded bg-surface;
  }

  :global(.docpage kbd) {
    @apply px-2 py-0.5 text-xs font-mono rounded border border-border bg-surface;
  }
</style>

<Container as="article" class="prose dark:prose-invert max-w-none docpage {className}">
  <!-- 1. Name -->
  <h1>{name}</h1>

  <!-- 2. Description -->
  {#if description}
    <section class="docpage-description">
      {@render description()}
    </section>
  {/if}

  <!-- 3. What, When & Why -->
  {#if whatWhenWhy}
    <section class="docpage-what-when-why">
      <h2>What, When &amp; Why</h2>
      {@render whatWhenWhy()}
    </section>
  {/if}

  <!-- 4. Responsiveness -->
  {#if responsiveness}
    <section class="docpage-responsiveness">
      <h2>Responsiveness</h2>
      {@render responsiveness()}
    </section>
  {/if}

  <!-- 5. Customization -->
  {#if customization}
    <section class="docpage-customization">
      <h2>Customization</h2>
      {@render customization()}
    </section>
  {/if}

  <!-- 6. Examples -->
  {#if examples}
    <section class="docpage-examples">
      <h2>Examples</h2>
      {@render examples()}
    </section>
  {/if}

  <!-- 7. Slots -->
  {#if slots}
    <section class="docpage-slots">
      <h2>Slots</h2>
      {@render slots()}
    </section>
  {/if}

  <!-- 8. Props -->
  {#if props}
    <section class="docpage-props">
      <h2>Props</h2>
      {@render props()}
    </section>
  {/if}

  <!-- 9. Events -->
  {#if events}
    <section class="docpage-events">
      <h2>Events</h2>
      {@render events()}
    </section>
  {/if}

  <!-- 10. Accessibility -->
  {#if accessibility}
    <section class="docpage-accessibility">
      <h2>Accessibility</h2>
      {@render accessibility()}
    </section>
  {/if}

  <!-- 11. Keyboard Support -->
  {#if keyboardSupport}
    <section class="docpage-keyboard-support">
      <h2>Keyboard Support</h2>
      {@render keyboardSupport()}
    </section>
  {/if}

  <!-- 12. Additional sections -->
  {#if children}
    {@render children()}
  {/if}
</Container>
