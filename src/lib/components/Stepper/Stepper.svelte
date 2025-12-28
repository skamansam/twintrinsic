<!--
@component
Stepper - A component for displaying multi-step processes or wizards.
Provides consistent styling, accessibility features, and various display options.

Usage:
```svelte
<Stepper activeStep={1}>
  <StepperStep title="Account" completed>Account details</StepperStep>
  <StepperStep title="Profile" active>Profile information</StepperStep>
  <StepperStep title="Review">Review and submit</StepperStep>
</Stepper>

<Stepper 
  activeStep={2} 
  variant="primary" 
  orientation="vertical" 
  alternativeLabels
>
  <StepperStep title="Step 1" completed>Step 1 content</StepperStep>
  <StepperStep title="Step 2" completed>Step 2 content</StepperStep>
  <StepperStep title="Step 3" active>Step 3 content</StepperStep>
  <StepperStep title="Step 4">Step 4 content</StepperStep>
</Stepper>
```
-->
<script>
import { setContext } from "svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {number} - Index of the active step (0-based) */
  activeStep = 0,

  /** @type {string} - Visual style variant */
  variant = "primary",

  /** @type {string} - Orientation of the stepper (horizontal, vertical) */
  orientation = "horizontal",

  /** @type {boolean} - Whether to place labels below the step icons */
  alternativeLabels = false,

  /** @type {boolean} - Whether to show linear progression only */
  linear = true,

  /** @type {boolean} - Whether to show the connector between steps */
  connector = true,

  /** @type {string} - ARIA label for the stepper */
  ariaLabel = "Step progress",

  children,
} = $props()

// Provide context for child components
$effect(() => {
  setContext("stepper", {
    activeStep,
    variant,
    orientation,
    alternativeLabels,
    linear,
    connector,
    getStepState: (index) => {
      if (index < activeStep) return "completed"
      if (index === activeStep) return "active"
      return "pending"
    },
  })
})
</script>

<div
  {id}
  class="
    stepper
    stepper-{orientation}
    {alternativeLabels ? 'stepper-alternative-labels' : ''}
    {className}
  "
  role="navigation"
  aria-label={ariaLabel}
>
  {@render children?.()}
</div>

<style>
  @reference "../../twintrinsic.css";
  
  .stepper {
    @apply w-full;
  }
  
  .stepper-horizontal {
    @apply flex flex-row items-start;
  }
  
  .stepper-vertical {
    @apply flex flex-col;
  }
  
  .stepper-alternative-labels.stepper-horizontal {
    @apply flex-col;
  }
</style>
