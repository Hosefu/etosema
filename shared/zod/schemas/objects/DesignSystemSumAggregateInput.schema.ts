import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional()
}).strict();
export const DesignSystemSumAggregateInputObjectSchema: z.ZodType<Prisma.DesignSystemSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.DesignSystemSumAggregateInputType>;
export const DesignSystemSumAggregateInputObjectZodSchema = makeSchema();
