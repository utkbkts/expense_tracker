import { z } from "zod";

export const SettingsSchema = z.object({
  firstname: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters"),

  lastname: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters"),

  email: z.string().email("Please enter a valid email address"),

  phonenumber: z
    .string()
    .min(6, "Phone number must be at least 6 digits")
    .max(20, "Phone number must be at most 20 digits"),

  country: z.string().optional(),
  currency: z.string().optional(),
});

export type SettingsSchemaType = z.infer<typeof SettingsSchema>;
