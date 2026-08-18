<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect } from "storybook/test"
import Timeline from "$lib/components/Timeline/Timeline.svelte"
import TimelineItem from "$lib/components/Timeline/TimelineItem.svelte"

const { Story } = defineMeta({
  title: "Data Display/Timeline",
  component: Timeline,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "success", "warning", "error", "info"],
    },
    position: { control: { type: "select" }, options: ["left", "right", "alternate"] },
    orientation: { control: { type: "select" }, options: ["vertical", "horizontal"] },
    reverse: { control: "boolean" },
    connected: { control: "boolean" },
  },
  args: { variant: "primary" },
})
</script>

<Story
  name="Default"
  asChild
  play={async ({ canvas }) => {
    // The timeline exposes role="list" with item titles and dates.
    await expect(canvas.getByRole("list", { name: "Project timeline" })).toBeInTheDocument()
    const items = canvas.getAllByRole("listitem")
    await expect(items.length).toBe(3)
    await expect(canvas.getByRole("heading", { level: 3, name: "Kickoff" })).toBeInTheDocument()
    await expect(canvas.getByText("January 2025")).toBeInTheDocument()
  }}
>
  <Timeline ariaLabel="Project timeline">
    <TimelineItem title="Kickoff" date="January 2025">Project started</TimelineItem>
    <TimelineItem title="Milestone" date="March 2025" variant="success">First release shipped</TimelineItem>
    <TimelineItem title="Retrospective" date="April 2025" variant="info">Team retro</TimelineItem>
  </Timeline>
</Story>

<Story
  name="Completed Items"
  asChild
  play={async ({ canvas }) => {
    // Completed items render a check icon inside the marker.
    const completed = canvas.getByText("Done").closest(".timeline-item")
    await expect(completed).toHaveClass("timeline-item-completed")
  }}
>
  <Timeline>
    <TimelineItem title="Done" completed>Finished</TimelineItem>
    <TimelineItem title="Active" active>In progress</TimelineItem>
  </Timeline>
</Story>

<Story
  name="Horizontal"
  asChild
  play={async ({ canvas }) => {
    await expect(canvas.getByRole("list", { name: "Release pipeline" })).toBeInTheDocument()
    await expect(canvas.getAllByRole("listitem").length).toBe(4)
  }}
>
  <Timeline orientation="horizontal" ariaLabel="Release pipeline">
    <TimelineItem title="Plan">Sprint planning</TimelineItem>
    <TimelineItem title="Build">Feature development</TimelineItem>
    <TimelineItem title="Test">QA and code review</TimelineItem>
    <TimelineItem title="Ship">Deploy to production</TimelineItem>
  </Timeline>
</Story>

<Story name="Alternate Positions" asChild>
  <Timeline position="alternate" ariaLabel="Release timeline">
    <TimelineItem title="Beta" date="July 2026">Private beta opens to 500 testers</TimelineItem>
    <TimelineItem title="Release Candidate" date="August 2026" variant="success">Stable API freeze and performance pass</TimelineItem>
  </Timeline>
</Story>
