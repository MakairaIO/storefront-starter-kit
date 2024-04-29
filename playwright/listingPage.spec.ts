import { test, expect } from '@playwright/test'

test('Listing Page', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Listing Page_Listing Page Example')
  await expect(page).toHaveScreenshot()
})
