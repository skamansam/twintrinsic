<!--
@component
Breadcrumb documentation page
-->

<style>
  @reference '$lib/twintrinsic.css';
</style>
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import Breadcrumb from "$lib/components/Breadcrumb/Breadcrumb.svelte"
import BreadcrumbItem from "$lib/components/Breadcrumb/BreadcrumbItem.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Breadcrumb</h1>
  
  <p>
    The Breadcrumb component is a navigation component that helps users understand their location
    in a website or application. It provides a hierarchical trail of links with proper accessibility features.
  </p>

  <h2>Usage</h2>

  <h3>Basic Breadcrumb</h3>
  <div class="p-4 bg-surface rounded-md mb-4">
    <Breadcrumb>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/docs">Documentation</BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
    </Breadcrumb>
  </div>

  <pre class="language-svelte"><code>{`<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/docs">Documentation</BreadcrumbItem>
  <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
</Breadcrumb>`}</code></pre>

  <h3>Custom Separator</h3>
  <div class="p-4 bg-surface rounded-md mb-4">
    <Breadcrumb separator="›">
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/docs">Documentation</BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
    </Breadcrumb>
  </div>

  <pre class="language-svelte"><code>{`<Breadcrumb separator="›">
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/docs">Documentation</BreadcrumbItem>
  <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
</Breadcrumb>`}</code></pre>

  <h3>With Icons</h3>
  <div class="p-4 bg-surface rounded-md mb-4">
    <Breadcrumb>
      <BreadcrumbItem 
        href="/" 
        icon='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>'
      >
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="/docs">Documentation</BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
    </Breadcrumb>
  </div>

  <pre class="language-svelte"><code>{`<Breadcrumb>
  <BreadcrumbItem 
    href="/" 
    icon='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>'
  >
    Home
  </BreadcrumbItem>
  <BreadcrumbItem href="/docs">Documentation</BreadcrumbItem>
  <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
</Breadcrumb>`}</code></pre>

  <h3>Collapsible Breadcrumb</h3>
  <div class="p-4 bg-surface rounded-md mb-4">
    <Breadcrumb collapsible maxVisibleItems={1}>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/docs">Documentation</BreadcrumbItem>
      <BreadcrumbItem href="/docs/components">Components</BreadcrumbItem>
      <BreadcrumbItem href="/docs/components/navigation">Navigation</BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
    </Breadcrumb>
  </div>

  <pre class="language-svelte"><code>{`<Breadcrumb collapsible maxVisibleItems={1}>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/docs">Documentation</BreadcrumbItem>
  <BreadcrumbItem href="/docs/components">Components</BreadcrumbItem>
  <BreadcrumbItem href="/docs/components/navigation">Navigation</BreadcrumbItem>
  <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
</Breadcrumb>`}</code></pre>

  <h2>Breadcrumb Props</h2>
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
        <td><code>separator</code></td>
        <td><code>string</code></td>
        <td><code>"/"</code></td>
        <td>Separator character or HTML between items</td>
      </tr>
      <tr>
        <td><code>ariaLabel</code></td>
        <td><code>string</code></td>
        <td><code>"Breadcrumb"</code></td>
        <td>ARIA label for the breadcrumb</td>
      </tr>
      <tr>
        <td><code>collapsible</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to collapse long breadcrumbs with ellipsis</td>
      </tr>
      <tr>
        <td><code>maxVisibleItems</code></td>
        <td><code>number</code></td>
        <td><code>1</code></td>
        <td>Maximum visible items when collapsed (excluding first and last)</td>
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

  <h2>BreadcrumbItem Props</h2>
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
        <td><code>href</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Link URL (if item is a link)</td>
      </tr>
      <tr>
        <td><code>target</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Link target (_blank, _self, etc.)</td>
      </tr>
      <tr>
        <td><code>icon</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Icon to display (HTML or SVG string)</td>
      </tr>
      <tr>
        <td><code>current</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether this is the current/active page</td>
      </tr>
      <tr>
        <td><code>collapsible</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether this item should be hidden when collapsed</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes</td>
      </tr>
    </tbody>
  </table>

  <h2>Accessibility</h2>
  <p>
    The Breadcrumb component follows accessibility best practices:
  </p>
  <ul>
    <li>Uses semantic <code>&lt;nav&gt;</code> and <code>&lt;ol&gt;</code> elements for proper structure</li>
    <li>Includes <code>aria-label="Breadcrumb"</code> on the navigation element</li>
    <li>Sets <code>aria-current="page"</code> on the current/active item</li>
    <li>Separators are hidden from screen readers with <code>aria-hidden="true"</code></li>
    <li>Icons include <code>aria-hidden="true"</code> to prevent screen reader announcement</li>
  </ul>

  <h2>Collapsible Behavior</h2>
  <p>
    When the <code>collapsible</code> prop is enabled, the breadcrumb will automatically collapse long paths:
  </p>
  <ul>
    <li>The first and last items are always visible</li>
    <li>Middle items are hidden based on the <code>maxVisibleItems</code> prop</li>
    <li>Individual items can opt out of collapsing by setting <code>collapsible={false}</code></li>
  </ul>
</Container>
