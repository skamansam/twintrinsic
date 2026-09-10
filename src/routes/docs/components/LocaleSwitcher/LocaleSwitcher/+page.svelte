<!--
@component
LocaleSwitcher documentation page — standardized structure
-->
<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import LocaleSwitcher, * as LocaleSwitcherModule from "$lib/components/LocaleSwitcher/LocaleSwitcher.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>LocaleSwitcher</h1>

  <p>
    <strong>LocaleSwitcher</strong> is a language picker that switches the
    active <a href="https://paraglidejs.com">Paraglide</a> locale. It renders
    either a group of toggle buttons or a native <code>&lt;select&gt;</code>,
    and each language is shown in its own script (e.g. "Español", "فارسی") so
    every option stays readable no matter the active locale.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A small component backed by the Paraglide runtime's
    <code>getLocale</code>/<code>setLocale</code>. Switching a locale uses the
    cookie strategy (the same one this docs site uses), so the page reloads in
    the new locale and the server re-renders every message via
    <code>m()</code>. The <code>onchange</code> event reports the new locale if
    you need to react client-side.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Whenever your app uses Paraglide and needs a visible locale control — a
    header, settings page, or a floating demo-site pill like the one on this
    docs site. Pair it with <code>getTextDirection()</code> from the Paraglide
    runtime to flip the document direction for RTL languages.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Self-naming locales</strong> — each language names itself, so the control works before a message is even resolved.</li>
    <li><strong>Accessible</strong> — the button group uses the toggle-button pattern (<code>aria-pressed</code>) and the select is a native element.</li>
    <li><strong>Copy-friendly</strong> — it's a pattern component: drop it into your app, adjust the <code>locales</code> union, and it works with your Paraglide setup.</li>
  </ul>

  <h2>Paraglide Setup</h2>
  <p>
    LocaleSwitcher imports from <code>$lib/paraglide</code>, the output
    directory Paraglide generates. Wire the Vite plugin and a
    <code>project.inlang/settings.json</code> exactly like this repo:
  </p>

  <CodeBlock language="ts">{`// vite.config.ts
import { paraglideVitePlugin } from "@inlang/paraglide-js"

plugins: [
  // ...your other plugins
  paraglideVitePlugin({
    project: "./project.inlang",
    outdir: "./src/lib/paraglide",
  }),
]`}</CodeBlock>

  <CodeBlock language="json">{`// project.inlang/settings.json
{
  "modules": [
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-icu1@latest/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-m-function-matcher@2/dist/index.js"
  ],
  "plugin.inlang.icu-messageformat-1": {
    "pathPattern": "./messages/{locale}.json"
  },
  "baseLocale": "en",
  "locales": ["en", "es", "fa"]
}`}</CodeBlock>

  <p>
    Keep the <code>locales</code> in sync with your message files. The
    component's <code>LocaleCode</code> union should match them too.
  </p>

  <h2>Examples</h2>

  <h3>Buttons</h3>
  <ExampleTabs code={`<LocaleSwitcher />`}>
    <div class="flex justify-center" data-testid="locale-switcher-buttons">
      <LocaleSwitcher />
    </div>
  </ExampleTabs>

  <h3>Select</h3>
  <ExampleTabs code={`<LocaleSwitcher variant="select" />`}>
    <div class="flex justify-center" data-testid="locale-switcher-select">
      <LocaleSwitcher variant="select" />
    </div>
  </ExampleTabs>

  <h3>Custom Locales</h3>
  <ExampleTabs code={`<LocaleSwitcher locales={["en", "fa"]} />`}>
    <div class="flex justify-center" data-testid="locale-switcher-custom">
      <LocaleSwitcher locales={["en", "fa"]} />
    </div>
  </ExampleTabs>

  <h3>Custom Label</h3>
  <ExampleTabs code={`<LocaleSwitcher ariaLabel="Pick a language" />`}>
    <div class="flex justify-center" data-testid="locale-switcher-label">
      <LocaleSwitcher ariaLabel="Pick a language" />
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={LocaleSwitcherModule} />

  <h2>Events</h2>
  <EventsTable component={LocaleSwitcherModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>The button group exposes <code>role="group"</code> with an <code>aria-label</code>, and the active locale is marked with <code>aria-pressed</code> (toggle-button pattern).</li>
    <li>The select variant is a native <code>&lt;select&gt;</code> with a <code>label</code> and <code>aria-label</code>, so it works with any screen reader for free.</li>
    <li>Focus rings are visible on every control, and the group is a single keyboard tab stop (arrow keys move between buttons).</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead><tr><th>Key</th><th>Function</th></tr></thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>Focus the locale group or select</td></tr>
      <tr><td><kbd>→</kbd> / <kbd>↓</kbd></td><td>Move to the next locale button</td></tr>
      <tr><td><kbd>←</kbd> / <kbd>↑</kbd></td><td>Move to the previous locale button</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Activate the focused locale</td></tr>
    </tbody>
  </table>
</Container>