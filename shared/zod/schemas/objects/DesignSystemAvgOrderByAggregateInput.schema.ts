import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional()
}).strict();
export const DesignSystemAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.DesignSystemAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.DesignSystemAvgOrderByAggregateInput>;
export const DesignSystemAvgOrderByAggregateInputObjectZodSchema = makeSchema();
