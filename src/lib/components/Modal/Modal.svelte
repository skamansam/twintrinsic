<!--
@component
Modal - A dialog component for displaying content that requires user attention.
Provides accessible focus management, keyboard navigation, and backdrop interactions.

Usage:
```svelte
<Modal open={showModal} onclose={() => showModal = false}>
  <svelte:fragment slot="header">Modal Title</svelte:fragment>
  <p>Modal content goes here</p>
  <svelte:fragment slot="footer">
    <Button onclick={() => showModal = false}>Close</Button>
    <Button variant="primary">Save</Button>
  </svelte:fragment>
</Modal>
```
-->
<script>
import { onMount, createEventDispatcher } from "svelte"
import { fade, scale } from "svelte/transition"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {boolean} - Whether the modal is open */
  open = false,

  /** @type {boolean} - Whether to close when clicking outside */
  closeOnOutsideClick = true,

  /** @type {boolean} - Whether to close when pressing Escape */
  closeOnEscape = true,

  /** @type {string} - Size of the modal (sm, md, lg, xl, full) */
  size = "md",

  /** @type {boolean} - Whether to center the modal vertically */
  centered = true,

  /** @type {boolean} - Whether to show a close button in the header */
  showCloseButton = true,

  /** @type {string} - ARIA label for the close button */
  closeButtonLabel = "Close modal",

  /** @type {string} - ARIA label for the modal */
  ariaLabel,

  /** @type {string} - ARIA description for the modal */
  ariaDescription,

  children,
  header,
  footer,
} = $props()

const dispatch = createEventDispatcher()

// Modal state
let isOpen = $state(open)
let modalElement = $state()
let previouslyFocusedElement = $state()

// Sync open state when prop changes
$effect(() => {
  isOpen = open

  if (isOpen) {
    openModal()
  } else {
    closeModal()
  }
})

/**
 * Opens the modal
 */
function openModal() {
  // Save the currently focused element to restore later
  previouslyFocusedElement = document.activeElement

  // Add body class to prevent scrolling
  document.body.classList.add("modal-open")

  // Focus the modal after it's visible
  setTimeout(() => {
    focusFirstElement()
  }, 50)

  dispatch("open")
}

/**
 * Closes the modal
 */
function closeModal() {
  // Remove body class
  document.body.classList.remove("modal-open")

  // Restore focus to the previously focused element
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus()
  }

  dispatch("close")
}

/**
 * Handles backdrop clicks
 * @param {MouseEvent} event - Click event
 */
function handleBackdropClick(event) {
  // Only close if clicking directly on the backdrop, not on the modal content
  if (closeOnOutsideClick && event.target === event.currentTarget) {
    isOpen = false
    closeModal()
  }
}

/**
 * Handles keydown events
 * @param {KeyboardEvent} event - Keydown event
 */
function handleKeydown(event) {
  if (!isOpen) return

  // Close on Escape key
  if (closeOnEscape && event.key === "Escape") {
    event.preventDefault()
    isOpen = false
    closeModal()
    return
  }

  // Trap focus within modal
  if (event.key === "Tab") {
    trapFocus(event)
  }
}

/**
 * Traps focus within the modal
 * @param {KeyboardEvent} event - Keydown event
 */
function trapFocus(event) {
  if (!modalElement) return

  // Get all focusable elements
  const focusableElements = modalElement.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )

  if (focusableElements.length === 0) return

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  // If shift+tab on first element, move to last element
  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault()
    lastElement.focus()
  }
  // If tab on last element, move to first element
  else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault()
    firstElement.focus()
  }
}

/**
 * Focuses the first focusable element in the modal
 */
function focusFirstElement() {
  if (!modalElement) return

  // Try to focus the first focusable element
  const focusableElement = modalElement.querySelector(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )

  if (focusableElement) {
    focusableElement.focus()
  } else {
    // If no focusable element, focus the modal itself
    modalElement.focus()
  }
}

// Clean up when component is destroyed
onMount(() => {
  if (isOpen) {
    openModal()
  }

  return () => {
    if (isOpen) {
      document.body.classList.remove("modal-open")
    }
  }
})

// Determine size classes
const sizeClasses = $derived(
  {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
  }[size] || "max-w-md"
)
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
  <div
    class="modal-backdrop"
    onclick={handleBackdropClick}
    transition:fade={{ duration: 200 }}
  >
    <div
      {id}
      class="
        modal
        {sizeClasses}
        {centered ? 'modal-centered' : ''}
        {className}
      "
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      aria-describedby={ariaDescription ? `${id}-description` : undefined}
      tabindex="-1"
      bind:this={modalElement}
      transition:scale={{ duration: 200, start: 0.95 }}
    >
      {#if header}
        <div class="modal-header">
          <div class="modal-title">
            {@render header()}
          </div>
          
          {#if showCloseButton}
            <button
              type="button"
              class="modal-close-button"
              aria-label={closeButtonLabel}
              onclick={() => {
                isOpen = false;
                closeModal();
              }}
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          {/if}
        </div>
      {/if}
      
      <div class="modal-body" id={ariaDescription ? `${id}-description` : undefined}>
        {@render children?.()}
      </div>
      
      {#if footer}
        <div class="modal-footer">
          {@render footer()}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  /* Add global style to prevent body scrolling when modal is open */
  :global(body.modal-open) {
    @apply overflow-hidden;
  }
  
  .modal-backdrop {
    @apply fixed inset-0 z-50;
    @apply bg-black/50 dark:bg-black/60 backdrop-blur-sm;
    @apply flex items-center justify-center p-4;
  }
  
  .modal {
    @apply w-full relative;
    @apply bg-background dark:bg-background text-text dark:text-text;
    @apply rounded-lg shadow-lg overflow-hidden;
    @apply flex flex-col max-h-[calc(100vh-2rem)];
  }
  
  .modal-centered {
    @apply my-auto;
  }
  
  .modal-header {
    @apply flex items-center justify-between p-4 sm:p-6;
    @apply border-b border-border dark:border-border;
  }
  
  .modal-title {
    @apply text-lg font-medium;
  }
  
  .modal-close-button {
    @apply p-1 rounded-md text-muted dark:text-muted;
    @apply hover:bg-hover dark:hover:bg-hover hover:text-text dark:hover:text-text;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400;
  }
  
  .modal-body {
    @apply p-4 sm:p-6 overflow-y-auto;
  }
  
  .modal-footer {
    @apply flex items-center justify-end gap-3 p-4 sm:p-6;
    @apply border-t border-border dark:border-border;
  }
</style>
