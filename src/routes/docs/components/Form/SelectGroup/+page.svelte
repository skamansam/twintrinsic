<!--
@component
SelectGroup documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import FormField from "$lib/components/Form/FormField.svelte"
import Select from "$lib/components/Form/Select.svelte"
import SelectGroup from "$lib/components/Form/SelectGroup.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as SelectGroupModule from "$lib/components/Form/SelectGroup.svelte"
import Container from "$lib/components/Container/Container.svelte"

let selectedCountry = $state("")
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>SelectGroup</h1>

<p>
  <strong>SelectGroup</strong> organizes related options within a Select component
  using native <code>&lt;optgroup&gt;</code> elements with visual group labels.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A wrapper that creates a labeled group of <code>&lt;option&gt;</code> elements
  inside a <code>&lt;select&gt;</code>. The group label is visually distinct and
  announced by screen readers.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;SelectGroup&gt;</code> when a Select has many options that benefit
  from categorization (countries by continent, products by category). For fewer
  options (5–15), groups may add unnecessary complexity.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Scannability</strong> — visual group labels help users find options faster.</li>
  <li><strong>Semantics</strong> — native <code>&lt;optgroup&gt;</code> is announced by screen readers.</li>
  <li><strong>Disable groups</strong> — disable an entire category at once.</li>
</ul>

<h2>Responsiveness</h2>
<ul>
  <li>Group labels and options adapt to the Select's width.</li>
  <li>Touch targets meet 44×44 px minimum.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li>Disable entire groups via <code>disabled</code> prop.</li>
  <li>Wrap with <code>&lt;FormField&gt;</code> for labels and validation.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<ExampleTabs code={`<Select label="Select a country" bind:value={selectedCountry}>
  <SelectGroup label="Europe">
    <option value="fr">France</option>
    <option value="de">Germany</option>
    <option value="it">Italy</option>
  </SelectGroup>
  <SelectGroup label="North America">
    <option value="us">United States</option>
    <option value="ca">Canada</option>
    <option value="mx">Mexico</option>
  </SelectGroup>
</Select>`}>
  <div class="max-w-md" data-testid="select-group-basic">
    <Select label="Select a country" bind:value={selectedCountry}>
      <SelectGroup label="Europe">
        <option value="fr">France</option>
        <option value="de">Germany</option>
        <option value="it">Italy</option>
      </SelectGroup>
      <SelectGroup label="North America">
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="mx">Mexico</option>
      </SelectGroup>
    </Select>
    <p class="text-sm text-muted mt-2">Selected: {selectedCountry || 'None'}</p>
  </div>
</ExampleTabs>

<h3>Disabled Group</h3>
<ExampleTabs code={`<Select label="Select a country">
  <SelectGroup label="Europe">
    <option value="fr">France</option>
    <option value="de">Germany</option>
  </SelectGroup>
  <SelectGroup label="North America" disabled={true}>
    <option value="us">United States</option>
    <option value="ca">Canada</option>
  </SelectGroup>
</Select>`}>
  <div class="max-w-md" data-testid="select-group-disabled">
    <Select label="Select a country">
      <SelectGroup label="Europe"><option value="fr">France</option><option value="de">Germany</option></SelectGroup>
      <SelectGroup label="North America" disabled={true}><option value="us">United States</option><option value="ca">Canada</option></SelectGroup>
    </Select>
  </div>
</ExampleTabs>

  <h3>With FormField</h3>
  <ExampleTabs code={`<FormField label="Region">
  <SelectGroup label="Asia">
    <optgroup label="Asia"><option value="jp">Japan</option></optgroup>
  </SelectGroup>
</FormField>`}>
    <div data-testid="select-group-formfield">
      <FormField label="Region">
        <SelectGroup label="Asia">
          <optgroup label="Asia"><option value="jp">Japan</option></optgroup>
        </SelectGroup>
      </FormField>
    </div>
  </ExampleTabs>

<h2>Props</h2>
<PropsTable component={SelectGroupModule} />

<h2>Accessibility</h2>
<ul>
  <li>Uses native <code>&lt;optgroup&gt;</code> for proper semantics.</li>
  <li>Group labels announced by screen readers.</li>
  <li>Disabled groups are visually and programmatically disabled.</li>
</ul>
</Container>
