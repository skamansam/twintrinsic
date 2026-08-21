<!--
@component
Modal - A dialog component for displaying content that requires user attention.
Built on the native HTML `<dialog>` element with `closedby="any"` for built-in
light-dismiss (Esc + backdrop click + platform close gestures), native focus
management, inert background content, and `@starting-style` + `allow-discrete`
entry/exit animations. No manual focus trap, backdrop div, or Escape listener.

Usage:
```svelte
<Modal open={showModal} onclose={() => showModal = false}>
  {#snippet header()}Modal Title{/snippet}
  <p>Modal content goes here</p>
  {#snippet footer()}
    <Button onclick={() => showModal = false}>Close</Button>
    <Button variant="primary">Save</Button>
  {/snippet}
</Modal>
```
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "open", type: "boolean", description: "Whether the modal is open", default: "false", optional: true },
  { name: "closeOnOutsideClick", type: "boolean", description: "Whether to close when clicking outside", default: "true", optional: true },
  { name: "closeOnEscape", type: "boolean", description: "Whether to close when pressing Escape", default: "true", optional: true },
  { name: "size", type: "string", description: "Size of the modal (sm, md, lg, xl, full)", default: "\"md\"", optional: true },
  { name: "centered", type: "boolean", description: "Whether to center the modal vertically", default: "true", optional: true },
  { name: "showCloseButton", type: "boolean", description: "Whether to show a close button in the header", default: "true", optional: true },
  { name: "closeButtonLabel", type: "string", description: "ARIA label for the close button", default: "\"Close modal\"", optional: true },
  { name: "ariaLabel", type: "string", description: "ARIA label for the modal", optional: true },
  { name: "ariaDescription", type: "string", description: "ARIA description for the modal", optional: true },
  { name: "onopen", type: "(event: CustomEvent) => void", description: "Open event handler", optional: true, eventDetail: "unknown" },
  { name: "onclose", type: "(event: CustomEvent<{ reason: string }>) => void", description: "Close event handler", optional: true, eventDetail: "{ reason: string }" },
  { name: "header", type: "Snippet", description: "Header content rendered at the top of the modal", optional: true },
  { name: "footer", type: "Snippet", description: "Footer content rendered at the bottom of the modal", optional: true },
];
</script>

<script lang="ts">
import type { Snippet } from "svelte"

interface Props {
  /** Additional CSS classes */
  class?: string
  /** HTML id for accessibility */
  id?: string
  /** Whether the modal is open */
  open?: boolean
  /** Whether to close when clicking outside */
  closeOnOutsideClick?: boolean
  /** Whether to close when pressing Escape */
  closeOnEscape?: boolean
  /** Size of the modal (sm, md, lg, xl, full) */
  size?: string
  /** Whether to center the modal vertically */
  centered?: boolean
  /** Whether to show a close button in the header */
  showCloseButton?: boolean
  /** ARIA label for the close button */
  closeButtonLabel?: string
  /** ARIA label for the modal */
  ariaLabel?: string
  /** ARIA description for the modal */
  ariaDescription?: string
  /** Open event handler */
  onopen?: (event: CustomEvent) => void
  /** Close event handler */
  onclose?: (event: CustomEvent<{ reason: string }>) => void
  children?: Snippet
  /** Header content rendered at the top of the modal */
  header?: Snippet
  /** Footer content rendered at the bottom of the modal */
  footer?: Snippet
}

let {
  class: className = "",
  id = crypto.randomUUID(),
  open = false,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  size = "md",
  centered = true,
  showCloseButton = true,
  closeButtonLabel = "Close modal",
  ariaLabel = undefined,
  ariaDescription = undefined,
  onopen = undefined,
  onclose = undefined,
  children = undefined,
  header = undefined,
  footer = undefined,
}: Props = $props()

let dialogElement: HTMLDialogElement | undefined = $state()

// Map the close-behavior flags onto the native `closedby` attribute so the
// browser handles light-dismiss natively. `closedby="any"` enables both
// Escape and outside-click close; `closerequest` restricts to Escape (and
// platform close gestures); `none` disables both. There is no native value
// for "outside click only", so that combination falls back to `none` plus a
// manual backdrop-close in handleBackdropClick.
const closedby = $derived(
  closeOnOutsideClick && closeOnEscape
    ? "any"
    : closeOnEscape
      ? "closerequest"
      : "none"
)

// Sync the dialog open state with the `open` prop via the native
// showModal()/close() methods. jsdom (unit tests) lacks showModal/close, so
// fall back to toggling the `open` attribute there.
$effect(() => {
  if (!dialogElement) return

  if (open && !dialogElement.open) {
    if (typeof dialogElement.showModal === "function") {
      dialogElement.showModal()
    } else {
      dialogElement.setAttribute("open", "")
    }
    onopen?.(new CustomEvent("open"))
  } else if (!open && dialogElement.open) {
    if (typeof dialogElement.close === "function") {
      dialogElement.close()
    } else {
      // jsdom lacks close(); mimic it and fire onclose directly.
      dialogElement.removeAttribute("open")
      handleClose()
    }
  }
})

/**
 * Closes the dialog programmatically and reports the reason.
 * The native `close` event fires and calls handleClose.
 */
function closeDialog(reason = "programmatic"): void {
  if (!dialogElement?.open) return
  pendingReason = reason
  if (typeof dialogElement.close === "function") {
    dialogElement.close()
  } else {
    dialogElement.removeAttribute("open")
    handleClose()
  }
}

// The native `close` event carries no reason, so track the last
// interaction that caused the close.
let pendingReason = "programmatic"

/** Handles the native dialog `close` event. */
function handleClose(): void {
  const reason = pendingReason
  pendingReason = "programmatic"
  onclose?.(new CustomEvent("close", { detail: { reason } }))
}

/**
 * Handles backdrop clicks. With `closedby="any"` the browser already
 * light-dismisses on outside click — this just records the reason so the
 * `close` event reports "backdrop". With `closedby="none"` (outside-click
 * close without Escape) the browser won't close, so close manually.
 */
function handleBackdropClick(event: MouseEvent): void {
  if (!closeOnOutsideClick || event.target !== dialogElement) return
  if (closedby === "any") {
    pendingReason = "backdrop"
  } else {
    closeDialog("backdrop")
  }
}

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

<dialog
  bind:this={dialogElement}
  {id}
  {closedby}
  class="
    modal
    {sizeClasses}
    {centered ? 'modal-centered' : 'modal-top'}
    {className}
  "
  aria-label={ariaLabel}
  aria-labelledby={!ariaLabel && header ? `${id}-title` : undefined}
  aria-describedby={ariaDescription ? `${id}-description` : undefined}
  aria-modal={open ? "true" : undefined}
  onclick={handleBackdropClick}
  onclose={handleClose}
>
  {#if header}
    <div class="modal-header">
      <div class="modal-title" id={`${id}-title`}>
        {@render header()}
      </div>

      {#if showCloseButton}
        <button
          type="button"
          class="modal-close-button"
          aria-label={closeButtonLabel}
          onclick={() => closeDialog("programmatic")}
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
</dialog>

<style lang="postcss">
  @reference "../../twintrinsic.css";

  /* Prevent body scrolling while any modal dialog is open — pure CSS via
     :has(), no body-class bookkeeping in JS. */
  :global(body:has(dialog[open])) {
    @apply overflow-hidden;
  }

  /* The author stylesheet must reproduce the UA's closed-dialog hiding:
     `.modal` sets display:flex, which would otherwise override the UA
     `dialog:not([open]) { display: none }` rule and leave a closed dialog
     visible. */
  :global(dialog.modal:not([open])) {
    @apply hidden;
  }

  /* Entry/exit animation: the dialog transitions in from the top layer
     with @starting-style and fades out via allow-discrete when closed. */
  .modal {
    @apply w-full relative;
    @apply bg-background text-text;
    @apply rounded-lg shadow-lg overflow-hidden;
    @apply flex flex-col max-h-[calc(100vh-2rem)];
    @apply m-auto;

    opacity: 0;
    transform: scale(0.95);
    transition:
      opacity 0.2s ease,
      transform 0.2s ease,
      overlay 0.2s allow-discrete,
      display 0.2s allow-discrete;
  }

  .modal[open] {
    opacity: 1;
    transform: scale(1);

    @starting-style {
      opacity: 0;
      transform: scale(0.95);
    }
  }

  /* Native backdrop. Per MDN, the backdrop's @starting-style must be a
     standalone block — it cannot be nested inside the ::backdrop rule
     because the nesting selector cannot represent pseudo-elements. */
  .modal::backdrop {
    @apply bg-black/50;
    backdrop-filter: blur(2px);

    transition:
      background-color 0.2s ease,
      overlay 0.2s allow-discrete,
      display 0.2s allow-discrete;
  }

  .modal[open]::backdrop {
    background-color: rgb(0 0 0 / 0.5);
  }

  @starting-style {
    .modal[open]::backdrop {
      background-color: transparent;
    }
  }

  .modal-centered {
    /* Native modal dialogs center by default — nothing to do. */
  }

  .modal-top {
    @apply mt-8;
  }

  .modal-header {
    @apply flex items-center justify-between p-4 sm:p-6;
    @apply border-b border-border;
  }

  .modal-title {
    @apply text-lg font-medium;
  }

  .modal-close-button {
    @apply p-1 rounded-md text-muted;
    @apply hover:bg-hover hover:text-text;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500;
  }

  .modal-body {
    @apply p-4 sm:p-6 overflow-y-auto;
  }

  .modal-footer {
    @apply flex items-center justify-end gap-3 p-4 sm:p-6;
    @apply border-t border-border;
  }
</style>
