<!--
@component
EventsTable - renders a component's events (Svelte 5 `on*` callback props) as a
documentation table.

Data source, in order of precedence:
1. `component` — pass a component module (namespace import) that exports a
   `propsMetadata` array; EventsTable reads it directly and keeps the entries
   whose `eventDetail` is set.
2. `data` — a plain hash of `{ eventName: { type, description } }` (names are
   written without the `on` prefix).

If neither yields data, EventsTable logs a `console.warn` and renders nothing.

Usage:
```svelte
<script>
  import * as Calendar from "twintrinsic/components/Calendar"
  import EventsTable from "twintrinsic/components/EventsTable"
</script>

<EventsTable component={Calendar} />

<EventsTable
  data={{
    change: { type: "{ value: string }", description: "Fired when value changes" },
  }}
/>
```
-->
<script lang="ts">
  import type { EventDataHash, PropMetadata } from "../../helpers/propMetadata.js";

  interface Props {
    /** Component module (namespace import) whose `propsMetadata` export to derive events from */
    component?: { propsMetadata?: PropMetadata[] };
    /** Explicit hash of event name → descriptor (fallback when `component` has none) */
    data?: EventDataHash;
  }

  let { component = undefined, data = undefined }: Props = $props();

  const resolvedEvents = $derived.by(
    (): Array<{ name: string; type: string; description: string }> => {
      if (component?.propsMetadata?.length) {
        return component.propsMetadata
          .filter((p: PropMetadata) => p.eventDetail !== undefined)
          .map((p: PropMetadata) => ({
            name: p.name.slice(2), // strip the "on" prefix
            type: p.eventDetail ?? "void",
            description: p.description,
          }));
      }
      if (data && Object.keys(data).length) {
        return Object.entries(data).map(([name, descriptor]) => ({
          name,
          type: descriptor.type,
          description: descriptor.description,
        }));
      }
      return [];
    },
  );

  $effect(() => {
    if (resolvedEvents.length === 0) {
      console.warn(
        "EventsTable: no events available. Pass a component module with `export const propsMetadata`, or a `data` hash.",
      );
    }
  });
</script>

{#if resolvedEvents.length}
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
        {#each resolvedEvents as event (event.name)}
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
{/if}

<style lang="postcss">
  @reference "../../twintrinsic.css";

  .events-table {
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

  .event-name {
    @apply whitespace-nowrap font-medium;
  }

  .event-type {
    @apply whitespace-nowrap text-muted;
  }

  .event-description {
    @apply text-sm text-text;
  }

  code {
    @apply px-1.5 py-0.5 text-xs font-mono rounded bg-surface;
  }
</style>
