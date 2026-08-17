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
      <p>This content renders when it becomes visible.</p>
    </Lazy>
  </div>

  <CodeBlock language="svelte">{`<Lazy>
  <p>This content renders when it becomes visible.</p>
</Lazy>`}</CodeBlock>

  <h3>With Placeholder</h3>
  <div class="not-prose border border-border rounded-md p-4 mb-4" data-testid="lazy-placeholder">
    <Lazy>
      {#snippet placeholder()}
        <p class="text-muted">Loading…</p>
      {/snippet}
      <p>Deferred content.</p>
    </Lazy>
  </div>

  <CodeBlock language="svelte">{`<Lazy>
  {#snippet placeholder()}
    <p class="text-muted">Loading…</p>
  {/snippet}
  <p>Deferred content.</p>
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
