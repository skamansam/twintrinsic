import { render } from "@testing-library/svelte";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { tick } from "svelte";
import LazyWithContent from "./helpers/LazyWithContent.svelte";

/**
 * Lazy renders nothing until IntersectionObserver reports visibility.
 * The vitest setup stubs IntersectionObserver as a no-op (never fires),
 * which is the real production hazard: without a firing observer the
 * content must NOT render. Tests capture the constructor to grab the
 * registered callback, then invoke it with a fake intersecting entry.
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

describe("Lazy", () => {
	it("renders nothing before the IntersectionObserver fires", () => {
		const { container } = render(LazyWithContent);

		expect(container.querySelector(".lazy-container")).toBeTruthy();
		expect(container.querySelector(".lazy-content")).toBeNull();
	});

	it("renders content once the observer reports an intersection", async () => {
		const { container } = render(LazyWithContent);

		expect(container.querySelector(".lazy-content")).toBeNull();

		intersect(true);
		await tick();

		expect(container.querySelector(".lazy-content")).toBeTruthy();
	});

	it("ignores non-intersecting entries", () => {
		const { container } = render(LazyWithContent);

		intersect(false);

		expect(container.querySelector(".lazy-content")).toBeNull();
	});
});
