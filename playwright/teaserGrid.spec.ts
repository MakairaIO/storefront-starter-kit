import { test, expect } from '@playwright/test'

test('Teaser (Grid) Default', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Teaser (Grid)_Default')
  await expect(page).toHaveScreenshot()
})

test('Teaser (Grid) Inverted', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Teaser (Grid)_Inverted')
  await expect(page).toHaveScreenshot()
})

test('Teaser (Grid) More visual with less headings and text', async ({
  page,
}) => {
  await page.goto(
    process.env.PALI_PATH +
      'Teaser (Grid)_More visual with less headings and text'
  )
  await expect(page).toHaveScreenshot()
})
