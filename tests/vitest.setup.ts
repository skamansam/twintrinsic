/**
 * Vitest setup: jsdom doesn't provide every modern browser API our
 * components touch at mount (ResizeObserver for carousels,
 * IntersectionObserver for lazy panels, matchMedia for theme toggles).
 * Stub them globally so unit tests don't crash on reference errors.
 */
import "@testing-library/jest-dom/vitest"
import { vi } from "vitest"

if (typeof globalThis.ResizeObserver === "undefined") {
	// Minimal no-op ResizeObserver — components only call .observe() and
	// .disconnect(), and read layout from the DOM directly.
	globalThis.ResizeObserver = class ResizeObserver {
		observe() {}
		unobserve() {}
		disconnect() {}
	} as unknown as typeof ResizeObserver
}

if (typeof globalThis.IntersectionObserver === "undefined") {
	globalThis.IntersectionObserver = class IntersectionObserver {
		readonly root: Element | null = null
		readonly rootMargin = "0px"
		readonly thresholds: ReadonlyArray<number> = []
		observe() {}
		unobserve() {}
		disconnect() {}
		takeRecords(): IntersectionObserverEntry[] {
			return []
		}
	} as unknown as typeof IntersectionObserver
}

if (typeof window !== "undefined" && typeof window.matchMedia === "undefined") {
	Object.defineProperty(window, "matchMedia", {
		writable: true,
		value: vi.fn().mockImplementation((query: string) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		})),
	})
}
