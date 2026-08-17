<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import FormField from "$lib/components/Form/FormField.svelte"
import ListInput from "$lib/components/Form/ListInput.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as ListInputModule from "$lib/components/Form/ListInput.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>ListInput</h1>

  <p>
    The ListInput component manages a list of values rendered as chips with a
    single text field. Values are added by pressing <kbd>Enter</kbd>,
    <kbd>Tab</kbd>, or <kbd>,</kbd>, removed via the chip's remove button or
    <kbd>Backspace</kbd>, and can be validated as they are entered.
  </p>

  <h2>Examples</h2>

  <h3>Basic Usage</h3>
  <div class="not-prose mb-8 max-w-md" data-testid="list-input-basic">
    <ListInput
      name="tags"
      ariaLabel="Add a tag"
      placeholder="Type and press Enter..."
      values={["svelte", "typescript"]}
    />
  </div>

  <CodeBlock language="svelte">{`<ListInput
  name="tags"
  ariaLabel="Add a tag"
  placeholder="Type and press Enter..."
  values={['svelte', 'typescript']}
/>`}</CodeBlock>

  <h3>With Validation</h3>
  <p>
    Pass a <code>validator</code> to reject invalid values; the
    <code>errorMessage</code> is announced via <code>role="alert"</code>.
  </p>
  <div class="not-prose mb-8 max-w-md" data-testid="list-input-validated">
    <ListInput
      name="emails"
      ariaLabel="Add an email"
      placeholder="Type an email and press Enter..."
      values={["ada@example.com"]}
      validator={(value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)}
      errorMessage="Please enter a valid email address"
    />
  </div>

  <CodeBlock language="svelte">{`<ListInput
  name="emails"
  ariaLabel="Add an email"
  placeholder="Type an email and press Enter..."
  values={['ada@example.com']}
  validator={(value) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)}
  errorMessage="Please enter a valid email address"
/>`}</CodeBlock>

  <h3>Disabled</h3>
  <div class="not-prose mb-8 max-w-md" data-testid="list-input-disabled">
    <ListInput
      name="readonly"
      ariaLabel="Readonly tags"
      placeholder="Type and press Enter..."
      values={["locked", "frozen"]}
      disabled
    />
  </div>

  <CodeBlock language="svelte">{`<ListInput
  name="readonly"
  ariaLabel="Readonly tags"
  placeholder="Type and press Enter..."
  values={['locked', 'frozen']}
  disabled
/>`}</CodeBlock>

  <h3>With Form Field</h3>
  <div class="not-prose mb-8 max-w-md" data-testid="list-input-formfield">
    <FormField label="Recipients">
      <ListInput
        name="recipients"
        ariaLabel="Add a recipient"
        placeholder="Type an email and press Enter..."
      />
    </FormField>
  </div>

  <CodeBlock language="svelte">{`<FormField label="Recipients">
  <ListInput
    name="recipients"
    ariaLabel="Add a recipient"
    placeholder="Type an email and press Enter..."
  />
</FormField>`}</CodeBlock>

  <h2>ListInput Props</h2>
  <PropsTable component={ListInputModule} />

  <h2>ListInput Events</h2>
  <EventsTable component={ListInputModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Each chip is exposed as a <code>role="button"</code> with a descriptive <code>aria-label</code> and a focused remove button labeled "Remove &#123;value&#125;"</li>
    <li>The text field has an accessible name via <code>ariaLabel</code> (or <code>name</code>)</li>
    <li>Validation errors render in a <code>role="alert"</code> region</li>
    <li>Full keyboard support: Enter/Tab/comma to add, Backspace to remove, arrow keys to navigate chips, Escape to blur</li>
  </ul>
</Container>
