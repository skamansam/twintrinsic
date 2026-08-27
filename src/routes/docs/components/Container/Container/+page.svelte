<!--
@component
Container documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as ContainerModule from "$lib/components/Container/Container.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Container</h1>

  <p>
    <strong>Container</strong> is a fundamental layout component that provides consistent
    padding and width constraints. It is designed to work seamlessly with Tailwind's
    responsive breakpoints and supports both fixed-width and fluid layouts.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A polymorphic layout wrapper that renders as a semantic HTML element
    (<code>&lt;section&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>,
    etc.) with responsive max-width constraints and padding. It is the foundation for page
    structure and section layout.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;Container&gt;</code> to wrap page sections, control max-width, and add
    responsive padding. For self-contained content units (blog posts, product cards), use
    <code>&lt;Card&gt;</code>. For collapsible sections, use <code>&lt;Panel&gt;</code>.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Consistent spacing</strong> — responsive padding across all breakpoints.</li>
    <li><strong>Polymorphic element</strong> — render as <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, etc. for correct semantics.</li>
    <li><strong>Fluid option</strong> — <code>fluid</code> mode for full-width layouts.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://tailwindcss.com/docs/container">Tailwind CSS — Container</a></li>
    <li><a href="https://primer.style/components/box">Primer — Box</a></li>
    <li><a href="https://m3.material.io/foundations/layout/applying-layout/overview">Material Design 3 — Layout</a></li>
    <li><a href="https://ant.design/components/layout">Ant Design — Layout</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section">MDN — &lt;section&gt;</a></li>
  </ul>

  
<h2>Twintrinsic Implementation</h2>
<ul>
    <li>Container: CSS Container Queries (`container-type: inline-size`) for responsive child styling</li>
    <li>Section: `&lt;section&gt;` semantic element with heading</li>
    <li>Panel: `&lt;div&gt;` with `role=&quot;region&quot;` and `aria-label` if it's a landmark</li>
    <li>`...rest` spread for native attributes</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't use `&lt;div&gt;` for Section — `&lt;section&gt;` is the correct semantic element</li>
    <li>Don't forget `&lt;section&gt;` needs a heading for proper semantics</li>
</ul>

<h2>Related Components</h2>
<p>Card, App, Container</p>

<h2>Responsiveness</h2>
  <ul>
    <li>Standard mode uses Tailwind's <code>container</code> class with responsive padding (<code>px-4</code> → <code>px-6</code> → <code>px-8</code>).</li>
    <li>Fluid mode is full-width with no max-width constraint.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li><code>as</code> prop: <code>"section"</code>, <code>"main"</code>, <code>"article"</code>, <code>"div"</code>, <code>"header"</code>, <code>"footer"</code>, <code>"nav"</code>, <code>"aside"</code>.</li>
    <li><code>fluid</code> for full-width layouts.</li>
    <li><code>role</code> and <code>ariaLabel</code> for accessibility.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Container</h3>
  <ExampleTabs code={`<Container class="bg-surface p-4">
  <div class="bg-primary-100 dark:bg-primary-800 p-4 rounded">
    <p>Content in a basic container</p>
  </div>
</Container>`}>
    <div data-testid="container-basic">
      <Container class="bg-surface p-4">
        <div class="bg-primary-100 dark:bg-primary-800 p-4 rounded">
          <p>Content in a basic container</p>
        </div>
      </Container>
    </div>
  </ExampleTabs>

  <h3>Fluid Container</h3>
  <ExampleTabs code={`<Container fluid class="bg-surface p-4">
  <div class="bg-primary-100 dark:bg-primary-800 p-4 rounded">
    <p>Content in a fluid container</p>
  </div>
</Container>`}>
    <div data-testid="container-fluid">
      <Container fluid class="bg-surface p-4">
        <div class="bg-primary-100 dark:bg-primary-800 p-4 rounded">
          <p>Content in a fluid container</p>
        </div>
      </Container>
    </div>
  </ExampleTabs>

  <h3>Semantic Element</h3>
  <ExampleTabs code={`<Container as="main" role="main" ariaLabel="Main content">
  <!-- Content -->
</Container>`}>
    <div data-testid="container-semantic">
      <Container as="main" role="main" ariaLabel="Main content" class="bg-surface p-4 rounded">
        <p>This renders as a <code>&lt;main&gt;</code> element with <code>role="main"</code>.</p>
      </Container>
    </div>
  </ExampleTabs>

  <h2>When to Use Container vs Card vs Panel</h2>
  <table>
    <thead><tr><th>Component</th><th>Use When</th><th>HTML Element</th></tr></thead>
    <tbody>
      <tr><td><strong>Container</strong></td><td>Page/section layout structure with responsive max-width</td><td><code>&lt;div&gt;</code> / semantic</td></tr>
      <tr><td><strong>Card</strong></td><td>Self-contained, reusable content (blog post, product listing)</td><td><code>&lt;article&gt;</code></td></tr>
      <tr><td><strong>Panel</strong></td><td>Collapsible/expandable content (FAQ, settings)</td><td><code>&lt;details&gt;</code></td></tr>
    </tbody>
  </table>

  <h2>Props</h2>
  <PropsTable component={ContainerModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Use the <code>as</code> prop to render the correct semantic element (<code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, etc.).</li>
    <li>Add <code>role</code> and <code>ariaLabel</code> when the element alone doesn't convey semantics.</li>
    <li>Container is a layout-only wrapper; use semantic elements inside it.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <p>
    Container is a layout-only element and does not require keyboard interaction.
  </p>
</Container>
