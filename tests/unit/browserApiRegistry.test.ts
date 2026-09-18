/**
 * Unit tests for the Browser-API badge registry (plan item 11.3).
 * Helper-level tests: the registry is pure data and the component is a
 * thin renderer over it — these pin the data contract the docs site and
 * the completion page both depend on.
 */
import { describe, expect, it } from "vitest";
import {
  browserApiRegistry,
  browserApisFor,
} from "../../src/lib/components/BrowserApiBadge/browserApiRegistry.js";

describe("browserApiRegistry", () => {
  it("maps CalendarView to Temporal + Popover + Drag and Drop", () => {
    const apis = browserApisFor("CalendarView");
    expect(apis?.map((a) => a.label)).toEqual(["Temporal", "Popover", "Drag and Drop"]);
    expect(apis?.[0].polyfill).toBe("@js-temporal/polyfill");
  });

  it("maps Tooltip to Popover + Anchor Positioning", () => {
    const apis = browserApisFor("Tooltip");
    expect(apis?.map((a) => a.label)).toEqual(["Popover", "Anchor Positioning"]);
    expect(apis?.[1].polyfill).toBe("@oddbird/css-anchor-positioning");
  });

  it("returns undefined for components without registered APIs", () => {
    expect(browserApisFor("NoSuchComponent")).toBeUndefined();
  });

  it("carries no third-party library entries (native APIs only)", () => {
    expect(browserApisFor("Map")).toBeUndefined();
  });

  it("every entry has a label and an https spec URL", () => {
    for (const [component, apis] of Object.entries(browserApiRegistry)) {
      expect(apis.length, component).toBeGreaterThan(0);
      for (const api of apis) {
        expect(api.label.length, `${component}:${api.label}`).toBeGreaterThan(0);
        expect(api.mdnUrl.startsWith("https://"), `${component}:${api.mdnUrl}`).toBe(true);
      }
    }
  });

  it("polyfill and noPolyfill are mutually exclusive", () => {
    for (const [component, apis] of Object.entries(browserApiRegistry)) {
      for (const api of apis) {
        expect(api.polyfill && api.noPolyfill, `${component}:${api.label}`).toBeFalsy();
      }
    }
  });
});
