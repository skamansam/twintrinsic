<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import TextInput from "$lib/components/Form/TextInput.svelte"
import * as TextInputModule from "$lib/components/Form/TextInput.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>TextInput</h1>

  <p>
    The TextInput component is a styled text input with support for various
    input types, icons, clearable values, sizing, and form integration. It
    forwards standard attributes to the native <code>&lt;input&gt;</code>.
  </p>

  <h2>Usage</h2>

  <h3>Basic Usage</h3>
  <div class="not-prose border border-border rounded-md p-4 mb-4 max-w-md" data-testid="textinput-basic">
    <TextInput name="username" placeholder="Enter your username" />
  </div>

  <CodeBlock language="svelte">{`<TextInput
  name="username"
  placeholder="Enter your username"
/>`}</CodeBlock>

  <h3>With Initial Value</h3>
  <div class="not-prose border border-border rounded-md p-4 mb-4 max-w-md" data-testid="textinput-value">
    <TextInput name="email" type="email" value="john@example.com" />
  </div>

  <CodeBlock language="svelte">{`<TextInput
  name="email"
  type="email"
  value="john@example.com"
/>`}</CodeBlock>

  <h3>With Icons</h3>
  <div class="not-prose border border-border rounded-md p-4 mb-4 max-w-md" data-testid="textinput-icons">
    <div class="flex flex-col gap-4">
      <TextInput
        name="search"
        placeholder="Search..."
        startIcon='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>'
      />
      <TextInput
        name="password"
        type="password"
        placeholder="Password"
        endIcon='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3-8a8 8 0 00-8 8 8 8 0 0016 0 8 8 0 00-8-8z"></path></svg>'
      />
    </div>
  </div>

  <CodeBlock language="svelte">{`<TextInput
  name="search"
  placeholder="Search..."
  startIcon='<svg ...>...</svg>'
/>

<TextInput
  name="password"
  type="password"
  placeholder="Password"
  endIcon='<svg ...>...</svg>'
/>`}</CodeBlock>

  <h3>Clearable</h3>
  <div class="not-prose border border-border rounded-md p-4 mb-4 max-w-md" data-testid="textinput-clearable">
    <TextInput name="search" placeholder="Type then clear..." clearable />
  </div>

  <CodeBlock language="svelte">{`<TextInput
  name="search"
  placeholder="Type then clear..."
  clearable
/>`}</CodeBlock>

  <h3>Different Sizes</h3>
  <div class="not-prose border border-border rounded-md p-4 mb-4 max-w-md" data-testid="textinput-sizes">
    <div class="flex flex-col gap-4">
      <TextInput name="small" size="sm" placeholder="Small" />
      <TextInput name="medium" size="md" placeholder="Medium (default)" />
      <TextInput name="large" size="lg" placeholder="Large" />
    </div>
  </div>

  <CodeBlock language="svelte">{`<TextInput name="small" size="sm" placeholder="Small" />
<TextInput name="medium" size="md" placeholder="Medium (default)" />
<TextInput name="large" size="lg" placeholder="Large" />`}</CodeBlock>

  <h3>Disabled State</h3>
  <div class="not-prose border border-border rounded-md p-4 mb-4 max-w-md" data-testid="textinput-disabled">
    <TextInput name="disabled" value="Cannot edit" disabled />
  </div>

  <CodeBlock language="svelte">{`<TextInput
  name="disabled"
  value="Cannot edit"
  disabled
/>`}</CodeBlock>

  <h2>Props</h2>
  <PropsTable component={TextInputModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Renders a native <code>&lt;input&gt;</code> for best compatibility</li>
    <li>Proper focus states with visible indicators</li>
    <li>Supports <code>aria-label</code> and forwards other ARIA attributes</li>
    <li>Clear button is labeled and keyboard-reachable</li>
    <li>Integrates with form validation</li>
  </ul>
</Container>
