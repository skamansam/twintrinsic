<!--
@component
Input documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Input from "$lib/components/Form/Input.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as InputModule from "$lib/components/Form/Input.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<h1>Input</h1>

<!-- ─── Description ───────────────────────────────────── -->
<p>
  <strong>Input</strong> is a versatile single-line text form control that supports
  labels, placeholders, validation states, floating labels, input masking, and icon
  integration. It wraps the native <code>&lt;input&gt;</code> element with consistent
  styling and accessibility enhancements.
</p>

<!-- ─── What / When / Why ─────────────────────────────── -->
<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A form field for collecting short text data — names, emails, phone numbers, search
  queries, and more. Supports all standard <code>&lt;input&gt;</code> types
  (<code>text</code>, <code>email</code>, <code>tel</code>, <code>url</code>,
  <code>password</code>, <code>search</code>, etc.) with added features like
  floating labels and input masks.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;Input&gt;</code> for any form field that expects a single line of text.
  For multi-line text, use <code>&lt;Textarea&gt;</code>. For numeric-only input, use
  <code>&lt;NumberInput&gt;</code>. For selecting from a list, use
  <code>&lt;Select&gt;</code> or <code>&lt;Combobox&gt;</code>.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Native features</strong> — the underlying <code>&lt;input&gt;</code>
    provides built-in validation, autocomplete, mobile keyboard types, and screen
    reader support for free.</li>
  <li><strong>Consistency</strong> — ensures all text inputs across the app share the
    same label positioning, error display, and focus styling.</li>
  <li><strong>Accessibility</strong> — wraps native input with proper
    <code>&lt;label&gt;</code> association, <code>aria-describedby</code> for error
    messages, and <code>aria-invalid</code> for validation states.</li>
</ul>

<h3>Sources</h3>
<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input">MDN — &lt;input&gt;</a></li>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Forms</a></li>
  <li><a href="https://primer.style/product/components/TextInput">Primer — TextInput</a></li>
  <li><a href="https://m3.material.io/components/text-fields/overview">Material Design 3 — Text fields</a></li>
  <li><a href="https://ant.design/components/input">Ant Design — Input</a></li>
</ul>

<!-- ─── Responsiveness ────────────────────────────────── -->
<h2>Responsiveness</h2>
<ul>
  <li>The input fills its container width by default (<code>w-full</code>).</li>
  <li>On mobile, <code>type="tel"</code> shows a numeric keypad;
    <code>type="email"</code> shows the email keyboard.</li>
  <li>Touch targets meet 44×44 px minimum for mobile tap areas.</li>
</ul>

<!-- ─── Customization ─────────────────────────────────── -->
<h2>Customization</h2>
<ul>
  <li>Set the input type via the <code>type</code> prop for appropriate mobile keyboards.</li>
  <li>Use <code>floating={true}</code> for a label that animates above the input when focused.</li>
  <li>Add left/right icons via <code>leftIcon</code> and <code>rightIcon</code> props.</li>
  <li>Apply input masks for formatted input (phone, date, credit card).</li>
  <li>Theme colors and borders are controlled by the Tailwind theme.</li>
</ul>

<!-- ─── Examples ──────────────────────────────────────── -->
<h2>Examples</h2>

<h3>Basic Usage</h3>
<ExampleTabs code={`<Input label="Username" placeholder="Enter username" />`}>
  <div class="max-w-md" data-testid="input-basic">
    <Input label="Username" placeholder="Enter username" />
  </div>
</ExampleTabs>

<h3>With Icons</h3>
<ExampleTabs code={`<Input
  label="Password"
  type="password"
  leftIcon="lock"
  rightIcon="eye"
  placeholder="Enter password"
/>`}>
  <div class="max-w-md" data-testid="input-icons">
    <Input
      label="Password"
      type="password"
      leftIcon="lock"
      rightIcon="eye"
      placeholder="Enter password"
    />
  </div>
</ExampleTabs>

<h3>Floating Label</h3>
<ExampleTabs code={`<Input
  label="Email"
  type="email"
  floating={true}
  placeholder="Enter email"
/>`}>
  <div class="max-w-md" data-testid="input-floating">
    <Input
      label="Email"
      type="email"
      floating={true}
      placeholder="Enter email"
    />
  </div>
</ExampleTabs>

<h3>Validation &amp; Error States</h3>
<ExampleTabs code={`<Input
  label="Email"
  type="email"
  value="invalid-email"
  error="Please enter a valid email address"
  required
/>`}>
  <div class="max-w-md" data-testid="input-error">
    <Input
      label="Email"
      type="email"
      value="invalid-email"
      error="Please enter a valid email address"
      required
    />
  </div>
</ExampleTabs>

<h3>Input Masking</h3>
<ExampleTabs code={`<Input
  label="Phone"
  type="tel"
  mask="(###) ###-####"
  placeholder="(555) 555-5555"
/>`}>
  <div class="max-w-md" data-testid="input-mask">
    <Input
      label="Phone"
      type="tel"
      mask="(###) ###-####"
      placeholder="(555) 555-5555"
    />
  </div>
</ExampleTabs>

<!-- ─── Slots ─────────────────────────────────────────── -->
<h2>Slots</h2>
<p>
  The Input component does not expose named slots. Use props for customization.
  For more complex content, consider using <code>&lt;FormField&gt;</code> with a
  raw <code>&lt;input&gt;</code>.
</p>

<!-- ─── Props ─────────────────────────────────────────── -->
<h2>Props</h2>
<PropsTable component={InputModule} />

<!-- ─── Events ────────────────────────────────────────── -->
<h2>Events</h2>
<EventsTable component={InputModule} />

<!-- ─── Accessibility ─────────────────────────────────── -->
<h2>Accessibility</h2>
<ul>
  <li>Labels are properly associated with inputs using <code>for</code> attributes.</li>
  <li>Required fields are marked with both visual indicators and
    <code>aria-required="true"</code>.</li>
  <li>Error messages are linked to inputs via <code>aria-describedby</code>.</li>
  <li>Invalid states use <code>aria-invalid="true"</code>.</li>
  <li>Decorative icons are hidden from screen readers with <code>aria-hidden="true"</code>.</li>
</ul>

<!-- ─── Keyboard Support ──────────────────────────────── -->
<h2>Keyboard Support</h2>
<table>
  <thead>
    <tr><th>Key</th><th>Function</th></tr>
  </thead>
  <tbody>
    <tr><td><kbd>Tab</kbd></td><td>Moves focus into and out of the input</td></tr>
    <tr><td><kbd>Enter</kbd></td><td>Submits the enclosing form (if applicable)</td></tr>
    <tr><td><kbd>Escape</kbd></td><td>Clears the input (in some implementations)</td></tr>
  </tbody>
</table>

<!-- ─── Input Masking Reference ───────────────────────── -->
<h2>Input Masking Reference</h2>
<p>The mask pattern uses these special characters:</p>
<ul>
  <li><code>#</code> — Matches a digit (0–9)</li>
  <li><code>A</code> — Matches a letter (a–z, A–Z)</li>
  <li><code>*</code> — Matches any character</li>
  <li>Any other character is treated as a literal</li>
</ul>
<p>Common patterns:</p>
<ul>
  <li>Phone: <code>(###) ###-####</code></li>
  <li>Date: <code>##/##/####</code></li>
  <li>Credit Card: <code>#### #### #### ####</code></li>
  <li>Serial Number: <code>AA-##-**</code></li>
</ul>
