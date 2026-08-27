<!--
@component
ListInput documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Container from "$lib/components/Container/Container.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import FormField from "$lib/components/Form/FormField.svelte"
import ListInput from "$lib/components/Form/ListInput.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as ListInputModule from "$lib/components/Form/ListInput.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>ListInput</h1>

  <p>
    <strong>ListInput</strong> manages a list of values rendered as removable chips
    with a text input. Users type a value and press Enter/Tab/comma to add it to the list.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A text input that converts typed values into discrete, removable chip elements.
    Supports validation, disabled state, and form integration.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;ListInput&gt;</code> when users need to enter multiple short values:
    tags, email recipients, skills, keywords. For selecting from a predefined list,
    use <code>&lt;Listbox&gt;</code>.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Discrete values</strong> — each value is a separate, removable chip.</li>
    <li><strong>Validation</strong> — reject invalid values before adding them.</li>
    <li><strong>Keyboard friendly</strong> — Enter/Tab/comma to add, Backspace to remove.</li>
  </ul>

  
<h2>Twintrinsic Implementation</h2>
<ul>
    <li>Maintains a list of values (tags, chips, tokens)</li>
    <li>Enter/comma adds a new item, Backspace removes the last</li>
    <li>Each tag has a Remove button with `aria-label=&quot;Remove [value]&quot;`</li>
    <li>`role=&quot;list&quot;` on the container, `role=&quot;listitem&quot;` on each tag</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't use a comma-separated text field — discrete items are more accessible</li>
    <li>Don't forget `aria-label` on remove buttons</li>
</ul>

<h2>Related Components</h2>
<p>Chip, Tag, Input, AutoComplete</p>

<h2>Responsiveness</h2>
  <ul>
    <li>Fills container width; chips wrap to the next line when space runs out.</li>
    <li>Touch targets meet 44×44 px minimum.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li>Validation via <code>validator</code> function.</li>
    <li>Error message via <code>errorMessage</code>.</li>
    <li>Wrap with <code>&lt;FormField&gt;</code> for labels.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Usage</h3>
  <ExampleTabs code={`<ListInput name="tags" ariaLabel="Add a tag" placeholder="Type and press Enter..." values={['svelte', 'typescript']} />`}>
    <div class="max-w-md" data-testid="list-input-basic">
      <ListInput name="tags" ariaLabel="Add a tag" placeholder="Type and press Enter..." values={["svelte", "typescript"]} />
    </div>
  </ExampleTabs>

  <h3>With Validation</h3>
  <ExampleTabs code={`<ListInput
  name="emails"
  ariaLabel="Add an email"
  placeholder="Type an email and press Enter..."
  values={['ada@example.com']}
  validator={(value) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)}
  errorMessage="Please enter a valid email address"
/>`}>
    <div class="max-w-md" data-testid="list-input-validated">
      <ListInput name="emails" ariaLabel="Add an email" placeholder="Type an email and press Enter..." values={["ada@example.com"]}
        validator={(value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)} errorMessage="Please enter a valid email address" />
    </div>
  </ExampleTabs>

  <h3>Disabled</h3>
  <ExampleTabs code={`<ListInput name="readonly" ariaLabel="Readonly tags" values={['locked', 'frozen']} disabled />`}>
    <div class="max-w-md" data-testid="list-input-disabled">
      <ListInput name="readonly" ariaLabel="Readonly tags" values={["locked", "frozen"]} disabled />
    </div>
  </ExampleTabs>

  <h3>With FormField</h3>
  <ExampleTabs code={`<FormField label="Tags">
  <ListInput name="tags" placeholder="Add a tag" />
</FormField>`}>
    <div data-testid="list-input-formfield">
      <FormField label="Tags">
        <ListInput name="tags" placeholder="Add a tag" />
      </FormField>
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={ListInputModule} />

  <h2>Events</h2>
  <EventsTable component={ListInputModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Each chip is a <code>role="button"</code> with descriptive <code>aria-label</code>.</li>
    <li>Text field has accessible name via <code>ariaLabel</code>.</li>
    <li>Validation errors use <code>role="alert"</code>.</li>
    <li>Full keyboard: Enter/Tab/comma to add, Backspace to remove, arrows to navigate chips.</li>
  </ul>
</Container>
