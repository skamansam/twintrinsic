<!--
@component
Tag - A component for displaying tags, labels, or status indicators.
Provides consistent styling, accessibility features, and various display options.

Usage:
```svelte
<Tag>Default Tag</Tag>

<Tag variant="primary" size="lg">Primary Tag</Tag>

<Tag variant="success" icon="<svg>...</svg>">Success</Tag>

<Tag variant="warning" dismissible on:dismiss={() => handleDismiss()}>Warning</Tag>
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

    /** @type {string} - Size of the tag (sm, md, lg) */
    size = 'md',

    /** @type {string} - Icon to display (HTML or SVG string) */
    icon,

    /** @type {boolean} - Whether the tag is dismissible */
    dismissible = false,

    /** @type {boolean} - Whether to show the tag as an outline */
    outline = false,

    /** @type {boolean} - Whether to show the tag as a pill */
    pill = false,

    /** @type {boolean} - Whether the tag is clickable */
    clickable = false,

    /** @type {string} - URL for the tag (makes it a link) */
    href,

    /** @type {string} - Link target (_blank, _self, etc.) */
    target,

    /** @type {string} - ARIA label for the dismiss button */
    dismissAriaLabel = 'Dismiss',

    /** @type {string} - Custom dismiss icon (HTML or SVG string) */
    dismissIcon,

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
  
  // Determine size classes
  const sizeClasses = $derived({
    sm: 'text-xs px-2 py-0.5 h-5',
    md: 'text-sm px-2.5 py-0.5 h-6',
    lg: 'text-base px-3 py-1 h-8'
  }[size] || 'text-sm px-2.5 py-0.5 h-6');
  
  // Determine icon size classes
  const iconSizeClasses = $derived({
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }[size] || 'w-4 h-4');
  
  /**
   * Handles dismiss button click
   * @param {MouseEvent} event - Click event
   */
  function handleDismiss(event) {
    event.stopPropagation();
    dispatch('dismiss');
  }
  
  /**
   * Handles click on the tag
   * @param {MouseEvent} event - Click event
   */
  function handleClick(event) {
    if (clickable && !href) {
      dispatch('click', event);
    }
  }
</script>

{#if href}
  <a
    {id}
    href={href}
    target={target}
    class="
      tag
      {variantClasses}
      {sizeClasses}
      {pill ? 'tag-pill' : ''}
      {clickable || href ? 'tag-clickable' : ''}
      {className}
    "
    on:click={handleClick}
  >
    {#if icon}
      <span class="tag-icon {iconSizeClasses}">
        {@html icon}
      </span>
    {/if}
    
    <span class="tag-content">
      {@render children?.()}
    </span>
    
    {#if dismissible}
      <button
        type="button"
        class="tag-dismiss"
        aria-label={dismissAriaLabel}
        on:click={handleDismiss}
      >
        {#if dismissIcon}
          <span class="tag-dismiss-icon">
            {@html dismissIcon}
          </span>
        {:else}
          <svg class="{iconSizeClasses}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        {/if}
      </button>
    {/if}
  </a>
{:else}
  <span
    {id}
    class="
      tag
      {variantClasses}
      {sizeClasses}
      {pill ? 'tag-pill' : ''}
      {clickable ? 'tag-clickable' : ''}
      {className}
    "
    role={clickable ? 'button' : undefined}
    tabindex={clickable ? 0 : undefined}
    on:click={handleClick}
    on:keydown={(e) => e.key === 'Enter' && clickable && handleClick(e)}
  >
    {#if icon}
      <span class="tag-icon {iconSizeClasses}">
        {@html icon}
      </span>
    {/if}
    
    <span class="tag-content">
      {@render children?.()}
    </span>
    
    {#if dismissible}
      <button
        type="button"
        class="tag-dismiss"
        aria-label={dismissAriaLabel}
        on:click={handleDismiss}
      >
        {#if dismissIcon}
          <span class="tag-dismiss-icon">
            {@html dismissIcon}
          </span>
        {:else}
          <svg class="{iconSizeClasses}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        {/if}
      </button>
    {/if}
  </span>
{/if}

<style>
  @reference "../../twintrinsic.css";
  
  .tag {
    @apply inline-flex items-center;
    @apply rounded;
    @apply font-medium;
    @apply transition-colors duration-150;
    @apply max-w-full;
  }
  
  .tag-pill {
    @apply rounded-full;
  }
  
  .tag-clickable {
    @apply cursor-pointer;
    @apply hover:bg-opacity-80 dark:hover:bg-opacity-80;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-offset-2;
  }
  
  .tag-icon {
    @apply mr-1 flex-shrink-0;
  }
  
  .tag-content {
    @apply truncate;
  }
  
  .tag-dismiss {
    @apply ml-1 -mr-1 p-0.5;
    @apply rounded-full;
    @apply flex items-center justify-center;
    @apply text-current opacity-70;
    @apply hover:opacity-100;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400;
    @apply transition-opacity duration-150;
  }
</style>
