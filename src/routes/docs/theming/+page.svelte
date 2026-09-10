<!--
@component
Theming documentation page
-->
<script lang="ts">
import Button from "$lib/components/Button/Button.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Panel from "$lib/components/Panel/Panel.svelte"
import Separator from "$lib/components/Separator/Separator.svelte"
import { m } from "$lib/paraglide/messages.js"
import ThemeCustomizer from "./ThemeCustomizer.svelte"

const colorScales = ["primary", "secondary", "success", "warning", "error", "info"]
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

// Helper function to determine if text should be light or dark based on background
function getTextColor(colorName: string, shade: number) {
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

// Static Tailwind class map (kept literal so the JIT can generate them)
const buttonColorClasses: Record<string, string> = {
  primary: "bg-primary-500 text-white hover:bg-primary-600",
  secondary: "bg-secondary-500 text-white hover:bg-secondary-600",
  success: "bg-success-500 text-white hover:bg-success-600",
  warning: "bg-warning-500 text-white hover:bg-warning-600",
  error: "bg-error-500 text-white hover:bg-error-600",
  info: "bg-info-500 text-white hover:bg-info-600",
}

const buttonOutlineClasses: Record<string, string> = {
  primary: "border-primary-500 text-primary-600 hover:bg-primary-50",
  secondary: "border-secondary-500 text-secondary-600 hover:bg-secondary-50",
  success: "border-success-500 text-success-600 hover:bg-success-50",
  warning: "border-warning-500 text-warning-600 hover:bg-warning-50",
  error: "border-error-500 text-error-600 hover:bg-error-50",
  info: "border-info-500 text-info-600 hover:bg-info-50",
}

// Translated labels for the color-scale panels, example buttons, and combos
const colorLabels: Record<string, () => string> = {
  primary: () => m.theming_color_primary(),
  secondary: () => m.theming_color_secondary(),
  success: () => m.theming_color_success(),
  warning: () => m.theming_color_warning(),
  error: () => m.theming_color_error(),
  info: () => m.theming_color_info(),
}

const comboNameLabels: Record<string, () => string> = {
  Default: () => m.theming_combo_default(),
  Primary: () => m.theming_color_primary(),
  "Primary Inverse": () => m.theming_combo_primary_inverse(),
  Secondary: () => m.theming_color_secondary(),
  "Secondary Inverse": () => m.theming_combo_secondary_inverse(),
  Success: () => m.theming_color_success(),
  Warning: () => m.theming_color_warning(),
  Error: () => m.theming_color_error(),
  Info: () => m.theming_color_info(),
  Muted: () => m.theming_base_muted(),
}

const comboDescLabels: Record<string, () => string> = {
  Default: () => m.theming_combo_desc_default(),
  Primary: () => m.theming_combo_desc_primary(),
  "Primary Inverse": () => m.theming_combo_desc_primary_inverse(),
  Secondary: () => m.theming_combo_desc_secondary(),
  "Secondary Inverse": () => m.theming_combo_desc_secondary_inverse(),
  Success: () => m.theming_combo_desc_success(),
  Warning: () => m.theming_combo_desc_warning(),
  Error: () => m.theming_combo_desc_error(),
  Info: () => m.theming_combo_desc_info(),
  Muted: () => m.theming_combo_desc_muted(),
}
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.link_theming()}</h1>

  <p>{m.theming_intro()}</p>

  <Separator>{m.theming_color_system()}</Separator>

  <h2>{m.theming_base_colors()}</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-8">
    <div class="space-y-2">
      <div class="flex items-center gap-2 p-4 rounded-md bg-background border border-border">
        <div class="w-6 h-6 rounded bg-background border border-border"></div>
        <div>
          <div class="font-medium">{m.theming_base_background()}</div>
          <div class="text-sm text-muted">--color-background</div>
        </div>
      </div>
      <div class="flex items-center gap-2 p-4 rounded-md bg-surface border border-border">
        <div class="w-6 h-6 rounded bg-surface border border-border"></div>
        <div>
          <div class="font-medium">{m.theming_base_surface()}</div>
          <div class="text-sm text-muted">--color-surface</div>
        </div>
      </div>
      <div class="flex items-center gap-2 p-4 rounded-md border border-border">
        <div class="w-6 h-6 rounded border-2 border-border"></div>
        <div>
          <div class="font-medium">{m.theming_base_border()}</div>
          <div class="text-sm text-muted">--color-border</div>
        </div>
      </div>
    </div>
    <div class="space-y-2">
      <div class="flex items-center gap-2 p-4 rounded-md border border-border">
        <div class="w-6 h-6 rounded bg-text"></div>
        <div>
          <div class="font-medium">{m.theming_base_text()}</div>
          <div class="text-sm text-muted">--color-text</div>
        </div>
      </div>
      <div class="flex items-center gap-2 p-4 rounded-md border border-border">
        <div class="w-6 h-6 rounded bg-muted"></div>
        <div>
          <div class="font-medium">{m.theming_base_muted()}</div>
          <div class="text-sm text-muted">--color-muted</div>
        </div>
      </div>
    </div>
  </div>

  <h2>{m.theming_color_scales()}</h2>
  <p>{m.theming_color_scales_body()}</p>
  <div class="space-y-6 not-prose">
    {#each colorScales as color}
      <Panel>
        {#snippet header()}
          {colorLabels[color]()}
        {/snippet}
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
  
  <h2 class="mt-8">{m.theming_combos()}</h2>
  <p>{m.theming_combos_body()}</p>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-8">
    {#each textBgCombinations as combo}
      <div class="border border-border rounded-md overflow-hidden">
        <div class="{combo.bgClass} {combo.textClass} p-6 flex items-center justify-center">
          <span class="text-2xl font-medium">{sampleText}</span>
        </div>
        <div class="p-3 border-t border-border">
          <div class="font-medium">{comboNameLabels[combo.name]()}</div>
          <div class="text-sm text-muted">{comboDescLabels[combo.name]()}</div>
          <div class="text-xs mt-1 font-mono">{combo.textClass} + {combo.bgClass}</div>
        </div>
      </div>
    {/each}
  </div>
  
  <h2>{m.theming_ui_examples()}</h2>
  <p>{m.theming_ui_examples_body()}</p>
  <div class="flex flex-wrap gap-2 not-prose mb-8">
    {#each buttonExamples as button}
      <Button class={buttonColorClasses[button.color]}>{colorLabels[button.color]()}</Button>
    {/each}
  </div>
  <div class="flex flex-wrap gap-2 not-prose mb-8">
    {#each buttonExamples as button}
      <Button class={buttonOutlineClasses[button.color]} variant="outline">{colorLabels[button.color]()}</Button>
    {/each}
  </div>

  <Separator>{m.theming_customization()}</Separator>

  <h2>{m.theming_css_variables()}</h2>
  <p>{m.theming_css_variables_body()}</p>

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

  <h2>{m.theming_live_customizer()}</h2>
  <p>{m.theming_live_customizer_body()}</p>
  <ThemeCustomizer />

  <h2>{m.docs_dark_mode()}</h2>
  <p>
    {m.theming_dark_mode_pre()}<code>data-theme="dark"</code>{m.theming_dark_mode_post()}
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

  <h2>{m.theming_additional()}</h2>
  <p>
    {m.theming_additional_body_1()}
    <strong>Storybook demo environment</strong>
    {m.theming_additional_body_2()}
    <strong>demo themes only</strong>
    {m.theming_additional_body_3()}
    <code>.storybook/themes.css</code>
    {m.theming_additional_body_4()}
    <a href="/docs/theming/preview">{m.theming_preview_link()}</a>
    {m.theming_additional_body_5()}
  </p>
  <p>
    {m.theming_additional2_1()}
    <code>data-theme</code>
    {m.theming_additional2_2()}
    <strong>dark variant</strong>
    {m.theming_additional2_3()}
    <code>-dark</code>
    {m.theming_additional2_4()}
    <code>data-theme="brand-dark"</code>
    {m.theming_additional2_5()}
    <code>dark:</code>
    {m.theming_additional2_6()}
    <code>data-theme</code>
    {m.theming_additional2_7()}
    <code>-dark</code>
    {m.theming_additional2_8()}
  </p>

  <ul>
    <li>
      <code>data-theme="brand"</code> / <code>data-theme="brand-dark"</code>
      {m.theming_brand_desc()}
      <code>--color-primary-*</code> / <code>--color-secondary-*</code>
      {m.theming_brand_end()}
    </li>
    <li>
      <code>data-theme="high-contrast"</code> / <code>data-theme="high-contrast-dark"</code>
      {m.theming_contrast_desc()}
    </li>
  </ul>

  <h3>{m.theming_cvd()}</h3>
  <p>
    {m.theming_cvd_body_1()}
    <code>data-theme="protanopia-dark"</code>
    {m.theming_cvd_body_2()}
  </p>

  <ul>
    <li>
      <code>data-theme="protanopia"</code> / <code>data-theme="protanopia-dark"</code>
      {m.theming_cvd_protanopia_desc()}
    </li>
    <li>
      <code>data-theme="deuteranopia"</code> / <code>data-theme="deuteranopia-dark"</code>
      {m.theming_cvd_deuteranopia_desc()}
    </li>
    <li>
      <code>data-theme="tritanopia"</code> / <code>data-theme="tritanopia-dark"</code>
      {m.theming_cvd_tritanopia_desc()}
    </li>
  </ul>

  <CodeBlock language="html">{`<!-- Apply on the root element -->
<html lang="en" data-theme="brand">
  <!-- or data-theme="brand-dark", data-theme="high-contrast",
       data-theme="high-contrast-dark", data-theme="protanopia-dark",
       data-theme="deuteranopia-dark", data-theme="tritanopia-dark",
       data-theme="dark" -->
</html>`}</CodeBlock>

  <p>
    {m.theming_switcher_1()}
    <strong>grouped light/dark picker</strong>
    {m.theming_switcher_2()}
    <em>{m.theming_switcher_mode()}</em>
    {m.theming_switcher_3()}
    <em>{m.theming_switcher_theme()}</em>
    {m.theming_switcher_4()}
    <code>data-theme="brand-dark"</code>
    {m.theming_switcher_5()}
    <code>globalTypes</code>
    {m.theming_switcher_6()}
    <code>[data-theme="..."]</code>
    {m.theming_switcher_7()}
    <code>src/lib/twintrinsic.css</code>
    {m.theming_switcher_8()}
    <code>themes</code>
    {m.theming_switcher_9()}
    <code>.storybook/preview.ts</code>
    {m.theming_switcher_10()}
  </p>

  <h2>{m.theming_flash()}</h2>
  <p>
    {m.theming_flash_body_1()}
    <code>ThemeToggle</code>
    {m.theming_flash_body_2()}
    <code>app.html</code> <strong>{m.theming_flash_before()}</strong> <code>%sveltekit.head%</code>:
  </p>

  <CodeBlock language="html">{`<!-- Add this inside the <head> of app.html, before %sveltekit.head% -->
<meta name="color-scheme" content="light dark" />
\u003Cscript>
  try {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored ? stored === 'dark' : prefersDark;

    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.classList.remove('dark');
    }
  } catch {
    /* ignore storage errors */
  }
\u003C/script>`}</CodeBlock>

  <h2>{m.theming_tailwind()}</h2>
  <p>
    {m.theming_tailwind_body_1()}
    <code>tailwind.config.js</code>:
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
  
  <h2>{m.theming_using_colors()}</h2>
  <p>{m.theming_using_colors_body()}</p>
  
  <CodeBlock language="svelte">
{`\u003Cscript>
  // Component props
  const { color = "primary" } = $props();
\u003C/script>

<!-- Using color variants in a component -->
<button class="bg-{color}-500 hover:bg-{color}-600 text-white px-4 py-2 rounded-md">
  {@render children?.()}
</button>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  /* You can also use CSS variables directly in your styles */
  button {
    transition: background-color 0.2s;
    box-shadow: 0 2px 4px var(--color-shadow);
  }
\u003C/style>`}
  </CodeBlock>
</Container>
