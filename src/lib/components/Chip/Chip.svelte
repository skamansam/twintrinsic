<!--
@component
Chip - A compact element for representing an input, attribute, or action.
Provides consistent styling, accessibility features, and interactive options.

Usage:
```svelte
<Chip>Basic Chip</Chip>

<Chip variant="primary" icon="<svg>...</svg>">
  Primary Chip
</Chip>

<Chip 
  variant="success" 
  removable 
  on:remove={() => console.log('Chip removed')}
>
  Removable Chip
</Chip>

<Chip 
  variant="warning" 
  avatar="<img src='user.jpg' alt='User'>" 
  clickable
  on:click={() => console.log('Chip clicked')}
>
  User Name
</Chip>
```
-->
<script>
  import { createEventDispatcher } from 'svelte';

  const {
    /** @type {string} - Additional CSS classes */
    class: className = '',

    /** @type {string} - HTML id for accessibility */
    id = crypto.randomUUID(),

    /** @type {string} - Visual style variant */
    variant = 'default',

    /** @type {string} - Size of the chip (sm, md, lg) */
    size = 'md',

    /** @type {string} - Icon to display (HTML or SVG string) */
    icon,

    /** @type {string} - Avatar to display (HTML or img tag) */
    avatar,

    /** @type {boolean} - Whether the chip is removable */
    removable = false,

    /** @type {boolean} - Whether the chip is clickable */
    clickable = false,

    /** @type {boolean} - Whether the chip is disabled */
    disabled = false,

    /** @type {boolean} - Whether the chip is selected */
    selected = false,

    /** @type {boolean} - Whether to show an outline style */
    outline = false,

    /** @type {string} - ARIA label for the remove button */
    removeAriaLabel = 'Remove',

    /** @type {string} - Custom remove icon (HTML or SVG string) */
    removeIcon,

    children
  } = $props();

  const dispatch = createEventDispatcher();
  
  // Determine variant classes
  const variantClasses = $derived(outline 
    ? {
        default: 'bg-transparent border border-muted text-text dark:border-muted dark:text-text',
        primary: 'bg-transparent border border-primary-500 text-primary-500 dark:border-primary-500 dark:text-primary-500',
        secondary: 'bg-transparent border border-secondary-500 text-secondary-500 dark:border-secondary-500 dark:text-secondary-500',
        success: 'bg-transparent border border-success-500 text-success-500 dark:border-success-500 dark:text-success-500',
        warning: 'bg-transparent border border-warning-500 text-warning-500 dark:border-warning-500 dark:text-warning-500',
        error: 'bg-transparent border border-error-500 text-error-500 dark:border-error-500 dark:text-error-500',
        info: 'bg-transparent border border-info-500 text-info-500 dark:border-info-500 dark:text-info-500'
      }[variant]
    : {
        default: 'bg-muted/10 text-text dark:bg-muted/20 dark:text-text',
        primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200',
        secondary: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-200',
        success: 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200',
        warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200',
        error: 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200',
        info: 'bg-info-100 text-info-800 dark:bg-info-900 dark:text-info-200'
      }[variant]);
  
  // Determine selected variant classes
  const selectedClasses = $derived(selected
    ? {
        default: 'bg-muted/20 dark:bg-muted/30',
        primary: 'bg-primary-200 dark:bg-primary-800',
        secondary: 'bg-secondary-200 dark:bg-secondary-800',
        success: 'bg-success-200 dark:bg-success-800',
        warning: 'bg-warning-200 dark:bg-warning-800',
        error: 'bg-error-200 dark:bg-error-800',
        info: 'bg-info-200 dark:bg-info-800'
      }[variant]
    : '');
  
  // Determine size classes
  const sizeClasses = $derived({
    sm: 'text-xs px-2 py-0.5 h-6',
    md: 'text-sm px-2.5 py-1 h-8',
    lg: 'text-base px-3 py-1.5 h-10'
  }[size] || 'text-sm px-2.5 py-1 h-8');
  
  // Determine icon size classes
  const iconSizeClasses = $derived({
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }[size] || 'w-4 h-4');
  
  /**
   * Handles click on the chip
   * @param {MouseEvent} event - Click event
   */
  function handleClick(event) {
    if (disabled) {
      event.preventDefault();
      return;
    }
    
    if (clickable) {
      dispatch('click', event);
    }
  }
  
  /**
   * Handles remove button click
   * @param {MouseEvent} event - Click event
   */
  function handleRemove(event) {
    if (disabled) {
      event.preventDefault();
      return;
    }
    
    event.stopPropagation();
    dispatch('remove');
  }
  
  /**
   * Handles keydown events
   * @param {KeyboardEvent} event - Keydown event
   */
  function handleKeydown(event) {
    if (disabled) return;
    
    if (clickable && event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      dispatch('click', event);
    }
  }
</script>

<div
  {id}
  class="
    chip
    {variantClasses}
    {selectedClasses}
    {sizeClasses}
    {clickable ? 'chip-clickable' : ''}
    {disabled ? 'chip-disabled' : ''}
    {selected ? 'chip-selected' : ''}
    {className}
  "
  role={clickable ? 'button' : 'presentation'}
  tabindex={clickable && !disabled ? 0 : undefined}
  aria-disabled={disabled ? true : undefined}
  on:click={handleClick}
  on:keydown={handleKeydown}
>
  {#if avatar}
    <span class="chip-avatar">
      {@html avatar}
    </span>
  {/if}
  
  {#if icon}
    <span class="chip-icon {iconSizeClasses}" aria-hidden="true">
      {@html icon}
    </span>
  {/if}
  
  <span class="chip-content">
    {@render children?.()}
  </span>
  
  {#if removable && !disabled}
    <button
      type="button"
      class="chip-remove"
      aria-label={removeAriaLabel}
      on:click={handleRemove}
    >
      {#if removeIcon}
        <span class="chip-remove-icon {iconSizeClasses}">
          {@html removeIcon}
        </span>
      {:else}
        <svg class="{iconSizeClasses}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      {/if}
    </button>
  {/if}
</div>

<style>
  @reference "../../twintrinsic.css";
  
  .chip {
    @apply inline-flex items-center;
    @apply rounded-full;
    @apply font-medium;
    @apply transition-colors duration-150;
    @apply max-w-full;
  }
  
  .chip-clickable {
    @apply cursor-pointer;
    @apply hover:bg-opacity-80 dark:hover:bg-opacity-80;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-offset-2;
  }
  
  .chip-disabled {
    @apply opacity-50 cursor-not-allowed;
    @apply pointer-events-none;
  }
  
  .chip-avatar {
    @apply -ml-1 mr-1;
  }
  
  .chip-avatar :global(img),
  .chip-avatar :global(svg) {
    @apply w-6 h-6 rounded-full object-cover;
  }
  
  .chip-icon {
    @apply mr-1 flex-shrink-0;
  }
  
  .chip-content {
    @apply truncate;
  }
  
  .chip-remove {
    @apply ml-1 -mr-1 p-0.5;
    @apply rounded-full;
    @apply flex items-center justify-center;
    @apply text-current opacity-70;
    @apply hover:opacity-100;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400;
    @apply transition-opacity duration-150;
  }
</style>
