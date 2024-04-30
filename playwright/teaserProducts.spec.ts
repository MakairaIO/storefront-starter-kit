import { test, expect } from '@playwright/test'

test('Teaser (Products) Colorized', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Teaser (Products)_Colorized')
  await expect(page).toHaveScreenshot()
})

test('Teaser (Products) White', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Teaser (Products)_White')
  await expect(page).toHaveScreenshot()
})
