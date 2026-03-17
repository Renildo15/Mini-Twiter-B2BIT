import { describe, it, expect } from 'vitest';
import { loginSchema } from '@/src/schemas/loginSchema';

describe('loginSchema', () => {
  it('deve validar dados corretos', () => {
    const validData = {
      email: 'teste@email.com',
      password: '123456',
    };
    const result = loginSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('deve falhar com email inválido', () => {
    const invalidData = {
      email: 'email-invalido',
      password: '123456',
    };
    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('deve falhar com senha curta', () => {
    const invalidData = {
      email: 'teste@email.com',
      password: '123',
    };
    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('deve falhar com email vazio', () => {
    const invalidData = {
      email: '',
      password: '123456',
    };
    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('deve falhar com senha vazia', () => {
    const invalidData = {
      email: 'teste@email.com',
      password: '',
    };
    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
