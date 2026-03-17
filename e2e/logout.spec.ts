import { test, expect } from '@playwright/test';

test.describe('Logout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth?tab=login');
    await page.getByPlaceholder('Insira seu e-mail').fill('renildorabi22@gmail.com');
    await page.getByPlaceholder('Insira a sua senha').fill('Senha123!');
    await page.getByRole('button', { name: /continuar/i }).click();
    await expect(page).toHaveURL('/');
  });

  test('deve fazer logout com sucesso', async ({ page }) => {
    await page
      .getByRole('button')
      .first()
      .filter({ has: page.locator('svg') })
      .click();
    await expect(page.getByRole('button', { name: /continuar/i })).toBeVisible();
  });
});
