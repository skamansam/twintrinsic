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
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>Switch</h1>

<!-- ─── Description ───────────────────────────────────── -->
<p>
  <strong>Switch</strong> is a toggle control that switches between on and off states.
  It is visually styled as a sliding track with a thumb, and semantically distinct from
  a checkbox — it represents an immediate state change rather than a form value.
</p>

<!-- ─── What / When / Why ─────────────────────────────── -->
<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A binary toggle with a sliding animation. Unlike a checkbox (which represents
  "checked" or "unchecked"), a switch represents "on" or "off" — the semantics
  communicate that the setting takes effect immediately.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;Switch&gt;</code> for settings that activate/deactivate something
  immediately: dark mode, notifications on/off, auto-save, airplane mode. Use
  <code>&lt;Checkbox&gt;</code> for form values that are submitted with the form
  (e.g., "I agree to terms").
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Better semantics</strong> — screen readers announce "on/off" instead of
    "checked/unchecked", which is clearer for settings.</li>
  <li><strong>Visual metaphor</strong> — the sliding track communicates instant effect
    better than a static checkbox.</li>
  <li><strong>Platform familiarity</strong> — switches are the standard toggle
    pattern in iOS and Android settings.</li>
</ul>

<h3>Sources</h3>
<ul>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/switch/">WAI-ARIA APG — Switch</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/switch_role">MDN — switch role</a></li>
  <li><a href="https://primer.style/product/components/ToggleSwitch">Primer — ToggleSwitch</a></li>
  <li><a href="https://m3.material.io/components/switch/overview">Material Design 3 — Switches</a></li>
  <li><a href="https://ant.design/components/switch">Ant Design — Switch</a></li>
</ul>

<!-- ─── Responsiveness ────────────────────────────────── -->

<h2>Twintrinsic Implementation</h2>
<ul>
    <li>Uses `&lt;input type=&quot;checkbox&quot; role=&quot;switch&quot;&gt;` — native checkbox with switch semantics</li>
    <li>Screen readers announce &quot;on/off&quot; instead of &quot;checked/unchecked&quot;</li>
    <li>CSS transition on the track for smooth sliding animation</li>
    <li>`accent-color` for brand-tinted track color</li>
    <li>Form context integration via `getContext('form')`</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't use `&lt;div role=&quot;switch&quot;&gt;` — always `&lt;input type=&quot;checkbox&quot; role=&quot;switch&quot;&gt;`</li>
    <li>Don't use for form values — use Checkbox for checked/unchecked semantics</li>
</ul>

<h2>Related Components</h2>
<p>Checkbox, FormField</p>

<h2>Responsiveness</h2>
<ul>
  <li>Switches are inline elements that sit naturally alongside their labels.</li>
  <li>Touch targets meet 44×44 px minimum for mobile tap areas.</li>
  <li>Use <code>size</code> prop ("sm", "md", "lg") for different contexts.</li>
</ul>

<!-- ─── Customization ─────────────────────────────────── -->
<h2>Customization</h2>
<ul>
  <li>Size: <code>sm</code>, <code>md</code> (default), or <code>lg</code>.</li>
  <li>For label-less switches, use <code>ariaLabel</code> for screen readers.</li>
  <li>Theme colors (track, thumb, focus ring) are controlled by the Tailwind theme.</li>
</ul>

<!-- ─── Examples ──────────────────────────────────────── -->
<h2>Examples</h2>

<h3>Basic Usage</h3>
<ExampleTabs code={`<Switch label="Enable notifications" />`}>
  <div class="max-w-md" data-testid="switch-basic">
    <Switch label="Enable notifications" />
  </div>
</ExampleTabs>

<h3>With Initial Value</h3>
<ExampleTabs code={`<Switch label="Dark mode" checked={true} />`}>
  <div class="max-w-md" data-testid="switch-initial">
    <Switch label="Dark mode" checked={true} />
  </div>
</ExampleTabs>

<h3>Different Sizes</h3>
<ExampleTabs code={`<Switch label="Small" size="sm" />
<Switch label="Medium (default)" size="md" />
<Switch label="Large" size="lg" />`}>
  <div class="max-w-md flex flex-col gap-4" data-testid="switch-sizes">
    <Switch label="Small" size="sm" />
    <Switch label="Medium (default)" size="md" />
    <Switch label="Large" size="lg" />
  </div>
</ExampleTabs>

<h3>Disabled States</h3>
<ExampleTabs code={`<Switch label="Disabled (off)" disabled={true} />
<Switch label="Disabled (on)" checked={true} disabled={true} />`}>
  <div class="max-w-md flex flex-col gap-4" data-testid="switch-disabled">
    <Switch label="Disabled (off)" disabled={true} />
    <Switch label="Disabled (on)" checked={true} disabled={true} />
  </div>
</ExampleTabs>

<h3>Required Field</h3>
<ExampleTabs code={`<Switch label="I agree to the terms" required={true} />`}>
  <div class="max-w-md" data-testid="switch-required">
    <Switch label="I agree to the terms" required={true} />
  </div>
</ExampleTabs>

<h3>Without Label</h3>
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
<h2>Slots</h2>
<p>
  The Switch component does not expose named slots. Use props for customization.
</p>

<!-- ─── Props ─────────────────────────────────────────── -->
<h2>Props</h2>
<PropsTable component={SwitchModule} />

<!-- ─── Events ────────────────────────────────────────── -->
<h2>Events</h2>
<EventsTable component={SwitchModule} />

<!-- ─── Accessibility ─────────────────────────────────── -->
<h2>Accessibility</h2>
<ul>
  <li>Uses a native <code>&lt;input type="checkbox" role="switch"&gt;</code> for
    maximum compatibility.</li>
  <li>Screen readers announce "on/off" instead of "checked/unchecked".</li>
  <li>Visible focus indicators with sufficient contrast.</li>
  <li>Labels properly associated via <code>for</code>/<code>id</code>.</li>
  <li>High contrast between track and thumb colors.</li>
</ul>

<!-- ─── Keyboard Support ──────────────────────────────── -->
<h2>Keyboard Support</h2>
<table>
  <thead>
    <tr><th>Key</th><th>Function</th></tr>
  </thead>
  <tbody>
    <tr><td><kbd>Space</kbd></td><td>Toggle the switch state</td></tr>
    <tr><td><kbd>Enter</kbd></td><td>Toggle the switch state (optional)</td></tr>
    <tr><td><kbd>Tab</kbd></td><td>Move focus to the switch</td></tr>
  </tbody>
</table>
</Container>
