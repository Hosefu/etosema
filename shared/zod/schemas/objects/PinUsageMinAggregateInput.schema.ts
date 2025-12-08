import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  pinCodeId: z.literal(true).optional(),
  ip: z.literal(true).optional(),
  userAgent: z.literal(true).optional(),
  success: z.literal(true).optional(),
  path: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const PinUsageMinAggregateInputObjectSchema: z.ZodType<Prisma.PinUsageMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PinUsageMinAggregateInputType>;
export const PinUsageMinAggregateInputObjectZodSchema = makeSchema();
