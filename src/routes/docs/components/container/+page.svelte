<!--
@component
Container documentation page
-->

<style>
  @reference '$lib/twintrinsic.css';
</style>
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Container</h1>
  
  <p>
    The Container component is a fundamental layout component that provides consistent
    padding and width constraints. It's designed to work seamlessly with Tailwind's
    responsive breakpoints and supports both fixed-width and fluid layouts.
  </p>

  <h2>Usage</h2>

  <h3>Basic Container</h3>
  <Container class="bg-surface p-4 mb-8">
    <div class="bg-primary-100 dark:bg-primary-800 p-4 rounded">
      <p>Content in a basic container</p>
    </div>
  </Container>

  <pre class="language-svelte"><code>{`<Container>
  <div class="bg-primary-100 dark:bg-primary-800 p-4 rounded">
    <p>Content in a basic container</p>
  </div>
</Container>`}</code></pre>

  <h3>Fluid Container</h3>
  <Container fluid class="bg-surface p-4 mb-8">
    <div class="bg-primary-100 dark:bg-primary-800 p-4 rounded">
      <p>Content in a fluid container</p>
    </div>
  </Container>

  <pre class="language-svelte"><code>{`<Container fluid>
  <div class="bg-primary-100 dark:bg-primary-800 p-4 rounded">
    <p>Content in a fluid container</p>
  </div>
</Container>`}</code></pre>

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
        <td><code>fluid</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Makes the container full-width</td>
      </tr>
      <tr>
        <td><code>as</code></td>
        <td><code>"div" | "main" | "section" | "article"</code></td>
        <td><code>"div"</code></td>
        <td>HTML element to render</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes</td>
      </tr>
      <tr>
        <td><code>role</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>ARIA role</td>
      </tr>
      <tr>
        <td><code>ariaLabel</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>ARIA label</td>
      </tr>
    </tbody>
  </table>

  <h2>Accessibility</h2>
  <p>
    The Container component supports ARIA roles and labels through props. When used
    as a main content area, it's recommended to use <code>as="main"</code> with
    appropriate ARIA attributes:
  </p>

  <pre class="language-svelte"><code>{`<Container
  as="main"
  role="main"
  ariaLabel="Main content"
>
  <!-- Content -->
</Container>`}</code></pre>
</Container>
