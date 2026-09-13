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
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.locale_heading()}</h1>

  <p>
    <strong>{m.locale_heading()}</strong>{m.locale_intro_1()}<a href="https://paraglidejs.com">Paraglide</a>{m.locale_intro_2()}<code>&lt;select&gt;</code>{m.locale_intro_3()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.locale_what_1()}<code>getLocale</code>{m.locale_what_2()}<code>setLocale</code>{m.locale_what_3()}<code>m()</code>{m.locale_what_4()}<code>onchange</code>{m.locale_what_5()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.locale_when_1()}<code>getTextDirection()</code>{m.locale_when_2()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.locale_why_selfnaming()}</strong>{m.locale_why_selfnaming_desc()}</li>
    <li><strong>{m.locale_why_accessible()}</strong>{m.locale_why_accessible_1()}<code>aria-pressed</code>{m.locale_why_accessible_2()}</li>
    <li><strong>{m.locale_why_copy()}</strong>{m.locale_why_copy_1()}<code>locales</code>{m.locale_why_copy_2()}</li>
  </ul>

  <h2>{m.locale_setup()}</h2>
  <p>
    {m.locale_setup_1()}<code>$lib/paraglide</code>{m.locale_setup_2()}<code>project.inlang/settings.json</code>{m.locale_setup_3()}
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
    {m.locale_setup_sync()}
  </p>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.locale_ex_buttons()}</h3>
  <ExampleTabs code={`<LocaleSwitcher />`}>
    <div class="flex justify-center" data-testid="locale-switcher-buttons">
      <LocaleSwitcher />
    </div>
  </ExampleTabs>

  <h3>{m.locale_ex_select()}</h3>
  <ExampleTabs code={`<LocaleSwitcher variant="select" />`}>
    <div class="flex justify-center" data-testid="locale-switcher-select">
      <LocaleSwitcher variant="select" />
    </div>
  </ExampleTabs>

  <h3>{m.locale_ex_custom()}</h3>
  <ExampleTabs code={`<LocaleSwitcher locales={["en", "fa"]} />`}>
    <div class="flex justify-center" data-testid="locale-switcher-custom">
      <LocaleSwitcher locales={["en", "fa"]} />
    </div>
  </ExampleTabs>

  <h3>{m.locale_ex_label()}</h3>
  <ExampleTabs code={`<LocaleSwitcher ariaLabel="Pick a language" />`}>
    <div class="flex justify-center" data-testid="locale-switcher-label">
      <LocaleSwitcher ariaLabel="Pick a language" />
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={LocaleSwitcherModule} />

  <h2>{m.sec_events()}</h2>
  <EventsTable component={LocaleSwitcherModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.locale_a11y_1()}<code>role="group"</code>{m.locale_a11y_2()}<code>aria-label</code>{m.locale_a11y_3()}<code>aria-pressed</code>{m.locale_a11y_4()}</li>
    <li>{m.locale_a11y_5()}<code>&lt;select&gt;</code>{m.locale_a11y_6()}<code>label</code>{m.locale_a11y_7()}<code>aria-label</code>{m.locale_a11y_8()}</li>
    <li>{m.locale_a11y_9()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>{m.locale_kb_1()}</td></tr>
      <tr><td><kbd>→</kbd> / <kbd>↓</kbd></td><td>{m.locale_kb_2()}</td></tr>
      <tr><td><kbd>←</kbd> / <kbd>↑</kbd></td><td>{m.locale_kb_3()}</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.locale_kb_4()}</td></tr>
    </tbody>
  </table>
</Container>
