<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Lazy from "$lib/components/Lazy/Lazy.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as LazyModule from "$lib/components/Lazy/Lazy.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Lazy</h1>

  <p>
    The Lazy component renders its content only once it scrolls into the
    viewport, using an <code>IntersectionObserver</code>. Use it to defer
    off-screen content and keep initial page loads fast.
  </p>

  <h2>Usage</h2>

  <h3>Basic</h3>
  <div class="not-prose border border-border rounded-md p-4 mb-4" data-testid="lazy-basic">
    <Lazy>
      <div class="p-8 bg-surface rounded-lg">
        <h3 class="font-medium">Monthly revenue chart</h3>
        <p class="mt-1 text-sm text-muted">Only rendered once it scrolls into view.</p>
      </div>
    </Lazy>
  </div>

  <CodeBlock language="svelte">{`<Lazy>
  <div class="p-8 bg-surface rounded-lg">
    <h3 class="font-medium">Monthly revenue chart</h3>
    <p class="mt-1 text-sm text-muted">Only rendered once it scrolls into view.</p>
  </div>
</Lazy>`}</CodeBlock>

  <h3>With Placeholder</h3>
  <div class="not-prose border border-border rounded-md p-4 mb-4" data-testid="lazy-placeholder">
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

  <CodeBlock language="svelte">{`<Lazy>
  {#snippet placeholder()}
    <p class="text-muted">Loading chart…</p>
  {/snippet}
  <div class="p-8 bg-surface rounded-lg">
    <h3 class="font-medium">Live analytics widget</h3>
    <p class="mt-1 text-sm text-muted">Deferred until visible to keep the page fast.</p>
  </div>
</Lazy>`}</CodeBlock>

  <h2>Props</h2>
  <PropsTable component={LazyModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Falls back to immediate rendering when <code>IntersectionObserver</code> is unavailable</li>
    <li>The loading state exposes <code>aria-live="polite"</code> and <code>aria-busy</code></li>
    <li>Deferred content is only mounted when visible, keeping the DOM lean</li>
  </ul>
</Container>
