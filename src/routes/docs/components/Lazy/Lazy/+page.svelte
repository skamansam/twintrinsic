<!--
@component
Lazy documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Lazy from "$lib/components/Lazy/Lazy.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as LazyModule from "$lib/components/Lazy/Lazy.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Lazy</h1>

  <p>
    <strong>Lazy</strong> renders its content only once it scrolls into the viewport, using
    an <code>IntersectionObserver</code>. Use it to defer off-screen content and keep
    initial page loads fast.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A deferral wrapper that uses <code>IntersectionObserver</code> to mount content only
    when it becomes visible. Supports a placeholder snippet shown during the loading state.
    Falls back to immediate rendering when <code>IntersectionObserver</code> is unavailable.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;Lazy&gt;</code> for below-the-fold content: charts, heavy components, or
    anything that doesn't need to be in the initial paint. For panel-level lazy loading,
    use <code>&lt;LazyPanel&gt;</code>.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Performance</strong> — reduces initial page weight.</li>
    <li><strong>Scroll-triggered</strong> — content mounts when visible.</li>
    <li><strong>Graceful fallback</strong> — immediate render when observer is unavailable.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API">MDN — IntersectionObserver</a></li>
    <li><a href="https://web.dev/articles/content-visibility">web.dev — content-visibility</a></li>
    <li><a href="https://primer.style/components/blankslate">Primer — Blankslate</a></li>
    <li><a href="https://ant.design/components/skeleton">Ant Design — Skeleton</a></li>
    <li><a href="https://www.w3.org/TR/intersection-observer/">W3C — IntersectionObserver</a></li>
  </ul>

  
<h2>Twintrinsic Implementation</h2>
<ul>
    <li>Intersection Observer for viewport detection</li>
    <li>`&lt;img loading=&quot;lazy&quot;&gt;` for native image lazy loading</li>
    <li>`content-visibility: auto` for off-screen content skipping</li>
    <li>LazyPanel variant for tab panels</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't use JS timers for lazy loading — Intersection Observer is the standard</li>
    <li>Don't forget `content-visibility: auto` as a CSS-only alternative for simple cases</li>
</ul>

<h2>Related Components</h2>
<p>Skeleton, Card, Container</p>

<h2>Responsiveness</h2>
  <ul>
    <li>Fills container width by default.</li>
    <li>Placeholder content adapts to the container.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li><code>placeholder</code> snippet — content shown while loading.</li>
    <li>Custom <code>rootMargin</code> to start loading before the element is visible.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Lazy</h3>
  <ExampleTabs code={`<Lazy>
  <div class="p-8 bg-surface rounded-lg">
    <h3 class="font-medium">Monthly revenue chart</h3>
    <p class="mt-1 text-sm text-muted">Only rendered once it scrolls into view.</p>
  </div>
</Lazy>`}>
    <div class="border border-border rounded-md p-4" data-testid="lazy-basic">
      <Lazy>
        <div class="p-8 bg-surface rounded-lg">
          <h3 class="font-medium">Monthly revenue chart</h3>
          <p class="mt-1 text-sm text-muted">Only rendered once it scrolls into view.</p>
        </div>
      </Lazy>
    </div>
  </ExampleTabs>

  <h3>With Placeholder</h3>
  <ExampleTabs code={`<Lazy>
  {#snippet placeholder()}
    <p class="text-muted">Loading chart…</p>
  {/snippet}
  <div class="p-8 bg-surface rounded-lg">
    <h3 class="font-medium">Live analytics widget</h3>
    <p class="mt-1 text-sm text-muted">Deferred until visible.</p>
  </div>
</Lazy>`}>
    <div class="border border-border rounded-md p-4" data-testid="lazy-placeholder">
      <Lazy>
        {#snippet placeholder()}
          <p class="text-muted">Loading chart…</p>
        {/snippet}
        <div class="p-8 bg-surface rounded-lg">
          <h3 class="font-medium">Live analytics widget</h3>
          <p class="mt-1 text-sm text-muted">Deferred until visible to keep the page fast.</p>
        </div>
      </Lazy>
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={LazyModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Falls back to immediate rendering when <code>IntersectionObserver</code> is unavailable.</li>
    <li>Loading state exposes <code>aria-live="polite"</code> and <code>aria-busy</code>.</li>
    <li>Deferred content is only mounted when visible.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <p>
    Lazy is a behavior wrapper and does not require keyboard interaction.
    Deferred content maintains its native keyboard behavior once mounted.
  </p>
</Container>
