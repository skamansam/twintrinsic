<!--
@component
Documentation page for the NumberInput component.
-->
<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import FormField from "$lib/components/Form/FormField.svelte"
import NumberInput from "$lib/components/Form/NumberInput.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as NumberInputModule from "$lib/components/Form/NumberInput.svelte"

// Sample values for examples
let quantity = $state(1)
let price = $state(29.99)
let percentage = $state(75)
let temperature = $state(22.5)
</script>

<h1>NumberInput</h1>

<p>
  The NumberInput component provides a specialized input for numeric values with formatting, 
  increment/decrement controls, and support for units. It ensures consistent styling, 
  accessibility features, and seamless integration with the Form component.
</p>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<div class="example" data-testid="numberinput-basic-usage">
  <NumberInput 
    name="quantity" 
    value={quantity} 
    min={0} 
    max={100} 
    step={1} 
  />
</div>
<CodeBlock>
  {`\u003Cscript>
  let quantity = 1
\u003C/script>

<NumberInput 
  name="quantity" 
  value={quantity} 
  min={0} 
  max={100} 
  step={1} 
/>`}
</CodeBlock>

<h3>With Currency Prefix</h3>
<div class="example" data-testid="numberinput-currency">
  <NumberInput 
    name="price" 
    value={price} 
    prefix="$" 
    decimalPlaces={2}
    min={0}
  />
</div>
<CodeBlock>
  {`\u003Cscript>
  let price = 29.99
\u003C/script>

<NumberInput 
  name="price" 
  value={price} 
  prefix="$" 
  decimalPlaces={2}
  min={0}
/>`}
</CodeBlock>

<h3>With Percentage Suffix</h3>
<div class="example" data-testid="numberinput-percentage">
  <NumberInput 
    name="percentage" 
    value={percentage} 
    suffix="%" 
    min={0}
    max={100}
  />
</div>
<CodeBlock>
  {`\u003Cscript>
  let percentage = 75
\u003C/script>

<NumberInput 
  name="percentage" 
  value={percentage} 
  suffix="%" 
  min={0}
  max={100}
/>`}
</CodeBlock>

<h3>With Vertical Buttons</h3>
<div class="example" data-testid="numberinput-vertical">
  <NumberInput 
    name="temperature" 
    value={temperature} 
    step={0.5} 
    decimalPlaces={1}
    suffix="°C"
    verticalButtons={true}
  />
</div>
<CodeBlock>
  {`\u003Cscript>
  let temperature = 22.5
\u003C/script>

<NumberInput 
  name="temperature" 
  value={temperature} 
  step={0.5} 
  decimalPlaces={1}
  suffix="°C"
  verticalButtons={true}
/>`}
</CodeBlock>

<h3>Different Sizes</h3>
<div class="example" data-testid="numberinput-sizes">
  <div class="flex flex-col gap-4">
    <NumberInput 
      name="small" 
      value={1} 
      size="sm"
      placeholder="Small"
    />
    
    <NumberInput 
      name="medium" 
      value={2} 
      size="md"
      placeholder="Medium (default)"
    />
    
    <NumberInput 
      name="large" 
      value={3} 
      size="lg"
      placeholder="Large"
    />
  </div>
</div>
<CodeBlock>
  {`<NumberInput 
  name="small" 
  value={1} 
  size="sm"
  placeholder="Small"
/>

<NumberInput 
  name="medium" 
  value={2} 
  size="md"
  placeholder="Medium (default)"
/>

<NumberInput 
  name="large" 
  value={3} 
  size="lg"
  placeholder="Large"
/>`}
</CodeBlock>

<h3>Without Buttons</h3>
<div class="example" data-testid="numberinput-no-buttons">
  <NumberInput 
    name="noButtons" 
    value={50} 
    showButtons={false}
    placeholder="Enter a number"
  />
</div>
<CodeBlock>
  {`<NumberInput 
  name="noButtons" 
  value={50} 
  showButtons={false}
  placeholder="Enter a number"
/>`}
</CodeBlock>

<h3>With Form Field</h3>
<div class="example" data-testid="numberinput-formfield">
  <FormField label="Quantity" required={true}>
    <NumberInput 
      name="quantityRequired" 
      value={1} 
      min={1}
      required={true}
    />
  </FormField>
</div>
<CodeBlock>
  {`<FormField label="Quantity" required={true}>
  <NumberInput 
    name="quantityRequired" 
    value={1} 
    min={1}
    required={true}
  />
</FormField>`}
</CodeBlock>

<h3>Disabled State</h3>
<div class="example" data-testid="numberinput-disabled-state">
  <NumberInput 
    name="disabled" 
    value={10} 
    disabled={true}
  />
</div>
<CodeBlock>
  {`<NumberInput 
  name="disabled" 
  value={10} 
  disabled={true}
/>`}
</CodeBlock>

<h3>Readonly State</h3>
<div class="example" data-testid="numberinput-readonly">
  <NumberInput 
    name="readonly" 
    value={10} 
    readonly={true}
  />
</div>
<CodeBlock>
  {`<NumberInput 
  name="readonly" 
  value={10} 
  readonly={true}
/>`}
</CodeBlock>

<h2>Props</h2>
<PropsTable component={NumberInputModule} />

<h2>Events</h2>
<EventsTable component={NumberInputModule} />

<h2>Accessibility</h2>
<p>
  The NumberInput component follows accessibility best practices:
</p>
<ul>
  <li>Uses appropriate ARIA attributes (<code>aria-valuemin</code>, <code>aria-valuemax</code>, <code>aria-valuenow</code>)</li>
  <li>Provides clear visual indicators for focus, hover, and disabled states</li>
  <li>Supports keyboard navigation and operation</li>
  <li>Increment/decrement buttons have descriptive ARIA labels</li>
  <li>Respects user preferences for reduced motion</li>
</ul>

<h2>Keyboard Interaction</h2>
<ul>
  <li><code>Up Arrow</code> - Increment value by step amount</li>
  <li><code>Down Arrow</code> - Decrement value by step amount</li>
  <li><code>Home</code> - Set to minimum value (if specified)</li>
  <li><code>End</code> - Set to maximum value (if specified)</li>
</ul>

<h2>Form Integration</h2>
<p>
  The NumberInput component integrates with the Form component for validation and submission:
</p>
<CodeBlock>
  {`<Form onSubmit={handleSubmit}>
  <FormField label="Quantity">
    <NumberInput 
      name="quantity" 
      value={quantity} 
      min={1}
      required={true}
    />
  </FormField>
  
  <Button type="submit">Add to Cart</Button>
</Form>`}
</CodeBlock>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
  .example {
    @apply my-4 p-4 border border-border rounded-md;
    @apply flex flex-col gap-4 max-w-md;
  }
</style>
