<!--
@component
Progress documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Progress from "$lib/components/Progress/Progress.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as ProgressModule from "$lib/components/Progress/Progress.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Progress</h1>

  <p>
    <strong>Progress</strong> displays a progress bar using the native HTML
    <code>&lt;progress&gt;</code> element. It provides consistent styling, accessibility
    features, and various display options for showing progress towards a goal.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A progress indicator built on the native <code>&lt;progress&gt;</code> element. It
    communicates the completion status of a task, upload, or multi-step process. Supports
    determinate (known percentage) and indeterminate (unknown duration) modes.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;Progress&gt;</code> when you can quantify completion (file upload at 72%,
    form 3 of 5 steps). For unknown-duration operations (searching, loading), use
    <code>indeterminate</code>. For page-load placeholders, use <code>&lt;Skeleton&gt;</code>.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Native <code>&lt;progress&gt;</code></strong> — built-in <code>role="progressbar"</code> with <code>aria-valuenow</code>/<code>aria-valuemin</code>/<code>aria-valuemax</code>.</li>
    <li><strong>Variants</strong> — semantic colors (success, warning, error) convey status.</li>
    <li><strong>Indeterminate mode</strong> — CSS-animated bar for unknown-duration tasks.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress">MDN — &lt;progress&gt; element</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/meter/">WAI-ARIA APG — Meter</a></li>
    <li><a href="https://m3.material.io/components/progress-indicators/overview">Material Design 3 — Linear progress</a></li>
    <li><a href="https://primer.style/components/progress">Primer — ProgressBar</a></li>
    <li><a href="https://ant.design/components/progress">Ant Design — Progress</a></li>
  </ul>

  
<h2>Twintrinsic Implementation</h2>
<ul>
    <li>Native `&lt;progress&gt;` element with `aria-valuenow/min/max`</li>
    <li>CSS styling for track and fill with `accent-color`</li>
    <li>Indeterminate mode via CSS animation (no `value` attribute)</li>
    <li>`&lt;meter&gt;` for scalar measurements within a range</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't use `&lt;div&gt;` with width animation — `&lt;progress&gt;` is semantic and accessible</li>
    <li>Don't confuse `&lt;progress&gt;` (task completion) with `&lt;meter&gt;` (scalar measurement)</li>
</ul>

<h2>Related Components</h2>
<p>Skeleton, Metrics, NumberInput</p>

<h2>Responsiveness</h2>
  <ul>
    <li>Fills container width by default; works in narrow or wide layouts.</li>
    <li>Size variants (sm, md, lg) adjust height for different contexts.</li>
    <li>Value label reflows naturally within the container.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li>Variants: <code>primary</code>, <code>success</code>, <code>warning</code>, <code>error</code>, <code>info</code>, <code>default</code>.</li>
    <li>Sizes: <code>sm</code>, <code>md</code>, <code>lg</code>.</li>
    <li>Striped and animated stripe patterns for visual emphasis.</li>
    <li>Custom <code>format</code> function for value display.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Progress</h3>
  <ExampleTabs code={`<Progress value={75} />`}>
    <div data-testid="progress-basic">
      <Progress value={75} />
    </div>
  </ExampleTabs>

  <h3>With Value Display</h3>
  <ExampleTabs code={`<Progress value={42} showValue />`}>
    <div data-testid="progress-with-value">
      <Progress value={42} showValue />
    </div>
  </ExampleTabs>

  <h3>Variants</h3>
  <ExampleTabs code={`<Progress value={60} variant="primary" />
<Progress value={80} variant="success" />
<Progress value={50} variant="warning" />
<Progress value={30} variant="error" />`}>
    <div class="space-y-4" data-testid="progress-variants">
      <div>
        <p class="text-sm font-medium mb-2">Primary</p>
        <Progress value={60} variant="primary" />
      </div>
      <div>
        <p class="text-sm font-medium mb-2">Success</p>
        <Progress value={80} variant="success" />
      </div>
      <div>
        <p class="text-sm font-medium mb-2">Warning</p>
        <Progress value={50} variant="warning" />
      </div>
      <div>
        <p class="text-sm font-medium mb-2">Error</p>
        <Progress value={30} variant="error" />
      </div>
    </div>
  </ExampleTabs>

  <h3>Sizes</h3>
  <ExampleTabs code={`<Progress value={70} size="sm" />
<Progress value={70} size="md" />
<Progress value={70} size="lg" />`}>
    <div class="space-y-4" data-testid="progress-sizes">
      <div>
        <p class="text-sm font-medium mb-2">Small</p>
        <Progress value={70} size="sm" />
      </div>
      <div>
        <p class="text-sm font-medium mb-2">Medium</p>
        <Progress value={70} size="md" />
      </div>
      <div>
        <p class="text-sm font-medium mb-2">Large</p>
        <Progress value={70} size="lg" />
      </div>
    </div>
  </ExampleTabs>

  <h3>Striped &amp; Animated</h3>
  <ExampleTabs code={`<Progress value={65} striped />
<Progress value={65} striped animated />`}>
    <div class="space-y-4" data-testid="progress-striped">
      <Progress value={65} striped />
      <Progress value={65} striped animated />
    </div>
  </ExampleTabs>

  <h3>Indeterminate</h3>
  <ExampleTabs code={`<Progress indeterminate />`}>
    <div data-testid="progress-indeterminate">
      <Progress indeterminate />
    </div>
  </ExampleTabs>

  <h3>Custom Format</h3>
  <ExampleTabs code={`<Progress
  value={0.8}
  max={1}
  showValue
  format={(v) => \`\${Math.round(v * 100)}%\`}
/>`}>
    <div data-testid="progress-custom-format">
      <Progress
        value={0.8}
        max={1}
        showValue
        format={(v: number) => `${Math.round(v * 100)}%`}
      />
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={ProgressModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Uses native <code>&lt;progress&gt;</code> element with implicit <code>role="progressbar"</code>.</li>
    <li>Supports <code>aria-valuenow</code>, <code>aria-valuemin</code>, and <code>aria-valuemax</code> attributes.</li>
    <li>Includes <code>aria-label</code> for descriptive text.</li>
    <li>Announces progress updates to screen readers.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <p>
    The Progress component is a static display element and does not require keyboard
    interaction. It communicates state to assistive technology via ARIA attributes.
  </p>
</Container>
