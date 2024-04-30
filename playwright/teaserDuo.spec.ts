import { test, expect } from '@playwright/test'

test('Teaser (Duo) Default', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Teaser (Duo)_Default')
  await expect(page).toHaveScreenshot()
})
