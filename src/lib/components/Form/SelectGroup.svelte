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
<script>
  const {
    /** @type {string} - Group label */
    label,

    /** @type {boolean} - Whether the group is disabled */
    disabled = false,

    children
  } = $props();
</script>

<optgroup {label} {disabled}>
  {@render children?.()}
</optgroup>
