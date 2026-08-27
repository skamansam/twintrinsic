<!--
@component
Timeline documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import Timeline from "$lib/components/Timeline/Timeline.svelte"
import TimelineItem from "$lib/components/Timeline/TimelineItem.svelte"
import * as TimelineModule from "$lib/components/Timeline/Timeline.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Timeline</h1>

  <p>
    <strong>Timeline</strong> displays chronological events or steps as a vertical (or
    horizontal) sequence of items, each with a title, date, and content. It supports
    variants, alternate positioning, and optional animation.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A list-based component that renders items in chronological order with visual connectors
    (lines and dots). Each item can have a title, date, status variant, and content area.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;Timeline&gt;</code> for activity feeds, project milestones, order histories,
    or any sequential events. For navigation breadcrumbs, use <code>&lt;Breadcrumb&gt;</code>.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Chronological display</strong> — visual sequence with connecting lines.</li>
    <li><strong>Status indicators</strong> — variants for different states (success, warning, info).</li>
    <li><strong>Accessible</strong> — <code>role="list"</code> with proper headings.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://m3.material.io/components/divider/overview">Material Design 3 — Divider</a></li>
    <li><a href="https://ant.design/components/timeline">Ant Design — Timeline</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul">MDN — &lt;ul&gt;</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG</a></li>
    <li><a href="https://primer.style/components/timeline">Primer — Timeline</a></li>
  </ul>

  
<h2>Twintrinsic Implementation</h2>
<ul>
    <li>Semantic `&lt;ol&gt;` + `&lt;li&gt;` for chronological ordering</li>
    <li>`&lt;time datetime=&quot;...&quot;&gt;` for machine-readable dates</li>
    <li>Connecting lines via CSS `::before` pseudo-element</li>
    <li>Vertical and horizontal layout variants</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't use `&lt;ul&gt;` — events have inherent order, so `&lt;ol&gt;` is correct</li>
    <li>Don't forget `&lt;time datetime=&quot;...&quot;&gt;` for screen readers and SEO</li>
</ul>

<h2>Related Components</h2>
<p>Stepper, Breadcrumb, Listbox</p>

<h2>Responsiveness</h2>
  <ul>
    <li>Full-width by default; items stack vertically.</li>
    <li>Content adapts to container width.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li><code>variant</code> — global color for the timeline connector.</li>
    <li><code>ariaLabel</code> — accessible name for the list.</li>
    <li>Per-item <code>variant</code>, <code>active</code>, <code>completed</code> states.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Timeline</h3>
  <ExampleTabs code={`<Timeline ariaLabel="Project timeline">
  <TimelineItem title="Kickoff" date="January 2026">Project started</TimelineItem>
  <TimelineItem title="Milestone" date="March 2026" variant="success">First release shipped</TimelineItem>
  <TimelineItem title="Retro" date="April 2026" variant="info">Team retro</TimelineItem>
</Timeline>`}>
    <div class="border border-border rounded-md p-4" data-testid="timeline-basic">
      <Timeline ariaLabel="Project timeline">
        <TimelineItem title="Kickoff" date="January 2026">Project started</TimelineItem>
        <TimelineItem title="Milestone" date="March 2026" variant="success">First release shipped</TimelineItem>
        <TimelineItem title="Retrospective" date="April 2026" variant="info">Team retro</TimelineItem>
      </Timeline>
    </div>
  </ExampleTabs>

  <h3>With Status</h3>
  <ExampleTabs code={`<Timeline variant="primary">
  <TimelineItem title="Planned" date="Jan 2023">Kicked off the project</TimelineItem>
  <TimelineItem title="In Progress" date="Feb 2023" variant="warning" active>Building</TimelineItem>
  <TimelineItem title="Done" date="Mar 2023" variant="success" completed>Shipped</TimelineItem>
</Timeline>`}>
    <div class="border border-border rounded-md p-4" data-testid="timeline-variants">
      <Timeline variant="primary">
        <TimelineItem title="Planned" date="Jan 2023">Kicked off the project</TimelineItem>
        <TimelineItem title="In Progress" date="Feb 2023" variant="warning" active>Building the components</TimelineItem>
        <TimelineItem title="Done" date="Mar 2023" variant="success" completed>Shipped the release</TimelineItem>
      </Timeline>
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={TimelineModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Renders <code>role="list"</code> with an accessible name.</li>
    <li>Each item is a <code>role="listitem"</code> with a heading for its title.</li>
    <li>Status is conveyed visually and via <code>completed</code>/<code>active</code> states.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <p>
    Timeline is a display-only element. Items maintain native list semantics.
  </p>
</Container>
