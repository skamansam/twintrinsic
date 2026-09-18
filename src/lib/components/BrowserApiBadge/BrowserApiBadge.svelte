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
import { m } from "$lib/paraglide/messages.js"

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

/** The registered APIs for this component (empty → renders nothing). */
const apis = $derived(browserApisFor(component) ?? [])
</script>

{#if apis.length > 0}
  <span {...restProps} {id} class="browser-api-badges inline-flex items-center gap-1 {className}">
    {#each apis as api (api.label)}
      <Tooltip content={api.polyfill ? m.api_badge_polyfill({ api: api.polyfill }) : m.api_badge_nopolyfill()}>
        <a
          href={api.mdnUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={m.api_badge_link({ api: api.label })}
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
