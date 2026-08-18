<!--
@component
Documentation page for the RadioGroup component.
-->
<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Radio from "$lib/components/Form/Radio.svelte"
import RadioGroup from "$lib/components/Form/RadioGroup.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as RadioGroupModule from "$lib/components/Form/RadioGroup.svelte"
</script>

<h1>RadioGroup</h1>

<p>
  The RadioGroup component provides a way to group related radio buttons with consistent styling,
  accessibility features, and form integration. It supports both horizontal and vertical layouts,
  different sizes, and integrates seamlessly with the Form component.
</p>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<div class="example" data-testid="radiogroup-basic">
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
<div class="example" data-testid="radiogroup-horizontal">
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
<div class="example" data-testid="radiogroup-initial">
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
</CodeBlock>  <h3>Different Sizes</h3>
<div class="example" data-testid="radiogroup-sizes">
  <div class="flex flex-col gap-6">
    <RadioGroup name="size-sm" legend="Small" size="sm" layout="horizontal">
      <Radio value="free" label="Free" />
      <Radio value="pro" label="Pro" />
      <Radio value="enterprise" label="Enterprise" />
    </RadioGroup>
    
    <RadioGroup name="size-md" legend="Medium" size="md" layout="horizontal">
      <Radio value="free" label="Free" />
      <Radio value="pro" label="Pro" />
      <Radio value="enterprise" label="Enterprise" />
    </RadioGroup>
    
    <RadioGroup name="size-lg" legend="Large" size="lg" layout="horizontal">
      <Radio value="free" label="Free" />
      <Radio value="pro" label="Pro" />
      <Radio value="enterprise" label="Enterprise" />
    </RadioGroup>
  </div>
</div>
<CodeBlock>
  {`<RadioGroup name="size-sm" legend="Small" size="sm" layout="horizontal">
  <Radio value="free" label="Free" />
  <Radio value="pro" label="Pro" />
  <Radio value="enterprise" label="Enterprise" />
</RadioGroup>

<RadioGroup name="size-md" legend="Medium" size="md" layout="horizontal">
  <Radio value="free" label="Free" />
  <Radio value="pro" label="Pro" />
  <Radio value="enterprise" label="Enterprise" />
</RadioGroup>

<RadioGroup name="size-lg" legend="Large" size="lg" layout="horizontal">
  <Radio value="free" label="Free" />
  <Radio value="pro" label="Pro" />
  <Radio value="enterprise" label="Enterprise" />
</RadioGroup>`}
</CodeBlock>  <h3>Disabled State</h3>
<div class="example" data-testid="radiogroup-disabled">
  <RadioGroup name="disabled-group" legend="Unavailable options" disabled={true}>
    <Radio value="basic" label="Basic" />
    <Radio value="plus" label="Plus" />
    <Radio value="premium" label="Premium" />
  </RadioGroup>
</div>
<CodeBlock>
  {`<RadioGroup name="disabled-group" legend="Unavailable options" disabled={true}>
  <Radio value="basic" label="Basic" />
  <Radio value="plus" label="Plus" />
  <Radio value="premium" label="Premium" />
</RadioGroup>`}
</CodeBlock>

<h2>Props</h2>
<PropsTable component={RadioGroupModule} />

<h2>Events</h2>
<EventsTable component={RadioGroupModule} />

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

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
  .example {
    @apply my-4 p-4 border border-border rounded-md;
    @apply flex flex-col gap-4 max-w-md;
  }
</style>
