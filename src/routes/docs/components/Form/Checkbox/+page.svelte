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
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>Checkbox</h1>

<!-- ─── Description ───────────────────────────────────── -->
<p>
  <strong>Checkbox</strong> is a form control for toggling between two states
  (checked/unchecked) or three states (checked/unchecked/indeterminate). It wraps
  the native <code>&lt;input type="checkbox"&gt;</code> with consistent styling,
  labels, descriptions, and validation support.
</p>

<!-- ─── What / When / Why ─────────────────────────────── -->
<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A toggle control that lets the user select or deselect an option. Supports binary
  (on/off) and tri-state (on/off/partial) modes. The tri-state variant is useful for
  parent checkboxes that control a group of child checkboxes.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;Checkbox&gt;</code> for independent binary choices — "Remember me",
  "I agree to terms", "Enable feature X". For mutually exclusive choices (exactly one
  must be selected), use <code>&lt;Radio&gt;</code>. For on/off settings that take
  effect immediately, consider <code>&lt;Switch&gt;</code>.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Native features</strong> — the underlying <code>&lt;input type="checkbox"&gt;</code>
    provides built-in toggle behavior, form participation, and screen reader support.</li>
  <li><strong>Tri-state support</strong> — the indeterminate state is useful for
    "select all" patterns where some (but not all) children are checked.</li>
  <li><strong>Consistency</strong> — ensures all checkboxes across the app share the
    same styling, label positioning, and error display.</li>
</ul>

<h3>Sources</h3>
<ul>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/">WAI-ARIA APG — Checkbox</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox">MDN — checkbox input</a></li>
  <li><a href="https://primer.style/product/components/Checkbox">Primer — Checkbox</a></li>
  <li><a href="https://m3.material.io/components/checkbox/overview">Material Design 3 — Checkboxes</a></li>
  <li><a href="https://ant.design/components/checkbox">Ant Design — Checkbox</a></li>
</ul>

<!-- ─── Responsiveness ────────────────────────────────── -->

<h2>Twintrinsic Implementation</h2>
<ul>
    <li>Native `&lt;input type=&quot;checkbox&quot;&gt;` with custom wrapper styling</li>
    <li>Supports indeterminate state via JS `element.indeterminate = true`</li>
    <li>`accent-color` for brand-tinted checkbox appearance</li>
    <li>Form context integration via `getContext('form')` for `effectiveDisabled`</li>
    <li>`id` with `crypto.randomUUID()` default for label association</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't use `&lt;div onclick&gt;` — always `&lt;input type=&quot;checkbox&quot;&gt;` for form participation</li>
    <li>Don't forget `aria-describedby` for error messages</li>
    <li>Don't use for on/off settings — use Switch instead</li>
</ul>

<h2>Related Components</h2>
<p>Radio, RadioGroup, Switch, FormField</p>

<h2>Responsiveness</h2>
<ul>
  <li>Checkboxes are inline elements that wrap naturally within text or flex layouts.</li>
  <li>Touch targets meet 44×44 px minimum for mobile tap areas.</li>
  <li>Use <code>size</code> prop ("sm", "md", "lg") to adjust for different contexts.</li>
</ul>

<!-- ─── Customization ─────────────────────────────────── -->
<h2>Customization</h2>
<ul>
  <li>Size: <code>sm</code>, <code>md</code> (default), or <code>lg</code>.</li>
  <li>Add descriptive text below the label via the <code>description</code> prop.</li>
  <li>Use <code>accent-color</code> (set in <code>twintrinsic.css</code>) for brand-consistent check colors.</li>
  <li>Group checkboxes with <code>&lt;FormField&gt;</code> for shared labels and validation.</li>
</ul>

<!-- ─── Examples ──────────────────────────────────────── -->
<h2>Examples</h2>

<h3>Basic Usage</h3>
<ExampleTabs code={`<Checkbox label="Accept terms and conditions" />`}>
  <div class="max-w-md" data-testid="checkbox-basic">
    <Checkbox label="Accept terms and conditions" />
  </div>
</ExampleTabs>

<h3>With Description</h3>
<ExampleTabs code={`<Checkbox
  label="Subscribe to newsletter"
  description="Receive updates about new features and announcements"
/>`}>
  <div class="max-w-md" data-testid="checkbox-description">
    <Checkbox label="Subscribe to newsletter" description="Receive updates about new features and announcements" />
  </div>
</ExampleTabs>

<h3>Indeterminate State</h3>
<ExampleTabs code={`<Checkbox
  label="Select all items"
  indeterminate={true}
  description="Some items are selected"
/>`}>
  <div class="max-w-md" data-testid="checkbox-indeterminate">
    <Checkbox label="Select all items" indeterminate={true} description="Some items are selected" />
  </div>
</ExampleTabs>  <h3>Required</h3>
  <ExampleTabs code={`<Checkbox label="Accept terms" required={true} />`}>
    <div class="max-w-md" data-testid="checkbox-required">
      <Checkbox label="Accept terms" required={true} />
    </div>
  </ExampleTabs>

  <h3>Required with Error</h3>
<ExampleTabs code={`<Checkbox
  label="Accept privacy policy"
  error="You must accept the privacy policy"
  required={true}
/>`}>
  <div class="max-w-md" data-testid="checkbox-error">
    <Checkbox label="Accept privacy policy" error="You must accept the privacy policy" required={true} />
  </div>
</ExampleTabs>

<h3>Disabled States</h3>
<ExampleTabs code={`<Checkbox label="Unavailable option" disabled={true} description="This option is currently unavailable" />
<Checkbox label="Completed task" disabled={true} checked={true} description="This task has been completed" />`}>
  <div class="max-w-md flex flex-col gap-4" data-testid="checkbox-disabled">
    <Checkbox label="Unavailable option" disabled={true} description="This option is currently unavailable" />
    <Checkbox label="Completed task" disabled={true} checked={true} description="This task has been completed" />
  </div>
</ExampleTabs>

<h3>Checkbox Group</h3>
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
<h2>Slots</h2>
<p>
  The Checkbox component does not expose named slots. Use props for customization.
  For complex label content, use a raw <code>&lt;input type="checkbox"&gt;</code> with
  a <code>&lt;label&gt;</code>.
</p>

<!-- ─── Props ─────────────────────────────────────────── -->
<h2>Props</h2>
<PropsTable component={CheckboxModule} />

<!-- ─── Events ────────────────────────────────────────── -->
<h2>Events</h2>
<EventsTable component={CheckboxModule} />

<!-- ─── Accessibility ─────────────────────────────────── -->
<h2>Accessibility</h2>
<ul>
  <li>Uses native <code>&lt;input type="checkbox"&gt;</code> for maximum compatibility.</li>
  <li>Labels are properly associated via <code>for</code>/<code>id</code> attributes.</li>
  <li>Error messages linked via <code>aria-describedby</code>.</li>
  <li>Invalid states use <code>aria-invalid="true"</code>.</li>
  <li>Indeterminate state is set programmatically (not via HTML attribute).</li>
</ul>

<!-- ─── Keyboard Support ──────────────────────────────── -->
<h2>Keyboard Support</h2>
<table>
  <thead>
    <tr><th>Key</th><th>Function</th></tr>
  </thead>
  <tbody>
    <tr><td><kbd>Space</kbd></td><td>Toggle checkbox state</td></tr>
    <tr><td><kbd>Tab</kbd></td><td>Move focus to the checkbox</td></tr>
  </tbody>
</table>
</Container>
