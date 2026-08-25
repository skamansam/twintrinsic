<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, userEvent } from "storybook/test"
import Combobox from "$lib/components/Form/Combobox.svelte"

const { Story } = defineMeta({
  title: "Form/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    required: { control: "boolean" },
    searchable: { control: "boolean" },
    clearable: { control: "boolean" },
    loading: { control: "boolean" },
    autoSelect: { control: "boolean" },
    openOnFocus: { control: "boolean" },
    maxHeight: { control: "number" },
    optionLabel: { control: "text" },
    optionValue: { control: "text" },
  },
  args: {
    value: null,
    placeholder: "Select an option",
    disabled: false,
    readonly: false,
    required: false,
    searchable: true,
    clearable: true,
    loading: false,
    autoSelect: false,
    openOnFocus: true,
    maxHeight: 250,
    optionLabel: "label",
    optionValue: "value",
  },
})

// Sample data for the combobox
const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "Austin",
  "Seattle",
  "Denver",
  "Miami",
  "Boston",
  "Atlanta",
  "Portland",
  "Nashville",
  "Minneapolis",
]

const countries = [
  { name: "United States", code: "US", flag: "🇺🇸" },
  { name: "Canada", code: "CA", flag: "🇨🇦" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
  { name: "Germany", code: "DE", flag: "🇩🇪" },
  { name: "France", code: "FR", flag: "🇫🇷" },
  { name: "Japan", code: "JP", flag: "🇯🇵" },
  { name: "Australia", code: "AU", flag: "🇦🇺" },
  { name: "Brazil", code: "BR", flag: "🇧🇷" },
  { name: "China", code: "CN", flag: "🇨🇳" },
  { name: "India", code: "IN", flag: "🇮🇳" },
  { name: "South Africa", code: "ZA", flag: "🇿🇦" },
  { name: "Mexico", code: "MX", flag: "🇲🇽" },
  { name: "Italy", code: "IT", flag: "🇮🇹" },
  { name: "Spain", code: "ES", flag: "🇪🇸" },
  { name: "Russia", code: "RU", flag: "🇷🇺" },
]

const users = [
  { id: 1, name: "Sarah Chen", email: "sarah.chen@acme.io", role: "Admin" },
  { id: 2, name: "Marcus Webb", email: "marcus.webb@acme.io", role: "Editor" },
  { id: 3, name: "Priya Patel", email: "priya.patel@acme.io", role: "Viewer" },
  { id: 4, name: "Diego Ramírez", email: "diego.ramirez@acme.io", role: "Editor" },
  { id: 5, name: "Emma Lindqvist", email: "emma.lindqvist@acme.io", role: "Viewer" },
  { id: 6, name: "James Okafor", email: "james.okafor@acme.io", role: "Admin" },
]
</script>

<Story
  name="Basic"
  play={async ({ canvas }) => {
    const input = canvas.getByRole("combobox");
    await expect(input).toBeInTheDocument();
    await userEvent.click(input);
    await userEvent.type(input, "New");
    await expect(input).toHaveValue("New");
  }}
>
  <div class="w-full max-w-md mx-auto">
    <Combobox 
      options={cities}
      placeholder="Select a city"
    />
  </div>
</Story>

<Story name="With Objects">
  <div class="w-full max-w-md mx-auto">
    <Combobox 
      options={users}
      optionLabel="name"
      optionValue="id"
      placeholder="Select a user"
    />
  </div>
</Story>

<Story name="Custom Template">
  <div class="w-full max-w-md mx-auto">
    <Combobox 
      options={countries}
      optionLabel="name"
      optionValue="code"
      placeholder="Select a country"
    >
      {#snippet option({ option })}
        <div class="flex items-center">
          <span class="mr-2 text-lg">{option.flag}</span>
          <span>{option.name}</span>
          <span class="ml-2 text-xs text-muted">({option.code})</span>
        </div>
      {/snippet}
    </Combobox>
  </div>
</Story>

<Story
  name="Disabled"
  play={async ({ canvas }) => {
    const combobox = canvas.getByRole("combobox");
    await expect(combobox).toBeInTheDocument();
  }}
>
  <div class="w-full max-w-md mx-auto">
    <Combobox 
      options={cities}
      placeholder="Select a city"
      disabled
    />
  </div>
</Story>

<Story name="Readonly">
  <div class="w-full max-w-md mx-auto">
    <Combobox 
      options={cities}
      placeholder="Select a city"
      value="New York"
      readonly
    />
  </div>
</Story>

<Story name="Loading">
  <div class="w-full max-w-md mx-auto">
    <Combobox 
      options={cities}
      placeholder="Loading options..."
      loading
    />
  </div>
</Story>

<Story name="Non-Searchable">
  <div class="w-full max-w-md mx-auto">
    <Combobox 
      options={cities}
      placeholder="Select a city"
      searchable={false}
    />
  </div>
</Story>

<Story name="Non-Clearable">
  <div class="w-full max-w-md mx-auto">
    <Combobox 
      options={cities}
      placeholder="Select a city"
      clearable={false}
    />
  </div>
</Story>

<Story name="Auto-Select First">
  <div class="w-full max-w-md mx-auto">
    <Combobox 
      options={cities}
      placeholder="Select a city"
      autoSelect
    />
  </div>
</Story>

<Story name="With Initial Value">
  <div class="w-full max-w-md mx-auto">
    <Combobox 
      options={cities}
      placeholder="Select a city"
      value="Chicago"
    />
  </div>
</Story>

<Story name="With Object Initial Value">
  <div class="w-full max-w-md mx-auto">
    <Combobox 
      options={users}
      optionLabel="name"
      optionValue="id"
      placeholder="Select a user"
      value={2}
    />
  </div>
</Story>

<Story name="Form Integration">
  <div class="w-full max-w-md mx-auto space-y-4">
    <div>
      <label for="city-select" class="block text-sm font-medium mb-1">Billing City</label>
      <Combobox 
        id="city-select"
        name="city"
        options={cities}
        placeholder="Select a city"
        required
      />
    </div>
    
    <div>
      <label for="country-select" class="block text-sm font-medium mb-1">Country</label>
      <Combobox 
        id="country-select"
        name="country"
        options={countries}
        optionLabel="name"
        optionValue="code"
        placeholder="Select a country"
        required
      />
    </div>
    
    <button 
      type="button" 
      class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
    >
      Continue to payment
    </button>
  </div>
</Story>
