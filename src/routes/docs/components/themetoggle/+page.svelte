<script>
import Container from "$lib/components/Container/Container.svelte"
import ThemeToggle from "$lib/components/ThemeToggle/ThemeToggle.svelte"
</script>

<Container class="prose dark:prose-invert max-w-3xl">
  <h1>ThemeToggle</h1>
  <p>
    A toggle button for switching between light and dark themes. The component automatically
    syncs with system preferences and persists the user's choice.
  </p>

  <h2>Examples</h2>
  <h3>Basic Usage</h3>
  <div class="not-prose mb-8">
    <div class="p-4 bg-surface rounded-lg border border-border flex justify-center">
      <ThemeToggle />
    </div>
  </div>

  <h3>In Header</h3>
  <div class="not-prose mb-8">
    <div class="p-4 bg-surface rounded-lg border border-border">
      <div class="flex justify-end">
        <ThemeToggle />
      </div>
    </div>
  </div>

  <h2>Features</h2>
  <ul>
    <li>Automatic system theme detection</li>
    <li>Smooth theme transitions</li>
    <li>Keyboard accessible</li>
    <li>Screen reader support</li>
    <li>Persistent theme selection</li>
  </ul>

  <h2>Usage</h2>
  <p>Import and use the ThemeToggle component:</p>

  <pre class="language-svelte"><code>{`<script>
  import ThemeToggle from '$lib/components/ThemeToggle/ThemeToggle.svelte';
</script>

<ThemeToggle />`}</code></pre>

  <h2>Implementation Details</h2>
  <p>
    The ThemeToggle component manages theme state through the <code>data-theme</code> attribute
    on the root HTML element. It supports:
  </p>

  <ul>
    <li>Initial theme detection from system preferences</li>
    <li>Theme persistence across page reloads</li>
    <li>Real-time theme switching</li>
  </ul>

  <h2>Accessibility</h2>
  <p>
    The component follows accessibility best practices:
  </p>

  <ul>
    <li>Proper ARIA labels that update based on the current theme</li>
    <li>Keyboard navigation support</li>
    <li>Focus indicators</li>
    <li>High contrast icons</li>
  </ul>

  <h2>Styling</h2>
  <p>
    The ThemeToggle uses Tailwind CSS classes and follows the Twintrinsic design system.
    It automatically adapts to both light and dark themes.
  </p>
</Container>
