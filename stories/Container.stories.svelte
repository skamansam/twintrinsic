<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect } from "storybook/test"
import Container from "$lib/components/Container/Container.svelte"

const { Story } = defineMeta({
  title: "Basic/Container",
  component: Container,
  tags: ["autodocs"],
  argTypes: {
    fluid: { control: "boolean", description: "Makes the container full-width", defaultValue: false },
    as: { control: "select", options: ["div", "main", "section", "article"], description: "HTML element to render", defaultValue: "div" },
    class: { control: "text", description: "Additional CSS classes" },
    role: { control: "text", description: "ARIA role" },
    ariaLabel: { control: "text", description: "ARIA label" },
  },
})
</script>

<Story
  name="Default"
  args={{ fluid: false, class: "bg-surface p-4" }}
  play={async ({ canvas }) => {
    await expect(canvas.getByText("Welcome to Acme")).toBeInTheDocument();
  }}
>
  <div class="p-4 bg-primary-100 dark:bg-primary-800 rounded">
    <h2 class="text-lg font-semibold text-text dark:text-muted">Welcome to Acme</h2>
    <p class="mt-2 text-muted">The container keeps this content centered and readable at any screen size.</p>
  </div>
</Story>

<Story name="Fluid" args={{ fluid: true, class: "bg-surface p-4" }}>
  <div class="p-4 bg-primary-100 dark:bg-primary-800 rounded">
    <h2 class="text-lg font-semibold text-text dark:text-muted">Welcome to Acme</h2>
    <p class="mt-2 text-muted">A fluid container spans the full width of the viewport.</p>
  </div>
</Story>

<Story name="As Main" args={{ as: "main", role: "main", ariaLabel: "Main content", class: "bg-surface p-4" }}>
  <div class="p-4 bg-primary-100 dark:bg-primary-800 rounded">
    <h2 class="text-lg font-semibold text-text dark:text-muted">Welcome to Acme</h2>
    <p class="mt-2 text-muted">This container renders as a <code>main</code> element for document semantics.</p>
  </div>
</Story>
