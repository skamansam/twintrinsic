/**
 * Unit tests for the 11.2 docs iconography (plan item 11.2): every mapped
 * Tabler icon name must exist in the **bundled** `@iconify-json/tabler`
 * data — a stale name fails CI instead of silently rendering an empty
 * glyph — and the loader registers the collection exactly once.
 */
import { iconLoaded } from "@iconify/svelte";
import { describe, expect, it, vi } from "vitest";
import tablerIcons from "@iconify-json/tabler/icons.json";
import {
  componentIcons,
  docsIcon,
  docsIconFor,
  loadDocsIconCollection,
} from "../../src/routes/docs/componentIcons";

/** All icon names resolvable in the bundled collection (icons + aliases). */
const bundled = new Set<string>([
  ...Object.keys(tablerIcons.icons),
  ...Object.keys(tablerIcons.aliases ?? {}),
]);

describe("componentIcons (11.2 docs iconography)", () => {
  it("maps a non-empty set of components", () => {
    expect(Object.keys(componentIcons).length).toBeGreaterThan(50);
  });

  it("every mapped icon exists in the bundled @iconify-json/tabler data", () => {
    const missing = Object.entries(componentIcons)
      .filter(([, icon]) => !bundled.has(icon))
      .map(([component, icon]) => `${component} → ${icon}`);
    expect(missing).toEqual([]);
  });

  it("icon names carry no iconset prefix (Icon resolves via the configured iconset)", () => {
    const prefixed = Object.entries(componentIcons).filter(([, icon]) => icon.includes(":"));
    expect(prefixed).toEqual([]);
  });

  it("docsIconFor returns the mapped icon, then undefined for unknown names", () => {
    expect(docsIconFor("CalendarView")).toBe("calendar-month");
    expect(docsIconFor("NotAComponent")).toBeUndefined();
  });

  it("docsIcon throws for unmapped components (docs h1 rows require an icon)", () => {
    expect(docsIcon("CalendarView")).toBe("calendar-month");
    expect(() => docsIcon("NotAComponent")).toThrow(/componentIcons/);
  });

  it("loadDocsIconCollection registers the Tabler collection (idempotent)", () => {
    loadDocsIconCollection();
    loadDocsIconCollection(); // second call: no-op
    // Registered data is queryable through @iconify/svelte's public API.
    expect(iconLoaded("tabler:calendar-month")).toBe(true);
    expect(iconLoaded("tabler:apps")).toBe(true);
  });
});
