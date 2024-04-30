import { test, expect } from '@playwright/test'

test('Stream Placement default', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Stream Placement_Default')
  await expect(page).toHaveScreenshot()
})

test('Stream Placement 4 products', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Stream Placement_4 products')
  await expect(page).toHaveScreenshot()
})

test('Stream Placement Without heading', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Stream Placement_Without heading')
  await expect(page).toHaveScreenshot()
})

test('Stream Placement Without text', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Stream Placement_Without text')
  await expect(page).toHaveScreenshot()
})

test('Stream Placement Without heading and text', async ({ page }) => {
  await page.goto(
    process.env.PALI_PATH + 'Stream Placement_Without heading and text'
  )
  await expect(page).toHaveScreenshot()
})
