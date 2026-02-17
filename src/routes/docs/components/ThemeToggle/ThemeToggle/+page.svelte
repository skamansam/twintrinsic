<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<script lang="ts">
import Button from "$lib/components/Button/Button.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Panel from "$lib/components/Panel/Panel.svelte"
import ThemeToggle from "$lib/components/ThemeToggle/ThemeToggle.svelte"
</script>

<Container class="prose dark:prose-invert max-w-4xl">
  <h1>ThemeToggle</h1>
  <p>
    A toggle button for switching between light and dark themes. The component automatically
    syncs with system preferences and persists the user's choice. It also supports nested theming,
    allowing different sections of your application to have independent theme states.
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

  <h2>Nested Theming</h2>
  <p>
    The ThemeToggle component supports nested theming, allowing you to create sections with
    independent theme states. Each nested <code>data-theme</code> element can have its own
    theme toggle that overrides the parent's theme.
  </p>

  <h3>Interactive Demo: 3-Level Nested Themes</h3>
  <p>
    Try toggling the theme switches at different levels to see how nested theming works.
    Each section can have its own independent theme state.
  </p>

  <div class="not-prose mb-8">
    <!-- Level 1: Main Section -->
    <div class="p-6 rounded-lg border-2 border-primary-500 bg-background text-text" data-theme>
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-lg font-bold">Level 1: Main Section</h4>
        <ThemeToggle />
      </div>
      <p class="text-sm text-muted mb-4">Toggle this section's theme independently</p>
      
      <!-- Level 2: First Nested Section -->
      <div class="p-4 rounded-lg border border-secondary-500 bg-surface mt-4" data-theme>
        <div class="flex items-center justify-between mb-3">
          <h5 class="font-semibold">Level 2a: First Nested Section</h5>
          <ThemeToggle />
        </div>
        <p class="text-sm text-muted mb-3">This section can have a different theme than its parent</p>
        
        <!-- Level 3: Deeply Nested Section -->
        <div class="p-3 rounded border border-success-500 bg-background mt-3" data-theme>
          <div class="flex items-center justify-between mb-2">
            <h6 class="font-medium">Level 3a: Deeply Nested</h6>
            <ThemeToggle />
          </div>
          <p class="text-xs text-muted">Three levels deep with independent theme control</p>
        </div>
      </div>

      <!-- Level 2: Second Nested Section -->
      <div class="p-4 rounded-lg border border-warning-500 bg-surface mt-4" data-theme>
        <div class="flex items-center justify-between mb-3">
          <h5 class="font-semibold">Level 2b: Second Nested Section</h5>
          <ThemeToggle />
        </div>
        <p class="text-sm text-muted mb-3">Another independent nested section</p>
        
        <!-- Level 3: Another Deeply Nested Section -->
        <div class="p-3 rounded border border-error-500 bg-background mt-3" data-theme>
          <div class="flex items-center justify-between mb-2">
            <h6 class="font-medium">Level 3b: Another Nested</h6>
            <ThemeToggle />
          </div>
          <p class="text-xs text-muted">Independent theme at depth 3</p>
        </div>
      </div>

      <!-- Level 2: Third Nested Section (No Toggle) -->
      <div class="p-4 rounded-lg border border-info-500 bg-surface mt-4" data-theme>
        <h5 class="font-semibold mb-3">Level 2c: Nested Without Toggle</h5>
        <p class="text-sm text-muted mb-3">This section inherits its parent's theme (no toggle)</p>
        
        <!-- Level 3: Nested Under No-Toggle Section -->
        <div class="p-3 rounded border border-primary-400 bg-background mt-3" data-theme>
          <div class="flex items-center justify-between mb-2">
            <h6 class="font-medium">Level 3c: Under No-Toggle Parent</h6>
            <ThemeToggle />
          </div>
          <p class="text-xs text-muted">Can still toggle independently even if parent has no toggle</p>
        </div>
      </div>
    </div>
  </div>

  <h3>How Nested Theming Works</h3>
  <ul>
    <li><strong>Independent Control:</strong> Each <code>data-theme</code> section with a toggle can switch themes independently</li>
    <li><strong>Theme Inheritance:</strong> Sections without toggles inherit their parent's theme</li>
    <li><strong>Override Capability:</strong> A nested section's theme overrides its parent's theme when toggled</li>
    <li><strong>Unlimited Nesting:</strong> You can nest themed sections as deeply as needed</li>
  </ul>

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

  <CodeBlock language="svelte">{`{`<script>
  import ThemeToggle from '$lib/components/ThemeToggle/ThemeToggle.svelte';
</script>

<ThemeToggle />`}</CodeBlock>

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
