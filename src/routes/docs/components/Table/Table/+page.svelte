<!--
@component
Table documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import Table from "$lib/components/Table/Table.svelte"
import * as TableModule from "$lib/components/Table/Table.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Table</h1>

  <p>
    <strong>Table</strong> provides a semantic, accessible way to display structured data
    in rows and columns. It supports responsive layouts, striped rows, hover effects, and
    various styling options.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A styled wrapper around the native HTML <code>&lt;table&gt;</code> element. Provides
    consistent styling with options for striped rows, hover effects, borders, and compact
    mode. Uses semantic <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>,
    <code>&lt;th&gt;</code>, and <code>&lt;td&gt;</code> elements.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;Table&gt;</code> for structured data that benefits from column alignment:
    user lists, product inventories, financial data, or any tabular information. For
    card-based data display, use <code>&lt;Card&gt;</code> or <code>&lt;DataTable&gt;</code>.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Semantic HTML</strong> — native <code>&lt;table&gt;</code> for correct structure.</li>
    <li><strong>Accessible</strong> — proper heading hierarchy and screen reader support.</li>
    <li><strong>Flexible</strong> — striped, bordered, hoverable, and compact variants.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table">MDN — &lt;table&gt;</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/table/">WAI-ARIA APG — Table</a></li>
    <li><a href="https://m3.material.io/components/data-tables/overview">Material Design 3 — Data tables</a></li>
    <li><a href="https://primer.style/components/table">Primer — Table</a></li>
    <li><a href="https://ant.design/components/table">Ant Design — Table</a></li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Horizontally scrollable on narrow screens via <code>overflow-x-auto</code>.</li>
    <li>Full-width by default.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li><code>striped</code> — alternating row backgrounds.</li>
    <li><code>hoverable</code> — row highlight on hover.</li>
    <li><code>bordered</code> — cell borders.</li>
    <li><code>compact</code> — reduced padding.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Table</h3>
  <ExampleTabs code={`<Table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Sarah Chen</td>
      <td>sarah.chen@acme.io</td>
      <td>Admin</td>
    </tr>
    <tr>
      <td>Marcus Webb</td>
      <td>marcus.webb@acme.io</td>
      <td>Editor</td>
    </tr>
  </tbody>
</Table>`}>
    <div class="overflow-x-auto" data-testid="table-basic">
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sarah Chen</td>
            <td>sarah.chen@acme.io</td>
            <td>Admin</td>
          </tr>
          <tr>
            <td>Marcus Webb</td>
            <td>marcus.webb@acme.io</td>
            <td>Editor</td>
          </tr>
          <tr>
            <td>Priya Patel</td>
            <td>priya.patel@acme.io</td>
            <td>Viewer</td>
          </tr>
        </tbody>
      </Table>
    </div>
  </ExampleTabs>

  <h3>Striped &amp; Hoverable</h3>
  <ExampleTabs code={`<Table striped hoverable>
  <thead>
    <tr><th>Product</th><th>Price</th><th>Stock</th></tr>
  </thead>
  <tbody>
    <tr><td>Laptop</td><td>$999</td><td>45</td></tr>
    <tr><td>Mouse</td><td>$25</td><td>120</td></tr>
  </tbody>
</Table>`}>
    <div class="overflow-x-auto" data-testid="table-striped">
      <Table striped hoverable>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Laptop</td>
            <td>$999</td>
            <td>45</td>
          </tr>
          <tr>
            <td>Mouse</td>
            <td>$25</td>
            <td>120</td>
          </tr>
          <tr>
            <td>Keyboard</td>
            <td>$75</td>
            <td>80</td>
          </tr>
        </tbody>
      </Table>
    </div>
  </ExampleTabs>

  <h3>Compact &amp; Bordered</h3>
  <ExampleTabs code={`<Table compact bordered>
  <thead>
    <tr><th>Feature</th><th>Status</th></tr>
  </thead>
  <tbody>
    <tr><td>Responsive</td><td>✅</td></tr>
    <tr><td>Accessible</td><td>✅</td></tr>
  </tbody>
</Table>`}>
    <div class="overflow-x-auto" data-testid="table-compact">
      <Table compact bordered>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Responsive</td>
            <td>✅</td>
          </tr>
          <tr>
            <td>Accessible</td>
            <td>✅</td>
          </tr>
        </tbody>
      </Table>
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={TableModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Uses semantic HTML table elements (<code>&lt;table&gt;</code>, <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, <code>&lt;th&gt;</code>, <code>&lt;td&gt;</code>).</li>
    <li>Proper heading hierarchy with <code>&lt;th&gt;</code> elements.</li>
    <li>Supports table captions for context.</li>
    <li>Responsive design ensures usability on all devices.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <p>
    Table uses native HTML table elements. Browser default keyboard navigation
    applies (Tab between cells, arrow keys within cells).
  </p>
</Container>
