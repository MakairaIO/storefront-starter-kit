import { test, expect } from '@playwright/test'

test('Text (mehrspaltig) Fully featured', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Text (mehrspaltig)_Fully featured')
  await expect(page).toHaveScreenshot()
})

test('Text (mehrspaltig) Without heading and three columns', async ({
  page,
}) => {
  await page.goto(
    process.env.PALI_PATH +
      'Text (mehrspaltig)_Without heading and three columns'
  )
  await expect(page).toHaveScreenshot()
})

test('Text (mehrspaltig) With background color', async ({ page }) => {
  await page.goto(
    process.env.PALI_PATH + 'Text (mehrspaltig)_With background color'
  )
  await expect(page).toHaveScreenshot()
})

test('Text (mehrspaltig) With heading and two columns', async ({ page }) => {
  await page.goto(
    process.env.PALI_PATH + 'Text (mehrspaltig)_With heading and two columns'
  )
  await expect(page).toHaveScreenshot()
})

test('Text (mehrspaltig) Without heading and two columns', async ({ page }) => {
  await page.goto(
    process.env.PALI_PATH + 'Text (mehrspaltig)_Without heading and two columns'
  )
  await expect(page).toHaveScreenshot()
})

test('Text (mehrspaltig) With heading and one column', async ({ page }) => {
  await page.goto(
    process.env.PALI_PATH + 'Text (mehrspaltig)_With heading and one column'
  )
  await expect(page).toHaveScreenshot()
})

test('Text (mehrspaltig) With Image (three columns)', async ({ page }) => {
  await page.goto(
    process.env.PALI_PATH + 'Text (mehrspaltig)_With Image (three columns)'
  )
  await expect(page).toHaveScreenshot()
})

test('With Image (one column)', async ({ page }) => {
  await page.goto(
    process.env.PALI_PATH + 'Text (mehrspaltig)_With Image (one column)'
  )
  await expect(page).toHaveScreenshot()
})
