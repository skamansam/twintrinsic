import { test, expect } from '@playwright/test';

test.describe('TreeMenu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-treemenu--default');
  });

  test('should render menu items', async ({ page }) => {
    const homeItem = page.locator('text=Home');
    const aboutItem = page.locator('text=About');
    const settingsItem = page.locator('text=Settings');

    await expect(homeItem).toBeVisible();
    await expect(aboutItem).toBeVisible();
    await expect(settingsItem).toBeVisible();
  });

  test('should render links with correct href', async ({ page }) => {
    const homeLink = page.locator('a:has-text("Home")');
    const aboutLink = page.locator('a:has-text("About")');

    await expect(homeLink).toHaveAttribute('href', '/');
    await expect(aboutLink).toHaveAttribute('href', '/about');
  });

  test('should expand and collapse nested items', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-treemenu--with-nested-items');

    const projectsButton = page.locator('button:has-text("Projects")');
    
    // Initially, children should not be visible
    let activeProjects = page.locator('text=Active Projects');
    await expect(activeProjects).not.toBeVisible();

    // Click to expand
    await projectsButton.click();
    await expect(activeProjects).toBeVisible();

    // Click to collapse
    await projectsButton.click();
    await expect(activeProjects).not.toBeVisible();
  });

  test('should handle click actions', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-treemenu--with-actions');

    // Set up listener for alert
    page.on('dialog', dialog => {
      expect(dialog.message()).toContain('New file');
      dialog.accept();
    });

    const newButton = page.locator('button:has-text("New")');
    await newButton.click();
  });

  test('should render icons', async ({ page }) => {
    const homeItem = page.locator('text=Home').locator('..').locator('.sidebar-menu-icon');
    await expect(homeItem).toBeVisible();
  });

  test('should render separators', async ({ page }) => {
    const separators = page.locator('.sidebar-menu-separator');
    const count = await separators.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should apply custom CSS classes', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-treemenu--default');
    
    const menu = page.locator('.sidebar-menu');
    await expect(menu).toBeVisible();
  });

  test('should handle deeply nested items', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-treemenu--complex-hierarchy');

    const questlistsItem = page.locator('text=QuestLists').first();
    const newQuestItem = page.locator('text=New Quest');
    const aboutItem = page.locator('text=About QuestLists');

    await expect(questlistsItem).toBeVisible();
    await expect(newQuestItem).toBeVisible();
    await expect(aboutItem).toBeVisible();
  });

  test('should render text-only items', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-treemenu--text-only');

    const section1 = page.locator('text=Section 1');
    const item1 = page.locator('text=Item 1');
    const section2 = page.locator('text=Section 2');

    await expect(section1).toBeVisible();
    await expect(item1).toBeVisible();
    await expect(section2).toBeVisible();
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-treemenu--with-nested-items');

    const projectsButton = page.locator('button:has-text("Projects")');
    
    // Focus the button
    await projectsButton.focus();
    
    // Press Enter to expand
    await page.keyboard.press('Enter');
    
    const activeProjects = page.locator('text=Active Projects');
    await expect(activeProjects).toBeVisible();
  });

  test('should maintain expanded state across interactions', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-treemenu--with-nested-items');

    const projectsButton = page.locator('button:has-text("Projects")');
    const settingsButton = page.locator('button:has-text("Settings")');
    
    // Expand Projects
    await projectsButton.click();
    let activeProjects = page.locator('text=Active Projects');
    await expect(activeProjects).toBeVisible();

    // Expand Settings
    await settingsButton.click();
    let profile = page.locator('text=Profile');
    await expect(profile).toBeVisible();

    // Projects should still be expanded
    await expect(activeProjects).toBeVisible();
  });
});
