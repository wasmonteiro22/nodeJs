import { email, z } from 'zod';

export const loginSchema = z.object({
  user_id: z.string().min(20, "Uid é inválido."),
  token: z.string().min(30, "Token informado é inválido."),
});

// Isso extrai o tipo TypeScript automaticamente do Schema
export type LoginDTO = z.infer<typeof loginSchema>;