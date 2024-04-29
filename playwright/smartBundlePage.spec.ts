import { test, expect } from '@playwright/test'

test('Smart Bundle Page', async ({ page }) => {
  await page.goto(
    process.env.PALI_PATH + 'Smart Bundle Page_Smart Bundle Example'
  )
  await expect(page).toHaveScreenshot()
})
