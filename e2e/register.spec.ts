import { test, expect } from '@playwright/test';

test.describe('Registro', () => {
  test('deve registrar novo usuário com sucesso', async ({ page }) => {
    const uniqueEmail = `teste${Date.now()}@email.com`;
    
    await page.goto('/auth?tab=register');
    
    await page.getByPlaceholder('Insira o seu nome').fill('Novo Usuário');
    await page.getByPlaceholder('Insira seu e-mail').fill(uniqueEmail);
    await page.getByPlaceholder('Insira a sua senha').fill('Senha123!');
    await page.getByRole('button', { name: /continuar/i }).click();
    
    await expect(page).toHaveURL('/auth');
  });

  test('deve mostrar erro ao registrar com email existente', async ({ page }) => {
    await page.goto('/auth?tab=register');
    
    await page.getByPlaceholder('Insira o seu nome').fill('Usuário Existente');
    await page.getByPlaceholder('Insira seu e-mail').fill('renildorabi22@gmail.com');
    await page.getByPlaceholder('Insira a sua senha').fill('Senha123!');
    await page.getByRole('button', { name: /continuar/i }).click();
    
    await expect(page.getByText('Usuário já cadastrado')).toBeVisible();
  });
});