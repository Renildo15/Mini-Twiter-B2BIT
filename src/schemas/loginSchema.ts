import {z} from "zod";

export const loginSchema = z.object({
    email: z.string()
        .min(1, 'E-mail é obrigatório')
        .email('Formato do e-mail inválido'),
    password: z.string()
        .min(1, 'Senha é obrigatória')
        .min(6, 'A senha deve ter pelo menos 6 caracteres')
})

export type LoginFormData = z.infer<typeof loginSchema>