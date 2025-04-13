<!--
@component
Documentation page for the Knob component.
-->
<script>
import { Knob, FormField, CodeBlock } from "$lib/index.js"
import { PropsTable, EventsTable } from "$lib/docs/index.js"
</script>

<h1>Knob</h1>

<p>
  The Knob component provides a circular slider for selecting numeric values.
  It offers an intuitive interface with drag interaction, keyboard controls,
  and customizable appearance.
</p>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<div class="example">
  <Knob 
    name="volume" 
    value={50} 
    min={0} 
    max={100} 
  />
</div>
<CodeBlock>
  {`<Knob 
  name="volume" 
  value={50} 
  min={0} 
  max={100} 
/>`}
</CodeBlock>

<h3>With Value Display</h3>
<div class="example">
  <Knob 
    name="progress" 
    value={75} 
    showValue={true}
    valueTemplate="{value}%" 
  />
</div>
<CodeBlock>
  {`<Knob 
  name="progress" 
  value={75} 
  showValue={true}
  valueTemplate="{value}%" 
/>`}
</CodeBlock>

<h3>Different Sizes</h3>
<div class="example">
  <div class="flex items-center gap-8">
    <div class="flex flex-col items-center">
      <span class="text-sm mb-2">Small</span>
      <Knob 
        size="sm"
        value={25}
      />
    </div>
    <div class="flex flex-col items-center">
      <span class="text-sm mb-2">Medium (default)</span>
      <Knob 
        size="md"
        value={50}
      />
    </div>
    <div class="flex flex-col items-center">
      <span class="text-sm mb-2">Large</span>
      <Knob 
        size="lg"
        value={75}
      />
    </div>
  </div>
</div>
<CodeBlock>
  {`<Knob size="sm" value={25} />
<Knob size="md" value={50} />
<Knob size="lg" value={75} />`}
</CodeBlock>

<h3>Custom Color</h3>
<div class="example">
  <div class="flex items-center gap-8">
    <Knob 
      value={60}
      color="var(--color-success-500)"
    />
    <Knob 
      value={40}
      color="var(--color-warning-500)"
    />
    <Knob 
      value={20}
      color="var(--color-error-500)"
    />
  </div>
</div>
<CodeBlock>
  {`<Knob 
  value={60}
  color="var(--color-success-500)"
/>
<Knob 
  value={40}
  color="var(--color-warning-500)"
/>
<Knob 
  value={20}
  color="var(--color-error-500)"
/>`}
</CodeBlock>

<h3>With Tick Marks</h3>
<div class="example">
  <Knob 
    value={30}
    showTicks={true}
    tickCount={12}
  />
</div>
<CodeBlock>
  {`<Knob 
  value={30}
  showTicks={true}
  tickCount={12}
/>`}
</CodeBlock>

<h3>Custom Thickness</h3>
<div class="example">
  <div class="flex items-center gap-8">
    <Knob 
      value={50}
      thickness={2}
    />
    <Knob 
      value={50}
      thickness={6}
    />
    <Knob 
      value={50}
      thickness={10}
    />
  </div>
</div>
<CodeBlock>
  {`<Knob value={50} thickness={2} />
<Knob value={50} thickness={6} />
<Knob value={50} thickness={10} />`}
</CodeBlock>

<h3>Disabled State</h3>
<div class="example">
  <Knob 
    value={65}
    disabled={true}
  />
</div>
<CodeBlock>
  {`<Knob 
  value={65}
  disabled={true}
/>`}
</CodeBlock>

<h3>With Form Field</h3>
<div class="example">
  <FormField label="Temperature">
    <Knob 
      name="temperature" 
      value={22} 
      min={15} 
      max={30} 
      step={0.5} 
      showValue={true}
      valueTemplate="{value}°C"
    />
  </FormField>
</div>
<CodeBlock>
  {`<FormField label="Temperature">
  <Knob 
    name="temperature" 
    value={22} 
    min={15} 
    max={30} 
    step={0.5} 
    showValue={true}
    valueTemplate="{value}°C"
  />
</FormField>`}
</CodeBlock>

<h2>Props</h2>
<PropsTable
  props={[
    {
      name: 'name',
      type: 'string',
      description: 'Input name for form submission'
    },
    {
      name: 'value',
      type: 'number',
      default: '0',
      description: 'Current value'
    },
    {
      name: 'min',
      type: 'number',
      default: '0',
      description: 'Minimum value'
    },
    {
      name: 'max',
      type: 'number',
      default: '100',
      description: 'Maximum value'
    },
    {
      name: 'step',
      type: 'number',
      default: '1',
      description: 'Step increment'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg' | 'xl'",
      default: "'md'",
      description: 'Size of the knob'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the knob is disabled'
    },
    {
      name: 'showValue',
      type: 'boolean',
      default: 'false',
      description: 'Whether to show the current value in the center'
    },
    {
      name: 'valueTemplate',
      type: 'string',
      default: "'{value}'",
      description: 'Template for displaying the value, use {value} as placeholder'
    },
    {
      name: 'color',
      type: 'string',
      description: 'Color of the progress arc (CSS color value)'
    },
    {
      name: 'thickness',
      type: 'number',
      default: '4',
      description: 'Thickness of the progress arc (1-10)'
    },
    {
      name: 'showTicks',
      type: 'boolean',
      default: 'false',
      description: 'Whether to show tick marks'
    },
    {
      name: 'tickCount',
      type: 'number',
      default: '10',
      description: 'Number of tick marks to display'
    },
    {
      name: 'ariaLabel',
      type: 'string',
      description: 'ARIA label for accessibility'
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
      name: 'input',
      type: '{ value: number }',
      description: 'Fired when the value changes during interaction'
    },
    {
      name: 'change',
      type: '{ value: number }',
      description: 'Fired when interaction ends (mouseup/touchend)'
    }
  ]}
/>

<h2>Accessibility</h2>
<p>
  The Knob component follows accessibility best practices:
</p>
<ul>
  <li>Uses <code>role="slider"</code> for proper semantics</li>
  <li>Includes <code>aria-valuemin</code>, <code>aria-valuemax</code>, and <code>aria-valuenow</code> attributes</li>
  <li>Provides keyboard navigation with arrow keys</li>
  <li>Supports focus states with visible indicators</li>
  <li>Includes proper disabled states</li>
  <li>Uses ARIA labels for better screen reader support</li>
</ul>

<h2>Keyboard Interaction</h2>
<ul>
  <li><code>Tab</code> - Move focus to the knob</li>
  <li><code>ArrowUp</code>/<code>ArrowRight</code> - Increase value</li>
  <li><code>ArrowDown</code>/<code>ArrowLeft</code> - Decrease value</li>
  <li><code>Home</code> - Set to minimum value</li>
  <li><code>End</code> - Set to maximum value</li>
</ul>

<h2>Form Integration</h2>
<p>
  The Knob component integrates with the Form component for validation and submission:
</p>
<CodeBlock>
  {`<Form onSubmit={handleSubmit}>
  <FormField label="Volume">
    <Knob 
      name="volume" 
      value={50} 
      min={0} 
      max={100} 
      showValue={true}
      valueTemplate="{value}%"
    />
  </FormField>
  
  <Button type="submit">Save Settings</Button>
</Form>`}
</CodeBlock>

<style>
  @reference '$lib/twintrinsic.css';
  .example {
    @apply my-4 p-4 border border-border rounded-md;
    @apply flex flex-col items-center justify-center;
  }
</style>
