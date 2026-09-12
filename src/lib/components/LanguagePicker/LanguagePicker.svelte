<!--
@component
LanguagePicker - A compact language dropdown for Paraglide-powered apps.

Renders an icon button (flag for the current language, from the Iconify
`circle-flags` iconset's `lang-{code}` icons) that opens a WAI-ARIA menu of
available languages, each shown with its flag and in its own language (e.g.
"Español", "فارسی") so every option stays readable regardless of the active
locale. A check mark marks the active language.

When no `locales` prop is provided the available locales and the active one
are auto-detected from the compiled Paraglide runtime
(`$lib/paraglide/runtime.js` — `locales`, `getLocale`, `setLocale`), so apps
that use Paraglide only need to render `<LanguagePicker />`. When the runtime
is unavailable the component renders nothing, so non-Paraglide apps can keep
it in the tree (or behind the AppHeader's `showLocaleSwitcher` prop) without
errors.

Switching calls Paraglide's `setLocale`, which (with the default cookie
strategy) reloads the page in the new locale. Fires `onchange` with the
chosen locale after switching.

Usage:
```svelte
<LanguagePicker />

<LanguagePicker locales={["en", "de"]} onchange={(e) => console.log(e.detail.locale)} />
```
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "locales", type: "string[]", description: "Locale codes to offer, in display order. Defaults to the Paraglide runtime's locales", optional: true },
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "ariaLabel", type: "string", description: "Accessible label for the trigger button", default: "\"Change language\"", optional: true },
  { name: "onchange", type: "(event: CustomEvent<{ locale: string }>) => void", description: "Callback fired after the locale switches", optional: true, eventDetail: "{ locale: string }" },
];
</script>

<script lang="ts">
import Icon from "../Icon/Icon.svelte"

interface Props {
  /** Additional props passed through to the root element */
  [key: `data-${string}`]: unknown
  [key: `aria-${string}`]: string | undefined
  /** Locale codes to offer, in display order. Defaults to the Paraglide runtime's locales */
  locales?: string[]
  /** Additional CSS classes */
  class?: string
  /** HTML id for accessibility */
  id?: string
  /** Accessible label for the trigger button */
  ariaLabel?: string
  /** Callback fired after the locale switches */
  onchange?: (event: CustomEvent<{ locale: string }>) => void
}

let {
  locales = undefined,
  class: className = "",
  id = crypto.randomUUID(),
  ariaLabel = "Change language",
  onchange = undefined,
  ...restProps
}: Props = $props()

/** Native name per locale (each language names itself); falls back to the code */
const LOCALE_NAMES: Record<string, string> = {
  en: "English",
  es: "Español",
  fa: "فارسی",
}

/** Minimal shape the picker needs from the Paraglide runtime */
interface ParaglideRuntime {
  locales: readonly string[]
  getLocale: () => string
  setLocale: (locale: string, options?: { reload?: boolean }) => void
}

/** Paraglide runtime, resolved lazily so non-Paraglide apps never crash */
let runtime = $state<ParaglideRuntime | undefined>(undefined)

$effect(() => {
  // Dynamic import keeps the runtime optional: if the host app compiled
  // without Paraglide the import rejects and the picker hides itself.
  import(/* @vite-ignore */ "$lib/paraglide/runtime.js")
    .then((mod) => {
      runtime = mod as unknown as ParaglideRuntime
    })
    .catch(() => {
      runtime = undefined
    })
})

/** Locales to display: explicit prop, or the runtime's list once loaded */
const availableLocales = $derived(locales ?? runtime?.locales ?? [])

/** The active locale, re-read whenever the runtime resolves */
const activeLocale = $derived(runtime?.getLocale() ?? "")

/** True once the runtime has resolved AND exposed at least one locale */
const ready = $derived(availableLocales.length > 0 && activeLocale !== "")

/** Native label for a locale code */
function localeLabel(code: string): string {
  return LOCALE_NAMES[code] ?? code
}

/** Flag icon for a locale: circle-flags iconset's `lang-{code}` icon */
function localeFlag(code: string): string {
  return `circle-flags:lang-${code}`
}

/** Whether the dropdown menu is open */
let open = $state(false)

let menuEl: HTMLDivElement | undefined = $state()
let buttonEl: HTMLButtonElement | undefined = $state()

/**
 * Focus the item that should receive focus when the menu opens: per the
 * WAI-ARIA APG menu-button pattern, the checked item when one exists,
 * otherwise the first item.
 */
function focusInitialItem() {
  const item =
    (menuEl?.querySelector('[role="menuitemradio"][aria-checked="true"]') as HTMLElement | null) ??
    (menuEl?.querySelector('[role="menuitemradio"]') as HTMLElement | null)
  item?.focus()
}

/**
 * Show the popover and focus the checked (or first) menu item.
 *
 * The Popover API drives display, light-dismiss, and Escape handling; this
 * only needs to request the open state. In environments without the API
 * (unit tests) the calls are no-ops and `open` still tracks the intent.
 */
function openMenu() {
  open = true
  try {
    menuEl?.showPopover?.()
  } catch { /* already open */ }
  requestAnimationFrame(focusInitialItem)
}

/** Close the popover and return focus to the trigger. */
function closeMenu() {
  open = false
  try {
    menuEl?.hidePopover?.()
  } catch { /* already closed */ }
}

/** Toggle open/close from the trigger button. */
function toggleMenu() {
  if (open) {
    closeMenu()
  } else {
    openMenu()
  }
}

/**
 * Sync `open` with the popover's native state so light-dismiss (outside
 * click) and the browser's own Escape handling keep `aria-expanded` honest.
 */
function handleToggle(e: Event) {
  const newState = (e as ToggleEvent).newState
  open = newState === "open"
  if (open) {
    requestAnimationFrame(focusInitialItem)
  }
}

/**
 * WAI-ARIA menu keyboard navigation.
 * - ArrowDown/ArrowUp: Move focus between items (wrapping)
 * - Enter/Space: Activate item
 * - Escape: Close menu
 * - Home/End: Jump to first/last item
 */
function handleKeydown(e: KeyboardEvent) {
  if (!menuEl) return
  const items = Array.from(
    menuEl.querySelectorAll('[role="menuitemradio"]')
  ) as HTMLElement[]
  const currentIndex = items.indexOf(e.target as HTMLElement)

  switch (e.key) {
    case "ArrowDown": {
      e.preventDefault()
      const next = currentIndex < items.length - 1 ? currentIndex + 1 : 0
      items[next]?.focus()
      break
    }
    case "ArrowUp": {
      e.preventDefault()
      const prev = currentIndex > 0 ? currentIndex - 1 : items.length - 1
      items[prev]?.focus()
      break
    }
    case "Home": {
      e.preventDefault()
      items[0]?.focus()
      break
    }
    case "End": {
      e.preventDefault()
      items[items.length - 1]?.focus()
      break
    }
    case "Enter":
    case " ": {
      e.preventDefault()
      ;(e.target as HTMLElement)?.click()
      break
    }
    case "Escape": {
      e.preventDefault()
      closeMenu()
      buttonEl?.focus()
      break
    }
  }
}

/** Close when focus leaves the menu entirely. */
function handleFocusOut(e: FocusEvent) {
  requestAnimationFrame(() => {
    if (!menuEl?.contains(document.activeElement)) {
      closeMenu()
    }
  })
}

/** Switch locale via the Paraglide runtime and notify */
function switchLocale(code: string) {
  if (!runtime || code === activeLocale) return
  runtime.setLocale(code)
  closeMenu()
  buttonEl?.focus()
  onchange?.(new CustomEvent("change", { detail: { locale: code } }))
}
</script>

{#if ready}
  <div {...restProps} class="language-picker {className}" {id}>
    <button
      bind:this={buttonEl}
      type="button"
      class="language-picker-trigger"
      style="anchor-name: --language-picker-{id}"
      aria-haspopup="menu"
      aria-expanded={open}
      aria-label="{ariaLabel} ({activeLocale})"
      onclick={toggleMenu}
    >
      <Icon name={localeFlag(activeLocale)} class="language-picker-flag" />
    </button>

    <div
      bind:this={menuEl}
      id="{id}-menu"
      popover="auto"
      class="language-picker-menu"
      style="position-anchor: --language-picker-{id}"
      role="menu"
      aria-orientation="vertical"
      aria-label={ariaLabel}
      onkeydown={handleKeydown}
      ontoggle={handleToggle}
      onfocusout={handleFocusOut}
      tabindex="-1"
    >
      {#each availableLocales as code (code)}
        <button
          type="button"
          class="language-picker-item"
          role="menuitemradio"
          tabindex="-1"
          aria-checked={code === activeLocale}
          lang={code}
          onclick={() => switchLocale(code)}
        >
          <Icon name={localeFlag(code)} class="language-picker-flag" />
          <span class="language-picker-item-label">{localeLabel(code)}</span>
          {#if code === activeLocale}
            <Icon name="tabler:check" class="language-picker-check" />
          {/if}
        </button>
      {/each}
    </div>
  </div>
{/if}

<style lang="postcss">
  @reference "../../twintrinsic.css";

  .language-picker {
    @apply relative inline-block;
  }

  .language-picker-trigger {
    @apply inline-flex items-center gap-1.5 rounded-md p-2;
    @apply text-sm font-medium text-text;
    @apply hover:bg-hover focus:outline-none focus:ring-2 focus:ring-primary-500;
  }

  .language-picker-flag {
    @apply w-5 h-5 rounded-full;
  }

  .language-picker-menu {
    /* CSS Anchor Positioning: the matching anchor-name is set inline on the
       trigger (per-instance, so multiple pickers can coexist on one page).
       `inset: auto` must come BEFORE the anchor()-based offsets. */
    inset: auto;
    top: anchor(bottom);
    right: anchor(right);
    margin-top: 0.5rem;
    position-try-fallbacks: flip-block, flip-inline;

    @apply w-44 bg-surface border border-border rounded-md shadow-lg;
  }

  /* Author-level open state: beats the UA's [popover] display:none, and the
     polyfill class keeps the selector working where a polyfill is loaded. */
  .language-picker-menu:is(:popover-open, .\:popover-open) {
    display: block;
  }

  .language-picker-item {
    @apply flex w-full items-center justify-between gap-2 text-start;
    @apply px-4 py-2 text-sm;
    @apply hover:bg-hover focus:outline-none focus:bg-hover;
    @apply bg-transparent border-none cursor-pointer;
  }

  .language-picker-check {
    @apply w-4 h-4 text-primary-500;
  }
</style>
