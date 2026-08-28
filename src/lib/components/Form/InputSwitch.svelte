<!--
@component
InputSwitch - Deprecated alias for Switch. Use Switch instead.

This component re-exports Switch for backward compatibility.
New code should use Switch directly.
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", optional: true },
  { name: "name", type: "string", description: "Name attribute", optional: true },
  { name: "label", type: "string", description: "Label text", optional: true },
  { name: "checked", type: "boolean", description: "Whether the switch is checked", optional: true },
  { name: "required", type: "boolean", description: "Whether the switch is required", optional: true },
  { name: "disabled", type: "boolean", description: "Whether the switch is disabled", optional: true },
  { name: "size", type: "\"sm\" | \"md\" | \"lg\"", description: "Size of the switch (sm, md, lg)", optional: true },
  { name: "ariaLabel", type: "string", description: "ARIA label for accessibility", optional: true },
  { name: "onchange", type: "(event: CustomEvent<{ checked: boolean }>) => void", description: "Change event handler", optional: true, eventDetail: "{ checked: boolean }" },
];
</script>

<script lang="ts">
import Switch from "./Switch.svelte"

interface Props {
  /** Additional CSS classes */
  class?: string
  /** HTML id for accessibility */
  id?: string
  /** Name attribute */
  name?: string
  /** Label text */
  label?: string
  /** Whether the switch is checked */
  checked?: boolean
  /** Whether the switch is required */
  required?: boolean
  /** Whether the switch is disabled */
  disabled?: boolean
  /** Size of the switch (sm, md, lg) */
  size?: "sm" | "md" | "lg"
  /** ARIA label for accessibility */
  ariaLabel?: string
  /** Change event handler */
  onchange?: (event: CustomEvent<{ checked: boolean }>) => void
  /** Additional props passed through to the underlying input */
  [key: `data-${string}`]: unknown
  [key: `aria-${string}`]: string | undefined
}

let { ...props }: Props = $props()
</script>

<Switch {...props} />
