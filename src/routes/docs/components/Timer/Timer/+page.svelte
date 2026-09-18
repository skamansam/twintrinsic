<!--
@component
Timer documentation page — standardized structure
-->
<script lang="ts">
import BrowserApiBadge from "$lib/components/BrowserApiBadge/BrowserApiBadge.svelte"
import Container from "$lib/components/Container/Container.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import Timer, * as TimerModule from "$lib/components/Timer/Timer.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <div class="flex flex-wrap items-center gap-3">
  <h1>{m.timer_heading()}</h1>
  <BrowserApiBadge component="Timer" />
</div>

  <p>
    <strong>{m.timer_heading()}</strong>{m.timer_intro_1()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.timer_what_1()}<code>role="timer"</code>{m.timer_what_2()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.timer_when_1()}<code>&lt;Timer&gt;</code>{m.timer_when_2()}<code>bar</code>{m.timer_when_3()}<code>gauge</code>{m.timer_when_4()}<code>kpi</code>{m.timer_when_5()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.timer_why_consistent()}</strong>{m.timer_why_consistent_desc()}</li>
    <li><strong>{m.timer_why_accessible()}</strong>{m.timer_why_accessible_1()}<code>role="timer"</code>{m.timer_why_accessible_2()}</li>
    <li><strong>{m.timer_why_composable()}</strong>{m.timer_why_composable_1()}<code>onupdate</code>{m.timer_why_composable_2()}<code>oncomplete</code>{m.timer_why_composable_3()}</li>
    <li><strong>{m.timer_why_deterministic()}</strong>{m.timer_why_deterministic_desc()}</li>
  </ul>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.timer_responsive_1()}<code>tabular-nums</code>{m.timer_responsive_2()}</li>
    <li>{m.timer_responsive_3()}<code>bar</code>{m.timer_responsive_4()}<code>max-w-sm</code>{m.timer_responsive_5()}<code>gauge</code>{m.timer_responsive_6()}<code>kpi</code>{m.timer_responsive_7()}<code>size</code>{m.timer_responsive_8()}</li>
    <li>{m.timer_responsive_9()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.timer_custom_1_1()}<code>countdown</code>{m.timer_custom_1_2()}<code>countup</code>{m.timer_custom_1_3()}</li>
    <li>{m.timer_custom_2_1()}<code>bar</code>{m.timer_custom_2_2()}<code>gauge</code>{m.timer_custom_2_3()}<code>kpi</code>{m.timer_custom_2_4()}</li>
    <li>{m.timer_custom_3_1()}<code>primary</code>{m.timer_custom_3_2()}<code>secondary</code>{m.timer_custom_3_3()}<code>success</code>{m.timer_custom_3_4()}<code>danger</code>{m.timer_custom_3_5()}<code>warning</code>{m.timer_custom_3_6()}<code>info</code>{m.timer_custom_3_7()}</li>
    <li>{m.timer_custom_4_1()}<code>format</code>{m.timer_custom_4_2()}<code>label</code>{m.timer_custom_4_3()}</li>
    <li>{m.timer_custom_5_1()}<code>showControls</code>{m.timer_custom_5_2()}<code>loop</code>{m.timer_custom_5_3()}</li>
    <li>{m.timer_custom_6_1()}<code>running</code>{m.timer_custom_6_2()}<code>autoStart</code>{m.timer_custom_6_3()}</li>
    <li>{m.timer_custom_7_1()}<code>showReadout</code>{m.timer_custom_7_2()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.timer_ex_basic()}</h3>
  <ExampleTabs code={`<Timer duration={90} />`}>
    <div class="flex justify-center" data-testid="timer-countdown">
      <Timer duration={90} />
    </div>
  </ExampleTabs>

  <h3>{m.timer_ex_countup()}</h3>
  <ExampleTabs code={`<Timer mode="countup" duration={30} label="Elapsed" />`}>
    <div class="flex justify-center" data-testid="timer-countup">
      <Timer mode="countup" duration={30} label="Elapsed" />
    </div>
  </ExampleTabs>

  <h3>{m.timer_ex_variants()}</h3>
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

  <h3>{m.timer_ex_loop()}</h3>
  <ExampleTabs code={`<Timer duration={10} loop />`}>
    <div class="flex justify-center" data-testid="timer-loop">
      <Timer duration={10} loop />
    </div>
  </ExampleTabs>

  <h3>{m.timer_ex_format()}</h3>
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

  <h3>{m.timer_ex_nocontrols()}</h3>
  <ExampleTabs code={`<Timer variant="gauge" duration={300} autoStart={false} showControls={false} label="Read only" />`}>
    <div class="flex justify-center" data-testid="timer-no-controls">
      <Timer variant="gauge" duration={300} autoStart={false} showControls={false} label="Read only" />
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={TimerModule} />

  <h2>{m.sec_events()}</h2>
  <EventsTable component={TimerModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.timer_a11y_1()}<code>role="timer"</code>{m.timer_a11y_2()}<code>aria-live="off"</code>{m.timer_a11y_3()}</li>
    <li>{m.timer_a11y_4()}<code>aria-label</code>{m.timer_a11y_5()}</li>
    <li>{m.timer_a11y_6()}<code>role="button"</code>{m.timer_a11y_7()}</li>
    <li>{m.timer_a11y_8()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>{m.timer_kb_1()}</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.timer_kb_2()}</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd> {m.timer_kb_3_1()}</td><td>{m.timer_kb_3()}</td></tr>
    </tbody>
  </table>
</Container>
