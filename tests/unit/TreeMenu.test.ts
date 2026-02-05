import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { MenuItem } from "$lib/components/TreeMenu/TreeMenu.svelte";
import TreeMenu from "$lib/components/TreeMenu/TreeMenu.svelte";

describe("TreeMenu", () => {
  it("should render with default props", () => {
    const { container } = render(TreeMenu, {
      props: {
        items: [],
      },
    });
    expect(container.querySelector(".sidebar-menu")).toBeTruthy();
  });

  it("should render menu items", () => {
    const items: MenuItem[] = [
      { title: "Home", link: "/" },
      { title: "About", link: "/about" },
    ];

    render(TreeMenu, { props: { items } });

    expect(screen.getByText("Home")).toBeTruthy();
    expect(screen.getByText("About")).toBeTruthy();
  });

  it("should render items with icons", () => {
    const items: MenuItem[] = [
      { title: "Home", icon: "home", link: "/" },
      { title: "Settings", icon: "settings", link: "/settings" },
    ];

    render(TreeMenu, { props: { items } });

    expect(screen.getByText("Home")).toBeTruthy();
    expect(screen.getByText("Settings")).toBeTruthy();
  });

  it("should render separators", () => {
    const items: MenuItem[] = [
      { title: "Home", link: "/" },
      { title: "Section", separator: true },
      { title: "About", link: "/about" },
    ];

    const { container } = render(TreeMenu, { props: { items } });

    const separators = container.querySelectorAll(".sidebar-menu-separator");
    expect(separators.length).toBeGreaterThan(0);
  });

  it("should render text-only items", () => {
    const items: MenuItem[] = [{ title: "Section Header" }, { title: "Item 1", link: "/item1" }];

    render(TreeMenu, { props: { items } });

    expect(screen.getByText("Section Header")).toBeTruthy();
  });

  it("should render nested items", () => {
    const items: MenuItem[] = [
      {
        title: "Parent",
        children: [
          { label: "Child 1", link: "/child1" },
          { label: "Child 2", link: "/child2" },
        ],
      },
    ];

    render(TreeMenu, { props: { items } });

    expect(screen.getByText("Parent")).toBeTruthy();
  });

  it("should toggle nested items on click", async () => {
    const user = userEvent.setup();
    const items: MenuItem[] = [
      {
        title: "Parent",
        children: [
          { title: "Child 1", link: "/child1" },
        ],
      },
    ];

    const { container } = render(TreeMenu, { props: { items } });

    const parentButton = screen.getByText("Parent").closest("button");
    expect(parentButton).toBeTruthy();

    // Verify button has chevron indicating it has children
    const chevron = parentButton?.querySelector(".sidebar-menu-chevron");
    expect(chevron).toBeTruthy();
    expect(chevron?.textContent).toBe("▶");

    // Click to expand
    await user.click(parentButton!);

    // After click, chevron should point down
    expect(chevron?.textContent).toBe("▼");
  });

  it("should handle onClick callbacks", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const items: MenuItem[] = [{ title: "Click Me", onClick }];

    render(TreeMenu, { props: { items } });

    const button = screen.getByText("Click Me").closest("button");
    await user.click(button!);

    expect(onClick).toHaveBeenCalled();
  });

  it("should handle action callbacks", async () => {
    const user = userEvent.setup();
    const action = vi.fn();
    const items: MenuItem[] = [{ title: "Action Item", action }];

    render(TreeMenu, { props: { items } });

    const button = screen.getByText("Action Item").closest("button");
    await user.click(button!);

    expect(action).toHaveBeenCalled();
  });

  it("should render links with href", () => {
    const items: MenuItem[] = [
      { title: "Home", link: "/" },
      { title: "About", link: "/about" },
    ];

    render(TreeMenu, { props: { items } });

    const homeLink = screen.getByText("Home").closest("a") as HTMLAnchorElement;
    const aboutLink = screen.getByText("About").closest("a") as HTMLAnchorElement;

    expect(homeLink?.getAttribute("href")).toBe("/");
    expect(aboutLink?.getAttribute("href")).toBe("/about");
  });

  it("should apply custom CSS classes", () => {
    const items: MenuItem[] = [{ title: "Home", link: "/" }];

    const { container } = render(TreeMenu, {
      props: {
        items,
        class: "custom-class",
      },
    });

    const menu = container.querySelector(".sidebar-menu");
    expect(menu?.classList.contains("custom-class")).toBe(true);
  });

  it("should render deeply nested items", () => {
    const items: MenuItem[] = [
      {
        title: "Level 1",
        children: [
          {
            label: "Level 2",
            children: [{ label: "Level 3", link: "/level3" }],
          },
        ],
      },
    ];

    render(TreeMenu, { props: { items } });

    expect(screen.getByText("Level 1")).toBeTruthy();
  });

  it("should handle mixed item types", () => {
    const items: MenuItem[] = [
      { title: "Link Item", link: "/link" },
      { title: "Button Item", onClick: vi.fn() },
      { title: "Text Item" },
      { title: "Section", separator: true },
    ];

    render(TreeMenu, { props: { items } });

    expect(screen.getByText("Link Item")).toBeTruthy();
    expect(screen.getByText("Button Item")).toBeTruthy();
    expect(screen.getByText("Text Item")).toBeTruthy();
  });
});
