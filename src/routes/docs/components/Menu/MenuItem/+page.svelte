<script lang="ts">
	import { PropsTable } from "$lib/docs/index.js"
	import { Menu, MenuItem } from "$lib/index.js"
</script>

<h1>MenuItem</h1>

<p>
	The MenuItem component represents individual items within a Menu. It supports links, buttons, active states, disabled states, and nested submenus.
</p>

<h2>Examples</h2>

<h3>Basic Menu Items</h3>
<p>Menu items can be used as links or buttons:</p>

<h3>Active State</h3>
<p>Use the <code>active</code> prop to highlight the current menu item:</p>

<h3>Disabled State</h3>
<p>Use the <code>disabled</code> prop to disable interaction:</p>

<h3>With Submenu</h3>
<p>Menu items can have nested submenus using the <code>value</code> prop with a <code>children</code> array:</p>

<h2>Props</h2>
<PropsTable
	props={[
		{
			name: 'href',
			type: 'string',
			default: "'#'",
			description: 'Link href. If provided, renders as an anchor tag; otherwise renders as a button.'
		},
		{
			name: 'active',
			type: 'boolean',
			default: 'false',
			description: 'Whether the menu item is currently active'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Whether the menu item is disabled'
		},
		{
			name: 'initialOpen',
			type: 'boolean',
			default: 'false',
			description: 'Whether the submenu is initially open'
		},
		{
			name: 'ariaLabel',
			type: 'string',
			default: "''",
			description: 'ARIA label for accessibility'
		},
		{
			name: 'id',
			type: 'string',
			default: 'crypto.randomUUID()',
			description: 'HTML id for accessibility'
		},
		{
			name: 'class',
			type: 'string',
			default: "''",
			description: 'Additional CSS classes'
		},
		{
			name: 'value',
			type: 'any',
			default: '{}',
			description: 'Value associated with this menu item. Can include a children array for submenus.'
		}
	]}
/>

<h2>Slots</h2>
<p>
	MenuItem accepts a default slot for custom content:
</p>
<ul>
	<li><strong>default</strong> - The content of the menu item</li>
</ul>

<h2>Features</h2>
<ul>
	<li>Flexible rendering as link or button based on href prop</li>
	<li>Active and disabled states</li>
	<li>Nested submenu support</li>
	<li>Full keyboard navigation support</li>
	<li>ARIA labels for accessibility</li>
	<li>Responsive design</li>
	<li>Dark mode support</li>
</ul>

<h2>Accessibility</h2>
<ul>
	<li>Semantic HTML with proper role attributes</li>
	<li>ARIA labels for screen readers</li>
	<li>Keyboard navigation support</li>
	<li>Proper disabled state handling</li>
	<li>Focus management for submenus</li>
</ul>

<style lang="postcss">
	@reference '$lib/twintrinsic.css';
</style>
