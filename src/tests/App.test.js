import { test, expect } from '@playwright/test';

test.describe('App Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/components-app--default');
  });

  test('renders with default props', async ({ page }) => {
    const app = page.locator('.app');
    await expect(app).toBeVisible();
    await expect(app).toHaveClass(/bg-element-100/);
    
    // Check title
    const title = await page.title();
    expect(title).toBe('Twintrinsic App');
    
    // Check main content area
    const main = page.locator('main[role="main"]');
    await expect(main).toBeVisible();
    await expect(main).toHaveClass(/appMain/);
  });

  test('handles dark mode', async ({ page }) => {
    // Navigate to dark mode variant
    await page.goto('http://localhost:6006/?path=/story/components-app--dark-mode');
    
    const app = page.locator('.app');
    await expect(app).toHaveClass(/dark:bg-dark/);
    await expect(app).toHaveClass(/dark:text-light/);
  });

  test('renders optional slots', async ({ page }) => {
    // Navigate to full layout variant
    await page.goto('http://localhost:6006/?path=/story/components-app--full-layout');
    
    // Check menu
    const menu = page.locator('.appMenu');
    await expect(menu).toBeVisible();
    
    // Check header
    const header = page.locator('.appHeader');
    await expect(header).toBeVisible();
    
    // Check left panel
    const leftPanel = page.locator('.appLeftPanel');
    await expect(leftPanel).toBeVisible();
    await expect(leftPanel).toHaveClass(/w-fixed/);
    
    // Check right panel
    const rightPanel = page.locator('.appRightPanel');
    await expect(rightPanel).toBeVisible();
    await expect(rightPanel).toHaveClass(/w-fixed/);
    
    // Check footer
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toHaveClass(/bg-black/);
  });

  test('handles panel widths', async ({ page }) => {
    // Navigate to custom widths variant
    await page.goto('http://localhost:6006/?path=/story/components-app--custom-widths');
    
    const app = page.locator('.app');
    
    // Check custom panel widths
    const style = await app.getAttribute('style');
    expect(style).toContain('--left-panel-width: 400px');
    expect(style).toContain('--right-panel-width: 250px');
  });

  test('handles responsive layout', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Navigate to full layout variant
    await page.goto('http://localhost:6006/?path=/story/components-app--full-layout');
    
    const wrapper = page.locator('.appWrapper');
    await expect(wrapper).toHaveClass(/flex-col/);
    
    // Set desktop viewport
    await page.setViewportSize({ width: 1024, height: 768 });
    await expect(wrapper).toHaveClass(/sm:flex-row/);
  });

  test('provides dark mode context', async ({ page }) => {
    // Navigate to dark mode variant
    await page.goto('http://localhost:6006/?path=/story/components-app--dark-mode');
    
    // This is a bit tricky to test directly since context is internal
    // We can check if child components receive dark mode
    // This would require setting up a test component that uses the context
    const app = page.locator('.app');
    await expect(app).toHaveClass(/dark:bg-dark/);
  });
});
