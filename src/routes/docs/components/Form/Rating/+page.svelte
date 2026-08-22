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

let hoverRating = $state(0)
const ratingLabels: Record<number, string> = {
  0: 'Not rated', 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent'
}
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<h1>Rating</h1>

<p>
  <strong>Rating</strong> provides an interactive star-rating or custom-icon input
  for collecting user feedback, reviews, or satisfaction scores.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A row of selectable icons (stars by default) that map to numeric values.
  Supports half-star increments, custom icons (hearts, thumbs), and read-only display.
  Implements the WAI-ARIA slider pattern.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;Rating&gt;</code> for subjective quality assessments: product reviews,
  satisfaction surveys, content ratings. For objective numeric input, use
  <code>&lt;NumberInput&gt;</code> or <code>&lt;Slider&gt;</code>.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Familiar metaphor</strong> — star ratings are universally understood from e-commerce.</li>
  <li><strong>Visual</strong> — more engaging than a plain number input.</li>
  <li><strong>Accessible</strong> — WAI-ARIA slider pattern with <code>aria-valuetext</code> ("4 out of 5 stars").</li>
</ul>

<h2>Responsiveness</h2>
<ul>
  <li>Sizes: <code>sm</code>, <code>md</code>, <code>lg</code>.</li>
  <li>Touch targets meet 44×44 px minimum.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li>Icons: star (default), heart, or custom via Icon component.</li>
  <li>Variants: <code>default</code>, <code>primary</code>, <code>secondary</code>, <code>success</code>, <code>warning</code>, <code>error</code>, <code>info</code>.</li>
  <li>Half-star increments via <code>step={0.5}</code>.</li>
  <li>Max value (e.g., 10 stars) via <code>max</code>.</li>
  <li>Show numeric value via <code>showValue</code>.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<ExampleTabs code={`<Rating value={3} />`}>
  <div class="max-w-md" data-testid="rating-basic-usage"><Rating value={3} /></div>
</ExampleTabs>

<h3>Half-Star Ratings</h3>
<ExampleTabs code={`<Rating value={3.5} step={0.5} />`}>
  <div class="max-w-md" data-testid="rating-half-star"><Rating value={3.5} step={0.5} /></div>
</ExampleTabs>

<h3>Different Sizes</h3>
<ExampleTabs code={`<Rating value={4} size="sm" />
<Rating value={4} size="md" />
<Rating value={4} size="lg" />`}>
  <div class="max-w-md flex flex-col gap-2" data-testid="rating-sizes">
    <Rating value={4} size="sm" />
    <Rating value={4} size="md" />
    <Rating value={4} size="lg" />
  </div>
</ExampleTabs>

<h3>Read-only</h3>
<ExampleTabs code={`<Rating value={3.5} readonly={true} />`}>
  <div class="max-w-md" data-testid="rating-readonly"><Rating value={3.5} readonly={true} /></div>
</ExampleTabs>

<h3>With Value Display</h3>
<ExampleTabs code={`<Rating value={4} showValue={true} />`}>
  <div class="max-w-md" data-testid="rating-value-display"><Rating value={4} showValue={true} /></div>
</ExampleTabs>

<h2>Props</h2>
<PropsTable component={RatingModule} />

<h2>Events</h2>
<EventsTable component={RatingModule} />

<h2>Accessibility</h2>
<ul>
  <li><code>role="slider"</code> with <code>aria-valuemin</code>, <code>aria-valuemax</code>, <code>aria-valuenow</code>.</li>
  <li><code>aria-valuetext</code> provides human-readable value ("4 out of 5 stars").</li>
  <li>Arrow keys adjust rating; Home/End for min/max.</li>
  <li>Visible focus ring.</li>
</ul>

<h2>Keyboard Support</h2>
<table>
  <thead><tr><th>Key</th><th>Function</th></tr></thead>
  <tbody>
    <tr><td><kbd>Arrow Right</kbd> / <kbd>Arrow Up</kbd></td><td>Increase rating</td></tr>
    <tr><td><kbd>Arrow Left</kbd> / <kbd>Arrow Down</kbd></td><td>Decrease rating</td></tr>
    <tr><td><kbd>Home</kbd></td><td>Set to minimum</td></tr>
    <tr><td><kbd>End</kbd></td><td>Set to maximum</td></tr>
  </tbody>
</table>
