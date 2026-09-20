<!--
@component
BrowserApiBadge - Docs-site badge row naming the native browser APIs a
component is built on (plan item 11.3).

Renders one outline pill per API, each wrapped in a Tooltip stating that
the feature is a native browser API and that consumers targeting older
browsers may need to install the named polyfill (Twintrinsic never ships
one — plan 11.1 policy). Data comes from `browserApiRegistry`; tooltip
text is i18n'd via Paraglide and supports one `{api}` placeholder.

Usage:
```svelte
<BrowserApiBadge component="CalendarView" />
```
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "component", type: "string", description: "The component name to look up in the browser-API registry", optional: false },
  { name: "class", type: "string", description: "Additional CSS classes for the wrapper span", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for the wrapper element", default: "crypto.randomUUID()", optional: true },
];
</script>

<script lang="ts">
import Badge from "../Badge/Badge.svelte"
import Tooltip from "../Tooltip/Tooltip.svelte"
import { browserApisFor } from "./browserApiRegistry.js"

interface Props {
  /** The component name to look up in the browser-API registry */
  component: string
  /** Additional CSS classes for the wrapper span */
  class?: string
  /** HTML id for the wrapper element */
  id?: string
  [key: `data-${string}`]: unknown
  [key: `aria-${string}`]: string | undefined
}

let { component, class: className = "", id = crypto.randomUUID(), ...restProps }: Props = $props()

/** Paraglide `m` message functions, resolved lazily so non-Paraglide apps still render */
let messages = $state<Record<string, (params?: Record<string, unknown>) => string> | undefined>(
  undefined,
)

$effect(() => {
  // Same opt-in pattern as LanguagePicker/LocaleSwitcher: the glob resolves
  // at build time in the consumer's app and stays empty when the host has no
  // `src/lib/paraglide`, in which case the English fallbacks are used.
  const glob = (
    import.meta as { glob?: (pattern: string) => Record<string, () => Promise<unknown>> }
  ).glob
  const messageModules = glob?.("$lib/paraglide/messages.js") ?? {}
  const loaders = Object.values(messageModules)
  if (loaders.length === 0) return
  loaders[0]()
    .then((mod) => {
      messages = (
        mod as { m?: Record<string, (params?: Record<string, unknown>) => string> }
      ).m
    })
    .catch(() => {
      messages = undefined
    })
})

/** Looks up a translated message, falling back to English when Paraglide is absent */
function msg(key: string, params: Record<string, unknown> | undefined, fallback: string): string {
  const fn = messages?.[key]
  if (!fn) return fallback
  return fn(params)
}

/** The registered APIs for this component (empty → renders nothing). */
const apis = $derived(browserApisFor(component) ?? [])
</script>

{#if apis.length > 0}
  <span {...restProps} {id} class="browser-api-badges inline-flex items-center gap-1 {className}">
    {#each apis as api (api.label)}
      <Tooltip
        content={api.polyfill
          ? msg(
              "api_badge_polyfill",
              { api: api.polyfill },
              `Built on a native browser API. Twintrinsic ships no polyfill — if you target older browsers, install ${api.polyfill} yourself (e.g. as the first import of your app entry).`,
            )
          : msg(
              "api_badge_nopolyfill",
              undefined,
              "Built on a native browser API. No polyfill is available — browsers without support cannot enable this feature.",
            )}
      >
        <a
          href={api.mdnUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={msg(
            "api_badge_link",
            { api: api.label },
            `Learn more about the ${api.label} browser API (opens MDN in a new tab)`,
          )}
        >
          <Badge pill outline variant="info">{api.label}</Badge>
        </a>
      </Tooltip>
    {/each}
  </span>
{/if}

<style lang="postcss">
  @reference "../../twintrinsic.css";

  .browser-api-badges {
    @apply align-middle;
  }
</style>
