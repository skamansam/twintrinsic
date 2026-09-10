<script lang="ts">
  import { m } from "$lib/paraglide/messages.js"

  interface Props {
    /** Color theme */
    color?: "primary" | "success" | "warning"
    /** Additional CSS classes */
    class?: string
    /** Additional props passed through to the root element */
    [key: `data-${string}`]: unknown
  }

  let { color = "primary", class: className = "", ...restProps }: Props = $props()

  /** Tailwind classes per color theme */
  const colorClasses: Record<string, string> = {
    primary: "bg-primary-500/10 text-primary-500 ring-primary-500/30",
    success: "bg-success/10 text-success ring-success/30",
    warning: "bg-warning/10 text-warning ring-warning/30",
  }
</script>

<span
  {...restProps}
  class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 {colorClasses[color]} {className}"
>
  {m.pg_badge_label()}
</span>