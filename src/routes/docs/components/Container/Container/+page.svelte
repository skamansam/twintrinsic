<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as ContainerModule from "$lib/components/Container/Container.svelte"
</script>
<!--
@component
Container documentation page
-->

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Container</h1>
  
  <p>
    The Container component is a fundamental layout component that provides consistent
    padding and width constraints. It's designed to work seamlessly with Tailwind's
    responsive breakpoints and supports both fixed-width and fluid layouts.
  </p>

  <h2>Usage</h2>

  <h3>Basic Container</h3>
  <div data-testid="container-basic">
    <Container class="bg-surface p-4 mb-8">
      <div class="bg-primary-100 dark:bg-primary-800 p-4 rounded">
        <p>Content in a basic container</p>
      </div>
    </Container>
  </div>

  <CodeBlock language="svelte">{`<Container>
  <div class="bg-primary-100 dark:bg-primary-800 p-4 rounded">
    <p>Content in a basic container</p>
  </div>
</Container>`}</CodeBlock>

  <h3>Fluid Container</h3>
  <div data-testid="container-fluid">
    <Container fluid class="bg-surface p-4 mb-8">
      <div class="bg-primary-100 dark:bg-primary-800 p-4 rounded">
        <p>Content in a fluid container</p>
      </div>
    </Container>
  </div>

  <CodeBlock language="svelte">{`<Container fluid>
  <div class="bg-primary-100 dark:bg-primary-800 p-4 rounded">
    <p>Content in a fluid container</p>
  </div>
</Container>`}</CodeBlock>

  <h2>Props</h2>
<PropsTable component={ContainerModule} />

  <h2>When to Use Container vs Card vs Panel</h2>
  <p>
    Twintrinsic provides three distinct layout components. Choose based on your use case:
  </p>
  <table>
    <thead>
      <tr>
        <th>Component</th>
        <th>Use When</th>
        <th>HTML Element</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Container</strong></td>
        <td>Creating page/section layout structure with responsive max-width constraints and spacing</td>
        <td><code>&lt;div&gt;</code></td>
      </tr>
      <tr>
        <td><strong>Card</strong></td>
        <td>Displaying self-contained, reusable content that could stand alone (blog post, product listing, user profile)</td>
        <td><code>&lt;article&gt;</code></td>
      </tr>
      <tr>
        <td><strong>Panel</strong></td>
        <td>Content should be collapsible/expandable to save vertical space (FAQ, settings, advanced options)</td>
        <td><code>&lt;details&gt;</code></td>
      </tr>
    </tbody>
  </table>

  <h3>Container-Specific Guidelines</h3>
  <ul>
    <li><strong>Layout wrapper:</strong> Use Container to wrap page sections and control max-width</li>
    <li><strong>No semantic meaning:</strong> Container is layout-only; use semantic elements inside it</li>
    <li><strong>Responsive design:</strong> Container handles responsive padding and max-width constraints</li>
    <li><strong>Wrap multiple components:</strong> Use Container to group Cards, Panels, and other components</li>
    <li><strong>Flexible element:</strong> Use the <code>as</code> prop to render as <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, or <code>&lt;article&gt;</code> when needed</li>
  </ul>

  <h2>Accessibility</h2>
  <p>
    The Container component supports ARIA roles and labels through props. When used
    as a main content area, it's recommended to use <code>as="main"</code> with
    appropriate ARIA attributes:
  </p>

  <CodeBlock language="svelte">{`<Container
  as="main"
  role="main"
  ariaLabel="Main content"
>
  <!-- Content -->
</Container>`}</CodeBlock>
</Container>
