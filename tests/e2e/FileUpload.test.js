import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the FileUpload component.
 *
 * Targets `/docs/components/Form/FileUpload`. Each demo exposes a `data-testid`
 * wrapper (`fileupload-basic`, ...). The component renders a native
 * `<input type="file">` plus a browse button and dropzone.
 */
test.describe("FileUpload docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/FileUpload");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "FileUpload", level: 1 })).toBeVisible();
  });

  test("basic upload renders dropzone and browse button", async ({ page }) => {
    const demo = page.getByTestId("fileupload-basic");
    await expect(demo.getByText("Drop files here or click to browse")).toBeVisible();
    await expect(demo.getByRole("button", { name: "Select Files" })).toBeVisible();
    // The native file input is visually hidden by design (the dropzone/browse
    // button is the accessible control), so assert it exists rather than is
    // visible.
    await expect(demo.locator('input[type="file"]')).toHaveCount(1);
  });

  test("accept attribute filters file types", async ({ page }) => {
    const demo = page.getByTestId("fileupload-image");
    await expect(demo.locator('input[type="file"]')).toHaveAttribute("accept", "image/*");
  });

  test("single-file upload disables multiple", async ({ page }) => {
    const demo = page.getByTestId("fileupload-single");
    await expect(demo.locator('input[type="file"]')).not.toHaveAttribute("multiple");
  });

  test("disabled upload is not interactive", async ({ page }) => {
    const demo = page.getByTestId("fileupload-disabled");
    await expect(demo.getByRole("button", { name: "Cannot select files" })).toBeDisabled();
  });
});
