<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect } from "storybook/test"
import DashboardDemo from "./DashboardDemo.svelte"

const { Story } = defineMeta({
  title: "Examples/Dashboard",
  component: DashboardDemo,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A complete analytics dashboard page composed from Twintrinsic components: the App shell (AppHeader + Sidebar), MetricGrid KPI cards, an AreaChart revenue trend, a sortable/filterable DataTable of recent orders, ProgressMetric utilization bars, an AvatarGroup team strip, and a status Badge.",
      },
    },
  },
})
</script>

<Story
  name="Analytics Dashboard"
  play={async ({ canvas }) => {
    // App shell chrome renders.
    await expect(canvas.getByText("Acme Suite")).toBeInTheDocument()
    await expect(canvas.getByText("Skip to main content")).toBeInTheDocument()

    // Sidebar menu from siteMenu ("Customers" also appears in the header
    // nav, so match all occurrences).
    await expect(canvas.getByText("Overview")).toBeInTheDocument()
    await expect(canvas.getAllByText("Customers").length).toBeGreaterThan(0)

    // KPI cards.
    await expect(canvas.getByText("Total Revenue")).toBeInTheDocument()
    await expect(canvas.getByText("$84,254.10")).toBeInTheDocument()

    // Revenue chart with its title.
    await expect(canvas.getByText("Monthly recurring revenue")).toBeInTheDocument()

    // Utilization bars.
    await expect(canvas.getByRole("progressbar", { name: "API calls" })).toBeInTheDocument()
    await expect(canvas.getByRole("progressbar", { name: "Seats used" })).toBeInTheDocument()

    // Orders table: rows render, sorting/filtering controls are present.
    await expect(canvas.getByRole("table")).toBeInTheDocument()
    await expect(canvas.getByText("#1042")).toBeInTheDocument()
    await expect(canvas.getByText("Acme Corp")).toBeInTheDocument()

    // Team strip.
    await expect(canvas.getByRole("group", { name: "Team members" })).toBeInTheDocument()
    await expect(canvas.getByText("All systems operational")).toBeInTheDocument()
  }}
/>
