<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import Table from "$lib/components/Table/Table.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import { getContext } from "svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Table</h1>
  
  <p>
    The Table component provides a semantic, accessible way to display structured data in rows and columns.
    It supports responsive layouts, striped rows, hover effects, and various styling options.
  </p>

  <h2>Usage</h2>

  <h3>Basic Table</h3>
  <div class="p-4 bg-surface rounded-md mb-4 overflow-x-auto">
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
          <td>John Doe</td>
          <td>john@example.com</td>
          <td>Admin</td>
        </tr>
        <tr>
          <td>Jane Smith</td>
          <td>jane@example.com</td>
          <td>Editor</td>
        </tr>
        <tr>
          <td>Bob Johnson</td>
          <td>bob@example.com</td>
          <td>Viewer</td>
        </tr>
      </tbody>
    </Table>
  </div>

  <pre class="language-svelte"><code>{`<Table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td>john@example.com</td>
      <td>Admin</td>
    </tr>
  </tbody>
</Table>`}</code></pre>

  <h3>Striped Table</h3>
  <div class="p-4 bg-surface rounded-md mb-4 overflow-x-auto">
    <Table striped>
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

  <pre class="language-svelte"><code>{`<Table striped>
  <!-- table content -->
</Table>`}</code></pre>

  <h3>Bordered Table</h3>
  <div class="p-4 bg-surface rounded-md mb-4 overflow-x-auto">
    <Table bordered>
      <thead>
        <tr>
          <th>Feature</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Responsive</td>
          <td>Adapts to different screen sizes</td>
        </tr>
        <tr>
          <td>Accessible</td>
          <td>Semantic HTML with ARIA support</td>
        </tr>
      </tbody>
    </Table>
  </div>

  <pre class="language-svelte"><code>{`<Table bordered>
  <!-- table content -->
</Table>`}</code></pre>

  <h3>Hoverable Table</h3>
  <div class="p-4 bg-surface rounded-md mb-4 overflow-x-auto">
    <Table hoverable>
      <thead>
        <tr>
          <th>Item</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Task 1</td>
          <td>Complete</td>
        </tr>
        <tr>
          <td>Task 2</td>
          <td>In Progress</td>
        </tr>
      </tbody>
    </Table>
  </div>

  <pre class="language-svelte"><code>{`<Table hoverable>
  <!-- table content -->
</Table>`}</code></pre>

  <h3>Compact Table</h3>
  <div class="p-4 bg-surface rounded-md mb-4 overflow-x-auto">
    <Table compact striped>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Item A</td>
          <td>Active</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Item B</td>
          <td>Inactive</td>
        </tr>
      </tbody>
    </Table>
  </div>

  <pre class="language-svelte"><code>{`<Table compact striped>
  <!-- table content -->
</Table>`}</code></pre>

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
        <td><code>bordered</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Add borders to the table and cells</td>
      </tr>
      <tr>
        <td><code>striped</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Alternate row colors for better readability</td>
      </tr>
      <tr>
        <td><code>hoverable</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Highlight rows on hover</td>
      </tr>
      <tr>
        <td><code>compact</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Reduce padding for a more compact layout</td>
      </tr>
      <tr>
        <td><code>fixed</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Use fixed table layout algorithm</td>
      </tr>
      <tr>
        <td><code>responsive</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Enable horizontal scrolling on small screens</td>
      </tr>
      <tr>
        <td><code>caption</code></td>
        <td><code>string</code></td>
        <td>-</td>
        <td>Table caption for accessibility</td>
      </tr>
      <tr>
        <td><code>ariaDescription</code></td>
        <td><code>string</code></td>
        <td>-</td>
        <td>ARIA description for the table</td>
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
        <td>auto-generated</td>
        <td>HTML id attribute</td>
      </tr>
    </tbody>
  </table>

  <h2>Slots</h2>
  <p>The Table component uses the default slot for its content. Use semantic HTML elements:</p>
  <ul>
    <li><code>&lt;thead&gt;</code> - Table header section</li>
    <li><code>&lt;tbody&gt;</code> - Table body section</li>
    <li><code>&lt;tfoot&gt;</code> - Table footer section</li>
    <li><code>&lt;tr&gt;</code> - Table row</li>
    <li><code>&lt;th&gt;</code> - Table header cell</li>
    <li><code>&lt;td&gt;</code> - Table data cell</li>
  </ul>

  <h2>Accessibility</h2>
  <ul>
    <li>Uses semantic HTML table elements for proper structure</li>
    <li>Supports table captions for context</li>
    <li>Includes ARIA description support</li>
    <li>Proper heading hierarchy with <code>&lt;th&gt;</code> elements</li>
    <li>Responsive design ensures usability on all devices</li>
  </ul>

  <h2>Best Practices</h2>
  <ul>
    <li>Always use <code>&lt;thead&gt;</code> and <code>&lt;tbody&gt;</code> for semantic structure</li>
    <li>Use <code>&lt;th&gt;</code> for header cells with proper scope attributes</li>
    <li>Provide a caption or aria-description for context</li>
    <li>Use striped or hoverable for better readability with large tables</li>
    <li>Keep table content concise and well-organized</li>
    <li>Use responsive mode for mobile-friendly tables</li>
  </ul>
</Container>
