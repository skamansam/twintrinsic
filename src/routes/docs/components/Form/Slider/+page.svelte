<!--
@component
Slider documentation page
-->

<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Slider from "$lib/components/Form/Slider.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as SliderModule from "$lib/components/Form/Slider.svelte"
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

  <CodeBlock language="svelte">{`<Slider 
  value={50} 
  min={0} 
  max={100} 
  onchange={(e) => console.log(e.detail.value)}
/>`}</CodeBlock>

  <h3>Range Slider</h3>
  <div class="not-prose mb-8 max-w-xl">
    <Slider 
      value={80} 
      min={0} 
      max={100} 
    />
  </div>

  <CodeBlock language="svelte">{`<Slider 
  value={[20, 80]} 
  min={0} 
  max={100} 
  onchange={(e) => console.log(e.detail.value)}
/>`}</CodeBlock>

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

  <CodeBlock language="svelte">{`<Slider 
  value={50} 
  min={0} 
  max={100} 
  step={10}
  showTicks
  showValue
  onchange={(e) => console.log(e.detail.value)}
/>`}</CodeBlock>

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

  <CodeBlock language="svelte">{`<Slider 
  value={50} 
  min={0} 
  max={100} 
  tickValues={[0, 25, 50, 75, 100]}
  showTicks
  showValue
  onchange={(e) => console.log(e.detail.value)}
/>`}</CodeBlock>

  <h3>With Tooltip</h3>
  <div class="not-prose mb-8 max-w-xl">
    <Slider 
      value={50} 
      min={0} 
      max={100} 
      showTooltip
    />
  </div>

  <CodeBlock language="svelte">{`<Slider 
  value={50} 
  min={0} 
  max={100} 
  showTooltip
  onchange={(e) => console.log(e.detail.value)}
/>`}</CodeBlock>

  <h3>Custom Variants</h3>
  <div class="not-prose mb-8 max-w-xl space-y-6">
    <Slider value={30} min={0} max={100} variant="primary" />
    <Slider value={40} min={0} max={100} variant="secondary" />
    <Slider value={50} min={0} max={100} variant="success" />
    <Slider value={60} min={0} max={100} variant="warning" />
    <Slider value={70} min={0} max={100} variant="error" />
    <Slider value={80} min={0} max={100} variant="info" />
  </div>

  <CodeBlock language="svelte">{`<Slider value={30} min={0} max={100} variant="primary" />
<Slider value={40} min={0} max={100} variant="secondary" />
<Slider value={50} min={0} max={100} variant="success" />
<Slider value={60} min={0} max={100} variant="warning" />
<Slider value={70} min={0} max={100} variant="error" />
<Slider value={80} min={0} max={100} variant="info" />`}</CodeBlock>

  <h3>Vertical Orientation</h3>
  <div class="not-prose mb-8 max-w-xl flex items-center space-x-8 h-48">
    <Slider 
      value={50} 
      min={0} 
      max={100} 
      orientation="vertical"
    />
    <Slider 
      value={70} 
      min={0} 
      max={100} 
      orientation="vertical"
      showTicks
      showValue
    />
  </div>

  <CodeBlock language="svelte">{`<Slider 
  value={50} 
  min={0} 
  max={100} 
  orientation="vertical"
  onchange={(e) => console.log(e.detail.value)}
/>`}</CodeBlock>

  <h3>Disabled State</h3>
  <div class="not-prose mb-8 max-w-xl">
    <Slider 
      value={50} 
      min={0} 
      max={100} 
      disabled
    />
  </div>

  <CodeBlock language="svelte">{`<Slider 
  value={50} 
  min={0} 
  max={100} 
  disabled
/>`}</CodeBlock>

  <h3>Custom Value Format</h3>
  <div class="not-prose mb-8 max-w-xl">
    <Slider 
      value={50} 
      min={0} 
      max={100} 
      showValue
      valueFormat={"{value}%"}
    />
  </div>

  <CodeBlock language="svelte">{`<Slider 
  value={50} 
  min={0} 
  max={100} 
  showValue
  valueFormat="\${value}%"
  onchange={(e) => console.log(e.detail.value)}
/>`}</CodeBlock>

  <h2>Props</h2>
<PropsTable component={SliderModule} />

  <h2>Events</h2>
<EventsTable component={SliderModule} />

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

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
  
  .not-prose {
    @apply my-4 p-4 border border-border rounded-md;
  }
</style>
