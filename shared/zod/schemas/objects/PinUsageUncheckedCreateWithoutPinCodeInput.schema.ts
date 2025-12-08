import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  ip: z.string(),
  userAgent: z.string().optional().nullable(),
  success: z.boolean(),
  path: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const PinUsageUncheckedCreateWithoutPinCodeInputObjectSchema: z.ZodType<Prisma.PinUsageUncheckedCreateWithoutPinCodeInput> = makeSchema() as unknown as z.ZodType<Prisma.PinUsageUncheckedCreateWithoutPinCodeInput>;
export const PinUsageUncheckedCreateWithoutPinCodeInputObjectZodSchema = makeSchema();
