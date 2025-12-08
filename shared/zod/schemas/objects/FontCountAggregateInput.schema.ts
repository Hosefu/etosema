import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  family: z.literal(true).optional(),
  url: z.literal(true).optional(),
  format: z.literal(true).optional(),
  weight: z.literal(true).optional(),
  style: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const FontCountAggregateInputObjectSchema: z.ZodType<Prisma.FontCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.FontCountAggregateInputType>;
export const FontCountAggregateInputObjectZodSchema = makeSchema();
