import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  year: z.literal(true).optional()
}).strict();
export const CaseSumAggregateInputObjectSchema: z.ZodType<Prisma.CaseSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseSumAggregateInputType>;
export const CaseSumAggregateInputObjectZodSchema = makeSchema();
