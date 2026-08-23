<!--
@component
ProgressMetric documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as ProgressMetricModule from "$lib/components/Metrics/ProgressMetric/ProgressMetric.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>ProgressMetric</h1>

  <p>
    <strong>ProgressMetric</strong> — A horizontal progress bar component for displaying progress towards a goal. Ideal for tracking completion, resource usage, or linear progress.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>A horizontal progress bar component for displaying progress towards a goal. Ideal for tracking completion, resource usage, or linear progress.</p>

  <h3>When should I use it?</h3>
  <p>Use ProgressMetric for linear progress tracking: CPU usage, disk space, task completion. For circular progress, use GaugeChart. For step-based progress, use Stepper.</p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Linear display</strong> — intuitive progress visualization.</li>
    <li><strong>Customizable</strong> — colors, height, percentage.</li>
    <li><strong>Accessible</strong> — ARIA progressbar role.</li>
    <li><strong>Responsive</strong> — adapts to container width.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress">MDN — progress element</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/meter/">WAI-ARIA APG — Meter</a></li>
    <li><a href="https://ant.design/components/progress">Ant Design — Progress</a></li>
    <li><a href="https://primer.style/components/progress">Primer — ProgressBar</a></li>
    <li><a href="https://m3.material.io/components/progress-indicators/overview">Material Design 3 — Linear Progress</a></li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Fills container width by default.</li>
    <li>SVG charts scale to any resolution.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li>Custom colors, labels, and sizes.</li>
    <li>Grid lines, legends, and axis labels.</li>
  </ul>

  <h2>Examples</h2>
  
  <ExampleTabs code={`<ProgressMetric label="CPU Usage" value={65} max={100}
  color="primary" showPercentage={true} />`}>
    <div class="flex justify-center" data-testid="metrics-progressmetric-basic">
      <!-- Live demo -->
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={ProgressMetricModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>SVG elements include proper ARIA roles and labels.</li>
    <li>Color contrast meets WCAG AA standards.</li>
    <li>Legend provides text alternative to colors.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <p>
    Chart components are display-only elements. Interactive data points support
    focus via Tab and activation via Enter/Space.
  </p>
</Container>
