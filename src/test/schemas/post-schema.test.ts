import { describe, it, expect } from 'vitest';
import { postSchema } from '@/src/schemas/postSchema';

describe('postSchema', () => {
  it('Deve validar dados corretos', () => {
    const validData = {
      title: 'Teste',
      content: 'Testando Testando Testando',
      image: '',
    };

    const result = postSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
  it('Deve falhar com content vazio', () => {
    const validData = {
      title: 'Teste',
      content: '',
    };

    const result = postSchema.safeParse(validData);
    expect(result.success).toBe(false);
  });

  it('Deve falhar com content curto', () => {
    const validData = {
      title: 'Teste',
      content: 'Testando',
    };

    const result = postSchema.safeParse(validData);
    expect(result.success).toBe(false);
  });

  it('Deve validar com imagem pequena', () => {
    const validData = {
      content: 'Conteudo valido',
      image:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    };

    const result = postSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('Deve falhar com imagem > 5MB', () => {
    const validData = {
      content: 'Conteudo valido',
      image: 'data:image/png;' + 'a'.repeat(5 * 1024 * 1024 + 1),
    };

    const result = postSchema.safeParse(validData);
    expect(result.success).toBe(false);
  });
});
