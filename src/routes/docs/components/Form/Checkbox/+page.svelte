<!--
@component
Checkbox documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Checkbox from "$lib/components/Form/Checkbox.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as CheckboxModule from "$lib/components/Form/Checkbox.svelte"
import Container from "$lib/components/Container/Container.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>{m.checkbox_heading()}</h1>

<!-- ─── Description ───────────────────────────────────── -->
<p>
  <strong>{m.checkbox_heading()}</strong>{m.checkbox_lede_1()}<code>&lt;input type="checkbox"&gt;</code>{m.checkbox_lede_2()}
</p>

<!-- ─── What / When / Why ─────────────────────────────── -->
<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>{m.checkbox_what_1()}</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.checkbox_when_1()}<code>&lt;Checkbox&gt;</code>{m.checkbox_when_2()}<code>&lt;Radio&gt;</code>{m.checkbox_when_3()}<code>&lt;Switch&gt;</code>{m.checkbox_when_4()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.checkbox_why_native()}</strong>{m.checkbox_why_native_1()}<code>&lt;input type="checkbox"&gt;</code>{m.checkbox_why_native_2()}</li>
  <li><strong>{m.checkbox_why_tristate()}</strong>{m.checkbox_why_tristate_1()}</li>
  <li><strong>{m.checkbox_why_consistency()}</strong>{m.checkbox_why_consistency_desc()}</li>
</ul>

<h3>{m.sec_sources()}</h3>
<ul>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/">WAI-ARIA APG — Checkbox</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox">MDN — checkbox input</a></li>
  <li><a href="https://primer.style/product/components/Checkbox">Primer — Checkbox</a></li>
  <li><a href="https://m3.material.io/components/checkbox/overview">Material Design 3 — Checkboxes</a></li>
  <li><a href="https://ant.design/components/checkbox">Ant Design — Checkbox</a></li>
</ul>

<h2>{m.sec_implementation()}</h2>
<ul>
    <li>{m.checkbox_impl_1()}</li>
    <li>{m.checkbox_impl_2()}</li>
    <li>{m.checkbox_impl_3()}</li>
    <li>{m.checkbox_impl_4()}</li>
    <li>{m.checkbox_impl_5()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
    <li>{m.checkbox_mistake_1()}</li>
    <li>{m.checkbox_mistake_2()}</li>
    <li>{m.checkbox_mistake_3()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.checkbox_related_1()}</p>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.checkbox_responsive_1()}</li>
  <li>{m.checkbox_responsive_2()}</li>
  <li>{m.checkbox_responsive_3_1()}<code>size</code>{m.checkbox_responsive_3_2()}</li>
</ul>

<!-- ─── Customization ─────────────────────────────────── -->
<h2>{m.sec_customization()}</h2>
<ul>
  <li>{m.checkbox_custom_1_1()}<code>sm</code>, <code>md</code>{m.checkbox_custom_1_2()}<code>lg</code>{m.checkbox_custom_1_3()}</li>
  <li>{m.checkbox_custom_2_1()}<code>description</code>{m.checkbox_custom_2_2()}</li>
  <li>{m.checkbox_custom_3_1()}<code>accent-color</code>{m.checkbox_custom_3_2()}<code>twintrinsic.css</code>{m.checkbox_custom_3_3()}</li>
  <li>{m.checkbox_custom_4_1()}<code>&lt;FormField&gt;</code>{m.checkbox_custom_4_2()}</li>
</ul>

<!-- ─── Examples ──────────────────────────────────────── -->
<h2>{m.sec_examples()}</h2>

<h3>{m.checkbox_ex_basic()}</h3>
<ExampleTabs code={`<Checkbox label="Accept terms and conditions" />`}>
  <div class="max-w-md" data-testid="checkbox-basic">
    <Checkbox label="Accept terms and conditions" />
  </div>
</ExampleTabs>

<h3>{m.checkbox_ex_description()}</h3>
<ExampleTabs code={`<Checkbox
  label="Subscribe to newsletter"
  description="Receive updates about new features and announcements"
/>`}>
  <div class="max-w-md" data-testid="checkbox-description">
    <Checkbox label="Subscribe to newsletter" description="Receive updates about new features and announcements" />
  </div>
</ExampleTabs>

<h3>{m.checkbox_ex_indeterminate()}</h3>
<ExampleTabs code={`<Checkbox
  label="Select all items"
  indeterminate={true}
  description="Some items are selected"
/>`}>
  <div class="max-w-md" data-testid="checkbox-indeterminate">
    <Checkbox label="Select all items" indeterminate={true} description="Some items are selected" />
  </div>
</ExampleTabs>

<h3>{m.checkbox_ex_required()}</h3>
<ExampleTabs code={`<Checkbox label="Accept terms" required={true} />`}>
  <div class="max-w-md" data-testid="checkbox-required">
    <Checkbox label="Accept terms" required={true} />
  </div>
</ExampleTabs>

<h3>{m.checkbox_ex_required_error()}</h3>
<ExampleTabs code={`<Checkbox
  label="Accept privacy policy"
  error="You must accept the privacy policy"
  required={true}
/>`}>
  <div class="max-w-md" data-testid="checkbox-error">
    <Checkbox label="Accept privacy policy" error="You must accept the privacy policy" required={true} />
  </div>
</ExampleTabs>

<h3>{m.checkbox_ex_disabled()}</h3>
<ExampleTabs code={`<Checkbox label="Unavailable option" disabled={true} description="This option is currently unavailable" />
<Checkbox label="Completed task" disabled={true} checked={true} description="This task has been completed" />`}>
  <div class="max-w-md flex flex-col gap-4" data-testid="checkbox-disabled">
    <Checkbox label="Unavailable option" disabled={true} description="This option is currently unavailable" />
    <Checkbox label="Completed task" disabled={true} checked={true} description="This task has been completed" />
  </div>
</ExampleTabs>

<h3>{m.checkbox_ex_group()}</h3>
<ExampleTabs code={`<div class="flex flex-col gap-2">
  <Checkbox label="Email notifications" name="notifications" value="email" />
  <Checkbox label="SMS notifications" name="notifications" value="sms" />
  <Checkbox label="Push notifications" name="notifications" value="push" />
</div>`}>
  <div class="max-w-md flex flex-col gap-2" data-testid="checkbox-group">
    <Checkbox label="Email notifications" name="notifications" value="email" />
    <Checkbox label="SMS notifications" name="notifications" value="sms" />
    <Checkbox label="Push notifications" name="notifications" value="push" />
  </div>
</ExampleTabs>

<!-- ─── Slots ─────────────────────────────────────────── -->
<h2>{m.sec_slots()}</h2>
<p>
  {m.checkbox_slot_none_1()}<code>&lt;input type="checkbox"&gt;</code>{m.checkbox_slot_none_2()}<code>&lt;label&gt;</code>{m.checkbox_slot_none_3()}
</p>

<!-- ─── Props ─────────────────────────────────────────── -->
<h2>{m.sec_props()}</h2>
<PropsTable component={CheckboxModule} />

<!-- ─── Events ────────────────────────────────────────── -->
<h2>{m.sec_events()}</h2>
<EventsTable component={CheckboxModule} />

<!-- ─── Accessibility ─────────────────────────────────── -->
<h2>{m.sec_accessibility()}</h2>
<ul>
  <li>{m.checkbox_a11y_1_1()}<code>&lt;input type="checkbox"&gt;</code>{m.checkbox_a11y_1_2()}</li>
  <li>{m.checkbox_a11y_2_1()}<code>for</code>/<code>id</code>{m.checkbox_a11y_2_2()}</li>
  <li>{m.checkbox_a11y_3_1()}<code>aria-describedby</code>{m.checkbox_a11y_3_2()}</li>
  <li>{m.checkbox_a11y_4_1()}<code>aria-invalid="true"</code>{m.checkbox_a11y_4_2()}</li>
  <li>{m.checkbox_a11y_5()}</li>
</ul>

<!-- ─── Keyboard Support ──────────────────────────────── -->
<h2>{m.sec_keyboard()}</h2>
<table>
  <thead>
    <tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr>
  </thead>
  <tbody>
    <tr><td><kbd>Space</kbd></td><td>{m.checkbox_kb_space()}</td></tr>
    <tr><td><kbd>Tab</kbd></td><td>{m.checkbox_kb_tab()}</td></tr>
  </tbody>
</table>
</Container>
