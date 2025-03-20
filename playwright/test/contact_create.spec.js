const { test, describe, expect, beforeEach } = require('@playwright/test');

describe('Phonebook app', () => {
  beforeEach(async ({ page }) => {
    //Open app, login before each test
    await page.goto('http://localhost:5173');
    await page.waitForSelector('text=Login', { timeout: 50000 });
  
    await page.getByTestId('username').fill('123');
    await page.getByTestId('password').fill('123');
    await page.getByRole('button', { name: 'login' }).click();
    await expect(page.getByText('Logout')).toBeVisible();
  });

  test('a new contact can be created', async ({ page }) => {
    await page.getByTestId('name').fill('jony11');
    await page.getByTestId('number').fill('040-22334495');
    await page.getByRole('button', { name: 'Add Contact' }).click()
    await expect(page.getByTestId('notif').getByText('Added jony11')).toBeVisible()
  })

});
