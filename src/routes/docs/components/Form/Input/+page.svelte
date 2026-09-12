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
import Container from "$lib/components/Container/Container.svelte"
import { m } from "$lib/paraglide/messages.js"

let showPassword = $state(false)
let passwordValue = $state('')

function togglePasswordVisibility() {
  showPassword = !showPassword
}
function handlePasswordInput(event: CustomEvent<{ value: string }>) {
  passwordValue = event.detail.value
}
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>{m.input_heading()}</h1>

<!-- ─── Description ───────────────────────────────────── -->
<p>
  <strong>{m.input_heading()}</strong>{m.input_lede_1()}<code>&lt;input&gt;</code>{m.input_lede_2()}
</p>

<!-- ─── What / When / Why ─────────────────────────────── -->
<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>
  {m.input_what_1()}<code>&lt;input&gt;</code>{m.input_what_2()}<code>text</code>, <code>email</code>, <code>tel</code>, <code>url</code>, <code>password</code>, <code>search</code>{m.input_what_3()}
</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.input_when_1()}<code>&lt;Input&gt;</code>{m.input_when_2()}<code>&lt;Textarea&gt;</code>{m.input_when_3()}<code>&lt;NumberInput&gt;</code>{m.input_when_4()}<code>&lt;Select&gt;</code>{m.input_when_5()}<code>&lt;Combobox&gt;</code>{m.input_when_6()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.input_why_native()}</strong>{m.input_why_native_1()}<code>&lt;input&gt;</code>{m.input_why_native_2()}</li>
  <li><strong>{m.input_why_consistency()}</strong>{m.input_why_consistency_desc()}</li>
  <li><strong>{m.input_why_a11y()}</strong>{m.input_why_a11y_1()}<code>&lt;label&gt;</code>{m.input_why_a11y_2()}<code>aria-describedby</code>{m.input_why_a11y_3()}<code>aria-invalid</code>{m.input_why_a11y_4()}</li>
</ul>

<h3>{m.sec_sources()}</h3>
<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input">MDN — &lt;input&gt;</a></li>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Forms</a></li>
  <li><a href="https://primer.style/product/components/TextInput">Primer — TextInput</a></li>
  <li><a href="https://m3.material.io/components/text-fields/overview">Material Design 3 — Text fields</a></li>
  <li><a href="https://ant.design/components/input">Ant Design — Input</a></li>
</ul>

<h2>{m.sec_implementation()}</h2>
<ul>
    <li>{m.input_impl_1()}</li>
    <li>{m.input_impl_2()}</li>
    <li>{m.input_impl_3()}</li>
    <li>{m.input_impl_4()}</li>
    <li>{m.input_impl_5()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
    <li>{m.input_mistake_1()}</li>
    <li>{m.input_mistake_2()}</li>
    <li>{m.input_mistake_3()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.input_related_1()}</p>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.input_responsive_1()}</li>
  <li>{m.input_responsive_2_1()}</li>
  <li>{m.input_responsive_3()}</li>
</ul>

<!-- ─── Customization ─────────────────────────────────── -->
<h2>{m.sec_customization()}</h2>
<ul>
  <li>{m.input_custom_1()}</li>
  <li>{m.input_custom_2_1()}<code>floating={'{true}'}</code>{m.input_custom_2_2()}</li>
  <li>{m.input_custom_3_1()}</li>
  <li>{m.input_custom_4()}</li>
  <li>{m.input_custom_5()}</li>
</ul>

<!-- ─── Examples ──────────────────────────────────────── -->
<h2>{m.sec_examples()}</h2>

<h3>{m.input_ex_basic()}</h3>
<ExampleTabs code={`<Input label="Username" placeholder="Enter username" />`}>
  <div class="max-w-md" data-testid="input-basic">
    <Input label="Username" placeholder="Enter username" />
  </div>
</ExampleTabs>

<h3>{m.input_ex_icons()}</h3>
<ExampleTabs code={`<Input
  label="Password"
  type="password"
  leftIcon="lock"
  rightIcon="eye"
  onrightIconClick={() => togglePassword()}
  placeholder="Enter password"
/>`}>
  <div class="max-w-md" data-testid="input-icons">
    <Input
      label="Password"
      type={showPassword ? 'text' : 'password'}
      leftIcon="tabler:lock"
      rightIcon={showPassword ? 'tabler:eye-off' : 'tabler:eye'}
      onrightIconClick={togglePasswordVisibility}
      value={passwordValue}
      oninput={handlePasswordInput}
      placeholder="Enter password"
    />
  </div>
</ExampleTabs>

<h3>{m.input_ex_floating()}</h3>
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

<h3>{m.input_ex_validation()}</h3>
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

<h3>{m.input_ex_mask()}</h3>
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

<h3>{m.input_ex_rest()}</h3>
<ExampleTabs code={`<Input data-rest-pass="input" aria-label="Rest props input" placeholder="Enter value" />`}>
  <div class="max-w-md" data-testid="input-rest-props">
    <Input data-rest-pass="input" aria-label="Rest props input" placeholder="Enter value" />
  </div>
</ExampleTabs>

<h3>{m.input_ex_datalist()}</h3>
<p>
  {m.input_datalist_desc_1()}<code>datalist</code>{m.input_datalist_desc_2()}<code>&lt;datalist&gt;</code>{m.input_datalist_desc_3()}<code>label</code>{m.input_datalist_desc_4()}<code>value</code>{m.input_datalist_desc_5()}
</p>
<ExampleTabs code={`<Input
  label="Browser"
  placeholder="Type a browser..."
  datalist={["Chrome", "Firefox", "Safari", "Edge", "Opera"]}
/>`}>  
  <div class="max-w-md" data-testid="input-datalist">
    <Input
      label="Browser"
      placeholder="Type a browser..."
      datalist={["Chrome", "Firefox", "Safari", "Edge", "Opera"]}
    />
  </div>
</ExampleTabs>

<h3>{m.input_ex_datalist_pairs()}</h3>
<p>{m.input_datalist_pairs_desc()}</p>
<ExampleTabs code={`<Input
  label="Country"
  placeholder="Select a country..."
  datalist={[
    { label: "United States", value: "US" },
    { label: "United Kingdom", value: "UK" },
    { label: "Germany", value: "DE" },
    { label: "France", value: "FR" },
    { label: "Japan", value: "JP" }
  ]}
/>`}>
  <div class="max-w-md" data-testid="input-datalist-objects">
    <Input
      label="Country"
      placeholder="Select a country..."
      datalist={[
        { label: "United States", value: "US" },
        { label: "United Kingdom", value: "UK" },
        { label: "Germany", value: "DE" },
        { label: "France", value: "FR" },
        { label: "Japan", value: "JP" }
      ]}
    />
  </div>
</ExampleTabs>

<!-- ─── Slots ─────────────────────────────────────────── -->
<h2>{m.sec_slots()}</h2>
<p>
  {m.input_slot_none_1()}<code>&lt;FormField&gt;</code>{m.input_slot_none_2()}<code>&lt;input&gt;</code>{m.input_slot_none_3()}
</p>

<!-- ─── Props ─────────────────────────────────────────── -->
<h2>{m.sec_props()}</h2>
<PropsTable component={InputModule} />

<!-- ─── Events ────────────────────────────────────────── -->
<h2>{m.sec_events()}</h2>
<EventsTable component={InputModule} />

<!-- ─── Accessibility ─────────────────────────────────── -->
<h2>{m.sec_accessibility()}</h2>
<ul>
  <li>{m.input_a11y_1()}</li>
  <li>{m.input_a11y_2_1()}<code>aria-required="true"</code>{m.input_a11y_2_2()}</li>
  <li>{m.input_a11y_3_1()}<code>aria-describedby</code>{m.input_a11y_3_2()}</li>
  <li>{m.input_a11y_4_1()}<code>aria-invalid="true"</code>{m.input_a11y_4_2()}</li>
  <li>{m.input_a11y_5_1()}<code>aria-hidden="true"</code>{m.input_a11y_5_2()}</li>
</ul>

<!-- ─── Keyboard Support ──────────────────────────────── -->
<h2>{m.sec_keyboard()}</h2>
<table>
  <thead>
    <tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr>
  </thead>
  <tbody>
    <tr><td><kbd>Tab</kbd></td><td>{m.input_kb_tab()}</td></tr>
    <tr><td><kbd>Enter</kbd></td><td>{m.input_kb_enter()}</td></tr>
    <tr><td><kbd>Escape</kbd></td><td>{m.input_kb_escape()}</td></tr>
  </tbody>
</table>

<!-- ─── Input Masking Reference ───────────────────────── -->
<h2>{m.sec_masking_ref()}</h2>
<p>{m.input_mask_intro()}</p>
<ul>
  <li><code>#</code> — {m.input_mask_digit()}</li>
  <li><code>A</code> — {m.input_mask_letter()}</li>
  <li><code>*</code> — {m.input_mask_any()}</li>
  <li>{m.input_mask_literal()}</li>
</ul>
<p>{m.input_mask_patterns()}</p>
<ul>
  <li>{m.input_mask_phone()} <code>(###) ###-####</code></li>
  <li>{m.input_mask_date()} <code>##/##/####</code></li>
  <li>{m.input_mask_card()} <code>#### #### #### ####</code></li>
  <li>{m.input_mask_serial()} <code>AA-##-**</code></li>
</ul>
</Container>
