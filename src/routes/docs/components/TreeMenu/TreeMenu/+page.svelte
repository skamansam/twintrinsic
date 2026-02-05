<script lang="ts">
  import type { MenuItem } from '$lib/components/TreeMenu/TreeMenu.svelte';
  import TreeMenu from '$lib/components/TreeMenu/TreeMenu.svelte';

  const basicItems: MenuItem[] = [
    { title: 'Home', icon: 'home', link: '/' },
    { title: 'About', icon: 'info', link: '/about' },
    { title: 'Settings', icon: 'settings', link: '/settings', separator: true },
  ];

  const nestedItems: MenuItem[] = [
    {
      title: 'File',
      icon: 'folder',
      children: [
        { label: 'New', link: '/file/new' },
        { label: 'Open', link: '/file/open' },
        { label: 'Save', link: '/file/save' },
      ],
    },
    {
      title: 'Edit',
      icon: 'edit',
      children: [
        { label: 'Undo', link: '/edit/undo' },
        { label: 'Redo', link: '/edit/redo' },
      ],
    },
  ];

  const actionItems: MenuItem[] = [
    {
      title: 'Actions',
      children: [
        { label: 'Create', onClick: () => alert('Create clicked') },
        { label: 'Delete', onClick: () => alert('Delete clicked') },
      ],
    },
  ];
</script>

<div class="docs-container">
  <h1>TreeMenu</h1>

  <p class="lead">
    A hierarchical menu component that renders a tree of menu items. Can be used standalone or with the Sidebar component for flexible navigation structures.
  </p>

  <section>
    <h2>Overview</h2>
    <p>
      TreeMenu is a versatile component for displaying hierarchical navigation structures. It supports:
    </p>
    <ul>
      <li>Nested menu items with unlimited depth</li>
      <li>Links, buttons, and action handlers</li>
      <li>Icons with custom styling</li>
      <li>Expandable/collapsible sections</li>
      <li>Separators for visual organization</li>
      <li>Text-only items for headers/labels</li>
    </ul>
  </section>

  <section>
    <h2>Basic Usage</h2>
    <p>Simple menu with links:</p>
    <div class="example">
      <TreeMenu items={basicItems} />
    </div>
    <pre><code>{`<script lang="ts">
  import { TreeMenu, type MenuItem } from 'twintrinsic';

  const items: MenuItem[] = [
    { title: 'Home', icon: 'home', link: '/' },
    { title: 'About', icon: 'info', link: '/about' },
    { title: 'Settings', icon: 'settings', link: '/settings', separator: true },
  ];
</script>

<TreeMenu {items} />`}</code></pre>
  </section>

  <section>
    <h2>Nested Items</h2>
    <p>Create hierarchical menus with expandable sections:</p>
    <div class="example">
      <TreeMenu items={nestedItems} />
    </div>
    <pre><code>{`const items: MenuItem[] = [
  {
    title: 'File',
    icon: 'folder',
    children: [
      { label: 'New', link: '/file/new' },
      { label: 'Open', link: '/file/open' },
      { label: 'Save', link: '/file/save' },
    ],
  },
];`}</code></pre>
  </section>

  <section>
    <h2>With Actions</h2>
    <p>Handle click events and custom actions:</p>
    <div class="example">
      <TreeMenu items={actionItems} />
    </div>
    <pre><code>{`const items: MenuItem[] = [
  {
    title: 'Actions',
    children: [
      { label: 'Create', onClick: () => alert('Create clicked') },
      { label: 'Delete', onClick: () => alert('Delete clicked') },
    ],
  },
];`}</code></pre>
  </section>

  <section>
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
          <td><code>items</code></td>
          <td><code>MenuItem[]</code></td>
          <td><code>[]</code></td>
          <td>Array of menu items to render</td>
        </tr>
        <tr>
          <td><code>class</code></td>
          <td><code>string</code></td>
          <td><code>""</code></td>
          <td>Additional CSS classes</td>
        </tr>
      </tbody>
    </table>
  </section>

  <section>
    <h2>MenuItem Structure</h2>
    <table>
      <thead>
        <tr>
          <th>Property</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>title</code></td>
          <td><code>string</code></td>
          <td>Main label for the item</td>
        </tr>
        <tr>
          <td><code>label</code></td>
          <td><code>string</code></td>
          <td>Alternative label (used in children)</td>
        </tr>
        <tr>
          <td><code>icon</code></td>
          <td><code>string</code></td>
          <td>Icon identifier (e.g., "home", "settings")</td>
        </tr>
        <tr>
          <td><code>iconClass</code></td>
          <td><code>string</code></td>
          <td>Custom CSS classes for the icon</td>
        </tr>
        <tr>
          <td><code>link</code></td>
          <td><code>string</code></td>
          <td>Navigation href (renders as anchor tag)</td>
        </tr>
        <tr>
          <td><code>onClick</code></td>
          <td><code>() => void</code></td>
          <td>Click handler function</td>
        </tr>
        <tr>
          <td><code>action</code></td>
          <td><code>() => void</code></td>
          <td>Alternative action handler</td>
        </tr>
        <tr>
          <td><code>separator</code></td>
          <td><code>boolean</code></td>
          <td>Show separator before this item</td>
        </tr>
        <tr>
          <td><code>children</code></td>
          <td><code>MenuItem[]</code></td>
          <td>Nested menu items</td>
        </tr>
      </tbody>
    </table>
  </section>

  <section>
    <h2>Use Cases</h2>
    <ul>
      <li><strong>Sidebars</strong> - Application navigation menus</li>
      <li><strong>Command Palettes</strong> - Hierarchical command organization</li>
      <li><strong>Settings</strong> - Nested settings categories</li>
      <li><strong>File Explorers</strong> - Folder/file tree structures</li>
      <li><strong>Documentation</strong> - Table of contents with sections</li>
      <li><strong>Admin Dashboards</strong> - Multi-level admin panels</li>
      <li><strong>Context Menus</strong> - Right-click menus with submenus</li>
      <li><strong>Dropdown Menus</strong> - Multi-level dropdowns in headers</li>
    </ul>
  </section>

  <section>
    <h2>With Sidebar</h2>
    <p>TreeMenu integrates seamlessly with the Sidebar component:</p>
    <pre><code>{`<Sidebar menu={items} />`}</code></pre>
    <p>
      When a <code>menu</code> prop is provided to Sidebar, it automatically renders the TreeMenu component. You can also use custom content by omitting the menu prop:
    </p>
    <pre><code>{`<Sidebar>
  <nav>Custom content</nav>
</Sidebar>`}</code></pre>
  </section>

  <section>
    <h2>Accessibility</h2>
    <ul>
      <li>Semantic HTML with proper link and button elements</li>
      <li>Keyboard navigation support (Enter to expand/collapse)</li>
      <li>ARIA labels for screen readers</li>
      <li>Focus management for keyboard users</li>
    </ul>
  </section>
</div>

<style lang="postcss">
  @reference '../../../../../lib/twintrinsic.css';

  .docs-container {
    @apply max-w-4xl mx-auto px-4 py-8;
  }

  h1 {
    @apply text-4xl font-bold mb-4;
  }

  h2 {
    @apply text-2xl font-bold mt-8 mb-4;
  }

  .lead {
    @apply text-lg text-muted mb-6;
  }

  section {
    @apply mb-8;
  }

  p {
    @apply mb-4 text-base;
  }

  ul {
    @apply list-disc list-inside space-y-2 mb-4;
  }

  .example {
    @apply border border-border rounded-lg p-4 mb-4 bg-surface;
  }

  pre {
    @apply bg-surface border border-border rounded-lg p-4 overflow-x-auto mb-4;
  }

  code {
    @apply font-mono text-sm;
  }

  table {
    @apply w-full border-collapse border border-border mb-4;
  }

  th,
  td {
    @apply border border-border px-4 py-2 text-left;
  }

  th {
    @apply bg-hover font-semibold;
  }

  tr:nth-child(even) {
    @apply bg-surface;
  }
</style>
