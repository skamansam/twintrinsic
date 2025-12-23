<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import Combobox from "../lib/components/Form/Combobox.svelte"
import { fn } from "@storybook/test"

const { Story } = defineMeta({
  title: "Components/Form/Combobox",
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
    onChange: fn(),
    onInput: fn(),
  },
})

// Sample data for the combobox
const fruits = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Elderberry",
  "Fig",
  "Grape",
  "Honeydew",
  "Kiwi",
  "Lemon",
  "Mango",
  "Orange",
  "Papaya",
  "Quince",
  "Raspberry",
  "Strawberry",
  "Tangerine",
  "Watermelon",
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
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Editor" },
  { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", role: "Viewer" },
  { id: 4, name: "Alice Williams", email: "alice.williams@example.com", role: "Editor" },
  { id: 5, name: "Charlie Brown", email: "charlie.brown@example.com", role: "Viewer" },
  { id: 6, name: "Diana Miller", email: "diana.miller@example.com", role: "Admin" },
]
</script>

<Story name="Basic">
  <div class="w-full max-w-md mx-auto">
    <Combobox 
      options={fruits}
      placeholder="Select a fruit"
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
      let:option
    >
      <div class="flex items-center">
        <span class="mr-2 text-lg">{option.flag}</span>
        <span>{option.name}</span>
        <span class="ml-2 text-xs text-muted">({option.code})</span>
      </div>
    </Combobox>
  </div>
</Story>

<Story name="Disabled">
  <div class="w-full max-w-md mx-auto">
    <Combobox 
      options={fruits}
      placeholder="Select a fruit"
      disabled
    />
  </div>
</Story>

<Story name="Readonly">
  <div class="w-full max-w-md mx-auto">
    <Combobox 
      options={fruits}
      placeholder="Select a fruit"
      value="Apple"
      readonly
    />
  </div>
</Story>

<Story name="Loading">
  <div class="w-full max-w-md mx-auto">
    <Combobox 
      options={fruits}
      placeholder="Loading options..."
      loading
    />
  </div>
</Story>

<Story name="Non-Searchable">
  <div class="w-full max-w-md mx-auto">
    <Combobox 
      options={fruits}
      placeholder="Select a fruit"
      searchable={false}
    />
  </div>
</Story>

<Story name="Non-Clearable">
  <div class="w-full max-w-md mx-auto">
    <Combobox 
      options={fruits}
      placeholder="Select a fruit"
      clearable={false}
    />
  </div>
</Story>

<Story name="Auto-Select First">
  <div class="w-full max-w-md mx-auto">
    <Combobox 
      options={fruits}
      placeholder="Select a fruit"
      autoSelect
    />
  </div>
</Story>

<Story name="With Initial Value">
  <div class="w-full max-w-md mx-auto">
    <Combobox 
      options={fruits}
      placeholder="Select a fruit"
      value="Banana"
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
      <label for="fruit-select" class="block text-sm font-medium mb-1">Favorite Fruit</label>
      <Combobox 
        id="fruit-select"
        name="fruit"
        options={fruits}
        placeholder="Select a fruit"
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
      Submit
    </button>
  </div>
</Story>
