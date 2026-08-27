<!--
@component
ThemeToggle documentation page — standardized structure
-->
<script lang="ts">
import Button from "$lib/components/Button/Button.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import ThemeToggle from "$lib/components/ThemeToggle/ThemeToggle.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>ThemeToggle</h1>

  <p>
    <strong>ThemeToggle</strong> is a toggle button for switching between light and dark
    themes. The component automatically syncs with system preferences and persists the
    user's choice. It also supports nested theming for independent theme states in
    different sections.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A checkbox-based toggle that swaps the <code>data-theme</code> attribute and
    <code>dark</code> class on <code>&lt;html&gt;</code>. Supports localStorage
    persistence, system preference detection, and nested theming via <code>data-theme</code>
    on any ancestor element.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;ThemeToggle&gt;</code> whenever your app supports light/dark mode.
    Typically placed in the header or navigation bar. For color scheme switching beyond
    light/dark, use a custom theme selector.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>System preference detection</strong> — respects <code>prefers-color-scheme</code>.</li>
    <li><strong>Persistence</strong> — remembers user choice across sessions.</li>
    <li><strong>Nested theming</strong> — independent theme states for different sections.</li>
    <li><strong>Accessible</strong> — proper ARIA labels and keyboard support.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme">MDN — prefers-color-scheme</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/switch/">WAI-ARIA APG — Switch</a></li>
    <li><a href="https://primer.style/components/toggle-switch">Primer — ToggleSwitch</a></li>
    <li><a href="https://m3.material.io/styles/color/static-bright">Material Design 3 — Color</a></li>
    <li><a href="https://ant.design/components/switch">Ant Design — Switch</a></li>
  </ul>

  
<h2>Twintrinsic Implementation</h2>
<ul>
    <li>Toggles `data-theme` attribute on `&lt;html&gt;` for CSS-based theming</li>
    <li>Respects `prefers-color-scheme` media query as default</li>
    <li>Stores preference in `localStorage`</li>
    <li>`id` with `crypto.randomUUID()` default</li>
    <li>`...rest` spread for native attributes</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't use JS to toggle individual CSS properties — use `data-theme` + CSS custom properties</li>
    <li>Don't forget to respect system preference as the default</li>
</ul>

<h2>Related Components</h2>
<p>Container, Section</p>

<h2>Responsiveness</h2>
  <ul>
    <li>Compact toggle button; fits in any header or toolbar.</li>
    <li>Touch target meets 44×44 px minimum.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li>CSS classes via <code>class</code> prop.</li>
    <li>Nested theming via <code>data-theme</code> on ancestor elements.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Toggle</h3>
  <ExampleTabs code={`<ThemeToggle />`}>
    <div class="not-prose p-4 bg-surface rounded-lg border border-border flex justify-center" data-testid="theme-basic">
      <ThemeToggle />
    </div>
  </ExampleTabs>

  <h3>In Header Context</h3>
  <ExampleTabs code={`<div class="flex justify-end">
  <ThemeToggle />
</div>`}>
    <div class="not-prose p-4 bg-surface rounded-lg border border-border" data-testid="theme-header">
      <div class="flex justify-end">
        <ThemeToggle />
      </div>
    </div>
  </ExampleTabs>

  <h2>Features</h2>
  <ul>
    <li>Automatic system theme detection</li>
    <li>Smooth theme transitions</li>
    <li>Persistent theme selection via localStorage</li>
    <li>Nested theming support</li>
    <li>Prevents FOUC with inline initializer in <code>app.html</code></li>
  </ul>

  <h2>Setup</h2>
  <p>
    To prevent the light-mode flash (FOUC), add an inline initializer to your SvelteKit
    <code>app.html</code> before <code>%sveltekit.head%</code>:
  </p>

  <CodeBlock language="html">{`<meta name="color-scheme" content="light dark" />
\u003Cscript>
  try {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored ? stored === 'dark' : prefersDark;
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.classList.remove('dark');
    }
  } catch { /* ignore storage errors */ }
\u003C/script>`}</CodeBlock>

  <h2>Accessibility</h2>
  <ul>
    <li>Uses a native <code>&lt;input type="checkbox"&gt;</code> with <code>sr-only</code> class.</li>
    <li>Dynamic <code>aria-label</code> that updates based on current theme.</li>
    <li>Focus indicators on the toggle.</li>
    <li>High contrast sun/moon icons.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead><tr><th>Key</th><th>Function</th></tr></thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>Move focus to the toggle</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Toggle the theme</td></tr>
    </tbody>
  </table>
</Container>
