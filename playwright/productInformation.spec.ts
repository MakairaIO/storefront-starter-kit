import { test, expect } from '@playwright/test'

test('Product Information Default', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Product Information_Default')
  await expect(page).toHaveScreenshot()
})

test('Product Information Glass Magnifier', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Product Information_Glass Magnifier')
  await expect(page).toHaveScreenshot()
})

test('Product Information Side by Side Magnifier', async ({ page }) => {
  await page.goto(
    process.env.PALI_PATH + 'Product Information_Side by Side Magnifier'
  )
  await expect(page).toHaveScreenshot()
})
