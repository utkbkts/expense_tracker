import { z } from "zod";

export const AccountSchema = z.object({
  name: z
    .string()
    .min(2, "Account Name must be at least 2 characters")
    .max(50, "Account Name must be at most 50 characters")
    .optional(),
  account_number: z
    .string()
    .min(2, "Account Number must be at least 2 characters")
    .max(50, "Account Number must be at most 50 characters"),
  amount: z
    .string()
    .min(2, "Amount must be at least 2 characters")
    .max(50, "Amount must be at most 50 characters"),
});

export type AccountSchemaType = z.infer<typeof AccountSchema>;

export const AddMoneyTransfer = z.object({
  amount: z
    .string()
    .min(2, "Amount must be at least 2 characters")
    .max(50, "Amount must be at most 50 characters"),
});

export type AddMoneyTransferType = z.infer<typeof AddMoneyTransfer>;
