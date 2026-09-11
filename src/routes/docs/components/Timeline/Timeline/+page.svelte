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
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.timeline_heading()}</h1>

  <p>
    <strong>{m.timeline_heading()}</strong>{m.timeline_intro_1()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>{m.timeline_what_1()}</p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.timeline_when_1()}<code>&lt;Timeline&gt;</code>{m.timeline_when_2()}<code>&lt;Breadcrumb&gt;</code>{m.timeline_when_3()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.timeline_why_chrono()}</strong>{m.timeline_why_chrono_desc()}</li>
    <li><strong>{m.timeline_why_status()}</strong>{m.timeline_why_status_desc()}</li>
    <li><strong>{m.timeline_why_a11y()}</strong> — <code>role="list"</code>{m.timeline_why_a11y_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://m3.material.io/components/divider/overview">Material Design 3 — Divider</a></li>
    <li><a href="https://ant.design/components/timeline">Ant Design — Timeline</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul">MDN — &lt;ul&gt;</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG</a></li>
    <li><a href="https://primer.style/components/timeline">Primer — Timeline</a></li>
  </ul>

<h2>{m.sec_implementation()}</h2>
<ul>
  <li>{m.timeline_impl_1_1()}<code>&lt;ol&gt;</code>{m.timeline_impl_1_2()}<code>&lt;li&gt;</code>{m.timeline_impl_1_3()}</li>
  <li><code>&lt;time datetime=&quot;...&quot;&gt;</code>{m.timeline_impl_2_1()}</li>
  <li>{m.timeline_impl_3_0()}<code>::before</code>{m.timeline_impl_3_1()}</li>
  <li>{m.timeline_impl_4()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
  <li>{m.timeline_mistake_1_0()}<code>&lt;ul&gt;</code>{m.timeline_mistake_1_1()}<code>&lt;ol&gt;</code>{m.timeline_mistake_1_2()}</li>
  <li>{m.timeline_mistake_2_0()}<code>&lt;time datetime=&quot;...&quot;&gt;</code>{m.timeline_mistake_2_1()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.timeline_related_1()}</p>

<h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.timeline_responsive_1()}</li>
    <li>{m.timeline_responsive_2()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li><code>variant</code>{m.timeline_custom_1_1()}</li>
    <li><code>ariaLabel</code>{m.timeline_custom_2_1()}</li>
    <li>{m.timeline_custom_3_0()}<code>variant</code>{m.timeline_custom_3_1()}<code>active</code>{m.timeline_custom_3_2()}<code>completed</code>{m.timeline_custom_3_3()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.timeline_ex_basic()}</h3>
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

  <h3>{m.timeline_ex_variants()}</h3>
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

  <h3>{m.timeline_ex_horizontal()}</h3>
  <ExampleTabs code={`<Timeline orientation="horizontal" ariaLabel="Sprint timeline">
  <TimelineItem title="Sprint 1" date="Week 1">Planning</TimelineItem>
  <TimelineItem title="Sprint 2" date="Week 2" variant="success">Development</TimelineItem>
  <TimelineItem title="Sprint 3" date="Week 3" variant="info">Testing</TimelineItem>
  <TimelineItem title="Launch" date="Week 4" variant="success" completed>Shipped</TimelineItem>
</Timeline>`}>
    <div class="border border-border rounded-md p-4 overflow-x-auto" data-testid="timeline-horizontal">
      <Timeline orientation="horizontal" ariaLabel="Sprint timeline">
        <TimelineItem title="Sprint 1" date="Week 1">Planning</TimelineItem>
        <TimelineItem title="Sprint 2" date="Week 2" variant="success">Development</TimelineItem>
        <TimelineItem title="Sprint 3" date="Week 3" variant="info">Testing</TimelineItem>
        <TimelineItem title="Launch" date="Week 4" variant="success" completed>Shipped</TimelineItem>
      </Timeline>
    </div>
  </ExampleTabs>

  <h3>{m.timeline_ex_alternate()}</h3>
  <ExampleTabs code={`<Timeline position="alternate" ariaLabel="Project history">
  <TimelineItem title="Kickoff" date="Jan 2026">Project started</TimelineItem>
  <TimelineItem title="Alpha" date="Mar 2026" variant="warning">Early preview</TimelineItem>
  <TimelineItem title="Launch" date="Jun 2026" variant="success" completed>Public release</TimelineItem>
</Timeline>`}>
    <div class="border border-border rounded-md p-4" data-testid="timeline-alternate">
      <Timeline position="alternate" ariaLabel="Project history">
        <TimelineItem title="Kickoff" date="Jan 2026">Project started</TimelineItem>
        <TimelineItem title="Alpha" date="Mar 2026" variant="warning">Early preview</TimelineItem>
        <TimelineItem title="Launch" date="Jun 2026" variant="success" completed>Public release</TimelineItem>
      </Timeline>
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={TimelineModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.timeline_a11y_1_0()}<code>role="list"</code>{m.timeline_a11y_1_1()}</li>
    <li>{m.timeline_a11y_2_0()}<code>role="listitem"</code>{m.timeline_a11y_2_1()}</li>
    <li>{m.timeline_a11y_3_0()}<code>completed</code>{m.timeline_a11y_3_1()}<code>active</code>{m.timeline_a11y_3_2()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <p>{m.timeline_kb_note()}</p>
</Container>
