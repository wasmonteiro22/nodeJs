import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
});

// Isso extrai o tipo TypeScript automaticamente do Schema
export type CreateUserDTO = z.infer<typeof createUserSchema>;