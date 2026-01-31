<!--
@component
AvatarGroup - A component for displaying multiple avatars in a compact, overlapping layout.
Provides consistent styling, accessibility features, and overflow handling.

Usage:
```svelte
<AvatarGroup>
  <Avatar src="/user1.jpg" alt="User 1" />
  <Avatar src="/user2.jpg" alt="User 2" />
  <Avatar src="/user3.jpg" alt="User 3" />
</AvatarGroup>

<AvatarGroup max={3} total={10}>
  <Avatar name="John Doe" />
  <Avatar name="Jane Smith" />
  <Avatar name="Bob Johnson" />
</AvatarGroup>
```
-->
<script lang="ts">
import { setContext } from "svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - Size of the avatars (xs, sm, md, lg, xl) */
  size = "md",

  /** @type {number} - Maximum number of avatars to display */
  max,

  /** @type {number} - Total number of avatars (for overflow count) */
  total,

  /** @type {number} - Spacing between avatars (-8 to 8) */
  spacing = -4,

  /** @type {boolean} - Whether to show a border around avatars */
  bordered = true,

  /** @type {string} - ARIA label for the group */
  ariaLabel = "Avatar group",

  children,
} = $props()

// Provide context for child avatars
$effect(() => {
  setContext("avatarGroup", {
    size,
    bordered,
  })
})

// Determine spacing class based on the spacing prop
const spacingClass = $derived(`avatar-group-spacing-${spacing}`)

// Determine if we need to show overflow
const showOverflow = $derived(max !== undefined && total !== undefined && total > max)

// Calculate overflow count
const overflowCount = $derived(showOverflow ? total - max : 0)
</script>

<div
  {id}
  class="
    avatar-group
    {spacingClass}
    {className}
  "
  role="group"
  aria-label={ariaLabel}
>
  <div class="avatar-group-items">
    {@render children?.()}
    
    {#if showOverflow}
      <div class="avatar-group-overflow">
        <span class="avatar-group-overflow-text">+{overflowCount}</span>
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .avatar-group {
    @apply inline-flex;
  }
  
  .avatar-group-items {
    @apply flex items-center;
  }
  
  /* Spacing classes */
  .avatar-group-spacing-8 :global(.avatar) {
    @apply ml-8;
  }
  
  .avatar-group-spacing-6 :global(.avatar) {
    @apply ml-6;
  }
  
  .avatar-group-spacing-4 :global(.avatar) {
    @apply ml-4;
  }
  
  .avatar-group-spacing-2 :global(.avatar) {
    @apply ml-2;
  }
  
  .avatar-group-spacing-0 :global(.avatar) {
    @apply ml-0;
  }
  
  .avatar-group-spacing--2 :global(.avatar) {
    @apply -ml-2;
  }
  
  .avatar-group-spacing--4 :global(.avatar) {
    @apply -ml-4;
  }
  
  .avatar-group-spacing--6 :global(.avatar) {
    @apply -ml-6;
  }
  
  .avatar-group-spacing--8 :global(.avatar) {
    @apply -ml-8;
  }
  
  /* Remove margin from first avatar */
  .avatar-group-items > :global(:first-child) {
    @apply ml-0;
  }
  
  /* Overflow counter */
  .avatar-group-overflow {
    @apply flex items-center justify-center;
    @apply bg-surface dark:bg-surface text-text dark:text-text;
    @apply rounded-full overflow-hidden;
    @apply border-2 border-background dark:border-background;
  }
  
  .avatar-group-overflow-text {
    @apply font-medium;
  }
  
  /* Inherit size from context */
  .avatar-group-overflow {
    @apply w-10 h-10 text-base;
  }
  
  :global(.avatar-group-items .avatar-xs) ~ .avatar-group-overflow,
  :global(.avatar-xs) ~ .avatar-group-overflow {
    @apply w-6 h-6 text-xs;
  }
  
  :global(.avatar-group-items .avatar-sm) ~ .avatar-group-overflow,
  :global(.avatar-sm) ~ .avatar-group-overflow {
    @apply w-8 h-8 text-sm;
  }
  
  :global(.avatar-group-items .avatar-md) ~ .avatar-group-overflow,
  :global(.avatar-md) ~ .avatar-group-overflow {
    @apply w-10 h-10 text-base;
  }
  
  :global(.avatar-group-items .avatar-lg) ~ .avatar-group-overflow,
  :global(.avatar-lg) ~ .avatar-group-overflow {
    @apply w-12 h-12 text-lg;
  }
  
  :global(.avatar-group-items .avatar-xl) ~ .avatar-group-overflow,
  :global(.avatar-xl) ~ .avatar-group-overflow {
    @apply w-16 h-16 text-xl;
  }
</style>
