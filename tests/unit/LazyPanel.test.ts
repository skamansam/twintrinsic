import { render } from "@testing-library/svelte";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { tick } from "svelte";
import LazyPanelWithContent from "./helpers/LazyPanelWithContent.svelte";

/**
 * LazyPanel wraps a Panel and renders its children only after the
 * IntersectionObserver fires. The vitest setup stub is a no-op, so tests
 * capture the constructor to trigger the intersection manually — same
 * pattern as Lazy.test.ts.
 */

type FakeEntry = { isIntersecting: boolean };

let observerCallback: ((entries: FakeEntry[]) => void) | undefined;

beforeEach(() => {
	observerCallback = undefined;
	vi.stubGlobal(
		"IntersectionObserver",
		class {
			constructor(cb: (entries: FakeEntry[]) => void) {
				observerCallback = cb;
			}
			observe() {}
			unobserve() {}
			disconnect() {}
			takeRecords() {
				return [];
			}
		} as unknown as typeof IntersectionObserver,
	);
});

function intersect(intersecting = true) {
	expect(observerCallback, "observer callback was not registered").toBeDefined();
	observerCallback?.([{ isIntersecting: intersecting }]);
}

describe("LazyPanel", () => {
	it("renders only the loading placeholder before intersection", () => {
		const { container } = render(LazyPanelWithContent);

		expect(container.textContent).toContain("Loading...");
		expect(container.textContent).not.toContain("lazy panel body");
	});

	it("renders the panel content after the observer reports an intersection", async () => {
		const { container } = render(LazyPanelWithContent);

		expect(container.textContent).not.toContain("lazy panel body");

		intersect(true);
		await tick();

		expect(container.textContent).toContain("lazy panel body");
		expect(container.textContent).not.toContain("Loading...");
	});
});
