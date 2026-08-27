<script lang="ts">
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import Container from "$lib/components/Container/Container.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>Card</h1>

<p>
The Card component is a sub-component of Panel used for structuring and organizing content.
</p>

<h2>Features</h2>
<ul>
<li>Semantic HTML structure</li>
<li>Full accessibility support</li>
<li>Responsive design</li>
<li>Dark mode support</li>
</ul>

<h2>Accessibility</h2>
<ul>
<li>Semantic HTML with proper role attributes</li>
<li>Keyboard navigation support</li>
<li>Screen reader friendly</li>
</ul>

<style lang="postcss">
@reference '$lib/twintrinsic.css';
</style>

<h2>Twintrinsic Implementation</h2>
<ul>
    <li>Semantic `&lt;article&gt;` element as root</li>
    <li>Container Queries for responsive child layout</li>
    <li>`...rest` spread with `on&#36;&#123;string&#125;` event handler index signature</li>
    <li>Clickable cards use `&lt;a&gt;` or `&lt;button&gt;` as root (not `&lt;div onclick&gt;`)</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't use `&lt;div onclick&gt;` for clickable cards — use `&lt;a&gt;` or `&lt;button&gt;`</li>
    <li>Don't forget `role=&quot;region&quot;` + `aria-label` if the card is a landmark</li>
</ul>

<h2>Related Components</h2>
<p>Container, Section, Button</p>

</Container>
