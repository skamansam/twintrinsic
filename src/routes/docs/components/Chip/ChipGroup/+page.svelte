<script lang="ts">
import Chip from "$lib/components/Chip/Chip.svelte"
import ChipGroup from "$lib/components/Chip/ChipGroup.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
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
    <ChipGroup items={["Red", "Green", "Blue", "Yellow"]}>
      {#snippet itemTemplate(item: string)}
        <Chip variant="primary" clickable removable>{item}</Chip>
      {/snippet}
    </ChipGroup>
  </div>

  <CodeBlock language="svelte">{`<ChipGroup
  items={['Red', 'Green', 'Blue', 'Yellow']}
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
    <ChipGroup items={["Red", "Green", "Blue"]} selected={["Red", "Blue"]}>
      {#snippet itemTemplate(item: string, index: number, selected: boolean)}
        <Chip clickable selected={selected}>{item}</Chip>
      {/snippet}
    </ChipGroup>
  </div>

  <CodeBlock language="svelte">{`<ChipGroup
  items={['Red', 'Green', 'Blue']}
  selected={['Red', 'Blue']}
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
    <ChipGroup items={["Filter 1", "Filter 2", "Filter 3"]} selectable multiple>
    </ChipGroup>
  </div>

  <CodeBlock language="svelte">{`<ChipGroup
  items={['Filter 1', 'Filter 2', 'Filter 3']}
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
      <tr>
        <td><code>variant</code></td>
        <td><code>string</code></td>
        <td><code>"default"</code></td>
        <td>Visual style variant passed to all chips</td>
      </tr>
      <tr>
        <td><code>size</code></td>
        <td><code>string</code></td>
        <td><code>"md"</code></td>
        <td>Size passed to all chips (sm, md, lg)</td>
      </tr>
      <tr>
        <td><code>removable</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether all chips are removable</td>
      </tr>
      <tr>
        <td><code>clickable</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether all chips are clickable</td>
      </tr>
      <tr>
        <td><code>selectable</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether all chips are selectable (renders a listbox)</td>
      </tr>
      <tr>
        <td><code>multiple</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether multiple chips can be selected</td>
      </tr>
      <tr>
        <td><code>disabled</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether all chips are disabled</td>
      </tr>
      <tr>
        <td><code>outline</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether all chips use outline style</td>
      </tr>
      <tr>
        <td><code>direction</code></td>
        <td><code>string</code></td>
        <td><code>"horizontal"</code></td>
        <td>Direction of the chip group (horizontal, vertical)</td>
      </tr>
      <tr>
        <td><code>items</code></td>
        <td><code>(string \| Record&lt;string, unknown&gt;)[]</code></td>
        <td><code>[]</code></td>
        <td>Items to render as chips</td>
      </tr>
      <tr>
        <td><code>selected</code></td>
        <td><code>(string \| Record&lt;string, unknown&gt;)[]</code></td>
        <td><code>[]</code></td>
        <td>Controlled selected items</td>
      </tr>
      <tr>
        <td><code>labelField</code></td>
        <td><code>string</code></td>
        <td><code>"label"</code></td>
        <td>Field used to derive the label when <code>items</code> are objects</td>
      </tr>
      <tr>
        <td><code>itemTemplate</code></td>
        <td><code>Snippet&lt;[TItem, number, boolean]&gt;</code></td>
        <td><code>undefined</code></td>
        <td>Snippet rendered per item, receiving <code>(item, index, selected)</code> where <code>selected</code> reflects the group's current selection state</td>
      </tr>
      <tr>
        <td><code>ariaLabel</code></td>
        <td><code>string</code></td>
        <td><code>"Chip group"</code></td>
        <td>ARIA label for the chip group</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes</td>
      </tr>
      <tr>
        <td><code>id</code></td>
        <td><code>string</code></td>
        <td><code>crypto.randomUUID()</code></td>
        <td>HTML id for accessibility</td>
      </tr>
    </tbody>
  </table>

  <h2>ChipGroup Events</h2>
  <table>
    <thead>
      <tr>
        <th>Event</th>
        <th>Detail</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>select</code></td>
        <td><code>{`{ selected: TItem[] }`}</code></td>
        <td>Fired when a chip is selected or deselected</td>
      </tr>
      <tr>
        <td><code>remove</code></td>
        <td><code>{`{ item: TItem, index: number }`}</code></td>
        <td>Fired when a chip is removed, includes the item and its index</td>
      </tr>
    </tbody>
  </table>

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
