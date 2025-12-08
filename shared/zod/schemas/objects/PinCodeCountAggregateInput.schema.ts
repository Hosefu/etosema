import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  label: z.literal(true).optional(),
  codeHash: z.literal(true).optional(),
  code: z.literal(true).optional(),
  shortCode: z.literal(true).optional(),
  accessAll: z.literal(true).optional(),
  expiresAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const PinCodeCountAggregateInputObjectSchema: z.ZodType<Prisma.PinCodeCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCountAggregateInputType>;
export const PinCodeCountAggregateInputObjectZodSchema = makeSchema();
