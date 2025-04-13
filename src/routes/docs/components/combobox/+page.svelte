<!--
@component
Combobox documentation page
-->
<script>
import Container from "$lib/components/Container/Container.svelte"
import Combobox from "$lib/components/Form/Combobox.svelte"

// Sample data for examples
const fruits = [
  "Apple", 
  "Banana", 
  "Cherry", 
  "Date", 
  "Elderberry", 
  "Fig", 
  "Grape", 
  "Honeydew"
];

const countries = [
  { name: "United States", code: "US", flag: "🇺🇸" },
  { name: "Canada", code: "CA", flag: "🇨🇦" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
  { name: "Germany", code: "DE", flag: "🇩🇪" },
  { name: "France", code: "FR", flag: "🇫🇷" }
];
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
  <div class="not-prose mb-8 max-w-md">
    <Combobox 
      options={fruits}
      placeholder="Select a fruit"
    />
  </div>

  <pre class="language-svelte"><code>{`<Combobox 
  options={['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']}
  placeholder="Select a fruit"
  on:change={(e) => console.log(e.detail.value)}
/>`}</code></pre>

  <h3>With Object Data</h3>
  <div class="not-prose mb-8 max-w-md">
    <Combobox 
      options={countries}
      optionLabel="name"
      optionValue="code"
      placeholder="Select a country"
    />
  </div>

  <pre class="language-svelte"><code>{`<Combobox 
  options={countries}
  optionLabel="name"
  optionValue="code"
  placeholder="Select a country"
  on:change={(e) => console.log(e.detail.value)}
/>`}</code></pre>

  <h3>Custom Option Template</h3>
  <div class="not-prose mb-8 max-w-md">
    <Combobox 
      options={countries}
      optionLabel="name"
      optionValue="code"
      placeholder="Select a country"
      let:option
    >
      <div class="flex items-center">
        <span class="mr-2 text-lg">{option.flag}</span>
        <span>{option.name}</span>
        <span class="ml-2 text-xs text-muted">({option.code})</span>
      </div>
    </Combobox>
  </div>

  <pre class="language-svelte"><code>{`<Combobox 
  options={countries}
  optionLabel="name"
  optionValue="code"
  placeholder="Select a country"
  let:option
>
  <div class="flex items-center">
    <span class="mr-2 text-lg">{option.flag}</span>
    <span>{option.name}</span>
    <span class="ml-2 text-xs text-muted">({option.code})</span>
  </div>
</Combobox>`}</code></pre>

  <h3>Disabled State</h3>
  <div class="not-prose mb-8 max-w-md">
    <Combobox 
      options={fruits}
      placeholder="Select a fruit"
      disabled
    />
  </div>

  <pre class="language-svelte"><code>{`<Combobox 
  options={fruits}
  placeholder="Select a fruit"
  disabled
/>`}</code></pre>

  <h3>Loading State</h3>
  <div class="not-prose mb-8 max-w-md">
    <Combobox 
      options={[]}
      placeholder="Loading options..."
      loading
    />
  </div>

  <pre class="language-svelte"><code>{`<Combobox 
  options={[]}
  placeholder="Loading options..."
  loading
/>`}</code></pre>

  <h3>With Initial Value</h3>
  <div class="not-prose mb-8 max-w-md">
    <Combobox 
      options={fruits}
      placeholder="Select a fruit"
      value="Banana"
    />
  </div>

  <pre class="language-svelte"><code>{`<Combobox 
  options={fruits}
  placeholder="Select a fruit"
  value="Banana"
/>`}</code></pre>

  <h3>Form Integration</h3>
  <div class="not-prose mb-8 max-w-md space-y-4">
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

  <pre class="language-svelte"><code>{`<div>
  <label for="fruit-select" class="block text-sm font-medium mb-1">Favorite Fruit</label>
  <Combobox 
    id="fruit-select"
    name="fruit"
    options={fruits}
    placeholder="Select a fruit"
    required
  />
</div>`}</code></pre>

  <h2>Props</h2>
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
        <td><code>options</code></td>
        <td><code>Array</code></td>
        <td><code>[]</code></td>
        <td>Options to display in the dropdown</td>
      </tr>
      <tr>
        <td><code>value</code></td>
        <td><code>any</code></td>
        <td><code>null</code></td>
        <td>Current value</td>
      </tr>
      <tr>
        <td><code>placeholder</code></td>
        <td><code>string</code></td>
        <td><code>"Select an option"</code></td>
        <td>Placeholder text</td>
      </tr>
      <tr>
        <td><code>optionLabel</code></td>
        <td><code>string</code></td>
        <td><code>"label"</code></td>
        <td>Property name for option labels</td>
      </tr>
      <tr>
        <td><code>optionValue</code></td>
        <td><code>string</code></td>
        <td><code>"value"</code></td>
        <td>Property name for option values</td>
      </tr>
      <tr>
        <td><code>disabled</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the combobox is disabled</td>
      </tr>
      <tr>
        <td><code>readonly</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the combobox is readonly</td>
      </tr>
      <tr>
        <td><code>required</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the combobox is required</td>
      </tr>
      <tr>
        <td><code>searchable</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to allow searching</td>
      </tr>
      <tr>
        <td><code>clearable</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to allow clearing the selection</td>
      </tr>
      <tr>
        <td><code>loading</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to show a loading indicator</td>
      </tr>
      <tr>
        <td><code>autoSelect</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to automatically select the first option</td>
      </tr>
      <tr>
        <td><code>openOnFocus</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to open the dropdown on focus</td>
      </tr>
      <tr>
        <td><code>maxHeight</code></td>
        <td><code>number</code></td>
        <td><code>250</code></td>
        <td>Maximum height of the dropdown in pixels</td>
      </tr>
      <tr>
        <td><code>ariaLabel</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>ARIA label for the combobox</td>
      </tr>
      <tr>
        <td><code>filter</code></td>
        <td><code>Function</code></td>
        <td><code>undefined</code></td>
        <td>Custom filter function</td>
      </tr>
      <tr>
        <td><code>name</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Name attribute for the input</td>
      </tr>
      <tr>
        <td><code>id</code></td>
        <td><code>string</code></td>
        <td><code>random UUID</code></td>
        <td>HTML id for accessibility</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes</td>
      </tr>
    </tbody>
  </table>

  <h2>Events</h2>
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
        <td><code>change</code></td>
        <td><code>{`{ value: any, option: any }`}</code></td>
        <td>Fired when the selection changes</td>
      </tr>
      <tr>
        <td><code>input</code></td>
        <td><code>{`{ value: any, option: any }`}</code></td>
        <td>Fired when the input value changes</td>
      </tr>
    </tbody>
  </table>

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
