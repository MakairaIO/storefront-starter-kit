import { test, expect } from '@playwright/test'

test('Empty Search Result', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Empty Search Result_Default')
  await expect(page).toHaveScreenshot()
})
