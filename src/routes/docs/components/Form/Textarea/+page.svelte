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
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<h1>Textarea</h1>

<!-- ─── Description ───────────────────────────────────── -->
<p>
  <strong>Textarea</strong> is a multi-line text input for collecting longer text
  content — descriptions, messages, comments, or any content that spans more than
  one line. It wraps the native <code>&lt;textarea&gt;</code> with auto-resize,
  validation support, and consistent styling.
</p>

<!-- ─── What / When / Why ─────────────────────────────── -->
<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A multi-line text field that handles line breaks, scrolling, and resizing natively.
  The <code>autoResize</code> prop enables CSS-based auto-grow behavior using
  <code>field-sizing: content</code> — no JavaScript required.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;Textarea&gt;</code> whenever the user needs to enter more than one
  line of text: product descriptions, comments, messages, bio fields, address lines.
  For single-line input, use <code>&lt;Input&gt;</code> instead.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Native handling</strong> — the <code>&lt;textarea&gt;</code> element
    natively handles line breaks, text wrapping, and resizing.</li>
  <li><strong>Auto-grow</strong> — <code>field-sizing: content</code> (CSS) auto-expands
    the field to fit content without JavaScript.</li>
  <li><strong>Consistency</strong> — ensures all textareas share the same label
    positioning, error display, and focus styling.</li>
</ul>

<h3>Sources</h3>
<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea">MDN — &lt;textarea&gt;</a></li>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Forms</a></li>
  <li><a href="https://primer.style/product/components/Textarea">Primer — Textarea</a></li>
  <li><a href="https://m3.material.io/components/text-fields/overview">Material Design 3 — Text fields</a></li>
  <li><a href="https://ant.design/components/input">Ant Design — Input.TextArea</a></li>
</ul>

<!-- ─── Responsiveness ────────────────────────────────── -->
<h2>Responsiveness</h2>
<ul>
  <li>The textarea fills its container width by default (<code>w-full</code>).</li>
  <li>Users can resize vertically (default) or both directions via the <code>resize</code> CSS prop.</li>
  <li>Touch targets meet 44×44 px minimum for mobile tap areas.</li>
</ul>

<!-- ─── Customization ─────────────────────────────────── -->
<h2>Customization</h2>
<ul>
  <li>Set initial rows via the <code>rows</code> prop.</li>
  <li>Enable auto-grow with <code>autoResize={true}</code> (uses CSS <code>field-sizing: content</code>).</li>
  <li>Limit input with <code>maxlength</code>.</li>
  <li>Use <code>readonly</code> for display-only content that should still be selectable/copyable.</li>
  <li>Theme colors and borders are controlled by the Tailwind theme.</li>
</ul>

<!-- ─── Examples ──────────────────────────────────────── -->
<h2>Examples</h2>

<h3>Basic Usage</h3>
<ExampleTabs code={`<Textarea placeholder="Enter your message here" rows={3} />`}>
  <div class="max-w-md" data-testid="textarea-basic">
    <Textarea placeholder="Enter your message here" rows={3} />
  </div>
</ExampleTabs>

<h3>With Initial Value</h3>
<ExampleTabs code={`<Textarea value="This is a pre-filled textarea with some initial content." rows={3} />`}>
  <div class="max-w-md" data-testid="textarea-prefilled">
    <Textarea value="This is a pre-filled textarea with some initial content." rows={3} />
  </div>
</ExampleTabs>

<h3>Auto-resize</h3>
<ExampleTabs code={`<Textarea
  placeholder="This textarea will grow as you type..."
  autoResize={true}
  rows={2}
/>`}>
  <div class="max-w-md" data-testid="textarea-autoresize">
    <Textarea placeholder="This textarea will grow as you type..." autoResize={true} rows={2} />
  </div>
</ExampleTabs>

<h3>Disabled</h3>
<ExampleTabs code={`<Textarea value="This textarea is disabled and cannot be edited." disabled={true} rows={3} />`}>
  <div class="max-w-md" data-testid="textarea-disabled">
    <Textarea value="This textarea is disabled and cannot be edited." disabled={true} rows={3} />
  </div>
</ExampleTabs>

<h3>Read-only</h3>
<ExampleTabs code={`<Textarea
  value="This textarea is read-only but can still be focused and copied."
  readonly={true}
  rows={3}
/>`}>
  <div class="max-w-md" data-testid="textarea-readonly">
    <Textarea value="This textarea is read-only but can still be focused and copied." readonly={true} rows={3} />
  </div>
</ExampleTabs>

<h3>With Character Limit</h3>
<ExampleTabs code={`<Textarea placeholder="Maximum 100 characters allowed" maxlength="100" rows={3} />`}>
  <div class="max-w-md" data-testid="textarea-maxlength">
    <Textarea placeholder="Maximum 100 characters allowed" maxlength="100" rows={3} />
  </div>
</ExampleTabs>

<h3>Required</h3>
<ExampleTabs code={`<Textarea placeholder="This field is required" required={true} rows={3} />`}>
  <div class="max-w-md" data-testid="textarea-required">
    <Textarea placeholder="This field is required" required={true} rows={3} />
  </div>
</ExampleTabs>

<!-- ─── Slots ─────────────────────────────────────────── -->
<h2>Slots</h2>
<p>
  The Textarea component does not expose named slots. Use props for customization.
</p>

<!-- ─── Props ─────────────────────────────────────────── -->
<h2>Props</h2>
<PropsTable component={TextareaModule} />

<!-- ─── Events ────────────────────────────────────────── -->
<h2>Events</h2>
<EventsTable component={TextareaModule} />

<!-- ─── Accessibility ─────────────────────────────────── -->
<h2>Accessibility</h2>
<ul>
  <li>Uses native <code>&lt;textarea&gt;</code> for maximum compatibility.</li>
  <li>Proper focus states with visible indicators.</li>
  <li>Labels associated via <code>for</code>/<code>id</code>.</li>
  <li>Error messages linked via <code>aria-describedby</code>.</li>
  <li>Compatible with screen readers and assistive technologies.</li>
  <li>Integrates with form validation (<code>required</code>, <code>maxlength</code>).</li>
</ul>

<!-- ─── Keyboard Support ──────────────────────────────── -->
<h2>Keyboard Support</h2>
<table>
  <thead>
    <tr><th>Key</th><th>Function</th></tr>
  </thead>
  <tbody>
    <tr><td><kbd>Tab</kbd></td><td>Move focus into or out of the textarea</td></tr>
    <tr><td><kbd>Enter</kbd></td><td>Insert a new line (does not submit the form)</td></tr>
    <tr><td><kbd>Ctrl+Enter</kbd></td><td>Submit form (if configured)</td></tr>
  </tbody>
</table>
