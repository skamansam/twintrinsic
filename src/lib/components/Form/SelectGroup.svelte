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
interface Props {
  /** Additional props passed through to the root element */
  [key: `data-${string}`]: unknown
  [key: `aria-${string}`]: string | undefined
  /** Group label */
  label: string
  /** Whether the group is disabled */
  disabled?: boolean
  /** Children content */
  children?: import('svelte').Snippet
}

const {
  label,
  disabled = false,
  children,
  ...restProps
}: Props = $props()
</script>

<optgroup {label} {disabled} {...restProps}>
  {@render children?.()}
</optgroup>
