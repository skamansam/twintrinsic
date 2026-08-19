<!--
@component
Card - A styled container for content with optional header and footer.
Built on top of the Panel component with additional card-specific styling.

Usage:
```svelte
<Card>
  {#snippet header()}Card Title{/snippet}
  <p>Card content</p>
  {#snippet footer()}Card footer{/snippet}
</Card>

<Card hoverable>
  {#snippet media()}
    <img src="image.jpg" alt="Card image" />
  {/snippet}
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
  /** Header content rendered at the top of the card */
  header?: Snippet
  /** Footer content rendered at the bottom of the card */
  footer?: Snippet
  /** Media content (image, video, etc.) rendered above the card body */
  media?: Snippet
}

export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "ariaLabel", type: "string", description: "ARIA label", optional: true },
  { name: "hoverable", type: "boolean", description: "Whether to add hover effects", default: "false", optional: true },
  { name: "shadow", type: "boolean", description: "Whether to add shadow", default: "true", optional: true },
  { name: "shadowSize", type: "\"none\" | \"sm\" | \"md\" | \"lg\" | \"xl\"", description: "Shadow size when shadow is true", default: "\"md\"", optional: true },
  { name: "clickable", type: "boolean", description: "Whether the card is clickable", default: "false", optional: true },
  { name: "header", type: "Snippet", description: "Header content rendered at the top of the card", optional: true },
  { name: "footer", type: "Snippet", description: "Footer content rendered at the bottom of the card", optional: true },
  { name: "media", type: "Snippet", description: "Media content (image, video, etc.) rendered above the card body", optional: true },
];
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

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
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
    {header}
  >
    {@render children?.()}
  </Panel>

  {#if footer}
    <div class="card-footer">
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
