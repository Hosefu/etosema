import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional()
}).strict();
export const DesignSystemAvgAggregateInputObjectSchema: z.ZodType<Prisma.DesignSystemAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.DesignSystemAvgAggregateInputType>;
export const DesignSystemAvgAggregateInputObjectZodSchema = makeSchema();
