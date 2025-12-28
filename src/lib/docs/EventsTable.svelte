<!--
@component
EventsTable - A component for displaying component events documentation.

Usage:
```svelte
<EventsTable
  events={[
    {
      name: 'change',
      type: '{ value: string }',
      description: 'Fired when value changes'
    }
  ]}
/>
```
-->
<script>
const {
  /** @type {Array<{ name: string, type: string, description: string }>} */
  events = [],
} = $props()
</script>

<div class="events-table">
  <table>
    <thead>
      <tr>
        <th>Event</th>
        <th>Detail Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {#each events as event}
        <tr>
          <td class="event-name">
            <code>on{event.name}</code>
          </td>
          <td class="event-type">
            <code>{event.type}</code>
          </td>
          <td class="event-description">
            {event.description}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style lang="postcss">
  @reference '../twintrinsic.css';

  .events-table {
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

  .event-name {
    @apply whitespace-nowrap font-medium;
  }

  .event-type {
    @apply whitespace-nowrap text-muted;
  }

  .event-description {
    @apply text-sm;
  }

  code {
    @apply px-1.5 py-0.5 text-xs font-mono rounded bg-surface;
  }
</style>
