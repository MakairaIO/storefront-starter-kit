import { test, expect } from '@playwright/test'

test('Error Page', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Error Page_Error Page Example')
  await expect(page).toHaveScreenshot()
})
