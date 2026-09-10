<script lang="ts">
  import { m } from "$lib/paraglide/messages.js"
  import { getLocale, setLocale } from "$lib/paraglide/runtime.js"

  /** Locale codes this site supports */
  type LocaleCode = "en" | "es" | "fa"

  interface Props {
    /** Locale codes to offer, in display order */
    locales?: LocaleCode[]
    /** Presentation: button group or native select */
    variant?: "buttons" | "select"
    /** Additional CSS classes */
    class?: string
    /** Additional props passed through to the root element */
    [key: `data-${string}`]: unknown
  }

  let {
    locales = ["en", "es", "fa"],
    variant = "buttons",
    class: className = "",
    ...restProps
  }: Props = $props()

  /** The active locale (resolved once per render — switching reloads the page) */
  const activeLocale = getLocale()

  /** Native name per locale (each language names itself); falls back to the code */
  function localeLabel(code: LocaleCode): string {
    const names: Record<string, string> = { en: "English", es: "Español", fa: "فارسی" }
    return names[code] ?? code
  }

  /** Switch locale — the cookie strategy reloads the page in the new locale */
  function switchLocale(code: LocaleCode): void {
    if (code !== getLocale()) setLocale(code)
  }
</script>

{#if variant === "select"}
  <label {...restProps} class="inline-flex items-center gap-2 {className}">
    <span class="sr-only">{m.pg_locale_label()}</span>
    <select
      value={activeLocale}
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
    role="group"
    aria-label={m.pg_locale_label()}
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