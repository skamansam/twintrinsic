<!--
@component
PropsTable - A component for displaying component props documentation.

Usage:
```svelte
<PropsTable
  props={[
    {
      name: 'value',
      type: 'string',
      default: "''",
      description: 'Current value'
    }
  ]}
/>
```
-->
<script>
const {
  /** @type {Array<{ name: string, type: string, default?: string, description: string }>} */
  props = [],
} = $props()
</script>

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
      {#each props as prop}
        <tr>
          <td class="prop-name">
            <code>{prop.name}</code>
          </td>
          <td class="prop-type">
            <code>{prop.type}</code>
          </td>
          <td class="prop-default">
            {#if prop.default !== undefined}
              <code>{prop.default}</code>
            {:else}
              <span class="prop-required">Required</span>
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

<style>
  @reference '../twintrinsic.css';

  .props-table {
    @apply my-4 overflow-x-auto;
  }

  table {
    @apply w-full border-collapse;
  }

  th {
    @apply px-4 py-2 text-left font-medium bg-surface border-b border-border;
  }

  td {
    @apply px-4 py-2 border-b border-border;
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

  .prop-description {
    @apply text-sm;
  }

  code {
    @apply px-1.5 py-0.5 text-xs font-mono rounded bg-surface;
  }
</style>
