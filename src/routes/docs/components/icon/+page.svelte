<!--
@component
Icon documentation page
-->

<style>
  @reference '$lib/twintrinsic.css';
  .icon-grid {
    @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4;
  }
  
  .icon-item {
    @apply flex flex-col items-center justify-center p-4 rounded-md bg-surface;
    @apply hover:bg-hover transition-colors duration-150;
  }
  
  .icon-display {
    @apply flex items-center justify-center mb-2 h-10;
  }
  
  .icon-name {
    @apply text-xs text-center truncate w-full;
  }
</style>
<script>
import Container from "$lib/components/Container/Container.svelte"
import Icon from "$lib/components/Icon/Icon.svelte"

// Group icons by category
const iconsByCategory = {
  Interface: ["check", "close", "plus", "minus", "search", "settings", "menu", "more"],
  Navigation: [
    "arrow-left",
    "arrow-right",
    "arrow-up",
    "arrow-down",
    "chevron-left",
    "chevron-right",
    "chevron-up",
    "chevron-down",
  ],
  Actions: ["edit", "delete", "save", "refresh", "download", "upload", "copy"],
  Forms: ["calendar", "eye", "eye-off", "lock", "unlock"],
  Media: ["play", "pause", "stop", "volume-up", "volume-down", "volume-mute", "volume-off"],
  Status: ["info", "warning", "error", "success", "help"],
}
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Icon</h1>
  
  <p>
    The Icon component displays SVG icons with consistent styling. It provides a library of common icons
    that can be easily integrated into your application with support for different sizes and colors.
  </p>

  <h2>Usage</h2>

  <h3>Basic Icon</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Icon name="check" />
  </div>

  <pre class="language-svelte"><code>{`<Icon name="check" />`}</code></pre>

  <h3>Icon Sizes</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Icon name="settings" size="sm" />
    <Icon name="settings" size="md" />
    <Icon name="settings" size="lg" />
    <Icon name="settings" size="xl" />
  </div>

  <pre class="language-svelte"><code>{`<Icon name="settings" size="sm" />
<Icon name="settings" size="md" />
<Icon name="settings" size="lg" />
<Icon name="settings" size="xl" />`}</code></pre>

  <h3>Colored Icons</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Icon name="info" class="text-info-500" />
    <Icon name="warning" class="text-warning-500" />
    <Icon name="error" class="text-error-500" />
    <Icon name="success" class="text-success-500" />
  </div>

  <pre class="language-svelte"><code>{`<Icon name="info" class="text-info-500" />
<Icon name="warning" class="text-warning-500" />
<Icon name="error" class="text-error-500" />
<Icon name="success" class="text-success-500" />`}</code></pre>

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
        <td><code>name</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Name of the icon to display</td>
      </tr>
      <tr>
        <td><code>size</code></td>
        <td><code>"sm" | "md" | "lg" | "xl"</code></td>
        <td><code>"md"</code></td>
        <td>Size of the icon</td>
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
    The Icon component follows accessibility best practices:
  </p>
  <ul>
    <li>Icons are marked with <code>aria-hidden="true"</code> to prevent screen reader announcement</li>
    <li>When using icons for interactive elements, make sure to provide appropriate labels</li>
    <li>For icon-only buttons, use the <code>ariaLabel</code> prop on the Button component</li>
  </ul>

  <h2>Available Icons</h2>
  <p>
    The Icon component includes a comprehensive set of icons organized by category.
    Use the name of the icon as the <code>name</code> prop.
  </p>

  {#each Object.entries(iconsByCategory) as [category, icons]}
    <h3>{category}</h3>
    <div class="icon-grid mb-8">
      {#each icons as iconName}
        <div class="icon-item">
          <div class="icon-display">
            <Icon name={iconName} size="lg" />
          </div>
          <div class="icon-name">{iconName}</div>
        </div>
      {/each}
    </div>
  {/each}

  <h2>Using Icons with Other Components</h2>
  <p>
    Icons can be used with various other components to enhance visual communication:
  </p>

  <h3>With Buttons</h3>
  <pre class="language-svelte"><code>{`<Button>
  <Icon name="plus" size="sm" />
  <span class="ml-2">Add Item</span>
</Button>`}</code></pre>

  <h3>With Form Fields</h3>
  <pre class="language-svelte"><code>{`<div class="relative">
  <Input placeholder="Search..." />
  <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
    <Icon name="search" class="text-muted" />
  </div>
</div>`}</code></pre>

  <h3>With Badges</h3>
  <pre class="language-svelte"><code>{`<Badge variant="warning">
  <Icon name="warning" size="sm" />
  <span class="ml-1">Warning</span>
</Badge>`}</code></pre>

  <h2>Best Practices</h2>
  <ul>
    <li>Use icons consistently throughout your application</li>
    <li>Choose appropriate icon sizes based on their context</li>
    <li>Ensure sufficient color contrast when using colored icons</li>
    <li>Avoid using icons alone for critical actions without text labels</li>
    <li>Use the appropriate icon category for the intended purpose</li>
  </ul>
</Container>
