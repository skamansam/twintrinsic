<!--
@component
Radio documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import FormField from "$lib/components/Form/FormField.svelte"
import Radio from "$lib/components/Form/Radio.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as RadioModule from "$lib/components/Form/Radio.svelte"
import Container from "$lib/components/Container/Container.svelte"

let theme = $state("light")
let fruit = $state("apple")

const radioGroupCode = `<script>
  let theme = 'light'
<\/script>

<div class="flex flex-col gap-2">
  <Radio name="theme" value="light" label="Light"
    checked={theme === 'light'} onchange={() => theme = 'light'} />
  <Radio name="theme" value="dark" label="Dark"
    checked={theme === 'dark'} onchange={() => theme = 'dark'} />
  <Radio name="theme" value="system" label="System"
    checked={theme === 'system'} onchange={() => theme = 'system'} />
</div>
<p>Selected theme: {theme}</p>`

const horizontalCode = `<script>
  let fruit = 'apple'
<\/script>

<div class="flex gap-4">
  <Radio name="fruit" value="apple" label="Apple"
    checked={fruit === 'apple'} onchange={() => fruit = 'apple'} />
  <Radio name="fruit" value="banana" label="Banana"
    checked={fruit === 'banana'} onchange={() => fruit = 'banana'} />
  <Radio name="fruit" value="cherry" label="Cherry"
    checked={fruit === 'cherry'} onchange={() => fruit = 'cherry'} />
</div>`
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>Radio</h1>

<!-- ─── Description ───────────────────────────────────── -->
<p>
  <strong>Radio</strong> is a form control for selecting exactly one option from a
  small set of mutually exclusive choices. It wraps the native
  <code>&lt;input type="radio"&gt;</code> with consistent styling and accessibility
  enhancements.
</p>

<!-- ─── What / When / Why ─────────────────────────────── -->
<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A circular toggle that, when selected, deselects all other radio buttons in the same
  named group. All options are always visible — the user doesn't need to open a
  dropdown to see choices.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;Radio&gt;</code> when the user must choose exactly one option from a
  small set (2–6 options). All options should be visible for faster scanning. For
  7+ options, use <code>&lt;Select&gt;</code> or <code>&lt;Combobox&gt;</code>. For
  independent on/off toggles, use <code>&lt;Checkbox&gt;</code> or
  <code>&lt;Switch&gt;</code>.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Visibility</strong> — all options are visible at once, enabling faster
      decision-making than dropdowns (Nielsen Norman Group research).</li>
  <li><strong>Mutual exclusion</strong> — the <code>name</code> attribute ensures
      exactly one option can be selected per group.</li>
  <li><strong>Keyboard intuitive</strong> — arrow keys navigate between options in a
      group, matching user expectations.</li>
</ul>

<h3>Sources</h3>
<ul>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/radio/">WAI-ARIA APG — Radio Group</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio">MDN — radio input</a></li>
  <li><a href="https://primer.style/product/components/Radio">Primer — Radio</a></li>
  <li><a href="https://m3.material.io/components/radio-buttons/overview">Material Design 3 — Radio buttons</a></li>
  <li><a href="https://ant.design/components/radio">Ant Design — Radio</a></li>
</ul>

<!-- ─── Responsiveness ────────────────────────────────── -->
<h2>Responsiveness</h2>
<ul>
  <li>Radio buttons are inline elements that wrap naturally in flex or grid layouts.</li>
  <li>Use horizontal layout (<code>flex gap-4</code>) for 2–3 short options, vertical
      layout for longer labels.</li>
  <li>Touch targets meet 44×44 px minimum for mobile tap areas.</li>
</ul>

<!-- ─── Customization ─────────────────────────────────── -->
<h2>Customization</h2>
<ul>
  <li>Size: <code>sm</code>, <code>md</code> (default), or <code>lg</code>.</li>
  <li>Use <code>&lt;FormField&gt;</code> to wrap a group with a shared label and
      required indicator.</li>
  <li>Theme colors and borders are controlled by the Tailwind theme.</li>
</ul>

<!-- ─── Examples ──────────────────────────────────────── -->
<h2>Examples</h2>

<h3>Radio Group</h3>
<ExampleTabs code={radioGroupCode}>
  <div class="max-w-md" data-testid="radio-group">
    <div class="flex flex-col gap-2">
      <Radio name="theme-group" value="light" label="Light" checked={theme === 'light'} onchange={() => theme = 'light'} />
      <Radio name="theme-group" value="dark" label="Dark" checked={theme === 'dark'} onchange={() => theme = 'dark'} />
      <Radio name="theme-group" value="system" label="System" checked={theme === 'system'} onchange={() => theme = 'system'} />
    </div>
    <p class="text-sm text-muted mt-2">Selected theme: {theme}</p>
  </div>
</ExampleTabs>

<h3>Horizontal Layout</h3>
<ExampleTabs code={horizontalCode}>
  <div class="max-w-md" data-testid="radio-horizontal">
    <div class="flex gap-4">
      <Radio name="fruit" value="apple" label="Apple" checked={fruit === 'apple'} onchange={() => fruit = 'apple'} />
      <Radio name="fruit" value="banana" label="Banana" checked={fruit === 'banana'} onchange={() => fruit = 'banana'} />
      <Radio name="fruit" value="cherry" label="Cherry" checked={fruit === 'cherry'} onchange={() => fruit = 'cherry'} />
    </div>
    <p class="text-sm text-muted mt-2">Selected fruit: {fruit}</p>
  </div>
</ExampleTabs>

<h3>Different Sizes</h3>
<ExampleTabs code={`<Radio name="sm" value="sm" label="Small" size="sm" />
<Radio name="md" value="md" label="Medium (default)" size="md" />
<Radio name="lg" value="lg" label="Large" size="lg" />`}>
  <div class="max-w-md flex flex-col gap-4" data-testid="radio-sizes">
    <Radio name="size-sm" value="sm" label="Small" size="sm" />
    <Radio name="size-md" value="md" label="Medium (default)" size="md" />
    <Radio name="size-lg" value="lg" label="Large" size="lg" />
  </div>
</ExampleTabs>

<h3>With FormField</h3>
<ExampleTabs code={`<FormField label="Select theme" required={true}>
  <div class="flex gap-4">
    <Radio name="theme-required" value="light" label="Light" required={true} />
    <Radio name="theme-required" value="dark" label="Dark" required={true} />
  </div>
</FormField>`}>
  <div class="max-w-md" data-testid="radio-formfield">
    <FormField label="Select theme" required={true}>
      <div class="flex gap-4">
        <Radio name="theme-required" value="light" label="Light" required={true} />
        <Radio name="theme-required" value="dark" label="Dark" required={true} />
      </div>
    </FormField>
  </div>
</ExampleTabs>

<h3>Disabled</h3>
<ExampleTabs code={`<Radio name="disabled" value="disabled" label="Disabled option" disabled={true} />`}>
  <div class="max-w-md" data-testid="radio-disabled">
    <Radio name="disabled" value="disabled" label="Disabled option" disabled={true} />
  </div>
</ExampleTabs>

<!-- ─── Slots ─────────────────────────────────────────── -->
<h2>Slots</h2>
<p>
  The Radio component does not expose named slots. Use props for customization.
  For complex label content, wrap with <code>&lt;FormField&gt;</code>.
</p>

<!-- ─── Props ─────────────────────────────────────────── -->
  <h3>Basic with Label</h3>
  <ExampleTabs code={`<Radio name="theme" value="light" label="Light theme" checked />`}>
    <div data-testid="radio-basic">
      <Radio name="theme" value="light" label="Light theme" checked />
    </div>
  </ExampleTabs>

<h2>Props</h2>
<PropsTable component={RadioModule} />

<!-- ─── Events ────────────────────────────────────────── -->
<h2>Events</h2>
<EventsTable component={RadioModule} />

<!-- ─── Accessibility ─────────────────────────────────── -->
<h2>Accessibility</h2>
<ul>
  <li>Uses native <code>&lt;input type="radio"&gt;</code> for proper semantics.</li>
  <li>Arrow keys navigate within a radio group (up/down or left/right).</li>
  <li>Visible focus indicators on all radio buttons.</li>
  <li>Proper disabled states with visual indicators.</li>
  <li>Maintains WCAG AA color contrast for all states.</li>
</ul>

<!-- ─── Keyboard Support ──────────────────────────────── -->
<h2>Keyboard Support</h2>
<table>
  <thead>
    <tr><th>Key</th><th>Function</th></tr>
  </thead>
  <tbody>
    <tr><td><kbd>Tab</kbd></td><td>Move focus to the radio group</td></tr>
    <tr><td><kbd>Space</kbd></td><td>Select the focused radio button</td></tr>
    <tr><td><kbd>Arrow Up</kbd> / <kbd>Arrow Left</kbd></td><td>Move to and select the previous radio</td></tr>
    <tr><td><kbd>Arrow Down</kbd> / <kbd>Arrow Right</kbd></td><td>Move to and select the next radio</td></tr>
  </tbody>
</table>
</Container>
