import * as z from 'zod';
export const PinUsageFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  pinCodeId: z.string().optional(),
  pinCode: z.unknown().optional(),
  ip: z.string(),
  userAgent: z.string().optional(),
  success: z.boolean(),
  path: z.string().optional(),
  createdAt: z.date()
}));