import { test, expect } from '@playwright/test'

test('Teaser (Single) With button', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Teaser (Single)_With button')
  await expect(page).toHaveScreenshot()
})

test('Teaser (Single) Without button', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Teaser (Single)_Without button')
  await expect(page).toHaveScreenshot()
})

test('Teaser (Single) With little content', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Teaser (Single)_With little content')
  await expect(page).toHaveScreenshot()
})
