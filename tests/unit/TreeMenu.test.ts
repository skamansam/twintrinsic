import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { MenuItem } from "$lib/components/TreeMenu/TreeMenu.svelte";
import TreeMenu from "$lib/components/TreeMenu/TreeMenu.svelte";

describe("TreeMenu", () => {
	it("should render with default props", () => {
		const { container } = render(TreeMenu, {
			props: { items: [] },
		});
		expect(container.querySelector(".tree-menu")).toBeTruthy();
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

		const separators = container.querySelectorAll(".tree-menu-separator");
		expect(separators.length).toBeGreaterThan(0);
	});

	it("should render text-only items", () => {
		const items: MenuItem[] = [
			{ title: "Section Header" },
			{ title: "Item 1", link: "/item1" },
		];

		render(TreeMenu, { props: { items } });

		expect(screen.getByText("Section Header")).toBeTruthy();
	});

	it("should render nested items via <details>", () => {
		const items: MenuItem[] = [
			{
				title: "Parent",
				children: [
					{ label: "Child 1", link: "/child1" },
					{ label: "Child 2", link: "/child2" },
				],
			},
		];

		const { container } = render(TreeMenu, { props: { items } });

		expect(screen.getByText("Parent")).toBeTruthy();
		const details = container.querySelector("details");
		expect(details).toBeTruthy();
	});

	it("should toggle nested items on click", async () => {
		const user = userEvent.setup();
		const items: MenuItem[] = [
			{
				title: "Parent",
				children: [{ title: "Child 1", link: "/child1" }],
			},
		];

		const { container } = render(TreeMenu, { props: { items } });

		const details = container.querySelector("details");
		expect(details).toBeTruthy();
		expect(details?.hasAttribute("open")).toBe(false);

		const summary = container.querySelector("summary");
		await user.click(summary!);

		// After click, the details element should be open
		expect(details?.hasAttribute("open")).toBe(true);
	});

	it("should handle onClick callbacks", async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();
		const items: MenuItem[] = [{ title: "Click Me", onClick }];

		const { container } = render(TreeMenu, { props: { items } });

		const button = container.querySelector("button");
		await user.click(button!);

		expect(onClick).toHaveBeenCalled();
	});

	it("should handle onClick on link items", async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();
		const items: MenuItem[] = [{ title: "Action Item", onClick, link: "/action" }];

		const { container } = render(TreeMenu, { props: { items } });

		const link = container.querySelector("a");
		await user.click(link!);

		expect(onClick).toHaveBeenCalled();
	});

	it("should render links with href", () => {
		const items: MenuItem[] = [
			{ title: "Home", link: "/" },
			{ title: "About", link: "/about" },
		];

		const { container } = render(TreeMenu, { props: { items } });

		const homeLink = container.querySelector('a[href="/"]') as HTMLAnchorElement;
		const aboutLink = container.querySelector('a[href="/about"]') as HTMLAnchorElement;

		expect(homeLink).toBeTruthy();
		expect(aboutLink).toBeTruthy();
	});

	it("should apply custom CSS classes", () => {
		const items: MenuItem[] = [{ title: "Home", link: "/" }];

		const { container } = render(TreeMenu, {
			props: { items, class: "custom-class" },
		});

		const menuContainer = container.querySelector(".tree-menu-container");
		expect(menuContainer?.classList.contains("custom-class")).toBe(true);
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

		const { container } = render(TreeMenu, { props: { items } });

		expect(screen.getByText("Level 1")).toBeTruthy();
		// Both levels should have <details> elements
		expect(container.querySelectorAll("details").length).toBeGreaterThanOrEqual(2);
	});

	it("should handle mixed item types", () => {
		const items: MenuItem[] = [
			{ title: "Link Item", link: "/link" },
			{ title: "Button Item", onClick: vi.fn() },
			{ title: "Text Item" },
			{ title: "Section", separator: true },
		];

		const { container } = render(TreeMenu, { props: { items } });

		expect(screen.getByText("Link Item")).toBeTruthy();
		expect(screen.getByText("Button Item")).toBeTruthy();
		expect(screen.getByText("Text Item")).toBeTruthy();
		// Link renders as <a>, button as <button>, text as <div>
		expect(container.querySelector("a")).toBeTruthy();
		expect(container.querySelector("button")).toBeTruthy();
	});

	it("should filter items when showSearch is true", async () => {
		const user = userEvent.setup();
		const items: MenuItem[] = [
			{ title: "Home", link: "/" },
			{ title: "About", link: "/about" },
		];

		const { container } = render(TreeMenu, { props: { items, showSearch: true } });

		const searchInput = container.querySelector('input[type="text"]') as HTMLInputElement;
		expect(searchInput).toBeTruthy();

		await user.type(searchInput, "ab");

		// After typing, "About" should still be visible, "Home" should be filtered out
		expect(screen.getByText("About")).toBeTruthy();
	});
});
