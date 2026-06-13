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
-->
<script module lang="ts">
import type { Snippet } from "svelte"

/**
 * Public props for the Card component.
 * Exported so consumers can type-check against it and avoid the
 * `never` cascade that occurs when a component's destructured props
 * are not annotated with its own type.
 */
export type CardProps = {
  /** Additional CSS classes */
  class?: string
  /** HTML id for accessibility */
  id?: string
  /** ARIA label */
  ariaLabel?: string
  /** Whether to add hover effects */
  hoverable?: boolean
  /** Whether to add shadow */
  shadow?: boolean
  /** Shadow size when shadow is true */
  shadowSize?: "none" | "sm" | "md" | "lg" | "xl"
  /** Whether the card is clickable */
  clickable?: boolean
  children?: Snippet
  header?: Snippet
  footer?: Snippet
  media?: Snippet
}
</script>

<script lang="ts">
import Panel from "./Panel.svelte"

let {
  class: className = "",
  id = crypto.randomUUID(),
  ariaLabel,
  hoverable = false,
  shadow = true,
  shadowSize = "md",
  clickable = false,
  children,
  header,
  footer,
  media,
}: CardProps = $props()

// Handle click events if card is clickable
let cardElement: HTMLDivElement | undefined = $state()

function handleClick(event: MouseEvent | KeyboardEvent): void {
  if (clickable && cardElement) {
    const customEvent = new CustomEvent("click", {
      detail: { originalEvent: event },
      bubbles: true,
    })
    cardElement.dispatchEvent(customEvent)
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
  onkeydown={(event: KeyboardEvent): void => {
    if (clickable && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      handleClick(event);
    }
  }}
  tabindex={clickable ? 0 : undefined}
  bind:this={cardElement}
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
      <!-- @ts-ignore Svelte 5 internal `$$slot_def` type on snippet render via slot fragment -->
      {@render header?.()}
    </svelte:fragment>

    <!-- @ts-ignore Svelte 5 internal `$$slot_def` type on snippet render -->
    {@render children?.()}
  </Panel>

  {#if footer}
    <div class="card-footer">
      <!-- @ts-ignore Svelte 5 internal `$$slot_def` type on snippet render -->
      {@render footer?.()}
    </div>
  {/if}

  {#if footer}
    <div class="card-footer">
      {@render footer?.()}
    </div>
  {/if}
</div>

<style lang="postcss">
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
