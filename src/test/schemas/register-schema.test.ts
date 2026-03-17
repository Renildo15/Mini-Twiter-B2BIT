import { describe, it, expect } from 'vitest';
import { registerSchema } from '@/src/schemas/registerSchema';

describe('registerSchema', () => {
    it('Deve validar dados corretos', () => {
        const validData = {
            name: "Teste",
            email: "teste@email.com",
            password: "senha123!"
        }

        const result = registerSchema.safeParse(validData)
        expect(result.success).toBe(true)
    });
    it('Deve falhar com o nome vazio', () => {
        const validData = {
            name: "",
            email: "teste@email.com",
            password: "senha123!"
        }

        const result = registerSchema.safeParse(validData)
        expect(result.success).toBe(false)
    });
    it('Deve falhar com o nome muito curto', () => {
        const validData = {
            name: "t",
            email: "teste@email.com",
            password: "senha123!"
        }

        const result = registerSchema.safeParse(validData)
        expect(result.success).toBe(false)
    });
    it('Deve falhar com  nome com caracteres especias', () => {
        const validData = {
            name: "t%*#%¨#$",
            email: "teste@email.com",
            password: "senha123!"
        }

        const result = registerSchema.safeParse(validData)
        expect(result.success).toBe(false)
    });
    it('Deve falhar com o email vazio', () => {
        const validData = {
            name: "Teste",
            email: "",
            password: "senha123!"
        }

        const result = registerSchema.safeParse(validData)
        expect(result.success).toBe(false)
    });
    it('Deve falhar com o email inválido', () => {
        const validData = {
            name: "Teste",
            email: "email-invalido",
            password: "senha123!"
        }

        const result = registerSchema.safeParse(validData)
        expect(result.success).toBe(false)
    });
     it('Deve falhar com o senha inválida', () => {
        const validData = {
            name: "Teste",
            email: "teste@email.com",
            password: "1"
        }

        const result = registerSchema.safeParse(validData)
        expect(result.success).toBe(false)
    });
    it('Deve falhar com o senha vazia', () => {
        const validData = {
            name: "Teste",
            email: "teste@email.com",
            password: ""
        }

        const result = registerSchema.safeParse(validData)
        expect(result.success).toBe(false)
    });
})