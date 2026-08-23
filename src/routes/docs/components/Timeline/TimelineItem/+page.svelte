<!--
@component
TimelineItem documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Timeline from "$lib/components/Timeline/Timeline.svelte"
import TimelineItem from "$lib/components/Timeline/TimelineItem.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as TimelineItemModule from "$lib/components/Timeline/TimelineItem.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>TimelineItem</h1>

  <p>
    <strong>TimelineItem</strong> is an individual event within a <code>&lt;Timeline&gt;</code>.
    It renders a dot marker, connecting line, title, date, and content area.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A single event node in a Timeline. Renders as a <code>&lt;li&gt;</code> with a visual
    marker (dot), optional date, title, and body content. Supports status variants
    (success, warning, info, error) and active/completed states.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Always use <code>&lt;TimelineItem&gt;</code> inside a <code>&lt;Timeline&gt;</code>.
    Each event in your timeline gets its own <code>&lt;TimelineItem&gt;</code>.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Self-contained events</strong> — each item is an independent event node.</li>
    <li><strong>Status indicators</strong> — variants for different states.</li>
    <li><strong>Accessible</strong> — proper list semantics with headings.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://ant.design/components/timeline">Ant Design — Timeline</a></li>
    <li><a href="https://m3.material.io/components/divider/overview">Material Design 3 — Divider</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li">MDN — &lt;li&gt;</a></li>
    <li><a href="https://primer.style/components/timeline">Primer — Timeline</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG</a></li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Full-width within the parent Timeline.</li>
    <li>Content adapts to container width.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li><code>title</code> — event heading.</li>
    <li><code>date</code> — date or timestamp string.</li>
    <li><code>variant</code> — color variant (default, primary, success, warning, error, info).</li>
    <li><code>active</code> / <code>completed</code> — status states.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Usage</h3>
  <ExampleTabs code={`<Timeline>
  <TimelineItem title="Kickoff" date="January 2026">Project started</TimelineItem>
  <TimelineItem title="Milestone" date="March 2026" variant="success">Shipped v1</TimelineItem>
</Timeline>`}>
    <div class="border border-border rounded-md p-4" data-testid="timeline-item-basic">
      <Timeline>
        <TimelineItem title="Kickoff" date="January 2026">Project started</TimelineItem>
        <TimelineItem title="Milestone" date="March 2026" variant="success">First release shipped</TimelineItem>
      </Timeline>
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={TimelineItemModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Renders as <code>&lt;li&gt;</code> with proper list semantics.</li>
    <li>Title renders as a heading for screen reader navigation.</li>
    <li>Status is conveyed visually and via ARIA states.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <p>
    TimelineItem is a display-only element and does not require keyboard interaction.
  </p>
</Container>
