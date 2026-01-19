<!--
@component
Documentation page for the SelectGroup component.
-->
<script lang="ts">
import { Select, SelectGroup, FormField, CodeBlock } from "$lib/index.js"
import { PropsTable, EventsTable } from "$lib/docs/index.js"

// Sample data for examples
const europeanCountries = [
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
  { value: "it", label: "Italy" },
  { value: "es", label: "Spain" },
  { value: "uk", label: "United Kingdom" },
]

const northAmericanCountries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
]

const asianCountries = [
  { value: "jp", label: "Japan" },
  { value: "cn", label: "China" },
  { value: "in", label: "India" },
  { value: "kr", label: "South Korea" },
  { value: "sg", label: "Singapore" },
]

// Selected values for examples
let selectedCountry = ""
</script>

<h1>SelectGroup</h1>

<p>
  The SelectGroup component is used to organize related options within a Select component. 
  It creates semantic groupings with optional labels, making it easier for users to find 
  and select options from large lists.
</p>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<div class="example">
  <Select 
    label="Select a country" 
    bind:value={selectedCountry}
  >
    <SelectGroup label="Europe">
      {#each europeanCountries as country}
        <option value={country.value}>{country.label}</option>
      {/each}
    </SelectGroup>
    <SelectGroup label="North America">
      {#each northAmericanCountries as country}
        <option value={country.value}>{country.label}</option>
      {/each}
    </SelectGroup>
    <SelectGroup label="Asia">
      {#each asianCountries as country}
        <option value={country.value}>{country.label}</option>
      {/each}
    </SelectGroup>
  </Select>
  <p class="text-sm text-muted mt-2">Selected country: {selectedCountry || 'None'}</p>
</div>
<CodeBlock>
  {`<script>
  const europeanCountries = [
    { value: 'fr', label: 'France' },
    { value: 'de', label: 'Germany' },
    { value: 'it', label: 'Italy' },
    { value: 'es', label: 'Spain' },
    { value: 'uk', label: 'United Kingdom' }
  ]

  const northAmericanCountries = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'mx', label: 'Mexico' }
  ]

  const asianCountries = [
    { value: 'jp', label: 'Japan' },
    { value: 'cn', label: 'China' },
    { value: 'in', label: 'India' },
    { value: 'kr', label: 'South Korea' },
    { value: 'sg', label: 'Singapore' }
  ]

  let selectedCountry = ''
</script>

<Select 
  label="Select a country" 
  bind:value={selectedCountry}
>
  <SelectGroup label="Europe">
    {#each europeanCountries as country}
      <option value={country.value}>{country.label}</option>
    {/each}
  </SelectGroup>
  <SelectGroup label="North America">
    {#each northAmericanCountries as country}
      <option value={country.value}>{country.label}</option>
    {/each}
  </SelectGroup>
  <SelectGroup label="Asia">
    {#each asianCountries as country}
      <option value={country.value}>{country.label}</option>
    {/each}
  </SelectGroup>
</Select>`}
</CodeBlock>

<h3>Disabled Group</h3>
<div class="example">
  <Select 
    label="Select a country" 
    bind:value={selectedCountry}
  >
    <SelectGroup label="Europe">
      {#each europeanCountries as country}
        <option value={country.value}>{country.label}</option>
      {/each}
    </SelectGroup>
    <SelectGroup label="North America" disabled={true}>
      {#each northAmericanCountries as country}
        <option value={country.value}>{country.label}</option>
      {/each}
    </SelectGroup>
    <SelectGroup label="Asia">
      {#each asianCountries as country}
        <option value={country.value}>{country.label}</option>
      {/each}
    </SelectGroup>
  </Select>
</div>
<CodeBlock>
  {`<Select 
  label="Select a country" 
  bind:value={selectedCountry}
>
  <SelectGroup label="Europe">
    {#each europeanCountries as country}
      <option value={country.value}>{country.label}</option>
    {/each}
  </SelectGroup>
  <SelectGroup label="North America" disabled={true}>
    {#each northAmericanCountries as country}
      <option value={country.value}>{country.label}</option>
    {/each}
  </SelectGroup>
  <SelectGroup label="Asia">
    {#each asianCountries as country}
      <option value={country.value}>{country.label}</option>
    {/each}
  </SelectGroup>
</Select>`}
</CodeBlock>

<h3>With Form Field</h3>
<div class="example">
  <FormField label="Select a country" required={true}>
    <Select 
      required={true}
      bind:value={selectedCountry}
    >
      <SelectGroup label="Europe">
        {#each europeanCountries as country}
          <option value={country.value}>{country.label}</option>
        {/each}
      </SelectGroup>
      <SelectGroup label="North America">
        {#each northAmericanCountries as country}
          <option value={country.value}>{country.label}</option>
        {/each}
      </SelectGroup>
    </Select>
  </FormField>
</div>
<CodeBlock>
  {`<FormField label="Select a country" required={true}>
  <Select 
    required={true}
    bind:value={selectedCountry}
  >
    <SelectGroup label="Europe">
      {#each europeanCountries as country}
        <option value={country.value}>{country.label}</option>
      {/each}
    </SelectGroup>
    <SelectGroup label="North America">
      {#each northAmericanCountries as country}
        <option value={country.value}>{country.label}</option>
      {/each}
    </SelectGroup>
  </Select>
</FormField>`}
</CodeBlock>

<h2>Props</h2>
<PropsTable
  props={[
    {
      name: 'label',
      type: 'string',
      description: 'Group label displayed as a header for the option group'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether all options in the group are disabled'
    },
    {
      name: 'children',
      type: 'slot',
      description: 'Option elements to be rendered within the group'
    }
  ]}
/>

<h2>Accessibility</h2>
<p>
  The SelectGroup component follows accessibility best practices:
</p>
<ul>
  <li>Uses the native <code>&lt;optgroup&gt;</code> element for proper semantics and screen reader support</li>
  <li>Provides clear visual grouping with labels</li>
  <li>Supports proper disabled states for entire groups</li>
  <li>Maintains proper color contrast for group labels</li>
</ul>

<h2>Usage with Select Component</h2>
<p>
  The SelectGroup component is designed to be used within a Select component to organize related options:
</p>
<CodeBlock>
  {`<Select name="country" label="Select a country">
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
</Select>`}
</CodeBlock>

<h2>Form Integration</h2>
<p>
  The SelectGroup component works seamlessly with the Form component when used within a Select:
</p>
<CodeBlock>
  {`<Form onSubmit={handleSubmit}>
  <FormField label="Country">
    <Select name="country" required={true}>
      <SelectGroup label="Europe">
        <option value="fr">France</option>
        <option value="de">Germany</option>
      </SelectGroup>
      
      <SelectGroup label="North America">
        <option value="us">United States</option>
        <option value="ca">Canada</option>
      </SelectGroup>
    </Select>
  </FormField>
  
  <Button type="submit">Submit</Button>
</Form>`}
</CodeBlock>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
  .example {
    @apply my-4 p-4 border border-border rounded-md;
    @apply flex flex-col gap-4 max-w-md;
  }
</style>
