<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import Timeline from "$lib/components/Timeline/Timeline.svelte"
import * as TimelineModule from "$lib/components/Timeline/Timeline.svelte"
import TimelineItem from "$lib/components/Timeline/TimelineItem.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Timeline</h1>

  <p>
    The Timeline component displays chronological events or steps as a vertical
    (or horizontal) sequence of items, each with a title, date, and content.
    It supports variants, alternate positioning, and optional animation.
  </p>

  <h2>Usage</h2>

  <h3>Basic Timeline</h3>
  <div class="not-prose border border-border rounded-md p-4 mb-4" data-testid="timeline-basic">
    <Timeline ariaLabel="Project timeline">
      <TimelineItem title="Kickoff" date="January 2026">Project started</TimelineItem>
      <TimelineItem title="Milestone" date="March 2026" variant="success">First release shipped</TimelineItem>
      <TimelineItem title="Retrospective" date="April 2026" variant="info">Team retro</TimelineItem>
    </Timeline>
  </div>

  <CodeBlock language="svelte">{`<Timeline ariaLabel="Project timeline">
  <TimelineItem title="Kickoff" date="January 2026">Project started</TimelineItem>
  <TimelineItem title="Milestone" date="March 2026" variant="success">First release shipped</TimelineItem>
  <TimelineItem title="Retrospective" date="April 2026" variant="info">Team retro</TimelineItem>
</Timeline>`}</CodeBlock>

  <h3>With Dates, Variants, and Status</h3>
  <div class="not-prose border border-border rounded-md p-4 mb-4" data-testid="timeline-variants">
    <Timeline variant="primary">
      <TimelineItem title="Planned" date="Jan 2023">Kicked off the project</TimelineItem>
      <TimelineItem title="In Progress" date="Feb 2023" variant="warning" active>
        Building the components
      </TimelineItem>
      <TimelineItem title="Done" date="Mar 2023" variant="success" completed>
        Shipped the release
      </TimelineItem>
    </Timeline>
  </div>

  <CodeBlock language="svelte">{`<Timeline variant="primary">
  <TimelineItem title="Planned" date="Jan 2023">Kicked off the project</TimelineItem>
  <TimelineItem title="In Progress" date="Feb 2023" variant="warning" active>
    Building the components
  </TimelineItem>
  <TimelineItem title="Done" date="Mar 2023" variant="success" completed>
    Shipped the release
  </TimelineItem>
</Timeline>`}</CodeBlock>

  <h2>Props</h2>
  <PropsTable component={TimelineModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Renders a <code>role="list"</code> container with an accessible name</li>
    <li>Each item is a <code>role="listitem"</code> with a heading for its title</li>
    <li>Status is conveyed visually and via the <code>completed</code>/<code>active</code> states</li>
    <li>Animated items start hidden and reveal when scrolled into view</li>
  </ul>
</Container>
