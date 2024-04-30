import { test, expect } from '@playwright/test'

test('Landing Page', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Landing Page_Home')
  await expect(page).toHaveScreenshot()
})
