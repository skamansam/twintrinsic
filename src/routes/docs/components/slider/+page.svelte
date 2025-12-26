<!--
@component
Slider documentation page
-->

<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import Slider from "$lib/components/Form/Slider.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Slider</h1>
  
  <p>
    The Slider component allows users to select a value or range from a specified minimum and maximum.
    It supports various configurations including horizontal and vertical orientations, tick marks, tooltips,
    and different visual styles.
  </p>

  <h2>Examples</h2>

  <h3>Basic Slider</h3>
  <div class="not-prose mb-8 max-w-xl">
    <Slider value={50} min={0} max={100} />
  </div>

  <pre class="language-svelte"><code>{`<Slider 
  value={50} 
  min={0} 
  max={100} 
  onchange={(e) => console.log(e.detail.value)}
/>`}</code></pre>

  <h3>Range Slider</h3>
  <div class="not-prose mb-8 max-w-xl">
    <Slider 
      value={[20, 80]} 
      min={0} 
      max={100} 
    />
  </div>

  <pre class="language-svelte"><code>{`<Slider 
  value={[20, 80]} 
  min={0} 
  max={100} 
  onchange={(e) => console.log(e.detail.value)}
/>`}</code></pre>

  <h3>With Ticks and Values</h3>
  <div class="not-prose mb-8 max-w-xl">
    <Slider 
      value={50} 
      min={0} 
      max={100} 
      step={10}
      showTicks
      showValue
    />
  </div>

  <pre class="language-svelte"><code>{`<Slider 
  value={50} 
  min={0} 
  max={100} 
  step={10}
  showTicks
  showValue
  onchange={(e) => console.log(e.detail.value)}
/>`}</code></pre>

  <h3>Custom Tick Values</h3>
  <div class="not-prose mb-8 max-w-xl">
    <Slider 
      value={50} 
      min={0} 
      max={100} 
      tickValues={[0, 25, 50, 75, 100]}
      showTicks
      showValue
    />
  </div>

  <pre class="language-svelte"><code>{`<Slider 
  value={50} 
  min={0} 
  max={100} 
  tickValues={[0, 25, 50, 75, 100]}
  showTicks
  showValue
  onchange={(e) => console.log(e.detail.value)}
/>`}</code></pre>

  <h3>With Tooltip</h3>
  <div class="not-prose mb-8 max-w-xl">
    <Slider 
      value={50} 
      min={0} 
      max={100} 
      showTooltip
    />
  </div>

  <pre class="language-svelte"><code>{`<Slider 
  value={50} 
  min={0} 
  max={100} 
  showTooltip
  onchange={(e) => console.log(e.detail.value)}
/>`}</code></pre>

  <h3>Custom Variants</h3>
  <div class="not-prose mb-8 max-w-xl space-y-6">
    <Slider value={30} min={0} max={100} variant="primary" />
    <Slider value={40} min={0} max={100} variant="secondary" />
    <Slider value={50} min={0} max={100} variant="success" />
    <Slider value={60} min={0} max={100} variant="warning" />
    <Slider value={70} min={0} max={100} variant="error" />
    <Slider value={80} min={0} max={100} variant="info" />
  </div>

  <pre class="language-svelte"><code>{`<Slider value={30} min={0} max={100} variant="primary" />
<Slider value={40} min={0} max={100} variant="secondary" />
<Slider value={50} min={0} max={100} variant="success" />
<Slider value={60} min={0} max={100} variant="warning" />
<Slider value={70} min={0} max={100} variant="error" />
<Slider value={80} min={0} max={100} variant="info" />`}</code></pre>

  <h3>Vertical Orientation</h3>
  <div class="not-prose mb-8 max-w-xl flex items-center space-x-8 h-48">
    <Slider 
      value={50} 
      min={0} 
      max={100} 
      orientation="vertical"
    />
    <Slider 
      value={[30, 70]} 
      min={0} 
      max={100} 
      orientation="vertical"
      showTicks
      showValue
    />
  </div>

  <pre class="language-svelte"><code>{`<Slider 
  value={50} 
  min={0} 
  max={100} 
  orientation="vertical"
  onchange={(e) => console.log(e.detail.value)}
/>`}</code></pre>

  <h3>Disabled State</h3>
  <div class="not-prose mb-8 max-w-xl">
    <Slider 
      value={50} 
      min={0} 
      max={100} 
      disabled
    />
  </div>

  <pre class="language-svelte"><code>{`<Slider 
  value={50} 
  min={0} 
  max={100} 
  disabled
/>`}</code></pre>

  <h3>Custom Value Format</h3>
  <div class="not-prose mb-8 max-w-xl">
    <Slider 
      value={50} 
      min={0} 
      max={100} 
      showValue
      valueFormat="${value}%"
    />
  </div>

  <pre class="language-svelte"><code>{`<Slider 
  value={50} 
  min={0} 
  max={100} 
  showValue
  valueFormat="\${value}%"
  onchange={(e) => console.log(e.detail.value)}
/>`}</code></pre>

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
        <td><code>value</code></td>
        <td><code>number | Array</code></td>
        <td><code>0</code></td>
        <td>Current value or range [min, max]</td>
      </tr>
      <tr>
        <td><code>min</code></td>
        <td><code>number</code></td>
        <td><code>0</code></td>
        <td>Minimum value</td>
      </tr>
      <tr>
        <td><code>max</code></td>
        <td><code>number</code></td>
        <td><code>100</code></td>
        <td>Maximum value</td>
      </tr>
      <tr>
        <td><code>step</code></td>
        <td><code>number</code></td>
        <td><code>1</code></td>
        <td>Step size</td>
      </tr>
      <tr>
        <td><code>variant</code></td>
        <td><code>string</code></td>
        <td><code>"primary"</code></td>
        <td>Visual style variant (primary, secondary, success, warning, error, info)</td>
      </tr>
      <tr>
        <td><code>orientation</code></td>
        <td><code>string</code></td>
        <td><code>"horizontal"</code></td>
        <td>Orientation (horizontal, vertical)</td>
      </tr>
      <tr>
        <td><code>disabled</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the slider is disabled</td>
      </tr>
      <tr>
        <td><code>showTicks</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to show tick marks</td>
      </tr>
      <tr>
        <td><code>tickValues</code></td>
        <td><code>Array</code></td>
        <td><code>[]</code></td>
        <td>Custom tick values</td>
      </tr>
      <tr>
        <td><code>showValue</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to show the current value</td>
      </tr>
      <tr>
        <td><code>valueFormat</code></td>
        <td><code>string</code></td>
        <td><code>"{value}"</code></td>
        <td>Format for displayed value</td>
      </tr>
      <tr>
        <td><code>showTooltip</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to show tooltips on hover/drag</td>
      </tr>
      <tr>
        <td><code>name</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Name attribute for form submission</td>
      </tr>
      <tr>
        <td><code>ariaLabel</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>ARIA label for accessibility</td>
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
        <td><code>{`{ value: number | number[] }`}</code></td>
        <td>Fired when the slider value changes (on drag end)</td>
      </tr>
      <tr>
        <td><code>input</code></td>
        <td><code>{`{ value: number | number[] }`}</code></td>
        <td>Fired continuously during slider drag</td>
      </tr>
    </tbody>
  </table>

  <h2>Accessibility</h2>
  <p>
    The Slider component follows WAI-ARIA guidelines for sliders:
  </p>
  <ul>
    <li>Uses <code>role="slider"</code> for the thumb elements</li>
    <li>Provides appropriate <code>aria-valuemin</code>, <code>aria-valuemax</code>, and <code>aria-valuenow</code> attributes</li>
    <li>Includes <code>aria-orientation</code> to indicate slider orientation</li>
    <li>Supports keyboard navigation for precise value adjustment</li>
    <li>Visually indicates focus state with a focus ring</li>
    <li>Provides clear visual feedback during interaction</li>
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
        <td>Moves focus to the slider thumb</td>
      </tr>
      <tr>
        <td><kbd>Arrow Right</kbd> / <kbd>Arrow Up</kbd></td>
        <td>Increases the value by one step</td>
      </tr>
      <tr>
        <td><kbd>Arrow Left</kbd> / <kbd>Arrow Down</kbd></td>
        <td>Decreases the value by one step</td>
      </tr>
      <tr>
        <td><kbd>Page Up</kbd></td>
        <td>Increases the value by 10 steps</td>
      </tr>
      <tr>
        <td><kbd>Page Down</kbd></td>
        <td>Decreases the value by 10 steps</td>
      </tr>
      <tr>
        <td><kbd>Home</kbd></td>
        <td>Sets the value to the minimum</td>
      </tr>
      <tr>
        <td><kbd>End</kbd></td>
        <td>Sets the value to the maximum</td>
      </tr>
      <tr>
        <td><kbd>Shift</kbd> + <kbd>Arrow Keys</kbd></td>
        <td>Adjusts the value by 10 steps</td>
      </tr>
    </tbody>
  </table>
</Container>

<style>
  @reference '$lib/twintrinsic.css';
  
  .not-prose {
    @apply my-4 p-4 border border-border rounded-md;
  }
</style>
