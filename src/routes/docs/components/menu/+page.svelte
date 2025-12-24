<style>
  @reference '$lib/twintrinsic.css';
</style>
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import Menu from "$lib/components/Menu/Menu.svelte"
import MenuItem from "$lib/components/Menu/MenuItem.svelte"
import Button from "$lib/components/Button/Button.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Menu</h1>
  
  <p>
    The Menu component displays a list of options or actions in a dropdown. It provides accessible menu navigation
    with keyboard support and various styling options.
  </p>

  <h2>Usage</h2>

  <h3>Basic Menu</h3>
  <div class="p-4 bg-surface rounded-md mb-4">
    <Menu>
      <Button slot="trigger">Open Menu</Button>
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
      <MenuItem>Option 3</MenuItem>
    </Menu>
  </div>

  <pre class="language-svelte"><code>{`<Menu>
  <Button slot="trigger">Open Menu</Button>
  <MenuItem>Option 1</MenuItem>
  <MenuItem>Option 2</MenuItem>
  <MenuItem>Option 3</MenuItem>
</Menu>`}</code></pre>

  <h3>Menu with Dividers</h3>
  <div class="p-4 bg-surface rounded-md mb-4">
    <Menu>
      <Button slot="trigger">Actions</Button>
      <MenuItem>Edit</MenuItem>
      <MenuItem>Copy</MenuItem>
      <MenuItem divider>Delete</MenuItem>
    </Menu>
  </div>

  <pre class="language-svelte"><code>{`<Menu>
  <Button slot="trigger">Actions</Button>
  <MenuItem>Edit</MenuItem>
  <MenuItem>Copy</MenuItem>
  <MenuItem divider>Delete</MenuItem>
</Menu>`}</code></pre>

  <h3>Menu with Icons</h3>
  <div class="p-4 bg-surface rounded-md mb-4">
    <Menu>
      <Button slot="trigger">More</Button>
      <MenuItem icon="edit">Edit</MenuItem>
      <MenuItem icon="copy">Copy</MenuItem>
      <MenuItem icon="trash">Delete</MenuItem>
    </Menu>
  </div>

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
        <td><code>position</code></td>
        <td><code>"top" | "bottom" | "left" | "right"</code></td>
        <td><code>"bottom"</code></td>
        <td>Menu position relative to trigger</td>
      </tr>
      <tr>
        <td><code>closeOnSelect</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to close menu after selecting an item</td>
      </tr>
      <tr>
        <td><code>disabled</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the menu is disabled</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes</td>
      </tr>
    </tbody>
  </table>

  <h2>MenuItem Props</h2>
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
        <td><code>disabled</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the menu item is disabled</td>
      </tr>
      <tr>
        <td><code>divider</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to show a divider after this item</td>
      </tr>
      <tr>
        <td><code>icon</code></td>
        <td><code>string</code></td>
        <td>-</td>
        <td>Icon name to display before text</td>
      </tr>
    </tbody>
  </table>

  <h2>Events</h2>
  <table>
    <thead>
      <tr>
        <th>Event</th>
        <th>Detail</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>select</code></td>
        <td><code>{{ item: MenuItem }}</code></td>
        <td>Fired when a menu item is selected</td>
      </tr>
      <tr>
        <td><code>open</code></td>
        <td>-</td>
        <td>Fired when menu opens</td>
      </tr>
      <tr>
        <td><code>close</code></td>
        <td>-</td>
        <td>Fired when menu closes</td>
      </tr>
    </tbody>
  </table>

  <h2>Keyboard Navigation</h2>
  <ul>
    <li><strong>Enter/Space:</strong> Open menu or select item</li>
    <li><strong>Arrow Up/Down:</strong> Navigate menu items</li>
    <li><strong>Escape:</strong> Close menu</li>
    <li><strong>Home/End:</strong> Jump to first/last item</li>
  </ul>

  <h2>Accessibility</h2>
  <ul>
    <li>Uses <code>role="menu"</code> for the menu container</li>
    <li>Uses <code>role="menuitem"</code> for individual items</li>
    <li>Full keyboard navigation support</li>
    <li>Proper ARIA labels and attributes</li>
    <li>Focus management for keyboard users</li>
  </ul>

  <h2>Best Practices</h2>
  <ul>
    <li>Keep menu items concise and clear</li>
    <li>Use dividers to group related items</li>
    <li>Disable items that are not applicable</li>
    <li>Use icons to improve visual recognition</li>
    <li>Provide keyboard shortcuts in labels when applicable</li>
  </ul>
</Container>
