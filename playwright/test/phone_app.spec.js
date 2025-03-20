const { test, describe, expect, beforeEach } = require('@playwright/test');

describe('Note app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })
  
  test('login form can be opened and user can log in', async ({ page }) => {
    // Wait for the login form to be visible
    await page.waitForSelector('text=Login', { timeout: 50000 });
  
    // Fill in the login form
    await page.getByTestId('username').fill('123');
    await page.getByTestId('password').fill('123');
    await page.getByRole('button', { name: 'login' }).click();
    // Wait for contacts section to load
    await page.waitForSelector('text=Contacts', { timeout: 10000 });
    //user is logged in
    await expect(page.getByText('Logout')).toBeVisible();
  });

  test('front page can be opened', async ({ page }) => {
    await page.waitForSelector('text=Login', { timeout: 50000 });
    await page.getByTestId('username').fill('123');
    await page.getByTestId('password').fill('123');
    await page.getByRole('button', { name: 'login' }).click();
    await page.waitForSelector('h2:has-text("Contacts")', { timeout: 50000 });

    const titleLocator = await page.locator('h2:has-text("Contacts")');
    await expect(titleLocator).toBeVisible();
  });


});
