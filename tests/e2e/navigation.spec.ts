import { test, expect } from '@playwright/test';
import { AppRoutes } from '../../src/lib/common/AppRoutes';

test.use({ viewport: { width: 412, height: 915 } }); // Samsung Galaxy S20 Ultra

test('responsive navigation bar', async ({ page }) => {
  await page.goto('/');
  // Open burger menu
  await page.locator('button.burger--menu').click();
  // Click on Mission
  await page.getByRole('link', { name: new RegExp(AppRoutes.ORIENTATION.id, 'i') }).click();
  // Click on Mission Statement
  await page.getByRole('link', { name: new RegExp(AppRoutes.VISION.id, 'i') }).click();
  // Verify URL and heading
  await expect(page).toHaveURL(AppRoutes.VISION.path);
  await expect(page.getByRole('heading', { name: AppRoutes.VISION.title })).toBeVisible();
});
