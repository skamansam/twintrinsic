<!--
@component
Documentation home page
-->
<script>
  import Container from '$lib/components/Container/Container.svelte';
  import Separator from '$lib/components/Separator/Separator.svelte';
  
  let { children } = $props();
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  {@render children?.()}
  <h1>Twintrinsic Documentation</h1>
  
  <p>
    Welcome to the Twintrinsic documentation. Twintrinsic is a collection of
    accessible, customizable components built with Svelte 5 and Tailwind CSS.
  </p>

  <Separator>
    {@render children?.('Getting Started')}
  </Separator>

  <h2>Installation</h2>
  <pre class="language-bash"><code>npm install twintrinsic</code></pre>

  <h2>Usage</h2>
  <pre class="language-javascript"><code>{`// In your app.css
@import 'twintrinsic/styles.css';

// In your component
import { Container, AppHeader } from 'twintrinsic';`}</code></pre>

  <h2>Features</h2>
  <ul>
    <li>Built with Svelte 5 and Tailwind CSS</li>
    <li>Fully accessible components with ARIA support</li>
    <li>Responsive design with mobile-first approach</li>
    <li>Dark mode support out of the box</li>
    <li>Customizable theming</li>
    <li>TypeScript support</li>
  </ul>

  <Separator>
    {@render children?.('Components')}
  </Separator>

  <p>
    Twintrinsic provides a set of essential components to build modern web applications:
  </p>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="border border-border rounded-lg p-4">
      <h3 class="m-0">Layout Components</h3>
      <ul class="mt-2">
        <li>Container - Responsive container with consistent padding</li>
        <li>AppHeader - Application header with navigation</li>
        <li>Sidebar - Collapsible side panel</li>
        <li>BottomBar - Collapsible bottom panel</li>
      </ul>
    </div>

    <div class="border border-border rounded-lg p-4">
      <h3 class="m-0">UI Components</h3>
      <ul class="mt-2">
        <li>Panel - Collapsible content panel</li>
        <li>ButtonDropdown - Accessible dropdown menu</li>
        <li>Separator - Visual divider with optional content</li>
      </ul>
    </div>
  </div>

  <Separator>
    {@render children?.('Theming')}
  </Separator>

  <p>
    Twintrinsic uses CSS variables for theming. You can customize the look and feel
    by overriding these variables in your CSS:
  </p>

  <pre class="language-css"><code>{`:root {
  --color-primary-500: 59 130 246;   /* Blue */
  --color-secondary-500: 99 102 241;  /* Indigo */
  --color-background: 255 255 255;    /* White */
  --color-surface: 249 250 251;       /* Gray 50 */
  --color-border: 229 231 235;        /* Gray 200 */
  --color-text: 17 24 39;            /* Gray 900 */
  --color-muted: 107 114 128;        /* Gray 500 */
  --color-error-bold: 239 68 68;      /* Red */
}`}</code></pre>

  <h2>Dark Mode</h2>
  <p>
    Dark mode is supported out of the box. Add the following to your CSS to customize
    dark mode colors:
  </p>

  <pre class="language-css"><code>{`:root[data-theme="dark"] {
  --color-background: 17 24 39;       /* Gray 900 */
  --color-surface: 31 41 55;          /* Gray 800 */
  --color-border: 75 85 99;           /* Gray 600 */
  --color-text: 243 244 246;          /* Gray 100 */
  --color-muted: 156 163 175;         /* Gray 400 */
}`}</code></pre>
</Container>
