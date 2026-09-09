<!--
@component
Timer documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import Timer, * as TimerModule from "$lib/components/Timer/Timer.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Timer</h1>

  <p>
    <strong>Timer</strong> displays a countdown or count-up with optional pause,
    resume, and reset controls. It pairs a large monospace readout with one of
    three display variants — a Progress bar, a GaugeChart, or a KPICard — so the
    same timing logic can back anything from a toast countdown to a Pomodoro
    session.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A self-contained timing component that counts down from a duration or counts
    up toward one. It fires update events on every tick, fires a complete event
    when the duration is reached, and can loop automatically. The readout is a
    live <code>role="timer"</code> region backed by a visual variant.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;Timer&gt;</code> whenever you need visible, controllable
    time: toast auto-dismiss countdowns, media or presentation timers, focus
    sessions, count-up trackers (time on task), or step-limited flows. When the
    progress is secondary to a number, prefer the <code>bar</code> variant; use
    <code>gauge</code> for a single-goal readout and <code>kpi</code> when the
    remaining time belongs in a dashboard card.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Consistent timing</strong> — one tick loop with pause/resume/reset semantics shared across display variants.</li>
    <li><strong>Accessible</strong> — the readout uses <code>role="timer"</code> so assistive tech can query the remaining time.</li>
    <li><strong>Composable</strong> — <code>onupdate</code> / <code>oncomplete</code> callbacks wire into toast dismissal, analytics, or state.</li>
    <li><strong>Deterministic</strong> — fixed 100&nbsp;ms ticks keep drift negligible without depending on rAF timing.</li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Centered column layout that scales down to small widths; the readout uses <code>tabular-nums</code> so digits never jitter.</li>
    <li>The <code>bar</code> variant is constrained with <code>max-w-sm</code>; gauge and KPI sizes come from the <code>size</code> / card layout.</li>
    <li>Control buttons meet the 44&times;44 px touch target minimum.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li>Modes: <code>countdown</code> (default) or <code>countup</code>.</li>
    <li>Variants: <code>bar</code> (Progress), <code>gauge</code> (GaugeChart), <code>kpi</code> (KPICard).</li>
    <li>Colors: <code>primary</code>, <code>secondary</code>, <code>success</code>, <code>danger</code>, <code>warning</code>, <code>info</code>.</li>
    <li><code>format</code> accepts a custom formatter; <code>label</code> titles the display.</li>
    <li><code>showControls</code> toggles the built-in buttons; <code>loop</code> restarts on completion.</li>
    <li><code>running</code> externally controls the countdown (e.g. pause on hover); omit it for self-managed timing via <code>autoStart</code> and the buttons.</li>
    <li><code>showReadout</code> hides the large time display for bar-only embedding (as used inside Toast).</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Countdown</h3>
  <ExampleTabs code={`<Timer duration={90} />`}>
    <div class="flex justify-center" data-testid="timer-countdown">
      <Timer duration={90} />
    </div>
  </ExampleTabs>

  <h3>Count Up</h3>
  <ExampleTabs code={`<Timer mode="countup" duration={30} label="Elapsed" />`}>
    <div class="flex justify-center" data-testid="timer-countup">
      <Timer mode="countup" duration={30} label="Elapsed" />
    </div>
  </ExampleTabs>

  <h3>Display Variants</h3>
  <ExampleTabs code={`<div class="flex flex-wrap gap-10 justify-center">
  <Timer duration={90} autoStart={false} />
  <Timer variant="gauge" duration={300} autoStart={false} label="Session" size={140} />
  <Timer variant="kpi" duration={120} autoStart={false} label="Deploy" />
</div>`}>
    <div class="flex flex-wrap gap-10 justify-center" data-testid="timer-variants">
      <Timer duration={90} autoStart={false} />
      <Timer variant="gauge" duration={300} autoStart={false} label="Session" size={140} />
      <Timer variant="kpi" duration={120} autoStart={false} label="Deploy" />
    </div>
  </ExampleTabs>

  <h3>Loop</h3>
  <ExampleTabs code={`<Timer duration={10} loop />`}>
    <div class="flex justify-center" data-testid="timer-loop">
      <Timer duration={10} loop />
    </div>
  </ExampleTabs>

  <h3>Custom Format</h3>
  <ExampleTabs code={`<Timer
  duration={30}
  autoStart={false}
  format={(milliseconds) => (milliseconds / 1000).toFixed(1) + "s"}
/>`}>
    <div class="flex justify-center" data-testid="timer-format">
      <Timer
        duration={30}
        autoStart={false}
        format={(milliseconds) => (milliseconds / 1000).toFixed(1) + "s"}
      />
    </div>
  </ExampleTabs>

  <h3>Without Controls</h3>
  <ExampleTabs code={`<Timer variant="gauge" duration={300} autoStart={false} showControls={false} label="Read only" />`}>
    <div class="flex justify-center" data-testid="timer-no-controls">
      <Timer variant="gauge" duration={300} autoStart={false} showControls={false} label="Read only" />
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={TimerModule} />

  <h2>Events</h2>
  <EventsTable component={TimerModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>The readout uses <code>role="timer"</code> with <code>aria-live="off"</code> semantics — screen readers announce it on demand instead of being spammed every tick.</li>
    <li>Control buttons carry explicit <code>aria-label</code>s that flip between "Pause timer" and "Resume timer" so the current action is always announced.</li>
    <li>The KPI variant is keyboard-operable (<code>role="button"</code>, Enter/Space toggles pause/resume).</li>
    <li>Focus rings are visible on all controls.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead><tr><th>Key</th><th>Function</th></tr></thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>Move focus between the pause/resume and reset buttons</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Activate the focused control (pause/resume or reset)</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd> on the KPI card</td><td>Toggle pause/resume</td></tr>
    </tbody>
  </table>
</Container>