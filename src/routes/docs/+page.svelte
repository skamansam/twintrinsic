<!--
@component
Documentation home page
-->
<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Separator from "$lib/components/Separator/Separator.svelte"
import { m } from "$lib/paraglide/messages.js"

let { children } = $props()
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  {@render children?.()}
  <h1>{m.docs_app_name()}</h1>
  
  <p>{m.docs_welcome()}</p>

  <Separator>
    {@render children?.(m.link_getting_started())}
  </Separator>

  <h2>{m.docs_installation()}</h2>
  <CodeBlock language="bash">{`npm install twintrinsic`}</CodeBlock>

  <h3>{m.docs_tailwind_setup()}</h3>
  <p>{m.docs_tailwind_setup_body()}</p>
  <CodeBlock language="bash">{`npm install -D tailwindcss @tailwindcss/vite @tailwindcss/forms @tailwindcss/typography`}</CodeBlock>

  <p>{m.docs_vite_plugin_body()}</p>
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

  <h2>{m.docs_usage()}</h2>
  <p>{m.docs_usage_body()}</p>
  <CodeBlock language="javascript">{`// In your app entry
import 'twintrinsic/twintrinsic.css';

// Root barrel - named imports
import { Container, AppHeader } from 'twintrinsic';

// Component subpaths - default imports
import Button from 'twintrinsic/components/Button';

// Helper subpaths - named imports (getItemLabel, getItemValue, ...)
import { getItemLabel } from 'twintrinsic/helpers/getItemLabel';`}</CodeBlock>

  <h2>{m.docs_features()}</h2>
  <ul>
    <li>{m.docs_feature_svelte()}</li>
    <li>{m.docs_feature_a11y()}</li>
    <li>{m.docs_feature_responsive()}</li>
    <li>{m.docs_feature_dark()}</li>
    <li>{m.docs_feature_theming()}</li>
    <li>{m.docs_feature_ts()}</li>
  </ul>

  <Separator>
    {@render children?.(m.link_components())}
  </Separator>

  <p>{m.docs_essential_components()}</p>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="border border-border rounded-lg p-4">
      <h3 class="m-0">{m.docs_layout_components()}</h3>
      <ul class="mt-2">
        <li>{m.docs_layout_container()}</li>
        <li>{m.docs_layout_appheader()}</li>
        <li>{m.docs_layout_sidebar()}</li>
        <li>{m.docs_layout_bottombar()}</li>
      </ul>
    </div>

    <div class="border border-border rounded-lg p-4">
      <h3 class="m-0">{m.docs_ui_components()}</h3>
      <ul class="mt-2">
        <li>{m.docs_ui_panel()}</li>
        <li>{m.docs_ui_dropdown()}</li>
        <li>{m.docs_ui_separator()}</li>
      </ul>
    </div>
  </div>

  <Separator>
    {@render children?.(m.link_theming())}
  </Separator>

  <p>{m.docs_theming_intro()}</p>

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

  <h2>{m.docs_dark_mode()}</h2>
  <p>{m.docs_dark_mode_body()}</p>

  <CodeBlock language="css">{`:root[data-theme="dark"] {
  --color-background: 17 24 39;       /* Gray 900 */
  --color-surface: 31 41 55;          /* Gray 800 */
  --color-border: 75 85 99;           /* Gray 600 */
  --color-text: 243 244 246;          /* Gray 100 */
  --color-muted: 156 163 175;         /* Gray 400 */
}`}</CodeBlock>

  <p>
    {m.docs_dark_mode_note_pre()}
    <a href="/docs/theming" class="text-primary-600 hover:underline">{m.link_theming()}</a>
    {m.docs_dark_mode_note_post()}
  </p>
</Container>
