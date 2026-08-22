<!--
@component
TextInput documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Container from "$lib/components/Container/Container.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import TextInput from "$lib/components/Form/TextInput.svelte"
import * as TextInputModule from "$lib/components/Form/TextInput.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>TextInput</h1>

  <p>
    <strong>TextInput</strong> is a styled single-line text input with support for
    icons, clearable values, sizing, and form integration. It forwards standard
    attributes to the native <code>&lt;input&gt;</code> element.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A styled wrapper around <code>&lt;input&gt;</code> that adds start/end icons,
    a clear button, and size variants while preserving all native input behavior.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;TextInput&gt;</code> for any single-line text field. For more
    features (floating labels, masks), use <code>&lt;Input&gt;</code>. For
    multi-line, use <code>&lt;Textarea&gt;</code>.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Simplicity</strong> — lightweight input with just the essentials.</li>
    <li><strong>Icons</strong> — start/end icons for search, password toggle, etc.</li>
    <li><strong>Clearable</strong> — one-click clear button for search fields.</li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Fills container width by default.</li>
    <li>Touch targets meet 44×44 px minimum.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li>All standard <code>&lt;input&gt;</code> types and attributes.</li>
    <li>Sizes: <code>sm</code>, <code>md</code>, <code>lg</code>.</li>
    <li>Start/end icons via <code>startIcon</code>/<code>endIcon</code> props.</li>
    <li>Clearable via <code>clearable</code> prop.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Usage</h3>
  <ExampleTabs code={`<TextInput name="username" placeholder="Enter your username" />`}>
    <div class="max-w-md" data-testid="textinput-basic"><TextInput name="username" placeholder="Enter your username" /></div>
  </ExampleTabs>

  <h3>With Icons</h3>
  <ExampleTabs code={`<TextInput name="search" placeholder="Search..." startIcon="tabler:search" />
<TextInput name="password" type="password" placeholder="Password" endIcon="tabler:eye" />`}>
    <div class="max-w-md flex flex-col gap-4" data-testid="textinput-icons">
      <TextInput name="search" placeholder="Search..." />
      <TextInput name="password" type="password" placeholder="Password" />
    </div>
  </ExampleTabs>

  <h3>Clearable</h3>
  <ExampleTabs code={`<TextInput name="search" placeholder="Type then clear..." clearable />`}>
    <div class="max-w-md" data-testid="textinput-clearable"><TextInput name="search" placeholder="Type then clear..." clearable /></div>
  </ExampleTabs>

  <h3>Different Sizes</h3>
  <ExampleTabs code={`<TextInput name="small" size="sm" placeholder="Small" />
<TextInput name="medium" size="md" placeholder="Medium (default)" />
<TextInput name="large" size="lg" placeholder="Large" />`}>
    <div class="max-w-md flex flex-col gap-4" data-testid="textinput-sizes">
      <TextInput name="small" size="sm" placeholder="Small" />
      <TextInput name="medium" size="md" placeholder="Medium (default)" />
      <TextInput name="large" size="lg" placeholder="Large" />
    </div>
  </ExampleTabs>

  <h3>Disabled</h3>
  <ExampleTabs code={`<TextInput name="disabled" value="Cannot edit" disabled />`}>
    <div class="max-w-md" data-testid="textinput-disabled"><TextInput name="disabled" value="Cannot edit" disabled /></div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={TextInputModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Renders a native <code>&lt;input&gt;</code> for maximum compatibility.</li>
    <li>Clear button is labeled and keyboard-reachable.</li>
    <li>Supports <code>aria-label</code> and forwards ARIA attributes.</li>
  </ul>
</Container>
