<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect } from "storybook/test"
import Section from "$lib/components/Section/Section.svelte"

const { Story } = defineMeta({
  title: "Basic/Section",
  component: Section,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
  },
  args: { title: "About Us", subtitle: "We build accessible components" },
})
</script>

<Story
  name="Default"
  play={async ({ canvas }) => {
    // Title renders as an h2, subtitle as a paragraph.
    await expect(canvas.getByRole("heading", { level: 2, name: "About Us" })).toBeInTheDocument()
    await expect(canvas.getByText("We build accessible components")).toBeInTheDocument()
    await expect(canvas.getByText("Since 2019, we've helped 4,000+ teams ship accessible interfaces faster.")).toBeInTheDocument()
  }}
>
  Since 2019, we've helped 4,000+ teams ship accessible interfaces faster.
</Story>

<Story
  name="No Title"
  args={{ title: "", subtitle: "Just a subtitle" }}
  play={async ({ canvas }) => {
    await expect(canvas.queryByRole("heading")).not.toBeInTheDocument()
    await expect(canvas.getByText("Just a subtitle")).toBeInTheDocument()
  }}
>
  Frequently asked questions about billing, security, and support.
</Story>

<Story
  name="With Class"
  args={{ title: "Custom Styled", class: "mb-8 bg-surface p-6 rounded-lg" }}
>
  Feature highlights: semantic HTML, WCAG compliance, and zero-dependency components.
</Story>
