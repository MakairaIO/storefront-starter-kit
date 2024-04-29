import { test, expect } from '@playwright/test'

test('Detail Page', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Detail Page_Detail Page Example')
  await expect(page).toHaveScreenshot()
})
