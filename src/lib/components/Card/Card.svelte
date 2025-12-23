<!--
@component
Card - A container for content with optional header, footer, and media sections.
Provides a consistent visual style for displaying grouped information.

Usage:
```svelte
<Card>
  <svelte:fragment slot="header">Card Title</svelte:fragment>
  <p>Card content goes here</p>
  <svelte:fragment slot="footer">Footer content</svelte:fragment>
</Card>

<Card
  href="/some-link"
  image="/path/to/image.jpg"
  imageAlt="Description of image"
>
  <svelte:fragment slot="header">Linked Card</svelte:fragment>
  This card is clickable
</Card>
```
-->
<script>
const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - Link URL if the card is clickable */
  href,

  /** @type {string} - Image URL for card media */
  image,

  /** @type {string} - Alt text for the image */
  imageAlt = "",

  /** @type {boolean} - Whether to show a border */
  bordered = true,

  /** @type {boolean} - Whether to add a shadow */
  shadowed = false,

  /** @type {boolean} - Whether to make the card compact (less padding) */
  compact = false,

  /** @type {boolean} - Whether to add hover effects */
  hoverable = false,

  children,
  header,
  footer,
} = $props()

// Determine if card has clickable behavior
const isClickable = !!href

// Determine element type based on href
const elementType = href ? "a" : "div"
</script>

<svelte:element
  this={elementType}
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
  {#if image}
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

<style>
  @reference "../../twintrinsic.css";
  
  .card {
    @apply bg-background dark:bg-background text-text dark:text-text rounded-lg overflow-hidden flex flex-col;
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
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400;
  }
  
  /* Add cursor pointer only for clickable cards */
  a.card {
    @apply cursor-pointer;
  }
</style>
