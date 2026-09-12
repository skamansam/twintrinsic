<!--
@component
Switch documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Switch from "$lib/components/Form/Switch.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as SwitchModule from "$lib/components/Form/Switch.svelte"
import Container from "$lib/components/Container/Container.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>{m.switch_heading()}</h1>

<!-- ─── Description ───────────────────────────────────── -->
<p>
  <strong>{m.switch_heading()}</strong>{m.switch_lede_1()}
</p>

<!-- ─── What / When / Why ─────────────────────────────── -->
<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>{m.switch_what_1()}</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.switch_when_1()}<code>&lt;Switch&gt;</code>{m.switch_when_2()}<code>&lt;Checkbox&gt;</code>{m.switch_when_3()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.switch_why_semantics()}</strong>{m.switch_why_semantics_1()}</li>
  <li><strong>{m.switch_why_visual()}</strong>{m.switch_why_visual_1()}</li>
  <li><strong>{m.switch_why_platform()}</strong>{m.switch_why_platform_1()}</li>
</ul>

<h3>{m.sec_sources()}</h3>
<ul>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/switch/">WAI-ARIA APG — Switch</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/switch_role">MDN — switch role</a></li>
  <li><a href="https://primer.style/product/components/ToggleSwitch">Primer — ToggleSwitch</a></li>
  <li><a href="https://m3.material.io/components/switch/overview">Material Design 3 — Switches</a></li>
  <li><a href="https://ant.design/components/switch">Ant Design — Switch</a></li>
</ul>

<!-- ─── Responsiveness ────────────────────────────────── -->

<h2>{m.sec_implementation()}</h2>
<ul>
    <li>{m.switch_impl_1()}</li>
    <li>{m.switch_impl_2()}</li>
    <li>{m.switch_impl_3()}</li>
    <li>{m.switch_impl_4()}</li>
    <li>{m.switch_impl_5()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
    <li>{m.switch_mistake_1()}</li>
    <li>{m.switch_mistake_2()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.switch_related_1()}</p>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.switch_responsive_1()}</li>
  <li>{m.switch_responsive_2()}</li>
  <li>{m.switch_responsive_3_1()}<code>size</code>{m.switch_responsive_3_2()}</li>
</ul>

<!-- ─── Customization ─────────────────────────────────── -->
<h2>{m.sec_customization()}</h2>
<ul>
  <li>{m.switch_custom_1_1()}<code>sm</code>, <code>md</code>{m.switch_custom_1_2()}<code>lg</code>{m.switch_custom_1_3()}</li>
  <li>{m.switch_custom_2_1()}<code>ariaLabel</code>{m.switch_custom_2_2()}</li>
  <li>{m.switch_custom_3()}</li>
</ul>

<!-- ─── Examples ──────────────────────────────────────── -->
<h2>{m.sec_examples()}</h2>

<h3>{m.switch_ex_basic()}</h3>
<ExampleTabs code={`<Switch label="Enable notifications" />`}>
  <div class="max-w-md" data-testid="switch-basic">
    <Switch label="Enable notifications" />
  </div>
</ExampleTabs>

<h3>{m.switch_ex_initial()}</h3>
<ExampleTabs code={`<Switch label="Dark mode" checked={true} />`}>
  <div class="max-w-md" data-testid="switch-initial">
    <Switch label="Dark mode" checked={true} />
  </div>
</ExampleTabs>

<h3>{m.switch_ex_sizes()}</h3>
<ExampleTabs code={`<Switch label="Small" size="sm" />
<Switch label="Medium (default)" size="md" />
<Switch label="Large" size="lg" />`}>
  <div class="max-w-md flex flex-col gap-4" data-testid="switch-sizes">
    <Switch label="Small" size="sm" />
    <Switch label="Medium (default)" size="md" />
    <Switch label="Large" size="lg" />
  </div>
</ExampleTabs>

<h3>{m.switch_ex_disabled()}</h3>
<ExampleTabs code={`<Switch label="Disabled (off)" disabled={true} />
<Switch label="Disabled (on)" checked={true} disabled={true} />`}>
  <div class="max-w-md flex flex-col gap-4" data-testid="switch-disabled">
    <Switch label="Disabled (off)" disabled={true} />
    <Switch label="Disabled (on)" checked={true} disabled={true} />
  </div>
</ExampleTabs>

<h3>{m.switch_ex_required()}</h3>
<ExampleTabs code={`<Switch label="I agree to the terms" required={true} />`}>
  <div class="max-w-md" data-testid="switch-required">
    <Switch label="I agree to the terms" required={true} />
  </div>
</ExampleTabs>

<h3>{m.switch_ex_nolabel()}</h3>
<ExampleTabs code={`<div class="flex items-center gap-2">
  <span>Airplane mode</span>
  <Switch ariaLabel="Toggle airplane mode" />
</div>`}>
  <div class="max-w-md flex items-center gap-2" data-testid="switch-no-label">
    <span>Airplane mode</span>
    <Switch ariaLabel="Toggle airplane mode" />
  </div>
</ExampleTabs>

<!-- ─── Slots ─────────────────────────────────────────── -->
<h2>{m.sec_slots()}</h2>
<p>{m.switch_slot_none()}</p>

<!-- ─── Props ─────────────────────────────────────────── -->
<h2>{m.sec_props()}</h2>
<PropsTable component={SwitchModule} />

<!-- ─── Events ────────────────────────────────────────── -->
<h2>{m.sec_events()}</h2>
<EventsTable component={SwitchModule} />

<!-- ─── Accessibility ─────────────────────────────────── -->
<h2>{m.sec_accessibility()}</h2>
<ul>
  <li>{m.switch_a11y_1_1()}<code>&lt;input type="checkbox" role="switch"&gt;</code>{m.switch_a11y_1_2()}</li>
  <li>{m.switch_a11y_2()}</li>
  <li>{m.switch_a11y_3()}</li>
  <li>{m.switch_a11y_4_1()}<code>for</code>/<code>id</code>{m.switch_a11y_4_2()}</li>
  <li>{m.switch_a11y_5()}</li>
</ul>

<!-- ─── Keyboard Support ──────────────────────────────── -->
<h2>{m.sec_keyboard()}</h2>
<table>
  <thead>
    <tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr>
  </thead>
  <tbody>
    <tr><td><kbd>Space</kbd></td><td>{m.switch_kb_space()}</td></tr>
    <tr><td><kbd>Enter</kbd></td><td>{m.switch_kb_enter()}</td></tr>
    <tr><td><kbd>Tab</kbd></td><td>{m.switch_kb_tab()}</td></tr>
  </tbody>
</table>
</Container>
