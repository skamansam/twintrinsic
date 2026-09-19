<!--
@component
LocaleSwitcher - A language picker that switches the active Paraglide locale.
Renders either a group of toggle buttons or a native <select>, driven by the
Paraglide runtime (`getLocale`/`setLocale`). Language names are shown in their
own language (e.g. "Español", "فارسی") so every option stays readable
regardless of the active locale.

When no `locales` prop is provided the available locales and the active one
are auto-detected from the compiled Paraglide runtime
(`$lib/paraglide/runtime.js` — `locales`, `getLocale`, `setLocale`), so apps
that use Paraglide only need to render `<LocaleSwitcher />`. When the runtime
is unavailable the component renders nothing, so non-Paraglide apps can keep
it in the tree without errors.

Usage:
```svelte
<LocaleSwitcher />

<LocaleSwitcher variant="select" ariaLabel="Choose a language" />
```
-->
<script module lang="ts">
  export const propsMetadata = [
    { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
    { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
    { name: "locales", type: "string[]", description: "Locale codes to offer, in display order. Defaults to the Paraglide runtime's locales", optional: true },
    { name: "variant", type: "\"buttons\" | \"select\"", description: "Presentation: toggle-button group or native select", default: "\"buttons\"", optional: true },
    { name: "ariaLabel", type: "string", description: "Accessible label for the group/select", default: "\"Choose a language\"", optional: true },
    { name: "onchange", type: "(event: CustomEvent<{ locale: string }>) => void", description: "Change event fired after the locale switches", optional: true, eventDetail: "{ locale: string }" },
  ];
</script>

<script lang="ts">
  /** Minimal shape the switcher needs from the Paraglide runtime */
  interface ParaglideRuntime {
    locales: readonly string[]
    getLocale: () => string
    setLocale: (locale: string, options?: { reload?: boolean }) => void
  }

  interface Props {
    /** Additional CSS classes */
    class?: string;
    /** HTML id for accessibility */
    id?: string;
    /** Locale codes to offer, in display order. Defaults to the Paraglide runtime's locales */
    locales?: string[];
    /** Presentation: toggle-button group or native select */
    variant?: "buttons" | "select";
    /** Accessible label for the group/select */
    ariaLabel?: string;
    /** Change event fired after the locale switches */
    onchange?: (event: CustomEvent<{ locale: string }>) => void;
    /** Additional props passed through to the root element */
    [key: `data-${string}`]: unknown;
  }

  let {
    class: className = "",
    id = crypto.randomUUID(),
    locales = undefined,
    variant = "buttons",
    ariaLabel = "Choose a language",
    onchange = undefined,
    ...restProps
  }: Props = $props()

  /** Paraglide runtime, resolved lazily so non-Paraglide apps never crash */
  let runtime = $state<ParaglideRuntime | undefined>(undefined)

  $effect(() => {
    // Dynamic import keeps the runtime optional: if the host app compiled
    // without Paraglide the glob resolves to an empty map and the switcher
    // hides itself. The `$lib` alias is intentional: components ship as
    // source, so a consumer's build resolves it to THEIR
    // `src/lib/paraglide/runtime.js`; apps without the alias (or without
    // Paraglide) simply match nothing and the glob stays empty.
    const glob = (
      import.meta as { glob?: (pattern: string) => Record<string, () => Promise<unknown>> }
    ).glob
    const runtimeModules = glob?.("$lib/paraglide/runtime.js") ?? {}
    const loaders = Object.values(runtimeModules)
    if (loaders.length === 0) {
      runtime = undefined
      return
    }
    loaders[0]()
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

  /** Native name per locale (each language names itself); falls back to the code */
  const LOCALE_NAMES: Record<string, string> = {
    en: "English",
    es: "Español",
    fa: "فارسی",
  }

  function localeLabel(code: string): string {
    return LOCALE_NAMES[code] ?? code
  }

  /** Switch locale — the cookie strategy reloads the page in the new locale */
  function switchLocale(code: string): void {
    if (!runtime || code === activeLocale) return
    runtime.setLocale(code)
    onchange?.(new CustomEvent("change", { detail: { locale: code } }))
  }
</script>

{#if ready}
  {#if variant === "select"}
    <label {...restProps} {id} class="inline-flex items-center gap-2 {className}">
      <span class="sr-only">{ariaLabel}</span>
      <select
        value={activeLocale}
        aria-label={ariaLabel}
        onchange={(event) => switchLocale(event.currentTarget.value)}
        class="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        {#each availableLocales as code (code)}
          <option value={code}>{localeLabel(code)}</option>
        {/each}
      </select>
    </label>
  {:else}
    <div
      {...restProps}
      {id}
      role="group"
      aria-label={ariaLabel}
      class="inline-flex items-center gap-1 rounded-lg border border-border bg-surface p-1 {className}"
    >
      {#each availableLocales as code (code)}
        <button
          type="button"
          aria-pressed={activeLocale === code}
          onclick={() => switchLocale(code)}
          class="rounded-md px-3 py-1 text-sm transition-colors {activeLocale === code
            ? 'bg-primary-500 text-white'
            : 'text-text hover:bg-hover'}"
        >
          {localeLabel(code)}
        </button>
      {/each}
    </div>
  {/if}
{/if}
