<!--
@component
StepperStep - An individual step within a Stepper component.
Provides consistent styling, accessibility features, and various display options.

Usage:
```svelte
<StepperStep title="Account Details">
  Content for the account details step
</StepperStep>

<StepperStep 
  title="Review" 
  subtitle="Verify your information"
  icon="<svg>...</svg>"
  completed
>
  Review step content
</StepperStep>

<StepperStep 
  title="Payment" 
  optional 
  error={paymentError}
>
  Payment step content
</StepperStep>
```
-->
<script>
  import { getContext, onMount } from 'svelte';

  const {
    /** @type {string} - Additional CSS classes */
    class: className = '',

    /** @type {string} - HTML id for accessibility */
    id = crypto.randomUUID(),

    /** @type {string} - Step title */
    title,

    /** @type {string} - Step subtitle or description */
    subtitle,

    /** @type {string} - Custom icon (HTML or SVG string) */
    icon,

    /** @type {boolean} - Whether the step is optional */
    optional = false,

    /** @type {boolean} - Whether the step is disabled */
    disabled = false,

    /** @type {boolean} - Whether the step is completed */
    completed = false,

    /** @type {boolean} - Whether the step is active */
    active = false,

    /** @type {boolean} - Whether the step has an error */
    error = false,

    /** @type {boolean} - Whether to expand the step content (for vertical orientation) */
    expanded = false,

    /** @type {Function} - Click handler for the step */
    onClick,

    children
  } = $props();

  // Get stepper context
  const stepperContext = getContext('stepper');
  
  // Component state
  let stepElement;
  let index = $state(-1);
  
  // Register with parent on mount
  onMount(() => {
    if (stepElement) {
      // Find our index among siblings
      const parent = stepElement.parentElement;
      if (parent) {
        const steps = Array.from(parent.children);
        index = steps.indexOf(stepElement);
      }
    }
  });
  
  // Determine step state based on context and props
  $derived stepState = (() => {
    if (error) return 'error';
    if (completed) return 'completed';
    if (active) return 'active';
    
    // If not explicitly set, use context
    if (stepperContext && index >= 0) {
      return stepperContext.getStepState(index);
    }
    
    return 'pending';
  })();
  
  // Determine if this is the last step
  $derived isLast = !stepElement?.nextElementSibling;
  
  // Determine if step is clickable
  $derived isClickable = !!onClick && !disabled;
  
  // Determine if content should be shown
  $derived showContent = (stepperContext?.orientation === 'vertical' && (expanded || stepState === 'active')) && !!children;
  
  // Determine variant from context
  $derived variant = stepperContext?.variant || 'primary';
  
  // Determine orientation from context
  $derived orientation = stepperContext?.orientation || 'horizontal';
  
  // Determine if using alternative labels
  $derived alternativeLabels = stepperContext?.alternativeLabels || false;
  
  // Determine if showing connector
  $derived showConnector = stepperContext?.connector !== false && !isLast;
  
  // Determine variant classes
  $derived variantClasses = {
    default: 'text-muted dark:text-muted',
    primary: 'text-primary-500 dark:text-primary-500',
    secondary: 'text-secondary-500 dark:text-secondary-500',
    success: 'text-success-500 dark:text-success-500',
    warning: 'text-warning-500 dark:text-warning-500',
    error: 'text-error-500 dark:text-error-500',
    info: 'text-info-500 dark:text-info-500'
  }[variant] || 'text-primary-500 dark:text-primary-500';
  
  // Handle click on step
  function handleClick() {
    if (isClickable) {
      onClick(index);
    }
  }
</script>

<div
  {id}
  class="
    stepper-step
    stepper-step-{orientation}
    stepper-step-{stepState}
    {alternativeLabels ? 'stepper-step-alternative-labels' : ''}
    {disabled ? 'stepper-step-disabled' : ''}
    {isClickable ? 'stepper-step-clickable' : ''}
    {className}
  "
  role="listitem"
  aria-current={stepState === 'active' ? 'step' : undefined}
  aria-disabled={disabled ? true : undefined}
  bind:this={stepElement}
>
  <div 
    class="stepper-step-header"
    on:click={handleClick}
    on:keydown={(e) => e.key === 'Enter' && handleClick()}
    tabindex={isClickable ? 0 : undefined}
    role={isClickable ? 'button' : undefined}
  >
    <div class="stepper-step-icon-container">
      <div class="stepper-step-icon {variantClasses}">
        {#if stepState === 'completed'}
          {#if icon}
            <span class="stepper-step-custom-icon">
              {@html icon}
            </span>
          {:else}
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          {/if}
        {:else if stepState === 'error'}
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        {:else if icon}
          <span class="stepper-step-custom-icon">
            {@html icon}
          </span>
        {:else}
          <span class="stepper-step-number">{index + 1}</span>
        {/if}
      </div>
      
      {#if showConnector}
        <div class="stepper-step-connector">
          <span class="stepper-step-connector-line"></span>
        </div>
      {/if}
    </div>
    
    <div class="stepper-step-label">
      <span class="stepper-step-title">
        {title}
        {#if optional}
          <span class="stepper-step-optional">(optional)</span>
        {/if}
      </span>
      
      {#if subtitle}
        <span class="stepper-step-subtitle">
          {subtitle}
        </span>
      {/if}
    </div>
  </div>
  
  {#if showContent}
    <div class="stepper-step-content">
      {@render children?.()}
    </div>
  {/if}
</div>

<style>
  @reference "../../twintrinsic.css";
  
  .stepper-step {
    @apply relative;
  }
  
  /* Horizontal layout */
  .stepper-step-horizontal {
    @apply flex-1;
  }
  
  .stepper-step-horizontal .stepper-step-header {
    @apply flex flex-col items-center;
  }
  
  .stepper-step-horizontal .stepper-step-icon-container {
    @apply flex-1 flex items-center;
    @apply w-full;
  }
  
  .stepper-step-horizontal .stepper-step-connector {
    @apply flex-1 ml-2;
  }
  
  .stepper-step-horizontal .stepper-step-connector-line {
    @apply block w-full h-0.5;
    @apply bg-border dark:bg-border;
  }
  
  .stepper-step-horizontal.stepper-step-completed .stepper-step-connector-line,
  .stepper-step-horizontal.stepper-step-active .stepper-step-connector-line {
    @apply bg-current;
  }
  
  /* Alternative labels for horizontal */
  .stepper-step-horizontal.stepper-step-alternative-labels .stepper-step-header {
    @apply flex-row items-start;
  }
  
  .stepper-step-horizontal.stepper-step-alternative-labels .stepper-step-icon-container {
    @apply w-auto;
  }
  
  .stepper-step-horizontal.stepper-step-alternative-labels .stepper-step-label {
    @apply ml-3;
  }
  
  /* Vertical layout */
  .stepper-step-vertical {
    @apply mb-4;
  }
  
  .stepper-step-vertical .stepper-step-header {
    @apply flex flex-row items-start;
  }
  
  .stepper-step-vertical .stepper-step-icon-container {
    @apply flex flex-col items-center;
  }
  
  .stepper-step-vertical .stepper-step-connector {
    @apply flex-1 mt-2;
    @apply h-full min-h-8;
  }
  
  .stepper-step-vertical .stepper-step-connector-line {
    @apply block h-full w-0.5;
    @apply bg-border dark:bg-border;
  }
  
  .stepper-step-vertical.stepper-step-completed .stepper-step-connector-line,
  .stepper-step-vertical.stepper-step-active .stepper-step-connector-line {
    @apply bg-current;
  }
  
  .stepper-step-vertical .stepper-step-label {
    @apply ml-3;
  }
  
  .stepper-step-vertical .stepper-step-content {
    @apply ml-12 mt-2 mb-4;
  }
  
  /* Common styles */
  .stepper-step-icon {
    @apply flex items-center justify-center;
    @apply w-8 h-8 rounded-full;
    @apply bg-muted/10 dark:bg-muted/10;
    @apply text-muted dark:text-muted;
    @apply z-10;
  }
  
  .stepper-step-active .stepper-step-icon {
    @apply bg-current bg-opacity-10 dark:bg-opacity-10;
  }
  
  .stepper-step-completed .stepper-step-icon {
    @apply bg-current bg-opacity-10 dark:bg-opacity-10;
  }
  
  .stepper-step-error .stepper-step-icon {
    @apply bg-error-100 dark:bg-error-900;
    @apply text-error-500 dark:text-error-500;
  }
  
  .stepper-step-title {
    @apply text-sm font-medium;
    @apply text-text dark:text-text;
  }
  
  .stepper-step-active .stepper-step-title {
    @apply text-current;
  }
  
  .stepper-step-subtitle {
    @apply text-xs;
    @apply text-muted dark:text-muted;
    @apply block mt-0.5;
  }
  
  .stepper-step-optional {
    @apply text-xs font-normal;
    @apply text-muted dark:text-muted;
    @apply ml-1;
  }
  
  .stepper-step-clickable {
    @apply cursor-pointer;
  }
  
  .stepper-step-clickable .stepper-step-header {
    @apply hover:opacity-80;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-offset-2 rounded;
    @apply transition-opacity duration-150;
  }
  
  .stepper-step-disabled {
    @apply opacity-50 cursor-not-allowed;
    @apply pointer-events-none;
  }
</style>
