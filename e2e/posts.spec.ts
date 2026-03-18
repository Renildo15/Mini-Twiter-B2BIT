import { test, expect } from '@playwright/test';

test.describe('Posts', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth?tab=login');
    await page.getByPlaceholder('Insira seu e-mail').fill('renildorabi22@gmail.com');
    await page.getByPlaceholder('Insira a sua senha').fill('Senha123!');
    await page.getByRole('button', { name: /continuar/i }).click();
    await expect(page).toHaveURL('/');
  });

  test('deve buscar por um post via API', async ({ page }) => {
    const uniqueTerm = `Busca${Date.now()}`;
    await page.getByPlaceholder('E aí, o que está rolando?').fill(uniqueTerm);
    await page.getByRole('button', { name: /postar/i }).click();
    await expect(page.getByText(uniqueTerm).first()).toBeVisible();

    await page.getByPlaceholder('Buscar por post...').fill(uniqueTerm);

    await page.waitForResponse(
      (response) => {
        const url = response.url();
        return url.includes('/posts') && url.includes(`search=${encodeURIComponent(uniqueTerm)}`);
      },
      { timeout: 10000 }
    );

    await expect(page.getByText(uniqueTerm).first()).toBeVisible();
  });

  test('deve curtir um post', async ({ page }) => {
    await page.request.post('/api/posts', {
      data: {
        content: 'Post de teste para curtir',
      }
    });
    
    await page.waitForTimeout(1000);
    
    await page.reload();
    
    await page.getByPlaceholder('Buscar por post...').fill('teste');
    
    await page.waitForResponse(
      (response) => response.url().includes('/posts') && response.status() === 200,
      { timeout: 10000 }
    );
    
    await page.waitForSelector('[data-testid="post-card"]', { timeout: 10000 });
    
    const post = page.getByTestId('post-card').first();
    await expect(post).toBeVisible();
    
    const likeButton = post.getByTestId('like-button');
    await expect(likeButton).toBeVisible({ timeout: 5000 });
    
    await likeButton.click();
    
    await page.waitForResponse(
      (response) => response.url().includes('/posts/') && response.url().includes('/like'),
      { timeout: 5000 }
    );
    
    await expect(likeButton).toHaveAttribute('data-liked', 'true');
  });

  test('deve criar um novo post', async ({ page }) => {
    const postContent = `Teste ${Date.now()}`;

    await page.getByPlaceholder('E aí, o que está rolando?').fill(postContent);
    await page.getByRole('button', { name: /postar/i }).click();

    await expect(page.getByText(postContent).last()).toBeVisible();
  });
});
