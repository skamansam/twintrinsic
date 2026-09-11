<!--
@component
Splitter documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Splitter from "$lib/components/Splitter/Splitter.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as SplitterModule from "$lib/components/Splitter/Splitter.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.splitter_heading()}</h1>

  <p>
    <strong>{m.splitter_heading()}</strong>{m.splitter_intro_1()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.splitter_what_1()}<a href="https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/">W3C APG window-splitter pattern</a>{m.splitter_what_1b()}<code>role="separator"</code>{m.splitter_what_2()}<code>tabindex="0"</code>{m.splitter_what_3()}<code>aria-valuenow/min/max</code>{m.splitter_what_4()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.splitter_when_1()}<code>&lt;Splitter&gt;</code>{m.splitter_when_2()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.splitter_why_control()}</strong> — {m.splitter_why_control_desc()}</li>
    <li><strong>{m.splitter_why_keyboard()}</strong> — {m.splitter_why_keyboard_desc()}</li>
    <li><strong>{m.splitter_why_persistent()}</strong> — <code>storageKey</code>{m.splitter_why_persistent_desc()}</li>
    <li><strong>{m.splitter_why_constrained()}</strong> — {m.splitter_why_constrained_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/">WAI-ARIA APG — Window Splitter</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range">MDN — Range input</a></li>
    <li><a href="https://m3.material.io/foundations/layout/applying-layout/window">Material Design 3 — Window</a></li>
    <li><a href="https://ant.design/components/splitter">Ant Design — Splitter</a></li>
    <li><a href="https://primer.style/components/split-page-layout">Primer — SplitPageLayout</a></li>
  </ul>

  <h2>{m.sec_implementation()}</h2>
  <ul>
    <li>{m.splitter_impl_1()}</li>
    <li>{m.splitter_impl_2()}</li>
    <li>{m.splitter_impl_3()}</li>
    <li>{m.splitter_impl_4()}</li>
  </ul>

  <h2>{m.sec_mistakes()}</h2>
  <ul>
    <li>{m.splitter_mistake_1()}</li>
    <li>{m.splitter_mistake_2()}</li>
  </ul>

  <h2>{m.sec_related()}</h2>
  <p>Container, Section, Card</p>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.splitter_responsive_1()}</li>
    <li>{m.splitter_responsive_2()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li><code>orientation</code>{m.splitter_custom_1()}<code>"horizontal"</code>{m.splitter_custom_1_2()}<code>"vertical"</code>{m.splitter_custom_1_3()}</li>
    <li><code>initialSize</code>{m.splitter_custom_2()}</li>
    <li><code>minSize</code>{m.splitter_custom_3_1()}<code>maxSize</code>{m.splitter_custom_3_2()}</li>
    <li><code>storageKey</code>{m.splitter_custom_4()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.splitter_ex_horizontal()}</h3>
  <ExampleTabs code={`<Splitter orientation="horizontal" initialSize={50}>
  {#snippet first()}
    <div class="p-4">Left Panel</div>
  {/snippet}
  {#snippet second()}
    <div class="p-4">Right Panel</div>
  {/snippet}
</Splitter>`}>
    <div class="border border-border rounded-md overflow-hidden" style="height: 300px;" data-testid="splitter-horizontal">
      <Splitter orientation="horizontal" initialSize={50}>
        {#snippet first()}
          <div class="bg-primary-100 dark:bg-primary-900 p-4 h-full overflow-auto">
            <h3 class="font-bold mb-2 font-mono text-sm">&lt;script&gt;</h3>
            <p class="font-mono text-xs">import&#123; Button &#125; from "twintrinsic"<br />let count = $state(0)</p>
          </div>
        {/snippet}
        {#snippet second()}
          <div class="bg-secondary-100 dark:bg-secondary-900 p-4 h-full overflow-auto">
            <h3 class="font-bold mb-2">Live preview</h3>
            <p>The component renders here as you edit the code on the left.</p>
          </div>
        {/snippet}
      </Splitter>
    </div>
  </ExampleTabs>

  <h3>{m.splitter_ex_vertical()}</h3>
  <ExampleTabs code={`<Splitter orientation="vertical" initialSize={50}>
  {#snippet first()}
    <div class="p-4">Top content</div>
  {/snippet}
  {#snippet second()}
    <div class="p-4">Bottom content</div>
  {/snippet}
</Splitter>`}>
    <div class="border border-border rounded-md overflow-hidden" style="height: 300px;" data-testid="splitter-vertical">
      <Splitter orientation="vertical" initialSize={50}>
        {#snippet first()}
          <div class="bg-primary-100 dark:bg-primary-900 p-4 h-full overflow-auto">
            <h3 class="font-bold mb-2">Inbox</h3>
            <p>Today's emails and meeting reminders.</p>
          </div>
        {/snippet}
        {#snippet second()}
          <div class="bg-secondary-100 dark:bg-secondary-900 p-4 h-full overflow-auto">
            <h3 class="font-bold mb-2">Message preview</h3>
            <p>The selected email body appears here.</p>
          </div>
        {/snippet}
      </Splitter>
    </div>
  </ExampleTabs>

  <h2>{m.sec_slots()}</h2>
  <table>
    <thead><tr><th>{m.sec_slot()}</th><th>{m.sec_description()}</th></tr></thead>
    <tbody>
      <tr><td><code>first</code></td><td>{m.splitter_slot_first()}</td></tr>
      <tr><td><code>second</code></td><td>{m.splitter_slot_second()}</td></tr>
    </tbody>
  </table>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={SplitterModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.splitter_a11y_1_1()}<code>role="separator"</code>{m.splitter_a11y_1_2()}<code>tabindex="0"</code>{m.splitter_a11y_1_3()}</li>
    <li><code>aria-valuenow</code>{m.splitter_a11y_2_1()}<code>aria-valuemin</code>{m.splitter_a11y_2_2()}<code>aria-valuemax</code>{m.splitter_a11y_2_3()}</li>
    <li><code>aria-orientation</code>{m.splitter_a11y_3_1()}<code>orientation</code>{m.splitter_a11y_3_2()}</li>
    <li>{m.splitter_a11y_4()}</li>
    <li>{m.splitter_a11y_5_1()}<a href="https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/">W3C APG window-splitter pattern</a>{m.splitter_a11y_5_2()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
    <tbody>
      <tr><td><kbd>Arrow Left</kbd> / <kbd>Arrow Up</kbd></td><td>{m.splitter_kb_1()}</td></tr>
      <tr><td><kbd>Arrow Right</kbd> / <kbd>Arrow Down</kbd></td><td>{m.splitter_kb_2()}</td></tr>
      <tr><td><kbd>Home</kbd></td><td>{m.splitter_kb_3()}</td></tr>
      <tr><td><kbd>End</kbd></td><td>{m.splitter_kb_4()}</td></tr>
    </tbody>
  </table>
</Container>
