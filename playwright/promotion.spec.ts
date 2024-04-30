import { test, expect } from '@playwright/test'

test('Promototion Default', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Promotion_Default')
  await expect(page).toHaveScreenshot()
})

test('Promototion Inverted', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Promotion_Inverted')
  await expect(page).toHaveScreenshot()
})

test('Promototion No Button, No Pre-Title', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Promotion_No Button%2C No Pre-Title')
  await expect(page).toHaveScreenshot()
})
