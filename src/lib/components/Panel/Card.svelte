<!--
@component
Card - A styled container for content with optional header and footer.
Built on top of the Panel component with additional card-specific styling.

Usage:
```svelte
<Card>
  <svelte:fragment slot="header">Card Title</svelte:fragment>
  <p>Card content</p>
  <svelte:fragment slot="footer">Card footer</svelte:fragment>
</Card>

<Card hoverable>
  <svelte:fragment slot="media">
    <img src="image.jpg" alt="Card image" />
  </svelte:fragment>
  <h3>Title</h3>
  <p>Content with hover effect</p>
</Card>
```
-->
<script>
import Panel from "./Panel.svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - ARIA label */
  ariaLabel,

  /** @type {boolean} - Whether to add hover effects */
  hoverable = false,

  /** @type {boolean} - Whether to add shadow */
  shadow = true,

  /** @type {"none" | "sm" | "md" | "lg" | "xl"} - Shadow size when shadow is true */
  shadowSize = "md",

  /** @type {boolean} - Whether the card is clickable */
  clickable = false,

  children,
  header,
  footer,
  media,
} = $props()

// Handle click events if card is clickable
function handleClick(event) {
  if (clickable) {
    const customEvent = new CustomEvent("click", {
      detail: { originalEvent: event },
      bubbles: true,
    })
    this?.dispatchEvent(customEvent)
  }
}
</script>

<div
  class="
    card
    {shadow ? `shadow-${shadowSize}` : ''}
    {hoverable ? 'card-hoverable' : ''}
    {clickable ? 'card-clickable' : ''}
    {className}
  "
  {id}
  role={clickable ? 'button' : 'article'}
  aria-label={ariaLabel}
  onclick={handleClick}
  onkeydown={event => {
    if (clickable && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      handleClick(event);
    }
  }}
  tabindex={clickable ? '0' : undefined}
>
  {#if media}
    <div class="card-media">
      {@render media?.()}
    </div>
  {/if}

  <Panel
    expanded={true}
    showIcon={false}
    bordered={false}
  >
    <svelte:fragment slot="header">
      {@render header?.()}
    </svelte:fragment>

    {@render children?.()}
  </Panel>

  {#if footer}
    <div class="card-footer">
      {@render footer?.()}
    </div>
  {/if}
</div>

<style>
  @reference "../../twintrinsic.css";

  .card {
    @apply bg-surface dark:bg-surface rounded-lg overflow-hidden;
    @apply border border-border dark:border-border;
  }

  .card-hoverable {
    @apply transition-all duration-200;
    @apply hover:shadow-lg hover:-translate-y-1;
  }

  .card-clickable {
    @apply cursor-pointer;
    @apply focus:outline-none focus:ring-2 focus:ring-focus-ring;
  }

  .card-media {
    @apply w-full overflow-hidden;
  }

  .card-media :global(img) {
    @apply w-full h-full object-cover;
  }

  .card-footer {
    @apply px-4 py-3 bg-muted/10 dark:bg-muted/10;
    @apply border-t border-border dark:border-border;
  }
</style>
