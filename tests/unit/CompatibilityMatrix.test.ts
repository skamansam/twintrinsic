import { render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CompatibilityMatrix from "$lib/components/CompatibilityMatrix/CompatibilityMatrix.svelte";

/**
 * CompatibilityMatrix fetches its data at runtime (`fetch(src)` inside a
 * `$effect`), so every render is asynchronous. These tests mock `fetch`
 * and drive the loading → data / error / empty transitions through
 * `findBy*` queries — the pattern that was missing entirely (the
 * component previously had zero unit coverage).
 */

const compatPayload = {
  generatedAt: "2026-09-13T00:00:00Z",
  browsers: ["chromium", "firefox", "webkit"],
  features: {
    "Popover API": { chromium: true, firefox: true, webkit: true },
    "CSS Anchor Positioning": { chromium: true, firefox: false, webkit: false },
    "View Transitions API": { chromium: true, firefox: false, webkit: true },
  },
};

function stubFetchWith(payload: unknown, ok = true) {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok,
      status: ok ? 200 : 404,
      statusText: ok ? "OK" : "Not Found",
      json: () => Promise.resolve(payload),
    }),
  );
}

beforeEach(() => {
  stubFetchWith(compatPayload);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("CompatibilityMatrix", () => {
  it("renders a table of every tracked feature once the fetch resolves", async () => {
    render(CompatibilityMatrix);

    // Loading state first, then the async-rendered table
    expect(screen.getByRole("status")).toHaveTextContent(/Loading/);
    const table = await screen.findByRole("table");
    expect(table).toBeInTheDocument();

    // Browser labels translate chromium/firefox/webkit
    expect(screen.getByRole("columnheader", { name: "Chrome" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Safari" })).toBeInTheDocument();

    // One row per feature in the payload
    const rows = screen.getAllByRole("row");
    // header row + 3 feature rows
    expect(rows).toHaveLength(4);
  });

  it("filters rows to the requested features", async () => {
    render(CompatibilityMatrix, {
      props: { features: ["CSS Anchor Positioning"] },
    });

    const table = await screen.findByRole("table");
    const row = within(table).getByRole("row", { name: /CSS Anchor Positioning/ });
    // firefox + webkit are false in the fixture, chromium is true
    expect(within(row).getAllByRole("img", { name: "Not supported" })).toHaveLength(2);
    expect(within(row).getAllByRole("img", { name: "Supported" })).toHaveLength(1);
    // The unrequested features are not rendered
    expect(within(table).queryByRole("row", { name: /Popover API/ })).not.toBeInTheDocument();
  });

  it("marks unsupported browsers with a negative aria-label", async () => {
    render(CompatibilityMatrix, {
      props: { features: ["CSS Anchor Positioning"] },
    });

    await screen.findByRole("table");
    const row = screen.getByRole("row", { name: /CSS Anchor Positioning/ });
    const icons = within(row).getAllByRole("img");
    // chromium supported + firefox/webkit unsupported
    expect(icons).toHaveLength(3);
    expect(icons[0]).toHaveAttribute("aria-label", "Supported");
    expect(icons[1]).toHaveAttribute("aria-label", "Not supported");
    expect(icons[2]).toHaveAttribute("aria-label", "Not supported");
  });

  it("shows an error status when the fetch fails", async () => {
    stubFetchWith({}, false);
    render(CompatibilityMatrix);

    // findByRole("status") resolves on the loading <p> before the error
    // replaces it — wait for the error text itself instead.
    const status = await screen.findByText(/Couldn't load browser compatibility data/);
    expect(status).toHaveAttribute("role", "status");
    expect(status).toHaveTextContent("404 Not Found");
  });

  it("shows the empty state when no requested feature matches the data", async () => {
    render(CompatibilityMatrix, {
      props: { features: ["Not A Real Feature"] },
    });

    const status = await screen.findByText(/No matching compatibility data/);
    expect(status).toHaveAttribute("role", "status");
  });

  it("fetches from the provided src instead of the default", async () => {
    stubFetchWith(compatPayload);
    render(CompatibilityMatrix, {
      props: { src: "/custom-compat.json" },
    });

    await screen.findByRole("table");
    expect(fetch).toHaveBeenCalledWith("/custom-compat.json");
  });
});
