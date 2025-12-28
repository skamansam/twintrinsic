<!--
@component
Documentation page for the Rating component.
-->
<script lang="ts">
import { Rating, CodeBlock } from "$lib/index.js"
import { PropsTable, EventsTable } from "$lib/docs/index.js"
</script>

<h1>Rating</h1>

<p>
  The Rating component provides an interactive way for users to provide ratings using stars or custom icons.
  It supports various configurations including half-star ratings, custom sizes, and different visual styles.
</p>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<div class="example">
  <Rating value={3} />
</div>
<CodeBlock>
  {`<Rating value={3} />`}
</CodeBlock>

<h3>Half-Star Ratings</h3>
<div class="example">
  <Rating 
    value={3.5} 
    precision={0.5}
  />
</div>
<CodeBlock>
  {`<Rating 
  value={3.5} 
  precision={0.5}
/>`}
</CodeBlock>

<h3>Different Sizes</h3>
<div class="example">
  <div class="flex flex-col gap-4">
    <div class="flex items-center">
      <span class="w-20">Small:</span>
      <Rating value={4} size="sm" />
    </div>
    <div class="flex items-center">
      <span class="w-20">Medium:</span>
      <Rating value={4} size="md" />
    </div>
    <div class="flex items-center">
      <span class="w-20">Large:</span>
      <Rating value={4} size="lg" />
    </div>
  </div>
</div>
<CodeBlock>
  {`<Rating value={4} size="sm" />
<Rating value={4} size="md" />
<Rating value={4} size="lg" />`}
</CodeBlock>

<h3>Color Variants</h3>
<div class="example">
  <div class="flex flex-col gap-4">
    <div class="flex items-center">
      <span class="w-20">Default:</span>
      <Rating value={4} variant="default" />
    </div>
    <div class="flex items-center">
      <span class="w-20">Primary:</span>
      <Rating value={4} variant="primary" />
    </div>
    <div class="flex items-center">
      <span class="w-20">Secondary:</span>
      <Rating value={4} variant="secondary" />
    </div>
    <div class="flex items-center">
      <span class="w-20">Success:</span>
      <Rating value={4} variant="success" />
    </div>
    <div class="flex items-center">
      <span class="w-20">Warning:</span>
      <Rating value={4} variant="warning" />
    </div>
    <div class="flex items-center">
      <span class="w-20">Error:</span>
      <Rating value={4} variant="error" />
    </div>
    <div class="flex items-center">
      <span class="w-20">Info:</span>
      <Rating value={4} variant="info" />
    </div>
  </div>
</div>
<CodeBlock>
  {`<Rating value={4} variant="default" />
<Rating value={4} variant="primary" />
<Rating value={4} variant="secondary" />
<Rating value={4} variant="success" />
<Rating value={4} variant="warning" />
<Rating value={4} variant="error" />
<Rating value={4} variant="info" />`}
</CodeBlock>

<h3>Read-only and Disabled States</h3>
<div class="example">
  <div class="flex flex-col gap-4">
    <div class="flex items-center">
      <span class="w-20">Read-only:</span>
      <Rating value={3.5} readonly={true} />
    </div>
    <div class="flex items-center">
      <span class="w-20">Disabled:</span>
      <Rating value={3.5} disabled={true} />
    </div>
  </div>
</div>
<CodeBlock>
  {`<Rating value={3.5} readonly={true} />
<Rating value={3.5} disabled={true} />`}
</CodeBlock>

<h3>With Value Display</h3>
<div class="example">
  <Rating value={4} showValue={true} />
</div>
<CodeBlock>
  {`<Rating value={4} showValue={true} />`}
</CodeBlock>

<h3>Custom Maximum</h3>
<div class="example">
  <Rating value={7} max={10} />
</div>
<CodeBlock>
  {`<Rating value={7} max={10} />`}
</CodeBlock>

<h2>Props</h2>
<PropsTable
  props={[
    {
      name: 'value',
      type: 'number',
      default: '0',
      description: 'Current rating value'
    },
    {
      name: 'max',
      type: 'number',
      default: '5',
      description: 'Maximum rating value'
    },
    {
      name: 'precision',
      type: 'number',
      default: '1',
      description: 'Step size for ratings (0.5 for half stars, 1 for whole stars)'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Size of the rating icons'
    },
    {
      name: 'variant',
      type: "'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'",
      default: "'warning'",
      description: 'Visual style variant'
    },
    {
      name: 'readonly',
      type: 'boolean',
      default: 'false',
      description: 'Whether the rating is readonly'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the rating is disabled'
    },
    {
      name: 'showValue',
      type: 'boolean',
      default: 'false',
      description: 'Whether to show the numeric value'
    },
    {
      name: 'icon',
      type: 'string',
      description: 'Custom icon for filled state (HTML or SVG string)'
    },
    {
      name: 'emptyIcon',
      type: 'string',
      description: 'Custom icon for empty state (HTML or SVG string)'
    },
    {
      name: 'name',
      type: 'string',
      description: 'Name attribute for form submission'
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Rating'",
      description: 'ARIA label for accessibility'
    },
    {
      name: 'class',
      type: 'string',
      default: "''",
      description: 'Additional CSS classes'
    },
    {
      name: 'id',
      type: 'string',
      default: 'auto-generated',
      description: 'HTML id for accessibility'
    }
  ]}
/>

<h2>Events</h2>
<EventsTable
  events={[
    {
      name: 'change',
      type: '{ value: number }',
      description: 'Fired when the rating value changes'
    }
  ]}
/>

<h2>Accessibility</h2>
<p>
  The Rating component follows accessibility best practices:
</p>
<ul>
  <li>Uses appropriate ARIA attributes (<code>role="slider"</code> for interactive ratings)</li>
  <li>Provides <code>aria-valuemin</code>, <code>aria-valuemax</code>, and <code>aria-valuenow</code> for screen readers</li>
  <li>Supports keyboard navigation for selecting ratings</li>
  <li>Proper focus states with visible indicators</li>
  <li>Descriptive <code>aria-valuetext</code> (e.g., "4 out of 5")</li>
  <li>Proper disabled and readonly states</li>
</ul>

<h2>Keyboard Interaction</h2>
<ul>
  <li><code>Tab</code> - Focus the rating component</li>
  <li><code>ArrowRight/ArrowUp</code> - Increase rating by precision step</li>
  <li><code>ArrowLeft/ArrowDown</code> - Decrease rating by precision step</li>
  <li><code>Home</code> - Set to minimum value (precision)</li>
  <li><code>End</code> - Set to maximum value</li>
</ul>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
  .example {
    @apply my-4 p-4 border border-border rounded-md;
    @apply flex flex-col gap-4 max-w-md;
  }
</style>
