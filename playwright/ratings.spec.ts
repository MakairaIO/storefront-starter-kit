import { test, expect } from '@playwright/test'

test('Ratings Default', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Ratings_Default')
  await expect(page).toHaveScreenshot()
})
