<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, userEvent } from "storybook/test"
import Tabs from "$lib/components/Tabs/Tabs.svelte"
import TabList from "$lib/components/Tabs/TabList.svelte"
import Tab from "$lib/components/Tabs/Tab.svelte"
import TabPanel from "$lib/components/Tabs/TabPanel.svelte"

const { Story } = defineMeta({
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: { type: "select" }, options: ["default", "underline", "pills", "enclosed"] },
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    fullWidth: { control: "boolean" },
    centered: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: { ariaLabel: "Documentation tabs" },
})
</script>

<Story
  name="Default"
  asChild
  play={async ({ canvas }) => {
    // First tab is selected on mount; its panel is not hidden.
    const tabs = canvas.getAllByRole("tab")
    await expect(tabs.length).toBe(3)
    await expect(tabs[0]).toHaveAttribute("aria-selected", "true")
    const panels = canvas.getAllByRole("tabpanel", { hidden: true })
    await expect(panels.length).toBe(3)
    await expect(panels[0]).not.toHaveAttribute("hidden")
    await expect(panels[1]).toHaveAttribute("hidden")

    // Clicking the second tab switches selection and shows its panel.
    await userEvent.click(canvas.getByRole("tab", { name: "Usage" }))
    await expect(canvas.getByRole("tab", { name: "Usage" })).toHaveAttribute("aria-selected", "true")
    await expect(canvas.getByRole("tab", { name: "Overview" })).toHaveAttribute("aria-selected", "false")
    await expect(panels[1]).not.toHaveAttribute("hidden")
    await expect(panels[0]).toHaveAttribute("hidden")
  }}
>
  <Tabs ariaLabel="Documentation tabs">
    <TabList>
      <Tab>Overview</Tab>
      <Tab>Usage</Tab>
      <Tab>API</Tab>
    </TabList>
    <TabPanel>Overview content</TabPanel>
    <TabPanel>Usage content</TabPanel>
    <TabPanel>API content</TabPanel>
  </Tabs>
</Story>

<Story
  name="Keyboard Navigation"
  asChild
  play={async ({ canvas }) => {
    // Arrow keys move focus and selection between tabs.
    const first = canvas.getByRole("tab", { name: "Billing" })
    first.focus()
    await userEvent.keyboard("{ArrowRight}")
    await expect(canvas.getByRole("tab", { name: "Team" })).toHaveAttribute("aria-selected", "true")
    await userEvent.keyboard("{ArrowRight}")
    await expect(canvas.getByRole("tab", { name: "Usage" })).toHaveAttribute("aria-selected", "true")
    await userEvent.keyboard("{End}")
    await expect(canvas.getByRole("tab", { name: "Usage" })).toHaveAttribute("aria-selected", "true")
    await userEvent.keyboard("{Home}")
    await expect(canvas.getByRole("tab", { name: "Billing" })).toHaveAttribute("aria-selected", "true")
  }}
>
  <Tabs ariaLabel="Account tabs">
    <TabList>
      <Tab>Billing</Tab>
      <Tab>Team</Tab>
      <Tab>Usage</Tab>
    </TabList>
    <TabPanel>Manage your invoices and payment method.</TabPanel>
    <TabPanel>Invite members and manage their roles.</TabPanel>
    <TabPanel>See your current plan limits and usage.</TabPanel>
  </Tabs>
</Story>

<Story
  name="Pills Variant"
  asChild
  play={async ({ canvas }) => {
    await expect(canvas.getByRole("tab", { name: "Monthly" })).toBeInTheDocument()
  }}
>
  <Tabs variant="pills" ariaLabel="Billing period">
    <TabList>
      <Tab>Monthly</Tab>
      <Tab>Yearly</Tab>
    </TabList>
    <TabPanel>Billed every month, cancel anytime.</TabPanel>
    <TabPanel>Billed yearly and save 20%.</TabPanel>
  </Tabs>
</Story>

<Story
  name="With Icons"
  asChild
  play={async ({ canvas }) => {
    // Tabs can render icons on either side of the label.
    const tab = canvas.getByRole("tab", { name: "Home" })
    await expect(tab.querySelector(".tab-icon-left")).not.toBeNull()
  }}
>
  <Tabs ariaLabel="Icons">
    <TabList>
      <Tab icon='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10"></path></svg>'>Home</Tab>
      <Tab icon='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>' iconPosition="right">Info</Tab>
    </TabList>
    <TabPanel>Home content</TabPanel>
    <TabPanel>Info content</TabPanel>
  </Tabs>
</Story>

<Story
  name="Disabled"
  asChild
  play={async ({ canvas }) => {
    // A disabled tab cannot be selected.
    const disabled = canvas.getByRole("tab", { name: "Enterprise" })
    await expect(disabled).toBeDisabled()
    await userEvent.click(disabled)
    await expect(disabled).toHaveAttribute("aria-selected", "false")
  }}
>
  <Tabs ariaLabel="Plan tabs">
    <TabList>
      <Tab>Starter</Tab>
      <Tab>Pro</Tab>
      <Tab disabled>Enterprise</Tab>
    </TabList>
    <TabPanel>For individuals and small teams getting started.</TabPanel>
    <TabPanel>For growing teams that need advanced controls.</TabPanel>
    <TabPanel>Contact sales to unlock enterprise features.</TabPanel>
  </Tabs>
</Story>
