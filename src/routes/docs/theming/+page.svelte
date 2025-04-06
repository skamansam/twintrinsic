<!--
@component
Theming documentation page
-->
<script>
  import Container from '$lib/components/Container/Container.svelte';
  import Separator from '$lib/components/Separator/Separator.svelte';
  import Panel from '$lib/components/Panel/Panel.svelte';

  const colorScales = [
    'primary',
    'secondary',
    'error',
    'warning',
    'success',
    'info'
  ];

  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Theming</h1>
  
  <p>
    Twintrinsic uses CSS variables and Tailwind CSS for theming. You can customize
    the look and feel of your application by modifying these variables.
  </p>

  <Separator>Color System</Separator>

  <h2>Base Colors</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-8">
    <div class="space-y-2">
      <div class="flex items-center gap-2 p-4 rounded-md bg-background border border-border">
        <div class="w-6 h-6 rounded bg-background border border-border"></div>
        <div>
          <div class="font-medium">Background</div>
          <div class="text-sm text-muted">--color-background</div>
        </div>
      </div>
      <div class="flex items-center gap-2 p-4 rounded-md bg-surface border border-border">
        <div class="w-6 h-6 rounded bg-surface border border-border"></div>
        <div>
          <div class="font-medium">Surface</div>
          <div class="text-sm text-muted">--color-surface</div>
        </div>
      </div>
      <div class="flex items-center gap-2 p-4 rounded-md border border-border">
        <div class="w-6 h-6 rounded border-2 border-border"></div>
        <div>
          <div class="font-medium">Border</div>
          <div class="text-sm text-muted">--color-border</div>
        </div>
      </div>
    </div>
    <div class="space-y-2">
      <div class="flex items-center gap-2 p-4 rounded-md border border-border">
        <div class="w-6 h-6 rounded bg-text"></div>
        <div>
          <div class="font-medium">Text</div>
          <div class="text-sm text-muted">--color-text</div>
        </div>
      </div>
      <div class="flex items-center gap-2 p-4 rounded-md border border-border">
        <div class="w-6 h-6 rounded bg-muted"></div>
        <div>
          <div class="font-medium">Muted</div>
          <div class="text-sm text-muted">--color-muted</div>
        </div>
      </div>
    </div>
  </div>

  <h2>Color Scales</h2>
  <div class="space-y-4 not-prose">
    {#each colorScales as color}
      <Panel>
        <svelte:fragment slot="header">
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </svelte:fragment>
        <div class="grid grid-cols-10 gap-2">
          {#each shades as shade}
            <div
              class="flex flex-col items-center"
              style="--color: rgb(var(--color-{color}-{shade}))"
            >
              <div
                class="w-full aspect-square rounded-md mb-1"
                style="background-color: var(--color)"
              ></div>
              <div class="text-xs">{shade}</div>
            </div>
          {/each}
        </div>
      </Panel>
    {/each}
  </div>

  <Separator>Customization</Separator>

  <h2>CSS Variables</h2>
  <p>
    To customize the theme, override these CSS variables in your stylesheet:
  </p>

  <pre class="language-css"><code>{`:root {
  /* Base colors */
  --color-background: 255 255 255;    /* White */
  --color-surface: 249 250 251;       /* Gray 50 */
  --color-border: 229 231 235;        /* Gray 200 */
  --color-text: 17 24 39;            /* Gray 900 */
  --color-muted: 107 114 128;        /* Gray 500 */

  /* Primary colors */
  --color-primary-50: 239 246 255;
  --color-primary-100: 219 234 254;
  --color-primary-200: 191 219 254;
  --color-primary-300: 147 197 253;
  --color-primary-400: 96 165 250;
  --color-primary-500: 59 130 246;
  --color-primary-600: 37 99 235;
  --color-primary-700: 29 78 216;
  --color-primary-800: 30 64 175;
  --color-primary-900: 30 58 138;

  /* Secondary colors */
  --color-secondary-500: 99 102 241;

  /* Error colors */
  --color-error-500: 239 68 68;

  /* Success colors */
  --color-success-500: 34 197 94;

  /* Warning colors */
  --color-warning-500: 234 179 8;

  /* Info colors */
  --color-info-500: 6 182 212;
}`}</code></pre>

  <h2>Dark Mode</h2>
  <p>
    Dark mode is supported through the <code>data-theme="dark"</code> attribute on
    the root element. Customize dark mode colors by overriding these variables:
  </p>

  <pre class="language-css"><code>{`:root[data-theme="dark"] {
  --color-background: 17 24 39;       /* Gray 900 */
  --color-surface: 31 41 55;          /* Gray 800 */
  --color-border: 75 85 99;           /* Gray 600 */
  --color-text: 243 244 246;          /* Gray 100 */
  --color-muted: 156 163 175;         /* Gray 400 */
}`}</code></pre>

  <h2>Tailwind Configuration</h2>
  <p>
    The theme is also available through Tailwind CSS utility classes. Here's how to
    configure your <code>tailwind.config.js</code>:
  </p>

  <pre class="language-javascript"><code>{`module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'rgb(var(--color-primary-50) / <alpha-value>)',
          // ... other shades
          500: 'rgb(var(--color-primary-500) / <alpha-value>)',
          // ... other shades
          900: 'rgb(var(--color-primary-900) / <alpha-value>)',
        },
        // ... other color scales
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        text: 'rgb(var(--color-text) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
      },
    },
  },
}`}</code></pre>
</Container>
