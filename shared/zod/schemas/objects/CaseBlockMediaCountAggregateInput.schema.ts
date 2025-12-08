import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  blockId: z.literal(true).optional(),
  position: z.literal(true).optional(),
  type: z.literal(true).optional(),
  url: z.literal(true).optional(),
  alt: z.literal(true).optional(),
  aspectRatio: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const CaseBlockMediaCountAggregateInputObjectSchema: z.ZodType<Prisma.CaseBlockMediaCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMediaCountAggregateInputType>;
export const CaseBlockMediaCountAggregateInputObjectZodSchema = makeSchema();
