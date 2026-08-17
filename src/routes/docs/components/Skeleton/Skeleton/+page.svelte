<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
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
    The Skeleton component is used to display loading placeholders while content is being fetched or processed.
    It provides various shapes and sizes to match different content types and includes smooth animations.
  </p>

  <h2>Usage</h2>

  <h3>Basic Skeleton</h3>
  <div class="flex flex-col gap-4 p-4 bg-surface rounded-md mb-4" data-testid="skeleton-basic">
    <Skeleton width="100%" height="20px" />
  </div>

  <CodeBlock language="svelte">{`<Skeleton width="100%" height="20px" />`}</CodeBlock>

  <h3>Skeleton Variants</h3>
  <div class="flex flex-col gap-4 p-4 bg-surface rounded-md mb-4" data-testid="skeleton-variants">
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

  <CodeBlock language="svelte">{`<Skeleton variant="rectangle" width="100%" height="100px" />
<Skeleton variant="circle" size="48px" />
<Skeleton variant="rounded" width="100%" height="60px" />
<Skeleton variant="text" width="100%" />`}</CodeBlock>

  <h3>Multiple Lines</h3>
  <div class="flex flex-col gap-4 p-4 bg-surface rounded-md mb-4" data-testid="skeleton-multi-line">
    <Skeleton variant="text" lines={3} />
  </div>

  <CodeBlock language="svelte">{`<Skeleton variant="text" lines={3} />`}</CodeBlock>

  <h3>Skeleton Loading Pattern</h3>
  <div class="flex gap-4 p-4 bg-surface rounded-md mb-4" data-testid="skeleton-loading-pattern">
    <Skeleton variant="circle" size="48px" />
    <div class="flex-1">
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="80%" />
    </div>
  </div>

  <CodeBlock language="svelte">{`<div class="flex gap-4">
  <Skeleton variant="circle" size="48px" />
  <div class="flex-1">
    <Skeleton variant="text" width="60%" />
    <Skeleton variant="text" width="80%" />
  </div>
</div>`}</CodeBlock>

  <h3>Static Skeleton (No Animation)</h3>
  <div class="flex flex-col gap-4 p-4 bg-surface rounded-md mb-4" data-testid="skeleton-static">
    <Skeleton width="100%" height="20px" animated={false} />
  </div>

  <CodeBlock language="svelte">{`<Skeleton width="100%" height="20px" animated={false} />`}</CodeBlock>

  <h2>Props</h2>
<PropsTable component={SkeletonModule} />

  <h2>Accessibility</h2>
  <p>
    The Skeleton component follows accessibility best practices:
  </p>
  <ul>
    <li>Uses <code>role="status"</code> to announce loading state to screen readers</li>
    <li>Includes <code>aria-label</code> to describe what is loading</li>
    <li>Provides visually hidden text for screen reader users</li>
    <li>Skeleton elements are marked with <code>aria-hidden="true"</code> when appropriate</li>
  </ul>

  <h2>Best Practices</h2>
  <ul>
    <li>Use skeleton loaders to match the shape and size of actual content</li>
    <li>Combine multiple skeletons to create realistic loading patterns</li>
    <li>Keep animations subtle to avoid distraction</li>
    <li>Provide meaningful <code>ariaLabel</code> values that describe what is loading</li>
    <li>Use the <code>animated={false}</code> prop for static placeholders</li>
  </ul>
</Container>
