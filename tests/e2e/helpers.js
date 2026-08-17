import { expect } from "@playwright/test";

/**
 * Wait for the SvelteKit app to finish client-side hydration.
 *
 * The root layout sets `data-sveltekit-hydrated` on `<html>` from a
 * `$effect` that only runs after the full component tree has mounted in
 * the browser. Without this, the first interaction in a test can fire
 * before event handlers are attached (especially under parallel CPU
 * load), and the event is silently lost.
 *
 * @param {import("@playwright/test").Page} page
 */
export async function waitForHydration(page) {
  await expect(page.locator("html")).toHaveAttribute("data-sveltekit-hydrated", "true", {
    timeout: 10000,
  });
}
