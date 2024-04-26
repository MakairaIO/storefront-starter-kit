import { test, expect } from '@playwright/test'

test('discovery Image', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Header_Default')
  await expect(page).toHaveScreenshot()
})
