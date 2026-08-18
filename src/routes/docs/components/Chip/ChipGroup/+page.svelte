<script lang="ts">
import Chip from "$lib/components/Chip/Chip.svelte"
import ChipGroup from "$lib/components/Chip/ChipGroup.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as ChipGroupModule from "$lib/components/Chip/ChipGroup.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>ChipGroup</h1>

  <p>
    The ChipGroup component is a container for managing multiple Chip components.
    It provides consistent spacing, layout options, selection state, and accessibility
    features like listbox semantics for selectable groups.
  </p>

  <h2>Examples</h2>

  <h3>Basic Chip Group</h3>
  <div class="not-prose mb-8" data-testid="chip-group-basic">
    <ChipGroup>
      <Chip>JavaScript</Chip>
      <Chip>TypeScript</Chip>
      <Chip>Svelte</Chip>
      <Chip>React</Chip>
    </ChipGroup>
  </div>

  <CodeBlock language="svelte">{`<ChipGroup>
  <Chip>JavaScript</Chip>
  <Chip>TypeScript</Chip>
  <Chip>Svelte</Chip>
  <Chip>React</Chip>
</ChipGroup>`}</CodeBlock>

  <h3>Chip Group with Dynamic Items</h3>
  <p>
    A custom <code>itemTemplate</code> snippet owns each Chip entirely, so
    interactive props like <code>clickable</code> and <code>removable</code>
    are applied on the Chip inside the snippet (contrast with the
    selectable example below, which uses the default fallback).
  </p>
  <div class="not-prose mb-8" data-testid="chip-group-dynamic">
    <ChipGroup items={["Design", "Engineering", "Product", "Marketing"]}>
      {#snippet itemTemplate(item: string)}
        <Chip variant="primary" clickable removable>{item}</Chip>
      {/snippet}
    </ChipGroup>
  </div>

  <CodeBlock language="svelte">{`<ChipGroup
  items={['Design', 'Engineering', 'Product', 'Marketing']}
  onremove={(e) => handleRemove(e.detail)}
>
  {#snippet itemTemplate(item)}
    <Chip variant="primary" clickable removable>{item}</Chip>
  {/snippet}
</ChipGroup>`}</CodeBlock>

  <h3>Dynamic Items Reflecting Selection</h3>
  <p>
    The <code>itemTemplate</code> snippet receives a third argument — a
    boolean reflecting whether that item is currently selected in the group
    (kept in sync with the controlled <code>selected</code> prop). Pass it
    straight to the Chip's <code>selected</code> prop to reflect selection
    without tracking it yourself. This example is display-only — the group is
    not <code>selectable</code>, so clicking the chips does nothing. Wire your
    own click handling (or use the fallback) for interaction:
  </p>
  <div class="not-prose mb-8" data-testid="chip-group-dynamic-selected">
    <ChipGroup items={["React", "Svelte", "Vue"]} selected={["React", "Vue"]}>
      {#snippet itemTemplate(item: string, index: number, selected: boolean)}
        <Chip clickable selected={selected}>{item}</Chip>
      {/snippet}
    </ChipGroup>
  </div>

  <CodeBlock language="svelte">{`<ChipGroup
  items={['React', 'Svelte', 'Vue']}
  selected={['React', 'Vue']}
>
  {#snippet itemTemplate(item, index, selected)}
    <Chip clickable selected={selected}>{item}</Chip>
  {/snippet}
</ChipGroup>`}</CodeBlock>

  <h3>Selectable Chip Group</h3>
  <p>
    With no <code>itemTemplate</code>, ChipGroup renders the default fallback
    and wires selection automatically (<code>selectable</code> makes chips
    clickable and tracks the selected state).
  </p>
  <div class="not-prose mb-8" data-testid="chip-group-selectable">
    <ChipGroup items={["Starter", "Pro", "Enterprise"]} selectable multiple>
    </ChipGroup>
  </div>

  <CodeBlock language="svelte">{`<ChipGroup
  items={['Starter', 'Pro', 'Enterprise']}
  selectable
  multiple
  onselect={(e) => handleSelect(e.detail.selected)}
>
</ChipGroup>`}</CodeBlock>

  <p>
    When using a custom <code>itemTemplate</code>, interactive props such as
    <code>clickable</code>, <code>selected</code>, and <code>removable</code>
    are <em>not</em> applied automatically — the snippet owns the Chip entirely,
    so apply them on the Chip inside the snippet.
  </p>

  <h2>ChipGroup Props</h2>
  <PropsTable component={ChipGroupModule} />

  <h2>ChipGroup Events</h2>
  <EventsTable component={ChipGroupModule} />

  <h2>Accessibility</h2>
  <p>
    The ChipGroup component follows accessibility best practices:
  </p>
  <ul>
    <li>Uses <code>role="listbox"</code> with <code>aria-multiselectable</code> for selectable groups</li>
    <li>Uses <code>role="group"</code> with an <code>aria-label</code> for static groups</li>
    <li>Supports keyboard navigation on interactive chips (Enter/Space to activate)</li>
    <li>Remove buttons have an appropriate <code>aria-label</code> for screen readers</li>
  </ul>
</Container>
