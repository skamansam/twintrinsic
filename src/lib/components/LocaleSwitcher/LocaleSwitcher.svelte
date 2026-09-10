<!--
@component
LocaleSwitcher - A language picker that switches the active Paraglide locale.
Renders either a group of toggle buttons or a native <select>, driven by the
Paraglide runtime (`getLocale`/`setLocale`). Language names are shown in their
own language (e.g. "Español", "فارسی") so every option stays readable
regardless of the active locale.

Requires Paraglide-JS compiled to `$lib/paraglide` with the same locales
listed in `messages/{locale}.json` (this repo's setup — see the vite plugin
and `project.inlang/settings.json`).

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
    { name: "locales", type: "LocaleCode[]", description: "Locale codes to offer, in display order", default: "[\"en\", \"es\", \"fa\"]", optional: true },
    { name: "variant", type: "\"buttons\" | \"select\"", description: "Presentation: toggle-button group or native select", default: "\"buttons\"", optional: true },
    { name: "ariaLabel", type: "string", description: "Accessible label for the group/select", default: "\"Choose a language\"", optional: true },
    { name: "onchange", type: "(event: CustomEvent<{ locale: LocaleCode }>) => void", description: "Change event fired after the locale switches", optional: true, eventDetail: "{ locale: LocaleCode }" },
  ];
</script>

<script lang="ts">
  import { getLocale, setLocale } from "$lib/paraglide/runtime.js"

  /** Locale codes this site supports — adjust to your project's locales */
  type LocaleCode = "en" | "es" | "fa"

  interface Props {
    /** Additional CSS classes */
    class?: string;
    /** HTML id for accessibility */
    id?: string;
    /** Locale codes to offer, in display order */
    locales?: LocaleCode[];
    /** Presentation: toggle-button group or native select */
    variant?: "buttons" | "select";
    /** Accessible label for the group/select */
    ariaLabel?: string;
    /** Change event fired after the locale switches */
    onchange?: (event: CustomEvent<{ locale: LocaleCode }>) => void;
    /** Additional props passed through to the root element */
    [key: `data-${string}`]: unknown;
  }

  let {
    class: className = "",
    id = crypto.randomUUID(),
    locales = ["en", "es", "fa"],
    variant = "buttons",
    ariaLabel = "Choose a language",
    onchange = undefined,
    ...restProps
  }: Props = $props()

  /** The active locale (resolved per render — switching reloads the page) */
  const activeLocale = getLocale()

  /** Native name per locale (each language names itself); falls back to the code */
  function localeLabel(code: LocaleCode): string {
    const names: Record<LocaleCode, string> = { en: "English", es: "Español", fa: "فارسی" }
    return names[code] ?? code
  }

  /** Switch locale — the cookie strategy reloads the page in the new locale */
  function switchLocale(code: LocaleCode): void {
    if (code === getLocale()) return
    setLocale(code)
    onchange?.(new CustomEvent("change", { detail: { locale: code } }))
  }
</script>

{#if variant === "select"}
  <label {...restProps} {id} class="inline-flex items-center gap-2 {className}">
    <span class="sr-only">{ariaLabel}</span>
    <select
      value={activeLocale}
      aria-label={ariaLabel}
      onchange={(event) => switchLocale(event.currentTarget.value as LocaleCode)}
      class="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary-500"
    >
      {#each locales as code}
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
    {#each locales as code}
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