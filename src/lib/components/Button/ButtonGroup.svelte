<!--
@component
ButtonGroup - A component for grouping related buttons together.
Provides consistent styling and spacing for button collections.

Usage:
```svelte
<ButtonGroup>
  <Button>Left</Button>
  <Button>Middle</Button>
  <Button>Right</Button>
</ButtonGroup>

<ButtonGroup variant="outline" size="sm" vertical>
  <Button>Top</Button>
  <Button>Middle</Button>
  <Button>Bottom</Button>
</ButtonGroup>
```
-->
<script>
import { setContext } from "svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - Button variant to apply to all children (default, primary, secondary, outline, ghost) */
  variant,

  /** @type {string} - Button size to apply to all children (xs, sm, md, lg, xl) */
  size,

  /** @type {boolean} - Whether the buttons should be arranged vertically */
  vertical = false,

  /** @type {boolean} - Whether the button group should take full width */
  fullWidth = false,

  /** @type {string} - ARIA label for the button group */
  ariaLabel,

  children,
} = $props()

// Provide context for child buttons
setContext("buttonGroup", {
  variant,
  size,
  inGroup: true,
})
</script>

<div
  {id}
  class="
    button-group
    {vertical ? 'button-group-vertical' : 'button-group-horizontal'}
    {fullWidth ? 'w-full' : ''}
    {className}
  "
  role="group"
  aria-label={ariaLabel}
>
  {@render children?.()}
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .button-group {
    @apply inline-flex;
  }
  
  .button-group-horizontal {
    @apply flex-row;
  }
  
  .button-group-vertical {
    @apply flex-col;
  }
  
  /* Style child buttons to create connected appearance */
  .button-group-horizontal :global(.button) {
    @apply rounded-none;
  }
  
  .button-group-horizontal :global(.button:first-child) {
    @apply rounded-l-md;
  }
  
  .button-group-horizontal :global(.button:last-child) {
    @apply rounded-r-md;
  }
  
  .button-group-horizontal :global(.button:not(:first-child)) {
    @apply -ml-px;
  }
  
  .button-group-vertical :global(.button) {
    @apply rounded-none;
  }
  
  .button-group-vertical :global(.button:first-child) {
    @apply rounded-t-md;
  }
  
  .button-group-vertical :global(.button:last-child) {
    @apply rounded-b-md;
  }
  
  .button-group-vertical :global(.button:not(:first-child)) {
    @apply -mt-px;
  }
  
  /* Full width styles */
  .button-group.w-full {
    @apply w-full;
  }
  
  .button-group.w-full :global(.button) {
    @apply flex-1;
  }
</style>
