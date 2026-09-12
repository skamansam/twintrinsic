<!--
@component
Textarea documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Textarea from "$lib/components/Form/Textarea.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as TextareaModule from "$lib/components/Form/Textarea.svelte"
import Container from "$lib/components/Container/Container.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>{m.textarea_heading()}</h1>

<!-- ─── Description ───────────────────────────────────── -->
<p>
  <strong>{m.textarea_heading()}</strong>{m.textarea_lede_1()}<code>&lt;textarea&gt;</code>{m.textarea_lede_2()}
</p>

<!-- ─── What / When / Why ─────────────────────────────── -->
<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>
  {m.textarea_what_1()}<code>autoResize</code>{m.textarea_what_2()}<code>field-sizing: content</code>{m.textarea_what_3()}
</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.textarea_when_1()}<code>&lt;Textarea&gt;</code>{m.textarea_when_2()}<code>&lt;Input&gt;</code>{m.textarea_when_3()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.textarea_why_native()}</strong>{m.textarea_why_native_1()}<code>&lt;textarea&gt;</code>{m.textarea_why_native_2()}</li>
  <li><strong>{m.textarea_why_autogrow()}</strong>{m.textarea_why_autogrow_1()}<code>field-sizing: content</code>{m.textarea_why_autogrow_2()}</li>
  <li><strong>{m.textarea_why_consistency()}</strong>{m.textarea_why_consistency_desc()}</li>
</ul>

<h3>{m.sec_sources()}</h3>
<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea">MDN — &lt;textarea&gt;</a></li>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Forms</a></li>
  <li><a href="https://primer.style/product/components/Textarea">Primer — Textarea</a></li>
  <li><a href="https://m3.material.io/components/text-fields/overview">Material Design 3 — Text fields</a></li>
  <li><a href="https://ant.design/components/input">Ant Design — Input.TextArea</a></li>
</ul>

<h2>{m.sec_implementation()}</h2>
<ul>
    <li>{m.textarea_impl_1()}</li>
    <li>{m.textarea_impl_2()}</li>
    <li>{m.textarea_impl_3()}</li>
    <li>{m.textarea_impl_4()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
    <li>{m.textarea_mistake_1()}</li>
    <li>{m.textarea_mistake_2()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.textarea_related_1()}</p>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.textarea_responsive_1()}</li>
  <li>{m.textarea_responsive_2_1()}<code>resize</code>{m.textarea_responsive_2_2()}</li>
  <li>{m.textarea_responsive_3()}</li>
</ul>

<!-- ─── Customization ─────────────────────────────────── -->
<h2>{m.sec_customization()}</h2>
<ul>
  <li>{m.textarea_custom_1_1()}<code>rows</code>{m.textarea_custom_1_2()}</li>
  <li>{m.textarea_custom_2_1()}<code>autoResize={'{true}'}</code>{m.textarea_custom_2_2()}<code>field-sizing: content</code>{m.textarea_custom_2_3()}</li>
  <li>{m.textarea_custom_3_1()}<code>maxlength</code>{m.textarea_custom_3_2()}</li>
  <li>{m.textarea_custom_4_1()}<code>readonly</code>{m.textarea_custom_4_2()}</li>
  <li>{m.textarea_custom_5()}</li>
</ul>

<!-- ─── Examples ──────────────────────────────────────── -->
<h2>{m.sec_examples()}</h2>

<h3>{m.textarea_ex_basic()}</h3>
<ExampleTabs code={`<Textarea placeholder="Enter your message here" rows={3} />`}>
  <div class="max-w-md" data-testid="textarea-basic">
    <Textarea placeholder="Enter your message here" rows={3} />
  </div>
</ExampleTabs>

<h3>{m.textarea_ex_prefilled()}</h3>
<ExampleTabs code={`<Textarea value="This is a pre-filled textarea with some initial content." rows={3} />`}>
  <div class="max-w-md" data-testid="textarea-prefilled">
    <Textarea value="This is a pre-filled textarea with some initial content." rows={3} />
  </div>
</ExampleTabs>

<h3>{m.textarea_ex_autoresize()}</h3>
<ExampleTabs code={`<Textarea
  placeholder="This textarea will grow as you type..."
  autoResize={true}
  rows={2}
/>`}>
  <div class="max-w-md" data-testid="textarea-autoresize">
    <Textarea placeholder="This textarea will grow as you type..." autoResize={true} rows={2} />
  </div>
</ExampleTabs>

<h3>{m.textarea_ex_disabled()}</h3>
<ExampleTabs code={`<Textarea value="This textarea is disabled and cannot be edited." disabled={true} rows={3} />`}>
  <div class="max-w-md" data-testid="textarea-disabled">
    <Textarea value="This textarea is disabled and cannot be edited." disabled={true} rows={3} />
  </div>
</ExampleTabs>

<h3>{m.textarea_ex_readonly()}</h3>
<ExampleTabs code={`<Textarea
  value="This textarea is read-only but can still be focused and copied."
  readonly={true}
  rows={3}
/>`}>
  <div class="max-w-md" data-testid="textarea-readonly">
    <Textarea value="This textarea is read-only but can still be focused and copied." readonly={true} rows={3} />
  </div>
</ExampleTabs>

<h3>{m.textarea_ex_maxlength()}</h3>
<ExampleTabs code={`<Textarea placeholder="Maximum 100 characters allowed" maxlength="100" rows={3} />`}>
  <div class="max-w-md" data-testid="textarea-maxlength">
    <Textarea placeholder="Maximum 100 characters allowed" maxlength="100" rows={3} />
  </div>
</ExampleTabs>

<h3>{m.textarea_ex_required()}</h3>
<ExampleTabs code={`<Textarea placeholder="This field is required" required={true} rows={3} />`}>
  <div class="max-w-md" data-testid="textarea-required">
    <Textarea placeholder="This field is required" required={true} rows={3} />
  </div>
</ExampleTabs>

<!-- ─── Slots ─────────────────────────────────────────── -->
<h2>{m.sec_slots()}</h2>
<p>{m.textarea_slot_none()}</p>

<!-- ─── Props ─────────────────────────────────────────── -->
<h2>{m.sec_props()}</h2>
<PropsTable component={TextareaModule} />

<!-- ─── Events ────────────────────────────────────────── -->
<h2>{m.sec_events()}</h2>
<EventsTable component={TextareaModule} />

<!-- ─── Accessibility ─────────────────────────────────── -->
<h2>{m.sec_accessibility()}</h2>
<ul>
  <li>{m.textarea_a11y_1()}</li>
  <li>{m.textarea_a11y_2()}</li>
  <li>{m.textarea_a11y_3_1()}<code>for</code>/<code>id</code>{m.textarea_a11y_3_2()}</li>
  <li>{m.textarea_a11y_4_1()}<code>aria-describedby</code>{m.textarea_a11y_4_2()}</li>
  <li>{m.textarea_a11y_5()}</li>
  <li>{m.textarea_a11y_6_1()}<code>required</code>{m.textarea_a11y_6_2()}<code>maxlength</code>{m.textarea_a11y_6_3()}</li>
</ul>

<!-- ─── Keyboard Support ──────────────────────────────── -->
<h2>{m.sec_keyboard()}</h2>
<table>
  <thead>
    <tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr>
  </thead>
  <tbody>
    <tr><td><kbd>Tab</kbd></td><td>{m.textarea_kb_tab()}</td></tr>
    <tr><td><kbd>Enter</kbd></td><td>{m.textarea_kb_enter()}</td></tr>
    <tr><td><kbd>Ctrl+Enter</kbd></td><td>{m.textarea_kb_ctrl_enter()}</td></tr>
  </tbody>
</table>
</Container>
