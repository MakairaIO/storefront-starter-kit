import { test, expect } from '@playwright/test'

test('Product Placement default', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Product Placement_Default')
  await expect(page).toHaveScreenshot()
})

test('Product Placement 4 products', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Product Placement_4 products')
  await expect(page).toHaveScreenshot()
})

test('Product Placement Without heading', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Product Placement_Without heading')
  await expect(page).toHaveScreenshot()
})

test('Product Placement Without text', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Product Placement_Without text')
  await expect(page).toHaveScreenshot()
})

test('Product Placement Without heading and text', async ({ page }) => {
  await page.goto(
    process.env.PALI_PATH + 'Product Placement_Without heading and text'
  )
  await expect(page).toHaveScreenshot()
})
