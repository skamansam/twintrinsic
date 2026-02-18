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
<script lang="ts">
import Icon from "../Icon/Icon.svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - Error message to display */
  message,

  /** @type {string} - Icon name to display */
  icon = "alert-circle",

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
    {#if showIcon && icon}
      <div class="invalid-state-icon">
        <Icon name={icon} width="16px" height="16px" />
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
