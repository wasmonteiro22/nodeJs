import { z } from 'zod';

export const loginUserSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres")
});

// Isso extrai o tipo TypeScript automaticamente do Schema
export type LoginUserDTO = z.infer<typeof loginUserSchema>;