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
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.themetoggle_heading()}</h1>

  <p>
    <strong>{m.themetoggle_heading()}</strong>{m.themetoggle_intro_1()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.themetoggle_what_1()}<code>data-theme</code>{m.themetoggle_what_2()}<code>dark</code>{m.themetoggle_what_3()}<code>&lt;html&gt;</code>{m.themetoggle_what_4()}<code>data-theme</code>{m.themetoggle_what_5()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.themetoggle_when_1()}<code>&lt;ThemeToggle&gt;</code>{m.themetoggle_when_2()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.themetoggle_why_system()}</strong> — {m.themetoggle_why_system_desc_1()}<code>prefers-color-scheme</code>{m.themetoggle_why_system_desc_2()}</li>
    <li><strong>{m.themetoggle_why_persistence()}</strong> — {m.themetoggle_why_persistence_desc()}</li>
    <li><strong>{m.themetoggle_why_a11y()}</strong> — {m.themetoggle_why_a11y_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme">MDN — prefers-color-scheme</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/switch/">WAI-ARIA APG — Switch</a></li>
    <li><a href="https://primer.style/components/toggle-switch">Primer — ToggleSwitch</a></li>
    <li><a href="https://m3.material.io/styles/color/static-bright">Material Design 3 — Color</a></li>
    <li><a href="https://ant.design/components/switch">Ant Design — Switch</a></li>
  </ul>

<h2>{m.sec_implementation()}</h2>
<ul>
    <li>{m.themetoggle_impl_1()}</li>
    <li>{m.themetoggle_impl_2()}</li>
    <li>{m.themetoggle_impl_3()}</li>
    <li>{m.themetoggle_impl_4()}</li>
    <li>{m.themetoggle_impl_5()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
    <li>{m.themetoggle_mistake_1()}</li>
    <li>{m.themetoggle_mistake_2()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>Container, Section</p>

<h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.themetoggle_responsive_1()}</li>
    <li>{m.themetoggle_responsive_2()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.themetoggle_custom_1()}<code>class</code>{m.themetoggle_custom_2()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.themetoggle_ex_basic()}</h3>
  <ExampleTabs code={`<ThemeToggle />`}>
    <div class="not-prose p-4 bg-surface rounded-lg border border-border flex justify-center" data-testid="theme-basic">
      <ThemeToggle />
    </div>
  </ExampleTabs>

  <h3>{m.themetoggle_ex_header()}</h3>
  <ExampleTabs code={`<div class="flex justify-end">
  <ThemeToggle />
</div>`}>
    <div class="not-prose p-4 bg-surface rounded-lg border border-border" data-testid="theme-header">
      <div class="flex justify-end">
        <ThemeToggle />
      </div>
    </div>
  </ExampleTabs>

  <h2>{m.sec_features()}</h2>
  <ul>
    <li>{m.themetoggle_feature_1()}</li>
    <li>{m.themetoggle_feature_2()}</li>
    <li>{m.themetoggle_feature_3()}</li>
    <li>{m.themetoggle_feature_4_1()}<code>app.html</code>{m.themetoggle_feature_4_2()}</li>
  </ul>

  <h2>{m.sec_setup()}</h2>
  <p>
    {m.themetoggle_setup_1()}<code>app.html</code>{m.themetoggle_setup_2()}<code>%sveltekit.head%</code>{m.themetoggle_setup_3()}
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

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.themetoggle_a11y_1_1()}<code>&lt;input type="checkbox"&gt;</code>{m.themetoggle_a11y_1_2()}<code>sr-only</code>{m.themetoggle_a11y_1_3()}</li>
    <li>{m.themetoggle_a11y_2_1()}<code>aria-label</code>{m.themetoggle_a11y_2_2()}</li>
    <li>{m.themetoggle_a11y_3()}</li>
    <li>{m.themetoggle_a11y_4()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>{m.themetoggle_kb_1()}</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.themetoggle_kb_2()}</td></tr>
    </tbody>
  </table>
</Container>
