import { z } from "zod";

export const PasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be at most 100 characters"),
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be at most 100 characters"),
  confirmPassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be at most 100 characters"),
}).refine(
  (val) => val.newPassword === val.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);

export type PasswordSchemaType = z.infer<typeof PasswordSchema>;
