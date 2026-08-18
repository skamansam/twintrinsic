<script lang="ts">
import App from "$lib/components/App/App.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as AppModule from "$lib/components/App/App.svelte"
</script>
<!--
@component
App documentation page
-->

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>App</h1>
  
  <p>
    The App component is a foundational layout component that provides the overall structure for your application.
    It includes slots for header, footer, left panel, right panel, and main content, making it easy to create
    complex layouts with proper accessibility.
  </p>

  <h2>Usage</h2>

  <h3>Basic App Layout</h3>
  <CodeBlock language="svelte">{`<App appName="Acme Suite">
  {#snippet header()}
    <AppHeader brand="Acme Suite" navItems={[{ label: 'Home', href: '/' }]} />
  {/snippet}
  
  {#snippet leftPanel()}
    <Sidebar>
      <!-- Navigation links -->
    </Sidebar>
  {/snippet}
  
  <!-- Main content -->
  <div>
    <h1>Projects</h1>
    <p>Track and manage your team's work.</p>
  </div>
  
  {#snippet footer()}
    <Footer>
      <!-- Company links -->
    </Footer>
  {/snippet}
</App>`}</CodeBlock>

  <h2>Props</h2>
<PropsTable component={AppModule} />

  <h2>Slots</h2>
  <table>
    <thead>
      <tr>
        <th>Slot</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>default</code></td>
        <td>Main content area of the application</td>
      </tr>
      <tr>
        <td><code>header</code></td>
        <td>Application header area</td>
      </tr>
      <tr>
        <td><code>leftPanel</code></td>
        <td>Left sidebar panel</td>
      </tr>
      <tr>
        <td><code>rightPanel</code></td>
        <td>Right sidebar panel</td>
      </tr>
      <tr>
        <td><code>footer</code></td>
        <td>Application footer area</td>
      </tr>
      <tr>
        <td><code>menu</code></td>
        <td>Optional menu area above the header</td>
      </tr>
    </tbody>
  </table>

  <h2>Accessibility</h2>
  <p>
    The App component automatically sets up proper document structure with semantic HTML:
  </p>
  <ul>
    <li>Main content area uses the <code>&lt;main&gt;</code> element with <code>role="main"</code></li>
    <li>Footer uses the <code>&lt;footer&gt;</code> element</li>
    <li>Document title is set based on the <code>appName</code> prop</li>
  </ul>

  <h2>Responsive Behavior</h2>
  <p>
    The App component is fully responsive:
  </p>
  <ul>
    <li>On mobile devices (below 640px), side panels expand to full width</li>
    <li>Layout adjusts from row to column orientation on small screens</li>
    <li>Custom panel widths can be specified through props</li>
  </ul>
</Container>
