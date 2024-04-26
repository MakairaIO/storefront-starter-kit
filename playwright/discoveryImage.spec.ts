import { test, expect } from '@playwright/test'

test('discovery Image', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Discovery%20Image_Discovery%20Image')
  await expect(page).toHaveScreenshot()
})
