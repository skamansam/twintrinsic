<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import Skeleton from "$lib/components/Skeleton/Skeleton.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Skeleton</h1>
  
  <p>
    The Skeleton component is used to display loading placeholders while content is being fetched or processed.
    It provides various shapes and sizes to match different content types and includes smooth animations.
  </p>

  <h2>Usage</h2>

  <h3>Basic Skeleton</h3>
  <div class="flex flex-col gap-4 p-4 bg-surface rounded-md mb-4">
    <Skeleton width="100%" height="20px" />
  </div>

  <pre class="language-svelte"><code>{`<Skeleton width="100%" height="20px" />`}</code></pre>

  <h3>Skeleton Variants</h3>
  <div class="flex flex-col gap-4 p-4 bg-surface rounded-md mb-4">
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

  <pre class="language-svelte"><code>{`<Skeleton variant="rectangle" width="100%" height="100px" />
<Skeleton variant="circle" size="48px" />
<Skeleton variant="rounded" width="100%" height="60px" />
<Skeleton variant="text" width="100%" />`}</code></pre>

  <h3>Multiple Lines</h3>
  <div class="flex flex-col gap-4 p-4 bg-surface rounded-md mb-4">
    <Skeleton variant="text" lines={3} />
  </div>

  <pre class="language-svelte"><code>{`<Skeleton variant="text" lines={3} />`}</code></pre>

  <h3>Skeleton Loading Pattern</h3>
  <div class="flex gap-4 p-4 bg-surface rounded-md mb-4">
    <Skeleton variant="circle" size="48px" />
    <div class="flex-1">
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="80%" />
    </div>
  </div>

  <pre class="language-svelte"><code>{`<div class="flex gap-4">
  <Skeleton variant="circle" size="48px" />
  <div class="flex-1">
    <Skeleton variant="text" width="60%" />
    <Skeleton variant="text" width="80%" />
  </div>
</div>`}</code></pre>

  <h3>Static Skeleton (No Animation)</h3>
  <div class="flex flex-col gap-4 p-4 bg-surface rounded-md mb-4">
    <Skeleton width="100%" height="20px" animated={false} />
  </div>

  <pre class="language-svelte"><code>{`<Skeleton width="100%" height="20px" animated={false} />`}</code></pre>

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
        <td><code>variant</code></td>
        <td><code>"text" | "rectangle" | "circle" | "rounded"</code></td>
        <td><code>"rectangle"</code></td>
        <td>Shape variant of the skeleton</td>
      </tr>
      <tr>
        <td><code>width</code></td>
        <td><code>string | number</code></td>
        <td><code>"100%"</code></td>
        <td>Width of the skeleton</td>
      </tr>
      <tr>
        <td><code>height</code></td>
        <td><code>string | number</code></td>
        <td>Varies by variant</td>
        <td>Height of the skeleton</td>
      </tr>
      <tr>
        <td><code>size</code></td>
        <td><code>string | number</code></td>
        <td>Varies by variant</td>
        <td>Size for circle and square variants (sets both width and height)</td>
      </tr>
      <tr>
        <td><code>lines</code></td>
        <td><code>number</code></td>
        <td><code>1</code></td>
        <td>Number of lines for text variant</td>
      </tr>
      <tr>
        <td><code>animated</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to show the loading animation</td>
      </tr>
      <tr>
        <td><code>ariaLabel</code></td>
        <td><code>string</code></td>
        <td><code>"Loading content"</code></td>
        <td>ARIA label for accessibility</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes</td>
      </tr>
      <tr>
        <td><code>id</code></td>
        <td><code>string</code></td>
        <td><code>crypto.randomUUID()</code></td>
        <td>HTML id for accessibility</td>
      </tr>
    </tbody>
  </table>

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
