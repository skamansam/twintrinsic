<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, userEvent } from "storybook/test"
import BottomBar from "$lib/components/BottomBar/BottomBar.svelte"
import BottomBarDemo from "./BottomBarDemo.svelte"

const { Story } = defineMeta({
  title: "App/BottomBar",
  component: BottomBar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
})
</script>

<Story
  name="Default"
  asChild
  play={async ({ canvas }) => {
    // Static music-player bar: header + content render, transport buttons
    // are reachable, and (non-collapsible) clicking the header does NOT
    // hide the bar.
    await expect(canvas.getByText("Midnight Drive")).toBeInTheDocument();
    await expect(canvas.getByText("Lena Fischer")).toBeInTheDocument();
    const playButtons = canvas.getAllByRole("button", { name: /play/i });
    expect(playButtons.length).toBeGreaterThanOrEqual(1);
    const bar = document.querySelector(".bottombar");
    await expect(bar.className).toMatch(/bottombar-expanded/);
  }}
>
  <BottomBarDemo variant="music" />
</Story>

<Story name="Console" asChild>
  <BottomBarDemo variant="console" />
</Story>

<Story
  name="Collapsible"
  asChild
  play={async ({ canvas }) => {
    const bar = document.querySelector(".bottombar");
    await expect(bar).toBeTruthy();
    await expect(bar.className).toMatch(/bottombar-expanded/);
    await expect(canvas.getByText("Project Information")).toBeVisible();

    // Clicking the header slides the bar down to a small handle. Wait out
    // the slide transition (200ms) so the content is fully gone.
    await userEvent.click(canvas.getByRole("button", { name: "Details" }));
    await new Promise((resolve) => setTimeout(resolve, 300));
    await expect(bar.className).toMatch(/bottombar-collapsed/);
    await expect(canvas.queryByText("Project Information")).not.toBeInTheDocument();

    // The handle stays docked so the bar can always be reopened.
    const handle = canvas.getByRole("button", { name: "Expand bottom bar" });
    await expect(handle).toBeVisible();
    await userEvent.click(handle);
    await new Promise((resolve) => setTimeout(resolve, 300));
    await expect(bar.className).toMatch(/bottombar-expanded/);
    await expect(canvas.getByText("Project Information")).toBeVisible();
  }}
>
  <BottomBarDemo variant="collapsible" />
</Story>

<Story
  name="Collapsed To Handle"
  asChild
  play={async ({ canvas }) => {
    // Collapsed collapsible bars show only the expand handle.
    const handle = canvas.getByRole("button", { name: "Expand bottom bar" });
    await expect(handle).toBeVisible();
    await userEvent.click(handle);
    // Wait out the slide-in transition before asserting visibility.
    await new Promise((resolve) => setTimeout(resolve, 300));
    await expect(canvas.getByText("Project Information")).toBeVisible();
  }}
>
  <BottomBarDemo variant="collapsed" />
</Story>

<Story name="Custom Height" asChild>
  <BottomBarDemo variant="height" />
</Story>

<Story name="Docked" asChild>
  <BottomBarDemo variant="docked" />
</Story>