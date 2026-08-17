<!--
@component
SelectGroup - A component for grouping related options in a Select component.
Provides semantic grouping with optional labels.

Usage:
```svelte
<Select name="country">
  <SelectGroup label="Europe">
    <option value="fr">France</option>
    <option value="de">Germany</option>
  </SelectGroup>
  <SelectGroup label="North America">
    <option value="us">United States</option>
    <option value="ca">Canada</option>
  </SelectGroup>
</Select>
```
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "label", type: "string", description: "Group label", optional: false },
  { name: "disabled", type: "boolean", description: "Whether the group is disabled", default: "false", optional: true },
];
</script>

<script lang="ts">
const {
  /** @type {string} - Group label */
  label,

  /** @type {boolean} - Whether the group is disabled */
  disabled = false,

  children,
} = $props()
</script>

<optgroup {label} {disabled}>
  {@render children?.()}
</optgroup>
