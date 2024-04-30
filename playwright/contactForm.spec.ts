import { test, expect } from '@playwright/test'

test('Contact Form Default', async ({ page }) => {
  await page.goto(process.env.PALI_PATH + 'Contact Form_Default')
  await expect(page).toHaveScreenshot()
})
