<!--
@component
PropsTable - renders a component's props as a documentation table.

Data source, in order of precedence:
1. `component` — pass a component module (namespace import) that exports a
   `propsMetadata` array; PropsTable reads it directly.
2. `data` — a plain hash of `{ propName: { type, description, default?, optional? } }`.

If neither yields data, PropsTable logs a `console.warn` and renders nothing.

Self-describing component convention:
```svelte
<script module lang="ts">
  export const propsMetadata = [
    { name: "value", type: "string", description: "Current value" },
  ];
</script>
```

Usage:
```svelte
<script>
  import * as Button from "twintrinsic/components/Button"
  import PropsTable from "twintrinsic/components/PropsTable"
</script>

<PropsTable component={Button} />

<PropsTable
  data={{
    value: { type: "string", description: "Current value", default: "''" },
  }}
/>
```
-->
<script lang="ts">
  import type { PropDataHash, PropMetadata } from "../../helpers/propMetadata.js";

  interface Props {
    /** Component module (namespace import) whose `propsMetadata` export to render */
    component?: { propsMetadata?: PropMetadata[] };
    /** Explicit hash of prop name → descriptor (fallback when `component` has none) */
    data?: PropDataHash;
  }

  let { component = undefined, data = undefined }: Props = $props();

  const resolvedProps = $derived.by((): PropMetadata[] => {
    if (component?.propsMetadata && component.propsMetadata.length) {
      return component.propsMetadata;
    }
    if (data && Object.keys(data).length) {
      return Object.entries(data).map(([name, descriptor]) => ({ name, ...descriptor }));
    }
    return [];
  });

  $effect(() => {
    if (resolvedProps.length === 0) {
      console.warn(
        "PropsTable: no props metadata available. Pass a component module with `export const propsMetadata`, or a `data` hash.",
      );
    }
  });

  /** Compact display type: event callbacks show their CustomEvent detail. */
  function displayType(prop: PropMetadata): string {
    if (prop.eventDetail) return `CustomEvent<${prop.eventDetail}>`;
    return prop.type;
  }

  /** Whether the prop is required (no default and not optional). */
  function isRequired(prop: PropMetadata): boolean {
    return prop.default === undefined && prop.optional !== true;
  }
</script>

{#if resolvedProps.length}
  <div class="props-table">
    <table>
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {#each resolvedProps as prop (prop.name)}
          <tr>
            <td class="prop-name">
              <code>{prop.name}</code>
            </td>
            <td class="prop-type">
              <code>{displayType(prop)}</code>
            </td>
            <td class="prop-default">
              {#if prop.default !== undefined}
                <code>{prop.default}</code>
              {:else if isRequired(prop)}
                <span class="prop-required">Required</span>
              {:else}
                <span class="prop-optional">—</span>
              {/if}
            </td>
            <td class="prop-description">
              {prop.description}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}

<style lang="postcss">
  @reference "../../twintrinsic.css";

  .props-table {
    @apply my-4 overflow-x-auto rounded-lg border border-border;
  }

  table {
    @apply w-full border-collapse;
  }

  th {
    @apply px-4 py-2 text-left text-sm font-medium bg-surface border-b border-border;
  }

  td {
    @apply px-4 py-2 border-b border-border align-top;
  }

  .prop-name {
    @apply whitespace-nowrap font-medium;
  }

  .prop-type {
    @apply whitespace-nowrap text-muted;
  }

  .prop-default {
    @apply whitespace-nowrap text-muted;
  }

  .prop-required {
    @apply text-xs font-medium text-warning;
  }

  .prop-optional {
    @apply text-muted;
  }

  .prop-description {
    @apply text-sm text-text;
  }

  code {
    @apply px-1.5 py-0.5 text-xs font-mono rounded bg-surface;
  }
</style>
