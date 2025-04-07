import { test, expect } from '@playwright/test';

test.describe('Card Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/components-panel-card--default');
  });

  test('renders basic card with header and content', async ({ page }) => {
    const card = page.locator('.card');
    await expect(card).toBeVisible();
    await expect(card).toHaveClass(/bg-surface/);
    
    const header = card.locator('text=Card Title');
    await expect(header).toBeVisible();
    
    const content = card.locator('text=This is a basic card');
    await expect(content).toBeVisible();
  });

  test('renders card with media', async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/components-panel-card--with-media');
    
    const card = page.locator('.card');
    const media = card.locator('.card-media img');
    
    await expect(media).toBeVisible();
    await expect(media).toHaveAttribute('alt', 'Sample image');
    await expect(card).toHaveClass(/hover:shadow-lg/);
  });

  test('renders card with footer', async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/components-panel-card--with-footer');
    
    const card = page.locator('.card');
    const footer = card.locator('.card-footer');
    const button = footer.locator('button');
    
    await expect(footer).toBeVisible();
    await expect(button).toBeVisible();
    await expect(button).toHaveText('Action');
  });

  test('handles clickable card interactions', async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/components-panel-card--clickable');
    
    const card = page.locator('.card');
    await expect(card).toHaveAttribute('role', 'button');
    await expect(card).toHaveClass(/cursor-pointer/);
    
    // Test keyboard interaction
    await card.focus();
    await page.keyboard.press('Enter');
    // Click event would be tested here in a real app
    
    await page.keyboard.press('Space');
    // Click event would be tested here in a real app
    
    // Test mouse interaction
    await card.click();
    // Click event would be tested here in a real app
  });
});
