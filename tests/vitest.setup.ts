/**
 * Vitest setup: jsdom doesn't provide every modern browser API our
 * components touch at mount (ResizeObserver for carousels,
 * IntersectionObserver for lazy panels, matchMedia for theme toggles).
 * Stub them globally so unit tests don't crash on reference errors.
 */
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

if (typeof globalThis.ResizeObserver === "undefined") {
  // Minimal no-op ResizeObserver — components only call .observe() and
  // .disconnect(), and read layout from the DOM directly.
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
}

if (typeof globalThis.IntersectionObserver === "undefined") {
  globalThis.IntersectionObserver = class IntersectionObserver {
    readonly root: Element | null = null;
    readonly rootMargin = "0px";
    readonly thresholds: ReadonlyArray<number> = [];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  } as unknown as typeof IntersectionObserver;
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
  });
}

if (typeof window !== "undefined" && !("popover" in window.HTMLElement.prototype)) {
  // jsdom predates the Popover API: no `popover` attribute handling, no
  // showPopover()/hidePopover(), no ToggleEvent — and its CSS engine still
  // applies the UA `[popover] { display: none }` rule. Components that use
  // the API for menus/popovers (Menu, Tooltip, LanguagePicker) would then
  // be invisible to testing-library even when "open". Stub the minimal
  // surface: show/hide toggle open state, restore visibility with an
  // inline style (inline beats the UA rule, like a real browser), and
  // dispatch a proper toggle event with newState/oldState so components
  // syncing aria-expanded from `ontoggle` behave as they do natively.
  const openPopovers = new WeakSet<HTMLElement>();

  Object.defineProperty(window.HTMLElement.prototype, "popover", {
    configurable: true,
    get(this: HTMLElement) {
      const value = this.getAttribute("popover");
      return value === "" ? "auto" : (value ?? null);
    },
    set(this: HTMLElement, value: string | null) {
      if (value === null) this.removeAttribute("popover");
      else this.setAttribute("popover", value);
    },
  });

  function makeToggleEvent(newState: string, oldState: string) {
    const event = new window.Event("toggle");
    Object.defineProperty(event, "newState", { value: newState });
    Object.defineProperty(event, "oldState", { value: oldState });
    return event;
  }

  window.HTMLElement.prototype.showPopover = function (this: HTMLElement) {
    if (openPopovers.has(this)) throw new DOMException("Already open", "InvalidStateError");
    openPopovers.add(this);
    if (getComputedStyle(this).display === "none") {
      this.style.setProperty("display", "block");
    }
    this.dispatchEvent(makeToggleEvent("open", "closed"));
  };
  window.HTMLElement.prototype.hidePopover = function (this: HTMLElement) {
    if (!openPopovers.has(this)) throw new DOMException("Already closed", "InvalidStateError");
    openPopovers.delete(this);
    this.style.removeProperty("display");
    this.dispatchEvent(makeToggleEvent("closed", "open"));
  };
  window.HTMLElement.prototype.togglePopover = function (this: HTMLElement) {
    if (openPopovers.has(this)) this.hidePopover();
    else this.showPopover();
  };
}
