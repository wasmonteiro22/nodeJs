import { z } from 'zod';

export const showUserSchema = z.object({
  email: z.string().email("E-mail inválido")
});

export type showUserDTO = z.infer<typeof showUserSchema>;