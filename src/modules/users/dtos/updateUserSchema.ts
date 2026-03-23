import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  id: z.string().min(10, "Uid inválido"),
});

// Isso extrai o tipo TypeScript automaticamente do Schema
export type updateUserDTO = z.infer<typeof updateUserSchema>;