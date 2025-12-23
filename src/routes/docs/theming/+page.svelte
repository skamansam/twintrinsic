<!--
@component
Theming documentation page
-->
<script>
import Container from "$lib/components/Container/Container.svelte"
import Separator from "$lib/components/Separator/Separator.svelte"
import Panel from "$lib/components/Panel/Panel.svelte"
import Button from "$lib/components/Button/Button.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"

const colorScales = ["primary", "secondary", "success", "warning", "error", "info"]
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

// Helper function to determine if text should be light or dark based on background
function getTextColor(colorName, shade) {
  // Generally, shades 500+ need light text
  return shade >= 500 ? "text-white" : "text-text"
}

// Sample text for color examples
const sampleText = "Aa"

// Text/background combinations to showcase
const textBgCombinations = [
  {
    name: "Default",
    textClass: "text-text",
    bgClass: "bg-background",
    description: "Default text on background",
  },
  {
    name: "Primary",
    textClass: "text-primary-700",
    bgClass: "bg-primary-50",
    description: "Primary text on light primary background",
  },
  {
    name: "Primary Inverse",
    textClass: "text-white",
    bgClass: "bg-primary-700",
    description: "White text on dark primary background",
  },
  {
    name: "Secondary",
    textClass: "text-secondary-700",
    bgClass: "bg-secondary-50",
    description: "Secondary text on light secondary background",
  },
  {
    name: "Secondary Inverse",
    textClass: "text-white",
    bgClass: "bg-secondary-700",
    description: "White text on dark secondary background",
  },
  {
    name: "Success",
    textClass: "text-success-700",
    bgClass: "bg-success-50",
    description: "Success text on light success background",
  },
  {
    name: "Warning",
    textClass: "text-warning-700",
    bgClass: "bg-warning-50",
    description: "Warning text on light warning background",
  },
  {
    name: "Error",
    textClass: "text-error-700",
    bgClass: "bg-error-50",
    description: "Error text on light error background",
  },
  {
    name: "Info",
    textClass: "text-info-700",
    bgClass: "bg-info-50",
    description: "Info text on light info background",
  },
  {
    name: "Muted",
    textClass: "text-muted",
    bgClass: "bg-surface",
    description: "Muted text on surface background",
  },
]

// Button examples with different colors
const buttonExamples = [
  { color: "primary", label: "Primary" },
  { color: "secondary", label: "Secondary" },
  { color: "success", label: "Success" },
  { color: "warning", label: "Warning" },
  { color: "error", label: "Error" },
  { color: "info", label: "Info" },
]
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
  <p>
    Twintrinsic provides a comprehensive color system with 10 shades for each color scale (50-900).
    These color scales provide a consistent palette for your application.
  </p>
  <div class="space-y-6 not-prose">
    {#each colorScales as color}
      <Panel>
        <svelte:fragment slot="header">
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </svelte:fragment>
        <div class="grid grid-cols-10 gap-2">
          {#each shades as shade}
            <div
              class="flex flex-col items-center"
              style="--color: var(--color-{color}-{shade})"
            >
              <div
                class="w-full aspect-square rounded-md mb-1 flex items-center justify-center {getTextColor(color, shade)}"
                style="background-color: var(--color)"
              >
                <span class="text-xs font-medium">{sampleText}</span>
              </div>
              <div class="text-xs">{shade}</div>
            </div>
          {/each}
        </div>
        <div class="mt-4">
          <CodeBlock>
{`/* CSS Variable */
var(--color-${color}-500)

/* Tailwind Class */
.bg-${color}-500
.text-${color}-500
.border-${color}-500`}
          </CodeBlock>
        </div>
      </Panel>
    {/each}
  </div>
  
  <h2 class="mt-8">Text & Background Combinations</h2>
  <p>
    Here are some common text and background color combinations that provide good contrast and follow
    accessibility guidelines. Use these combinations for consistent UI elements.
  </p>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-8">
    {#each textBgCombinations as combo}
      <div class="border border-border rounded-md overflow-hidden">
        <div class="{combo.bgClass} {combo.textClass} p-6 flex items-center justify-center">
          <span class="text-2xl font-medium">{sampleText}</span>
        </div>
        <div class="p-3 border-t border-border">
          <div class="font-medium">{combo.name}</div>
          <div class="text-sm text-muted">{combo.description}</div>
          <div class="text-xs mt-1 font-mono">{combo.textClass} + {combo.bgClass}</div>
        </div>
      </div>
    {/each}
  </div>
  
  <h2>UI Component Examples</h2>
  <p>
    The color system is applied consistently across all UI components. Here are some examples of how
    the colors are used in buttons:
  </p>
  <div class="flex flex-wrap gap-2 not-prose mb-8">
    {#each buttonExamples as button}
      <Button color={button.color}>{button.label}</Button>
    {/each}
  </div>
  <div class="flex flex-wrap gap-2 not-prose mb-8">
    {#each buttonExamples as button}
      <Button color={button.color} variant="outline">{button.label}</Button>
    {/each}
  </div>

  <Separator>Customization</Separator>

  <h2>CSS Variables</h2>
  <p>
    To customize the theme, override these CSS variables in your stylesheet:
  </p>

  <CodeBlock language="css">
{`:root {
  /* Base colors */
  --color-background: #ffffff;    /* White */
  --color-surface: #f8fafc;       /* Slate 50 */
  --color-border: #e2e8f0;        /* Slate 200 */
  --color-text: #1e293b;          /* Slate 800 */
  --color-muted: #64748b;         /* Slate 500 */

  /* Primary colors (Purple) */
  --color-primary-50: #f5f3ff;
  --color-primary-100: #ede9fe;
  --color-primary-200: #ddd6fe;
  --color-primary-300: #c4b5fd;
  --color-primary-400: #a78bfa;
  --color-primary-500: #8b5cf6;
  --color-primary-600: #7c3aed;
  --color-primary-700: #6d28d9;
  --color-primary-800: #5b21b6;
  --color-primary-900: #4c1d95;
  
  /* Secondary colors (Indigo) */
  --color-secondary-50: #eef2ff;
  --color-secondary-100: #e0e7ff;
  --color-secondary-200: #c7d2fe;
  --color-secondary-300: #a5b4fc;
  --color-secondary-400: #818cf8;
  --color-secondary-500: #6366f1;
  --color-secondary-600: #4f46e5;
  --color-secondary-700: #4338ca;
  --color-secondary-800: #3730a3;
  --color-secondary-900: #312e81;
  
  /* Success colors (Green) */
  --color-success-50: #f0fdf4;
  --color-success-100: #dcfce7;
  --color-success-200: #bbf7d0;
  --color-success-300: #86efac;
  --color-success-400: #4ade80;
  --color-success-500: #22c55e;
  --color-success-600: #16a34a;
  --color-success-700: #15803d;
  --color-success-800: #166534;
  --color-success-900: #14532d;
  
  /* Warning colors (Amber) */
  --color-warning-50: #fffbeb;
  --color-warning-100: #fef3c7;
  --color-warning-200: #fde68a;
  --color-warning-300: #fcd34d;
  --color-warning-400: #fbbf24;
  --color-warning-500: #f59e0b;
  --color-warning-600: #d97706;
  --color-warning-700: #b45309;
  --color-warning-800: #92400e;
  --color-warning-900: #78350f;
  
  /* Error colors (Red) */
  --color-error-50: #fef2f2;
  --color-error-100: #fee2e2;
  --color-error-200: #fecaca;
  --color-error-300: #fca5a5;
  --color-error-400: #f87171;
  --color-error-500: #ef4444;
  --color-error-600: #dc2626;
  --color-error-700: #b91c1c;
  --color-error-800: #991b1b;
  --color-error-900: #7f1d1d;
  
  /* Info colors (Blue) */
  --color-info-50: #eff6ff;
  --color-info-100: #dbeafe;
  --color-info-200: #bfdbfe;
  --color-info-300: #93c5fd;
  --color-info-400: #60a5fa;
  --color-info-500: #3b82f6;
  --color-info-600: #2563eb;
  --color-info-700: #1d4ed8;
  --color-info-800: #1e40af;
  --color-info-900: #1e3a8a;
}`}
  </CodeBlock>

  <h2>Dark Mode</h2>
  <p>
    Dark mode is supported through the <code>data-theme="dark"</code> attribute on
    the root element. Customize dark mode colors by overriding these variables:
  </p>

  <CodeBlock language="css">
{`:root.dark, :root[data-theme="dark"] {
  /* Base colors */
  --color-background: #0f172a;       /* Slate 900 */
  --color-surface: #1e293b;          /* Slate 800 */
  --color-border: #334155;           /* Slate 700 */
  --color-text: #f1f5f9;             /* Slate 100 */
  --color-muted: #94a3b8;            /* Slate 400 */
  
  /* Primary colors (Purple) - Dark Mode */
  --color-primary-50: #2d2b55;
  --color-primary-100: #393679;
  --color-primary-200: #44408c;
  --color-primary-300: #5b54bc;
  --color-primary-400: #6e66d9;
  --color-primary-500: #8b5cf6;
  --color-primary-600: #9f75ff;
  --color-primary-700: #b18aff;
  --color-primary-800: #c3a0ff;
  --color-primary-900: #d4b6ff;
  
  /* Secondary colors (Indigo) - Dark Mode */
  --color-secondary-50: #2a2954;
  --color-secondary-100: #343275;
  --color-secondary-200: #3e3b8f;
  --color-secondary-300: #5149b9;
  --color-secondary-400: #625ad7;
  --color-secondary-500: #6366f1;
  --color-secondary-600: #7f7cf4;
  --color-secondary-700: #9895f6;
  --color-secondary-800: #b2b0f8;
  --color-secondary-900: #cdccfa;
  
  /* And other color scales... */
}`}
  </CodeBlock>

  <h2>Tailwind Configuration</h2>
  <p>
    The theme is also available through Tailwind CSS utility classes. Here's how to
    configure your <code>tailwind.config.js</code>:
  </p>

  <CodeBlock language="javascript">
{`/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
          DEFAULT: 'var(--color-primary-500)'
        },
        secondary: {
          50: 'var(--color-secondary-50)',
          100: 'var(--color-secondary-100)',
          200: 'var(--color-secondary-200)',
          300: 'var(--color-secondary-300)',
          400: 'var(--color-secondary-400)',
          500: 'var(--color-secondary-500)',
          600: 'var(--color-secondary-600)',
          700: 'var(--color-secondary-700)',
          800: 'var(--color-secondary-800)',
          900: 'var(--color-secondary-900)',
          DEFAULT: 'var(--color-secondary-500)'
        },
        success: {
          50: 'var(--color-success-50)',
          100: 'var(--color-success-100)',
          200: 'var(--color-success-200)',
          300: 'var(--color-success-300)',
          400: 'var(--color-success-400)',
          500: 'var(--color-success-500)',
          600: 'var(--color-success-600)',
          700: 'var(--color-success-700)',
          800: 'var(--color-success-800)',
          900: 'var(--color-success-900)',
          DEFAULT: 'var(--color-success-500)'
        },
        // ... other color scales
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}`}
  </CodeBlock>
  
  <h2>Using Colors in Components</h2>
  <p>
    When building components, use the Tailwind classes to apply colors consistently. Here are some examples:
  </p>
  
  <CodeBlock language="svelte">
{`<script>
  // Component props
  const { color = "primary" } = $props();
</script>

<!-- Using color variants in a component -->
<button class="bg-{color}-500 hover:bg-{color}-600 text-white px-4 py-2 rounded-md">
  <slot />
</button>

<style>
  @reference "../../twintrinsic.css";
  
  /* You can also use CSS variables directly in your styles */
  button {
    transition: background-color 0.2s;
    box-shadow: 0 2px 4px var(--color-shadow);
  }
</style>`}
  </CodeBlock>
</Container>
