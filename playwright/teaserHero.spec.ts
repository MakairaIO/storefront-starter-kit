import { test, expect } from '@playwright/test'

test('Teaser (Hero) Fully featured', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Teaser (Hero)_Fully featured')
  await expect(page).toHaveScreenshot()
})

test('Teaser (Hero) Without Button', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Teaser (Hero)_Without Button')
  await expect(page).toHaveScreenshot()
})

test('Teaser (Hero) Without Overlay', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Teaser (Hero)_Without Overlay')
  await expect(page).toHaveScreenshot()
})

test('Teaser (Hero) Without Heading', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Teaser (Hero)_Without Heading')
  await expect(page).toHaveScreenshot()
})
test('Teaser (Hero) Image only - no link', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Teaser (Hero)_Image only - no link')
  await expect(page).toHaveScreenshot()
})
