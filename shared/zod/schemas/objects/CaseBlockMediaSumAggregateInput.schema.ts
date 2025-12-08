import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  position: z.literal(true).optional()
}).strict();
export const CaseBlockMediaSumAggregateInputObjectSchema: z.ZodType<Prisma.CaseBlockMediaSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMediaSumAggregateInputType>;
export const CaseBlockMediaSumAggregateInputObjectZodSchema = makeSchema();
