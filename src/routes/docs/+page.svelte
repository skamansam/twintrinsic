<!--
@component
Documentation home page
-->
<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Separator from "$lib/components/Separator/Separator.svelte"

let { children } = $props()
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
  <CodeBlock language="bash">{`npm install twintrinsic`}</CodeBlock>

  <h3>Required Tailwind setup</h3>
  <p>
    Twintrinsic is styled with Tailwind CSS v4. The library's theme file
    (<code>twintrinsic/twintrinsic.css</code>) imports <code>tailwindcss</code>
    and declares the official <code>@tailwindcss/forms</code> and
    <code>@tailwindcss/typography</code> plugins via <code>@plugin</code>, so
    consumer apps must install those packages (they are not bundled):
  </p>
  <CodeBlock language="bash">{`npm install -D tailwindcss @tailwindcss/vite @tailwindcss/forms @tailwindcss/typography`}</CodeBlock>

  <p>
    Then wire up the Tailwind Vite plugin. Components use
    <code>lang="postcss"</code> styles with <code>@reference</code>, so the
    Svelte plugin needs its preprocessor:
  </p>
  <CodeBlock language="javascript">{`// vite.config.js
import { defineConfig } from 'vite';
import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    svelte({ preprocess: vitePreprocess() }),
  ],
});`}</CodeBlock>

  <h2>Usage</h2>
  <p>
    Import the library CSS once, then import components from the root barrel
    or from subpath exports (deep imports keep your bundle small):
  </p>
  <CodeBlock language="javascript">{`// In your app entry
import 'twintrinsic/twintrinsic.css';

// Root barrel - named imports
import { Container, AppHeader } from 'twintrinsic';

// Component subpaths - default imports
import Button from 'twintrinsic/components/Button';

// Helper subpaths - named imports (getItemLabel, getItemValue, ...)
import { getItemLabel } from 'twintrinsic/helpers/getItemLabel';`}</CodeBlock>

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

  <CodeBlock language="css">{`:root {
  --color-primary-500: 59 130 246;   /* Blue */
  --color-secondary-500: 99 102 241;  /* Indigo */
  --color-background: 255 255 255;    /* White */
  --color-surface: 249 250 251;       /* Gray 50 */
  --color-border: 229 231 235;        /* Gray 200 */
  --color-text: 17 24 39;            /* Gray 900 */
  --color-muted: 107 114 128;        /* Gray 500 */
  --color-error-bold: 239 68 68;      /* Red */
}`}</CodeBlock>

  <h2>Dark Mode</h2>
  <p>
    Dark mode is supported out of the box. Add the following to your CSS to customize
    dark mode colors:
  </p>

  <CodeBlock language="css">{`:root[data-theme="dark"] {
  --color-background: 17 24 39;       /* Gray 900 */
  --color-surface: 31 41 55;          /* Gray 800 */
  --color-border: 75 85 99;           /* Gray 600 */
  --color-text: 243 244 246;          /* Gray 100 */
  --color-muted: 156 163 175;         /* Gray 400 */
}`}</CodeBlock>

  <p>
    To avoid a brief flash of light mode on load, see the
    <a href="/docs/theming" class="text-primary-600 hover:underline">Theming docs</a>
    for the required <code>app.html</code> initializer.
  </p>
</Container>
