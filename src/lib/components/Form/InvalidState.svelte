<!--
@component
InvalidState - A component for displaying validation errors in forms.
Provides consistent styling and accessibility features for error messages.

Usage:
```svelte
<InvalidState message="This field is required" />

<FormField>
  <TextInput name="email" />
  {#if errors.email}
    <InvalidState message={errors.email} />
  {/if}
</FormField>
```
-->
<script>
const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - Error message to display */
  message,

  /** @type {string} - Icon to display (HTML or SVG string) */
  icon,

  /** @type {boolean} - Whether to show the default icon */
  showIcon = true,

  /** @type {boolean} - Whether to animate the message */
  animated = true,

  children,
} = $props()
</script>

<div 
  class="invalid-state {className}"
  role="alert"
  aria-live="assertive"
>
  <div class="invalid-state-content">
    {#if showIcon}
      <div class="invalid-state-icon">
        {#if icon}
          {@html icon}
        {:else}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        {/if}
      </div>
    {/if}
    
    <div class="invalid-state-message">
      {#if message}
        {message}
      {:else}
        {@render children?.()}
      {/if}
    </div>
  </div>
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .invalid-state {
    @apply mt-1 text-xs text-error-600 dark:text-error-400;
    animation: invalid-state-appear 0.2s ease-in-out;
  }
  
  .invalid-state-content {
    @apply flex items-start gap-1.5;
  }
  
  .invalid-state-icon {
    @apply flex-shrink-0 mt-0.5;
  }
  
  .invalid-state-message {
    @apply flex-grow;
  }
  
  @keyframes invalid-state-appear {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
