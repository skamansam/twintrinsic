<!--
@component
Card - A container for content with optional header, footer, and media sections.
Provides a consistent visual style for displaying grouped information.

Snippets: header, footer, media, children. If both `media` snippet and `image`
prop are passed, the `media` snippet takes precedence.
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "href", type: "string", description: "Link URL if the card is clickable", optional: true },
  { name: "image", type: "string", description: "Image URL for card media (simple image-only path)", optional: true },
  { name: "imageAlt", type: "string", description: "Alt text for the image", default: "\"\"", optional: true },
  { name: "bordered", type: "boolean", description: "Whether to show a border", default: "true", optional: true },
  { name: "shadowed", type: "boolean", description: "Whether to add a shadow", default: "false", optional: true },
  { name: "compact", type: "boolean", description: "Whether to make the card compact (less padding)", default: "false", optional: true },
  { name: "hoverable", type: "boolean", description: "Whether to add hover effects", default: "false", optional: true },
  { name: "media", type: "Snippet", description: "Arbitrary media markup", optional: true },
  { name: "header", type: "Snippet", description: "Card header content", optional: true },
  { name: "footer", type: "Snippet", description: "Card footer content", optional: true },
];
</script>

<script lang="ts">
import type { Snippet } from "svelte"

interface Props {
  /** Additional props passed through to the root element */
  [key: `data-${string}`]: unknown
  [key: `aria-${string}`]: string | undefined
  /** Additional CSS classes */
  class?: string
  /** HTML id for accessibility */
  id?: string
  /** Link URL if the card is clickable */
  href?: string
  /** Image URL for card media (simple image-only path) */
  image?: string
  /** Alt text for the image */
  imageAlt?: string
  /** Whether to show a border */
  bordered?: boolean
  /** Whether to add a shadow */
  shadowed?: boolean
  /** Whether to make the card compact (less padding) */
  compact?: boolean
  /** Whether to add hover effects */
  hoverable?: boolean
  /** Card body content */
  children?: Snippet
  /** Arbitrary media markup */
  media?: Snippet
  /** Card header content */
  header?: Snippet
  /** Card footer content */
  footer?: Snippet
}

const {
  /** Additional CSS classes */
  class: className = "",

  /** HTML id for accessibility */
  id = crypto.randomUUID(),

  /** Link URL if the card is clickable */
  href,

  /** Image URL for card media */
  image,

  /** Alt text for the image */
  imageAlt = "",

  /** Whether to show a border */
  bordered = true,

  /** Whether to add a shadow */
  shadowed = false,

  /** Whether to make the card compact (less padding) */
  compact = false,

  /** Whether to add hover effects */
  hoverable = false,

  children = undefined,
  media = undefined,
  header = undefined,
  footer = undefined,
  ...restProps
}: Props = $props()

// Determine if card has clickable behavior (derived so the conditional render
// stays reactive to prop changes — otherwise svelte-check warns that the
// reference only captures the initial value of `href`)
const isClickable = $derived(!!href)
</script>

<svelte:element
  {...restProps}
  this={href ? "a" : "article"}
  {id}
  class="
    card
    {bordered ? 'border border-border dark:border-border' : ''}
    {shadowed ? 'shadow-md dark:shadow-lg' : ''}
    {compact ? 'card-compact' : ''}
    {hoverable || isClickable ? 'card-hoverable' : ''}
    {className}
  "
  {href}
  tabindex={isClickable ? 0 : undefined}
>
  {#if media}
    <div class="card-media">
      {@render media()}
    </div>
  {:else if image}
    <div class="card-media">
      <img src={image} alt={imageAlt} />
    </div>
  {/if}

  {#if header}
    <div class="card-header">
      {@render header()}
    </div>
  {/if}

  <div class="card-body">
    {@render children?.()}
  </div>

  {#if footer}
    <div class="card-footer">
      {@render footer()}
    </div>
  {/if}
</svelte:element>

<style lang="postcss">
  @reference "../../twintrinsic.css";

  .card {
    @apply bg-background text-text rounded-lg overflow-hidden flex flex-col;
  }

  .card-media {
    @apply w-full;
  }

  .card-media img {
    @apply w-full h-auto object-cover;
  }

  .card-header {
    @apply px-6 py-4 border-b border-border dark:border-border font-medium;
  }

  .card-body {
    @apply px-6 py-4 flex-grow;
  }

  .card-footer {
    @apply px-6 py-4 border-t border-border dark:border-border bg-surface dark:bg-surface;
  }

  .card-compact .card-header {
    @apply px-4 py-2;
  }

  .card-compact .card-body {
    @apply px-4 py-2;
  }

  .card-compact .card-footer {
    @apply px-4 py-2;
  }

  .card-hoverable {
    @apply transition-all duration-200;
    @apply hover:shadow-lg dark:hover:shadow-xl focus:shadow-lg dark:focus:shadow-xl;
    @apply hover:border-primary-300 dark:hover:border-primary-600 focus:border-primary-300 dark:focus:border-primary-600;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-500;
  }

  /* Add cursor pointer only for clickable cards */
  a.card {
    @apply cursor-pointer;
  }
</style>
