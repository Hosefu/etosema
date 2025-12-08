import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  blockId: z.literal(true).optional(),
  position: z.literal(true).optional(),
  type: z.literal(true).optional(),
  url: z.literal(true).optional(),
  alt: z.literal(true).optional(),
  aspectRatio: z.literal(true).optional()
}).strict();
export const CaseBlockMediaMaxAggregateInputObjectSchema: z.ZodType<Prisma.CaseBlockMediaMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMediaMaxAggregateInputType>;
export const CaseBlockMediaMaxAggregateInputObjectZodSchema = makeSchema();
