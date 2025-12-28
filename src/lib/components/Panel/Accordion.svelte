<!--
@component
Accordion - A group of collapsible panels where only one can be expanded at a time.
Built on top of the Panel component with single-panel expansion behavior.

Usage:
```svelte
<Accordion>
  <Panel>
    <svelte:fragment slot="header">Section 1</svelte:fragment>
    Content 1
  </Panel>
  <Panel>
    <svelte:fragment slot="header">Section 2</svelte:fragment>
    Content 2
  </Panel>
</Accordion>

<Accordion multiple>
  &lt;!-- Allows multiple panels to be expanded --&gt;
  <Panel>Section 1</Panel>
  <Panel>Section 2</Panel>
</Accordion>
```
-->
<script>
import { onMount } from "svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - ARIA label */
  ariaLabel = "Accordion",

  /** @type {boolean} - Whether to allow multiple panels to be expanded */
  multiple = false,

  /** @type {boolean} - Whether to add dividers between panels */
  dividers = true,

  /** @type {boolean} - Whether to disable all panels */
  disabled = false,

  children,
} = $props()

let panels = $state([])
let activePanel = $state(null)

// Register a panel with the accordion
function registerPanel(panel) {
  panels = [...panels, panel]
  return () => {
    panels = panels.filter((p) => p !== panel)
  }
}

// Handle panel toggle
function handlePanelToggle(panel, expanded) {
  if (!multiple) {
    // If not multiple, collapse other panels
    panels.forEach((p) => {
      if (p !== panel && p.isExpanded) {
        p.collapse()
      }
    })
  }

  // Update active panel
  activePanel = expanded ? panel : null

  // Dispatch event
  const customEvent = new CustomEvent("change", {
    detail: {
      panel,
      expanded,
      activePanels: panels.filter((p) => p.isExpanded),
    },
  })
  this?.dispatchEvent(customEvent)
}

// Context for child panels
const context = {
  registerPanel,
  onToggle: handlePanelToggle,
  disabled,
}
</script>

<div
  class="accordion {dividers ? 'accordion-dividers' : ''} {className}"
  {id}
  role="region"
  aria-label={ariaLabel}
>
  <div class="accordion-content">
    {@render children?.()}
  </div>
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";

  .accordion {
    @apply bg-surface dark:bg-surface rounded-lg overflow-hidden;
    @apply border border-border dark:border-border;
  }

  .accordion-dividers :global(.panel:not(:last-child)) {
    @apply border-b border-border dark:border-border;
  }

  .accordion-content {
    @apply flex flex-col;
  }

  /* Remove border radius from child panels */
  .accordion :global(.panel) {
    @apply rounded-none border-0;
  }
</style>
