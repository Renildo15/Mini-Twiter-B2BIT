import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test('usuário deve fazer login com sucesso', async ({ page }) => {
    await page.goto('/auth?tab=login');
  
    await page.getByPlaceholder('Insira seu e-mail').fill('renildorabi22@gmail.com');
    await page.getByPlaceholder('Insira a sua senha').fill('Senha123!');
    await page.getByRole('button', { name: /continuar/i }).click();
  
    await expect(page).toHaveURL('/');
  
    await expect(page.getByText('Mini Twitter').first()).toBeVisible();
});

  test('deve mostrar erro com credenciais inválidas', async ({ page }) => {
    await page.goto('/auth?tab=login');
    
    await page.getByPlaceholder('Insira seu e-mail').fill('errado@email.com');
    await page.getByPlaceholder('Insira a sua senha').fill('errada');
    await page.getByRole('button', { name: /continuar/i }).click();
    
    await expect(page.getByText('Email ou senha inválidos')).toBeVisible();
  });
});