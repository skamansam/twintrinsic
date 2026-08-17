<!--
@component
Combobox documentation page
-->
<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Combobox from "$lib/components/Form/Combobox.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as ComboboxModule from "$lib/components/Form/Combobox.svelte"

// Sample data for examples
const fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape", "Honeydew"]

const countries = [
  { name: "United States", code: "US", flag: "🇺🇸" },
  { name: "Canada", code: "CA", flag: "🇨🇦" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
  { name: "Germany", code: "DE", flag: "🇩🇪" },
  { name: "France", code: "FR", flag: "🇫🇷" },
]
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Combobox</h1>
  
  <p>
    The Combobox component combines a text input with a dropdown list, providing autocomplete 
    functionality with keyboard navigation and accessibility features. It's ideal for selecting 
    from a large list of options with search capability.
  </p>

  <h2>Examples</h2>

  <h3>Basic Combobox</h3>
  <div class="not-prose mb-8 max-w-md" data-testid="combobox-basic">
    <Combobox 
      options={fruits}
      placeholder="Select a fruit"
    />
  </div>

  <CodeBlock language="svelte">{`<Combobox 
  options={['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']}
  placeholder="Select a fruit"
  onchange={(e) => console.log(e.detail.value)}
/>`}</CodeBlock>

  <h3>With Object Data</h3>
  <div class="not-prose mb-8 max-w-md" data-testid="combobox-object">
    <Combobox 
      options={countries}
      optionLabel="name"
      optionValue="code"
      placeholder="Select a country"
    />
  </div>

  <CodeBlock language="svelte">{`<Combobox 
  options={countries}
  optionLabel="name"
  optionValue="code"
  placeholder="Select a country"
  onchange={(e) => console.log(e.detail.value)}
/>`}</CodeBlock>

  <h3>Custom Option Template</h3>
  <div class="not-prose mb-8 max-w-md" data-testid="combobox-template">
    <Combobox 
      options={countries}
      optionLabel="name"
      optionValue="code"
      placeholder="Select a country"
    >
      {#snippet optionTemplate(option: { flag: string; name: string; code: string })}
        <div class="flex items-center">
          <span class="mr-2 text-lg">{option.flag}</span>
          <span>{option.name}</span>
          <span class="ml-2 text-xs text-muted">({option.code})</span>
        </div>
      {/snippet}
    </Combobox>
  </div>

  <CodeBlock language="svelte">{`<Combobox 
  options={countries}
  optionLabel="name"
  optionValue="code"
  placeholder="Select a country">
      {#snippet optionTemplate(option: { flag: string; name: string; code: string })}
        <div class="flex items-center">
          <span class="mr-2 text-lg">{option.flag}</span>
          <span>{option.name}</span>
          <span class="ml-2 text-xs text-muted">({option.code})</span>
        </div>
      {/snippet}
    </Combobox>`}</CodeBlock>

  <h3>Disabled State</h3>
  <div class="not-prose mb-8 max-w-md" data-testid="combobox-disabled">
    <Combobox 
      options={fruits}
      placeholder="Select a fruit"
      disabled
    />
  </div>

  <CodeBlock language="svelte">{`<Combobox 
  options={fruits}
  placeholder="Select a fruit"
  disabled
/>`}</CodeBlock>

  <h3>Loading State</h3>
  <div class="not-prose mb-8 max-w-md" data-testid="combobox-loading">
    <Combobox 
      options={[]}
      placeholder="Loading options..."
      loading
    />
  </div>

  <CodeBlock language="svelte">{`<Combobox 
  options={[]}
  placeholder="Loading options..."
  loading
/>`}</CodeBlock>

  <h3>With Initial Value</h3>
  <div class="not-prose mb-8 max-w-md" data-testid="combobox-initial">
    <Combobox 
      options={fruits}
      placeholder="Select a fruit"
      value="Banana"
    />
  </div>

  <CodeBlock language="svelte">{`<Combobox 
  options={fruits}
  placeholder="Select a fruit"
  value="Banana"
/>`}</CodeBlock>

  <h3>Form Integration</h3>
  <div class="not-prose mb-8 max-w-md" data-testid="combobox-form">
    <div>
      <label for="fruit-select" class="block text-sm font-medium mb-1">Favorite Fruit</label>
      <Combobox 
        id="fruit-select"
        name="fruit"
        options={fruits}
        placeholder="Select a fruit"
        required
      />
    </div>
  </div>

  <CodeBlock language="svelte">{`<div>
  <label for="fruit-select" class="block text-sm font-medium mb-1">Favorite Fruit</label>
  <Combobox 
    id="fruit-select"
    name="fruit"
    options={fruits}
    placeholder="Select a fruit"
    required
  />
</div>`}</CodeBlock>

  <h2>Props</h2>
<PropsTable component={ComboboxModule} />

  <h2>Events</h2>
<EventsTable component={ComboboxModule} />

  <h2>Slots</h2>
  <table>
    <thead>
      <tr>
        <th>Slot</th>
        <th>Props</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>default</td>
        <td><code>{`{ option }`}</code></td>
        <td>Custom template for option items</td>
      </tr>
    </tbody>
  </table>

  <h2>Accessibility</h2>
  <p>
    The Combobox component follows WAI-ARIA guidelines for comboboxes:
  </p>
  <ul>
    <li>Uses <code>role="combobox"</code> for the input element</li>
    <li>Uses <code>role="listbox"</code> for the dropdown</li>
    <li>Uses <code>role="option"</code> for each option</li>
    <li>Proper <code>aria-expanded</code>, <code>aria-controls</code>, <code>aria-activedescendant</code>, and <code>aria-selected</code> attributes</li>
    <li>Supports keyboard navigation</li>
    <li>Provides proper focus management</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead>
      <tr>
        <th>Key</th>
        <th>Function</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><kbd>Tab</kbd></td>
        <td>Moves focus to the combobox</td>
      </tr>
      <tr>
        <td><kbd>Enter</kbd></td>
        <td>When dropdown is open, selects the highlighted option</td>
      </tr>
      <tr>
        <td><kbd>Escape</kbd></td>
        <td>Closes the dropdown</td>
      </tr>
      <tr>
        <td><kbd>ArrowDown</kbd></td>
        <td>Opens the dropdown if closed, or moves highlight to the next option</td>
      </tr>
      <tr>
        <td><kbd>ArrowUp</kbd></td>
        <td>Opens the dropdown if closed, or moves highlight to the previous option</td>
      </tr>
    </tbody>
  </table>
</Container>
