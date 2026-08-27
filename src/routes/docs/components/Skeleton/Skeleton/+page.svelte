<!--
@component
Skeleton documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Skeleton from "$lib/components/Skeleton/Skeleton.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as SkeletonModule from "$lib/components/Skeleton/Skeleton.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Skeleton</h1>

  <p>
    <strong>Skeleton</strong> displays loading placeholders while content is being fetched.
    It provides various shapes and sizes to match different content types and includes
    smooth CSS-native animations via <code>@starting-style</code>.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A placeholder component that mimics the shape of the content it replaces during loading.
    It uses a shimmer animation to signal that content is incoming, giving users a visual
    indication of layout structure before real data arrives.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;Skeleton&gt;</code> when content is loading asynchronously and you want
    to preserve layout stability (no content shift). Combine multiple skeletons to match
    the shape of cards, lists, or articles. For known-duration operations, use
    <code>&lt;Progress&gt;</code> instead.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Layout stability</strong> — prevents content shift (CLS) during loading.</li>
    <li><strong>Perceived performance</strong> — users see structure instead of blank space.</li>
    <li><strong>CSS-native animations</strong> — shimmer via <code>@starting-style</code> and CSS keyframes, no JS.</li>
    <li><strong>Rendering performance</strong> — <code>content-visibility: auto</code> for off-screen skeletons.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/Performance/Cumulative_layout_shift">MDN — CLS</a></li>
    <li><a href="https://m3.material.io/components/skeleton/overview">Material Design 3 — Skeleton</a></li>
    <li><a href="https://primer.style/components/skeleton-loader">Primer — SkeletonLoader</a></li>
    <li><a href="https://ant.design/components/skeleton">Ant Design — Skeleton</a></li>
    <li><a href="https://web.dev/articles/content-visibility">web.dev — content-visibility</a></li>
  </ul>

  
<h2>Twintrinsic Implementation</h2>
<ul>
    <li>CSS `@keyframes` shimmer animation with `@property` for gradient angle</li>
    <li>`@starting-style` for smooth entry animation</li>
    <li>`content-visibility: auto` for off-screen skeleton performance</li>
    <li>`aria-busy=&quot;true&quot;` and `aria-live=&quot;polite&quot;` on the loading region</li>
    <li>`transition-behavior: allow-discrete` for exit when content loads</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't use spinners for layout-heavy content — skeletons show structure</li>
    <li>Don't forget `aria-busy=&quot;true&quot;` — screen readers need loading state</li>
</ul>

<h2>Related Components</h2>
<p>Progress, Lazy, Toast</p>

<h2>Responsiveness</h2>
  <ul>
    <li>Width defaults to <code>100%</code>, filling its container.</li>
    <li>Circle variant uses a fixed <code>size</code> prop (48px default).</li>
    <li>Text variant auto-wraps to container width.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li>Variants: <code>text</code>, <code>rectangle</code>, <code>circle</code>, <code>rounded</code>.</li>
    <li>Custom width, height, and border radius.</li>
    <li>Multi-line text via <code>lines</code> prop.</li>
    <li>Disable animation with <code>animated={false}</code>.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Skeleton</h3>
  <ExampleTabs code={`<Skeleton width="100%" height="20px" />`}>
    <div data-testid="skeleton-basic">
      <Skeleton width="100%" height="20px" />
    </div>
  </ExampleTabs>

  <h3>Variants</h3>
  <ExampleTabs code={`<Skeleton variant="rectangle" width="100%" height="100px" />
<Skeleton variant="circle" size="48px" />
<Skeleton variant="rounded" width="100%" height="60px" />
<Skeleton variant="text" width="100%" />`}>
    <div class="space-y-4" data-testid="skeleton-variants">
      <div>
        <p class="text-sm text-muted mb-2">Rectangle (default)</p>
        <Skeleton variant="rectangle" width="100%" height="100px" />
      </div>
      <div>
        <p class="text-sm text-muted mb-2">Circle</p>
        <Skeleton variant="circle" size="48px" />
      </div>
      <div>
        <p class="text-sm text-muted mb-2">Rounded</p>
        <Skeleton variant="rounded" width="100%" height="60px" />
      </div>
      <div>
        <p class="text-sm text-muted mb-2">Text</p>
        <Skeleton variant="text" width="100%" />
      </div>
    </div>
  </ExampleTabs>

  <h3>Multi-Line Text</h3>
  <ExampleTabs code={`<Skeleton variant="text" lines={3} />`}>
    <div data-testid="skeleton-multi-line">
      <Skeleton variant="text" lines={3} />
    </div>
  </ExampleTabs>

  <h3>Loading Pattern (Card)</h3>
  <ExampleTabs code={`<div class="flex gap-4">
  <Skeleton variant="circle" size="48px" />
  <div class="flex-1">
    <Skeleton variant="text" width="60%" />
    <Skeleton variant="text" width="80%" />
  </div>
</div>`}>
    <div class="flex gap-4" data-testid="skeleton-loading-pattern">
      <Skeleton variant="circle" size="48px" />
      <div class="flex-1">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="80%" />
      </div>
    </div>
  </ExampleTabs>

  <h3>Static (No Animation)</h3>
  <ExampleTabs code={`<Skeleton width="100%" height="20px" animated={false} />`}>
    <div data-testid="skeleton-static">
      <Skeleton width="100%" height="20px" animated={false} />
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={SkeletonModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Uses <code>role="status"</code> to announce loading state to screen readers.</li>
    <li>Includes <code>aria-label</code> to describe what is loading.</li>
    <li>Provides visually hidden text for screen reader users.</li>
    <li>Skeleton elements are marked with <code>aria-hidden="true"</code> when appropriate.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <p>
    The Skeleton component is a static display element and does not require keyboard
    interaction. It communicates loading state to assistive technology via ARIA attributes.
  </p>
</Container>
