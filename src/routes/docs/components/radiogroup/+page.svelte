<!--
@component
Documentation page for the RadioGroup component.
-->
<script lang="ts">
import { RadioGroup, Radio, CodeBlock } from "$lib/index.js"
import { PropsTable, EventsTable } from "$lib/docs/index.js"
</script>

<h1>RadioGroup</h1>

<p>
  The RadioGroup component provides a way to group related radio buttons with consistent styling,
  accessibility features, and form integration. It supports both horizontal and vertical layouts,
  different sizes, and integrates seamlessly with the Form component.
</p>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<div class="example">
  <RadioGroup name="theme" legend="Select theme">
    <Radio value="light" label="Light" />
    <Radio value="dark" label="Dark" />
    <Radio value="system" label="System" />
  </RadioGroup>
</div>
<CodeBlock>
  {`<RadioGroup name="theme" legend="Select theme">
  <Radio value="light" label="Light" />
  <Radio value="dark" label="Dark" />
  <Radio value="system" label="System" />
</RadioGroup>`}
</CodeBlock>

<h3>Horizontal Layout</h3>
<div class="example">
  <RadioGroup name="alignment" legend="Text alignment" layout="horizontal">
    <Radio value="left" label="Left" />
    <Radio value="center" label="Center" />
    <Radio value="right" label="Right" />
  </RadioGroup>
</div>
<CodeBlock>
  {`<RadioGroup name="alignment" legend="Text alignment" layout="horizontal">
  <Radio value="left" label="Left" />
  <Radio value="center" label="Center" />
  <Radio value="right" label="Right" />
</RadioGroup>`}
</CodeBlock>

<h3>With Initial Value</h3>
<div class="example">
  <RadioGroup name="size" legend="Size" value="md">
    <Radio value="sm" label="Small" />
    <Radio value="md" label="Medium" />
    <Radio value="lg" label="Large" />
  </RadioGroup>
</div>
<CodeBlock>
  {`<RadioGroup name="size" legend="Size" value="md">
  <Radio value="sm" label="Small" />
  <Radio value="md" label="Medium" />
  <Radio value="lg" label="Large" />
</RadioGroup>`}
</CodeBlock>

<h3>Different Sizes</h3>
<div class="example">
  <div class="flex flex-col gap-6">
    <RadioGroup name="size-sm" legend="Small" size="sm" layout="horizontal">
      <Radio value="1" label="Option 1" />
      <Radio value="2" label="Option 2" />
      <Radio value="3" label="Option 3" />
    </RadioGroup>
    
    <RadioGroup name="size-md" legend="Medium" size="md" layout="horizontal">
      <Radio value="1" label="Option 1" />
      <Radio value="2" label="Option 2" />
      <Radio value="3" label="Option 3" />
    </RadioGroup>
    
    <RadioGroup name="size-lg" legend="Large" size="lg" layout="horizontal">
      <Radio value="1" label="Option 1" />
      <Radio value="2" label="Option 2" />
      <Radio value="3" label="Option 3" />
    </RadioGroup>
  </div>
</div>
<CodeBlock>
  {`<RadioGroup name="size-sm" legend="Small" size="sm" layout="horizontal">
  <Radio value="1" label="Option 1" />
  <Radio value="2" label="Option 2" />
  <Radio value="3" label="Option 3" />
</RadioGroup>

<RadioGroup name="size-md" legend="Medium" size="md" layout="horizontal">
  <Radio value="1" label="Option 1" />
  <Radio value="2" label="Option 2" />
  <Radio value="3" label="Option 3" />
</RadioGroup>

<RadioGroup name="size-lg" legend="Large" size="lg" layout="horizontal">
  <Radio value="1" label="Option 1" />
  <Radio value="2" label="Option 2" />
  <Radio value="3" label="Option 3" />
</RadioGroup>`}
</CodeBlock>

<h3>Disabled State</h3>
<div class="example">
  <RadioGroup name="disabled-group" legend="Unavailable options" disabled={true}>
    <Radio value="1" label="Option 1" />
    <Radio value="2" label="Option 2" />
    <Radio value="3" label="Option 3" />
  </RadioGroup>
</div>
<CodeBlock>
  {`<RadioGroup name="disabled-group" legend="Unavailable options" disabled={true}>
  <Radio value="1" label="Option 1" />
  <Radio value="2" label="Option 2" />
  <Radio value="3" label="Option 3" />
</RadioGroup>`}
</CodeBlock>

<h2>Props</h2>
<PropsTable
  props={[
    {
      name: 'name',
      type: 'string',
      description: 'Name attribute for the radio group'
    },
    {
      name: 'value',
      type: 'string',
      default: "''",
      description: 'Currently selected value'
    },
    {
      name: 'legend',
      type: 'string',
      description: 'Legend text for the fieldset'
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Whether the radio group is required'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the radio group is disabled'
    },
    {
      name: 'layout',
      type: "'vertical' | 'horizontal'",
      default: "'vertical'",
      description: 'Layout direction of radio buttons'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Size of the radio buttons'
    },
    {
      name: 'id',
      type: 'string',
      default: 'auto-generated',
      description: 'HTML id for accessibility'
    },
    {
      name: 'class',
      type: 'string',
      default: "''",
      description: 'Additional CSS classes'
    }
  ]}
/>

<h2>Events</h2>
<EventsTable
  events={[
    {
      name: 'change',
      type: '{ value: string }',
      description: 'Fired when a radio button is selected'
    }
  ]}
/>

<h2>Accessibility</h2>
<p>
  The RadioGroup component follows WAI-ARIA guidelines for radio groups:
</p>
<ul>
  <li>Uses semantic <code>&lt;fieldset&gt;</code> and <code>&lt;legend&gt;</code> elements</li>
  <li>Proper grouping of related radio buttons</li>
  <li>Keyboard navigation between options</li>
  <li>Focus states with visible indicators</li>
  <li>Proper disabled states</li>
  <li>Integrates with form validation</li>
</ul>

<h2>Keyboard Interaction</h2>
<ul>
  <li><code>Tab</code> - Move focus to the radio group</li>
  <li><code>Space</code> - Select the focused radio button</li>
  <li><code>Arrow Up/Left</code> - Move to previous radio button in the group</li>
  <li><code>Arrow Down/Right</code> - Move to next radio button in the group</li>
</ul>

<style>
  @reference '$lib/twintrinsic.css';
  .example {
    @apply my-4 p-4 border border-border rounded-md;
    @apply flex flex-col gap-4 max-w-md;
  }
</style>
