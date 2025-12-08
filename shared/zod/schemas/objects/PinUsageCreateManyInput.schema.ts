import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  pinCodeId: z.string().optional().nullable(),
  ip: z.string(),
  userAgent: z.string().optional().nullable(),
  success: z.boolean(),
  path: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const PinUsageCreateManyInputObjectSchema: z.ZodType<Prisma.PinUsageCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.PinUsageCreateManyInput>;
export const PinUsageCreateManyInputObjectZodSchema = makeSchema();
