import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().optional(),

  content: z
    .string()
    .min(1, 'Conteúdo é obrigatório')
    .min(10, 'Conteúdo deve ter pelo menos 10 caracteres')
    .max(1000, 'Conteúdo deve ter no máximo 1000 caracteres')
    .transform((val) => val.trim()),

  image: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        if (val.startsWith('data:image') && val.length > 5 * 1024 * 1024) {
          return false;
        }
        return true;
      },
      {
        message: 'Imagem muito grande (máximo 5MB)',
      }
    ),
});

export type PostFormData = z.infer<typeof postSchema>;
