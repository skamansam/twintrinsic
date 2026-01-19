<!--
@component
Badge documentation page
-->

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import Badge from "$lib/components/Badge/Badge.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Badge</h1>
  
  <p>
    The Badge component displays small counts, status indicators, or labels.
    It provides consistent styling, accessibility features, and various display options
    including different variants, sizes, and visual styles.
  </p>

  <h2>Usage</h2>

  <h3>Basic Badge</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Badge>New</Badge>
  </div>

  <pre class="language-svelte"><code>{`<Badge>New</Badge>`}</code></pre>

  <h3>Variants</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Badge variant="default">Default</Badge>
    <Badge variant="primary">Primary</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="warning">Warning</Badge>
    <Badge variant="error">Error</Badge>
    <Badge variant="info">Info</Badge>
  </div>

  <pre class="language-svelte"><code>{`<Badge variant="default">Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>`}</code></pre>

  <h3>Sizes</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Badge size="sm">Small</Badge>
    <Badge size="md">Medium</Badge>
    <Badge size="lg">Large</Badge>
  </div>

  <pre class="language-svelte"><code>{`<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`}</code></pre>

  <h3>Pill Shape</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Badge pill>Pill Badge</Badge>
    <Badge variant="primary" pill>Primary Pill</Badge>
  </div>

  <pre class="language-svelte"><code>{`<Badge pill>Pill Badge</Badge>
<Badge variant="primary" pill>Primary Pill</Badge>`}</code></pre>

  <h3>Outline Style</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Badge outline>Outline</Badge>
    <Badge variant="primary" outline>Primary</Badge>
    <Badge variant="success" outline>Success</Badge>
  </div>

  <pre class="language-svelte"><code>{`<Badge outline>Outline</Badge>
<Badge variant="primary" outline>Primary</Badge>
<Badge variant="success" outline>Success</Badge>`}</code></pre>

  <h3>Dot Indicators</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <div class="flex items-center gap-1">
      <Badge variant="success" dot></Badge>
      <span>Online</span>
    </div>
    <div class="flex items-center gap-1">
      <Badge variant="error" dot></Badge>
      <span>Offline</span>
    </div>
    <div class="flex items-center gap-1">
      <Badge variant="warning" dot></Badge>
      <span>Away</span>
    </div>
  </div>

  <pre class="language-svelte"><code>{`<div class="flex items-center gap-1">
  <Badge variant="success" dot></Badge>
  <span>Online</span>
</div>
<div class="flex items-center gap-1">
  <Badge variant="error" dot></Badge>
  <span>Offline</span>
</div>
<div class="flex items-center gap-1">
  <Badge variant="warning" dot></Badge>
  <span>Away</span>
</div>`}</code></pre>

  <h3>Pulse Animation</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Badge variant="primary" pulse>Pulse</Badge>
    <Badge variant="error" dot pulse></Badge>
  </div>

  <pre class="language-svelte"><code>{`<Badge variant="primary" pulse>Pulse</Badge>
<Badge variant="error" dot pulse></Badge>`}</code></pre>

  <h3>Overlay Position</h3>
  <div class="flex items-center gap-8 p-4 bg-surface rounded-md mb-4">
    <div class="relative inline-block">
      <div class="w-10 h-10 bg-muted/20 rounded"></div>
      <Badge variant="primary" overlay position="top-right">5</Badge>
    </div>
    <div class="relative inline-block">
      <div class="w-10 h-10 bg-muted/20 rounded"></div>
      <Badge variant="error" overlay position="top-left">!</Badge>
    </div>
    <div class="relative inline-block">
      <div class="w-10 h-10 bg-muted/20 rounded"></div>
      <Badge variant="success" overlay position="bottom-right" dot></Badge>
    </div>
  </div>

  <pre class="language-svelte"><code>{`<div class="relative inline-block">
  <div class="w-10 h-10 bg-muted/20 rounded"></div>
  <Badge variant="primary" overlay position="top-right">5</Badge>
</div>
<div class="relative inline-block">
  <div class="w-10 h-10 bg-muted/20 rounded"></div>
  <Badge variant="error" overlay position="top-left">!</Badge>
</div>
<div class="relative inline-block">
  <div class="w-10 h-10 bg-muted/20 rounded"></div>
  <Badge variant="success" overlay position="bottom-right" dot></Badge>
</div>`}</code></pre>

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
        <td><code>"default" | "primary" | "secondary" | "success" | "warning" | "error" | "info"</code></td>
        <td><code>"default"</code></td>
        <td>Visual style variant</td>
      </tr>
      <tr>
        <td><code>size</code></td>
        <td><code>"sm" | "md" | "lg"</code></td>
        <td><code>"md"</code></td>
        <td>Size of the badge</td>
      </tr>
      <tr>
        <td><code>dot</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to show as a dot indicator</td>
      </tr>
      <tr>
        <td><code>pill</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to show as a pill shape</td>
      </tr>
      <tr>
        <td><code>outline</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to show as an outline</td>
      </tr>
      <tr>
        <td><code>pulse</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to add a subtle pulse animation</td>
      </tr>
      <tr>
        <td><code>hideEmpty</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to hide when content is empty</td>
      </tr>
      <tr>
        <td><code>overlay</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to position as an absolute overlay</td>
      </tr>
      <tr>
        <td><code>position</code></td>
        <td><code>"top-right" | "top-left" | "bottom-right" | "bottom-left"</code></td>
        <td><code>"top-right"</code></td>
        <td>Position when used as overlay</td>
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
    The Badge component follows accessibility best practices:
  </p>
  <ul>
    <li>Uses appropriate <code>role="status"</code> for screen readers</li>
    <li>Dot indicators include descriptive <code>aria-label</code> attributes</li>
    <li>Color contrast meets WCAG standards</li>
    <li>Can be hidden when empty to avoid confusing screen reader users</li>
  </ul>

  <h2>Common Use Cases</h2>
  <p>
    Badges are commonly used for:
  </p>
  <ul>
    <li>Notification counts</li>
    <li>Status indicators</li>
    <li>Labels and tags</li>
    <li>Highlighting new or important items</li>
    <li>Version numbers</li>
  </ul>
</Container>
