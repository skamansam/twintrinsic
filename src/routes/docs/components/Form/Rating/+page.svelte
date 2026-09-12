<!--
@component
Rating documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Rating from "$lib/components/Form/Rating.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as RatingModule from "$lib/components/Form/Rating.svelte"
import Container from "$lib/components/Container/Container.svelte"
import { m } from "$lib/paraglide/messages.js"

let hoverRating = $state(0)
const ratingLabels: Record<number, string> = {
  0: 'Not rated', 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent'
}
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>{m.rating_heading()}</h1>

<p>
  <strong>{m.rating_heading()}</strong>{m.rating_lede_1()}
</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>{m.rating_what_1()}</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.rating_when_1()}<code>&lt;Rating&gt;</code>{m.rating_when_2()}<code>&lt;NumberInput&gt;</code>{m.rating_when_3()}<code>&lt;Slider&gt;</code>{m.rating_when_4()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.rating_why_familiar()}</strong>{m.rating_why_familiar_1()}</li>
  <li><strong>{m.rating_why_visual()}</strong>{m.rating_why_visual_1()}</li>
  <li><strong>{m.rating_why_accessible()}</strong>{m.rating_why_accessible_1()}<code>aria-valuetext</code>{m.rating_why_accessible_2()}</li>
</ul>

<h3>{m.sec_sources()}</h3>
<ul>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/slider/">WAI-ARIA APG — Slider (rating variant)</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-valuetext">MDN — aria-valuetext</a></li>
</ul>

<h2>{m.sec_implementation()}</h2>
<ul>
    <li>{m.rating_impl_1()}</li>
    <li>{m.rating_impl_2()}</li>
    <li>{m.rating_impl_3()}</li>
    <li>{m.rating_impl_4()}</li>
    <li>{m.rating_impl_5()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
    <li>{m.rating_mistake_1()}</li>
    <li>{m.rating_mistake_2()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.rating_related_1()}</p>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.rating_responsive_1_1()}<code>sm</code>, <code>md</code>, <code>lg</code>{m.rating_responsive_1_2()}</li>
  <li>{m.rating_responsive_2()}</li>
</ul>

<h2>{m.sec_customization()}</h2>
<ul>
  <li>{m.rating_custom_1_1()}</li>
  <li>{m.rating_custom_2_1()}<code>default</code>, <code>primary</code>, <code>secondary</code>, <code>success</code>, <code>warning</code>, <code>error</code>, <code>info</code>{m.rating_custom_2_2()}</li>
  <li>{m.rating_custom_3_1()}<code>step={0.5}</code>{m.rating_custom_3_2()}</li>
  <li>{m.rating_custom_4_1()}<code>max</code>{m.rating_custom_4_2()}</li>
  <li>{m.rating_custom_5_1()}<code>showValue</code>{m.rating_custom_5_2()}</li>
</ul>

<h2>{m.sec_examples()}</h2>

<h3>{m.rating_ex_basic()}</h3>
<ExampleTabs code={`<Rating value={3} />`}>
  <div class="max-w-md" data-testid="rating-basic-usage"><Rating value={3} /></div>
</ExampleTabs>

<h3>{m.rating_ex_half()}</h3>
<ExampleTabs code={`<Rating value={3.5} step={0.5} />`}>
  <div class="max-w-md" data-testid="rating-half-star"><Rating value={3.5} step={0.5} /></div>
</ExampleTabs>

<h3>{m.rating_ex_sizes()}</h3>
<ExampleTabs code={`<Rating value={4} size="sm" />
<Rating value={4} size="md" />
<Rating value={4} size="lg" />`}>
  <div class="max-w-md flex flex-col gap-2" data-testid="rating-sizes">
    <Rating value={4} size="sm" />
    <Rating value={4} size="md" />
    <Rating value={4} size="lg" />
  </div>
</ExampleTabs>

<h3>{m.rating_ex_readonly()}</h3>
<ExampleTabs code={`<Rating value={3.5} readonly={true} />`}>
  <div class="max-w-md" data-testid="rating-readonly"><Rating value={3.5} readonly={true} /></div>
</ExampleTabs>

<h3>{m.rating_ex_value()}</h3>
<ExampleTabs code={`<Rating value={4} showValue={true} />`}>
  <div class="max-w-md" data-testid="rating-value-display"><Rating value={4} showValue={true} /></div>
</ExampleTabs>

  <h3>{m.rating_ex_max()}</h3>
  <ExampleTabs code={`<Rating value={3} max={10} />`}>
    <div data-testid="rating-custom-max">
      <Rating value={3} max={10} />
    </div>
  </ExampleTabs>

  <h3>{m.rating_ex_states()}</h3>
  <ExampleTabs code={`<Rating value={4} readonly />
<Rating value={2} disabled />`}>
    <div class="flex gap-8" data-testid="rating-states">
      <Rating value={4} readonly />
      <Rating value={2} disabled />
    </div>
  </ExampleTabs>

<h2>{m.sec_props()}</h2>
<PropsTable component={RatingModule} />

<h2>{m.sec_events()}</h2>
<EventsTable component={RatingModule} />

<h2>{m.sec_accessibility()}</h2>
<ul>
  <li><code>role="slider"</code>{m.rating_a11y_1_2()}<code>aria-valuemin</code>{m.rating_a11y_1_3()}<code>aria-valuemax</code>, <code>aria-valuenow</code>{m.rating_a11y_1_4()}</li>
  <li><code>aria-valuetext</code>{m.rating_a11y_2_2()}</li>
  <li>{m.rating_a11y_3()}</li>
  <li>{m.rating_a11y_4()}</li>
</ul>

<h2>{m.sec_keyboard()}</h2>
<table>
  <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
  <tbody>
    <tr><td><kbd>Arrow Right</kbd> / <kbd>Arrow Up</kbd></td><td>{m.rating_kb_right()}</td></tr>
    <tr><td><kbd>Arrow Left</kbd> / <kbd>Arrow Down</kbd></td><td>{m.rating_kb_left()}</td></tr>
    <tr><td><kbd>Home</kbd></td><td>{m.rating_kb_home()}</td></tr>
    <tr><td><kbd>End</kbd></td><td>{m.rating_kb_end()}</td></tr>
  </tbody>
</table>
</Container>
