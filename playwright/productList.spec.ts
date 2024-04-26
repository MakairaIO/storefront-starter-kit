import { test, expect } from '@playwright/test'

test('Product List', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Product List_Default')
  await expect(page).toHaveScreenshot()
})
