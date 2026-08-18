<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect } from "storybook/test"
import Chip from "$lib/components/Chip/Chip.svelte"
import ChipGroup from "$lib/components/Chip/ChipGroup.svelte"
import ChipSelectionDemo from "./ChipSelectionDemo.svelte"

const { Story } = defineMeta({
  title: "Data Display/Chip",
  component: Chip,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "primary", "secondary", "success", "warning", "error", "info"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    removable: { control: "boolean" },
    clickable: { control: "boolean" },
    disabled: { control: "boolean" },
    selected: { control: "boolean" },
    outline: { control: "boolean" },
    removeAriaLabel: { control: "text" },
  },
  args: {
    variant: "default",
    size: "md",
    removable: false,
    clickable: false,
    disabled: false,
    selected: false,
    outline: false,
    removeAriaLabel: "Remove",
  },
})

const checkIcon =
  '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'
const alertIcon =
  '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>'
const infoIcon =
  '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
</script>

<Story name="Basic">
  <div class="flex flex-wrap gap-2">
    <Chip>Basic</Chip>
    <Chip variant="primary">Primary</Chip>
    <Chip variant="secondary">Secondary</Chip>
    <Chip variant="success">Success</Chip>
    <Chip variant="warning">Warning</Chip>
    <Chip variant="error">Error</Chip>
    <Chip variant="info">Info</Chip>
  </div>
</Story>

<Story name="Sizes">
  <div class="flex flex-wrap items-center gap-2">
    <Chip size="sm">Small</Chip>
    <Chip size="md">Medium</Chip>
    <Chip size="lg">Large</Chip>
  </div>
</Story>

<Story name="Outline">
  <div class="flex flex-wrap gap-2">
    <Chip outline>Default</Chip>
    <Chip variant="primary" outline>Primary</Chip>
    <Chip variant="success" outline>Success</Chip>
    <Chip variant="error" outline>Error</Chip>
  </div>
</Story>

<Story name="With Icons">
  <div class="flex flex-wrap gap-2">
    <Chip variant="success" icon={checkIcon}>Completed</Chip>
    <Chip variant="warning" icon={alertIcon}>Warning</Chip>
    <Chip variant="info" icon={infoIcon}>Information</Chip>
  </div>
</Story>

<Story name="Removable">
  <div class="flex flex-wrap gap-2">
    <Chip removable>Removable</Chip>
    <Chip variant="primary" removable>Primary</Chip>
    <Chip variant="error" removable>Error</Chip>
  </div>
</Story>

<Story name="Clickable">
  <div class="flex flex-wrap gap-2">
    <Chip clickable>Clickable</Chip>
    <Chip variant="primary" clickable>Primary</Chip>
    <Chip variant="success" clickable selected>Selected</Chip>
  </div>
</Story>

<Story name="Disabled">
  <div class="flex flex-wrap gap-2">
    <Chip disabled>Disabled</Chip>
    <Chip variant="primary" disabled clickable>Disabled Clickable</Chip>
    <Chip variant="error" disabled removable>Disabled Removable</Chip>
  </div>
</Story>

<Story name="Chip Group">
  <div class="space-y-4">
    <ChipGroup ariaLabel="Languages">
      <Chip>JavaScript</Chip>
      <Chip>TypeScript</Chip>
      <Chip>Svelte</Chip>
      <Chip>React</Chip>
      <Chip>Vue</Chip>
    </ChipGroup>

    <ChipGroup variant="primary" ariaLabel="Project status">
      <Chip>Planning</Chip>
      <Chip>In progress</Chip>
      <Chip>Blocked</Chip>
    </ChipGroup>

    <ChipGroup variant="success" outline ariaLabel="Deployment">
      <Chip>Staging</Chip>
      <Chip>Production</Chip>
      <Chip>Rolling back</Chip>
    </ChipGroup>

    <ChipGroup variant="info" direction="vertical" ariaLabel="Priorities">
      <Chip variant="primary">High priority</Chip>
      <Chip variant="secondary">Medium priority</Chip>
      <Chip variant="success">Low priority</Chip>
    </ChipGroup>
  </div>
</Story>

<Story
  name="Fallback Chips"
  play={async ({ canvas }) => {
    // Exercises the DEFAULT fallback (items without itemTemplate):
    // getItemLabel renders each label and group props wire the Chip.
    // The group sets no clickable/selectable, so fallback chips render
    // as non-clickable divs — asserting the absence of role="button"
    // proves this is the fallback path, not the snippet path.
    // variant="secondary" propagation is exercised but not asserted
    // (class assertions would be brittle).
    for (const label of ["Frontend", "Backend", "DevOps"]) {
      const chip = canvas.getByText(label).closest(".chip");
      await expect(chip).not.toHaveAttribute("role", "button");
    }
  }}
>
  <ChipGroup items={["Frontend", "Backend", "DevOps"]} variant="secondary">
  </ChipGroup>
</Story>

<Story
  name="Snippet Selection Chips"
  play={async ({ canvas }) => {
    // The third `itemTemplate` arg reflects the group's selection state, so a
    // snippet chip can render `selected={selected}` without tracking it.
    // React and Vue are selected via the controlled `selected` prop; Svelte is not.
    // (The group is intentionally NOT selectable here: with a custom snippet
    // the consumer owns click handling, and adding role="listbox" on the
    // group while snippet chips use role="button" would violate ARIA.)
    for (const label of ["React", "Vue"]) {
      const chip = canvas.getByText(label).closest(".chip");
      await expect(chip).toHaveClass("chip-selected");
    }
    const svelte = canvas.getByText("Svelte").closest(".chip");
    await expect(svelte).not.toHaveClass("chip-selected");
  }}
>
  <ChipGroup items={["React", "Svelte", "Vue"]} selected={["React", "Vue"]}>
    {#snippet itemTemplate(item, index, selected)}
      <Chip clickable selected={selected}>{item}</Chip>
    {/snippet}
  </ChipGroup>
</Story>

<Story
  name="Selection Chips Update"
  play={async ({ canvas }) => {
    // Verifies the UPDATE path (prop change → $effect → third arg flips) in a
    // real browser. jsdom + @testing-library cannot re-trigger $effects via
    // rerender/$set, so this story drives the change through a wrapper that
    // holds `selected` in $state and re-renders ChipGroup with the new prop.
    const svelte = canvas.getByText("Svelte").closest(".chip");
    await expect(svelte).not.toHaveClass("chip-selected");

    await canvas.getByTestId("toggle-selection").click();

    // Svelte is now the only selected item; React and Vue were deselected.
    await expect(svelte).toHaveClass("chip-selected");
    const react = canvas.getByText("React").closest(".chip");
    await expect(react).not.toHaveClass("chip-selected");
  }}
>
  <ChipSelectionDemo />
</Story>

<Story
  name="Dynamic Chips"
  play={async ({ canvas }) => {
    // Exercises the Svelte 5 `itemTemplate` snippet API end-to-end. The
    // snippet renders `clickable` Chips; the default fallback (no snippet)
    // only renders clickable when the group sets `clickable` or `selectable`
    // (neither is set here), so asserting each `.chip` has role="button"
    // proves the snippet path actually rendered (not the fallback).
    for (const label of ["Design", "Engineering", "Product", "Marketing", "Support"]) {
      const chip = canvas.getByText(label).closest(".chip");
      await expect(chip).toHaveAttribute("role", "button");
      await expect(chip).toHaveClass("chip-clickable");
    }
    // Each removable snippet Chip renders one remove <button> named
    // "Remove" (the chips' own role="button" divs are excluded by name).
    await expect(canvas.getAllByRole("button", { name: "Remove" }).length).toBe(5);
  }}
>
  <ChipGroup
    items={["Design", "Engineering", "Product", "Marketing", "Support"]}
    variant="primary"
    removable
  >
    {#snippet itemTemplate(item)}
      <Chip clickable removable>{item}</Chip>
    {/snippet}
  </ChipGroup>
</Story>
