import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  position: z.literal(true).optional()
}).strict();
export const CaseBlockMediaAvgAggregateInputObjectSchema: z.ZodType<Prisma.CaseBlockMediaAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMediaAvgAggregateInputType>;
export const CaseBlockMediaAvgAggregateInputObjectZodSchema = makeSchema();
