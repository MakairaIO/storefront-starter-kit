import { test, expect } from '@playwright/test'

test('Breadcrumb Only Categories', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Breadcrumb_Only Categories')
  await expect(page).toHaveScreenshot()
})

test('Breadcrumb Categories with Product', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Breadcrumb_Categories with Product')
  await expect(page).toHaveScreenshot()
})

test('Breadcrumb Only Product', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + '/Breadcrumb_Only Product')
  await expect(page).toHaveScreenshot()
})
