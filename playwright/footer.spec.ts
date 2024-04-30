import { test, expect } from '@playwright/test'

test('Footer Default', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Footer_Default')
  await expect(page).toHaveScreenshot()
})
