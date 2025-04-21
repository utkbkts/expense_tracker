import { z } from 'zod';

export const SignInSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be at most 100 characters"),
});

export type CreateSignInSchema = z.infer<typeof SignInSchema>;
