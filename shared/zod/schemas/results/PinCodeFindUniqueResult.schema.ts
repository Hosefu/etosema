import * as z from 'zod';
export const PinCodeFindUniqueResultSchema = z.nullable(z.object({
  id: z.string(),
  label: z.string().optional(),
  codeHash: z.string(),
  code: z.string().optional(),
  shortCode: z.string().optional(),
  accessAll: z.boolean(),
  expiresAt: z.date().optional(),
  cases: z.array(z.unknown()),
  usages: z.array(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date()
}));