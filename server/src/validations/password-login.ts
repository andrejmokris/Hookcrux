import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().toLowerCase().email(),
  password: z.string().min(8).max(80),
});

export const logInSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(8).max(80),
});
